import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, LogIn, ArrowLeft } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface MultiplayerChoiceProps {
  onHost: () => void;
  onJoin: () => void;
  onBack: () => void;
}

const MultiplayerChoice: React.FC<MultiplayerChoiceProps> = ({ onHost, onJoin, onBack }) => {
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
        <div className="max-w-md w-full text-center">
          <div className="mb-6 bounce-in">
            <img src={pandaLogo} alt="Panda Logo" className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 float" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-1">Online Multiplayer</h1>
            <p className="text-muted-foreground text-sm">Play with friends on any device! 🌍</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onHost}
              className="group bg-card p-6 sm:p-8 rounded-2xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <PlusCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Host</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">Create a game room</p>
            </button>

            <button
              onClick={onJoin}
              className="group bg-card p-6 sm:p-8 rounded-2xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Join</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">Enter a room code</p>
            </button>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center border-t border-border">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </p>
      </footer>
    </div>
  );
};

export default MultiplayerChoice;
