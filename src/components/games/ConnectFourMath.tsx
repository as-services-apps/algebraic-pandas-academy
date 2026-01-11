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
      // Ensure clean division
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

const isBoardFull = (board: Board): boolean => {
  return board[0].every(cell => cell !== 'empty');
};

// Simple AI logic
const getAIMove = (board: Board): number => {
  // Check for winning move
  for (let col = 0; col < COLS; col++) {
    if (board[0][col] !== 'empty') continue;
    const testBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (testBoard[row][col] === 'empty') {
        testBoard[row][col] = 'team2';
        if (checkWinner(testBoard, 'team2')) return col;
        break;
      }
    }
  }
  
  // Block player winning move
  for (let col = 0; col < COLS; col++) {
    if (board[0][col] !== 'empty') continue;
    const testBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (testBoard[row][col] === 'empty') {
        testBoard[row][col] = 'team1';
        if (checkWinner(testBoard, 'team1')) return col;
        break;
      }
    }
  }
  
  // Prefer center
  if (board[0][3] === 'empty') return 3;
  
  // Random valid column
  const validCols = [];
  for (let col = 0; col < COLS; col++) {
    if (board[0][col] === 'empty') validCols.push(col);
  }
  return validCols[Math.floor(Math.random() * validCols.length)];
};

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

  // AI turn effect
  useEffect(() => {
    if (isSoloMode && currentPlayer === 'team2' && !winner && !currentQuestion && !isAIThinking) {
      setIsAIThinking(true);
      const aiCol = getAIMove(board);
      
      setTimeout(() => {
        setSelectedCol(aiCol);
        setCurrentQuestion(generateQuestion(isHardMode));
        
        // AI always answers correctly (simulated)
        setTimeout(() => {
          const newBoard = dropPiece(aiCol, 'team2', board);
          if (newBoard) {
            setBoard(newBoard);
            if (checkWinner(newBoard, 'team2')) {
              setWinner('team2');
              setTeam2Score(prev => prev + 1);
            } else if (isBoardFull(newBoard)) {
              setWinner('draw');
            } else {
              setCurrentPlayer('team1');
            }
          }
          setCurrentQuestion(null);
          setSelectedCol(null);
          setIsAIThinking(false);
        }, 1000);
      }, 500);
    }
  }, [isSoloMode, currentPlayer, winner, currentQuestion, isAIThinking, board, dropPiece, isHardMode]);

  const handleColumnSelect = (col: number) => {
    if (winner || currentQuestion || board[0][col] !== 'empty' || isAIThinking) return;
    if (isSoloMode && currentPlayer === 'team2') return;
    setSelectedCol(col);
    setCurrentQuestion(generateQuestion(isHardMode));
  };

  const handleAnswer = (option: number) => {
    if (!currentQuestion || selectedCol === null) return;
    
    const currentCell: Cell = currentPlayer;
    
    if (option === currentQuestion.answer) {
      const newBoard = dropPiece(selectedCol, currentCell, board);
      if (newBoard) {
        setBoard(newBoard);
        
        if (checkWinner(newBoard, currentCell)) {
          setWinner(currentPlayer);
          if (currentPlayer === 'team1') {
            setTeam1Score(prev => prev + 1);
            if (isTeamMode) updateTeamScore(team1.id, isHardMode ? 30 : 15);
          } else {
            setTeam2Score(prev => prev + 1);
            if (isTeamMode) updateTeamScore(team2.id, isHardMode ? 30 : 15);
          }
          confetti();
        } else if (isBoardFull(newBoard)) {
          setWinner('draw');
        } else {
          setCurrentPlayer(currentPlayer === 'team1' ? 'team2' : 'team1');
        }
      }
    } else {
      // Wrong answer - switch to other player without placing piece
      setCurrentPlayer(currentPlayer === 'team1' ? 'team2' : 'team1');
    }
    
    setCurrentQuestion(null);
    setSelectedCol(null);
    setTypedAnswer('');
  };

  const handleTypedSubmit = () => {
    if (!currentQuestion || !typedAnswer.trim()) return;
    const parsed = parseFloat(typedAnswer);
    if (!isNaN(parsed)) {
      handleAnswer(parsed);
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setWinner(null);
    setCurrentQuestion(null);
    setSelectedCol(null);
    setCurrentPlayer('team1');
    setTypedAnswer('');
    setIsAIThinking(false);
  };

  const getCurrentTeamName = () => currentPlayer === 'team1' ? team1.name : team2.name;

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">
              Connect Four Math 🔴🟡
            </h2>
            <p className="text-xs text-muted-foreground">
              {isSoloMode ? 'You vs AI' : isTeamMode ? 'Team vs Team' : 'Player vs Player'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={isHardMode ? "destructive" : "outline"} 
            size="sm"
            onClick={() => setIsHardMode(!isHardMode)}
          >
            <Keyboard className="w-4 h-4 mr-1" />
            {isHardMode ? 'Hard' : 'Normal'}
          </Button>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Current Turn */}
      {!winner && (
        <div className={`text-center p-2 rounded-lg ${currentPlayer === 'team1' ? 'bg-secondary' : 'bg-destructive'} text-white font-bold text-sm`}>
          {isAIThinking ? 'AI is thinking...' : `${getCurrentTeamName()}'s Turn!`}
        </div>
      )}

      <div className="flex justify-center gap-6">
        <div className="text-center">
          <div className="text-2xl">🟡</div>
          <div className="font-bold text-foreground text-sm">{team1.name}: {team1Score}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl">🔴</div>
          <div className="font-bold text-foreground text-sm">{team2.name}: {team2Score}</div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-3 md:p-4 panda-shadow">
        <div className="flex justify-center">
          <div className="bg-primary/20 p-2 rounded-lg">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
              {board.map((row, rowIdx) => 
                row.map((cell, colIdx) => (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleColumnSelect(colIdx)}
                    disabled={!!winner || !!currentQuestion || isAIThinking}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-200 ${
                      cell === 'empty' 
                        ? 'bg-background hover:bg-muted cursor-pointer' 
                        : cell === 'team1'
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
          <div className="text-center mt-4">
            <div className={`text-xl font-bold ${
              winner === 'draw' ? 'text-muted-foreground' : winner === 'team1' ? 'text-secondary' : 'text-destructive'
            }`}>
              {winner === 'team1' && `🎉 ${team1.name} Wins!`}
              {winner === 'team2' && `🎉 ${team2.name} Wins!`}
              {winner === 'draw' && "🤝 Draw!"}
            </div>
            <Button onClick={resetGame} size="sm" className="mt-2">
              Play Again
            </Button>
          </div>
        )}

        {currentQuestion && currentPlayer === 'team1' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in p-4">
            <div className="bg-card rounded-xl p-4 md:p-6 max-w-sm w-full panda-shadow scale-in">
              <h3 className="text-lg font-bold text-center mb-1 text-foreground">
                {getCurrentTeamName()}'s Question
              </h3>
              {isHardMode && (
                <p className="text-xs text-center text-muted-foreground mb-2">
                  Use * for × and / for ÷
                </p>
              )}
              <div className="text-3xl font-bold text-center text-primary mb-4">
                {currentQuestion.question} = ?
              </div>
              
              {isHardMode ? (
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Type answer..."
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTypedSubmit()}
                    className="h-12 text-xl text-center"
                    autoFocus
                  />
                  <Button onClick={handleTypedSubmit} className="w-full" disabled={!typedAnswer.trim()}>
                    Submit
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {currentQuestion.options.map((option, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="lg"
                      onClick={() => handleAnswer(option)}
                      className="text-lg py-4 hover:bg-primary hover:text-primary-foreground"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectFourMath;
