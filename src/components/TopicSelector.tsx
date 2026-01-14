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

  const yearGroups: YearGroup[] = [7, 8, 9, 10, 11, 12];

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
        yearGroups: [7, 8, 9, 10, 11, 12] as YearGroup[],
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
    <div className="space-y-6">
      {/* Back to Subject Selection */}
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Subject
        </Button>
      )}

      {/* Current Subject */}
      <div className="bg-primary/10 rounded-2xl p-4 text-center">
        <p className="text-sm text-muted-foreground">Current Subject</p>
        <h2 className="text-2xl font-bold text-primary">
          {subjectNames[gameState.selectedSubject] || gameState.selectedSubject}
        </h2>
      </div>

      {/* Year Group Selector */}
      <div className="bg-card rounded-2xl p-4 panda-shadow">
        <h3 className="font-bold text-foreground mb-3">Select Year Group</h3>
        <div className="flex flex-wrap gap-2">
          {yearGroups.map((year) => (
            <button
              key={year}
              onClick={() => setYearGroup(year)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                gameState.selectedYearGroup === year
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Year {year}
            </button>
          ))}
        </div>
      </div>

      {/* Hard Mode Toggle */}
      <div className="bg-card rounded-2xl p-4 panda-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className={`w-5 h-5 ${gameState.isHardMode ? 'text-destructive' : 'text-muted-foreground'}`} />
            <div>
              <h3 className="font-bold text-foreground">Hard Mode</h3>
              <p className="text-sm text-muted-foreground">Type your answers - no multiple choice!</p>
            </div>
          </div>
          <button
            onClick={() => setHardMode(!gameState.isHardMode)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
              gameState.isHardMode ? 'bg-destructive' : 'bg-muted'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                gameState.isHardMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {gameState.isHardMode && (
          <div className="mt-3 p-3 bg-destructive/10 rounded-xl text-sm text-destructive">
            <strong>⚠️ Hard Mode Active:</strong> Questions are harder and you must type your answer exactly!
          </div>
        )}
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="group bg-card p-5 rounded-2xl panda-shadow hover:scale-[1.02] transition-all duration-300 text-left border-2 border-transparent hover:border-primary"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{topic.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {topic.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-primary">
                  <span className="text-sm font-medium">Play Now</span>
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

export default TopicSelector;
