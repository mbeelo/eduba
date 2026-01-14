'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, Button, Heading, BodyText } from '@/components/ui';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleNotifyMe = async () => {
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userId: user?.id || null,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to add to waitlist');
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Heading level={3} className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Thanks! We'll notify you.
            </Heading>
            <BodyText className="mb-6" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
              You're on the list. We'll email you when Pro launches.
            </BodyText>
            <Button variant="primary" onClick={onClose}>
              Keep practicing free
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Heading level={3} className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Eduba Pro is about guidance, not access.
            </Heading>
            <BodyText className="mb-4" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
              Practice will always be free. Pro adds guidance features.
            </BodyText>
          </div>

          <div className="mb-6">
            <BodyText className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>
              Pro will help you:
            </BodyText>
            <div className="space-y-2">
              <BodyText className="text-sm" style={{ color: 'var(--foreground)' }}>
                • Know what to practice next
              </BodyText>
              <BodyText className="text-sm" style={{ color: 'var(--foreground)' }}>
                • Review passages at the right time
              </BodyText>
              <BodyText className="text-sm" style={{ color: 'var(--foreground)' }}>
                • Practice with less thinking
              </BodyText>
            </div>
          </div>

          <div className="text-center mb-6">
            <BodyText className="font-medium" style={{ color: 'var(--foreground)' }}>
              Pro is coming soon.
            </BodyText>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 py-2 border rounded text-sm"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)'
                }}
              />
              <Button
                variant="primary"
                onClick={handleNotifyMe}
                disabled={!email || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Adding...' : 'Notify me'}
              </Button>
            </div>

            <Button variant="ghost" onClick={onClose} className="w-full">
              Keep practicing free
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}