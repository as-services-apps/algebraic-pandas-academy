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

/* ---------------- HARD & NORMAL MATH GENERATOR ---------------- */
const generateQuestion = (isHard: boolean): MathQuestion => {
  if (!isHard) {
    // Normal mode: simple arithmetic
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];

    let answer = 0;
    let question = '';
    switch (op) {
      case '+': answer = a + b; question = `${a} + ${b}`; break;
      case '-': answer = Math.max(a,b)-Math.min(a,b); question = `${Math.max(a,b)} - ${Math.min(a,b)}`; break;
      case '×': answer = a*b; question = `${a} × ${b}`; break;
    }

    const options = [answer];
    while (options.length < 4) {
      const wrong = answer + (Math.floor(Math.random()*10)-5);
      if (wrong !== answer && wrong >= 0 && !options.includes(wrong)) options.push(wrong);
    }
    return { question, answer, options: options.sort(() => Math.random()-0.5) };
  } else {
    // Hard mode: light algebra (Year 7–9 level)
    const type = Math.floor(Math.random() * 4); // 0: simple linear, 1: substitution, 2: one-step mult/div, 3: small factorable quadratic
    let question = '';
    let answer = 0;
    let options: number[] = [];

    switch(type) {
      case 0: { // simple linear ax + b = c
        const a = Math.floor(Math.random()*5)+1;
        const x = Math.floor(Math.random()*10);
        const b = Math.floor(Math.random()*10);
        const c = a*x + b;
        question = `${a}x + ${b} = ${c}, solve for x`;
        answer = x;
        break;
      }
      case 1: { // substitution
        const x = Math.floor(Math.random()*10);
        const y = Math.floor(Math.random()*10);
        const expression = Math.random() < 0.5 ? `2x + y` : `x + 3y`;
        question = `If x=${x} and y=${y}, evaluate ${expression}`;
        answer = expression === '2x + y' ? 2*x + y : x + 3*y;
        break;
      }
      case 2: { // one-step multiplication or division
        const a = Math.floor(Math.random()*10)+1;
        const x = Math.floor(Math.random()*10)+1;
        const op = Math.random() < 0.5 ? '×' : '÷';
        question = op === '×' ? `${x} × ? = ${x*a}, solve for ?` : `${x*a} ÷ ? = ${x}, solve for ?`;
        answer = a;
        break;
      }
      case 3: { // small factorable quadratic x^2 + bx + c = 0
        const x1 = Math.floor(Math.random()*5)+1;
        const x2 = Math.floor(Math.random()*5)+1;
        const b = -(x1+x2);
        const c = x1*x2;
        question = `x² + (${b})x + ${c} = 0, solve for x (smallest positive root)`;
        answer = Math.min(x1,x2);
        break;
      }
    }

    options = [answer];
    while(options.length < 4){
      const wrong = answer + (Math.floor(Math.random()*7)-3);
      if (wrong !== answer && !options.includes(wrong)) options.push(wrong);
    }
    return { question, answer, options: options.sort(() => Math.random()-0.5) };
  }
};


/* ---------------- HELPER FUNCTIONS ---------------- */
const createEmptyBoard = (): Board => Array.from({ length: ROWS }, () => Array(COLS).fill('empty'));

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

/* ---------------- AI ---------------- */
const getAIMove = (board: Board): number => {
  const validCols = board[0].map((cell, idx) => cell === 'empty' ? idx : -1).filter(c => c !== -1);
  return validCols[Math.floor(Math.random() * validCols.length)];
};

