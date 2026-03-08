import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGame } from '@/context/GameContext';
import { Loader2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pandaLogo from '@/assets/panda-logo.png';

interface WaitingRoomProps {
  sessionId: string;
  onGameStart: () => void;
  onBack: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ sessionId, onGameStart, onBack }) => {
  const { gameState } = useGame();
  const [topic, setTopic] = useState('');
  const [hostName, setHostName] = useState('');
  const [players, setPlayers] = useState<{ player_name: string; school: string }[]>([]);

  useEffect(() => {
    // Load session info
    const load = async () => {
      const { data: session } = await supabase
        .from('game_sessions')
        .select('topic, host_name, status')
        .eq('id', sessionId)
        .single();
      if (session) {
        setTopic(session.topic);
        setHostName(session.host_name);
        if (session.status === 'playing') onGameStart();
      }
    };
    load();

    // Fetch players
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('session_players')
        .select('player_name, school')
        .eq('session_id', sessionId);
      if (data) setPlayers(data);
    };
    fetchPlayers();

    // Subscribe to changes
    const channel = supabase
      .channel(`waiting-${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'game_sessions',
        filter: `id=eq.${sessionId}`,
      }, (payload: any) => {
        if (payload.new.status === 'playing') {
          onGameStart();
        }
      })
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
  }, [sessionId, onGameStart]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <img src={pandaLogo} alt="Panda" className="w-20 h-20 mx-auto float" />
        <h2 className="text-2xl font-bold text-foreground">You're In! 🎉</h2>
        <p className="text-muted-foreground text-sm">
          Hosted by <span className="font-bold text-foreground">{hostName}</span>
        </p>
        <p className="text-muted-foreground text-sm">
          Topic: <span className="font-bold text-foreground">{topic}</span>
        </p>

        <div className="bg-card rounded-2xl p-4 panda-shadow">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Players ({players.length})</h3>
          </div>
          <div className="space-y-2">
            {players.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-foreground">
                  {p.player_name}
                  {p.player_name === gameState.player?.name && ' (you)'}
                </span>
                <span className="text-xs text-muted-foreground">{p.school}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-primary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Waiting for host to start...</span>
        </div>

        <Button variant="outline" onClick={onBack} className="w-full">
          Leave Game
        </Button>
      </div>
    </div>
  );
};

export default WaitingRoom;
