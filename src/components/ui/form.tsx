import { forwardRef, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Form Field Container
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, error, children, ...props }, ref) => {
    const classes = cn('space-y-2', className);

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
        {error && (
          <p className="text-ui-sm text-incorrect-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Label Component
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const classes = cn(
      'block text-ui-sm font-medium text-reading-text',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    );

    return (
      <label className={classes} ref={ref} {...props}>
        {children}
        {required && <span className="ml-1 text-incorrect-500">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

// Input Component
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, ...props }, ref) => {
    const baseStyles = [
      'flex h-10 w-full rounded-md border border-reading-border',
      'bg-white px-3 py-2 text-ui-base text-reading-text',
      'placeholder:text-reading-text-muted',
      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-all duration-200 ease-in-out',
    ];

    const errorStyles = error
      ? 'border-incorrect-500 focus:ring-incorrect-500'
      : '';

    const classes = cn(baseStyles, errorStyles, className);

    return (
      <input
        type={type}
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    const baseStyles = [
      'flex min-h-[80px] w-full rounded-md border border-reading-border',
      'bg-white px-3 py-2 text-ui-base text-reading-text',
      'placeholder:text-reading-text-muted',
      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-all duration-200 ease-in-out',
      'resize-vertical',
    ];

    const errorStyles = error
      ? 'border-incorrect-500 focus:ring-incorrect-500'
      : '';

    const classes = cn(baseStyles, errorStyles, className);

    return (
      <textarea
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

// Form Container
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  spacing?: 'sm' | 'md' | 'lg';
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, spacing = 'md', children, ...props }, ref) => {
    const spacingClasses = {
      sm: 'space-y-3',
      md: 'space-y-4',
      lg: 'space-y-6',
    };

    const classes = cn(spacingClasses[spacing], className);

    return (
      <form className={classes} ref={ref} {...props}>
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

export {
  FormField,
  Label,
  Input,
  Textarea,
  Form,
};