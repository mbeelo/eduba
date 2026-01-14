'use client';

import { Container } from '@/components/ui/layout';
import { Heading, BodyText } from '@/components/ui/typography';
import { useTheme } from '@/lib/theme';
import Link from 'next/link';

export default function TermsPage() {
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
                <Heading level={1} className="text-3xl">Terms of Service</Heading>
                <span className="label-mono">Last updated: January 5, 2026</span>
              </div>

              <div className="space-y-6">
                <section>
                  <Heading level={2} className="text-xl mb-4">Acceptance</Heading>
                  <BodyText>
                    By accessing and using Eduba, you agree to be bound by these Terms of Service
                    and all applicable laws and regulations.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Service Description</Heading>
                  <BodyText>
                    Eduba is a memory training platform that helps users improve their ability to
                    memorize and recall text passages through systematic practice and feedback.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">User Accounts</Heading>
                  <div className="space-y-2">
                    <BodyText>• You must provide accurate and complete information when creating an account</BodyText>
                    <BodyText>• You are responsible for maintaining the security of your account credentials</BodyText>
                    <BodyText>• You may not share your account with others or create multiple accounts</BodyText>
                    <BodyText>• We reserve the right to suspend accounts that violate these terms</BodyText>
                  </div>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Acceptable Use</Heading>
                  <div className="space-y-2">
                    <BodyText>• Use the service only for legitimate memory training purposes</BodyText>
                    <BodyText>• Do not attempt to reverse engineer or compromise the platform</BodyText>
                    <BodyText>• Do not upload inappropriate or copyrighted content</BodyText>
                    <BodyText>• Respect other users and maintain appropriate conduct</BodyText>
                  </div>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Content and Intellectual Property</Heading>
                  <BodyText>
                    The passages and training materials provided by Eduba are either in the public domain
                    or used under appropriate licenses. Users retain ownership of their practice attempts
                    and personal data.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Service Availability</Heading>
                  <BodyText>
                    We strive to maintain service availability but cannot guarantee uninterrupted access.
                    We reserve the right to modify or discontinue features with reasonable notice.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Limitation of Liability</Heading>
                  <BodyText>
                    Eduba is provided "as is" without warranties. We are not liable for any indirect,
                    incidental, or consequential damages arising from your use of the service.
                  </BodyText>
                </section>

                <section>
                  <Heading level={2} className="text-xl mb-4">Contact</Heading>
                  <BodyText>
                    For questions about these terms, please contact us at legal@eduba.com
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