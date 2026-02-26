'use client';

import { useEffect } from 'react';
import { Container, Heading, BodyText } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }}>
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg" style={{ color: 'var(--accent)' }}>
              eduba
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="/dashboard" className="button-subtle text-xs sm:text-sm">
              Dashboard
            </a>
          </div>
        </Container>
      </header>

      <main>
        <Container className="py-12">
          <div className="text-center max-w-2xl mx-auto">
            <Heading level={1} className="text-3xl mb-6" style={{ color: 'var(--foreground)' }}>
              Something went wrong
            </Heading>

            <BodyText className="text-lg mb-8 opacity-80" style={{ color: 'var(--foreground)' }}>
              We encountered an unexpected error. This has been logged and we'll look into it.
            </BodyText>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="button-primary mr-4"
              >
                Try again
              </button>

              <a
                href="/dashboard"
                className="button-subtle"
              >
                Return to Dashboard
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm opacity-60 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs opacity-60 bg-gray-100 p-4 rounded overflow-x-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}