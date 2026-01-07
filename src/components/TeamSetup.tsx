import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { Team } from '@/types/game';
import { Plus, Trash2, Check } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface TeamSetupProps {
  onComplete: () => void;
}

const teamColors = [
  { name: 'Teal', class: 'bg-team-1', value: 'team-1' },
  { name: 'Orange', class: 'bg-team-2', value: 'team-2' },
  { name: 'Purple', class: 'bg-team-3', value: 'team-3' },
  { name: 'Pink', class: 'bg-team-4', value: 'team-4' },
];

const TeamSetup: React.FC<TeamSetupProps> = ({ onComplete }) => {
  const { setTeams, setAIOpponent } = useGame();
  const [teams, setLocalTeams] = useState<{ name: string; color: string }[]>([
    { name: 'Team Alpha', color: 'team-1' },
    { name: 'Team Beta', color: 'team-2' },
  ]);
  const [includeAI, setIncludeAI] = useState(false);

  const addTeam = () => {
    if (teams.length < 4) {
      const usedColors = teams.map(t => t.color);
      const availableColor = teamColors.find(c => !usedColors.includes(c.value))?.value || 'team-1';
      setLocalTeams([...teams, { name: `Team ${teams.length + 1}`, color: availableColor }]);
    }
  };

  const removeTeam = (index: number) => {
    if (teams.length > 2) {
      setLocalTeams(teams.filter((_, i) => i !== index));
    }
  };

  const updateTeamName = (index: number, name: string) => {
    const updated = [...teams];
    updated[index].name = name;
    setLocalTeams(updated);
  };

  const updateTeamColor = (index: number, color: string) => {
    const updated = [...teams];
    updated[index].color = color;
    setLocalTeams(updated);
  };

  const handleSubmit = () => {
    const gameTeams: Team[] = teams.map((team, index) => ({
      id: `team-${index}`,
      name: team.name,
      score: 0,
      color: team.color,
    }));
    setTeams(gameTeams);
    setAIOpponent(includeAI);
    onComplete();
  };

  const getColorClass = (color: string) => {
    return teamColors.find(c => c.value === color)?.class || 'bg-team-1';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <img 
            src={pandaMascot} 
            alt="Panda Mascot" 
            className="w-24 h-24 mx-auto mb-4 float"
          />
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Set Up Your Teams! 🏆
          </h1>
          <p className="text-muted-foreground">
            Create 2-4 teams to compete against each other
          </p>
        </div>

        {/* Teams List */}
        <div className="space-y-4 mb-6 slide-up">
          {teams.map((team, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-4 panda-shadow flex items-center gap-4"
            >
              {/* Color Picker */}
              <div className="flex gap-2">
                {teamColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateTeamColor(index, color.value)}
                    className={`w-8 h-8 rounded-full ${color.class} transition-all duration-200 ${
                      team.color === color.value 
                        ? 'ring-2 ring-offset-2 ring-foreground scale-110' 
                        : 'opacity-50 hover:opacity-75'
                    }`}
                  />
                ))}
              </div>

              {/* Team Name */}
              <Input
                type="text"
                value={team.name}
                onChange={(e) => updateTeamName(index, e.target.value)}
                className="flex-1 h-12 text-lg rounded-xl border-2"
                placeholder="Team name"
              />

              {/* Remove Button */}
              {teams.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTeam(index)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Add Team Button */}
        {teams.length < 4 && (
          <Button
            variant="outline"
            onClick={addTeam}
            className="w-full mb-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Team
          </Button>
        )}

        {/* AI Opponent Toggle */}
        <div className="bg-card rounded-2xl p-4 panda-shadow mb-6">
          <button
            onClick={() => setIncludeAI(!includeAI)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <p className="font-semibold text-foreground">Include AI Team?</p>
                <p className="text-sm text-muted-foreground">Add a robot team to compete against!</p>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors duration-200 flex items-center px-1 ${
              includeAI ? 'bg-success' : 'bg-muted'
            }`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                includeAI ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </button>
        </div>

        {/* Continue Button */}
        <Button
          variant="game"
          size="xl"
          onClick={handleSubmit}
          className="w-full"
          disabled={teams.some(t => !t.name.trim())}
        >
          <Check className="w-6 h-6 mr-2" />
          Start Playing!
        </Button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center">
        <p className="text-muted-foreground text-sm">
          Made by <span className="font-semibold text-foreground">Angad Singh</span> from{' '}
          <span className="font-semibold text-foreground">AS Services</span>
        </p>
      </footer>
    </div>
  );
};

export default TeamSetup;
