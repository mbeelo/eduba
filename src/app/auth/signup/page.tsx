'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { hasLocalProgress } from '@/lib/local-progress';
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Form,
  FormField,
  Label,
  Input,
  Alert,
  Heading,
  BodyText,
  LinkText,
} from '@/components/ui';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { signUp, migrateLocalProgress } = useAuth();
  const router = useRouter();

  // Check if user has local progress to show helpful message
  const userHasProgress = hasLocalProgress();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const { error, data } = await signUp(formData.email, formData.password);

      if (error) {
        if (error.message.includes('User already registered')) {
          setErrors({ general: 'An account with this email already exists. Please sign in instead.' });
        } else {
          setErrors({ general: error.message });
        }
        return;
      }

      // Check if we have local progress to migrate
      const hasProgress = hasLocalProgress();

      // Check if email confirmation is required
      if (data?.user && !data.user.email_confirmed_at) {
        setShowSuccessMessage(true);
      } else {
        // Direct sign in if no email confirmation required
        // Attempt to migrate local progress if it exists
        if (hasProgress) {
          try {
            const migrationSuccess = await migrateLocalProgress();
            if (migrationSuccess) {
              console.log('Successfully migrated local progress to new account');
            } else {
              console.warn('Failed to migrate local progress');
            }
          } catch (error) {
            console.error('Error during progress migration:', error);
          }
        }

        router.push('/dashboard');
      }
    } catch {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-correct-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-correct-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle>Check your email</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <BodyText className="text-reading-text-muted">
                We&apos;ve sent a confirmation link to <strong>{formData.email}</strong>.
                Please check your email and click the link to activate your account.
              </BodyText>

              <Alert variant="info">
                <BodyText className="text-sm">
                  Don&apos;t see the email? Check your spam folder or{' '}
                  <LinkText href="/auth/signup" className="font-medium">
                    try again with a different email address
                  </LinkText>
                  .
                </BodyText>
              </Alert>

              <div className="pt-4">
                <LinkText href="/auth/login" className="text-brand-600 hover:text-brand-500">
                  ← Back to sign in
                </LinkText>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="w-full max-w-md">
        <div className="text-center mb-8">
          <Heading level={1} className="text-3xl font-bold text-reading-text">
            Create your account
          </Heading>
          <BodyText className="mt-2 text-reading-text-muted">
            Start your journey to better memory
          </BodyText>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Sign up for Eduba</CardTitle>
          </CardHeader>
          <CardContent>
            {userHasProgress && (
              <Alert variant="info" className="mb-4">
                <BodyText className="text-sm">
                  <strong>Great news!</strong> Your current progress will be automatically saved to your new account.
                </BodyText>
              </Alert>
            )}

            {errors.general && (
              <Alert variant="error" className="mb-4">
                {errors.general}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} spacing="md">
              <FormField error={errors.email}>
                <Label htmlFor="email" required>
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  placeholder="you@example.com"
                />
              </FormField>

              <FormField error={errors.password}>
                <Label htmlFor="password" required>
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  placeholder="Create a strong password"
                />
                <BodyText className="text-xs text-reading-text-muted mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and a number
                </BodyText>
              </FormField>

              <FormField error={errors.confirmPassword}>
                <Label htmlFor="confirmPassword" required>
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!errors.confirmPassword}
                  placeholder="Confirm your password"
                />
              </FormField>

              <Button
                type="submit"
                loading={loading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Create account
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <BodyText className="text-reading-text-muted">
                Already have an account?{' '}
                <LinkText href="/auth/login" className="text-brand-600 hover:text-brand-500 font-medium">
                  Sign in
                </LinkText>
              </BodyText>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <BodyText className="text-reading-text-muted text-sm">
            <LinkText href="/" className="text-brand-600 hover:text-brand-500">
              ← Back to home
            </LinkText>
          </BodyText>
        </div>
      </Container>
    </div>
  );
}