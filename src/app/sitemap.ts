import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eduba.app'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
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
    // Get all learning paths
    const { data: passages } = await supabase
      .from('passages')
      .select('path, id')
      .order('path')

    if (!passages) return staticPages

    // Get unique paths
    const uniquePaths = [...new Set(passages.map(p => p.path))]

    // Add path pages
    const pathPages = uniquePaths.map(path => ({
      url: `${baseUrl}/paths/${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Add practice pages (but with lower priority since they're user-specific)
    const practicePages = passages.map(passage => ({
      url: `${baseUrl}/practice/${passage.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...pathPages, ...practicePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages if database fails
    return staticPages
  }
}