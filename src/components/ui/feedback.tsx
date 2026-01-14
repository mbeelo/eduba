import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Alert Component for notifications and feedback
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', size = 'md', dismissible = false, onDismiss, children, ...props }, ref) => {
    const baseStyles = [
      'rounded-lg border transition-all duration-250',
      'focus-within:ring-2 focus-within:ring-offset-2',
    ];

    const variants = {
      info: [
        'bg-blue-50 border-blue-200 text-blue-800',
        'focus-within:ring-blue-500',
      ],
      success: [
        'bg-correct-50 border-correct-200 text-correct-800',
        'focus-within:ring-correct-500',
      ],
      warning: [
        'bg-amber-50 border-amber-200 text-amber-800',
        'focus-within:ring-amber-500',
      ],
      error: [
        'bg-incorrect-50 border-incorrect-200 text-incorrect-800',
        'focus-within:ring-incorrect-500',
      ],
      neutral: [
        'bg-neutral-50 border-neutral-200 text-neutral-800',
        'focus-within:ring-neutral-500',
      ],
    };

    const sizes = {
      sm: 'p-3 text-ui-sm',
      md: 'p-4 text-ui-base',
      lg: 'p-6 text-ui-lg',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <div className={classes} ref={ref} {...props} role="alert">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {children}
          </div>
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-3 flex-shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label="Close alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Badge Component for status indicators
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center rounded-full font-medium',
      'transition-colors duration-200',
    ];

    const variants = {
      default: 'bg-brand-100 text-brand-800',
      success: 'bg-correct-100 text-correct-800',
      error: 'bg-incorrect-100 text-incorrect-800',
      warning: 'bg-amber-100 text-amber-800',
      info: 'bg-blue-100 text-blue-800',
      outline: 'border border-reading-border text-reading-text bg-transparent',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-ui-sm',
      lg: 'px-3 py-1 text-ui-base',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <span className={classes} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Accuracy Indicator Component for memory training feedback
export interface AccuracyIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  accuracy: number;
  total: number;
  showPercentage?: boolean;
  showFraction?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AccuracyIndicator = forwardRef<HTMLDivElement, AccuracyIndicatorProps>(
  ({
    className,
    accuracy,
    total,
    showPercentage = true,
    showFraction = false,
    size = 'md',
    ...props
  }, ref) => {
    const percentage = total > 0 ? Math.round((accuracy / total) * 100) : 0;

    const getVariant = () => {
      if (percentage >= 90) return 'success';
      if (percentage >= 70) return 'warning';
      return 'error';
    };

    const sizes = {
      sm: 'text-ui-sm',
      md: 'text-ui-base',
      lg: 'text-ui-lg',
    };

    const classes = cn(
      'flex items-center space-x-2',
      sizes[size],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        <Badge variant={getVariant()} size={size}>
          {showPercentage && `${percentage}%`}
          {showFraction && ` (${accuracy}/${total})`}
          {!showPercentage && !showFraction && `${accuracy}/${total}`}
        </Badge>
        {percentage >= 90 && (
          <span className="text-correct-600" role="img" aria-label="Excellent">
            ✓
          </span>
        )}
      </div>
    );
  }
);

AccuracyIndicator.displayName = 'AccuracyIndicator';

// Status Indicator Component
export interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  status: 'idle' | 'active' | 'complete' | 'error' | 'paused';
  label?: string;
  showIcon?: boolean;
}

const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, label, showIcon = true, ...props }, ref) => {
    const statusConfig = {
      idle: {
        color: 'text-neutral-500',
        bg: 'bg-neutral-100',
        icon: '○',
        label: 'Ready',
      },
      active: {
        color: 'text-brand-600',
        bg: 'bg-brand-100',
        icon: '●',
        label: 'Active',
      },
      complete: {
        color: 'text-correct-600',
        bg: 'bg-correct-100',
        icon: '✓',
        label: 'Complete',
      },
      error: {
        color: 'text-incorrect-600',
        bg: 'bg-incorrect-100',
        icon: '✗',
        label: 'Error',
      },
      paused: {
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        icon: '⏸',
        label: 'Paused',
      },
    };

    const config = statusConfig[status];

    const classes = cn(
      'inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-ui-sm font-medium',
      config.bg,
      config.color,
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {showIcon && (
          <span className="text-xs" aria-hidden="true">
            {config.icon}
          </span>
        )}
        <span>{label || config.label}</span>
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

// Toast Component for temporary feedback
export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', children, onClose, ...props }, ref) => {
    const variants = {
      success: [
        'bg-correct-600 text-white',
        'shadow-lg shadow-correct-600/25',
      ],
      error: [
        'bg-incorrect-600 text-white',
        'shadow-lg shadow-incorrect-600/25',
      ],
      warning: [
        'bg-amber-600 text-white',
        'shadow-lg shadow-amber-600/25',
      ],
      info: [
        'bg-brand-600 text-white',
        'shadow-lg shadow-brand-600/25',
      ],
    };

    const classes = cn(
      'fixed bottom-4 right-4 z-50 max-w-sm rounded-lg p-4',
      'transform transition-all duration-300 ease-in-out',
      'animate-in slide-in-from-bottom-2',
      variants[variant],
      className
    );

    return (
      <div className={classes} ref={ref} {...props} role="alert">
        <div className="flex items-start justify-between">
          <div className="flex-1 text-ui-sm font-medium">
            {children}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-3 flex-shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
              aria-label="Close notification"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export {
  Alert,
  Badge,
  AccuracyIndicator,
  StatusIndicator,
  Toast,
};