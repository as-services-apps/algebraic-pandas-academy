import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, Trophy, Zap } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import confetti from '@/lib/confetti';

interface MathRacingProps {
  onBack: () => void;
}

interface RaceQuestion {
  question: string;
  answer: number;
  options: number[];
}

const generateQuestion = (difficulty: number): RaceQuestion => {
  const a = Math.floor(Math.random() * (10 * difficulty)) + 1;
  const b = Math.floor(Math.random() * (10 * difficulty)) + 1;
  const operators = ['+', '-', '×'];
  const op = operators[Math.floor(Math.random() * (difficulty > 2 ? 3 : 2))];
  
  let answer: number;
  let question: string;
  
  switch (op) {
    case '+':
      answer = a + b;
      question = `${a} + ${b}`;
      break;
    case '-':
      answer = Math.max(a, b) - Math.min(a, b);
      question = `${Math.max(a, b)} - ${Math.min(a, b)}`;
      break;
    case '×':
      answer = a * b;
      question = `${a} × ${b}`;
      break;
    default:
      answer = a + b;
      question = `${a} + ${b}`;
  }
  
  const options = [answer];
  while (options.length < 4) {
    const wrong = answer + (Math.floor(Math.random() * 10) - 5);
    if (wrong !== answer && wrong > 0 && !options.includes(wrong)) {
      options.push(wrong);
    }
  }
  
  return { question, answer, options: options.sort(() => Math.random() - 0.5) };
};

const MathRacing: React.FC<MathRacingProps> = ({ onBack }) => {
  const { gameState, updateTeamScore, updatePlayerScore } = useGame();
  const [playerPosition, setPlayerPosition] = useState(0);
  const [aiPosition, setAiPosition] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<RaceQuestion | null>(null);
  const [difficulty, setDifficulty] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null);
  const [streak, setStreak] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  
  const finishLine = 100;

  const nextQuestion = useCallback(() => {
    setCurrentQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  useEffect(() => {
    if (isStarted && !currentQuestion && !gameOver) {
      nextQuestion();
    }
  }, [isStarted, currentQuestion, gameOver, nextQuestion]);

  useEffect(() => {
    if (!isStarted || gameOver) return;
    
    const aiInterval = setInterval(() => {
      setAiPosition(prev => {
        const newPos = prev + (Math.random() * 3 + 1);
        if (newPos >= finishLine) {
          setGameOver(true);
          setWinner('ai');
          return finishLine;
        }
        return newPos;
      });
    }, 1500);

    return () => clearInterval(aiInterval);
  }, [isStarted, gameOver]);

  useEffect(() => {
    if (playerPosition >= finishLine && !gameOver) {
      setGameOver(true);
      setWinner('player');
      confetti();
      
      if (gameState.gameMode === 'team' && gameState.teams.length > 0) {
        updateTeamScore(gameState.teams[0].id, 10);
      } else if (gameState.player) {
        updatePlayerScore(10);
      }
    }
  }, [playerPosition, gameOver, gameState, updateTeamScore, updatePlayerScore]);

  const handleAnswer = (option: number) => {
    if (!currentQuestion || gameOver) return;
    
    if (option === currentQuestion.answer) {
      const boost = 10 + streak * 2;
      setPlayerPosition(prev => Math.min(prev + boost, finishLine));
      setStreak(prev => prev + 1);
      if (difficulty < 5) setDifficulty(prev => prev + 0.2);
    } else {
      setStreak(0);
      setAiPosition(prev => Math.min(prev + 5, finishLine));
    }
    
    nextQuestion();
  };

  const startRace = () => {
    setIsStarted(true);
    setPlayerPosition(0);
    setAiPosition(0);
    setGameOver(false);
    setWinner(null);
    setStreak(0);
    setDifficulty(1);
    nextQuestion();
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Car className="w-6 h-6 text-primary" />
            Math Racing 🏎️
          </h2>
          <p className="text-muted-foreground">Answer correctly to speed ahead!</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 panda-shadow">
        <div className="space-y-4 mb-6">
          <div className="relative">
            <div className="h-12 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="flex-1 border-b-2 border-dashed border-border" />
              </div>
              <div 
                className="absolute top-1 bottom-1 left-1 flex items-center transition-all duration-300"
                style={{ left: `${Math.min(playerPosition, 95)}%` }}
              >
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  🚗 You
                </div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Start</span>
              <span>{Math.round(playerPosition)}%</span>
              <span>Finish</span>
            </div>
          </div>

          <div className="relative">
            <div className="h-12 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="flex-1 border-b-2 border-dashed border-border" />
              </div>
              <div 
                className="absolute top-1 bottom-1 left-1 flex items-center transition-all duration-300"
                style={{ left: `${Math.min(aiPosition, 95)}%` }}
              >
                <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  🤖 AI
                </div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground mt-1">
              {Math.round(aiPosition)}%
            </div>
          </div>
        </div>

        {streak > 0 && (
          <div className="flex items-center justify-center gap-2 mb-4 text-secondary font-bold">
            <Zap className="w-5 h-5" />
            {streak} Streak! +{streak * 2} bonus speed!
          </div>
        )}

        {!isStarted ? (
          <div className="text-center">
            <Button onClick={startRace} size="lg" className="gradient-primary text-white">
              <Car className="w-5 h-5 mr-2" />
              Start Race!
            </Button>
          </div>
        ) : gameOver ? (
          <div className="text-center space-y-4">
            <div className={`text-3xl font-bold ${winner === 'player' ? 'text-success' : 'text-destructive'}`}>
              {winner === 'player' ? '🎉 You Win! +10 Points!' : '😢 AI Wins!'}
            </div>
            <Button onClick={startRace} size="lg">
              Race Again!
            </Button>
          </div>
        ) : currentQuestion && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-4">
                {currentQuestion.question} = ?
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer(option)}
                  className="text-xl py-6 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathRacing;
