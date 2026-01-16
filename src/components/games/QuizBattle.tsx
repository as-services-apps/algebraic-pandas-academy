import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Trophy, Clock, Target, Sparkles } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { getUniqueQuestion, getUniqueQuestionAsync, startNewQuestionSession } from '@/lib/questionPool';
import confetti from '@/lib/confetti';
import { Subject, Question } from '@/types/game';

interface QuizBattleProps {
  onBack: () => void;
  subject: Subject;
}

interface BattleQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
}

const subjectEmojis: Record<Subject, string> = {
  maths: '🔢',
  science: '🔬',
  english: '📚',
  french: '🇫🇷',
  it: '💻',
  history: '🏛️',
  geography: '🌍',
  general: '💡',
  quicklearn: '⚡',
};

const subjectNames: Record<Subject, string> = {
  maths: 'Math',
  science: 'Science',
  english: 'English',
  french: 'French',
  it: 'IT',
  history: 'History',
  geography: 'Geography',
  general: 'Trivia',
  quicklearn: 'Quick Learn',
};

const QuizBattle: React.FC<QuizBattleProps> = ({ onBack, subject }) => {
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  const isSoloMode = gameState.gameMode === 'solo';
  const customTopic = gameState.customTopic;
  
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<BattleQuestion | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [teamScores, setTeamScores] = useState<number[]>([0, 0]);
  const [isAIGenerated, setIsAIGenerated] = useState(false);
  const questionBufferRef = useRef<Question[]>([]);

  const convertToQuestion = (q: Question): BattleQuestion => ({
    question: q.question,
    correctAnswer: q.options[q.correctAnswer],
    options: q.options,
  });

  const generateQuestion = useCallback((): BattleQuestion => {
    const q = getUniqueQuestion(subject, gameState.selectedYearGroup);
    return convertToQuestion(q);
  }, [subject, gameState.selectedYearGroup]);

  const loadAIQuestions = useCallback(async () => {
    try {
      const q = await getUniqueQuestionAsync(subject, gameState.selectedYearGroup, customTopic || undefined);
      questionBufferRef.current.push(q);
      setIsAIGenerated(true);
    } catch (error) {
      console.log('Using static questions as fallback');
    }
  }, [subject, gameState.selectedYearGroup, customTopic]);

  const nextQuestion = useCallback(() => {
    // Try to use buffered AI question first
    if (questionBufferRef.current.length > 0) {
      const aiQ = questionBufferRef.current.shift()!;
      setCurrentQuestion(convertToQuestion(aiQ));
      setIsAIGenerated(true);
    } else {
      setCurrentQuestion(generateQuestion());
      setIsAIGenerated(false);
    }
    setShowFeedback(null);
    
    // Pre-load more AI questions in background
    if (questionBufferRef.current.length < 3) {
      loadAIQuestions();
    }
  }, [generateQuestion, loadAIQuestions]);

  // Timer
  useEffect(() => {
    if (!isStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          confetti();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, gameOver]);

  const handleAnswer = (selectedOption: string) => {
    if (gameOver || showFeedback) return;

    const isCorrect = selectedOption === currentQuestion?.correctAnswer;
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    setQuestionsAnswered(prev => prev + 1);

    if (isCorrect) {
      const points = 10 + streak * 5;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setBestStreak(prev => Math.max(prev, streak + 1));
      
      if (isTeamMode) {
        setTeamScores(prev => {
          const newScores = [...prev];
          newScores[currentTeamIndex] += points;
          return newScores;
        });
        updateTeamScore(gameState.teams[currentTeamIndex].id, 1);
      }
    } else {
      setStreak(0);
      if (isTeamMode) {
        setCurrentTeamIndex(prev => (prev + 1) % 2);
      }
    }

    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  const startGame = async () => {
    startNewQuestionSession(); // Clear question history for new game
    questionBufferRef.current = [];
    setIsStarted(true);
    setGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setQuestionsAnswered(0);
    setTeamScores([0, 0]);
    setCurrentTeamIndex(0);
    
    // Pre-load AI questions
    loadAIQuestions();
    
    // Start with a static question immediately for responsiveness
    nextQuestion();
  };

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              {customTopic || subjectNames[subject]} Blitz {subjectEmojis[subject]}
              {isAIGenerated && <Sparkles className="w-4 h-4 text-secondary" />}
            </h2>
            <p className="text-xs text-muted-foreground">
              {customTopic && <span className="text-secondary">Topic: {customTopic} • </span>}
              Answer as many as you can in 60 seconds!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {isStarted && (
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-sm ${
            timeLeft <= 10 
              ? 'bg-destructive text-white animate-pulse' 
              : 'bg-muted text-foreground'
          }`}>
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </div>
          
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-white font-bold text-sm">
                <Zap className="w-4 h-4" />
                {streak}x
              </div>
            )}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-bold text-sm">
              <Target className="w-4 h-4" />
              {score}
            </div>
          </div>
        </div>
      )}

      {/* Team Indicator */}
      {isTeamMode && isStarted && !gameOver && (
        <div className={`text-center p-2 rounded-lg bg-team-${(currentTeamIndex % 4) + 1} text-white font-bold text-sm`}>
          {gameState.teams[currentTeamIndex]?.name}'s Turn!
        </div>
      )}

      <div className="bg-card rounded-xl p-4 md:p-6 panda-shadow">
        {!isStarted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Blitz</h3>
            <p className="text-muted-foreground mb-6">
              Answer as many {subjectNames[subject]} questions as you can in 60 seconds!
            </p>
            <Button onClick={startGame} size="lg" className="gradient-primary text-white">
              <Zap className="w-5 h-5 mr-2" />
              Start Blitz!
            </Button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Time's Up!</h3>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
              <div className="bg-muted rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{score}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div className="bg-muted rounded-xl p-3">
                <p className="text-2xl font-bold text-foreground">{questionsAnswered}</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="bg-muted rounded-xl p-3">
                <p className="text-2xl font-bold text-secondary">{bestStreak}x</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>

            {isTeamMode && (
              <div className="mb-6">
                <p className="text-lg font-bold text-foreground">
                  Winner: {gameState.teams[teamScores[0] >= teamScores[1] ? 0 : 1].name}!
                </p>
                <div className="flex justify-center gap-4 mt-2">
                  {gameState.teams.slice(0, 2).map((team, idx) => (
                    <span key={team.id} className="text-sm text-muted-foreground">
                      {team.name}: {teamScores[idx]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={startGame}>Play Again</Button>
          </div>
        ) : currentQuestion && (
          <div className="space-y-4">
            <div className={`text-center transition-all duration-200 ${
              showFeedback === 'correct' ? 'scale-105' : 
              showFeedback === 'wrong' ? 'shake' : ''
            }`}>
              <div className={`text-xl md:text-2xl font-bold mb-4 p-4 rounded-xl ${
                showFeedback === 'correct' ? 'bg-success/20 text-success' :
                showFeedback === 'wrong' ? 'bg-destructive/20 text-destructive' :
                'text-foreground'
              }`}>
                {currentQuestion.question}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {currentQuestion.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback !== null}
                  className={`text-base py-6 hover:bg-primary hover:text-primary-foreground transition-all ${
                    showFeedback && option === currentQuestion.correctAnswer
                      ? 'bg-success text-white border-success'
                      : ''
                  }`}
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

export default QuizBattle;
