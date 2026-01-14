const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Content directory
const contentDir = path.join(__dirname, '../src/content');

async function seedContent() {
  try {
    const args = process.argv.slice(2);
    const shouldReplace = args.includes('--replace');

    console.log('🌱 Starting content seeding...');
    console.log(`📝 Mode: ${shouldReplace ? 'REPLACE all content' : 'ADD new content'}`);

    // Get all JSON files in content directory
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.json'));

    console.log(`📁 Found ${files.length} content files:`, files);

    if (shouldReplace) {
      // Clear existing passages only if explicitly requested
      console.log('🗑️  Clearing existing passages...');
      const { error: deleteError } = await supabase
        .from('passages')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteError) {
        console.error('Error clearing existing passages:', deleteError);
        return;
      }
    } else {
      console.log('➕ Adding new content (existing content will be preserved)');
    }

    let totalPassages = 0;
    let skippedDuplicates = 0;

    // Process each file
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      console.log(`📖 Processing ${file}: ${content.length} passages`);

      let insertedCount = 0;

      for (const passage of content) {
        // Check if passage already exists (by title and path)
        const { data: existing, error: checkError } = await supabase
          .from('passages')
          .select('id')
          .eq('title', passage.title)
          .eq('path', passage.path)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error(`Error checking for existing passage "${passage.title}":`, checkError);
          continue;
        }

        if (existing) {
          skippedDuplicates++;
          continue; // Skip if already exists
        }

        // Insert new passage
        const { data, error } = await supabase
          .from('passages')
          .insert({
            title: passage.title,
            author: passage.author,
            content: passage.content,
            path: passage.path,
            difficulty_order: passage.difficulty_order
          })
          .select('id, title');

        if (error) {
          console.error(`Error inserting passage "${passage.title}":`, error);
          continue;
        }

        insertedCount++;
        totalPassages++;
      }

      console.log(`✅ Inserted ${insertedCount} new passages from ${file}`);
      if (skippedDuplicates > 0) {
        console.log(`⏭️  Skipped ${skippedDuplicates} duplicate passages`);
      }
    }

    console.log(`🎉 Seeding complete! Total NEW passages inserted: ${totalPassages}`);
    if (skippedDuplicates > 0) {
      console.log(`⏭️  Total duplicates skipped: ${skippedDuplicates}`);
    }

    // Verify the data
    const { data: verifyData, error: verifyError } = await supabase
      .from('passages')
      .select('path');

    if (!verifyError && verifyData) {
      console.log('\n📊 Content summary:');
      const pathCounts = verifyData.reduce((acc, row) => {
        acc[row.path] = (acc[row.path] || 0) + 1;
        return acc;
      }, {});

      Object.entries(pathCounts).forEach(([path, count]) => {
        console.log(`   ${path}: ${count} passages`);
      });
    }

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
seedContent().then(() => {
  console.log('✨ Done!');
  process.exit(0);
});