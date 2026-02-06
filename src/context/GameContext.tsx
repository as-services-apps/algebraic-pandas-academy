import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, UserType, GameMode, Player, Team, YearGroup, Question, Subject } from '@/types/game';

interface GameContextType {
  gameState: GameState;
  setUserType: (type: UserType) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayer: (player: Player) => void;
  setTeams: (teams: Team[]) => void;
  updateTeamScore: (teamId: string, points: number) => void;
  updatePlayerScore: (points: number) => void;
  setYearGroup: (year: YearGroup) => void;
  setSubject: (subject: Subject) => void;
  setAIOpponent: (isAI: boolean) => void;
  setCustomQuestions: (questions: Question[]) => void;
  setCustomTopic: (topic: string, context?: string) => void;
  setMultiplayerSession: (sessionId: string, roomCode: string, isHost: boolean) => void;
  startGame: () => void;
  resetGame: () => void;
  nextRound: () => void;
}

const initialState: GameState = {
  userType: null,
  gameMode: null,
  player: null,
  teams: [],
  currentRound: 1,
  selectedYearGroup: 7,
  selectedSubject: 'maths',
  isAIOpponent: false,
  gameStarted: false,
  customQuestions: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const setUserType = (type: UserType) => {
    setGameState(prev => ({ ...prev, userType: type }));
  };

  const setGameMode = (mode: GameMode) => {
    setGameState(prev => ({ ...prev, gameMode: mode }));
  };

  const setPlayer = (player: Player) => {
    setGameState(prev => ({ ...prev, player }));
  };

  const setTeams = (teams: Team[]) => {
    setGameState(prev => ({ ...prev, teams }));
  };

  const updateTeamScore = (teamId: string, points: number) => {
    setGameState(prev => ({
      ...prev,
      teams: prev.teams.map(team =>
        team.id === teamId ? { ...team, score: team.score + points } : team
      ),
    }));
  };

  const updatePlayerScore = (points: number) => {
    setGameState(prev => ({
      ...prev,
      player: prev.player ? { ...prev.player, score: prev.player.score + points } : null,
    }));
  };

  const setYearGroup = (year: YearGroup) => {
    setGameState(prev => ({ ...prev, selectedYearGroup: year }));
  };

  const setAIOpponent = (isAI: boolean) => {
    setGameState(prev => ({ ...prev, isAIOpponent: isAI }));
  };

  const setSubject = (subject: Subject) => {
    setGameState(prev => ({ ...prev, selectedSubject: subject }));
  };

  const setCustomQuestions = (questions: Question[]) => {
    setGameState(prev => ({ ...prev, customQuestions: questions }));
  };

  const setCustomTopic = (topic: string, context?: string) => {
    setGameState(prev => ({ ...prev, customTopic: topic, customContext: context }));
  };

  const setMultiplayerSession = (sessionId: string, roomCode: string, isHost: boolean) => {
    setGameState(prev => ({
      ...prev,
      sessionId,
      roomCode,
      isHost,
      gameMode: 'multiplayer',
    }));
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, gameStarted: true }));
  };

  const resetGame = () => {
    setGameState(initialState);
  };

  const nextRound = () => {
    setGameState(prev => ({ ...prev, currentRound: prev.currentRound + 1 }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setUserType,
        setGameMode,
        setPlayer,
        setTeams,
        updateTeamScore,
        updatePlayerScore,
        setYearGroup,
        setSubject,
        setAIOpponent,
        setCustomQuestions,
        setCustomTopic,
        setMultiplayerSession,
        startGame,
        resetGame,
        nextRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
