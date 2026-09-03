import type { Metadata } from 'next'

// Shared by every layout for a client-rendered, auth/progress-aware, or
// otherwise user-specific route that has no unique public content of its
// own — dashboard, account, and the practice/path flows. The public,
// crawlable version of that content (where one exists) lives at
// /collections/[slug] etc. instead.
export const NOINDEX_METADATA: Metadata = {
  robots: { index: false, follow: false },
}
