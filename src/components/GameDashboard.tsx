import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Subject } from '@/types/game';
import Scoreboard from './Scoreboard';
import SubjectSelector from './SubjectSelector';
import TopicInput from './TopicInput';
import CustomGameCreator from './CustomGameCreator';
import MathRacing from './games/MathRacing';
import ConnectFourMath from './games/ConnectFourMath';
import SubjectRacing from './games/SubjectRacing';
import MemoryMatch from './games/MemoryMatch';
import QuizBattle from './games/QuizBattle';
import AISuggestions from './AISuggestions';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, RotateCcw, Car, Grid3X3, Brain, Zap, BookOpen, Sparkles } from 'lucide-react';
import pandaLogo from '@/assets/panda-logo.png';

interface GameDashboardProps {
  onReset: () => void;
}

type DashboardView = 'subjects' | 'games' | 'topicInput' | 'custom' | 'racing' | 'connect4' | 'memory' | 'blitz';
type PendingGame = 'racing' | 'connect4' | 'memory' | 'blitz';

const GameDashboard: React.FC<GameDashboardProps> = ({ onReset }) => {
  const { gameState, setCustomTopic } = useGame();
  const [view, setView] = useState<DashboardView>('subjects');
  const [pendingGame, setPendingGame] = useState<PendingGame | null>(null);

  const handleSubjectSelect = (subject: Subject) => {
    setView('games');
  };

  const handleGameSelect = (game: PendingGame) => {
    setPendingGame(game);
    setView('topicInput');
  };

  const handleTopicSubmit = (topic: string) => {
    setCustomTopic(topic);
    if (pendingGame) {
      setView(pendingGame);
    }
  };

  const handleBackToGames = () => {
    setView('games');
    setPendingGame(null);
    setCustomTopic('');
  };

  const subjectNames: Record<Subject, string> = {
    maths: 'Maths',
    science: 'Science',
    english: 'English',
    french: 'French',
    it: 'IT & Computing',
    history: 'History',
    geography: 'Geography',
    general: 'General Knowledge',
    quicklearn: 'Quick Learn',
  };

  const gameTypeNames: Record<PendingGame, string> = {
    racing: '🏎️ Racing',
    connect4: '🔴🟡 Connect Four',
    memory: '🧠 Memory Match',
    blitz: '⚡ Quiz Blitz',
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
                  {gameState.customTopic && ` • ${gameState.customTopic}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {view !== 'subjects' && (
                <Button variant="ghost" size="sm" onClick={() => setView('subjects')} className="px-2 sm:px-3">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Subjects</span>
                </Button>
              )}
              {view !== 'subjects' && view !== 'games' && (
                <Button variant="ghost" size="sm" onClick={() => setView('games')} className="px-2 sm:px-3">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Games</span>
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
            {view === 'subjects' && (
              <SubjectSelector onSelectSubject={handleSubjectSelect} />
            )}

            {view === 'games' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-foreground">Choose a Game</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      AI generates infinite questions for any topic!
                    </p>
                  </div>
                  {gameState.selectedSubject === 'maths' && (
                    <Button variant="secondary" size="sm" onClick={() => setView('custom')}>
                      <PlusCircle className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Create Game</span>
                      <span className="sm:hidden">Create</span>
                    </Button>
                  )}
                </div>

                {/* Current Subject Banner */}
                <div className="bg-primary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground">Current Subject</p>
                  <h2 className="text-lg sm:text-2xl font-bold text-primary">
                    {subjectNames[gameState.selectedSubject]}
                  </h2>
                </div>

                {/* Interactive Games Grid */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-xl font-bold text-foreground flex items-center gap-2">
                    🎮 Interactive Games
                    {gameState.gameMode === 'team' && (
                      <span className="text-xs sm:text-sm font-normal text-muted-foreground">(Team vs Team)</span>
                    )}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <button
                      onClick={() => handleGameSelect('racing')}
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
                    
                    {gameState.selectedSubject === 'maths' && (
                      <button
                        onClick={() => handleGameSelect('connect4')}
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
                    )}

                    <button
                      onClick={() => handleGameSelect('memory')}
                      className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-left hover:scale-105 transition-transform panda-shadow group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-lg">🧠</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold">Memory Match</h4>
                      <p className="text-white/80 text-xs hidden sm:block">
                        Match Q&A pairs!
                      </p>
                    </button>

                    <button
                      onClick={() => handleGameSelect('blitz')}
                      className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white text-left hover:scale-105 transition-transform panda-shadow group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-lg">⚡</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold">Quiz Blitz</h4>
                      <p className="text-white/80 text-xs hidden sm:block">
                        60 second challenge!
                      </p>
                    </button>
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 panda-shadow">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    How It Works
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium text-foreground">Pick a game</p>
                        <p className="text-muted-foreground">Choose your favorite game mode</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium text-foreground">Enter any topic</p>
                        <p className="text-muted-foreground">Like "Henry VIII" or "Quadratics"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium text-foreground">Play infinitely!</p>
                        <p className="text-muted-foreground">AI creates unique questions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'topicInput' && pendingGame && (
              <TopicInput 
                onSubmit={handleTopicSubmit} 
                onBack={() => setView('games')}
                gameType={gameTypeNames[pendingGame]}
              />
            )}

            {view === 'custom' && (
              <CustomGameCreator 
                onBack={() => setView('games')} 
                onSave={(questions, gameName) => {
                  // Custom game logic - no longer needed for standard flow
                  setView('games');
                }}
              />
            )}

            {view === 'racing' && (
              gameState.selectedSubject === 'maths' ? (
                <MathRacing onBack={handleBackToGames} />
              ) : (
                <SubjectRacing onBack={handleBackToGames} subject={gameState.selectedSubject} />
              )
            )}

            {view === 'connect4' && (
              <ConnectFourMath onBack={handleBackToGames} />
            )}

            {view === 'memory' && (
              <MemoryMatch onBack={handleBackToGames} subject={gameState.selectedSubject} />
            )}

            {view === 'blitz' && (
              <QuizBattle onBack={handleBackToGames} subject={gameState.selectedSubject} />
            )}
          </div>

          {/* Sidebar - Scoreboard */}
          <div className={`space-y-4 ${['racing', 'connect4', 'memory', 'blitz'].includes(view) ? 'hidden lg:block' : ''}`}>
            <Scoreboard />

            {/* AI Suggestions */}
            <AISuggestions />

            {/* Quick Stats */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 panda-shadow hidden sm:block">
              <h3 className="font-bold text-foreground mb-2 sm:mb-3">Quick Tips 💡</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span>📚</span>
                  <span>Enter ANY topic you're studying!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⏱️</span>
                  <span>Answer quickly for bonus points!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✨</span>
                  <span>AI creates infinite unique questions!</span>
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
