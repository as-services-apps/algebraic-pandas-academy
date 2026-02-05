import React from 'react';
import { Bot, Mail, Lightbulb, Sparkles } from 'lucide-react';

const AISuggestions: React.FC = () => {
  const suggestions = [
    "Try practising times tables in Year 3-4 for speed improvement!",
    "Mixing subjects helps build connections between topics.",
    "Challenge yourself with Hard Mode once you feel confident.",
    "Interactive games like Math Racing make learning more fun!",
    "Practice 10-15 minutes daily for the best results.",
  ];

  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 panda-shadow border border-primary/20">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-primary/20 p-2 rounded-full">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground flex items-center gap-2">
            AI Learning Tips
            <Sparkles className="w-4 h-4 text-accent" />
          </h3>
          <p className="text-xs text-muted-foreground">Powered by AS Services</p>
        </div>
      </div>

      <div className="bg-background/50 rounded-xl p-3 mb-3">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">{randomSuggestion}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Mail className="w-3 h-3" />
        <span>Have suggestions? Email us:</span>
      </div>
      <a 
        href="mailto:angad@as-services.info" 
        className="text-sm text-primary hover:underline font-medium mt-1 block"
      >
        angad@as-services.info
      </a>
    </div>
  );
};

export default AISuggestions;
