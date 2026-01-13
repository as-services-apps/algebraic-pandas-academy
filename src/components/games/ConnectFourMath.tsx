import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RotateCcw, Keyboard } from 'lucide-react';
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

/* ---------- helpers unchanged ---------- */

const generateQuestion = (isHard: boolean): MathQuestion => {
  const a = Math.floor(Math.random() * (isHard ? 20 : 12)) + 1;
  const b = Math.floor(Math.random() * (isHard ? 20 : 12)) + 1;
  const ops = isHard ? ['+', '-', '×', '÷'] : ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];

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
    case '÷':
      const product = a * b;
      answer = a;
      question = `${product} ÷ ${b}`;
      break;
    default:
      answer = a + b;
      question = `${a} + ${b}`;
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
  Array(ROWS).fill(null).map(() => Array(COLS).fill('empty'));

const checkWinner = (board: Board, player: Cell): boolean => {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if (board[r][c] === player && board[r][c + 1] === player && board[r][c + 2] === player && board[r][c + 3] === player)
        return true;

  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c < COLS; c++)
      if (board[r][c] === player && board[r + 1][c] === player && board[r + 2][c] === player && board[r + 3][c] === player)
        return true;

  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if (board[r][c] === player && board[r + 1][c + 1] === player && board[r + 2][c + 2] === player && board[r + 3][c + 3] === player)
        return true;

  for (let r = 3; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if (board[r][c] === player && board[r - 1][c + 1] === player && board[r - 2][c + 2] === player && board[r - 3][c + 3] === player)
        return true;

  return false;
};

const isBoardFull = (board: Board): boolean => board[0].every(cell => cell !== 'empty');

/* ---------- component ---------- */

const ConnectFourMath: React.FC<ConnectFourMathProps> = ({ onBack }) => {
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  const isSoloMode = gameState.gameMode === 'solo';

  const team1 = isTeamMode ? gameState.teams[0] : { id: '1', name: isSoloMode ? 'You' : 'Player 1', score: 0, color: 'team-1' };
  const team2 = isTeamMode ? gameState.teams[1] : { id: '2', name: isSoloMode ? 'AI' : 'Player 2', score: 0, color: 'team-2' };

  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [winner, setWinner] = useState<'team1' | 'team2' | 'draw' | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'team1' | 'team2'>('team1');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [isHardMode, setIsHardMode] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);

  const dropPiece = useCallback((col: number, player: Cell, currentBoard: Board): Board | null => {
    const newBoard = currentBoard.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === 'empty') {
        newBoard[row][col] = player;
        return newBoard;
      }
    }
    return null;
  }, []);

  /* ---------- FIX APPLIED HERE ---------- */
  {currentQuestion && (!isSoloMode || currentPlayer === 'team1') && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in p-4">
      {/* modal unchanged */}
    </div>
  )}
};

export default ConnectFourMath;
