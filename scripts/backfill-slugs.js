// One-time backfill: computes and sets `slug` on every existing passage row
// IN PLACE (update by id, no delete/insert), so ids and any linked
// user_progress rows are completely untouched. Run this once, immediately
// after applying migrations/add-seo-content-fields.sql, and before
// populate-db.js is run in its new upsert-by-slug mode.
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const { passageSlug } = require('./slug-utils');

async function backfillSlugs() {
  console.log('🚀 Backfilling slugs onto existing passages (in-place update, no deletes)...');

  const { data: passages, error: fetchError } = await supabase
    .from('passages')
    .select('id, author, title, slug');

  if (fetchError) {
    console.error('❌ Error fetching passages:', fetchError);
    process.exit(1);
  }

  console.log(`Found ${passages.length} passages.`);

  const seen = new Set();
  let updated = 0;
  let skipped = 0;

  for (const p of passages) {
    if (p.slug) {
      seen.add(p.slug);
      skipped++;
      continue;
    }

    let slug = passageSlug(p.author, p.title);
    let suffix = 2;
    while (seen.has(slug)) {
      slug = `${passageSlug(p.author, p.title)}-${suffix}`;
      suffix++;
    }
    seen.add(slug);

    const { error: updateError } = await supabase
      .from('passages')
      .update({ slug })
      .eq('id', p.id);

    if (updateError) {
      console.error(`❌ Error updating passage ${p.id} (${p.title}):`, updateError);
      process.exit(1);
    }

    updated++;
  }

  console.log(`✅ Backfill complete. ${updated} slugs set, ${skipped} already had one.`);
}

backfillSlugs().catch((err) => {
  console.error(err);
  process.exit(1);
});
