import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Clock, Trophy, ArrowRight, RotateCcw, Users } from 'lucide-react';
import confetti from '@/lib/confetti';

interface MultiplayerQuizProps {
  sessionId: string;
  playerId: string;
  onComplete: () => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty?: string;
}

interface LeaderboardEntry {
  id: string;
  player_name: string;
  school: string;
  score: number;
}

const MultiplayerQuiz: React.FC<MultiplayerQuizProps> = ({ sessionId, playerId, onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [topic, setTopic] = useState('');
  const [playerName, setPlayerName] = useState('');

  // Load session data
  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase
        .from('game_sessions')
        .select('questions, topic, current_question')
        .eq('id', sessionId)
        .single();

      if (session) {
        const qs = (session.questions as any[]).map((q: any, i: number) => ({
          id: q.id || `q-${i}`,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
        }));
        setQuestions(qs);
        setTopic(session.topic);
        setCurrentIndex(session.current_question || 0);
      }

      const { data: player } = await supabase
        .from('session_players')
        .select('player_name')
        .eq('id', playerId)
        .single();
      if (player) setPlayerName(player.player_name);
    };
    fetchSession();
  }, [sessionId, playerId]);

  // Subscribe to game session changes (host advances questions)
  useEffect(() => {
    const channel = supabase
      .channel(`quiz-${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'game_sessions', filter: `id=eq.${sessionId}` },
        (payload) => {
          const newData = payload.new as any;
          if (newData.status === 'finished') {
            setGameOver(true);
            fetchLeaderboard();
          }
          if (typeof newData.current_question === 'number') {
            setCurrentIndex(newData.current_question);
            setSelectedAnswer(null);
            setShowResult(false);
            setIsLocked(false);
            setTimeLeft(20);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from('session_players')
      .select('id, player_name, school, score')
      .eq('session_id', sessionId)
      .order('score', { ascending: false });
    if (data) setLeaderboard(data);
  }, [sessionId]);

  // Timer
  useEffect(() => {
    if (showResult || gameOver || questions.length === 0) return;
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
  }, [currentIndex, showResult, gameOver, questions.length]);

  const handleTimeUp = () => {
    if (!isLocked) {
      setIsLocked(true);
      setShowResult(true);
    }
  };

  const handleAnswer = async (answerIndex: number) => {
    if (isLocked || !questions[currentIndex]) return;

    setSelectedAnswer(answerIndex);
    setIsLocked(true);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentIndex].correctAnswer;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      setCorrectCount((c) => c + 1);
      confetti();

      // Update score in database
      await supabase
        .from('session_players')
        .update({ score: newScore })
        .eq('id', playerId);
    }

    // Record answer
    const { data: playerData } = await supabase
      .from('session_players')
      .select('answers')
      .eq('id', playerId)
      .single();

    const currentAnswers = (playerData?.answers as any[]) || [];
    await supabase
      .from('session_players')
      .update({
        answers: [...currentAnswers, { questionIndex: currentIndex, answer: answerIndex, correct: isCorrect }],
      })
      .eq('id', playerId);
  };

  const handleNext = async () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= questions.length) {
      // Game over
      await supabase
        .from('game_sessions')
        .update({ status: 'finished', finished_at: new Date().toISOString() })
        .eq('id', sessionId);
      setGameOver(true);
      fetchLeaderboard();
      return;
    }

    // Advance question (any player can advance for themselves, but we update session for sync)
    await supabase
      .from('game_sessions')
      .update({ current_question: nextIdx })
      .eq('id', sessionId);
  };

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    );
  }

  if (gameOver) {
    const myRank = leaderboard.findIndex((e) => e.id === playerId) + 1;
    return (
      <div className="max-w-lg mx-auto text-center py-8 bounce-in space-y-6">
        <div className="text-6xl">🏆</div>
        <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>

        <div className="bg-card rounded-2xl p-6 panda-shadow space-y-4">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-success">{correctCount}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{questions.length}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">#{myRank || '?'}</p>
              <p className="text-xs text-muted-foreground">Rank</p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-card rounded-2xl p-4 panda-shadow text-left space-y-2">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-secondary" /> Leaderboard
          </h3>
          {leaderboard.map((entry, i) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-xl ${
                entry.id === playerId ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-muted-foreground w-6">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                </span>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {entry.player_name}
                    {entry.id === playerId && <span className="text-xs text-muted-foreground ml-1">(you)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.school}</p>
                </div>
              </div>
              <span className="font-bold text-primary">{entry.score} pts</span>
            </div>
          ))}
        </div>

        <Button variant="game" onClick={onComplete}>
          <RotateCcw className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            {topic}
          </h3>
          <p className="text-xs text-muted-foreground">
            Q{currentIndex + 1}/{questions.length} • Score: {score}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-sm ${
          timeLeft <= 5
            ? 'bg-destructive text-destructive-foreground animate-pulse'
            : 'bg-muted text-foreground'
        }`}>
          <Clock className="w-4 h-4" />
          {timeLeft}s
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl p-4 md:p-6 panda-shadow flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            currentQuestion.difficulty === 'easy'
              ? 'bg-success/20 text-success'
              : currentQuestion.difficulty === 'hard'
              ? 'bg-destructive/20 text-destructive'
              : 'bg-secondary/20 text-secondary'
          }`}>
            {(currentQuestion.difficulty || 'medium').toUpperCase()}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">+1 pt</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          {currentQuestion.question}
        </h2>

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
                onClick={() => handleAnswer(index)}
                disabled={isLocked}
                className={`p-3 md:p-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 h-auto min-h-[3rem] overflow-hidden ${buttonClass} ${
                  !isLocked ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-left break-words overflow-hidden text-ellipsis">
                    <span className="line-clamp-2">{option}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="text-center slide-up mt-3">
            <p className={`text-base font-bold mb-2 ${
              selectedAnswer === currentQuestion.correctAnswer ? 'text-success' : 'text-destructive'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? '🎉 Correct!'
                : selectedAnswer === null
                ? `⏱️ Time's up! Answer: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                : `❌ Answer: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
            </p>

            {currentQuestion.explanation && selectedAnswer !== currentQuestion.correctAnswer && (
              <div className="bg-muted/50 rounded-lg p-3 mb-3 text-left border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">💡 </span>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <Button variant="game" size="default" onClick={handleNext}>
              {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>✓ {correctCount} correct</span>
        <span className="text-primary font-medium">{score} points</span>
      </div>
    </div>
  );
};

export default MultiplayerQuiz;
