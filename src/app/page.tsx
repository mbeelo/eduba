'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import {
  Container,
  Heading,
  BodyText,
  Section,
} from '@/components/ui';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent text-background px-4 py-2 rounded text-sm font-medium"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }} role="banner">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg" style={{ color: 'var(--accent)' }}>
              eduba
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="button-subtle text-lg"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link href="/auth/signup">
              <button className="button-subtle text-xs sm:text-sm">
                Sign Up
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="button-subtle text-xs sm:text-sm">
                Dashboard
              </button>
            </Link>
          </div>
        </Container>
      </header>

      <main role="main" id="main-content">
        {/* Hero Section */}
        <Section className="py-24 lg:py-32">
          <Container className="text-center">
            <div className="max-w-5xl mx-auto">
              <Heading level={1} className="text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--foreground)' }}>
                Remember what you read.
              </Heading>

              <BodyText className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Most tools help you read more. Eduba helps you remember more using texts worth learning.
              </BodyText>

              <div className="flex justify-center mb-8">
                <Link href="/dashboard">
                  <button className="button-primary text-xl font-bold" style={{ padding: '1rem 2rem', borderRadius: '4px' }}>
                    Start Learning
                  </button>
                </Link>
              </div>

              <p className="text-sm opacity-60" style={{ color: 'var(--foreground)' }}>
                No account required.
              </p>
            </div>
          </Container>
        </Section>

        {/* Audience Callout */}
        <Section className="py-24">
          <Container className="text-center">
            <div className="max-w-3xl mx-auto">
              <BodyText className="text-2xl leading-relaxed italic font-medium" style={{ color: 'var(--foreground)' }}>
                Ever highlighted a paragraph, felt smarter for a moment, and then failed to recall it later?
                <br />
                This is for you.
              </BodyText>
            </div>
          </Container>
        </Section>

        {/* Method Proof */}
        <Section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                An old discipline, made simple
              </Heading>

              <BodyText className="text-lg mb-12 leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Train the way scholars and philosophers did for centuries.
              </BodyText>
            </div>

            {/* Practice Interface Mockup */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="text-center mb-4">
                <BodyText className="text-sm font-medium opacity-60" style={{ color: 'var(--foreground)' }}>
                  Practice session
                </BodyText>
              </div>
              <div className="clean-card p-6 mb-6 border" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                <div className="text-center mb-6">
                  <Heading level={3} className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Self-Evident Truths
                  </Heading>
                  <BodyText className="text-base opacity-60" style={{ color: 'var(--foreground)' }}>
                    Declaration of Independence
                  </BodyText>
                  <BodyText className="text-sm mt-4 opacity-50" style={{ color: 'var(--foreground)' }}>
                    phase 3: results
                  </BodyText>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <BodyText className="text-sm font-medium mb-3 opacity-70" style={{ color: 'var(--foreground)' }}>
                      original text
                    </BodyText>
                    <div className="text-base leading-relaxed">
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>We</span>{' '}
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>hold</span>{' '}
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>these</span>{' '}
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>truths</span>{' '}
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>to</span>{' '}
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>be</span>{' '}
                      <span className="bg-yellow-200 px-1 rounded" style={{ backgroundColor: 'var(--accent)', color: 'var(--background)', opacity: 0.9 }}>self-evident</span><span style={{ color: 'var(--foreground)' }}>, that all men are created equal.</span>
                    </div>
                    <BodyText className="text-xs mt-2 opacity-50" style={{ color: 'var(--foreground)' }}>
                      highlighted = missed
                    </BodyText>
                  </div>

                  <div>
                    <BodyText className="text-sm font-medium mb-3 opacity-70" style={{ color: 'var(--foreground)' }}>
                      your attempt
                    </BodyText>
                    <div className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
                      <span className="bg-red-200 px-1 rounded" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>These</span>{' '}
                      <span style={{ color: 'var(--foreground)', opacity: 0.6 }}>truths are self-evident, that all men are created equal.</span>
                    </div>
                    <BodyText className="text-xs mt-2 opacity-50" style={{ color: 'var(--foreground)' }}>
                      highlighted = incorrect
                    </BodyText>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>75%</div>
                  <BodyText className="text-base mb-4" style={{ color: 'var(--foreground)' }}>Keep Practicing</BodyText>
                  <BodyText className="text-sm opacity-60" style={{ color: 'var(--foreground)' }}>
                    You need 80% accuracy to master this passage.
                  </BodyText>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <BodyText className="text-xl font-medium tracking-wide" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
                Read → <span style={{ color: 'var(--accent)' }}>Recall</span> → Refine
              </BodyText>
            </div>
          </Container>
        </Section>

        {/* Content Quality */}
        <Section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <Heading level={2} className="text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                Train on texts worth keeping
              </Heading>

              <BodyText className="text-lg mb-12 leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Train your memory on valued texts, not throwaway content.
              </BodyText>
            </div>

            {/* Learning Paths Dashboard Mockup */}
            <div className="max-w-5xl mx-auto mb-8 px-4 sm:px-6">
              <div className="clean-card p-4 sm:p-6" style={{ background: 'var(--background)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

                  <Link href="/path/founders">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Founders
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Founding documents and speeches of American democracy
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/20 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/stoics">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Stoics
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Marcus Aurelius, Seneca, Epictetus
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/25 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/poets">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Poets
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Shakespeare, Dickinson, Frost, Keats
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/8 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/philosophers">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Philosophers
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Socrates, Nietzsche, Kant, Sartre
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/22 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/scientists">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Scientists
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Darwin, Newton, Galileo, Curie
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/8 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/orators">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Orators
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Churchill, Roosevelt, MLK, JFK
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/42 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/warriors">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Warriors
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Sun Tzu, Machiavelli, Caesar, Thucydides
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/25 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/path/novelists">
                    <div className="clean-card p-4 sm:p-6 flex flex-col min-h-64 sm:h-72 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: 'var(--background-soft)' }}>
                      <div className="mb-4">
                        <Heading level={3} className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                          The Novelists
                        </Heading>
                      </div>
                      <BodyText className="text-sm mb-4 opacity-70 flex-grow" style={{ color: 'var(--foreground)' }}>
                        Dickens, Melville, Dostoevsky, Tolstoy
                      </BodyText>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4" style={{ backgroundColor: 'var(--border)' }}>
                        <div className="bg-accent h-2 rounded-full" style={{ backgroundColor: 'var(--accent)', width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="text-xs opacity-50" style={{ color: 'var(--foreground)' }}>
                          Start →
                        </div>
                        <div className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                          0/6 (0%)
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="text-center mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                  <BodyText className="text-sm opacity-60" style={{ color: 'var(--foreground)' }}>
                    9 paths • 236 passages • 15–250 words
                  </BodyText>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Final Summary + CTA */}
        <Section className="py-20">
          <Container className="text-center">
            <div className="max-w-3xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                Remember the texts worth learning
              </Heading>

              <BodyText className="text-xl mb-12 leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                When you can recall words like these, they change how you think.
              </BodyText>

              <div className="flex justify-center">
                <Link href="/dashboard">
                  <button className="button-primary text-xl font-bold" style={{ padding: '1.25rem 2.5rem', borderRadius: '4px' }}>
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12" style={{ borderColor: '#e5e7eb' }}>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <span style={{ color: 'var(--accent)' }}>eduba</span>
              <a
                href="https://behelo.com/lander?utm_campaign=cross-app-promotion&utm_medium=footer&utm_source=eduba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm button-subtle"
                style={{ textDecoration: 'underline', textDecorationColor: 'transparent' }}
              >
                more apps
              </a>
            </div>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              © 2026 Eduba
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
