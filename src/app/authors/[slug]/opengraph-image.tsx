import { ImageResponse } from 'next/og'
import { getPassagesByAuthorSlug } from '@/lib/seo-content'
import { OgCard, ogImageSize, ogImageContentType } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passages = await getPassagesByAuthorSlug(slug)
  const name = passages[0]?.author ?? 'Eduba'

  return new ImageResponse(
    <OgCard title={name} subtitle={`Read and practice recalling ${name}'s passages`} />,
    { ...size }
  )
}
