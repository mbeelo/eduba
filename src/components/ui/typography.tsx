import { forwardRef, HTMLAttributes, createElement } from 'react';
import { cn } from '@/lib/utils';

// Base Heading Component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'section' | 'card' | 'subtle';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, variant = 'default', weight = 'semibold', children, ...props }, ref) => {
    const baseStyles = 'font-sans tracking-tight';

    const variants = {
      default: 'text-reading-text-highlight',
      section: 'text-brand-700 border-b-2 border-brand-200 pb-2',
      card: 'text-reading-text-highlight',
      subtle: 'text-reading-text-muted',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const sizes = {
      1: 'text-heading-xl',
      2: 'text-heading-lg',
      3: 'text-heading-base',
      4: 'text-heading-sm',
      5: 'text-ui-lg font-semibold',
      6: 'text-ui-base font-semibold',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      weights[weight],
      sizes[level],
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

Heading.displayName = 'Heading';

// Reading Text Component - Optimized for passages and content memorization
export interface ReadingTextProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'passage' | 'content' | 'annotation';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
}

const ReadingText = forwardRef<HTMLDivElement, ReadingTextProps>(
  ({ className, size = 'base', variant = 'passage', lineHeight = 'normal', children, ...props }, ref) => {
    const baseStyles = [
      'font-serif text-reading-text',
      'selection:bg-brand-100 selection:text-brand-900',
    ];

    const sizes = {
      sm: 'text-reading-sm',
      base: 'text-reading-base',
      lg: 'text-reading-lg',
      xl: 'text-reading-xl',
    };

    const variants = {
      passage: [
        'max-w-reading mx-auto',
        // Optimal typography for memorization
        'leading-relaxed',
        'hyphens-auto',
        'word-spacing-wide',
      ],
      content: [
        'max-w-content',
        'leading-normal',
      ],
      annotation: [
        'text-reading-text-muted text-reading-sm',
        'leading-normal',
        'italic',
      ],
    };

    const lineHeights = {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    };

    const classes = cn(
      baseStyles,
      sizes[size],
      variants[variant],
      lineHeights[lineHeight],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

ReadingText.displayName = 'ReadingText';

// Body Text Component - For UI text and descriptions
export interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  variant?: 'default' | 'muted' | 'subtle' | 'strong';
  weight?: 'normal' | 'medium' | 'semibold';
}

const BodyText = forwardRef<HTMLParagraphElement, BodyTextProps>(
  ({ className, size = 'base', variant = 'default', weight = 'normal', children, ...props }, ref) => {
    const baseStyles = 'font-sans';

    const sizes = {
      xs: 'text-ui-xs',
      sm: 'text-ui-sm',
      base: 'text-ui-base',
      lg: 'text-ui-lg',
    };

    const variants = {
      default: 'text-reading-text',
      muted: 'text-reading-text-muted',
      subtle: 'text-neutral-600',
      strong: 'text-reading-text-highlight',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    };

    const classes = cn(
      baseStyles,
      sizes[size],
      variants[variant],
      weights[weight],
      className
    );

    return (
      <p className={classes} ref={ref} {...props}>
        {children}
      </p>
    );
  }
);

BodyText.displayName = 'BodyText';

// Feedback Text Component - For accuracy feedback during memorization
export interface FeedbackTextProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'correct' | 'incorrect' | 'neutral' | 'pending';
  weight?: 'normal' | 'medium' | 'semibold';
}

const FeedbackText = forwardRef<HTMLSpanElement, FeedbackTextProps>(
  ({ className, status, weight = 'normal', children, ...props }, ref) => {
    const baseStyles = [
      'font-serif transition-colors duration-200',
      'relative',
    ];

    const statuses = {
      correct: [
        'text-correct-700 bg-correct-50',
        'border-b-2 border-correct-300',
        'shadow-sm',
      ],
      incorrect: [
        'text-incorrect-700 bg-incorrect-50',
        'border-b-2 border-incorrect-300',
        'shadow-sm',
      ],
      neutral: 'text-reading-text',
      pending: 'text-reading-text-muted bg-neutral-50',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    };

    const classes = cn(
      baseStyles,
      statuses[status],
      weights[weight],
      className
    );

    return (
      <span className={classes} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

FeedbackText.displayName = 'FeedbackText';

// Link Component - For navigation and actions
export interface LinkTextProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'default' | 'muted' | 'strong';
  external?: boolean;
}

const LinkText = forwardRef<HTMLAnchorElement, LinkTextProps>(
  ({ className, variant = 'default', external = false, children, ...props }, ref) => {
    const baseStyles = [
      'font-sans underline-offset-4 transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
      'rounded-sm',
    ];

    const variants = {
      default: [
        'text-brand-700 underline',
        'hover:text-brand-800 hover:underline',
      ],
      muted: [
        'text-reading-text-muted underline',
        'hover:text-reading-text hover:underline',
      ],
      strong: [
        'text-brand-800 font-medium underline',
        'hover:text-brand-900 hover:underline',
      ],
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      className
    );

    return (
      <a
        className={classes}
        ref={ref}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {external && (
          <span className="ml-1 inline-block">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </a>
    );
  }
);

LinkText.displayName = 'LinkText';

export {
  Heading,
  ReadingText,
  BodyText,
  FeedbackText,
  LinkText,
};