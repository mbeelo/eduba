import { cache } from 'react'
import { supabase } from './supabase'
import { authorSlug, workSlug } from './slug'

export interface SeoPassage {
  id: string
  slug: string
  path: string
  title: string
  author: string | null
  work: string | null
  content: string
  difficulty_order: number
  seo_title: string | null
  seo_description: string | null
  seo_intro: string | null
  theme_tags: string[] | null
  seo_ready: boolean
  featured: boolean
  created_at: string
}

// Authors that are not people (government documents) — no /authors/[slug]
// page or Person JSON-LD should ever be generated for these. Use
// isPersonAuthor() rather than checking this array directly, so every call
// site (including anywhere that builds a list of author links) stays in sync.
export const NON_PERSON_AUTHORS = ['Declaration of Independence', 'U.S. Constitution']

export function isPersonAuthor(author: string | null | undefined): author is string {
  return !!author && !NON_PERSON_AUTHORS.includes(author)
}

// Wrapped in React's cache() so that generateMetadata and the page component
// — which each independently call these for the same params within one
// render/static-generation pass — share a single Supabase round trip instead
// of issuing the same query twice.

export const getPassageBySlug = cache(async (slug: string): Promise<SeoPassage | null> => {
  // Filters seo_ready itself (not just the caller's responsibility) so a
  // non-ready passage's slug is never usable anywhere it's looked up by —
  // including routes added later, like the per-passage OG image, that might
  // forget to recheck seo_ready themselves.
  const { data, error } = await supabase
    .from('passages')
    .select('*')
    .eq('slug', slug)
    .eq('seo_ready', true)
    .maybeSingle()

  if (error || !data) return null
  return data as SeoPassage
})

export const getSeoReadyPassages = cache(async (): Promise<SeoPassage[]> => {
  const { data, error } = await supabase
    .from('passages')
    .select('*')
    .eq('seo_ready', true)
    .order('path', { ascending: true })
    .order('difficulty_order', { ascending: true })

  if (error || !data) return []
  return data as SeoPassage[]
})

export const getPassagesByAuthorSlug = cache(async (slug: string): Promise<SeoPassage[]> => {
  const passages = await getSeoReadyPassages()
  return passages.filter((p) => isPersonAuthor(p.author) && authorSlug(p.author) === slug)
})

export const getPassagesByWorkSlug = cache(async (slug: string): Promise<SeoPassage[]> => {
  const passages = await getSeoReadyPassages()
  return passages.filter((p) => p.work && workSlug(p.author, p.work) === slug)
})

export const getPassagesByCollectionSlug = cache(async (path: string): Promise<SeoPassage[]> => {
  const passages = await getSeoReadyPassages()
  return passages.filter((p) => p.path === path)
})

export async function getRelatedPassages(passage: SeoPassage, limit = 4): Promise<SeoPassage[]> {
  const passages = await getSeoReadyPassages()
  return passages
    .filter((p) => p.id !== passage.id)
    .filter(
      (p) =>
        (passage.author && p.author === passage.author) ||
        (passage.work && p.work === passage.work) ||
        p.path === passage.path
    )
    .slice(0, limit)
}

// Each of these accepts an optional pre-fetched passage list so callers that
// need several of these groupings at once (e.g. the sitemap) can fetch
// getSeoReadyPassages() a single time and derive all of them from it,
// instead of each function independently re-querying the same data.

export async function getDistinctSeoAuthors(
  passages?: SeoPassage[]
): Promise<{ slug: string; name: string; count: number }[]> {
  const list = passages ?? (await getSeoReadyPassages())
  const byAuthor = new Map<string, { slug: string; name: string; count: number }>()

  for (const p of list) {
    if (!isPersonAuthor(p.author)) continue
    const slug = authorSlug(p.author)
    const existing = byAuthor.get(slug)
    if (existing) {
      existing.count++
    } else {
      byAuthor.set(slug, { slug, name: p.author, count: 1 })
    }
  }

  return Array.from(byAuthor.values())
}

export async function getDistinctSeoWorks(
  passages?: SeoPassage[]
): Promise<{ slug: string; title: string; authorSlug: string | null; authorName: string | null; count: number }[]> {
  const list = passages ?? (await getSeoReadyPassages())
  const byWork = new Map<
    string,
    { slug: string; title: string; authorSlug: string | null; authorName: string | null; count: number }
  >()

  for (const p of list) {
    if (!p.work) continue
    const slug = workSlug(p.author, p.work)
    const existing = byWork.get(slug)
    if (existing) {
      existing.count++
    } else {
      byWork.set(slug, {
        slug,
        title: p.work,
        authorSlug: isPersonAuthor(p.author) ? authorSlug(p.author) : null,
        authorName: p.author,
        count: 1,
      })
    }
  }

  return Array.from(byWork.values())
}

export async function getDistinctSeoCollections(passages?: SeoPassage[]): Promise<{ path: string; count: number }[]> {
  const list = passages ?? (await getSeoReadyPassages())
  const byPath = new Map<string, number>()

  for (const p of list) {
    byPath.set(p.path, (byPath.get(p.path) ?? 0) + 1)
  }

  return Array.from(byPath.entries()).map(([path, count]) => ({ path, count }))
}
