import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPassagesByCollectionSlug, getDistinctSeoCollections, isPersonAuthor } from '@/lib/seo-content'
import { getPathMetadata } from '@/lib/progress'
import { authorSlug } from '@/lib/slug'
import { SITE_URL } from '@/lib/json-ld'

export async function generateStaticParams() {
  const collections = await getDistinctSeoCollections()
  return collections.map((c) => ({ slug: c.path }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const passages = await getPassagesByCollectionSlug(slug)
  if (passages.length === 0) return {}

  const meta = getPathMetadata(slug)
  const title = meta.name
  const description = meta.description

  return {
    title,
    description,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/collections/${slug}` },
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passages = await getPassagesByCollectionSlug(slug)

  if (passages.length === 0) notFound()

  const meta = getPathMetadata(slug)
  const authors = Array.from(
    new Map(
      passages.filter((p) => isPersonAuthor(p.author)).map((p) => [authorSlug(p.author as string), p.author as string])
    ).entries()
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }} role="banner">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-lg" style={{ color: 'var(--accent)' }}>eduba</span>
          </Link>
          <Link href="/dashboard">
            <button className="button-subtle text-xs sm:text-sm">Dashboard</button>
          </Link>
        </Container>
      </header>

      <main role="main" id="main-content">
        <Container>
          <Section className="py-12">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { name: 'Home', url: '/' },
                  { name: 'Collections', url: '/collections' },
                  { name: meta.name, url: `/collections/${slug}` },
                ]}
              />

              <Heading level={1} className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                {meta.name}
              </Heading>
              <BodyText className="text-lg mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                {meta.description}
              </BodyText>

              {authors.length > 0 && (
                <div className="mb-8">
                  <Heading level={2} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                    Authors
                  </Heading>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {authors.map(([aSlug, aName]) => (
                      <li key={aSlug}>
                        <Link href={`/authors/${aSlug}`} className="hover:underline" style={{ color: 'var(--accent)' }}>
                          {aName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <Heading level={2} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Passages
                </Heading>
                <ul className="space-y-2">
                  {passages.map((p) => (
                    <li key={p.id}>
                      <Link href={`/passages/${p.slug}`} className="hover:underline" style={{ color: 'var(--accent)' }}>
                        {p.title}
                      </Link>
                      {p.author && <span style={{ color: 'var(--foreground)', opacity: 0.6 }}> — {p.author}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
