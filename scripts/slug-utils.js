// Shared by populate-db.js and scripts/backfill-slugs.js — both are plain
// Node/CommonJS scripts with no TS toolchain in their execution path, so
// they can't import src/lib/slug.ts directly, but they CAN share one copy
// of the same logic between themselves. Keep this in sync with
// src/lib/slug.ts's slugify()/passageSlug() (the typed version used by the
// app's Server Components).
function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function passageSlug(author, title) {
  const authorPart = slugify(author ?? 'unknown');
  const titlePart = slugify(title);
  return `${authorPart}-${titlePart}`;
}

module.exports = { slugify, passageSlug };
