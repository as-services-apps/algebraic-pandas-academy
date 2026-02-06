import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useMultiplayer } from '@/hooks/useMultiplayer';
import { Question } from '@/types/game';
import { Check, X, Trophy, ArrowRight, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { triggerConfetti } from '@/lib/confetti';

interface LiveQuizProps {
  isHost: boolean;
  onComplete: () => void;
}

const LiveQuiz: React.FC<LiveQuizProps> = ({ isHost, onComplete }) => {
  const { session, players, myPlayerId, nextQuestion, submitAnswer } = useMultiplayer();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const currentQuestion = session?.questions?.[session.current_question] as Question | undefined;
  const isFinished = session?.status === 'finished';
  const totalQuestions = session?.questions?.length || 0;
  const questionNumber = (session?.current_question || 0) + 1;

  // Timer countdown
  useEffect(() => {
    if (isFinished || showResults || hasAnswered) return;
    
    setTimeLeft(20);
    setStartTime(Date.now());
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasAnswered) {
            handleTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session?.current_question, isFinished]);

  const handleTimeUp = useCallback(() => {
    if (!hasAnswered && !isHost && currentQuestion) {
      submitAnswer(currentQuestion.id, -1, false, 20000);
      setHasAnswered(true);
    }
    setShowResults(true);
  }, [hasAnswered, isHost, currentQuestion, submitAnswer]);

  const handleAnswer = async (answerIndex: number) => {
    if (hasAnswered || isHost || !currentQuestion) return;

    const timeTaken = Date.now() - startTime;
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    await submitAnswer(currentQuestion.id, answerIndex, isCorrect, timeTaken);

    if (isCorrect) {
      triggerConfetti();
    }

    setTimeout(() => setShowResults(true), 500);
  };

  const handleNext = async () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowResults(false);
    await nextQuestion();
  };

  // Check for game completion
  useEffect(() => {
    if (isFinished) {
      triggerConfetti();
    }
  }, [isFinished]);

  // Game finished screen
  if (isFinished) {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const topThree = sortedPlayers.slice(0, 3);
    const myPlayer = players.find(p => p.id === myPlayerId);
    const myRank = sortedPlayers.findIndex(p => p.id === myPlayerId) + 1;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <Trophy className="w-20 h-20 mx-auto text-accent mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-gradient mb-2">Game Over!</h1>
          <p className="text-muted-foreground mb-8">{session?.topic}</p>

          {/* Podium */}
          <div className="flex justify-center items-end gap-2 mb-8">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="text-center">
                <div className="bg-muted rounded-t-lg p-4 h-24 flex items-end justify-center">
                  <span className="text-foreground font-bold text-2xl">2</span>
                </div>
                <div className="bg-card p-2 rounded-b-lg">
                  <p className="font-medium text-sm truncate max-w-[80px]">{topThree[1].player_name}</p>
                  <p className="text-xs text-muted-foreground">{topThree[1].score} pts</p>
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {topThree[0] && (
              <div className="text-center">
                <Crown className="w-8 h-8 mx-auto text-accent mb-1" />
                <div className="bg-accent rounded-t-lg p-4 h-32 flex items-end justify-center">
                  <span className="text-accent-foreground font-bold text-3xl">1</span>
                </div>
                <div className="bg-card p-2 rounded-b-lg">
                  <p className="font-bold truncate max-w-[100px]">{topThree[0].player_name}</p>
                  <p className="text-sm text-primary">{topThree[0].score} pts</p>
                </div>
              </div>
            )}
            
            {/* 3rd Place */}
            {topThree[2] && (
              <div className="text-center">
                <div className="bg-secondary rounded-t-lg p-4 h-16 flex items-end justify-center">
                  <span className="text-secondary-foreground font-bold text-xl">3</span>
                </div>
                <div className="bg-card p-2 rounded-b-lg">
                  <p className="font-medium text-sm truncate max-w-[80px]">{topThree[2].player_name}</p>
                  <p className="text-xs text-muted-foreground">{topThree[2].score} pts</p>
                </div>
              </div>
            )}
          </div>

          {/* My Score */}
          {myPlayer && (
            <div className="bg-card rounded-xl p-4 panda-shadow mb-6">
              <p className="text-muted-foreground text-sm">Your Result</p>
              <p className="text-2xl font-bold text-foreground">
                #{myRank} - {myPlayer.score} points
              </p>
            </div>
          )}

          <Button onClick={onComplete} size="lg" className="font-bold">
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg text-muted-foreground">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Question {questionNumber}/{totalQuestions}</p>
            <p className="font-bold text-foreground">{session?.topic}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{timeLeft}s</p>
            <Progress value={(timeLeft / 20) * 100} className="w-24 h-2" />
          </div>
        </div>
      </header>

      {/* Question Area */}
      <main className="flex-1 container mx-auto p-4 flex flex-col">
        <div className="bg-card rounded-2xl p-6 panda-shadow mb-6 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showCorrectness = showResults || hasAnswered;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={hasAnswered || isHost}
                className={cn(
                  "relative p-4 sm:p-6 rounded-xl font-medium text-left transition-all min-h-[80px]",
                  "border-2 text-foreground",
                  !showCorrectness && "bg-card hover:bg-muted/50 border-border hover:border-primary",
                  showCorrectness && isCorrect && "bg-success/20 border-success",
                  showCorrectness && isSelected && !isCorrect && "bg-destructive/20 border-destructive",
                  hasAnswered && !isSelected && !isCorrect && "opacity-50"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 break-words">{option}</span>
                  {showCorrectness && isCorrect && (
                    <Check className="w-6 h-6 text-success shrink-0" />
                  )}
                  {showCorrectness && isSelected && !isCorrect && (
                    <X className="w-6 h-6 text-destructive shrink-0" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Host Controls */}
        {isHost && showResults && (
          <div className="mt-6 text-center">
            <Button onClick={handleNext} size="lg" className="font-bold">
              <ArrowRight className="w-5 h-5 mr-2" />
              Next Question
            </Button>
          </div>
        )}

        {/* Waiting message for students */}
        {!isHost && hasAnswered && !isFinished && (
          <div className="mt-4 text-center">
            <p className="text-muted-foreground animate-pulse">
              Waiting for next question...
            </p>
          </div>
        )}
      </main>

      {/* Live Leaderboard (Compact) */}
      <footer className="bg-card border-t border-border p-3">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="text-xs text-muted-foreground shrink-0">🏆 Top:</span>
            {[...players].sort((a, b) => b.score - a.score).slice(0, 5).map((player, idx) => (
              <div key={player.id} className="flex items-center gap-1 shrink-0">
                <span className="text-xs font-bold text-primary">{idx + 1}.</span>
                <span className="text-xs text-foreground truncate max-w-[80px]">{player.player_name}</span>
                <span className="text-xs text-muted-foreground">({player.score})</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LiveQuiz;
