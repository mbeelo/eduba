/*
  Eduba Design System - Component Index
  Clean, minimal UI components optimized for memory training
*/

// Core UI Components
export { Button } from './button';
export type { ButtonProps } from './button';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
export type { CardProps, CardHeaderProps, CardTitleProps } from './card';

// Typography Components - Reading Optimized
export {
  Heading,
  ReadingText,
  BodyText,
  FeedbackText,
  LinkText,
} from './typography';
export type {
  HeadingProps,
  ReadingTextProps,
  BodyTextProps,
  FeedbackTextProps,
  LinkTextProps,
} from './typography';

// Loading & Progress Components
export {
  Spinner,
  LoadingText,
  LoadingCard,
  ProgressBar,
  Pulse,
} from './loading';
export type {
  SpinnerProps,
  LoadingTextProps,
  LoadingCardProps,
  ProgressBarProps,
  PulseProps,
} from './loading';

// Feedback & Status Components
export {
  Alert,
  Badge,
  AccuracyIndicator,
  StatusIndicator,
  Toast,
} from './feedback';
export type {
  AlertProps,
  BadgeProps,
  AccuracyIndicatorProps,
  StatusIndicatorProps,
  ToastProps,
} from './feedback';

// Layout & Responsive Components
export {
  Container,
  Grid,
  Stack,
  Inline,
  Section,
  Separator,
  Responsive,
} from './layout';
export type {
  ContainerProps,
  GridProps,
  StackProps,
  InlineProps,
  SectionProps,
  SeparatorProps,
  ResponsiveProps,
} from './layout';

// Form Components
export {
  FormField,
  Label,
  Input,
  Textarea,
  Form,
} from './form';
export type {
  FormFieldProps,
  LabelProps,
  InputProps,
  TextareaProps,
  FormProps,
} from './form';

// Progress & Navigation Components
export {
  PathProgressBar,
  ProgressBadge,
  StatusIcon,
  PathCard,
  PassageNode,
} from './progress';
export type {
  PathProgressBarProps,
  ProgressBadgeProps,
  StatusIconProps,
  PathCardProps,
  PassageNodeProps,
} from './progress';

// Authentication & Conversion Components
export {
  SignUpPrompt,
  useSignUpPrompts,
} from './signup-prompt';

export {
  UpgradeModal,
} from './upgrade-modal';