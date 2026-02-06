export type UserType = 'student' | 'teacher';
export type GameMode = 'solo' | 'team' | 'multiplayer';
export type YearGroup = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Subject =
  | 'maths'
  | 'science'
  | 'english'
  | 'history'
  | 'geography'
  | 'general'
  | 'french'
  | 'it'
  | 'quicklearn'
  | 'custom';

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
  customQuestions: Question[];
  customTopic?: string;
  customContext?: string;
  // Multiplayer state
  sessionId?: string;
  roomCode?: string;
  isHost?: boolean;
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
  explanation?: string;
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

// Multiplayer types
export interface GameSession {
  id: string;
  room_code: string;
  host_name: string;
  host_school: string;
  topic: string;
  year_group: number;
  status: 'waiting' | 'playing' | 'finished';
  current_question: number;
  questions: Question[];
  created_at: string;
  started_at?: string;
  finished_at?: string;
}

export interface SessionPlayer {
  id: string;
  session_id: string;
  player_name: string;
  school: string;
  score: number;
  answers: { questionId: string; answer: number; correct: boolean; time: number }[];
  joined_at: string;
  is_ready: boolean;
}
