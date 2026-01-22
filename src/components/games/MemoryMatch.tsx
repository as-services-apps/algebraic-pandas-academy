import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Brain, Trophy, Sparkles } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import confetti from '@/lib/confetti';
import { Question } from '@/types/game';
import GameTopicInput from './GameTopicInput';

interface MemoryMatchProps {
  onBack: () => void;
}

interface MemoryCard {
  id: number;
  content: string;
  type: 'question' | 'answer';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC<MemoryMatchProps> = ({ onBack }) => {
  const { gameState, updateTeamScore } = useGame();
  const isTeamMode = gameState.gameMode === 'team' && gameState.teams.length >= 2;
  
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [gameTopic, setGameTopic] = useState('');
  const [showTopicInput, setShowTopicInput] = useState(true);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [teamScores, setTeamScores] = useState<number[]>([0, 0]);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = 6;

  const generateCardsFromQuestions = useCallback((questions: Question[]): MemoryCard[] => {
    const newCards: MemoryCard[] = [];
    
    questions.slice(0, totalPairs).forEach((q, i) => {
      newCards.push({
        id: i * 2,
        content: q.question,
        type: 'question',
        pairId: i,
        isFlipped: false,
        isMatched: false,
      });
      newCards.push({
        id: i * 2 + 1,
        content: q.options[q.correctAnswer],
        type: 'answer',
        pairId: i,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    return newCards;
  }, []);

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);

      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first)!;
      const secondCard = cards.find(c => c.id === second)!;

      setTimeout(() => {
        if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
          // Match found!
          setCards(prev => prev.map(c => 
            c.pairId === firstCard.pairId ? { ...c, isMatched: true, isFlipped: true } : c
          ));
          setMatches(prev => prev + 1);
          
          if (isTeamMode) {
            setTeamScores(prev => {
              const newScores = [...prev];
              newScores[currentTeamIndex] += 1;
              return newScores;
            });
            updateTeamScore(gameState.teams[currentTeamIndex].id, 2);
          }

          if (matches + 1 === totalPairs) {
            setGameComplete(true);
            confetti();
          }
        } else {
          // No match - flip back
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          if (isTeamMode) {
            setCurrentTeamIndex(prev => (prev + 1) % gameState.teams.length);
          }
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setCurrentTeamIndex(0);
    setTeamScores([0, 0]);
    setGameComplete(false);
    setIsChecking(false);
    setCards(generateCardsFromQuestions(gameQuestions));
  };

  const handleStartGame = (questions: Question[], topic: string) => {
    setGameQuestions(questions);
    setGameTopic(topic);
    setShowTopicInput(false);
    setCards(generateCardsFromQuestions(questions));
  };

  const handleBackToTopic = () => {
    setShowTopicInput(true);
    setGameQuestions([]);
    setGameTopic('');
    setCards([]);
    setGameComplete(false);
  };

  if (showTopicInput) {
    return (
      <GameTopicInput
        onStartGame={handleStartGame}
        onBack={onBack}
        gameTitle="Memory Match 🧠"
        gameIcon={<Brain className="w-5 h-5 text-primary" />}
        questionCount={8}
      />
    );
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleBackToTopic}>
            ← Back
          </Button>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Memory: {gameTopic}
              <Sparkles className="w-4 h-4 text-secondary" />
            </h2>
            <p className="text-xs text-muted-foreground">
              Match questions with their answers!
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-1" />
          New Game
        </Button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 text-sm">
        <div className="bg-card px-4 py-2 rounded-lg panda-shadow">
          <span className="text-muted-foreground">Moves:</span>{' '}
          <span className="font-bold text-foreground">{moves}</span>
        </div>
        <div className="bg-card px-4 py-2 rounded-lg panda-shadow">
          <span className="text-muted-foreground">Matches:</span>{' '}
          <span className="font-bold text-primary">{matches}/{totalPairs}</span>
        </div>
      </div>

      {/* Team Turn Indicator */}
      {isTeamMode && !gameComplete && (
        <div className={`text-center p-2 rounded-lg bg-team-${(currentTeamIndex % 4) + 1} text-white font-bold text-sm`}>
          {gameState.teams[currentTeamIndex]?.name}'s Turn!
        </div>
      )}

      {/* Team Scores */}
      {isTeamMode && (
        <div className="flex justify-center gap-6">
          {gameState.teams.slice(0, 2).map((team, idx) => (
            <div key={team.id} className="text-center">
              <div className="font-bold text-foreground text-sm">
                {team.name}: {teamScores[idx]}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Game Complete */}
      {gameComplete && (
        <div className="text-center bg-card rounded-xl p-6 panda-shadow">
          <Trophy className="w-12 h-12 text-secondary mx-auto mb-2" />
          <h3 className="text-xl font-bold text-foreground mb-2">🎉 All Matched!</h3>
          <p className="text-muted-foreground mb-4">
            Completed in {moves} moves!
          </p>
          {isTeamMode && (
            <p className="text-lg font-bold text-primary mb-4">
              Winner: {gameState.teams[teamScores[0] >= teamScores[1] ? 0 : 1].name}!
            </p>
          )}
          <div className="flex gap-2 justify-center">
            <Button onClick={resetGame}>Play Again</Button>
            <Button variant="outline" onClick={handleBackToTopic}>New Topic</Button>
          </div>
        </div>
      )}

      {/* Card Grid */}
      {!gameComplete && cards.length > 0 && (
        <div className="bg-card rounded-xl p-4 panda-shadow">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || isChecking}
                className={`aspect-square rounded-xl p-2 text-xs md:text-sm font-medium transition-all duration-300 transform ${
                  card.isMatched
                    ? 'bg-success/20 text-success border-2 border-success'
                    : card.isFlipped
                    ? 'bg-primary text-primary-foreground rotate-y-180'
                    : 'bg-muted hover:bg-muted/80 text-transparent hover:scale-105'
                }`}
              >
                <div className="h-full flex items-center justify-center text-center overflow-hidden">
                  {(card.isFlipped || card.isMatched) ? (
                    <span className="line-clamp-3">{card.content}</span>
                  ) : (
                    <span className="text-2xl">❓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;