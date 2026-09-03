import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPassagesByWorkSlug, getDistinctSeoWorks, isPersonAuthor } from '@/lib/seo-content'
import { seoWorks } from '@/content/seo/works'
import { authorSlug } from '@/lib/slug'
import { workJsonLd, SITE_URL } from '@/lib/json-ld'

export async function generateStaticParams() {
  const works = await getDistinctSeoWorks()
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const passages = await getPassagesByWorkSlug(slug)
  if (passages.length === 0) return {}

  const work = passages[0].work as string
  const title = work
  const description = `Read and practice recalling passages from ${work} using Eduba's active recall trainer.`

  return {
    title,
    description,
    alternates: { canonical: `/works/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/works/${slug}` },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passages = await getPassagesByWorkSlug(slug)

  if (passages.length === 0) notFound()

  const work = passages[0].work as string
  const author = passages[0].author
  const authorHref = isPersonAuthor(author) ? `/authors/${authorSlug(author)}` : null
  const content = seoWorks[slug]

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workJsonLd(work, author, content?.summary, `${SITE_URL}/works/${slug}`)),
        }}
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
                  ...(authorHref && author ? [{ name: author, url: authorHref }] : []),
                  { name: work, url: `/works/${slug}` },
                ]}
              />

              <Heading level={1} className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                {work}
              </Heading>

              {author && (
                <BodyText className="text-lg mb-6" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  {authorHref ? (
                    <Link href={authorHref} className="hover:underline" style={{ color: 'var(--accent)' }}>
                      {author}
                    </Link>
                  ) : (
                    author
                  )}
                </BodyText>
              )}

              {content?.summary && (
                <BodyText className="text-base leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.85 }}>
                  {content.summary}
                </BodyText>
              )}

              <div>
                <Heading level={2} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Passages from this work
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
