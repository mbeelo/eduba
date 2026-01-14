import React from 'react';
import { cn } from '@/lib/utils';

export interface PathProgressBarProps {
  value: number; // 0-100
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand' | 'emerald' | 'blue' | 'purple' | 'gray';
  showPercentage?: boolean;
}

export function PathProgressBar({
  value,
  className,
  size = 'md',
  color = 'brand',
  showPercentage = false
}: PathProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colorClasses = {
    brand: 'bg-brand-500',
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500'
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-neutral-200 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            colorClasses[color]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showPercentage && (
        <div className="mt-1 text-xs text-reading-text-muted text-right">
          {Math.round(clampedValue)}%
        </div>
      )}
    </div>
  );
}

export interface ProgressBadgeProps {
  completed: number;
  total: number;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

export function ProgressBadge({
  completed,
  total,
  className,
  variant = 'default'
}: ProgressBadgeProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const variantClasses = {
    default: 'bg-brand-100 text-brand-800 border-brand-200',
    outline: 'bg-transparent text-reading-text border-neutral-300',
    secondary: 'bg-neutral-100 text-reading-text border-neutral-200'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      variantClasses[variant],
      className
    )}>
      {completed}/{total} ({percentage}%)
    </span>
  );
}

export interface StatusIconProps {
  status: 'locked' | 'available' | 'completed';
  className?: string;
}

export function StatusIcon({ status, className }: StatusIconProps) {
  const icons = {
    locked: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9-6V9a4 4 0 00-8 0v2m8 0H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2z" />
      </svg>
    ),
    available: (
      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--background)' }} />
    ),
    completed: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    )
  };

  const colorClasses = {
    locked: 'text-reading-text-muted',
    available: 'text-accent',
    completed: 'text-accent'
  };

  return (
    <span className={cn(
      'inline-flex items-center justify-center',
      colorClasses[status],
      className
    )}>
      {icons[status]}
    </span>
  );
}

export interface PathCardProps {
  name: string;
  description: string;
  completed: number;
  total: number;
  color?: 'emerald' | 'blue' | 'purple' | 'gray';
  onClick?: () => void;
  className?: string;
}

export function PathCard({
  name,
  description,
  completed,
  total,
  color = 'gray',
  onClick,
  className
}: PathCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isStarted = completed > 0;
  const isCompleted = completed === total && total > 0;

  const colorClasses = {
    emerald: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      progress: 'emerald' as const
    },
    blue: {
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      progress: 'blue' as const
    },
    purple: {
      border: 'border-purple-200',
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      progress: 'purple' as const
    },
    gray: {
      border: 'border-neutral-200',
      bg: 'bg-neutral-50',
      text: 'text-reading-text',
      progress: 'gray' as const
    }
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-6 border rounded-lg transition-all duration-200',
        'hover:shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
        isStarted ? colors.bg : 'bg-white',
        isStarted ? colors.border : 'border-neutral-200',
        className
      )}
    >
      <div className="space-y-4">
        <div>
          <h3 className={cn(
            'text-lg font-semibold',
            isStarted ? colors.text : 'text-reading-text'
          )}>
            {name}
          </h3>
          <p className="text-sm text-reading-text-muted mt-1">
            {description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-reading-text-muted">Progress</span>
            <ProgressBadge
              completed={completed}
              total={total}
              variant={isStarted ? 'default' : 'outline'}
            />
          </div>

          <PathProgressBar
            value={percentage}
            color={colors.progress}
            size="md"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-reading-text-muted">
            {isCompleted ? 'Completed' : isStarted ? 'In progress' : 'Not started'}
          </span>
          <span className="text-brand-600 text-sm font-medium">
            {isCompleted ? 'Review →' : 'Continue →'}
          </span>
        </div>
      </div>
    </button>
  );
}

export interface PassageNodeProps {
  title: string;
  wordCount?: number;
  status: 'locked' | 'available' | 'completed';
  accuracy?: number | null;
  attempts?: number;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function PassageNode({
  title,
  wordCount,
  status,
  accuracy,
  attempts = 0,
  onClick,
  disabled = false,
  className
}: PassageNodeProps) {
  const isClickable = status !== 'locked' && !disabled && onClick;

  const statusClasses = {
    locked: 'border-2 text-reading-text-muted',
    available: 'border-2 text-reading-text clean-card hover:shadow-hover',
    completed: 'border-2 text-reading-text clean-card'
  };

  return (
    <div
      className={cn(
        'relative p-4 rounded-lg transition-all duration-200',
        statusClasses[status],
        isClickable && 'cursor-pointer hover:scale-[1.02] hover:shadow-md',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        backgroundColor: status === 'completed' ? 'var(--accent)' : 'var(--background)',
        color: status === 'completed' ? 'var(--background)' : 'var(--foreground)',
        borderColor: status === 'completed' ? 'var(--accent)' : 'var(--foreground)'
      }}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusIcon status={status} />
            <h3 className="font-medium text-sm leading-tight truncate">
              {title}
            </h3>
          </div>

          {wordCount && (
            <p className="text-xs mb-1" style={{ color: status === 'completed' ? 'var(--background)' : 'var(--foreground)', opacity: 0.7 }}>
              ~{wordCount} words
            </p>
          )}

          {status === 'completed' && accuracy !== null && accuracy !== undefined && (
            <div className="text-xs space-y-1">
              <p style={{ color: status === 'completed' ? 'var(--background)' : 'var(--accent)' }}>
                Best: {Math.round(accuracy)}%
              </p>
              {attempts > 0 && (
                <p style={{ color: status === 'completed' ? 'var(--background)' : 'var(--foreground)', opacity: 0.7 }}>
                  {attempts} attempt{attempts !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          {status === 'available' && (
            <p className="text-xs text-accent font-medium mt-2">
              Start Practice →
            </p>
          )}

          {status === 'locked' && (
            <p className="text-xs text-reading-text-muted mt-2">
              Complete previous passage to unlock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}