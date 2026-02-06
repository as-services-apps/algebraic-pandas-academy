import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GameSession, SessionPlayer, Question } from '@/types/game';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

type MultiplayerStore = {
  session: GameSession | null;
  players: SessionPlayer[];
  myPlayerId: string | null;
  isLoading: boolean;
  createSession: (
    hostName: string,
    hostSchool: string,
    topic: string,
    yearGroup: number,
    questions: Question[]
  ) => Promise<{ session: GameSession; roomCode: string } | null>;
  joinSession: (
    roomCode: string,
    playerName: string,
    school: string
  ) => Promise<{ session: GameSession; playerId: string } | null>;
  startGame: () => Promise<void>;
  nextQuestion: () => Promise<void>;
  submitAnswer: (
    questionId: string,
    answer: number,
    correct: boolean,
    timeMs: number
  ) => Promise<void>;
  leaveSession: () => void;
};

const MultiplayerContext = createContext<MultiplayerStore | undefined>(undefined);

const useProvideMultiplayer = (): MultiplayerStore => {
  const [session, setSession] = useState<GameSession | null>(null);
  const [players, setPlayers] = useState<SessionPlayer[]>([]);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a 6-character room code
  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Create a new game session (teacher)
  const createSession = async (
    hostName: string,
    hostSchool: string,
    topic: string,
    yearGroup: number,
    questions: Question[]
  ) => {
    setIsLoading(true);
    try {
      const roomCode = generateRoomCode();

      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          room_code: roomCode,
          host_name: hostName,
          host_school: hostSchool,
          topic,
          year_group: yearGroup,
          questions: JSON.parse(JSON.stringify(questions)) as Json,
          status: 'waiting',
        })
        .select()
        .single();

      if (error) throw error;

      const sessionData: GameSession = {
        id: data.id,
        room_code: data.room_code,
        host_name: data.host_name,
        host_school: data.host_school,
        topic: data.topic,
        year_group: data.year_group,
        status: data.status as 'waiting' | 'playing' | 'finished',
        current_question: data.current_question,
        questions: data.questions as unknown as Question[],
        created_at: data.created_at,
        started_at: data.started_at || undefined,
        finished_at: data.finished_at || undefined,
      };

      setSession(sessionData);
      setPlayers([]);
      setMyPlayerId(null);
      return { session: sessionData, roomCode };
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create game session');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Join an existing session (student)
  const joinSession = async (roomCode: string, playerName: string, school: string) => {
    setIsLoading(true);
    try {
      // Find the session
      const { data: sessionData, error: sessionError } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .single();

      if (sessionError || !sessionData) {
        toast.error('Game not found. Check your room code.');
        return null;
      }

      if (sessionData.status !== 'waiting') {
        toast.error('This game has already started.');
        return null;
      }

      // Prevent duplicates (same name) within a session
      const { data: existingPlayers } = await supabase
        .from('session_players')
        .select('id, player_name')
        .eq('session_id', sessionData.id);

      if ((existingPlayers || []).some((p) => (p.player_name || '').toLowerCase() === playerName.toLowerCase())) {
        toast.error('That nickname is already taken. Choose another one.');
        return null;
      }

      // Join as a player
      const { data: playerData, error: playerError } = await supabase
        .from('session_players')
        .insert({
          session_id: sessionData.id,
          player_name: playerName,
          school,
          score: 0,
          answers: [] as Json,
          is_ready: true,
        })
        .select()
        .single();

      if (playerError) throw playerError;

      const mappedSession: GameSession = {
        id: sessionData.id,
        room_code: sessionData.room_code,
        host_name: sessionData.host_name,
        host_school: sessionData.host_school,
        topic: sessionData.topic,
        year_group: sessionData.year_group,
        status: sessionData.status as 'waiting' | 'playing' | 'finished',
        current_question: sessionData.current_question,
        questions: sessionData.questions as unknown as Question[],
        created_at: sessionData.created_at,
        started_at: sessionData.started_at || undefined,
        finished_at: sessionData.finished_at || undefined,
      };

      setSession(mappedSession);
      setMyPlayerId(playerData.id);

      toast.success(`Joined ${sessionData.topic} game!`);
      return { session: mappedSession, playerId: playerData.id };
    } catch (error) {
      console.error('Error joining session:', error);
      toast.error('Failed to join game');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Start the game (teacher only)
  const startGame = async () => {
    if (!session) return;

    try {
      const { error } = await supabase
        .from('game_sessions')
        .update({
          status: 'playing',
          started_at: new Date().toISOString(),
          current_question: 0,
        })
        .eq('id', session.id);

      if (error) throw error;
      toast.success('Game started!');
    } catch (error) {
      console.error('Error starting game:', error);
      toast.error('Failed to start game');
    }
  };

  // Move to next question (teacher only)
  const nextQuestion = async () => {
    if (!session) return;

    const nextIdx = session.current_question + 1;
    const isFinished = nextIdx >= session.questions.length;

    try {
      const { error } = await supabase
        .from('game_sessions')
        .update({
          current_question: nextIdx,
          status: isFinished ? 'finished' : 'playing',
          finished_at: isFinished ? new Date().toISOString() : null,
        })
        .eq('id', session.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error advancing question:', error);
    }
  };

  // Submit answer (student)
  const submitAnswer = async (questionId: string, answer: number, correct: boolean, timeMs: number) => {
    if (!myPlayerId || !session) return;

    const points = correct ? Math.max(100, 500 - Math.floor(timeMs / 100)) : 0;

    try {
      // Get current player data
      const { data: playerData } = await supabase
        .from('session_players')
        .select('answers, score')
        .eq('id', myPlayerId)
        .single();

      if (!playerData) return;

      const currentAnswers = (playerData.answers as unknown as SessionPlayer['answers']) || [];
      const newAnswers = [...currentAnswers, { questionId, answer, correct, time: timeMs }];

      const { error } = await supabase
        .from('session_players')
        .update({
          answers: JSON.parse(JSON.stringify(newAnswers)) as Json,
          score: playerData.score + points,
        })
        .eq('id', myPlayerId);

      if (error) throw error;
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  // Subscribe to session updates
  useEffect(() => {
    if (!session) return;

    const sessionChannel = supabase
      .channel(`session-${session.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_sessions',
          filter: `id=eq.${session.id}`,
        },
        (payload) => {
          if (payload.new) {
            const data = payload.new as Record<string, unknown>;
            setSession({
              id: data.id as string,
              room_code: data.room_code as string,
              host_name: data.host_name as string,
              host_school: data.host_school as string,
              topic: data.topic as string,
              year_group: data.year_group as number,
              status: data.status as 'waiting' | 'playing' | 'finished',
              current_question: data.current_question as number,
              questions: data.questions as unknown as Question[],
              created_at: data.created_at as string,
              started_at: data.started_at as string | undefined,
              finished_at: data.finished_at as string | undefined,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'session_players',
          filter: `session_id=eq.${session.id}`,
        },
        async () => {
          const { data } = await supabase
            .from('session_players')
            .select('*')
            .eq('session_id', session.id)
            .order('score', { ascending: false });

          if (data) {
            setPlayers(
              data.map((p) => ({
                id: p.id,
                session_id: p.session_id,
                player_name: p.player_name,
                school: p.school,
                score: p.score,
                answers: p.answers as unknown as SessionPlayer['answers'],
                joined_at: p.joined_at,
                is_ready: p.is_ready,
              }))
            );
          }
        }
      )
      .subscribe();

    // Initial fetch of players
    supabase
      .from('session_players')
      .select('*')
      .eq('session_id', session.id)
      .order('score', { ascending: false })
      .then(({ data }) => {
        if (data) {
          setPlayers(
            data.map((p) => ({
              id: p.id,
              session_id: p.session_id,
              player_name: p.player_name,
              school: p.school,
              score: p.score,
              answers: p.answers as unknown as SessionPlayer['answers'],
              joined_at: p.joined_at,
              is_ready: p.is_ready,
            }))
          );
        }
      });

    return () => {
      sessionChannel.unsubscribe();
    };
  }, [session?.id]);

  // Leave session
  const leaveSession = useCallback(() => {
    setSession(null);
    setPlayers([]);
    setMyPlayerId(null);
  }, []);

  return {
    session,
    players,
    myPlayerId,
    isLoading,
    createSession,
    joinSession,
    startGame,
    nextQuestion,
    submitAnswer,
    leaveSession,
  };
};

export const MultiplayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useProvideMultiplayer();
  return React.createElement(MultiplayerContext.Provider, { value: store }, children);
};

export const useMultiplayer = () => {
  const ctx = useContext(MultiplayerContext);
  if (!ctx) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return ctx;
};

