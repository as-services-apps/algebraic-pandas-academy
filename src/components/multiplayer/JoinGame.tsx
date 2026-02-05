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
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const { joinSession, isLoading } = useMultiplayer();
  const { setPlayer, setGameMode } = useGame();

  const handleJoin = async () => {
    if (!roomCode.trim() || !name.trim() || !school.trim()) return;

    const result = await joinSession(roomCode.trim(), name.trim(), school.trim());
    if (result) {
      setPlayer({
        id: result.playerId,
        name: name.trim(),
        school: school.trim(),
        type: 'student',
        score: 0
      });
      setGameMode('multiplayer');
      onJoined();
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setRoomCode(value);
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
              Enter the room code from your teacher
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 panda-shadow space-y-4 slide-up">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Room Code
              </label>
              <Input
                value={roomCode}
                onChange={handleCodeChange}
                placeholder="Enter 6-letter code"
                className="text-center text-2xl font-bold tracking-widest uppercase h-14"
                maxLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School
              </label>
              <Input
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Enter your school"
                maxLength={50}
              />
            </div>

            <Button
              onClick={handleJoin}
              disabled={roomCode.length !== 6 || !name.trim() || !school.trim() || isLoading}
              className="w-full h-12 text-lg font-bold"
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
