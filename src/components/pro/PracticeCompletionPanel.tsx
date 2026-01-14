'use client';

import { useState } from 'react';
import { BodyText } from '@/components/ui';
import { ProLock } from './ProLock';
import { UpgradeModal } from '../ui/upgrade-modal';

export function PracticeCompletionPanel() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleProClick = () => {
    setShowUpgradeModal(true);
  };

  return (
    <>
      <div className="mt-8 p-6 border rounded" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background-soft)' }}>
        <div className="mb-4">
          <BodyText style={{ color: 'var(--foreground)' }}>
            Passage completed.
          </BodyText>
        </div>

        <div className="space-y-2">
          <ProLock
            title="Practice Today"
            subtitle="Tap to learn about Pro"
            desc="🔒 Pro — Coming Soon"
            onClick={handleProClick}
          />
          <ProLock
            title="Scheduled Review"
            subtitle="Tap to learn about Pro"
            desc="🔒 Pro — Coming Soon"
            onClick={handleProClick}
          />
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}