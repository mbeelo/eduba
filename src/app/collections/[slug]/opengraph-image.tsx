import { ImageResponse } from 'next/og'
import { getPathMetadata } from '@/lib/progress'
import { OgCard, ogImageSize, ogImageContentType } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getPathMetadata(slug)

  return new ImageResponse(<OgCard title={meta.name} subtitle={meta.description} />, { ...size })
}
