import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { GameTopic, Question, Subject } from '@/types/game';
import Scoreboard from './Scoreboard';
import TopicSelector from './TopicSelector';
import SubjectSelector from './SubjectSelector';
import GamePlay from './GamePlay';
import CustomGameCreator from './CustomGameCreator';
import MathRacing from './games/MathRacing';
import ConnectFourMath from './games/ConnectFourMath';
import AISuggestions from './AISuggestions';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, RotateCcw, Car, Grid3X3, BookOpen } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface GameDashboardProps {
  onReset: () => void;
}

type DashboardView = 'subjects' | 'topics' | 'playing' | 'custom' | 'racing' | 'connect4';

const GameDashboard: React.FC<GameDashboardProps> = ({ onReset }) => {
  const { gameState, setCustomQuestions } = useGame();
  const [view, setView] = useState<DashboardView>('subjects');
  const [selectedTopic, setSelectedTopic] = useState<GameTopic | null>(null);
  const [customGameName, setCustomGameName] = useState('');

  const handleSubjectSelect = (subject: Subject) => {
    setView('topics');
  };

  const handleTopicSelect = (topic: GameTopic) => {
    setSelectedTopic(topic);
    setView('playing');
  };

  const handleGameComplete = () => {
    setSelectedTopic(null);
    setCustomQuestions([]);
    setView('topics');
  };

  const handleCustomSave = (questions: Question[], gameName: string) => {
    setCustomQuestions(questions);
    setCustomGameName(gameName);
    const customTopic: GameTopic = {
      id: 'custom',
      name: gameName,
      icon: '🎮',
      description: 'Your custom quiz!',
      yearGroups: [7, 8, 9, 10, 11, 12],
      color: 'accent',
    };
    setSelectedTopic(customTopic);
    setView('playing');
  };

  const subjectNames: Record<string, string> = {
    maths: 'Maths',
    science: 'Science',
    english: 'English',
    history: 'History',
    geography: 'Geography',
    general: 'General Knowledge',
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
                  {' • '}{subjectNames[gameState.selectedSubject] || gameState.selectedSubject}
                  {' • '}Year {gameState.selectedYearGroup}
                  {gameState.isHardMode && ' • 🔥 Hard Mode'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {view !== 'subjects' && (
                <Button variant="ghost" size="sm" onClick={() => setView('subjects')}>
                  <BookOpen className="w-4 h-4 mr-1" />
                  Subjects
                </Button>
              )}
              {view !== 'subjects' && view !== 'topics' && (
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

      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Content */}
          <div>
            {view === 'subjects' && (
              <SubjectSelector onSelectSubject={handleSubjectSelect} />
            )}

            {view === 'topics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Choose a Topic</h2>
                    <p className="text-muted-foreground">Select a topic to practice</p>
                  </div>
                  {gameState.selectedSubject === 'maths' && (
                    <Button variant="secondary" onClick={() => setView('custom')}>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Game
                    </Button>
                  )}
                </div>

                {/* Interactive Games Section - Only for Maths */}
                {gameState.selectedSubject === 'maths' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      🎮 Interactive Games
                      {gameState.gameMode === 'team' && (
                        <span className="text-sm font-normal text-muted-foreground">(Team vs Team)</span>
                      )}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setView('racing')}
                        className="bg-gradient-to-br from-primary to-accent p-6 rounded-2xl text-white text-left hover:scale-105 transition-transform panda-shadow group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Car className="w-8 h-8" />
                          <span className="text-2xl">🏎️</span>
                        </div>
                        <h4 className="text-xl font-bold">Math Racing</h4>
                        <p className="text-white/80 text-sm">
                          {gameState.gameMode === 'team' ? 'Team vs Team racing!' : 'Player vs Player racing!'}
                        </p>
                      </button>
                      
                      <button
                        onClick={() => setView('connect4')}
                        className="bg-gradient-to-br from-secondary to-destructive p-6 rounded-2xl text-white text-left hover:scale-105 transition-transform panda-shadow group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Grid3X3 className="w-8 h-8" />
                          <span className="text-2xl">🔴🟡</span>
                        </div>
                        <h4 className="text-xl font-bold">Connect Four Math</h4>
                        <p className="text-white/80 text-sm">
                          {gameState.gameMode === 'team' ? 'Team vs Team battles!' : 'Player vs Player battles!'}
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Topic Selector */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    📚 Practice Topics
                  </h3>
                  <TopicSelector 
                    onSelectTopic={handleTopicSelect} 
                    onBack={() => setView('subjects')}
                  />
                </div>
              </div>
            )}

            {view === 'playing' && selectedTopic && (
              <GamePlay 
                topic={selectedTopic} 
                onComplete={handleGameComplete}
                customQuestions={selectedTopic.id === 'custom' ? gameState.customQuestions : undefined}
              />
            )}

            {view === 'custom' && (
              <CustomGameCreator 
                onBack={() => setView('topics')} 
                onSave={handleCustomSave}
              />
            )}

            {view === 'racing' && (
              <MathRacing onBack={() => setView('topics')} />
            )}

            {view === 'connect4' && (
              <ConnectFourMath onBack={() => setView('topics')} />
            )}
          </div>

          {/* Sidebar - Scoreboard */}
          <div className="space-y-4">
            <Scoreboard />

            {/* AI Suggestions */}
            <AISuggestions />

            {/* Quick Stats */}
            <div className="bg-card rounded-2xl p-4 panda-shadow">
              <h3 className="font-bold text-foreground mb-3">Quick Tips 💡</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span>📚</span>
                  <span>Practice different subjects to improve!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⏱️</span>
                  <span>Answer quickly for bonus confidence!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔥</span>
                  <span>Try Hard Mode for a challenge!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🎮</span>
                  <span>Play interactive games with friends!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 text-center border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-sm">
            <span className="text-[hsl(35,90%,65%)]">👋</span> Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
            <span className="font-semibold text-foreground">AS Services</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GameDashboard;
