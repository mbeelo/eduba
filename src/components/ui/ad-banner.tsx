'use client';

import { useState, useEffect } from 'react';

interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className = '' }: AdBannerProps) {
  const [adsEnabled, setAdsEnabled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const enabled = localStorage.getItem('eduba_ads_enabled') === 'true';
      const dismissed = sessionStorage.getItem('ad_dismissed') === 'true';
      setAdsEnabled(enabled);
      setIsDismissed(dismissed);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('ad_dismissed', 'true');
  };

  if (!adsEnabled || isDismissed) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="clean-card p-4" style={{ background: 'var(--background-soft)' }}>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            {/* Placeholder for actual ad content */}
            <div className="space-y-2">
              <div className="text-xs opacity-60 uppercase tracking-wide">Advertisement</div>
              <div className="h-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Ad Space - Your tasteful ad here
                </span>
              </div>
            </div>
          </div>

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
    </div>
  );
}