import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { Question, GameTopic, Team } from '@/types/game';
import { generateQuestions } from '@/data/questions';
import { Check, X, Clock, Zap, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from '@/lib/confetti';

interface GamePlayProps {
  topic: GameTopic;
  onComplete: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({ topic, onComplete }) => {
  const { gameState, updateTeamScore, nextRound } = useGame();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  useEffect(() => {
    const qs = generateQuestions(topic.id, gameState.selectedYearGroup);
    setQuestions(qs.length > 0 ? qs : []);
  }, [topic.id, gameState.selectedYearGroup]);

  useEffect(() => {
    if (showResult || gameComplete || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showResult, gameComplete, questions.length]);

  const handleTimeUp = () => {
    if (!isAnswerLocked) {
      setIsAnswerLocked(true);
      setShowResult(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentTeam = gameState.teams[currentTeamIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswerLocked) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswerLocked(true);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      if (gameState.gameMode === 'team' && currentTeam) {
        updateTeamScore(currentTeam.id, currentQuestion.points);
      }
      confetti();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(20);
      setIsAnswerLocked(false);
      
      if (gameState.gameMode === 'team') {
        setCurrentTeamIndex(prev => (prev + 1) % gameState.teams.length);
      }
    } else {
      setGameComplete(true);
      nextRound();
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground mb-4">
          No questions available for Year {gameState.selectedYearGroup} in {topic.name}
        </p>
        <Button onClick={onComplete}>Go Back</Button>
      </div>
    );
  }

  if (gameComplete) {
    const winningTeam = gameState.gameMode === 'team' 
      ? [...gameState.teams].sort((a, b) => b.score - a.score)[0]
      : null;

    return (
      <div className="text-center py-12 bounce-in">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Round Complete!
        </h2>
        
        <div className="bg-card rounded-2xl p-6 panda-shadow max-w-md mx-auto mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-success">{correctCount}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{questions.length}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
          </div>

          {winningTeam && winningTeam.score > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-muted-foreground">Leading Team</p>
              <p className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-secondary" />
                {winningTeam.name}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onComplete}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Choose Topic
          </Button>
          <Button variant="game" onClick={onComplete}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{topic.icon}</span>
          <div>
            <h3 className="font-bold text-foreground">{topic.name}</h3>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
          timeLeft <= 5 
            ? 'bg-destructive text-destructive-foreground animate-pulse' 
            : 'bg-muted text-foreground'
        }`}>
          <Clock className="w-5 h-5" />
          {timeLeft}s
        </div>
      </div>

      {/* Current Team Indicator */}
      {gameState.gameMode === 'team' && currentTeam && (
        <div className={`bg-team-${(currentTeamIndex % 4) + 1} text-white rounded-xl p-3 mb-6 text-center`}>
          <p className="font-bold">{currentTeam.name}'s Turn!</p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-card rounded-3xl p-8 panda-shadow mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentQuestion.difficulty === 'easy' 
              ? 'bg-success/20 text-success' 
              : currentQuestion.difficulty === 'medium'
              ? 'bg-secondary/20 text-secondary'
              : 'bg-destructive/20 text-destructive'
          }`}>
            {currentQuestion.difficulty.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
            +{currentQuestion.points} pts
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          {currentQuestion.question}
        </h2>

        {/* Answer Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = selectedAnswer === index;
            
            let buttonClass = 'bg-muted hover:bg-muted/80 text-foreground border-2 border-transparent';
            
            if (showResult) {
              if (isCorrect) {
                buttonClass = 'bg-success text-white border-2 border-success';
              } else if (isSelected && !isCorrect) {
                buttonClass = 'bg-destructive text-white border-2 border-destructive';
              } else {
                buttonClass = 'bg-muted/50 text-muted-foreground border-2 border-transparent opacity-50';
              }
            } else if (isSelected) {
              buttonClass = 'bg-primary text-primary-foreground border-2 border-primary';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswerLocked}
                className={`p-5 rounded-2xl font-semibold text-lg transition-all duration-200 ${buttonClass} ${
                  !isAnswerLocked ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-left">{option}</span>
                  {showResult && isCorrect && <Check className="w-6 h-6" />}
                  {showResult && isSelected && !isCorrect && <X className="w-6 h-6" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result & Next Button */}
      {showResult && (
        <div className="text-center slide-up">
          <p className={`text-xl font-bold mb-4 ${
            selectedAnswer === currentQuestion.correctAnswer 
              ? 'text-success' 
              : 'text-destructive'
          }`}>
            {selectedAnswer === currentQuestion.correctAnswer 
              ? '🎉 Correct! Great job!' 
              : `❌ Oops! The answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`
            }
          </p>
          <Button variant="game" size="lg" onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
