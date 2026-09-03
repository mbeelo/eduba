import { Metadata } from 'next'
import { NOINDEX_METADATA } from '@/lib/metadata'

// The interactive recall tool itself — not unique indexable content (see the
// same reasoning in src/app/sitemap.ts, and src/app/path/[pathId]/layout.tsx
// for the sibling collection-dashboard route). This route previously had no
// layout at all, so it was indexable despite the app's stated intent that it
// shouldn't be.
export const metadata: Metadata = NOINDEX_METADATA

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
