import React, { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import LoadingScreen from '@/components/LoadingScreen';
import UserTypeSelection from '@/components/UserTypeSelection';
import GameModeSelection from '@/components/GameModeSelection';
import NameInput from '@/components/NameInput';
import TeamSetup from '@/components/TeamSetup';
import GameDashboard from '@/components/GameDashboard';
import { useGame } from '@/context/GameContext';

type AppStep = 'loading' | 'userType' | 'gameMode' | 'name' | 'teamSetup' | 'dashboard';

const GameApp: React.FC = () => {
  const [step, setStep] = useState<AppStep>('loading');
  const { gameState, resetGame } = useGame();

  const handleReset = () => {
    resetGame();
    setStep('userType');
  };

  const handleModeSelect = () => {
    setStep('name');
  };

  const handleNameComplete = () => {
    if (gameState.gameMode === 'team') {
      setStep('teamSetup');
    } else {
      setStep('dashboard');
    }
  };

  return (
    <>
      {step === 'loading' && <LoadingScreen onComplete={() => setStep('userType')} />}
      {step === 'userType' && <UserTypeSelection onSelect={() => setStep('gameMode')} />}
      {step === 'gameMode' && <GameModeSelection onSelect={handleModeSelect} />}
      {step === 'name' && <NameInput onComplete={handleNameComplete} />}
      {step === 'teamSetup' && <TeamSetup onComplete={() => setStep('dashboard')} />}
      {step === 'dashboard' && <GameDashboard onReset={handleReset} />}
    </>
  );
};

const Index: React.FC = () => {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
};

export default Index;
