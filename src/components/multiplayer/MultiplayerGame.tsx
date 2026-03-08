import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Trophy, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';
import confetti from '@/lib/confetti';

interface MultiplayerGameProps {
  sessionId: string;
  onBack: () => void;
}

interface GameQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const MultiplayerGame: React.FC<MultiplayerGameProps> = ({ sessionId, onBack }) => {
  const { gameState } = useGame();
  const playerName = gameState.player?.name || 'Player';

  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [status, setStatus] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [topic, setTopic] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<{ player_name: string; score: number }[]>([]);
  const [myPlayerId, setMyPlayerId] = useState('');
  const [hostName, setHostName] = useState('');

  // Load session data
  useEffect(() => {
    const loadSession = async () => {
      const { data: session } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (session) {
        setTopic(session.topic);
        setQuestions((session.questions as any) || []);
        setCurrentQ(session.current_question);
        setStatus(session.status as any);
        setHostName(session.host_name);
      }

      // Find my player record
      const { data: players } = await supabase
        .from('session_players')
        .select('id, player_name, score')
        .eq('session_id', sessionId);

      if (players) {
        const me = players.find(p => p.player_name === playerName);
        if (me) {
          setMyPlayerId(me.id);
          setMyScore(me.score);
        }
        setLeaderboard(players.sort((a, b) => b.score - a.score));
      }
    };
    loadSession();
  }, [sessionId, playerName]);

  // Subscribe to session changes (question advancement, status)
  useEffect(() => {
    const channel = supabase
      .channel(`game-${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'game_sessions',
        filter: `id=eq.${sessionId}`,
      }, (payload: any) => {
        const row = payload.new;
        setCurrentQ(row.current_question);
        setStatus(row.status);
        setSelected(null);
        setShowResult(false);
        if (row.status === 'finished') {
          confetti();
        }
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'session_players',
        filter: `session_id=eq.${sessionId}`,
      }, async () => {
        const { data } = await supabase
          .from('session_players')
          .select('id, player_name, score')
          .eq('session_id', sessionId);
        if (data) {
          setLeaderboard(data.sort((a, b) => b.score - a.score));
          const me = data.find(p => p.player_name === playerName);
          if (me) setMyScore(me.score);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId, playerName]);

  const handleAnswer = useCallback(async (optionIdx: number) => {
    if (selected !== null || showResult) return;
    setSelected(optionIdx);
    setShowResult(true);

    const question = questions[currentQ];
    if (!question) return;

    const isCorrect = optionIdx === question.correctAnswer;
    const points = isCorrect ? 1 : 0;

    if (points > 0 && myPlayerId) {
      await supabase
        .from('session_players')
        .update({ score: myScore + points })
        .eq('id', myPlayerId);
      setMyScore(prev => prev + points);
    }

    // Auto advance after delay (host controls question advancement)
    // For now, each player answers independently
  }, [selected, showResult, questions, currentQ, myPlayerId, myScore]);

  // Host: advance question
  const advanceQuestion = async () => {
    const nextQ = currentQ + 1;
    if (nextQ >= questions.length) {
      await supabase
        .from('game_sessions')
        .update({ status: 'finished', finished_at: new Date().toISOString(), current_question: currentQ })
        .eq('id', sessionId);
    } else {
      await supabase
        .from('game_sessions')
        .update({ current_question: nextQ })
        .eq('id', sessionId);
    }
  };

  const isHost = playerName === hostName;

  const question = questions[currentQ];

  if (status === 'waiting') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-bold text-foreground">Waiting for host to start...</h2>
        <p className="text-muted-foreground text-sm mt-2">Topic: {topic}</p>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <Trophy className="w-16 h-16 text-secondary mx-auto" />
          <h2 className="text-3xl font-bold text-gradient">Game Over!</h2>
          <p className="text-muted-foreground">Topic: {topic}</p>

          <div className="bg-card rounded-2xl p-4 panda-shadow space-y-2">
            <h3 className="font-bold text-foreground mb-3">🏆 Leaderboard</h3>
            {leaderboard.map((p, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                  p.player_name === playerName ? 'bg-primary/10 border border-primary/30' : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{i === 0 ? '👑' : `${i + 1}.`}</span>
                  <span className="text-sm font-medium text-foreground">{p.player_name}</span>
                  {p.player_name === playerName && <span className="text-xs text-primary">(you)</span>}
                </div>
                <span className="font-bold text-foreground">{p.score}</span>
              </div>
            ))}
          </div>

          <div className="text-lg font-bold text-foreground">
            Your score: {myScore} / {questions.length}
          </div>

          <Button onClick={onBack} size="lg" className="w-full">
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-sm font-bold text-foreground">{topic}</h1>
              <p className="text-xs text-muted-foreground">Q{currentQ + 1}/{questions.length} • Score: {myScore}</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {leaderboard.length} players
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-4">
          {/* Question */}
          <div className="bg-card rounded-2xl p-4 sm:p-6 panda-shadow">
            <p className="text-xs text-muted-foreground mb-2">Question {currentQ + 1} of {questions.length}</p>
            <h2 className="text-base sm:text-lg font-bold text-foreground">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.correctAnswer;
              const isSelected = selected === i;
              let btnClass = 'w-full h-auto min-h-[3rem] p-3 text-left text-sm rounded-xl border-2 transition-all ';

              if (showResult) {
                if (isCorrect) btnClass += 'border-success bg-success/10 text-foreground';
                else if (isSelected) btnClass += 'border-destructive bg-destructive/10 text-foreground';
                else btnClass += 'border-border bg-card text-muted-foreground opacity-50';
              } else {
                btnClass += 'border-border bg-card text-foreground hover:border-primary hover:bg-primary/5';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold shrink-0">{String.fromCharCode(65 + i)}.</span>
                    <span className="break-words overflow-hidden">{opt}</span>
                    {showResult && isCorrect && <CheckCircle className="w-4 h-4 text-success shrink-0 ml-auto" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive shrink-0 ml-auto" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {showResult && (
            <div className="space-y-3">
              {question.explanation && (
                <div className="bg-muted rounded-xl p-3 text-sm text-muted-foreground">
                  💡 {question.explanation}
                </div>
              )}
              {/* Host can advance */}
              <Button onClick={advanceQuestion} size="lg" className="w-full gradient-primary text-white">
                {currentQ + 1 >= questions.length ? 'Finish Game' : 'Next Question →'}
              </Button>
            </div>
          )}

          {/* Mini leaderboard */}
          <div className="bg-card rounded-xl p-3 panda-shadow">
            <p className="text-xs font-bold text-muted-foreground mb-2">🏆 Live Scores</p>
            <div className="flex flex-wrap gap-2">
              {leaderboard.slice(0, 6).map((p, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.player_name === playerName ? 'bg-primary/20 text-primary font-bold' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {p.player_name}: {p.score}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultiplayerGame;
