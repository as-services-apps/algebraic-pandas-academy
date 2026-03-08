import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGame } from '@/context/GameContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Copy, Users, Loader2, Play, Sparkles, BookOpen } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';
import { Question } from '@/types/game';

interface MultiplayerLobbyProps {
  onBack: () => void;
  onGameStart: (sessionId: string) => void;
}

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const exampleTopics = [
  { topic: 'Henry VIII', context: 'his six wives' },
  { topic: 'Photosynthesis', context: 'light-dependent reactions' },
  { topic: 'Quadratic equations', context: 'solving by factoring' },
  { topic: 'World War 2', context: 'D-Day landings' },
];

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ onBack, onGameStart }) => {
  const { gameState } = useGame();
  const [roomCode, setRoomCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [players, setPlayers] = useState<{ id: string; player_name: string; school: string; is_ready: boolean }[]>([]);
  const [topic, setTopic] = useState('');
  const [extraContext, setExtraContext] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [created, setCreated] = useState(false);

  const createSession = async () => {
    if (!topic.trim()) {
      toast({ title: 'Enter a topic', description: 'Choose what to quiz on!', variant: 'destructive' });
      return;
    }

    setIsCreating(true);
    const code = generateRoomCode();

    try {
      // Generate questions via edge function
      const { data: qData, error: qError } = await supabase.functions.invoke('generate-questions', {
        body: {
          customTopic: topic.trim(),
          extraContext: extraContext.trim() || undefined,
          yearGroup: gameState.selectedYearGroup,
          count: 10,
        },
      });

      if (qError) throw qError;
      if (qData?.error) throw new Error(qData.error);

      const questions = (qData.questions || []).map((q: any, i: number) => ({
        id: `mp-${Date.now()}-${i}`,
        topic: topic.trim(),
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty || 'medium',
        yearGroup: gameState.selectedYearGroup,
        points: 1,
      }));

      if (questions.length === 0) throw new Error('No questions generated');

      // Create session in DB
      const { data: session, error: sError } = await supabase
        .from('game_sessions')
        .insert({
          room_code: code,
          host_name: gameState.player?.name || 'Host',
          host_school: gameState.player?.school || '',
          topic: topic.trim(),
          year_group: gameState.selectedYearGroup,
          questions: questions as any,
          status: 'waiting',
        })
        .select()
        .single();

      if (sError) throw sError;

      // Add host as player
      await supabase.from('session_players').insert({
        session_id: session.id,
        player_name: gameState.player?.name || 'Host',
        school: gameState.player?.school || '',
        is_ready: true,
      });

      setRoomCode(code);
      setSessionId(session.id);
      setCreated(true);

      toast({ title: 'Room Created! 🎉', description: `Code: ${code}` });
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to create room', description: err instanceof Error ? err.message : 'Try again', variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  // Subscribe to players joining
  useEffect(() => {
    if (!sessionId) return;

    // Initial fetch
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('session_players')
        .select('id, player_name, school, is_ready')
        .eq('session_id', sessionId);
      if (data) setPlayers(data);
    };
    fetchPlayers();

    const channel = supabase
      .channel(`lobby-${sessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'session_players',
        filter: `session_id=eq.${sessionId}`,
      }, () => {
        fetchPlayers();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast({ title: 'Copied! 📋', description: 'Share this code with your friends' });
  };

  const startGame = async () => {
    if (players.length < 2) {
      toast({ title: 'Need more players', description: 'Wait for at least 1 more player to join', variant: 'destructive' });
      return;
    }

    setIsStarting(true);
    try {
      await supabase
        .from('game_sessions')
        .update({ status: 'playing', started_at: new Date().toISOString() })
        .eq('id', sessionId);

      onGameStart(sessionId);
    } catch {
      toast({ title: 'Failed to start', variant: 'destructive' });
      setIsStarting(false);
    }
  };

  if (!created) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-bold text-foreground">Create Game Room</h2>
            </div>

            <div className="bg-card rounded-2xl p-4 sm:p-6 panda-shadow space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-foreground">Choose Your Topic</h3>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  What do you want to quiz on?
                </label>
                <Input
                  placeholder="e.g., Photosynthesis, French Revolution..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 text-base"
                  disabled={isCreating}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Specific focus? (optional)</label>
                <Textarea
                  placeholder="e.g., key dates, formulas..."
                  value={extraContext}
                  onChange={(e) => setExtraContext(e.target.value)}
                  className="min-h-[60px] resize-none"
                  disabled={isCreating}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {exampleTopics.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { setTopic(ex.topic); setExtraContext(ex.context); }}
                    disabled={isCreating}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {ex.topic}
                  </button>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                Year Group: <span className="font-bold text-foreground">Y{gameState.selectedYearGroup}</span>
              </div>

              <Button
                onClick={createSession}
                disabled={isCreating || !topic.trim()}
                size="lg"
                className="w-full h-14 text-lg gradient-primary text-white"
              >
                {isCreating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Room...</>
                ) : (
                  <><Sparkles className="w-5 h-5 mr-2" /> Create Room</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <img src={pandaLogo} alt="Panda" className="w-20 h-20 mx-auto float" />
        <h2 className="text-2xl font-bold text-foreground">Game Room</h2>
        <p className="text-sm text-muted-foreground">Topic: <span className="font-bold text-foreground">{topic}</span></p>

        {/* Room Code */}
        <div className="bg-card rounded-2xl p-6 panda-shadow">
          <p className="text-sm text-muted-foreground mb-2">Share this code:</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl font-bold tracking-[0.3em] text-primary font-mono">
              {roomCode}
            </span>
            <button onClick={copyCode} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Copy className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Players */}
        <div className="bg-card rounded-2xl p-4 panda-shadow">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Players ({players.length})</h3>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {players.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-foreground">{p.player_name}</span>
                <span className="text-xs text-muted-foreground">{p.school}</span>
              </div>
            ))}
          </div>
          {players.length < 2 && (
            <p className="text-xs text-muted-foreground mt-3 animate-pulse">
              Waiting for players to join...
            </p>
          )}
        </div>

        <Button
          onClick={startGame}
          disabled={isStarting || players.length < 2}
          size="lg"
          className="w-full h-14 text-lg gradient-primary text-white"
        >
          {isStarting ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Starting...</>
          ) : (
            <><Play className="w-5 h-5 mr-2" /> Start Game ({players.length} players)</>
          )}
        </Button>

        <Button variant="outline" onClick={onBack} className="w-full">
          Leave Room
        </Button>
      </div>
    </div>
  );
};

export default MultiplayerLobby;
