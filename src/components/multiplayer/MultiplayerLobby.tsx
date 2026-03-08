import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Users, Plus, LogIn, Loader2, Copy } from 'lucide-react';

interface MultiplayerLobbyProps {
  onJoinSession: (sessionId: string, playerId: string, isHost: boolean) => void;
  onBack: () => void;
}

const generateRoomCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ onJoinSession, onBack }) => {
  const { gameState } = useGame();
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [roomCode, setRoomCode] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const playerName = gameState.player?.name || 'Player';
  const playerSchool = gameState.player?.school || 'Unknown';

  const handleCreateRoom = async () => {
    if (!topic.trim()) {
      toast({ title: 'Enter a topic', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const code = generateRoomCode();

      // Generate questions via edge function
      const { data: qData, error: qError } = await supabase.functions.invoke('generate-questions', {
        body: {
          customTopic: topic.trim(),
          yearGroup: gameState.selectedYearGroup,
          count: 10,
        },
      });

      if (qError) throw qError;
      if (qData?.error) throw new Error(qData.error);

      const questions = (qData.questions || []).map((q: any, i: number) => ({
        id: `mp-${Date.now()}-${i}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || '',
        difficulty: q.difficulty || 'medium',
      }));

      if (questions.length === 0) throw new Error('No questions generated');

      // Create game session
      const { data: session, error: sError } = await supabase
        .from('game_sessions')
        .insert({
          room_code: code,
          host_name: playerName,
          host_school: playerSchool,
          topic: topic.trim(),
          year_group: gameState.selectedYearGroup,
          questions: questions,
          status: 'waiting',
        })
        .select()
        .single();

      if (sError) throw sError;

      // Add host as a player
      const { data: player, error: pError } = await supabase
        .from('session_players')
        .insert({
          session_id: session.id,
          player_name: playerName,
          school: playerSchool,
          is_ready: true,
        })
        .select()
        .single();

      if (pError) throw pError;

      toast({ title: `Room created! Code: ${code}`, description: 'Share this code with other players' });
      onJoinSession(session.id, player.id, true);
    } catch (error) {
      console.error('Create room error:', error);
      toast({ title: 'Failed to create room', description: error instanceof Error ? error.message : 'Try again', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim() || roomCode.trim().length < 4) {
      toast({ title: 'Enter a valid room code', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      // Find the session
      const { data: session, error: sError } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('room_code', roomCode.trim().toUpperCase())
        .eq('status', 'waiting')
        .single();

      if (sError || !session) {
        throw new Error('Room not found or game already started');
      }

      // Check player count
      const { count } = await supabase
        .from('session_players')
        .select('*', { count: 'exact', head: true })
        .eq('session_id', session.id);

      if ((count || 0) >= 30) {
        throw new Error('Room is full (max 30 players)');
      }

      // Join as player
      const { data: player, error: pError } = await supabase
        .from('session_players')
        .insert({
          session_id: session.id,
          player_name: playerName,
          school: playerSchool,
          is_ready: false,
        })
        .select()
        .single();

      if (pError) throw pError;

      toast({ title: 'Joined!', description: `Joined "${session.topic}" quiz` });
      onJoinSession(session.id, player.id, false);
    } catch (error) {
      console.error('Join room error:', error);
      toast({ title: 'Failed to join', description: error instanceof Error ? error.message : 'Try again', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 fade-in max-w-lg mx-auto">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-foreground">Multiplayer Quiz</h2>
        </div>
      </div>

      {mode === 'choose' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Play with friends on different devices!</p>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => setMode('create')}
              className="bg-gradient-to-br from-primary to-accent p-6 rounded-2xl text-white text-left hover:scale-[1.02] transition-transform panda-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <Plus className="w-6 h-6" />
                <h3 className="text-lg font-bold">Create Room</h3>
              </div>
              <p className="text-white/80 text-sm">Host a quiz and invite friends with a room code</p>
            </button>

            <button
              onClick={() => setMode('join')}
              className="bg-gradient-to-br from-secondary to-destructive p-6 rounded-2xl text-white text-left hover:scale-[1.02] transition-transform panda-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <LogIn className="w-6 h-6" />
                <h3 className="text-lg font-bold">Join Room</h3>
              </div>
              <p className="text-white/80 text-sm">Enter a room code to join a friend's quiz</p>
            </button>
          </div>
        </div>
      )}

      {mode === 'create' && (
        <div className="bg-card rounded-2xl p-6 panda-shadow space-y-4">
          <h3 className="font-bold text-foreground text-lg">Create a Quiz Room</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quiz Topic</label>
            <Input
              placeholder="e.g., Photosynthesis, WW2, Algebra..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              className="h-12"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Year Group: <span className="font-bold text-foreground">Y{gameState.selectedYearGroup}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setMode('choose')} disabled={isLoading}>Back</Button>
            <Button
              onClick={handleCreateRoom}
              disabled={isLoading || !topic.trim()}
              className="flex-1 gradient-primary text-white"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</> : 'Create Room'}
            </Button>
          </div>
        </div>
      )}

      {mode === 'join' && (
        <div className="bg-card rounded-2xl p-6 panda-shadow space-y-4">
          <h3 className="font-bold text-foreground text-lg">Join a Quiz Room</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Room Code</label>
            <Input
              placeholder="Enter 6-letter code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              disabled={isLoading}
              className="h-12 text-center text-2xl font-bold tracking-widest uppercase"
              maxLength={6}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setMode('choose')} disabled={isLoading}>Back</Button>
            <Button
              onClick={handleJoinRoom}
              disabled={isLoading || roomCode.length < 4}
              className="flex-1 gradient-primary text-white"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Joining...</> : 'Join Room'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerLobby;
