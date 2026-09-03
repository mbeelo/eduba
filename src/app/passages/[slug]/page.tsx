import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { PracticeCta } from '@/components/seo/PracticeCta'
import { getPassageBySlug, getSeoReadyPassages, getRelatedPassages, isPersonAuthor } from '@/lib/seo-content'
import { authorSlug, workSlug } from '@/lib/slug'
import { creativeWorkJsonLd, SITE_URL } from '@/lib/json-ld'
import { getPathMetadata } from '@/lib/progress'

export async function generateStaticParams() {
  const passages = await getSeoReadyPassages()
  return passages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const passage = await getPassageBySlug(slug)
  if (!passage) return {}

  const title = passage.seo_title ?? `${passage.title} by ${passage.author}`
  const description = passage.seo_description ?? passage.seo_intro ?? passage.content.slice(0, 155)

  return {
    title,
    description,
    alternates: { canonical: `/passages/${passage.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/passages/${passage.slug}` },
  }
}

export default async function PassagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passage = await getPassageBySlug(slug)

  if (!passage) notFound()

  const [related, pathMeta] = await Promise.all([
    getRelatedPassages(passage),
    Promise.resolve(getPathMetadata(passage.path)),
  ])

  const isPerson = isPersonAuthor(passage.author)
  const authorHref = passage.author && isPerson ? `/authors/${authorSlug(passage.author)}` : null
  const workHref = passage.work ? `/works/${workSlug(passage.author, passage.work)}` : null

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: pathMeta.name, url: `/collections/${passage.path}` },
    ...(authorHref ? [{ name: passage.author as string, url: authorHref }] : []),
    { name: passage.title, url: `/passages/${passage.slug}` },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd(passage)) }}
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
              <Breadcrumbs items={breadcrumbItems} />

              <Heading level={1} className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                {passage.title}
              </Heading>

              {passage.author && (
                <BodyText className="text-lg mb-1" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  {authorHref ? (
                    <Link href={authorHref} className="hover:underline" style={{ color: 'var(--accent)' }}>
                      {passage.author}
                    </Link>
                  ) : (
                    passage.author
                  )}
                  {passage.work && (
                    <>
                      {' — '}
                      {workHref ? (
                        <Link href={workHref} className="hover:underline" style={{ color: 'var(--accent)' }}>
                          {passage.work}
                        </Link>
                      ) : (
                        passage.work
                      )}
                    </>
                  )}
                </BodyText>
              )}

              <blockquote
                className="text-xl leading-relaxed font-serif my-8 pl-6 border-l-4"
                style={{ borderColor: 'var(--accent)', color: 'var(--foreground)' }}
              >
                {passage.content}
              </blockquote>

              {passage.seo_intro && (
                <BodyText className="text-base leading-relaxed mb-6" style={{ color: 'var(--foreground)', opacity: 0.85 }}>
                  {passage.seo_intro}
                </BodyText>
              )}

              {passage.theme_tags && passage.theme_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {passage.theme_tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: 'var(--background-soft)', color: 'var(--foreground)', opacity: 0.7 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-12">
                <PracticeCta
                  slug={passage.slug}
                  title={passage.title}
                  path={passage.path}
                  fallbackHref={`/collections/${passage.path}`}
                />
              </div>

              {related.length > 0 && (
                <div className="mb-12">
                  <Heading level={2} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Related passages
                  </Heading>
                  <ul className="space-y-2">
                    {related.map((r) => (
                      <li key={r.id}>
                        <Link href={`/passages/${r.slug}`} className="hover:underline" style={{ color: 'var(--accent)' }}>
                          {r.title}
                        </Link>
                        {r.author && (
                          <span style={{ color: 'var(--foreground)', opacity: 0.6 }}> — {r.author}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
