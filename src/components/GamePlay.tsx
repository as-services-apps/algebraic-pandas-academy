import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { Question, GameTopic, Team } from '@/types/game';
import { generateRandomQuestion } from '@/lib/questionGenerator';
import { generateSubjectQuestion } from '@/lib/subjectQuestionGenerator';
import { Check, X, Clock, Zap, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from '@/lib/confetti';

interface GamePlayProps {
  topic: GameTopic;
  onComplete: () => void;
  customQuestions?: Question[];
}

const GamePlay: React.FC<GamePlayProps> = ({ topic, onComplete, customQuestions }) => {
  const { gameState, updateTeamScore, nextRound } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameState.isHardMode ? 30 : 20);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isTypedCorrect, setIsTypedCorrect] = useState<boolean | null>(null);
  const [customQuestionIndex, setCustomQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const generateNextQuestion = useCallback(() => {
    if (customQuestions && customQuestions.length > 0) {
      if (customQuestionIndex < customQuestions.length) {
        setCurrentQuestion(customQuestions[customQuestionIndex]);
      } else {
        setGameComplete(true);
        return;
      }
    } else {
      // Use subject-specific generator
      if (gameState.selectedSubject === 'maths') {
        const newQuestion = generateRandomQuestion(topic.id, gameState.selectedYearGroup);
        setCurrentQuestion(newQuestion);
      } else {
        const newQuestion = generateSubjectQuestion(gameState.selectedSubject, topic.id, gameState.selectedYearGroup);
        setCurrentQuestion(newQuestion);
      }
    }
  }, [customQuestions, customQuestionIndex, topic.id, gameState.selectedYearGroup, gameState.selectedSubject]);

  useEffect(() => {
    generateNextQuestion();
  }, []);

  useEffect(() => {
    if (showResult || gameComplete || !currentQuestion) return;

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
  }, [questionCount, showResult, gameComplete, currentQuestion]);

  const [timeRanOut, setTimeRanOut] = useState(false);

  const handleTimeUp = () => {
    if (!isAnswerLocked) {
      setIsAnswerLocked(true);
      setShowResult(true);
      setTimeRanOut(true);
      if (gameState.isHardMode) {
        setIsTypedCorrect(false);
      }
    }
  };

  const currentTeam = gameState.teams[currentTeamIndex];

  const normalizeAnswer = (answer: string): string => {
    return answer.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const checkTypedAnswer = (typed: string, question: Question): boolean => {
    const correctAnswer = question.options[question.correctAnswer];
    const normalizedTyped = normalizeAnswer(typed);
    const normalizedCorrect = normalizeAnswer(correctAnswer);
    
    // Check for exact match
    if (normalizedTyped === normalizedCorrect) return true;
    
    // For numerical answers, try parsing
    const typedNum = parseFloat(typed.replace(/[^\d.-]/g, ''));
    const correctNum = parseFloat(correctAnswer.replace(/[^\d.-]/g, ''));
    if (!isNaN(typedNum) && !isNaN(correctNum) && typedNum === correctNum) return true;
    
    // Check if answer contains key part (e.g., "x = 5" vs "5")
    if (normalizedCorrect.includes(normalizedTyped) && normalizedTyped.length > 0) return true;
    if (normalizedTyped.includes(normalizedCorrect.replace(/x\s*=\s*/i, ''))) return true;
    
    return false;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswerLocked || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswerLocked(true);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setTotalScore(prev => prev + 1); // Always 1 point per correct answer
      if (gameState.gameMode === 'team' && currentTeam) {
        updateTeamScore(currentTeam.id, 1);
      }
      confetti();
    }
  };

  const handleTypedSubmit = () => {
    if (isAnswerLocked || !typedAnswer.trim() || !currentQuestion) return;
    
    const isCorrect = checkTypedAnswer(typedAnswer, currentQuestion);
    setIsTypedCorrect(isCorrect);
    setIsAnswerLocked(true);
    setShowResult(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setTotalScore(prev => prev + 1); // Always 1 point per correct answer
      if (gameState.gameMode === 'team' && currentTeam) {
        updateTeamScore(currentTeam.id, 1);
      }
      confetti();
    }
  };

  const handleNext = () => {
    setQuestionCount(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(gameState.isHardMode ? 30 : 20);
    setIsAnswerLocked(false);
    setTypedAnswer('');
    setIsTypedCorrect(null);
    setTimeRanOut(false);
    
    if (gameState.gameMode === 'team') {
      setCurrentTeamIndex(prev => (prev + 1) % gameState.teams.length);
    }

    if (customQuestions && customQuestions.length > 0) {
      const nextIndex = customQuestionIndex + 1;
      if (nextIndex >= customQuestions.length) {
        setGameComplete(true);
        nextRound();
        return;
      }
      setCustomQuestionIndex(nextIndex);
      setCurrentQuestion(customQuestions[nextIndex]);
    } else {
      // Generate a new random question based on subject
      if (gameState.selectedSubject === 'maths') {
        const newQuestion = generateRandomQuestion(topic.id, gameState.selectedYearGroup);
        setCurrentQuestion(newQuestion);
      } else {
        const newQuestion = generateSubjectQuestion(gameState.selectedSubject, topic.id, gameState.selectedYearGroup);
        setCurrentQuestion(newQuestion);
      }
    }
  };

  const handleEndGame = () => {
    setGameComplete(true);
    nextRound();
  };

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground mb-4">Loading question...</p>
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
          Game Complete!
        </h2>
        
        <div className="bg-card rounded-2xl p-6 panda-shadow max-w-md mx-auto mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-success">{correctCount}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{questionCount + 1}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{totalScore}</p>
              <p className="text-sm text-muted-foreground">Points</p>
            </div>
          </div>

          {gameState.isHardMode && (
            <div className="mb-4 p-3 bg-destructive/10 rounded-xl text-destructive font-medium">
              🔥 Hard Mode Completed!
            </div>
          )}

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
    <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header - compact */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{topic.icon}</span>
          <div>
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              {topic.name}
              {gameState.isHardMode && (
                <span className="text-xs bg-destructive text-white px-2 py-0.5 rounded-full">HARD</span>
              )}
            </h3>
            <p className="text-xs text-muted-foreground">
              Q{questionCount + 1} • Score: {totalScore}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* End Game Button - only for infinite mode */}
          {(!customQuestions || customQuestions.length === 0) && (
            <Button variant="outline" size="sm" onClick={handleEndGame} className="text-xs">
              End Game
            </Button>
          )}
          
          {/* Timer */}
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-sm ${
            timeLeft <= 5 
              ? 'bg-destructive text-destructive-foreground animate-pulse' 
              : 'bg-muted text-foreground'
          }`}>
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Current Team Indicator */}
      {gameState.gameMode === 'team' && currentTeam && (
        <div className={`bg-team-${(currentTeamIndex % 4) + 1} text-white rounded-lg p-2 mb-3 text-center text-sm`}>
          <p className="font-bold">{currentTeam.name}'s Turn!</p>
        </div>
      )}

      {/* Question Card - flexible height */}
      <div className="bg-card rounded-2xl p-4 md:p-6 panda-shadow flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            currentQuestion.difficulty === 'easy' 
              ? 'bg-success/20 text-success' 
              : currentQuestion.difficulty === 'medium'
              ? 'bg-secondary/20 text-secondary'
              : 'bg-destructive/20 text-destructive'
          }`}>
            {currentQuestion.difficulty.toUpperCase()}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
            +1 pt
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          {currentQuestion.question}
        </h2>

        {/* Hard Mode: Text Input */}
        {gameState.isHardMode ? (
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <p className="text-xs text-muted-foreground text-center">
              Use * for multiplication, / for division
            </p>
            <Input
              type="text"
              placeholder="Type your answer..."
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={isAnswerLocked}
              onKeyDown={(e) => e.key === 'Enter' && handleTypedSubmit()}
              className={`h-12 text-lg text-center rounded-xl ${
                showResult 
                  ? isTypedCorrect 
                    ? 'border-success bg-success/10' 
                    : 'border-destructive bg-destructive/10'
                  : ''
              }`}
            />
            {!isAnswerLocked && (
              <Button 
                variant="game" 
                size="lg" 
                onClick={handleTypedSubmit}
                disabled={!typedAnswer.trim()}
                className="w-full"
              >
                Submit Answer
              </Button>
            )}
          </div>
        ) : (
          /* Normal Mode: Multiple Choice */
          <div className="grid grid-cols-2 gap-2 md:gap-3 flex-1 content-center">
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
                  className={`p-3 md:p-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 ${buttonClass} ${
                    !isAnswerLocked ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-left truncate">{option}</span>
                    {showResult && isCorrect && <Check className="w-5 h-5 shrink-0" />}
                    {showResult && isSelected && !isCorrect && <X className="w-5 h-5 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Result & Next Button - inside card */}
        {showResult && (
          <div className="text-center slide-up mt-3">
            {timeRanOut ? (
              <p className="text-base font-bold mb-2 text-destructive">
                ⏱️ Time ran out! Answer: {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
            ) : gameState.isHardMode ? (
              <p className={`text-base font-bold mb-2 ${isTypedCorrect ? 'text-success' : 'text-destructive'}`}>
                {isTypedCorrect 
                  ? '🎉 Correct!' 
                  : `❌ Answer: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                }
              </p>
            ) : (
              <p className={`text-base font-bold mb-2 ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'text-success' 
                  : 'text-destructive'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? '🎉 Correct!' 
                  : `❌ Answer: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                }
              </p>
            )}
            <Button variant="game" size="default" onClick={handleNext}>
              Next Question
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>✓ {correctCount} correct</span>
        <span className="text-primary font-medium">{totalScore} points</span>
      </div>
    </div>
  );
};

export default GamePlay;