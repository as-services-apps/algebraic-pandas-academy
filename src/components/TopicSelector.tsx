import React from 'react';
import { Button } from '@/components/ui/button';
import { GameTopic, YearGroup } from '@/types/game';
import { gameTopics } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { ChevronRight } from 'lucide-react';

interface TopicSelectorProps {
  onSelectTopic: (topic: GameTopic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic }) => {
  const { gameState, setYearGroup } = useGame();

  const yearGroups: YearGroup[] = [7, 8, 9, 10, 11, 12];

  const filteredTopics = gameTopics.filter(topic => 
    topic.yearGroups.includes(gameState.selectedYearGroup)
  );

  const getColorVariant = (color: string): "default" | "secondary" | "accent" | "success" => {
    const variants: Record<string, "default" | "secondary" | "accent" | "success"> = {
      primary: 'default',
      secondary: 'secondary',
      accent: 'accent',
      success: 'success',
    };
    return variants[color] || 'default';
  };

  return (
    <div className="space-y-6">
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
