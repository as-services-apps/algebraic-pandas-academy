import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { GraduationCap, Users } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface UserTypeSelectionProps {
  onSelect: () => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect }) => {
  const { setUserType } = useGame();

  const handleSelect = (type: 'student' | 'teacher') => {
    setUserType(type);
    onSelect();
  };

  return (
    <div className="min-h-[120vh] bg-background flex flex-col">
      {/* Main content - fits in viewport */}
      <div className="h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full text-center">
          {/* Header */}
          <div className="mb-4 sm:mb-6 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2 sm:mb-3 float"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1">
              Welcome! <span className="emoji">👋</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Let's get started! Are you a...
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Student Card */}
            <button
              onClick={() => handleSelect('student')}
              className="group bg-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">Student</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Ready to learn and have fun! 📚
              </p>
            </button>

            {/* Teacher Card */}
            <button
              onClick={() => handleSelect('teacher')}
              className="group bg-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-secondary" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">Teacher</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Lead your class to success! 🎓
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

export default UserTypeSelection;
