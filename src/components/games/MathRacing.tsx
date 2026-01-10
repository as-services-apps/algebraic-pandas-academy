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
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  
  const team1 = isTeamMode ? gameState.teams[0] : { id: '1', name: 'Player 1', score: 0, color: 'team-1' };
  const team2 = isTeamMode ? gameState.teams[1] : { id: '2', name: 'Player 2', score: 0, color: 'team-2' };
  
  const [team1Position, setTeam1Position] = useState(0);
  const [team2Position, setTeam2Position] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<RaceQuestion | null>(null);
  const [difficulty, setDifficulty] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'team1' | 'team2' | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'team1' | 'team2'>('team1');
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

  const handleAnswer = (option: number) => {
    if (!currentQuestion || gameOver) return;
    
    if (option === currentQuestion.answer) {
      const boost = 10 + streak * 2;
      if (currentPlayer === 'team1') {
        setTeam1Position(prev => Math.min(prev + boost, finishLine));
      } else {
        setTeam2Position(prev => Math.min(prev + boost, finishLine));
      }
      setStreak(prev => prev + 1);
      if (difficulty < 5) setDifficulty(prev => prev + 0.2);
    } else {
      // Wrong answer - opponent gets a boost
      if (currentPlayer === 'team1') {
        setTeam2Position(prev => Math.min(prev + 5, finishLine));
      } else {
        setTeam1Position(prev => Math.min(prev + 5, finishLine));
      }
      setStreak(0);
    }
    
    // Switch players
    setCurrentPlayer(currentPlayer === 'team1' ? 'team2' : 'team1');
    nextQuestion();
  };

  const startRace = () => {
    setIsStarted(true);
    setTeam1Position(0);
    setTeam2Position(0);
    setGameOver(false);
    setWinner(null);
    setStreak(0);
    setDifficulty(1);
    setCurrentPlayer('team1');
    nextQuestion();
  };

  const getCurrentTeamName = () => currentPlayer === 'team1' ? team1.name : team2.name;

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
          <p className="text-muted-foreground">
            {isTeamMode ? 'Team vs Team - Answer correctly to speed ahead!' : 'Player vs Player - Answer correctly to speed ahead!'}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 panda-shadow">
        {/* Team 1 Track */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🟡</span>
              <span className="font-bold text-foreground">{team1.name}</span>
            </div>
            <div className="h-12 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="flex-1 border-b-2 border-dashed border-border" />
              </div>
              <div 
                className="absolute top-1 bottom-1 left-1 flex items-center transition-all duration-300"
                style={{ left: `${Math.min(team1Position, 95)}%` }}
              >
                <div className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  🚗
                </div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Start</span>
              <span>{Math.round(team1Position)}%</span>
              <span>Finish</span>
            </div>
          </div>

          {/* Team 2 Track */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔴</span>
              <span className="font-bold text-foreground">{team2.name}</span>
            </div>
            <div className="h-12 bg-muted rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="flex-1 border-b-2 border-dashed border-border" />
              </div>
              <div 
                className="absolute top-1 bottom-1 left-1 flex items-center transition-all duration-300"
                style={{ left: `${Math.min(team2Position, 95)}%` }}
              >
                <div className="bg-destructive text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  🚗
                </div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground mt-1">
              {Math.round(team2Position)}%
            </div>
          </div>
        </div>

        {/* Current Turn & Streak */}
        {isStarted && !gameOver && (
          <div className="text-center mb-4">
            <div className={`inline-block px-4 py-2 rounded-full font-bold ${
              currentPlayer === 'team1' ? 'bg-secondary' : 'bg-destructive'
            } text-white`}>
              {getCurrentTeamName()}'s Turn!
            </div>
          </div>
        )}

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
            <div className={`text-3xl font-bold ${winner === 'team1' ? 'text-secondary' : 'text-destructive'}`}>
              🎉 {winner === 'team1' ? team1.name : team2.name} Wins! +10 Points!
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