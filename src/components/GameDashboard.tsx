import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { GameTopic, Question } from '@/types/game';
import Scoreboard from './Scoreboard';
import CustomTopicInput from './CustomTopicInput';
import GamePlay from './GamePlay';
import CustomGameCreator from './CustomGameCreator';
import MathRacing from './games/MathRacing';
import ConnectFourMath from './games/ConnectFourMath';
import SubjectRacing from './games/SubjectRacing';
import MemoryMatch from './games/MemoryMatch';
import QuizBattle from './games/QuizBattle';
import AISuggestions from './AISuggestions';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, RotateCcw, Car, Grid3X3, Brain, Zap } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface GameDashboardProps {
  onReset: () => void;
}

type DashboardView = 'home' | 'playing' | 'custom' | 'racing' | 'connect4' | 'memory' | 'blitz';

const GameDashboard: React.FC<GameDashboardProps> = ({ onReset }) => {
  const { gameState, setCustomQuestions } = useGame();
  const [view, setView] = useState<DashboardView>('home');
  const [selectedTopic, setSelectedTopic] = useState<GameTopic | null>(null);

  const handleCustomTopicQuiz = (questions: Question[]) => {
    setCustomQuestions(questions);
    const customTopic: GameTopic = {
      id: 'custom-topic',
      name: gameState.customTopic || 'Custom Quiz',
      icon: '🎯',
      description: 'AI-generated quiz on your topic',
      yearGroups: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      color: 'primary',
    };
    setSelectedTopic(customTopic);
    setView('playing');
  };

  const handleGameComplete = () => {
    setSelectedTopic(null);
    setCustomQuestions([]);
    setView('home');
  };

  const handleCustomSave = (questions: Question[], gameName: string) => {
    setCustomQuestions(questions);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src={pandaLogo} 
                alt="Panda Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <div>
                <h1 className="text-sm sm:text-xl font-bold text-gradient">The Algebraic Pandas</h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-none">
                  {gameState.player?.name}
                  {gameState.player?.school && ` • ${gameState.player.school}`}
                  {' • Y'}{gameState.selectedYearGroup}
                  {gameState.isHardMode && ' • 🔥'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {view !== 'home' && (
                <Button variant="ghost" size="sm" onClick={() => setView('home')} className="px-2 sm:px-3">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Home</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onReset} className="px-2 sm:px-3">
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">New Game</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-4 sm:gap-6">
          {/* Main Content */}
          <div>
            {view === 'home' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-foreground">Create Your Quiz</h2>
                    <p className="text-sm text-muted-foreground">Type any topic and AI will generate questions</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setView('custom')}>
                    <PlusCircle className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Manual Quiz</span>
                    <span className="sm:hidden">Manual</span>
                  </Button>
                </div>

                {/* Interactive Games Section */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-xl font-bold text-foreground flex items-center gap-2">
                    🎮 Interactive Games
                    {gameState.gameMode === 'team' && (
                      <span className="text-xs sm:text-sm font-normal text-muted-foreground">(Team vs Team)</span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">Pick a game, then enter your topic!</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <button
                      onClick={() => setView('racing')}
                      className="bg-gradient-to-br from-primary to-accent p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-left hover:scale-105 transition-transform panda-shadow group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-lg">🏎️</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold">Racing</h4>
                      <p className="text-white/80 text-xs hidden sm:block">
                        Race to answer first!
                      </p>
                    </button>
                    
                    <button
                      onClick={() => setView('connect4')}
                      className="bg-gradient-to-br from-secondary to-destructive p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-left hover:scale-105 transition-transform panda-shadow group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-lg">🔴🟡</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold">Connect Four</h4>
                      <p className="text-white/80 text-xs hidden sm:block">
                        Classic strategy game!
                      </p>
                    </button>

                    <button
                      onClick={() => setView('memory')}
                      className="bg-gradient-to-br from-primary to-accent p-4 sm:p-5 rounded-xl sm:rounded-2xl text-primary-foreground text-left hover:scale-105 transition-transform panda-shadow group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-lg">🧠</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold">Memory Match</h4>
                      <p className="text-primary-foreground/80 text-xs hidden sm:block">
                        Match Q&A pairs!
                      </p>
                    </button>

                    <button
                      onClick={() => setView('blitz')}
                      className="bg-gradient-to-br from-accent to-secondary p-4 sm:p-5 rounded-xl sm:rounded-2xl text-accent-foreground text-left hover:scale-105 transition-transform panda-shadow group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-lg">⚡</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold">Quiz Blitz</h4>
                      <p className="text-accent-foreground/80 text-xs hidden sm:block">
                        60 second challenge!
                      </p>
                    </button>
                  </div>
                </div>

                {/* Custom Topic Input */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-xl font-bold text-foreground flex items-center gap-2">
                    📚 Classic Quiz Mode
                  </h3>
                  <CustomTopicInput 
                    onStartQuiz={handleCustomTopicQuiz} 
                  />
                </div>
              </div>
            )}

            {view === 'playing' && selectedTopic && (
              <GamePlay 
                topic={selectedTopic} 
                onComplete={handleGameComplete}
                customQuestions={gameState.customQuestions}
              />
            )}

            {view === 'custom' && (
              <CustomGameCreator 
                onBack={() => setView('home')} 
                onSave={handleCustomSave}
              />
            )}

            {view === 'racing' && (
              <SubjectRacing onBack={() => setView('home')} />
            )}

            {view === 'connect4' && (
              <ConnectFourMath onBack={() => setView('home')} />
            )}

            {view === 'memory' && (
              <MemoryMatch onBack={() => setView('home')} />
            )}

            {view === 'blitz' && (
              <QuizBattle onBack={() => setView('home')} />
            )}
          </div>

          {/* Sidebar - Scoreboard - Hidden on mobile when playing */}
          <div className={`space-y-4 ${view === 'playing' ? 'hidden lg:block' : ''}`}>
            <Scoreboard />

            {/* AI Suggestions */}
            <AISuggestions />

            {/* Quick Stats */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 panda-shadow hidden sm:block">
              <h3 className="font-bold text-foreground mb-2 sm:mb-3">Quick Tips 💡</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span>🎯</span>
                  <span>Enter any topic - AI generates questions!</span>
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
          <a 
            href="https://as-services.info" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            <span className="text-[hsl(35,90%,65%)]">👋</span> Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
            <span className="font-semibold text-foreground">AS Services</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default GameDashboard;