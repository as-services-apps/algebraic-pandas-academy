-- Create game sessions table for teacher-hosted multiplayer games
CREATE TABLE public.game_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT NOT NULL UNIQUE,
  host_name TEXT NOT NULL,
  host_school TEXT NOT NULL,
  topic TEXT NOT NULL,
  year_group INTEGER NOT NULL DEFAULT 7,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  current_question INTEGER NOT NULL DEFAULT 0,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE
);

-- Create session players table for students who join
CREATE TABLE public.session_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.game_sessions(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  school TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_ready BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_players ENABLE ROW LEVEL SECURITY;

-- Anyone can view game sessions (needed to join)
CREATE POLICY "Anyone can view game sessions" 
ON public.game_sessions 
FOR SELECT 
USING (true);

-- Anyone can create game sessions (teachers)
CREATE POLICY "Anyone can create game sessions" 
ON public.game_sessions 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update game sessions (for status changes)
CREATE POLICY "Anyone can update game sessions" 
ON public.game_sessions 
FOR UPDATE 
USING (true);

-- Anyone can view session players (for leaderboard)
CREATE POLICY "Anyone can view session players" 
ON public.session_players 
FOR SELECT 
USING (true);

-- Anyone can join sessions
CREATE POLICY "Anyone can join sessions" 
ON public.session_players 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update their own player record
CREATE POLICY "Anyone can update session players" 
ON public.session_players 
FOR UPDATE 
USING (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_players;

-- Create index for room code lookup
CREATE INDEX idx_game_sessions_room_code ON public.game_sessions(room_code);
CREATE INDEX idx_session_players_session_id ON public.session_players(session_id);