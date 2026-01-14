import React from 'react';
import { Button } from '@/components/ui/button';
import { GameTopic, YearGroup } from '@/types/game';
import { gameTopics } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { ChevronRight, Zap, ArrowLeft } from 'lucide-react';
import { getSubjectTopics } from '@/lib/subjectQuestionGenerator';

interface TopicSelectorProps {
  onSelectTopic: (topic: GameTopic) => void;
  onBack?: () => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic, onBack }) => {
  const { gameState, setYearGroup, setHardMode } = useGame();

  const yearGroups: YearGroup[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Get topics based on selected subject
  const getTopicsForSubject = () => {
    if (gameState.selectedSubject === 'maths') {
      // Use existing maths topics
      return gameTopics.filter(topic => 
        topic.yearGroups.includes(gameState.selectedYearGroup)
      );
    } else {
      // Use subject-specific topics
      const subjectTopics = getSubjectTopics(gameState.selectedSubject);
      return subjectTopics.map(t => ({
        id: t.id,
        name: t.name,
        icon: t.icon,
        description: t.description,
        yearGroups: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as YearGroup[],
        color: 'primary',
      }));
    }
  };

  const filteredTopics = getTopicsForSubject();

  const subjectNames: Record<string, string> = {
    maths: '🔢 Maths',
    science: '🔬 Science',
    english: '📚 English',
    history: '🏛️ History',
    geography: '🌍 Geography',
    general: '💡 General Knowledge',
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back to Subject Selection */}
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-2" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Subject
        </Button>
      )}

      {/* Current Subject */}
      <div className="bg-primary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">Current Subject</p>
        <h2 className="text-lg sm:text-2xl font-bold text-primary">
          {subjectNames[gameState.selectedSubject] || gameState.selectedSubject}
        </h2>
      </div>

      {/* Year Group Selector */}
      <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 panda-shadow">
        <h3 className="font-bold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Select Year Group</h3>
        <div className="grid grid-cols-6 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
          {yearGroups.map((year) => (
            <button
              key={year}
              onClick={() => setYearGroup(year)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm ${
                gameState.selectedYearGroup === year
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Y{year}
            </button>
          ))}
        </div>
      </div>

      {/* Hard Mode Toggle */}
      <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 panda-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Zap className={`w-4 h-4 sm:w-5 sm:h-5 ${gameState.isHardMode ? 'text-destructive' : 'text-muted-foreground'}`} />
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">Hard Mode</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Type your answers!</p>
            </div>
          </div>
          <button
            onClick={() => setHardMode(!gameState.isHardMode)}
            className={`relative w-12 h-6 sm:w-14 sm:h-8 rounded-full transition-colors duration-200 ${
              gameState.isHardMode ? 'bg-destructive' : 'bg-muted'
            }`}
          >
            <div
              className={`absolute top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                gameState.isHardMode ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5 sm:translate-x-1'
              }`}
            />
          </button>
        </div>
        {gameState.isHardMode && (
          <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-destructive/10 rounded-lg sm:rounded-xl text-xs sm:text-sm text-destructive">
            <strong>⚠️ Hard Mode:</strong> Type your answer exactly!
          </div>
        )}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {filteredTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="group bg-card p-3 sm:p-5 rounded-xl sm:rounded-2xl panda-shadow hover:scale-[1.02] transition-all duration-300 text-left border-2 border-transparent hover:border-primary"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-2xl sm:text-4xl">{topic.icon}</span>
              <div className="flex-1">
                <h3 className="text-sm sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">
                  {topic.description}
                </p>
                <div className="flex items-center gap-1 mt-2 sm:mt-3 text-primary">
                  <span className="text-xs sm:text-sm font-medium">Play Now</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
