import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { User, Users, Globe, Globe, ArrowLeft } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface GameModeSelectionProps {
  onSelect: () => void;
  onBack?: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelect, onBack }) => {
  const { setGameMode, gameState } = useGame();

  const handleSelect = (mode: 'solo' | | 'multiplayer' 'team') => {
    setGameMode(mode);
    onSelect();
  };

  return (
    <div className="min-h-[120vh] bg-background flex flex-col">
      {/* Back Button - Mobile */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm panda-shadow hover:bg-card transition-colors md:hidden"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      
      {/* Main content - fits in viewport */}
      <div className="h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full text-center">
          {/* Header */}
          <div className="mb-4 sm:mb-6 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-2 sm:mb-3 float"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
              How do you want to play?
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {gameState.userType === 'teacher' 
                ? 'Choose how your class will compete!'
                : 'Challenge yourself or team up!'
              }
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {/* Solo Card */}
            <button
              onClick={() => handleSelect('solo')}
              className="group bg-card p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-accent slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <User className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent" />
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-foreground mb-1">Solo</h2>
              <p className="text-muted-foreground text-[10px] sm:text-sm">
                Challenge AI! 🤖
              </p>
            </button>

            {/* Team Card */}
            <button
              onClick={() => handleSelect('team')}
              className="group bg-card p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-success slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                <Users className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-success" />
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-foreground mb-1">Teams</h2>
              <p className="text-muted-foreground text-[10px] sm:text-sm">
                Compete locally! 🏆
              </p>
            </button>

            {/* Multiplayer Card */}
            <button
              onClick={() => handleSelect('multiplayer')}
              className="group bg-card p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-foreground mb-1">Online</h2>
              <p className="text-muted-foreground text-[10px] sm:text-sm">
                Play with friends! 🌍
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 sm:py-6 text-center border-t border-border">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </p>
      </footer>
    </div>
  );
};

export default GameModeSelection;
