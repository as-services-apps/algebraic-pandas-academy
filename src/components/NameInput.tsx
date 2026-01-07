import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { Player } from '@/types/game';
import pandaMascot from '@/assets/panda-mascot.png';

interface NameInputProps {
  onComplete: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ onComplete }) => {
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <img 
            src={pandaMascot} 
            alt="Panda Mascot" 
            className="w-24 h-24 mx-auto mb-4 float"
          />
          <h1 className="text-4xl font-bold text-gradient mb-2">
            What's your name?
          </h1>
          <p className="text-muted-foreground">
            {isTeacher 
              ? "Let your students know who's in charge! 🎓"
              : "Tell us who you are, champion! 🌟"
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 slide-up">
          <div className="bg-card rounded-3xl p-6 panda-shadow">
            {/* Title Selection for Teachers */}
            {isTeacher && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Title
                </label>
                <div className="flex flex-wrap gap-2">
                  {titles.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTitle(t)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
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
              <label className="block text-sm font-medium text-foreground mb-3">
                {isTeacher ? 'Surname' : 'Your Name'}
              </label>
              <Input
                type="text"
                placeholder={isTeacher ? "Smith" : "Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 text-lg rounded-xl border-2 focus:border-primary"
                autoFocus
              />
            </div>

            {/* Preview */}
            {displayName && (
              <div className="mt-6 p-4 bg-muted rounded-xl text-center">
                <p className="text-sm text-muted-foreground mb-1">You'll be known as:</p>
                <p className="text-2xl font-bold text-foreground">
                  {displayName || '...'}
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="game"
            size="xl"
            className="w-full"
            disabled={!name.trim() || (isTeacher && !title)}
          >
            Continue 🚀
          </Button>
        </form>
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

export default NameInput;
