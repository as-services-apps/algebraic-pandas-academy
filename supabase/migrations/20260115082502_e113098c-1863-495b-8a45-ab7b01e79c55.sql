-- Create players table to track who's using the app
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  school TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'teacher')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts (no auth required for this use case)
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (tracking visitors)
CREATE POLICY "Anyone can insert players"
ON public.players
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read players (for admin/leaderboard)
CREATE POLICY "Anyone can view players"
ON public.players
FOR SELECT
USING (true);