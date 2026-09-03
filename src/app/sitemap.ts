import { MetadataRoute } from 'next'
import {
  getSeoReadyPassages,
  getDistinctSeoAuthors,
  getDistinctSeoWorks,
  getDistinctSeoCollections,
} from '@/lib/seo-content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eduba.co'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/techniques`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/benefits`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/study-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  try {
    // Public, crawlable SEO content pages — only seo_ready content is included.
    // Practice pages (/practice/[id]) and the collection practice dashboard
    // (/path/[pathId]) are deliberately excluded: they're the interactive
    // tool and a client-rendered, noindexed duplicate of /collections/[slug]
    // respectively, not unique indexable content.
    const seoPassages = await getSeoReadyPassages()
    const [seoAuthors, seoWorks, seoCollections] = await Promise.all([
      getDistinctSeoAuthors(seoPassages),
      getDistinctSeoWorks(seoPassages),
      getDistinctSeoCollections(seoPassages),
    ])

    const passagePages = seoPassages.map(p => ({
      url: `${baseUrl}/passages/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const collectionPages = seoCollections.map(c => ({
      url: `${baseUrl}/collections/${c.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    const authorPages = seoAuthors.map(a => ({
      url: `${baseUrl}/authors/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    const workPages = seoWorks.map(w => ({
      url: `${baseUrl}/works/${w.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    const allPages = [...staticPages, ...passagePages, ...collectionPages, ...authorPages, ...workPages]
    console.log(`Generated sitemap with ${allPages.length} pages`)
    return allPages
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages if database fails
    return staticPages
  }
}