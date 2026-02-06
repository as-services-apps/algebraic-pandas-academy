import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Loader2 } from 'lucide-react';
import { useMultiplayer } from '@/hooks/useMultiplayer';
import { useGame } from '@/context/GameContext';
import pandaLogo from '@/assets/panda-logo.png';

interface JoinGameProps {
  onJoined: () => void;
  onBack: () => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoined, onBack }) => {
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');
  const { joinSession, isLoading } = useMultiplayer();
  const { setPlayer, setGameMode, setMultiplayerSession } = useGame();

  const handleJoin = async () => {
    if (!roomCode.trim() || !nickname.trim()) return;

    const result = await joinSession(roomCode.trim(), nickname.trim(), 'Student');
    if (result) {
      setPlayer({
        id: result.playerId,
        name: nickname.trim(),
        school: 'Student',
        type: 'student',
        score: 0
      });
      setGameMode('multiplayer');
      setMultiplayerSession(result.session.id, result.session.room_code, false);
      onJoined();
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setRoomCode(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && roomCode.length === 6 && nickname.trim()) {
      handleJoin();
    }
  };

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
        <div className="max-w-md w-full">
          <div className="text-center mb-6 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-24 h-24 mx-auto mb-3 float"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
              Join a Game
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter the code from your teacher
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 panda-shadow space-y-5 slide-up">
            {/* Room Code */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Room Code
              </label>
              <Input
                value={roomCode}
                onChange={handleCodeChange}
                onKeyPress={handleKeyPress}
                placeholder="ABCD12"
                className="text-center text-3xl font-bold tracking-[0.3em] uppercase h-16"
                maxLength={6}
                autoFocus
              />
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Nickname
              </label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. SuperPanda123"
                maxLength={20}
                className="text-lg h-12"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will be shown on the leaderboard
              </p>
            </div>

            <Button
              onClick={handleJoin}
              disabled={roomCode.length !== 6 || !nickname.trim() || isLoading}
              className="w-full h-14 text-lg font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-2" />
                  Join Game
                </>
              )}
            </Button>
          </div>
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

export default JoinGame;
