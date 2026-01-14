-- Create pro_waitlist table for email capture
CREATE TABLE IF NOT EXISTS pro_waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  notified boolean DEFAULT false NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pro_waitlist_email ON pro_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_pro_waitlist_user_id ON pro_waitlist(user_id);
CREATE INDEX IF NOT EXISTS idx_pro_waitlist_created_at ON pro_waitlist(created_at);

-- Enable RLS
ALTER TABLE pro_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for anyone (for anonymous users)
CREATE POLICY "Anyone can join waitlist" ON pro_waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to view their own entries
CREATE POLICY "Users can view own waitlist entries" ON pro_waitlist
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);