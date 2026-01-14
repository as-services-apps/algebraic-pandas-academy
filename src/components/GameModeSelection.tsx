import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { User, Users, ArrowLeft } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface GameModeSelectionProps {
  onSelect: () => void;
  onBack?: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelect, onBack }) => {
  const { setGameMode, gameState } = useGame();

  const handleSelect = (mode: 'solo' | 'team') => {
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
              src={pandaMascot} 
              alt="Panda Mascot" 
              className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 float"
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
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Solo Card */}
            <button
              onClick={() => handleSelect('solo')}
              className="group bg-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-accent slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <User className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">Solo</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Practice or challenge AI! 🤖
              </p>
            </button>

            {/* Team Card */}
            <button
              onClick={() => handleSelect('team')}
              className="group bg-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-success slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-success" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">Teams</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Compete for glory! 🏆
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer - scroll to see */}
      <footer className="py-6 text-center">
        <p className="text-muted-foreground text-sm">
          Made by <span className="font-semibold text-foreground">Angad</span>
        </p>
      </footer>
    </div>
  );
};

export default GameModeSelection;
