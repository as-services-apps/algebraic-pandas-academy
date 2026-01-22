import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGame } from '@/context/GameContext';
import { Question } from '@/types/game';
import { ArrowLeft, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface GameTopicInputProps {
  onStartGame: (questions: Question[], topic: string) => void;
  onBack: () => void;
  gameTitle: string;
  gameIcon: React.ReactNode;
  questionCount?: number;
}

const exampleTopics = [
  { topic: 'Henry VIII', context: 'his six wives' },
  { topic: 'Photosynthesis', context: 'light-dependent reactions' },
  { topic: 'Quadratic equations', context: 'solving by factoring' },
  { topic: 'World War 2', context: 'D-Day landings' },
  { topic: 'Shakespeare', context: 'Romeo and Juliet' },
  { topic: 'The water cycle', context: '' },
];

const GameTopicInput: React.FC<GameTopicInputProps> = ({ 
  onStartGame, 
  onBack, 
  gameTitle, 
  gameIcon,
  questionCount = 15 
}) => {
  const { gameState, setCustomTopic } = useGame();
  const [topic, setTopic] = useState('');
  const [extraContext, setExtraContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuestions = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Enter a topic',
        description: 'Please type what you want to practice',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          customTopic: topic.trim(),
          extraContext: extraContext.trim() || undefined,
          yearGroup: gameState.selectedYearGroup,
          count: questionCount,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const questions: Question[] = (data.questions || []).map((q: any, index: number) => ({
        id: `game-${Date.now()}-${index}`,
        topic: topic.trim(),
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty || 'medium',
        yearGroup: gameState.selectedYearGroup,
        points: 1,
      }));

      if (questions.length === 0) {
        throw new Error('No questions were generated. Try a different topic.');
      }

      setCustomTopic(topic.trim(), extraContext.trim() || undefined);
      
      toast({
        title: 'Game Ready! 🎉',
        description: `Generated ${questions.length} questions about "${topic}"`,
      });

      onStartGame(questions, topic.trim());
    } catch (error) {
      console.error('Failed to generate questions:', error);
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate questions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: { topic: string; context: string }) => {
    setTopic(example.topic);
    setExtraContext(example.context);
  };

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          {gameIcon}
          <h2 className="text-lg md:text-xl font-bold text-foreground">{gameTitle}</h2>
        </div>
      </div>

      <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 panda-shadow space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          <h3 className="font-bold text-foreground text-base sm:text-lg">
            Choose Your Topic
          </h3>
        </div>

        {/* Topic Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            What do you want to practice?
          </label>
          <Input
            type="text"
            placeholder="e.g., Photosynthesis, French Revolution, Algebra..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-12 text-base"
            disabled={isLoading}
          />
        </div>

        {/* Extra Context */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Any specific focus? (optional)
          </label>
          <Textarea
            placeholder="e.g., key dates, formulas, vocabulary..."
            value={extraContext}
            onChange={(e) => setExtraContext(e.target.value)}
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
        </div>

        {/* Example Topics */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">💡 Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleTopics.map((example, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(example)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                {example.topic}
              </button>
            ))}
          </div>
        </div>

        {/* Year Group Display */}
        <div className="text-sm text-muted-foreground">
          Year Group: <span className="font-bold text-foreground">Y{gameState.selectedYearGroup}</span>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleGenerateQuestions}
          disabled={isLoading || !topic.trim()}
          size="lg"
          className="w-full h-14 text-lg gradient-primary text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Start Game!
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GameTopicInput;