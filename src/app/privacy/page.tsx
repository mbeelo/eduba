'use client';

import { Container } from '@/components/ui/layout';
import { Heading, BodyText } from '@/components/ui/typography';
import { useTheme } from '@/lib/theme';
import Link from 'next/link';

export default function PrivacyPage() {
  const { theme, toggleTheme } = useTheme();
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
            <button className="button-subtle text-lg" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link href="/dashboard">
              <button className="button-subtle text-xs sm:text-sm">
                Dashboard
              </button>
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <Container className="py-12 max-w-4xl">
          <div className="clean-card">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <Heading level={1} className="text-3xl">Privacy Policy</Heading>
                <span className="label-mono">Last updated: January 5, 2026</span>
              </div>

              <div className="space-y-6">
                <section>
                  <Heading level={2} className="text-xl mb-4">Overview</Heading>
                  <BodyText>
                    Eduba is committed to protecting your privacy. This policy explains how we collect,
                    use, and protect your personal information when you use our memory training platform.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Information We Collect</Heading>
                  <div className="space-y-3">
                    <BodyText>
                      <strong>Account Information:</strong> We collect your email address when you create an account.
                    </BodyText>
                    <BodyText>
                      <strong>Practice Data:</strong> We store your training attempts, accuracy scores, and progress
                      to provide personalized learning experiences.
                    </BodyText>
                    <BodyText>
                      <strong>Usage Information:</strong> We collect basic analytics about how you interact with
                      our platform to improve the service.
                    </BodyText>
                  </div>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">How We Use Your Information</Heading>
                  <div className="space-y-2">
                    <BodyText>• To provide and improve our memory training services</BodyText>
                    <BodyText>• To track your learning progress and achievements</BodyText>
                    <BodyText>• To send important service updates (not marketing)</BodyText>
                    <BodyText>• To ensure platform security and prevent abuse</BodyText>
                  </div>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Data Security</Heading>
                  <BodyText>
                    Your data is stored securely using industry-standard encryption. We use Supabase
                    for data storage, which provides enterprise-grade security and compliance.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Your Rights</Heading>
                  <div className="space-y-2">
                    <BodyText>• Request access to your personal data</BodyText>
                    <BodyText>• Request correction of inaccurate data</BodyText>
                    <BodyText>• Request deletion of your account and data</BodyText>
                    <BodyText>• Export your practice data</BodyText>
                  </div>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Contact</Heading>
                  <BodyText>
                    For privacy-related questions or requests, please contact us at privacy@eduba.com
                  </BodyText>
                </section>
              </div>

              <div className="text-center pt-8">
                <Link href="/dashboard">
                  <button className="button-subtle">
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}