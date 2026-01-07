import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { GraduationCap, Users } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-8 bounce-in">
          <img 
            src={pandaMascot} 
            alt="Panda Mascot" 
            className="w-28 h-28 mx-auto mb-4 float"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
            Welcome! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's get started! Are you a...
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Student Card */}
          <button
            onClick={() => handleSelect('student')}
            className="group bg-card p-8 rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Student</h2>
            <p className="text-muted-foreground">
              Ready to learn and have fun with maths! 📚
            </p>
          </button>

          {/* Teacher Card */}
          <button
            onClick={() => handleSelect('teacher')}
            className="group bg-card p-8 rounded-3xl panda-shadow hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <Users className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Teacher</h2>
            <p className="text-muted-foreground">
              Lead your class to maths success! 🎓
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

export default UserTypeSelection;
