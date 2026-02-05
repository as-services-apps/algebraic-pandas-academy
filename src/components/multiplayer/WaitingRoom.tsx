import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Users, Copy, Check } from 'lucide-react';
import { useMultiplayer } from '@/hooks/useMultiplayer';
import pandaLogo from '@/assets/panda-logo.png';
import { toast } from 'sonner';

interface WaitingRoomProps {
  isHost: boolean;
  onGameStart: () => void;
  onBack: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ isHost, onGameStart, onBack }) => {
  const { session, players, startGame } = useMultiplayer();
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = async () => {
    if (session?.room_code) {
      await navigator.clipboard.writeText(session.room_code);
      setCopied(true);
      toast.success('Room code copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStart = async () => {
    if (players.length === 0) {
      toast.error('Wait for at least one player to join!');
      return;
    }
    await startGame();
    onGameStart();
  };

  // Check if game has started (for students)
  React.useEffect(() => {
    if (!isHost && session?.status === 'playing') {
      onGameStart();
    }
  }, [session?.status, isHost, onGameStart]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm panda-shadow hover:bg-card transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-6 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-20 h-20 mx-auto mb-3 float"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gradient mb-2">
              {session.topic}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isHost ? 'Share the code with your students' : 'Waiting for the teacher to start...'}
            </p>
          </div>

          {/* Room Code Display */}
          <div className="bg-card rounded-2xl p-6 panda-shadow mb-6 text-center slide-up">
            <p className="text-sm text-muted-foreground mb-2">Room Code</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-bold tracking-[0.3em] text-primary">
                {session.room_code}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
                className="shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-card rounded-2xl p-6 panda-shadow slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">
                Players ({players.length}/30)
              </h2>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">Waiting for players to join...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="bg-muted/50 rounded-lg p-3 text-center animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="font-medium text-foreground text-sm truncate">
                      {player.player_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {player.school}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Start Button (Host Only) */}
          {isHost && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleStart}
                disabled={players.length === 0}
                className="h-14 px-8 text-lg font-bold"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Game ({players.length} players)
              </Button>
            </div>
          )}
        </div>
      </div>

      <footer className="py-4 text-center border-t border-border">
        <a 
          href="https://as-services.info" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors"
        >
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </a>
      </footer>
    </div>
  );
};

export default WaitingRoom;
