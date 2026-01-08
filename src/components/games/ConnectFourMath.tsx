import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
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

type Cell = 'empty' | 'player' | 'ai';
type Board = Cell[][];

const ROWS = 6;
const COLS = 7;

const generateQuestion = (): MathQuestion => {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  const ops = ['+', '-', '×'];
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
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[r][c] === player && board[r][c+1] === player && 
          board[r][c+2] === player && board[r][c+3] === player) {
        return true;
      }
    }
  }
  
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] === player && board[r+1][c] === player && 
          board[r+2][c] === player && board[r+3][c] === player) {
        return true;
      }
    }
  }
  
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[r][c] === player && board[r+1][c+1] === player && 
          board[r+2][c+2] === player && board[r+3][c+3] === player) {
        return true;
      }
    }
  }
  
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[r][c] === player && board[r-1][c+1] === player && 
          board[r-2][c+2] === player && board[r-3][c+3] === player) {
        return true;
      }
    }
  }
  
  return false;
};

const ConnectFourMath: React.FC<ConnectFourMathProps> = ({ onBack }) => {
  const { gameState, updateTeamScore, updatePlayerScore } = useGame();
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [winner, setWinner] = useState<'player' | 'ai' | 'draw' | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const dropPiece = useCallback((col: number, player: Cell): Board | null => {
    const newBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === 'empty') {
        newBoard[row][col] = player;
        return newBoard;
      }
    }
    return null;
  }, [board]);

  const aiMove = useCallback((currentBoard: Board) => {
    const availableCols = [];
    for (let c = 0; c < COLS; c++) {
      if (currentBoard[0][c] === 'empty') {
        availableCols.push(c);
      }
    }
    
    if (availableCols.length === 0) {
      setWinner('draw');
      return;
    }
    
    const aiCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    
    const newBoard = currentBoard.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][aiCol] === 'empty') {
        newBoard[row][aiCol] = 'ai';
        break;
      }
    }
    
    setBoard(newBoard);
    
    if (checkWinner(newBoard, 'ai')) {
      setWinner('ai');
      setAiScore(prev => prev + 1);
    }
  }, []);

  const handleColumnSelect = (col: number) => {
    if (winner || currentQuestion || board[0][col] !== 'empty') return;
    setSelectedCol(col);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswer = (option: number) => {
    if (!currentQuestion || selectedCol === null) return;
    
    if (option === currentQuestion.answer) {
      const newBoard = dropPiece(selectedCol, 'player');
      if (newBoard) {
        setBoard(newBoard);
        
        if (checkWinner(newBoard, 'player')) {
          setWinner('player');
          setPlayerScore(prev => prev + 1);
          confetti();
          
          if (gameState.gameMode === 'team' && gameState.teams.length > 0) {
            updateTeamScore(gameState.teams[0].id, 15);
          } else if (gameState.player) {
            updatePlayerScore(15);
          }
        } else {
          setTimeout(() => aiMove(newBoard), 500);
        }
      }
    } else {
      setTimeout(() => aiMove(board), 500);
    }
    
    setCurrentQuestion(null);
    setSelectedCol(null);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setWinner(null);
    setCurrentQuestion(null);
    setSelectedCol(null);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Connect Four Math 🔴🟡
            </h2>
            <p className="text-muted-foreground">Answer correctly to drop your piece!</p>
          </div>
        </div>
        <Button variant="outline" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl">🟡</div>
          <div className="font-bold text-foreground">You: {playerScore}</div>
        </div>
        <div className="text-center">
          <div className="text-3xl">🔴</div>
          <div className="font-bold text-foreground">AI: {aiScore}</div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 panda-shadow">
        <div className="flex justify-center">
          <div className="bg-primary/20 p-3 rounded-xl">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
              {board.map((row, rowIdx) => 
                row.map((cell, colIdx) => (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleColumnSelect(colIdx)}
                    disabled={!!winner || !!currentQuestion}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-200 ${
                      cell === 'empty' 
                        ? 'bg-background hover:bg-muted cursor-pointer' 
                        : cell === 'player'
                        ? 'bg-secondary shadow-lg'
                        : 'bg-destructive shadow-lg'
                    } ${selectedCol === colIdx && rowIdx === 0 ? 'ring-2 ring-primary' : ''}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {winner && (
          <div className="text-center mt-6">
            <div className={`text-3xl font-bold ${
              winner === 'player' ? 'text-success' : winner === 'ai' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {winner === 'player' && '🎉 You Win! +15 Points!'}
              {winner === 'ai' && '😢 AI Wins!'}
              {winner === 'draw' && "🤝 It's a Draw!"}
            </div>
            <Button onClick={resetGame} className="mt-4">
              Play Again!
            </Button>
          </div>
        )}

        {currentQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in">
            <div className="bg-card rounded-2xl p-8 max-w-md w-full mx-4 panda-shadow scale-in">
              <h3 className="text-xl font-bold text-center mb-4 text-foreground">
                Answer to place your piece!
              </h3>
              <div className="text-4xl font-bold text-center text-primary mb-6">
                {currentQuestion.question} = ?
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="lg"
                    onClick={() => handleAnswer(option)}
                    className="text-xl py-6 hover:bg-primary hover:text-primary-foreground"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectFourMath;
