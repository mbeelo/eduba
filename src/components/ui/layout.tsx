import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Container Component - Responsive containers with max-width constraints
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'reading' | 'full';
  padding?: boolean;
  center?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', padding = true, center = true, children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      reading: 'max-w-reading', // Optimal line length for reading
      full: 'max-w-full',
    };

    const classes = cn(
      'w-full',
      sizes[size],
      center && 'mx-auto',
      padding && 'px-4 sm:px-6 lg:px-8',
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// Grid Component - Responsive grid system
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = 'md', responsive = true, children, ...props }, ref) => {
    const baseClasses = 'grid';

    const colClasses = responsive ? {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-12',
    } : {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    };

    const gapClasses = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    const classes = cn(
      baseClasses,
      colClasses[cols],
      gapClasses[gap],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// Stack Component - Vertical spacing utility
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  distribute?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = 'md', align = 'stretch', distribute = 'start', children, ...props }, ref) => {
    const spacingClasses = {
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
      '2xl': 'space-y-12',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };

    const distributeClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const classes = cn(
      'flex flex-col',
      spacingClasses[spacing],
      alignClasses[align],
      distributeClasses[distribute],
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// Inline Component - Horizontal spacing utility
export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'baseline';
  wrap?: boolean;
  distribute?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({
    className,
    spacing = 'md',
    align = 'center',
    wrap = false,
    distribute = 'start',
    children,
    ...props
  }, ref) => {
    const spacingClasses = {
      xs: 'space-x-1',
      sm: 'space-x-2',
      md: 'space-x-4',
      lg: 'space-x-6',
      xl: 'space-x-8',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
    };

    const distributeClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const classes = cn(
      'flex',
      spacingClasses[spacing],
      alignClasses[align],
      distributeClasses[distribute],
      wrap && 'flex-wrap',
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Inline.displayName = 'Inline';

// Section Component - Main content sections with proper spacing
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'subtle' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', padding = 'lg', fullWidth = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-transparent',
      subtle: 'bg-neutral-50/50',
      elevated: 'bg-white shadow-sm border border-reading-border rounded-lg',
    };

    const paddings = {
      none: '',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-12',
      xl: 'py-16',
    };

    const classes = cn(
      variants[variant],
      paddings[padding],
      !fullWidth && 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
      className
    );

    return (
      <section className={classes} ref={ref} {...props}>
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

// Separator Component - Visual dividers
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'dashed' | 'dotted';
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', size = 'sm', variant = 'solid', ...props }, ref) => {
    const baseClasses = 'bg-reading-border';

    const orientationClasses = {
      horizontal: 'w-full',
      vertical: 'h-full',
    };

    const sizeClasses = orientation === 'horizontal' ? {
      xs: 'h-px',
      sm: 'h-0.5',
      md: 'h-1',
      lg: 'h-1.5',
    } : {
      xs: 'w-px',
      sm: 'w-0.5',
      md: 'w-1',
      lg: 'w-1.5',
    };

    const variantClasses = {
      solid: 'border-none',
      dashed: 'border-dashed border-t border-reading-border bg-transparent',
      dotted: 'border-dotted border-t border-reading-border bg-transparent',
    };

    const classes = cn(
      variant === 'solid' ? baseClasses : '',
      orientationClasses[orientation],
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return <div className={classes} ref={ref} {...props} />;
  }
);

Separator.displayName = 'Separator';

// Responsive utility for hiding/showing content
export interface ResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  hide?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[];
  show?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[];
}

const Responsive = forwardRef<HTMLDivElement, ResponsiveProps>(
  ({ className, hide = [], show = [], children, ...props }, ref) => {
    const hideClasses = hide.map(breakpoint => {
      const breakpointMap = {
        xs: 'xs:hidden',
        sm: 'sm:hidden',
        md: 'md:hidden',
        lg: 'lg:hidden',
        xl: 'xl:hidden',
      };
      return breakpointMap[breakpoint];
    }).join(' ');

    const showClasses = show.map(breakpoint => {
      const breakpointMap = {
        xs: 'hidden xs:block',
        sm: 'hidden sm:block',
        md: 'hidden md:block',
        lg: 'hidden lg:block',
        xl: 'hidden xl:block',
      };
      return breakpointMap[breakpoint];
    }).join(' ');

    const classes = cn(
      hideClasses,
      showClasses,
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Responsive.displayName = 'Responsive';

// Main Layout Component - Full page layouts with proper backgrounds
export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'reading' | 'dashboard';
  fullHeight?: boolean;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, variant = 'default', fullHeight = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      reading: 'bg-reading-background',
      dashboard: 'bg-neutral-50',
    };

    const classes = cn(
      variants[variant],
      fullHeight && 'min-h-screen',
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Layout.displayName = 'Layout';

export {
  Layout,
  Container,
  Grid,
  Stack,
  Inline,
  Section,
  Separator,
  Responsive,
};