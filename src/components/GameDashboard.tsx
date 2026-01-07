import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { GameTopic, Question } from '@/types/game';
import Scoreboard from './Scoreboard';
import TopicSelector from './TopicSelector';
import GamePlay from './GamePlay';
import CustomGameCreator from './CustomGameCreator';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, RotateCcw } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface GameDashboardProps {
  onReset: () => void;
}

type DashboardView = 'topics' | 'playing' | 'custom';

const GameDashboard: React.FC<GameDashboardProps> = ({ onReset }) => {
  const { gameState } = useGame();
  const [view, setView] = useState<DashboardView>('topics');
  const [selectedTopic, setSelectedTopic] = useState<GameTopic | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  const handleTopicSelect = (topic: GameTopic) => {
    setSelectedTopic(topic);
    setView('playing');
  };

  const handleGameComplete = () => {
    setSelectedTopic(null);
    setView('topics');
  };

  const handleCustomSave = (questions: Question[]) => {
    setCustomQuestions(questions);
    // Create a custom topic
    const customTopic: GameTopic = {
      id: 'custom',
      name: 'Custom Game',
      icon: '🎮',
      description: 'Your custom maths quiz!',
      yearGroups: [7, 8, 9, 10, 11, 12],
      color: 'accent',
    };
    setSelectedTopic(customTopic);
    setView('playing');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={pandaMascot} 
                alt="Panda" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gradient">The Algebraic Pandas</h1>
                <p className="text-xs text-muted-foreground">
                  {gameState.player?.title ? `${gameState.player.title} ` : ''}{gameState.player?.name}
                  {' • '}Year {gameState.selectedYearGroup}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {view !== 'topics' && (
                <Button variant="ghost" size="sm" onClick={() => setView('topics')}>
                  <Home className="w-4 h-4 mr-1" />
                  Topics
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                New Game
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Content */}
          <div>
            {view === 'topics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Choose a Topic</h2>
                    <p className="text-muted-foreground">Select a maths topic to practice</p>
                  </div>
                  <Button variant="secondary" onClick={() => setView('custom')}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Game
                  </Button>
                </div>
                <TopicSelector onSelectTopic={handleTopicSelect} />
              </div>
            )}

            {view === 'playing' && selectedTopic && (
              <GamePlay topic={selectedTopic} onComplete={handleGameComplete} />
            )}

            {view === 'custom' && (
              <CustomGameCreator 
                onBack={() => setView('topics')} 
                onSave={handleCustomSave}
              />
            )}
          </div>

          {/* Sidebar - Scoreboard */}
          <div className="space-y-4">
            <Scoreboard />

            {/* Quick Stats */}
            <div className="bg-card rounded-2xl p-4 panda-shadow">
              <h3 className="font-bold text-foreground mb-3">Quick Tips 💡</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span>📚</span>
                  <span>Practice different topics to improve!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⏱️</span>
                  <span>Answer quickly for bonus confidence!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🎮</span>
                  <span>Create custom games to test your friends!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
            <span className="font-semibold text-foreground">AS Services</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GameDashboard;
