import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { Player } from '@/types/game';
import { ArrowLeft } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface NameInputProps {
  onComplete: () => void;
  onBack?: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ onComplete, onBack }) => {
  const { gameState, setPlayer } = useGame();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');

  const isTeacher = gameState.userType === 'teacher';

  const titles = ['Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.', 'Prof.'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const player: Player = {
      id: `player-${Date.now()}`,
      name: name.trim(),
      title: isTeacher ? title : undefined,
      type: gameState.userType!,
      score: 0,
    };

    setPlayer(player);
    onComplete();
  };

  const displayName = isTeacher && title ? `${title} ${name}` : name;

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
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-3 sm:mb-4 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-2 float"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
              What's your name?
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {isTeacher 
                ? "Let your students know who's in charge! 🎓"
                : "Tell us who you are, champion! 🌟"
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 slide-up">
            <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 panda-shadow">
              {/* Title Selection for Teachers */}
              {isTeacher && (
                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {titles.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTitle(t)}
                        className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-200 ${
                          title === t
                            ? 'bg-primary text-primary-foreground scale-105'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Name Input */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  {isTeacher ? 'Surname' : 'Your Name'}
                </label>
                <Input
                  type="text"
                  placeholder={isTeacher ? "Smith" : "Enter your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 sm:h-12 text-base rounded-lg sm:rounded-xl border-2 focus:border-primary"
                  autoFocus
                />
              </div>

              {/* Preview */}
              {displayName && (
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-muted rounded-lg sm:rounded-xl text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">You'll be known as:</p>
                  <p className="text-lg sm:text-xl font-bold text-foreground">
                    {displayName || '...'}
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="game"
              size="lg"
              className="w-full"
              disabled={!name.trim() || (isTeacher && !title)}
            >
              Continue 🚀
            </Button>
          </form>
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

export default NameInput;
