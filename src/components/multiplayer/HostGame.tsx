import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Play, Loader2, Sparkles } from 'lucide-react';
import { useMultiplayer } from '@/hooks/useMultiplayer';
import { useGame } from '@/context/GameContext';
import { Question, YearGroup } from '@/types/game';
import { generateAIQuestions } from '@/lib/aiQuestionGenerator';
import pandaLogo from '@/assets/panda-logo.png';
import { toast } from 'sonner';

interface HostGameProps {
  onCreated: () => void;
  onBack: () => void;
}

const HostGame: React.FC<HostGameProps> = ({ onCreated, onBack }) => {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const { createSession, isLoading } = useMultiplayer();
  const { gameState, setCustomQuestions } = useGame();

  const handleCreate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    try {
      // Generate questions using AI
      const questions = await generateAIQuestions(
        'custom',
        topic.trim(),
        gameState.selectedYearGroup,
        questionCount
      );

      if (questions.length === 0) {
        toast.error('Failed to generate questions. Please try again.');
        return;
      }

      // Create the session
      const result = await createSession(
        gameState.player?.name || 'Teacher',
        gameState.player?.school || 'School',
        topic.trim(),
        gameState.selectedYearGroup,
        questions
      );

      if (result) {
        setCustomQuestions(questions);
        onCreated();
      }
    } catch (error) {
      console.error('Error creating game:', error);
      toast.error('Failed to create game');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm panda-shadow hover:bg-card transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-6 bounce-in">
            <img 
              src={pandaLogo} 
              alt="Panda Logo" 
              className="w-24 h-24 mx-auto mb-3 float"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
              Host a Live Quiz
            </h1>
            <p className="text-muted-foreground text-sm">
              Create a game for your class to join
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 panda-shadow space-y-4 slide-up">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quiz Topic
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. World War 2, Fractions, Volcanoes"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Context (Optional)
              </label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Any specific areas to focus on..."
                rows={3}
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Questions: {questionCount}
              </label>
              <input
                type="range"
                min={5}
                max={20}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5</span>
                <span>20</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <p className="text-muted-foreground">
                <strong>Year Group:</strong> Year {gameState.selectedYearGroup}
              </p>
              <p className="text-muted-foreground">
                <strong>Difficulty:</strong> {gameState.isHardMode ? 'Hard' : 'Normal'}
              </p>
            </div>

            <Button
              onClick={handleCreate}
              disabled={!topic.trim() || isGenerating || isLoading}
              className="w-full h-12 text-lg font-bold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  Generating Questions...
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Game...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Create Game
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center border-t border-border">
        <a 
          href="https://as-services.info" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors"
        >
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </a>
      </footer>
    </div>
  );
};

export default HostGame;
