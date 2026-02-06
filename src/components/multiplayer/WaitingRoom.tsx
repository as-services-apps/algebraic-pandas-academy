import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Users, Copy, Check, Loader2 } from 'lucide-react';
import { useMultiplayer } from '@/hooks/useMultiplayer';
import pandaLogo from '@/assets/panda-logo.png';
import { toast } from 'sonner';

interface WaitingRoomProps {
  isHost: boolean;
  onGameStart: () => void;
  onBack: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ isHost, onGameStart, onBack }) => {
  const { session, players, startGame, isLoading } = useMultiplayer();
  const [copied, setCopied] = React.useState(false);
  const [isStarting, setIsStarting] = React.useState(false);

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
    setIsStarting(true);
    await startGame();
    onGameStart();
  };

  // Check if game has started (for students)
  React.useEffect(() => {
    if (!isHost && session?.status === 'playing') {
      onGameStart();
    }
  }, [session?.status, isHost, onGameStart]);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
              className="w-16 h-16 mx-auto mb-3 float"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gradient mb-1">
              {session.topic}
            </h1>
            <p className="text-muted-foreground text-sm">
              Year {session.year_group} • {session.questions?.length || 0} questions
            </p>
          </div>

          {/* Room Code Display */}
          <div className="bg-card rounded-2xl p-6 panda-shadow mb-6 text-center slide-up">
            <p className="text-sm text-muted-foreground mb-2">
              {isHost ? 'Share this code with your students' : 'Room Code'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl sm:text-6xl font-bold tracking-[0.2em] text-primary font-mono">
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
            {isHost && (
              <p className="text-xs text-muted-foreground mt-3">
                Students can join at the app and enter this code
              </p>
            )}
          </div>

          {/* Players List */}
          <div className="bg-card rounded-2xl p-6 panda-shadow slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">
                  Players Joined
                </h2>
              </div>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {players.length}/30
              </span>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">Waiting for players to join...</p>
                  {!isHost && (
                    <p className="text-xs text-muted-foreground mt-2">
                      The game will start when your teacher is ready
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-3 text-center animate-in fade-in slide-in-from-bottom-2 border border-primary/20"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="font-bold text-foreground text-sm truncate">
                      {player.player_name}
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
                disabled={players.length === 0 || isStarting}
                className="h-14 px-10 text-lg font-bold"
                size="lg"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Game ({players.length} players)
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                All players will see the first question when you start
              </p>
            </div>
          )}

          {/* Waiting message for students */}
          {!isHost && players.length > 0 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <p className="text-muted-foreground text-sm">
                  Waiting for teacher to start the game...
                </p>
              </div>
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
