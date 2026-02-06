import React, { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import { MultiplayerProvider } from '@/hooks/useMultiplayer';
import LoadingScreen from '@/components/LoadingScreen';
import UserTypeSelection from '@/components/UserTypeSelection';
import GameModeSelection from '@/components/GameModeSelection';
import NameInput from '@/components/NameInput';
import TeamSetup from '@/components/TeamSetup';
import GameDashboard from '@/components/GameDashboard';
import JoinGame from '@/components/multiplayer/JoinGame';
import HostGame from '@/components/multiplayer/HostGame';
import WaitingRoom from '@/components/multiplayer/WaitingRoom';
import LiveQuiz from '@/components/multiplayer/LiveQuiz';
import { useGame } from '@/context/GameContext';
import { useMultiplayer } from '@/hooks/useMultiplayer';

type AppStep =
  | 'loading'
  | 'userType'
  | 'gameMode'
  | 'name'
  | 'teamSetup'
  | 'dashboard'
  | 'joinGame'
  | 'hostGame'
  | 'waitingRoom'
  | 'liveQuiz';

const GameApp: React.FC = () => {
  const [step, setStep] = useState<AppStep>('loading');
  const { gameState, resetGame } = useGame();
  const { leaveSession } = useMultiplayer();
  const [isHost, setIsHost] = useState(false);

  const handleReset = () => {
    resetGame();
    leaveSession();
    setStep('userType');
    setIsHost(false);
  };

  const handleModeSelect = () => {
    setStep('name');
  };

  const handleMultiplayerSelect = () => {
    if (gameState.userType === 'teacher') {
      setStep('name');
    } else {
      setStep('joinGame');
    }
  };

  const handleNameComplete = () => {
    if (gameState.gameMode === 'team') {
      setStep('teamSetup');
    } else if (gameState.gameMode === 'multiplayer') {
      if (gameState.userType === 'teacher') {
        setIsHost(true);
        setStep('hostGame');
      } else {
        setStep('dashboard');
      }
    } else {
      setStep('dashboard');
    }
  };

  const handleGameCreated = () => {
    setStep('waitingRoom');
  };

  const handleGameJoined = () => {
    setStep('waitingRoom');
  };

  const handleGameStart = () => {
    setStep('liveQuiz');
  };

  const handleLiveQuizComplete = () => {
    handleReset();
  };

  return (
    <>
      {step === 'loading' && <LoadingScreen onComplete={() => setStep('userType')} />}
      {step === 'userType' && <UserTypeSelection onSelect={() => setStep('gameMode')} />}
      {step === 'gameMode' && (
        <GameModeSelection
          onSelect={handleModeSelect}
          onMultiplayer={handleMultiplayerSelect}
          onBack={() => setStep('userType')}
        />
      )}
      {step === 'name' && <NameInput onComplete={handleNameComplete} onBack={() => setStep('gameMode')} />}
      {step === 'teamSetup' && (
        <TeamSetup onComplete={() => setStep('dashboard')} onBack={() => setStep('name')} />
      )}
      {step === 'dashboard' && <GameDashboard onReset={handleReset} />}

      {/* Multiplayer Steps */}
      {step === 'joinGame' && <JoinGame onJoined={handleGameJoined} onBack={() => setStep('gameMode')} />}
      {step === 'hostGame' && <HostGame onCreated={handleGameCreated} onBack={() => setStep('gameMode')} />}
      {step === 'waitingRoom' && (
        <WaitingRoom isHost={isHost} onGameStart={handleGameStart} onBack={handleReset} />
      )}
      {step === 'liveQuiz' && <LiveQuiz isHost={isHost} onComplete={handleLiveQuizComplete} />}
    </>
  );
};

const Index: React.FC = () => {
  return (
    <GameProvider>
      <MultiplayerProvider>
        <GameApp />
      </MultiplayerProvider>
    </GameProvider>
  );
};

export default Index;
