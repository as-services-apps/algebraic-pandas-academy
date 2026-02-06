import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useMultiplayer } from '@/hooks/useMultiplayer';
import { Question } from '@/types/game';
import { Check, X, Trophy, ArrowRight, Crown, Users, Clock } from 'lucide-react';
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

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowResults(false);
    setTimeLeft(20);
    setStartTime(Date.now());
  }, [session?.current_question]);

  // Timer countdown (students only)
  useEffect(() => {
    if (isFinished || isHost) return;
    
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
  }, [session?.current_question, isFinished, isHost, hasAnswered]);

  const handleTimeUp = useCallback(() => {
    if (!hasAnswered && !isHost && currentQuestion) {
      submitAnswer(currentQuestion.id, -1, false, 20000);
      setHasAnswered(true);
      setShowResults(true);
    }
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
    await nextQuestion();
  };

  // Check for game completion
  useEffect(() => {
    if (isFinished) {
      triggerConfetti();
    }
  }, [isFinished]);

  // Calculate answer stats for host
  const getAnswerStats = () => {
    if (!currentQuestion) return { answered: 0, correct: 0 };
    const answered = players.filter(p => {
      const answers = p.answers || [];
      return answers.some(a => a.questionId === currentQuestion.id);
    }).length;
    const correct = players.filter(p => {
      const answers = p.answers || [];
      return answers.some(a => a.questionId === currentQuestion.id && a.correct);
    }).length;
    return { answered, correct };
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Game finished screen
  if (isFinished) {
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

          {/* Full Leaderboard for Host */}
          {isHost && sortedPlayers.length > 3 && (
            <div className="bg-card rounded-xl p-4 panda-shadow mb-6 max-h-40 overflow-y-auto">
              {sortedPlayers.slice(3).map((player, idx) => (
                <div key={player.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">
                    <span className="font-bold text-muted-foreground mr-2">{idx + 4}.</span>
                    {player.player_name}
                  </span>
                  <span className="text-sm font-medium text-primary">{player.score} pts</span>
                </div>
              ))}
            </div>
          )}

          {/* My Score (Students) */}
          {!isHost && myPlayer && (
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

  // TEACHER VIEW: Scoreboard Only
  if (isHost) {
    const stats = getAnswerStats();
    
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Question {questionNumber}/{totalQuestions}</p>
              <p className="font-bold text-foreground text-lg">{session?.topic}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Answered</p>
                <p className="text-xl font-bold text-primary">{stats.answered}/{players.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Correct</p>
                <p className="text-xl font-bold text-success">{stats.correct}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Current Question Display */}
        <div className="bg-primary/5 border-b border-primary/20 p-4">
          <div className="container mx-auto">
            <p className="text-center text-lg font-medium text-foreground">
              {currentQuestion?.question}
            </p>
          </div>
        </div>

        {/* Live Leaderboard */}
        <main className="flex-1 container mx-auto p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-accent" />
              <h2 className="font-bold text-foreground">Live Leaderboard</h2>
              <span className="text-muted-foreground text-sm">({players.length} players)</span>
            </div>

            <div className="space-y-2">
              {sortedPlayers.map((player, idx) => {
                const hasAnsweredCurrent = (player.answers || []).some(
                  a => a.questionId === currentQuestion?.id
                );
                const answeredCorrect = (player.answers || []).some(
                  a => a.questionId === currentQuestion?.id && a.correct
                );

                return (
                  <div
                    key={player.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl transition-all",
                      idx === 0 ? "bg-accent/20 border-2 border-accent" :
                      idx === 1 ? "bg-muted border border-border" :
                      idx === 2 ? "bg-secondary/50 border border-border" :
                      "bg-card border border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        idx === 0 ? "bg-accent text-accent-foreground" :
                        idx === 1 ? "bg-foreground text-background" :
                        idx === 2 ? "bg-secondary text-secondary-foreground" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{player.player_name}</p>
                        <div className="flex items-center gap-1">
                          {hasAnsweredCurrent ? (
                            answeredCorrect ? (
                              <Check className="w-3 h-3 text-success" />
                            ) : (
                              <X className="w-3 h-3 text-destructive" />
                            )
                          ) : (
                            <Clock className="w-3 h-3 text-muted-foreground animate-pulse" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {hasAnsweredCurrent ? 'Answered' : 'Waiting...'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-primary">{player.score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Next Question Button */}
        <footer className="bg-card border-t border-border p-4">
          <div className="container mx-auto text-center">
            <Button onClick={handleNext} size="lg" className="font-bold px-8">
              <ArrowRight className="w-5 h-5 mr-2" />
              {questionNumber >= totalQuestions ? 'Finish Game' : 'Next Question'}
            </Button>
          </div>
        </footer>
      </div>
    );
  }

  // STUDENT VIEW: Questions Only
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
            <p className={cn(
              "text-3xl font-bold",
              timeLeft <= 5 ? "text-destructive animate-pulse" : "text-primary"
            )}>
              {timeLeft}s
            </p>
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
            const showCorrectness = showResults;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={hasAnswered}
                className={cn(
                  "relative p-4 sm:p-6 rounded-xl font-medium text-left transition-all min-h-[80px]",
                  "border-2 text-foreground",
                  !showCorrectness && !hasAnswered && "bg-card hover:bg-muted/50 border-border hover:border-primary hover:scale-[1.02] active:scale-[0.98]",
                  !showCorrectness && hasAnswered && isSelected && "bg-primary/20 border-primary",
                  !showCorrectness && hasAnswered && !isSelected && "opacity-50 bg-card border-border",
                  showCorrectness && isCorrect && "bg-success/20 border-success",
                  showCorrectness && isSelected && !isCorrect && "bg-destructive/20 border-destructive",
                  showCorrectness && !isSelected && !isCorrect && "opacity-50"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                    showCorrectness && isCorrect ? "bg-success text-success-foreground" :
                    showCorrectness && isSelected && !isCorrect ? "bg-destructive text-destructive-foreground" :
                    "bg-muted"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 break-words text-lg">{option}</span>
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

        {/* Waiting message */}
        {hasAnswered && !isFinished && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-muted-foreground text-sm">
                Waiting for teacher to show next question...
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Score Display */}
      <footer className="bg-card border-t border-border p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{players.length} playing</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Your Score</span>
            <p className="font-bold text-primary">
              {players.find(p => p.id === myPlayerId)?.score || 0} pts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LiveQuiz;
