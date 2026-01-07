import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { User, Users } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface GameModeSelectionProps {
  onSelect: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelect }) => {
  const { setGameMode, gameState } = useGame();

  const handleSelect = (mode: 'solo' | 'team') => {
    setGameMode(mode);
    onSelect();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-8 bounce-in">
          <img 
            src={pandaMascot} 
            alt="Panda Mascot" 
            className="w-24 h-24 mx-auto mb-4 float"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
            How do you want to play?
          </h1>
          <p className="text-muted-foreground text-lg">
            {gameState.userType === 'teacher' 
              ? 'Choose how your class will compete!'
              : 'Challenge yourself or team up with friends!'
            }
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Solo Card */}
          <button
            onClick={() => handleSelect('solo')}
            className="group bg-card p-8 rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-accent slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <User className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Solo Mode</h2>
            <p className="text-muted-foreground">
              Practice on your own or challenge the AI! 🤖
            </p>
          </button>

          {/* Team Card */}
          <button
            onClick={() => handleSelect('team')}
            className="group bg-card p-8 rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-success slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <Users className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Team Mode</h2>
            <p className="text-muted-foreground">
              Compete in teams for ultimate glory! 🏆
            </p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center">
        <p className="text-muted-foreground text-sm">
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </p>
      </footer>
    </div>
  );
};

export default GameModeSelection;
