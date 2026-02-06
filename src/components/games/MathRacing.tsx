import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, Trophy, Zap } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { getUniqueQuestion, startNewQuestionSession } from '@/lib/questionPool';
import confetti from '@/lib/confetti';

interface MathRacingProps {
  onBack: () => void;
}

interface RaceQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
}

const generateQuestion = (yearGroup: number): RaceQuestion => {
  const q = getUniqueQuestion('maths', yearGroup as any);
  return {
    question: q.question,
    correctAnswer: q.options[q.correctAnswer],
    options: q.options,
  };
};

const MathRacing: React.FC<MathRacingProps> = ({ onBack }) => {
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  const isSoloMode = gameState.gameMode === 'solo';

  const team1 = isTeamMode
    ? gameState.teams[0]
    : { id: '1', name: isSoloMode ? 'You' : 'Player 1', score: 0, color: 'team-1' };
  const team2 = isTeamMode
    ? gameState.teams[1]
    : { id: '2', name: isSoloMode ? 'AI' : 'Player 2', score: 0, color: 'team-2' };

  const [team1Position, setTeam1Position] = useState(0);
  const [team2Position, setTeam2Position] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<RaceQuestion | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'team1' | 'team2' | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'team1' | 'team2'>('team1');
  const [streak, setStreak] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isAITurn, setIsAITurn] = useState(false);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<string>('');

  const finishLine = 100;

  const nextQuestion = useCallback(() => {
    setCurrentQuestion(generateQuestion(gameState.selectedYearGroup));
  }, [gameState.selectedYearGroup]);

  useEffect(() => {
    if (isStarted && !currentQuestion && !gameOver) {
      nextQuestion();
    }
  }, [isStarted, currentQuestion, gameOver, nextQuestion]);

  // AI turn handling
  useEffect(() => {
    if (isSoloMode && currentPlayer === 'team2' && isStarted && !gameOver && currentQuestion) {
      setIsAITurn(true);
      const thinkTime = 800 + Math.random() * 1200;
      const timeout = setTimeout(() => {
        const isCorrect = Math.random() > 0.2;
        if (isCorrect) {
          const boost = 10 + streak * 2;
          setTeam2Position((prev) => Math.min(prev + boost, finishLine));
          setStreak((prev) => prev + 1);
        } else {
          setTeam1Position((prev) => Math.min(prev + 5, finishLine));
          setStreak(0);
        }
        setCurrentPlayer('team1');
        setIsAITurn(false);
        nextQuestion();
      }, thinkTime);
      return () => clearTimeout(timeout);
    }
  }, [isSoloMode, currentPlayer, isStarted, gameOver, currentQuestion, streak, nextQuestion]);

  useEffect(() => {
    if (team1Position >= finishLine && !gameOver) {
      setGameOver(true);
      setWinner('team1');
      confetti();
      if (isTeamMode) updateTeamScore(team1.id, 10);
    } else if (team2Position >= finishLine && !gameOver) {
      setGameOver(true);
      setWinner('team2');
      confetti();
      if (isTeamMode) updateTeamScore(team2.id, 10);
    }
  }, [team1Position, team2Position, gameOver, isTeamMode, team1.id, team2.id, updateTeamScore]);

  const handleAnswer = (selectedOption: string) => {
    if (!currentQuestion || gameOver || isAITurn || showFeedback) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setLastCorrectAnswer(currentQuestion.correctAnswer);
    setShowFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      if (isCorrect) {
        const boost = 10 + streak * 2;
        if (currentPlayer === 'team1') {
          setTeam1Position((prev) => Math.min(prev + boost, finishLine));
        } else {
          setTeam2Position((prev) => Math.min(prev + boost, finishLine));
        }
        setStreak((prev) => prev + 1);
      } else {
        const opponentBoost = 8;
        if (currentPlayer === 'team1') {
          setTeam2Position((prev) => Math.min(prev + opponentBoost, finishLine));
        } else {
          setTeam1Position((prev) => Math.min(prev + opponentBoost, finishLine));
        }
        setStreak(0);
      }

      setCurrentPlayer(currentPlayer === 'team1' ? 'team2' : 'team1');
      setShowFeedback(null);
      nextQuestion();
    }, 1200);
  };

  const startRace = () => {
    startNewQuestionSession();
    setIsStarted(true);
    setTeam1Position(0);
    setTeam2Position(0);
    setGameOver(false);
    setWinner(null);
    setStreak(0);
    setCurrentPlayer('team1');
    setIsAITurn(false);
    nextQuestion();
  };

  const getCurrentTeamName = () => (currentPlayer === 'team1' ? team1.name : team2.name);

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              Math Racing 🏎️
            </h2>
            <p className="text-xs text-muted-foreground">
              {isSoloMode ? 'You vs AI' : isTeamMode ? 'Team vs Team' : 'Player vs Player'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 panda-shadow">
        {/* Race Tracks */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🟡</span>
              <span className="font-bold text-foreground text-sm">{team1.name}</span>
            </div>
            <div className="h-10 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="flex-1 border-b-2 border-dashed border-border" />
              </div>
              <div
                className="absolute top-1 bottom-1 left-1 flex items-center transition-all duration-300"
                style={{ left: `${Math.min(team1Position, 90)}%` }}
              >
                <div className="bg-secondary text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">🚗</div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Trophy className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground mt-0.5">{Math.round(team1Position)}%</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔴</span>
              <span className="font-bold text-foreground text-sm">{team2.name}</span>
            </div>
            <div className="h-10 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="flex-1 border-b-2 border-dashed border-border" />
              </div>
              <div
                className="absolute top-1 bottom-1 left-1 flex items-center transition-all duration-300"
                style={{ left: `${Math.min(team2Position, 90)}%` }}
              >
                <div className="bg-destructive text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">🚗</div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Trophy className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground mt-0.5">{Math.round(team2Position)}%</div>
          </div>
        </div>

        {/* Current Turn */}
        {isStarted && !gameOver && (
          <div className="text-center mb-3">
            <div
              className={`inline-block px-3 py-1.5 rounded-full font-bold text-sm ${
                currentPlayer === 'team1' ? 'bg-secondary' : 'bg-destructive'
              } text-white`}
            >
              {isAITurn ? 'AI is racing...' : `${getCurrentTeamName()}'s Turn!`}
            </div>
          </div>
        )}

        {streak > 0 && !isAITurn && (
          <div className="flex items-center justify-center gap-1 mb-3 text-secondary font-bold text-sm">
            <Zap className="w-4 h-4" />
            {streak} Streak! +{streak * 2} bonus!
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
          <div className="text-center space-y-3">
            <div className={`text-xl font-bold ${winner === 'team1' ? 'text-secondary' : 'text-destructive'}`}>
              🎉 {winner === 'team1' ? team1.name : team2.name} Wins!
            </div>
            <Button onClick={startRace}>Race Again!</Button>
          </div>
        ) : currentQuestion && !isAITurn && (
          <div className="space-y-3">
            {showFeedback && (
              <div
                className={`text-center p-4 rounded-xl mb-2 ${
                  showFeedback === 'correct'
                    ? 'bg-success/20 border-2 border-success'
                    : 'bg-destructive/20 border-2 border-destructive'
                }`}
              >
                <p className={`text-xl font-bold ${showFeedback === 'correct' ? 'text-success' : 'text-destructive'}`}>
                  {showFeedback === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
                </p>
                {showFeedback === 'wrong' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Answer: <span className="font-bold text-foreground">{lastCorrectAnswer}</span>
                  </p>
                )}
                {showFeedback === 'wrong' && <p className="text-xs text-destructive mt-1">Opponent gets +8% boost!</p>}
              </div>
            )}

            {!showFeedback && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-2">{currentQuestion.question}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {currentQuestion.options.map((option, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="lg"
                      onClick={() => handleAnswer(option)}
                      className="text-lg py-4 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MathRacing;
