import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy, Target, Zap } from 'lucide-react';

const Scoreboard: React.FC = () => {
  const { gameState } = useGame();

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      'team-1': 'bg-team-1',
      'team-2': 'bg-team-2',
      'team-3': 'bg-team-3',
      'team-4': 'bg-team-4',
    };
    return colors[color] || 'bg-primary';
  };

  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  const leader = sortedTeams[0];

  if (gameState.gameMode === 'solo') {
    return (
      <div className="bg-card rounded-2xl p-4 panda-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Score</p>
              <p className="text-2xl font-bold text-foreground">
                {gameState.player?.score || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Round {gameState.currentRound}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-4 panda-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          <h3 className="font-bold text-foreground">Scoreboard</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
          <Zap className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium">Round {gameState.currentRound}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-2">
        {sortedTeams.map((team, index) => (
          <div 
            key={team.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              index === 0 ? 'bg-secondary/10 scale-[1.02]' : 'bg-muted/50'
            }`}
          >
            {/* Position */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              index === 0 ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1}
            </div>

            {/* Team Color */}
            <div className={`w-4 h-4 rounded-full ${getColorClass(team.color)}`} />

            {/* Team Name */}
            <span className="flex-1 font-medium text-foreground">
              {team.name}
              {index === 0 && leader.score > 0 && (
                <span className="ml-2 text-secondary">👑</span>
              )}
            </span>

            {/* Score */}
            <span className="text-xl font-bold text-foreground">
              {team.score}
            </span>
          </div>
        ))}
      </div>

      {/* Player Info */}
      {gameState.player && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Host: <span className="font-medium text-foreground">
              {gameState.player.title ? `${gameState.player.title} ` : ''}{gameState.player.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
