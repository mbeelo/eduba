// Script to create pro_waitlist table
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createProWaitlistTable() {
  console.log('🚀 Creating pro_waitlist table...');

  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
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
    `
  });

  if (error) {
    console.error('❌ Error creating table:', error);
  } else {
    console.log('✅ pro_waitlist table created successfully!');
  }

  // Test the table by doing a simple query
  const { data: testData, error: testError } = await supabase
    .from('pro_waitlist')
    .select('count')
    .limit(1);

  if (testError) {
    console.error('❌ Error testing table:', testError);
  } else {
    console.log('✅ Table is accessible!');
  }
}

createProWaitlistTable().catch(console.error);