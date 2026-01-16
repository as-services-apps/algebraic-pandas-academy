import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Sparkles, Search, History, Lightbulb } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { Subject } from '@/types/game';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  onBack: () => void;
  gameType: string;
}

const subjectNames: Record<Subject, string> = {
  maths: 'Maths',
  science: 'Science',
  english: 'English',
  french: 'French',
  it: 'IT & Computing',
  history: 'History',
  geography: 'Geography',
  general: 'General Knowledge',
  quicklearn: 'Quick Learn',
};

const topicSuggestions: Record<Subject, string[]> = {
  maths: ['Algebra substitution', 'Quadratic equations', 'Pythagoras theorem', 'Fractions', 'Percentages', 'Area and perimeter', 'Simultaneous equations', 'Trigonometry'],
  science: ['Photosynthesis', 'The heart', 'Chemical reactions', 'Forces and motion', 'Electricity', 'Cell structure', 'Evolution', 'The solar system'],
  english: ['Shakespeare', 'Literary devices', 'Grammar rules', 'Punctuation', 'Poetry analysis', 'Vocabulary', 'Spelling', 'Creative writing'],
  french: ['Family vocabulary', 'Food and drinks', 'Colors and numbers', 'Daily routines', 'French greetings', 'Verb conjugation', 'Weather', 'Hobbies'],
  it: ['Python basics', 'HTML and CSS', 'Cybersecurity', 'Computer networks', 'Binary numbers', 'Algorithms', 'Databases', 'Web development'],
  history: ['Henry VIII', 'World War 2', 'Ancient Egypt', 'The Romans', 'Medieval castles', 'Industrial revolution', 'The Tudors', 'Victorian era'],
  geography: ['Climate change', 'Volcanoes', 'Rivers', 'Population', 'Rainforests', 'Earthquakes', 'Urbanisation', 'Weather patterns'],
  general: ['Famous landmarks', 'World capitals', 'Sports trivia', 'Music history', 'Animal facts', 'Space exploration', 'Inventions', 'World records'],
  quicklearn: ['Fun science facts', 'Brain teasers', 'Life hacks', 'Nature wonders', 'Technology trends', 'World cultures', 'Amazing animals', 'Historical oddities'],
};

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit, onBack, gameType }) => {
  const { gameState } = useGame();
  const [topic, setTopic] = useState('');
  const [recentTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentTopics');
    return saved ? JSON.parse(saved) : [];
  });

  const suggestions = topicSuggestions[gameState.selectedSubject] || topicSuggestions.general;

  const handleSubmit = (selectedTopic: string) => {
    if (!selectedTopic.trim()) return;
    
    // Save to recent topics
    const updated = [selectedTopic, ...recentTopics.filter(t => t !== selectedTopic)].slice(0, 5);
    localStorage.setItem('recentTopics', JSON.stringify(updated));
    
    onSubmit(selectedTopic.trim());
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            Enter Your Topic
          </h2>
          <p className="text-sm text-muted-foreground">
            {subjectNames[gameState.selectedSubject]} • {gameType}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 panda-shadow">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-secondary" />
          <span className="text-sm text-muted-foreground">
            AI will generate infinite unique questions for any topic you enter!
          </span>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="e.g., Henry VIII, Algebra substitution, Photosynthesis..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(topic)}
              className="pl-10 h-12 text-base"
              autoFocus
            />
          </div>
          <Button 
            onClick={() => handleSubmit(topic)} 
            disabled={!topic.trim()}
            className="h-12 px-6 gradient-primary text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start
          </Button>
        </div>
      </div>

      {/* Recent Topics */}
      {recentTopics.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <History className="w-4 h-4" />
            Recent Topics
          </div>
          <div className="flex flex-wrap gap-2">
            {recentTopics.map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleSubmit(t)}
                className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lightbulb className="w-4 h-4" />
          Popular {subjectNames[gameState.selectedSubject]} Topics
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSubmit(suggestion)}
              className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors border border-primary/20"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
