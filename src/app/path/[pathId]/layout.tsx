import { Metadata } from 'next'
import { NOINDEX_METADATA } from '@/lib/metadata'

// This is the client-rendered, auth/progress-aware practice dashboard for a
// collection. The public, crawlable, indexable version of this content lives
// at /collections/[slug] — keeping both indexable would create duplicate
// content for Google, and this page has no server-rendered content anyway
// (it's a loading skeleton on first paint). noindex here, canonical there.
export const metadata: Metadata = NOINDEX_METADATA

export default function PathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
