const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanNovelists() {
  console.log('🗑️  Cleaning old Novelists passages...');

  const { error } = await supabase
    .from('passages')
    .delete()
    .eq('path', 'novelists');

  if (error) {
    console.error('Error cleaning novelists:', error);
    return;
  }

  console.log('✅ Old Novelists passages deleted');
}

cleanNovelists().then(() => {
  console.log('✨ Done!');
  process.exit(0);
});