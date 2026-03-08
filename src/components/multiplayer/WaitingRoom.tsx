import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Copy, Check, Users, Loader2, Play, ArrowLeft } from 'lucide-react';

interface WaitingRoomProps {
  sessionId: string;
  playerId: string;
  isHost: boolean;
  onGameStart: (sessionId: string, playerId: string) => void;
  onLeave: () => void;
}

interface PlayerInfo {
  id: string;
  player_name: string;
  school: string;
  is_ready: boolean;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ sessionId, playerId, isHost, onGameStart, onLeave }) => {
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [roomCode, setRoomCode] = useState('');
  const [topic, setTopic] = useState('');
  const [copied, setCopied] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // Fetch session info
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase
        .from('game_sessions')
        .select('room_code, topic')
        .eq('id', sessionId)
        .single();
      if (data) {
        setRoomCode(data.room_code);
        setTopic(data.topic);
      }
    };
    fetchSession();
  }, [sessionId]);

  // Fetch and subscribe to players
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('session_players')
        .select('id, player_name, school, is_ready')
        .eq('session_id', sessionId);
      if (data) setPlayers(data);
    };
    fetchPlayers();

    const channel = supabase
      .channel(`waiting-${sessionId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'session_players', filter: `session_id=eq.${sessionId}` },
        () => fetchPlayers()
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'game_sessions', filter: `id=eq.${sessionId}` },
        (payload) => {
          if (payload.new && (payload.new as any).status === 'playing') {
            onGameStart(sessionId, playerId);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId, playerId, onGameStart]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied!', description: 'Room code copied to clipboard' });
  };

  const handleToggleReady = async () => {
    const currentPlayer = players.find(p => p.id === playerId);
    if (!currentPlayer) return;
    await supabase
      .from('session_players')
      .update({ is_ready: !currentPlayer.is_ready })
      .eq('id', playerId);
  };

  const handleStartGame = async () => {
    if (players.length < 2) {
      toast({ title: 'Need at least 2 players', variant: 'destructive' });
      return;
    }
    setIsStarting(true);
    try {
      await supabase
        .from('game_sessions')
        .update({ status: 'playing', started_at: new Date().toISOString(), current_question: 0 })
        .eq('id', sessionId);
      // Host will also receive the realtime event
    } catch {
      toast({ title: 'Failed to start', variant: 'destructive' });
      setIsStarting(false);
    }
  };

  const handleLeave = async () => {
    await supabase.from('session_players').delete().eq('id', playerId);
    onLeave();
  };

  const currentPlayer = players.find(p => p.id === playerId);
  const readyCount = players.filter(p => p.is_ready).length;

  return (
    <div className="max-w-lg mx-auto space-y-4 fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleLeave}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-bold text-foreground">Waiting Room</h2>
      </div>

      {/* Room Code Card */}
      <div className="bg-card rounded-2xl p-6 panda-shadow text-center space-y-3">
        <p className="text-sm text-muted-foreground">Share this code with friends:</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-bold tracking-[0.3em] text-primary">{roomCode}</span>
          <Button variant="ghost" size="sm" onClick={handleCopyCode}>
            {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Topic: <span className="font-bold text-foreground">{topic}</span></p>
      </div>

      {/* Players List */}
      <div className="bg-card rounded-2xl p-4 panda-shadow space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4" />
            Players ({players.length})
          </h3>
          <span className="text-xs text-muted-foreground">{readyCount}/{players.length} ready</span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {players.map((p) => (
            <div
              key={p.id}
              className={`flex items-center justify-between p-3 rounded-xl ${
                p.id === playerId ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
              }`}
            >
              <div>
                <p className="font-medium text-foreground text-sm">
                  {p.player_name}
                  {p.id === playerId && <span className="text-xs text-muted-foreground ml-1">(you)</span>}
                </p>
                <p className="text-xs text-muted-foreground">{p.school}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                p.is_ready ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
              }`}>
                {p.is_ready ? '✓ Ready' : 'Waiting'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!isHost && (
          <Button
            onClick={handleToggleReady}
            variant={currentPlayer?.is_ready ? 'outline' : 'default'}
            className="flex-1"
          >
            {currentPlayer?.is_ready ? 'Not Ready' : "I'm Ready!"}
          </Button>
        )}
        {isHost && (
          <Button
            onClick={handleStartGame}
            disabled={isStarting || players.length < 2}
            className="flex-1 gradient-primary text-white"
          >
            {isStarting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Starting...</>
            ) : (
              <><Play className="w-4 h-4 mr-2" /> Start Quiz ({players.length} players)</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;
