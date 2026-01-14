'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/layout';
import { SupportModal } from './support-modal';
import { UTMLinks } from '@/lib/utm';

export function Footer() {
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <>
      <footer className="mt-16 py-12" style={{ borderTop: '1px solid var(--border)' }}>
        <Container>
          {/* Main footer content with educational links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Learn Section */}
            <div>
              <h3 className="label-mono text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Learn
              </h3>
              <div className="space-y-2">
                <Link
                  href="/techniques"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Techniques
                </Link>
                <Link
                  href="/study-guide"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Study Guide
                </Link>
                <Link
                  href="/benefits"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Benefits
                </Link>
                <Link
                  href="/authors"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Authors
                </Link>
                <Link
                  href="/about"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div>
              <h3 className="label-mono text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Help
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowSupportModal(true)}
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity text-left"
                >
                  Support
                </button>
                <Link
                  href="/contact"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="label-mono text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Legal
              </h3>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* More Apps Section */}
            <div>
              <h3 className="label-mono text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                More Apps
              </h3>
              <div className="space-y-2">
                <a
                  href={UTMLinks.footerDashboard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block label-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  Discover More Tools
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="label-mono text-xs opacity-60">
              © 2026 Eduba. All rights reserved.
            </span>
          </div>
        </Container>
      </footer>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </>
  );
}