/* ---------------- COMPONENT ---------------- */
const ConnectFourMath: React.FC<ConnectFourMathProps> = ({ onBack }) => {
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  const isSoloMode = gameState.gameMode === 'solo';

  const team1 = isTeamMode
    ? gameState.teams[0]
    : { id: '1', name: isSoloMode ? 'You' : 'Player 1', score: 0, color: 'team-1' };

  const team2 = isTeamMode
    ? gameState.teams[1]
    : { id: '2', name: isSoloMode ? 'AI' : 'Player 2', score: 0, color: 'team-2' };

  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'team1' | 'team2'>('team1');
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [winner, setWinner] = useState<'team1' | 'team2' | 'draw' | null>(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [isHardMode, setIsHardMode] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);

  const dropPiece = useCallback((col: number, player: Cell, board: Board) => {
    const newBoard = board.map(r => [...r]);
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r][col] === 'empty') {
        newBoard[r][col] = player;
        return newBoard;
      }
    }
    return null;
  }, []);

  /* ---------- AI TURN ---------- */
  useEffect(() => {
    if (!isSoloMode || currentPlayer !== 'team2' || winner || currentQuestion || isAIThinking) return;

    setIsAIThinking(true);
    const aiCol = getAIMove(board);
    setTimeout(() => {
      setSelectedCol(aiCol);
      setCurrentQuestion(generateQuestion(isHardMode));

      // Simulate AI answering correctly
      setTimeout(() => {
        const newBoard = dropPiece(aiCol, 'team2', board);
        if (newBoard) {
          setBoard(newBoard);
          if (checkWinner(newBoard, 'team2')) {
            setWinner('team2');
            setTeam2Score(prev => prev + 1);
          } else if (isBoardFull(newBoard)) setWinner('draw');
          else setCurrentPlayer('team1');
        }
        setCurrentQuestion(null);
        setSelectedCol(null);
        setIsAIThinking(false);
      }, 1000);
    }, 500);
  }, [board, currentPlayer, winner, currentQuestion, isAIThinking, isHardMode, dropPiece, isSoloMode]);

  const handleColumnClick = (col: number) => {
    if (winner || currentQuestion || isAIThinking || board[0][col] !== 'empty') return;
    if (isSoloMode && currentPlayer === 'team2') return;
    setSelectedCol(col);
    setCurrentQuestion(generateQuestion(isHardMode));
  };

  const handleAnswer = (value: number) => {
    if (!currentQuestion || selectedCol === null) return;

    if (value !== currentQuestion.answer) {
      setCurrentPlayer(p => (p === 'team1' ? 'team2' : 'team1'));
    } else {
      const newBoard = dropPiece(selectedCol, currentPlayer, board);
      if (newBoard) {
        setBoard(newBoard);
        if (checkWinner(newBoard, currentPlayer)) {
          setWinner(currentPlayer);
          confetti();
          if (isTeamMode) updateTeamScore(currentPlayer === 'team1' ? team1.id : team2.id, isHardMode ? 30 : 15);
          currentPlayer === 'team1' ? setTeam1Score(prev => prev + 1) : setTeam2Score(prev => prev + 1);
        } else if (isBoardFull(newBoard)) setWinner('draw');
        else setCurrentPlayer(p => (p === 'team1' ? 'team2' : 'team1'));
      }
    }

    setCurrentQuestion(null);
    setSelectedCol(null);
    setTypedAnswer('');
  };

  const handleTypedSubmit = () => {
    if (!currentQuestion || !typedAnswer.trim()) return;
    const parsed = parseFloat(typedAnswer);
    if (!isNaN(parsed)) handleAnswer(parsed);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setWinner(null);
    setCurrentPlayer('team1');
    setCurrentQuestion(null);
    setSelectedCol(null);
    setTypedAnswer('');
    setIsAIThinking(false);
  };

  const getCurrentTeamName = () => currentPlayer === 'team1' ? team1.name : team2.name;
  const isHumanTurn = !isSoloMode || currentPlayer === 'team1';

  return (
    <div className="space-y-4 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Connect Four Math 🔴🟡</h2>
            <p className="text-xs text-muted-foreground">{isSoloMode ? 'You vs AI' : isTeamMode ? 'Team vs Team' : 'Player vs Player'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={isHardMode ? "destructive" : "outline"} size="sm" onClick={() => setIsHardMode(!isHardMode)}>
            <Keyboard className="w-4 h-4 mr-1" /> {isHardMode ? 'Hard' : 'Normal'}
          </Button>
          <Button variant="outline" size="sm" onClick={resetGame}><RotateCcw className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Scores & Turn */}
      {!winner && (
        <div className={`text-center p-2 rounded-lg ${currentPlayer === 'team1' ? 'bg-secondary' : 'bg-destructive'} text-white font-bold text-sm`}>
          {isAIThinking ? 'AI is thinking...' : `${getCurrentTeamName()}'s Turn!`}
        </div>
      )}

      <div className="flex justify-center gap-6">
        <div className="text-center"><div className="text-2xl">🟡</div><div className="font-bold text-foreground text-sm">{team1.name}: {team1Score}</div></div>
        <div className="text-center"><div className="text-2xl">🔴</div><div className="font-bold text-foreground text-sm">{team2.name}: {team2Score}</div></div>
      </div>

      {/* Board */}
      <div className="bg-card rounded-xl p-3 md:p-4 panda-shadow">
        <div className="flex justify-center">
          <div className="bg-primary/20 p-2 rounded-lg">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
              {board.map((row, rowIdx) =>
                row.map((cell, colIdx) => (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleColumnClick(colIdx)}
                    disabled={!!winner || !!currentQuestion || isAIThinking}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-200 ${cell === 'empty' ? 'bg-background hover:bg-muted cursor-pointer' : cell === 'team1' ? 'bg-secondary shadow-lg' : 'bg-destructive shadow-lg'} ${selectedCol === colIdx && rowIdx === 0 ? 'ring-2 ring-primary' : ''}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Winner */}
        {winner && (
          <div className="text-center mt-4">
            <div className={`text-xl font-bold ${winner === 'draw' ? 'text-muted-foreground' : winner === 'team1' ? 'text-secondary' : 'text-destructive'}`}>
              {winner === 'team1' && `🎉 ${team1.name} Wins!`}
              {winner === 'team2' && `🎉 ${team2.name} Wins!`}
              {winner === 'draw' && "🤝 Draw!"}
            </div>
            <Button onClick={resetGame} size="sm" className="mt-2">Play Again</Button>
          </div>
        )}

        {/* Question Modal */}
        {currentQuestion && isHumanTurn && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in p-4">
            <div className="bg-card rounded-xl p-4 md:p-6 max-w-sm w-full panda-shadow scale-in">
              <h3 className="text-lg font-bold text-center mb-1 text-foreground">{getCurrentTeamName()}'s Question</h3>
              {isHardMode && <p className="text-xs text-center text-muted-foreground mb-2">Use * for × and / for ÷</p>}
              <div className="text-3xl font-bold text-center text-primary mb-4">{currentQuestion.question} = ?</div>
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
                  <Button onClick={handleTypedSubmit} className="w-full" disabled={!typedAnswer.trim()}>Submit</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {currentQuestion.options.map((option, idx) => (
                    <Button key={idx} variant="outline" size="lg" onClick={() => handleAnswer(option)} className="text-lg py-4 hover:bg-primary hover:text-primary-foreground">{option}</Button>
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
