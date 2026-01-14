'use client';

import { useState } from 'react';
import { Modal } from './modal';
import { Heading, BodyText } from './typography';
import { Button } from './button';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [adsEnabled, setAdsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('eduba_ads_enabled') === 'true';
    }
    return false;
  });

  const handleToggleAds = () => {
    const newState = !adsEnabled;
    setAdsEnabled(newState);
    localStorage.setItem('eduba_ads_enabled', String(newState));

    if (newState) {
      // Clear any previous ad dismissal when re-enabling ads
      sessionStorage.removeItem('ad_dismissed');
      // Reload page to show ads
      window.location.reload();
    }
  };

  const handleDonate = () => {
    window.open('https://buymeacoffee.com/eduba', '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <Heading level={2} className="text-xl">
            Support Eduba
          </Heading>
          <BodyText variant="muted">
            Thank you so much for thinking about supporting this project. It would not be possible
            without you and your continued support. <span style={{ color: 'var(--accent)' }}>💛</span>
          </BodyText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Enable Ads */}
          <div className="clean-card p-6 text-center space-y-4 hover:shadow-md transition-shadow">
            <Button
              onClick={handleToggleAds}
              variant="primary"
              className="w-full mb-2"
            >
              {adsEnabled ? 'Disable Ads' : 'Enable Ads'}
            </Button>

            <BodyText variant="muted" className="text-sm">
              Support Eduba with tasteful, non-intrusive banner ads that don't interfere with your practice.
            </BodyText>
          </div>

          {/* Donate */}
          <div className="clean-card p-6 text-center space-y-4 hover:shadow-md transition-shadow">
            <Button
              onClick={handleDonate}
              variant="primary"
              className="w-full mb-2"
            >
              Donate
            </Button>

            <BodyText variant="muted" className="text-sm">
              Buy us a coffee to help keep Eduba running and support continued development.
            </BodyText>
          </div>
        </div>

        <div className="text-center pt-4">
          <BodyText variant="muted" className="text-xs">
            Every bit of support helps us improve memory training for everyone.
          </BodyText>
        </div>
      </div>
    </Modal>
  );
}