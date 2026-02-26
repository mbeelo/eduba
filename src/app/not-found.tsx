import Link from 'next/link';
import { Container, Heading, BodyText } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }}>
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-lg" style={{ color: 'var(--accent)' }}>
                eduba
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="button-subtle text-xs sm:text-sm">
              Dashboard
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <Container className="py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-8xl opacity-20 mb-8" style={{ color: 'var(--accent)' }}>
              404
            </div>

            <Heading level={1} className="text-3xl mb-6" style={{ color: 'var(--foreground)' }}>
              Page not found
            </Heading>

            <BodyText className="text-lg mb-8 opacity-80" style={{ color: 'var(--foreground)' }}>
              The page you're looking for doesn't exist or may have been moved.
            </BodyText>

            <div className="space-y-4">
              <Link href="/dashboard" className="button-primary mr-4">
                Go to Dashboard
              </Link>

              <Link href="/" className="button-subtle">
                Return Home
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <Link href="/about" className="clean-card p-4 hover:shadow-md transition-shadow">
                <div className="font-medium mb-2" style={{ color: 'var(--accent)' }}>
                  About Eduba
                </div>
                <div className="opacity-70" style={{ color: 'var(--foreground)' }}>
                  Learn about our mission and approach
                </div>
              </Link>

              <Link href="/techniques" className="clean-card p-4 hover:shadow-md transition-shadow">
                <div className="font-medium mb-2" style={{ color: 'var(--accent)' }}>
                  Techniques
                </div>
                <div className="opacity-70" style={{ color: 'var(--foreground)' }}>
                  Memory training methods and tips
                </div>
              </Link>

              <Link href="/contact" className="clean-card p-4 hover:shadow-md transition-shadow">
                <div className="font-medium mb-2" style={{ color: 'var(--accent)' }}>
                  Contact
                </div>
                <div className="opacity-70" style={{ color: 'var(--foreground)' }}>
                  Get in touch with us
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}