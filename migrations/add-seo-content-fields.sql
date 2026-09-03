-- Add SEO content fields to passages, enabling public crawlable pages
-- (/passages/[slug], /authors/[slug], /works/[slug], /collections/[slug]).
--
-- slug is nullable + UNIQUE (Postgres allows multiple NULLs under a UNIQUE
-- constraint, so this is safe to run before slugs are backfilled onto
-- existing rows). Run scripts/backfill-slugs.js immediately after this
-- migration so every existing row gets a stable, non-null slug before
-- populate-db.js is switched from delete+insert to upsert-by-slug.

ALTER TABLE passages
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS work TEXT,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_intro TEXT,
  ADD COLUMN IF NOT EXISTS theme_tags TEXT[],
  ADD COLUMN IF NOT EXISTS seo_ready BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_passages_seo_ready ON passages(seo_ready) WHERE seo_ready = true;
CREATE INDEX IF NOT EXISTS idx_passages_work ON passages(work) WHERE work IS NOT NULL;
