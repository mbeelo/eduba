-- Eduba Database Schema
-- Schema for Supabase deployment

-- Create passages table
CREATE TABLE IF NOT EXISTS passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,  -- 'stoics', 'founders', 'poets', etc.
  title TEXT NOT NULL,
  author TEXT,
  content TEXT NOT NULL,
  difficulty_order INTEGER NOT NULL,  -- 1, 2, 3... determines sequence
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  passage_id UUID REFERENCES passages(id) ON DELETE CASCADE,
  best_accuracy FLOAT,
  attempts INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, passage_id)
);

-- Create user streaks table (optional for MVP)
CREATE TABLE IF NOT EXISTS user_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_practice_date DATE
);

-- Enable Row Level Security on all tables
ALTER TABLE passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for passages (public read access)
CREATE POLICY "Anyone can read passages" ON passages
  FOR SELECT USING (true);

-- RLS Policies for user_progress (users can only see their own progress)
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_streaks (users can only see their own streaks)
CREATE POLICY "Users can view their own streaks" ON user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks" ON user_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" ON user_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_passages_path_order ON passages(path, difficulty_order);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_passage_id ON user_progress(passage_id);