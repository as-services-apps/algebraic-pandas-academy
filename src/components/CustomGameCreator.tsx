import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGame } from '@/context/GameContext';
import { Question } from '@/types/game';
import { Plus, Trash2, Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomGameCreatorProps {
  onBack: () => void;
  onSave: (questions: Question[], gameName: string) => void;
}

const CustomGameCreator: React.FC<CustomGameCreatorProps> = ({ onBack, onSave }) => {
  const { gameState } = useGame();
  const { toast } = useToast();
  const [gameName, setGameName] = useState('');
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0, points: 10, difficulty: 'medium' }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: 0, points: 10, difficulty: 'medium' }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options![oIndex] = value;
    setQuestions(updated);
  };

  const validateQuestions = (): boolean => {
    if (!gameName.trim()) {
      toast({
        title: "Missing Game Name",
        description: "Please enter a name for your game.",
        variant: "destructive"
      });
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question?.trim()) {
        toast({
          title: "Missing Question",
          description: `Question ${i + 1} is empty.`,
          variant: "destructive"
        });
        return false;
      }
      if (!q.options?.every(o => o.trim())) {
        toast({
          title: "Missing Options",
          description: `Question ${i + 1} has empty options.`,
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validateQuestions()) return;

    const validQuestions: Question[] = questions.map((q, i) => ({
      id: `custom-${Date.now()}-${i}`,
      topic: 'custom',
      question: q.question!,
      options: q.options!,
      correctAnswer: q.correctAnswer!,
      difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
      yearGroup: gameState.selectedYearGroup,
      points: q.points!,
    }));

    toast({
      title: "Game Created! 🎉",
      description: `${gameName} with ${validQuestions.length} questions is ready to play!`,
    });

    onSave(validQuestions, gameName);
  };

  const isValid = gameName.trim() && questions.every(q => 
    q.question?.trim() && q.options?.every(o => o.trim())
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create Custom Game</h2>
          <p className="text-muted-foreground">Design your own maths quiz!</p>
        </div>
      </div>

      {/* Game Name */}
      <div className="bg-card rounded-2xl p-4 panda-shadow mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Game Name *</label>
        <Input
          type="text"
          placeholder="My Awesome Maths Quiz"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      {/* Instructions */}
      <div className="bg-primary/10 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
        <div className="text-sm text-foreground">
          <p className="font-medium mb-1">How to create questions:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Enter your question text</li>
            <li>Fill in all 4 answer options</li>
            <li>Click the letter (A, B, C, D) to mark the correct answer (green = correct)</li>
            <li>Set difficulty and points</li>
          </ul>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-card rounded-2xl p-6 panda-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Question {qIndex + 1}</h3>
              {questions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Question Text */}
            <Textarea
              placeholder="Enter your question... (e.g., What is 5 + 7?)"
              value={q.question || ''}
              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
              className="mb-4 rounded-xl"
              rows={2}
            />

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              {q.options?.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      q.correctAnswer === oIndex
                        ? 'bg-success text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    title={q.correctAnswer === oIndex ? 'This is the correct answer' : 'Click to mark as correct'}
                  >
                    {String.fromCharCode(65 + oIndex)}
                  </button>
                  <Input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + oIndex)} ${oIndex === 0 ? '(e.g., 12)' : ''}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className="flex-1 h-10 rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Settings */}
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Difficulty</label>
                <div className="flex gap-2 mt-1">
                  {(['easy', 'medium', 'hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => updateQuestion(qIndex, 'difficulty', diff)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium capitalize transition-colors ${
                        q.difficulty === diff
                          ? diff === 'easy' ? 'bg-success text-white' 
                            : diff === 'medium' ? 'bg-secondary text-white'
                            : 'bg-destructive text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Points</label>
                <div className="flex gap-2 mt-1">
                  {[10, 15, 20, 25].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => updateQuestion(qIndex, 'points', pts)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        q.points === pts
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {pts}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question */}
      <Button
        variant="outline"
        onClick={addQuestion}
        className="w-full mt-6"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Question
      </Button>

      {/* Save Button */}
      <Button
        variant="game"
        size="lg"
        onClick={handleSave}
        className="w-full mt-6"
        disabled={!isValid}
      >
        <Save className="w-5 h-5 mr-2" />
        Save & Play ({questions.length} question{questions.length !== 1 ? 's' : ''})
      </Button>
    </div>
  );
};

export default CustomGameCreator;