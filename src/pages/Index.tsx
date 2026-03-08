import React, { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import LoadingScreen from '@/components/LoadingScreen';
import UserTypeSelection from '@/components/UserTypeSelection';
import GameModeSelection from '@/components/GameModeSelection';
import NameInput from '@/components/NameInput';
import TeamSetup from '@/components/TeamSetup';
import GameDashboard from '@/components/GameDashboard';
import MultiplayerChoice from '@/components/multiplayer/MultiplayerChoice';
import MultiplayerLobby from '@/components/multiplayer/MultiplayerLobby';
import JoinGame from '@/components/multiplayer/JoinGame';
import WaitingRoom from '@/components/multiplayer/WaitingRoom';
import MultiplayerGame from '@/components/multiplayer/MultiplayerGame';
import { useGame } from '@/context/GameContext';

type AppStep = 'loading' | 'userType' | 'gameMode' | 'name' | 'teamSetup' | 'dashboard' 
  | 'mpChoice' | 'mpHost' | 'mpJoin' | 'mpWaiting' | 'mpPlaying';

const GameApp: React.FC = () => {
  const [step, setStep] = useState<AppStep>('loading');
  const { gameState, resetGame } = useGame();
  const [multiplayerSessionId, setMultiplayerSessionId] = useState('');

  const handleReset = () => {
    resetGame();
    setStep('userType');
  };

  const handleModeSelect = () => {
    if (gameState.gameMode === 'multiplayer') {
      setStep('name');
    } else {
      setStep('name');
    }
  };

  const handleNameComplete = () => {
    if (gameState.gameMode === 'multiplayer') {
      setStep('mpChoice');
    } else if (gameState.gameMode === 'team') {
      setStep('teamSetup');
    } else {
      setStep('dashboard');
    }
  };

  return (
    <>
      {step === 'loading' && <LoadingScreen onComplete={() => setStep('userType')} />}
      {step === 'userType' && <UserTypeSelection onSelect={() => setStep('gameMode')} />}
      {step === 'gameMode' && <GameModeSelection onSelect={handleModeSelect} onBack={() => setStep('userType')} />}
      {step === 'name' && <NameInput onComplete={handleNameComplete} onBack={() => setStep('gameMode')} />}
      {step === 'teamSetup' && <TeamSetup onComplete={() => setStep('dashboard')} onBack={() => setStep('name')} />}
      {step === 'dashboard' && <GameDashboard onReset={handleReset} />}
      
      {/* Multiplayer flow */}
      {step === 'mpChoice' && (
        <MultiplayerChoice
          onHost={() => setStep('mpHost')}
          onJoin={() => setStep('mpJoin')}
          onBack={() => setStep('name')}
        />
      )}
      {step === 'mpHost' && (
        <MultiplayerLobby
          onBack={() => setStep('mpChoice')}
          onGameStart={(sid) => {
            setMultiplayerSessionId(sid);
            setStep('mpPlaying');
          }}
        />
      )}
      {step === 'mpJoin' && (
        <JoinGame
          onBack={() => setStep('mpChoice')}
          onJoined={(sid) => {
            setMultiplayerSessionId(sid);
            setStep('mpWaiting');
          }}
        />
      )}
      {step === 'mpWaiting' && (
        <WaitingRoom
          sessionId={multiplayerSessionId}
          onGameStart={() => setStep('mpPlaying')}
          onBack={() => setStep('mpChoice')}
        />
      )}
      {step === 'mpPlaying' && (
        <MultiplayerGame
          sessionId={multiplayerSessionId}
          onBack={handleReset}
        />
      )}
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
