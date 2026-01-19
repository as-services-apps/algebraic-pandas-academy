export type UserType = 'student' | 'teacher';
export type GameMode = 'solo' | 'team';
export type YearGroup = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Subject = 'maths' | 'science' | 'english' | 'history' | 'geography' | 'general' | 'french' | 'it' | 'quicklearn';

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export interface Player {
  id: string;
  name: string;
  title?: string; // Mr., Mrs., Ms., etc.
  school: string;
  type: UserType;
  teamId?: string;
  score: number;
}

export interface GameState {
  userType: UserType | null;
  gameMode: GameMode | null;
  player: Player | null;
  teams: Team[];
  currentRound: number;
  selectedYearGroup: YearGroup;
  selectedSubject: Subject;
  isAIOpponent: boolean;
  gameStarted: boolean;
  isHardMode: boolean;
  customQuestions: Question[];
  customTopic?: string;
  customContext?: string;
}

export interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  yearGroup: YearGroup;
  points: number;
}

export interface GameTopic {
  id: string;
  name: string;
  icon: string;
  description: string;
  yearGroups: YearGroup[];
  color: string;
}

export interface CustomGame {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  createdBy: string;
}
