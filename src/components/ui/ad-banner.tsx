'use client';

import { useState, useEffect } from 'react';

interface AdBannerProps {
  className?: string;
  adSlot?: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  adStyle?: { [key: string]: string };
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBanner({
  className = '',
  adSlot,
  adFormat = 'auto',
  adStyle = {}
}: AdBannerProps) {
  const [adsEnabled, setAdsEnabled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [adError, setAdError] = useState(false);

  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const enabled = localStorage.getItem('eduba_ads_enabled') === 'true';
      const dismissed = sessionStorage.getItem('ad_dismissed') === 'true';
      setAdsEnabled(enabled);
      setIsDismissed(dismissed);

      // Initialize AdSense if enabled
      if (enabled && adsenseClientId && adSlot && !dismissed) {
        try {
          if (window.adsbygoogle) {
            window.adsbygoogle.push({});
          }
        } catch (error) {
          console.warn('AdSense initialization failed:', error);
          setAdError(true);
        }
      }
    }
  }, [adsenseClientId, adSlot, adsEnabled, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('ad_dismissed', 'true');
  };

  const handleEnableAds = () => {
    setAdsEnabled(true);
    localStorage.setItem('eduba_ads_enabled', 'true');
  };

  // Don't show if ads are disabled, dismissed, or missing configuration
  if (isDismissed || (!adsEnabled && !showOptIn())) return null;

  // Show opt-in prompt if ads aren't enabled yet
  if (!adsEnabled) {
    return (
      <div className={`relative ${className}`}>
        <div className="clean-card p-4 border-l-4 border-blue-500" style={{ background: 'var(--background-soft)' }}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Support Eduba
              </div>
              <div className="text-xs opacity-70 mt-1" style={{ color: 'var(--foreground)' }}>
                Enable respectful ads to help keep Eduba free for everyone.
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={handleEnableAds}
                className="button-primary text-xs px-3 py-1"
              >
                Enable Ads
              </button>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 p-1"
                title="No thanks"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show actual AdSense ad if configuration is available
  if (adsenseClientId && adSlot && !adError) {
    return (
      <div className={`relative ${className}`}>
        <div className="clean-card p-4" style={{ background: 'var(--background-soft)' }}>
          <div className="text-xs opacity-60 uppercase tracking-wide text-center mb-2">Advertisement</div>
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              textAlign: 'center',
              ...adStyle
            }}
            data-ad-client={adsenseClientId}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive="true"
          />

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
            title="Hide ad for this session"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Fallback placeholder if AdSense isn't configured
  return (
    <div className={`relative ${className}`}>
      <div className="clean-card p-4" style={{ background: 'var(--background-soft)' }}>
        <div className="text-center">
          <div className="text-xs opacity-60 uppercase tracking-wide mb-2">Advertisement</div>
          <div className="h-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {adError ? 'Ad failed to load' : 'Ad space available'}
            </span>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
          title="Hide ad for this session"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Helper function to determine if we should show the opt-in
function showOptIn(): boolean {
  if (typeof window === 'undefined') return false;

  // Show opt-in if user has never made a choice and has some engagement
  const hasChoice = localStorage.getItem('eduba_ads_enabled') !== null;
  const dismissed = sessionStorage.getItem('ad_dismissed') === 'true';

  return !hasChoice && !dismissed;
}