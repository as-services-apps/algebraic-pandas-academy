import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/context/GameContext';
import { Team } from '@/types/game';
import { Plus, Trash2, Check, ArrowLeft } from 'lucide-react';
import pandaMascot from '@/assets/panda-mascot.png';

interface TeamSetupProps {
  onComplete: () => void;
  onBack?: () => void;
}

const teamColors = [
  { name: 'Teal', class: 'bg-team-1', value: 'team-1' },
  { name: 'Orange', class: 'bg-team-2', value: 'team-2' },
  { name: 'Purple', class: 'bg-team-3', value: 'team-3' },
  { name: 'Pink', class: 'bg-team-4', value: 'team-4' },
];

const TeamSetup: React.FC<TeamSetupProps> = ({ onComplete, onBack }) => {
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
    <div className="min-h-[120vh] bg-background flex flex-col">
      {/* Back Button - Mobile */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm panda-shadow hover:bg-card transition-colors md:hidden"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      
      {/* Main content - fits in viewport */}
      <div className="h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-xl w-full">
          {/* Header */}
          <div className="text-center mb-3 sm:mb-4 bounce-in">
            <img 
              src={pandaMascot} 
              alt="Panda Mascot" 
              className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 float"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
              Set Up Your Teams! 🏆
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Create 2-4 teams to compete
            </p>
          </div>

          {/* Teams List */}
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 slide-up">
            {teams.map((team, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3 panda-shadow flex items-center gap-2 sm:gap-3"
              >
                {/* Color Picker */}
                <div className="flex gap-1.5">
                  {teamColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateTeamColor(index, color.value)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${color.class} transition-all duration-200 ${
                        team.color === color.value 
                          ? 'ring-2 ring-offset-1 ring-foreground scale-110' 
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
                  className="flex-1 h-9 sm:h-10 text-sm sm:text-base rounded-lg sm:rounded-xl border-2"
                  placeholder="Team name"
                />

                {/* Remove Button */}
                {teams.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTeam(index)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
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
              className="w-full mb-3 sm:mb-4 h-9 sm:h-10 text-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Team
            </Button>
          )}

          {/* Team Mode Info */}
          <div className="bg-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3 panda-shadow mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">🎯</span>
              <div>
                <p className="font-semibold text-foreground text-sm">Team vs Team</p>
                <p className="text-xs text-muted-foreground">Teams compete against each other</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            variant="game"
            size="lg"
            onClick={handleSubmit}
            className="w-full"
            disabled={teams.some(t => !t.name.trim())}
          >
            <Check className="w-5 h-5 mr-2" />
            Start Playing!
          </Button>
        </div>
      </div>

      {/* Footer - scroll to see */}
      <footer className="py-6 text-center">
        <p className="text-muted-foreground text-sm">
          Made by <span className="font-semibold text-foreground">Angad</span>
        </p>
      </footer>
    </div>
  );
};

export default TeamSetup;
