import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPassagesByAuthorSlug, getDistinctSeoAuthors } from '@/lib/seo-content'
import { seoAuthors } from '@/content/seo/authors'
import { workSlug } from '@/lib/slug'
import { personJsonLd, SITE_URL } from '@/lib/json-ld'

export async function generateStaticParams() {
  const authors = await getDistinctSeoAuthors()
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const passages = await getPassagesByAuthorSlug(slug)
  if (passages.length === 0) return {}

  const name = passages[0].author as string
  const title = name
  const description = `Read and practice recalling passages from ${name} using Eduba's active recall trainer.`

  return {
    title,
    description,
    alternates: { canonical: `/authors/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/authors/${slug}` },
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passages = await getPassagesByAuthorSlug(slug)

  if (passages.length === 0) notFound()

  const name = passages[0].author as string
  const content = seoAuthors[slug]
  const works = Array.from(
    new Map(
      passages.filter((p) => p.work).map((p) => [workSlug(p.author, p.work as string), p.work as string])
    ).entries()
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(name, content?.bio)) }}
      />

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
                  { name: 'Authors', url: '/authors' },
                  { name, url: `/authors/${slug}` },
                ]}
              />

              <Heading level={1} className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                {name}
              </Heading>
              {content?.years && (
                <BodyText className="text-sm mb-6" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  {content.years}
                </BodyText>
              )}

              {content?.bio && (
                <BodyText className="text-base leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.85 }}>
                  {content.bio}
                </BodyText>
              )}

              {works.length > 0 && (
                <div className="mb-8">
                  <Heading level={2} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                    Works
                  </Heading>
                  <ul className="space-y-1">
                    {works.map(([wSlug, wTitle]) => (
                      <li key={wSlug}>
                        <Link href={`/works/${wSlug}`} className="hover:underline" style={{ color: 'var(--accent)' }}>
                          {wTitle}
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
