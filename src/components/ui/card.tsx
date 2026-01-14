import { forwardRef, HTMLAttributes, createElement } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'reading' | 'progress' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = [
      'rounded-lg border transition-all duration-250',
      'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500',
    ];

    const variants = {
      default: [
        'bg-white border-reading-border shadow-card',
        'hover:shadow-md',
      ],
      reading: [
        'bg-reading-background-soft border-reading-border shadow-reading',
        'hover:border-reading-border-focus',
        // Special styling for reading content
        'prose-optimized',
      ],
      progress: [
        'bg-gradient-to-r from-neutral-50 to-white',
        'border-neutral-200 shadow-sm',
        'hover:from-neutral-25 hover:shadow-md',
      ],
      elevated: [
        'bg-white border-reading-border shadow-lg',
        'hover:shadow-xl',
      ],
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      paddings[padding],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, actions, ...props }, ref) => {
    const classes = cn(
      'flex flex-col space-y-1.5 p-6 pb-4',
      actions && 'sm:flex-row sm:items-start sm:justify-between sm:space-y-0',
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        <div className="flex-1">
          {children}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Title Component
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, level = 3, children, ...props }, ref) => {
    const classes = cn(
      'text-heading-base leading-none tracking-tight text-reading-text-highlight',
      'font-sans font-semibold',
      className
    );

    return createElement(
      `h${level}`,
      {
        className: classes,
        ref: ref as React.LegacyRef<HTMLElement>,
        ...props
      },
      children
    );
  }
);

CardTitle.displayName = 'CardTitle';

// Card Description Component
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      'text-ui-sm text-reading-text-muted font-sans',
      className
    );

    return <p className={classes} ref={ref} {...props} />;
  }
);

CardDescription.displayName = 'CardDescription';

// Card Content Component
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const classes = cn('p-6 pt-0', className);

    return <div className={classes} ref={ref} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      'flex items-center p-6 pt-0',
      className
    );

    return <div className={classes} ref={ref} {...props} />;
  }
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};