import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getDistinctSeoCollections } from '@/lib/seo-content'
import { getPathMetadata } from '@/lib/progress'
import { SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse passages from the Stoics, the Founders, the Poets, and more — read and practice recalling texts worth remembering.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Collections',
    description: 'Browse passages from the Stoics, the Founders, the Poets, and more — read and practice recalling texts worth remembering.',
    url: `${SITE_URL}/collections`,
  },
}

export default async function CollectionsIndexPage() {
  const collections = await getDistinctSeoCollections()
  const entries = collections.map((c) => ({ ...c, meta: getPathMetadata(c.path) }))

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
              <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Collections', url: '/collections' }]} />

              <Heading level={1} className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                Collections
              </Heading>
              <BodyText className="text-lg mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Passages worth reading and recalling, grouped by tradition.
              </BodyText>

              <ul className="space-y-6">
                {entries.map(({ path, count, meta }) => (
                  <li key={path}>
                    <Link href={`/collections/${path}`} className="block hover:underline" style={{ color: 'var(--accent)' }}>
                      <Heading level={2} className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>
                        {meta.name}
                      </Heading>
                    </Link>
                    <BodyText className="text-base" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                      {meta.description}
                    </BodyText>
                    <span className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                      {count} {count === 1 ? 'passage' : 'passages'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
