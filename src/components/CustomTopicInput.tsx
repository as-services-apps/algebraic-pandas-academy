import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGame } from '@/context/GameContext';
import { YearGroup, Question } from '@/types/game';
import { Sparkles, Loader2, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CustomTopicInputProps {
  onStartQuiz: (questions: Question[]) => void;
}

const exampleTopics = [
  { topic: 'Henry VIII', context: 'his six wives' },
  { topic: 'Photosynthesis', context: 'light-dependent reactions' },
  { topic: 'World War 2', context: 'D-Day landings' },
  { topic: 'Fractions', context: 'adding and subtracting' },
  { topic: 'The water cycle', context: '' },
  { topic: 'Shakespeare', context: 'Romeo and Juliet' },
];

const CustomTopicInput: React.FC<CustomTopicInputProps> = ({ onStartQuiz }) => {
  const { gameState, setYearGroup, setCustomTopic } = useGame();
  const [topic, setTopic] = useState('');
  const [extraContext, setExtraContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const yearGroups: YearGroup[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Enter a topic',
        description: 'Please type what you want to learn about',
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
          count: 10,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const questions: Question[] = (data.questions || []).map((q: any, index: number) => ({
        id: `custom-${Date.now()}-${index}`,
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
        title: 'Quiz Ready! 🎉',
        description: `Generated ${questions.length} questions about "${topic}"`,
      });

      onStartQuiz(questions);
    } catch (error) {
      console.error('Failed to generate questions:', error);
      toast({
        title: 'Generation Failed',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to generate questions. Please try again.',
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
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 panda-shadow space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          <h3 className="font-bold text-foreground text-base sm:text-lg">AI-Powered Quiz on Any Topic!</h3>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            What do you want to learn about?
          </label>
          <Input
            type="text"
            placeholder="e.g., Henry VIII, Photosynthesis, French Revolution, Quadratic equations..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-12 text-base"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Any specific focus? (optional)</label>
          <Textarea
            placeholder="e.g., his six wives, causes of the war, key dates, solving by factoring..."
            value={extraContext}
            onChange={(e) => setExtraContext(e.target.value)}
            className="min-h-[80px] resize-none"
            disabled={isLoading}
          />
        </div>

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
      </div>

      <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 panda-shadow">
        <h3 className="font-bold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Select Year Group</h3>
        <div className="grid grid-cols-6 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
          {yearGroups.map((year) => (
            <button
              key={year}
              onClick={() => setYearGroup(year)}
              disabled={isLoading}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm ${
                gameState.selectedYearGroup === year
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Y{year}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGenerateQuiz}
        disabled={isLoading || !topic.trim()}
        size="lg"
        className="w-full h-14 text-lg gradient-primary text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Quiz...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate 10 Questions
          </>
        )}
      </Button>
    </div>
  );
};

export default CustomTopicInput;
