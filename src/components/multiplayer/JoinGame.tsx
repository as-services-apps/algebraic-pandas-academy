import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface JoinGameProps {
  onBack: () => void;
  onJoined: (sessionId: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onBack, onJoined }) => {
  const { gameState } = useGame();
  const [code, setCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    const roomCode = code.trim().toUpperCase();
    if (roomCode.length < 4) {
      toast({ title: 'Invalid code', description: 'Please enter the room code', variant: 'destructive' });
      return;
    }

    setIsJoining(true);
    try {
      // Find session
      const { data: session, error: sErr } = await supabase
        .from('game_sessions')
        .select('id, status')
        .eq('room_code', roomCode)
        .single();

      if (sErr || !session) {
        toast({ title: 'Room not found', description: 'Check the code and try again', variant: 'destructive' });
        return;
      }

      if (session.status !== 'waiting') {
        toast({ title: 'Game already started', description: 'This game is already in progress', variant: 'destructive' });
        return;
      }

      // Check for duplicate names
      const { data: existingPlayers } = await supabase
        .from('session_players')
        .select('player_name')
        .eq('session_id', session.id);

      const playerName = gameState.player?.name || 'Player';
      const isDupe = existingPlayers?.some(p => p.player_name === playerName);
      const finalName = isDupe ? `${playerName} (2)` : playerName;

      // Join
      const { error: jErr } = await supabase.from('session_players').insert({
        session_id: session.id,
        player_name: finalName,
        school: gameState.player?.school || '',
        is_ready: true,
      });

      if (jErr) throw jErr;

      toast({ title: 'Joined! 🎉', description: 'Waiting for host to start...' });
      onJoined(session.id);
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to join', description: 'Something went wrong', variant: 'destructive' });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-card/80 backdrop-blur-sm panda-shadow hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <img src={pandaLogo} alt="Panda" className="w-24 h-24 mx-auto float" />
        <h2 className="text-2xl font-bold text-gradient">Join a Game</h2>
        <p className="text-muted-foreground text-sm">Enter the room code from your host</p>

        <div className="bg-card rounded-2xl p-6 panda-shadow space-y-4">
          <Input
            type="text"
            placeholder="ROOM CODE"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="h-16 text-center text-3xl font-bold tracking-[0.3em] font-mono uppercase"
            maxLength={6}
            disabled={isJoining}
          />

          <Button
            onClick={handleJoin}
            disabled={isJoining || code.trim().length < 4}
            size="lg"
            className="w-full h-14 text-lg gradient-primary text-white"
          >
            {isJoining ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Joining...</>
            ) : (
              <><LogIn className="w-5 h-5 mr-2" /> Join Game</>
            )}
          </Button>
        </div>

        <Button variant="outline" onClick={onBack} className="w-full">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default JoinGame;
