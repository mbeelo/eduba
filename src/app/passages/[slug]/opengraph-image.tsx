import { ImageResponse } from 'next/og'
import { getPassageBySlug } from '@/lib/seo-content'
import { OgCard, ogImageSize, ogImageContentType } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passage = await getPassageBySlug(slug)

  return new ImageResponse(
    <OgCard title={passage?.title ?? 'A passage worth remembering'} subtitle={passage?.author ?? undefined} />,
    { ...size }
  )
}
