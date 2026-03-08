import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGame } from '@/context/GameContext';
import { Player } from '@/types/game';
import { ArrowLeft, Mail } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';
import { supabase } from '@/integrations/supabase/client';
import { AVAILABLE_SCHOOLS } from '@/data/schools';

interface NameInputProps {
  onComplete: () => void;
  onBack?: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ onComplete, onBack }) => {
  const { gameState, setPlayer } = useGame();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');

  const isTeacher = gameState.userType === 'teacher';

  const titles = ['Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.', 'Prof.'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !school.trim()) return;

    const player: Player = {
      id: `player-${Date.now()}`,
      name: name.trim(),
      title: isTeacher ? title : undefined,
      school: school.trim(),
      type: gameState.userType!,
      score: 0,
    };

    // Save to database for tracking
    await supabase.from('players').insert({
      name: player.name,
      title: player.title || null,
      school: player.school,
      user_type: player.type,
    });

    setPlayer(player);
    onComplete();
  };

  const displayName = isTeacher && title ? `${title} ${name}` : name;

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-3 sm:mb-4 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-2 float"
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
          <form onSubmit={handleSubmit} className="space-y-3 slide-up">
            <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 panda-shadow">
              {/* Title Selection for Teachers */}
              {isTeacher && (
                <div className="mb-3">
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
                    Title
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {titles.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTitle(t)}
                        className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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

              {/* School Selection */}
              <div className="mb-3">
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
                  School Name
                </label>
                <Select value={school} onValueChange={setSchool}>
                  <SelectTrigger className="h-10 sm:h-12 text-base rounded-lg sm:rounded-xl border-2 focus:border-primary">
                    <SelectValue placeholder="Select your school" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_SCHOOLS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1.5 text-[11px] text-muted-foreground flex items-center gap-1 flex-wrap">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span>Want to add your school? Email{' '}
                  <a href="mailto:angad@as-services.info" className="text-primary font-medium hover:underline">
                    angad@as-services.info
                  </a></span>
                </p>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
                  {isTeacher ? 'Surname' : 'Your Name'}
                </label>
                <Input
                  type="text"
                  placeholder={isTeacher ? "Smith" : "Enter your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 sm:h-12 text-base rounded-lg sm:rounded-xl border-2 focus:border-primary"
                />
              </div>

              {/* Preview */}
              {(displayName || school) && (
                <div className="mt-3 p-2.5 bg-muted rounded-lg sm:rounded-xl text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">You'll be known as:</p>
                  <p className="text-lg font-bold text-foreground">
                    {displayName || '...'}
                  </p>
                  {school && (
                    <p className="text-sm text-muted-foreground">
                      from <span className="font-semibold text-foreground">{school}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="game"
              size="lg"
              className="w-full"
              disabled={!name.trim() || !school.trim() || (isTeacher && !title)}
            >
              Continue 🚀
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-3 text-center border-t border-border shrink-0">
        <p className="text-muted-foreground text-xs">
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </p>
      </footer>
    </div>
  );
};

export default NameInput;
