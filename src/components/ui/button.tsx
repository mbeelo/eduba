import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = [
      // Base styles for all buttons
      'inline-flex items-center justify-center rounded-md',
      'font-medium transition-all duration-250 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-60',
      'select-none relative overflow-hidden',
    ];

    const variants = {
      primary: [
        'button-primary shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
      ],
      secondary: [
        'button-secondary shadow-sm border-2',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
      ],
      outline: [
        'button-outline border-2',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
      ],
      ghost: [
        'button-ghost',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
      ],
      destructive: [
        'button-destructive shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
      ],
    };

    const sizes = {
      sm: 'h-8 px-3 text-ui-sm',
      md: 'h-10 px-4 text-ui-base',
      lg: 'h-12 px-6 text-ui-lg',
      xl: 'h-14 px-8 text-ui-lg',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      loading && 'cursor-wait',
      className
    );


    return (
      <button
        className={classes}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };