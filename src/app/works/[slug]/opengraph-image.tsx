import { ImageResponse } from 'next/og'
import { getPassagesByWorkSlug } from '@/lib/seo-content'
import { OgCard, ogImageSize, ogImageContentType } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passages = await getPassagesByWorkSlug(slug)
  const work = passages[0]?.work ?? 'Eduba'
  const author = passages[0]?.author

  return new ImageResponse(<OgCard title={work} subtitle={author ?? undefined} />, { ...size })
}
