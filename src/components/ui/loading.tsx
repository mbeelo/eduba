import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Spinner Component
export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'brand' | 'neutral' | 'white';
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'brand', ...props }, ref) => {
    const sizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    };

    const colors = {
      brand: 'border-brand-200 border-t-brand-600',
      neutral: 'border-neutral-200 border-t-neutral-600',
      white: 'border-white/30 border-t-white',
    };

    const classes = cn(
      'animate-spin rounded-full border-2',
      sizes[size],
      colors[color],
      className
    );

    return (
      <div className={classes} ref={ref} {...props} />
    );
  }
);

Spinner.displayName = 'Spinner';

// Loading Text Component
export interface LoadingTextProps extends HTMLAttributes<HTMLDivElement> {
  dots?: boolean;
  size?: 'sm' | 'base' | 'lg';
}

const LoadingText = forwardRef<HTMLDivElement, LoadingTextProps>(
  ({ className, dots = true, size = 'base', children, ...props }, ref) => {
    const sizes = {
      sm: 'text-ui-sm',
      base: 'text-ui-base',
      lg: 'text-ui-lg',
    };

    const classes = cn(
      'font-sans text-reading-text-muted',
      sizes[size],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
        {dots && (
          <span className="inline-block ml-1">
            <span className="animate-pulse delay-0">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
          </span>
        )}
      </div>
    );
  }
);

LoadingText.displayName = 'LoadingText';

// Loading Card Component
export interface LoadingCardProps extends HTMLAttributes<HTMLDivElement> {
  rows?: number;
  showHeader?: boolean;
  variant?: 'default' | 'reading';
}

const LoadingCard = forwardRef<HTMLDivElement, LoadingCardProps>(
  ({ className, rows = 3, showHeader = true, variant = 'default', ...props }, ref) => {
    const baseClasses = 'animate-pulse';

    const variants = {
      default: 'bg-white border border-reading-border rounded-lg shadow-card p-6',
      reading: 'bg-reading-background-soft border border-reading-border rounded-lg shadow-reading p-8',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {showHeader && (
          <div className="mb-4">
            <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-neutral-100 rounded w-1/2" />
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-4 bg-neutral-200 rounded',
                index === rows - 1 ? 'w-2/3' : 'w-full'
              )}
            />
          ))}
        </div>
      </div>
    );
  }
);

LoadingCard.displayName = 'LoadingCard';

// Progress Bar Component
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    className,
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    label,
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const variants = {
      default: {
        bg: 'bg-neutral-200',
        fill: 'bg-brand-500',
      },
      success: {
        bg: 'bg-correct-100',
        fill: 'bg-correct-500',
      },
      warning: {
        bg: 'bg-amber-100',
        fill: 'bg-amber-500',
      },
      error: {
        bg: 'bg-incorrect-100',
        fill: 'bg-incorrect-500',
      },
    };

    return (
      <div className="w-full" ref={ref} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-ui-sm font-medium text-reading-text">
              {label || 'Progress'}
            </span>
            <span className="text-ui-sm text-reading-text-muted">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div className={cn(
          'w-full rounded-full overflow-hidden',
          variants[variant].bg,
          sizes[size],
          className
        )}>
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out rounded-full',
              variants[variant].fill
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

// Pulse Component for loading states
export interface PulseProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg';
}

const Pulse = forwardRef<HTMLDivElement, PulseProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseClasses = 'animate-pulse bg-neutral-200';

    const variants = {
      default: 'rounded',
      text: 'h-4 rounded',
      circle: 'rounded-full',
      square: 'rounded-none',
    };

    const sizes = {
      sm: variant === 'text' ? 'h-3' : variant === 'circle' ? 'h-8 w-8' : 'h-4',
      md: variant === 'text' ? 'h-4' : variant === 'circle' ? 'h-12 w-12' : 'h-6',
      lg: variant === 'text' ? 'h-5' : variant === 'circle' ? 'h-16 w-16' : 'h-8',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    return <div className={classes} ref={ref} {...props} />;
  }
);

Pulse.displayName = 'Pulse';

export {
  Spinner,
  LoadingText,
  LoadingCard,
  ProgressBar,
  Pulse,
};