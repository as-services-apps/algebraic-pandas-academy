import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import confetti from '@/lib/confetti';

interface ConnectFourMathProps {
  onBack: () => void;
}

interface MathQuestion {
  question: string;
  answer: number;
  options: number[];
}

type Cell = 'empty' | 'team1' | 'team2';
type Board = Cell[][];

const ROWS = 6;
const COLS = 7;

/* ---------------- helpers ---------------- */

const generateQuestion = (isHard: boolean): MathQuestion => {
  const a = Math.floor(Math.random() * (isHard ? 20 : 12)) + 1;
  const b = Math.floor(Math.random() * (isHard ? 20 : 12)) + 1;
  const ops = isHard ? ['+', '-', '×', '÷'] : ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let answer = 0;
  let question = '';

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
    case '÷': {
      const product = a * b;
      answer = a;
      question = `${product} ÷ ${b}`;
      break;
    }
  }

  const options = [answer];
  while (options.length < 4) {
    const wrong = answer + (Math.floor(Math.random() * 10) - 5);
    if (wrong !== answer && wrong >= 0 && !options.includes(wrong)) {
      options.push(wrong);
    }
  }

  return { question, answer, options: options.sort(() => Math.random() - 0.5) };
};

const createEmptyBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill('empty'));

const checkWinner = (board: Board, player: Cell): boolean => {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;

      for (const [dr, dc] of dirs) {
        let count = 1;
        for (let k = 1; k < 4; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) break;
          if (board[nr][nc] !== player) break;
          count++;
        }
        if (count === 4) return true;
      }
    }
  }
  return false;
};

const isBoardFull = (board: Board) => board[0].every(c => c !== 'empty');

/* ---------------- component ---------------- */

const ConnectFourMath: React.FC<ConnectFourMathProps> = ({ onBack }) => {
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  const isSoloMode = gameState.gameMode === 'solo';

  const team1 = isTeamMode
    ? gameState.teams[0]
    : { id: '1', name: isSoloMode ? 'You' : 'Player 1', score: 0 };

  const team2 = isTeamMode
    ? gameState.teams[1]
    : { id: '2', name: isSoloMode ? 'AI' : 'Player 2', score: 0 };

  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'team1' | 'team2'>('team1');
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [winner, setWinner] = useState<'team1' | 'team2' | 'draw' | null>(null);
  const [isHardMode] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  /* ---------- AI TURN ---------- */
  useEffect(() => {
    if (!isSoloMode || currentPlayer !== 'team2' || winner) return;

    setIsAIThinking(true);
    const col = Math.floor(Math.random() * COLS);

    setTimeout(() => {
      setBoard(prev => {
        const next = prev.map(r => [...r]);
        for (let r = ROWS - 1; r >= 0; r--) {
          if (next[r][col] === 'empty') {
            next[r][col] = 'team2';
            break;
          }
        }
        return next;
      });

      setIsAIThinking(false);
      setCurrentPlayer('team1');
    }, 800);
  }, [currentPlayer, isSoloMode, winner]);

  const handleColumnClick = (col: number) => {
    if (winner || isAIThinking || board[0][col] !== 'empty') return;
    setSelectedCol(col);
    setCurrentQuestion(generateQuestion(isHardMode));
  };

  /* ---------- FIXED ANSWER HANDLER ---------- */
  const handleAnswer = (value: number) => {
    if (!currentQuestion || selectedCol === null) return;

    if (value !== currentQuestion.answer) {
      setCurrentPlayer(p => (p === 'team1' ? 'team2' : 'team1'));
    } else {
      setBoard(prev => {
        const nextBoard = prev.map(r => [...r]);

        for (let r = ROWS - 1; r >= 0; r--) {
          if (nextBoard[r][selectedCol] === 'empty') {
            nextBoard[r][selectedCol] = currentPlayer;
            break;
          }
        }

        if (checkWinner(nextBoard, currentPlayer)) {
          setWinner(currentPlayer);
          confetti();

          if (isTeamMode) {
            updateTeamScore(
              currentPlayer === 'team1' ? team1.id : team2.id,
              isHardMode ? 30 : 15
            );
          }
        } else if (!isBoardFull(nextBoard)) {
          setCurrentPlayer(p => (p === 'team1' ? 'team2' : 'team1'));
        }

        return nextBoard;
      });
    }

    setCurrentQuestion(null);
    setSelectedCol(null);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setWinner(null);
    setCurrentPlayer('team1');
    setCurrentQuestion(null);
    setSelectedCol(null);
  };

  const isHumanTurn = !isSoloMode || currentPlayer === 'team1';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <Button onClick={resetGame}>
          <RotateCcw />
        </Button>
      </div>

      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleColumnClick(c)}
              className={`w-10 h-10 rounded-full ${
                cell === 'team1'
                  ? 'bg-secondary'
                  : cell === 'team2'
                  ? 'bg-destructive'
                  : 'bg-muted'
              }`}
            />
          ))
        )}
      </div>

      {currentQuestion && isHumanTurn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-center font-bold mb-4">
              {currentPlayer === 'team1' ? team1.name : team2.name}
            </h3>

            <div className="text-center text-3xl mb-4">
              {currentQuestion.question}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {currentQuestion.options.map((o, i) => (
                <Button key={i} onClick={() => handleAnswer(o)}>
                  {o}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectFourMath;
