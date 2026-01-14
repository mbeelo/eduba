'use client';

import { BodyText, Heading } from '@/components/ui';

interface ProLockProps {
  title: string;
  subtitle?: string;
  desc: string;
  onClick?: () => void;
}

export function ProLock({ title, subtitle, desc, onClick }: ProLockProps) {
  return (
    <div
      className="p-4 border rounded cursor-pointer hover:border-opacity-70 transition-colors"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background-soft)' }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <Heading level={4} className="text-base font-medium mb-1" style={{ color: 'var(--foreground)' }}>
            {title}
          </Heading>
          {subtitle && (
            <BodyText className="text-sm opacity-60" style={{ color: 'var(--foreground)' }}>
              {subtitle}
            </BodyText>
          )}
        </div>
        <div className="text-sm opacity-60" style={{ color: 'var(--foreground)' }}>
          {desc}
        </div>
      </div>
    </div>
  );
}