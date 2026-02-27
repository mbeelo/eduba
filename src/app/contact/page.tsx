'use client';

import { Container } from '@/components/ui/layout';
import { Heading, BodyText } from '@/components/ui/typography';
import { useTheme } from '@/lib/theme';
import Link from 'next/link';

export default function ContactPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }}>
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-lg" style={{ color: 'var(--accent)' }}>
              eduba
            </span>
          </Link>

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
            {/* Hero Section */}
            <div className="text-center py-12">
              <Heading level={1} className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                Contact Us
              </Heading>
              <BodyText className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                We'd love to hear from you. Choose the option that best describes your needs.
              </BodyText>
            </div>

            {/* Contact Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

              {/* General Support */}
              <div className="clean-card p-6 text-center space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">💬</div>
                <Heading level={3} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>General Support</Heading>
                <BodyText className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Need help with Eduba? Have questions about how to use the app? We're here to help.
                </BodyText>
                <a
                  href="mailto:michael@behelo.com?subject=Eduba%20Support%20Request&body=Hi%20there,%0D%0A%0D%0AI%20need%20help%20with%20Eduba.%0D%0A%0D%0APlease%20describe%20your%20issue%20or%20question:%0D%0A%0D%0A%0D%0ABrowser:%20%0D%0ADevice:%20%0D%0A%0D%0AThanks!"
                  className="button-primary inline-block px-6 py-3 text-sm font-medium"
                >
                  Get Support
                </a>
                <div className="label-mono text-xs opacity-60" style={{ color: 'var(--foreground)' }}>michael@behelo.com</div>
              </div>

              {/* Bug Reports */}
              <div className="clean-card p-6 text-center space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">🐛</div>
                <Heading level={3} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Report a Bug</Heading>
                <BodyText className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Found something that's not working correctly? Let us know so we can fix it quickly.
                </BodyText>
                <a
                  href="mailto:bugs@behelo.com?subject=Eduba%20Bug%20Report&body=Hi,%0D%0A%0D%0AI%20found%20a%20bug%20in%20Eduba.%0D%0A%0D%0AWhat%20happened:%0D%0A%0D%0A%0D%0ASteps%20to%20reproduce:%0D%0A1.%20%0D%0A2.%20%0D%0A3.%20%0D%0A%0D%0AExpected%20behavior:%0D%0A%0D%0A%0D%0ABrowser:%20%0D%0ADevice:%20%0D%0AError%20messages%20(if%20any):%20%0D%0A%0D%0AThanks%20for%20helping%20us%20fix%20this!"
                  className="button-primary inline-block px-6 py-3 text-sm font-medium"
                >
                  Report Bug
                </a>
                <div className="label-mono text-xs opacity-60" style={{ color: 'var(--foreground)' }}>bugs@behelo.com</div>
              </div>

              {/* Feature Requests */}
              <div className="clean-card p-6 text-center space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">💡</div>
                <Heading level={3} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Suggest a Feature</Heading>
                <BodyText className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Have an idea that could make Eduba better? We want to hear your suggestions.
                </BodyText>
                <a
                  href="mailto:features@behelo.com?subject=Eduba%20Feature%20Request&body=Hi,%0D%0A%0D%0AI%20have%20an%20idea%20for%20Eduba!%0D%0A%0D%0AFeature%20idea:%0D%0A%0D%0A%0D%0AWhy%20this%20would%20be%20helpful:%0D%0A%0D%0A%0D%0AHow%20I%20imagine%20it%20working:%0D%0A%0D%0A%0D%0AAny%20additional%20details:%0D%0A%0D%0A%0D%0AThanks%20for%20considering%20this!"
                  className="button-primary inline-block px-6 py-3 text-sm font-medium"
                >
                  Submit Idea
                </a>
                <div className="label-mono text-xs opacity-60" style={{ color: 'var(--foreground)' }}>features@behelo.com</div>
              </div>

              {/* Privacy Concerns */}
              <div className="clean-card p-6 text-center space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">🔒</div>
                <Heading level={3} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Privacy Concerns</Heading>
                <BodyText className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Questions about our privacy practices or data handling? Contact our privacy team.
                </BodyText>
                <a
                  href="mailto:privacy@behelo.com?subject=Eduba%20Privacy%20Inquiry&body=Hi,%0D%0A%0D%0AI%20have%20a%20question%20about%20privacy%20and%20data%20handling%20in%20Eduba.%0D%0A%0D%0AMy%20question%20or%20concern:%0D%0A%0D%0A%0D%0AAdditional%20details:%0D%0A%0D%0A%0D%0AThanks%20for%20your%20time!"
                  className="button-primary inline-block px-6 py-3 text-sm font-medium"
                >
                  Privacy Inquiry
                </a>
                <div className="label-mono text-xs opacity-60" style={{ color: 'var(--foreground)' }}>privacy@behelo.com</div>
              </div>

              {/* Business & Ads */}
              <div className="clean-card p-6 text-center space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">💼</div>
                <Heading level={3} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Business & Advertising</Heading>
                <BodyText className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Partnership opportunities, advertising inquiries, or business-related questions.
                </BodyText>
                <a
                  href="mailto:ads@behelo.com?subject=Eduba%20Business%20Inquiry&body=Hello,%0D%0A%0D%0AI'm%20interested%20in%20discussing%20a%20business%20opportunity%20with%20Eduba.%0D%0A%0D%0AType%20of%20inquiry:%0D%0A☐%20Partnership%0D%0A☐%20Advertising%0D%0A☐%20Sponsorship%0D%0A☐%20Other%0D%0A%0D%0ADetails:%0D%0A%0D%0A%0D%0ACompany/Organization:%20%0D%0AContact%20information:%20%0D%0A%0D%0ALooking%20forward%20to%20hearing%20from%20you!"
                  className="button-primary inline-block px-6 py-3 text-sm font-medium"
                >
                  Business Inquiry
                </a>
                <div className="label-mono text-xs opacity-60" style={{ color: 'var(--foreground)' }}>ads@behelo.com</div>
              </div>

              {/* More Apps */}
              <div className="clean-card p-6 text-center space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">🚀</div>
                <Heading level={3} className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>More Apps</Heading>
                <BodyText className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Discover other productivity tools and apps from Behelo.
                </BodyText>
                <a
                  href="https://behelo.com?utm_source=eduba&utm_medium=contact&utm_campaign=cross-app-promotion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary inline-block px-6 py-3 text-sm font-medium"
                >
                  Explore Apps
                </a>
                <div className="label-mono text-xs opacity-60" style={{ color: 'var(--foreground)' }}>behelo.com</div>
              </div>
            </div>

            {/* Response Times Section */}
            <div className="border-t pt-8 mb-8" style={{ borderColor: 'var(--border)' }}>
              <Heading level={2} className="text-2xl font-semibold text-center mb-6" style={{ color: 'var(--foreground)' }}>Response Times</Heading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Bug Reports</div>
                  <div style={{ color: 'var(--foreground)', opacity: 0.7 }}>Within 24 hours</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Feature Requests</div>
                  <div style={{ color: 'var(--foreground)', opacity: 0.7 }}>Within 1 week</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>General Support</div>
                  <div style={{ color: 'var(--foreground)', opacity: 0.7 }}>Within 48 hours</div>
                </div>
              </div>

              <div className="clean-card p-4">
                <BodyText className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  <strong style={{ color: 'var(--foreground)' }}>Tip:</strong> When reporting issues, please include your browser type, device,
                  and any error messages you see. This helps us resolve problems much faster.
                </BodyText>
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t pt-6 text-center" style={{ borderColor: 'var(--border)' }}>
              <Link href="/dashboard" className="button-subtle">
                ← Back to Dashboard
              </Link>
            </div>

            <p className="label-mono text-xs text-center mt-8 pt-4 border-t" style={{ color: 'var(--foreground)', opacity: 0.5, borderColor: 'var(--border)' }}>
              Last updated: January 2026
            </p>
          </div>
        </Container>
      </main>
    </div>
  );
}