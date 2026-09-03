// Applies migrations/add-seo-content-fields.sql to the configured Supabase project.
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  console.log('🚀 Applying add-seo-content-fields migration...');

  const sql = fs.readFileSync(
    path.join(__dirname, '..', 'migrations', 'add-seo-content-fields.sql'),
    'utf8'
  );

  const { error } = await supabase.rpc('exec_sql', { sql });

  if (error) {
    console.error('❌ Error applying migration:', error);
    process.exit(1);
  }

  console.log('✅ Migration applied successfully!');

  const { data, error: testError } = await supabase
    .from('passages')
    .select('id, slug, seo_ready')
    .limit(1);

  if (testError) {
    console.error('❌ Error verifying new columns:', testError);
    process.exit(1);
  }

  console.log('✅ New columns are accessible!', data);
}

applyMigration().catch((err) => {
  console.error(err);
  process.exit(1);
});
