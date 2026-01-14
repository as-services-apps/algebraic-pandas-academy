import React from 'react';
import { Subject } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { ChevronRight } from 'lucide-react';

interface SubjectSelectorProps {
  onSelectSubject: (subject: Subject) => void;
}

const subjects: { id: Subject; name: string; icon: string; description: string; color: string }[] = [
  { id: 'maths', name: 'Maths', icon: '🔢', description: 'Numbers, algebra, geometry and more!', color: 'from-blue-500 to-indigo-600' },
  { id: 'science', name: 'Science', icon: '🔬', description: 'Biology, chemistry and physics!', color: 'from-green-500 to-emerald-600' },
  { id: 'english', name: 'English', icon: '📚', description: 'Grammar, vocabulary and literature!', color: 'from-purple-500 to-violet-600' },
  { id: 'history', name: 'History', icon: '🏛️', description: 'Ancient, medieval and modern history!', color: 'from-amber-500 to-orange-600' },
  { id: 'geography', name: 'Geography', icon: '🌍', description: 'Physical and human geography!', color: 'from-cyan-500 to-teal-600' },
  { id: 'general', name: 'General Knowledge', icon: '💡', description: 'Trivia, sports and nature!', color: 'from-pink-500 to-rose-600' },
];

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelectSubject }) => {
  const { setSubject } = useGame();

  const handleSelect = (subject: Subject) => {
    setSubject(subject);
    onSelectSubject(subject);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Subject</h2>
        <p className="text-muted-foreground">Select a subject to start learning!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => handleSelect(subject.id)}
            className="group bg-card p-5 rounded-2xl panda-shadow hover:scale-[1.02] transition-all duration-300 text-left border-2 border-transparent hover:border-primary"
          >
            <div className="flex items-start gap-4">
              <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${subject.color} text-white`}>
                {subject.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {subject.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-primary">
                  <span className="text-sm font-medium">Select</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
