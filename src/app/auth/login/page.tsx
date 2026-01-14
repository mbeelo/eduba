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
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const { signIn, migrateLocalProgress } = useAuth();
  const userHasProgress = hasLocalProgress();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ general: 'Invalid email or password. Please check your credentials and try again.' });
        } else {
          setErrors({ general: error.message });
        }
        return;
      }

      // Successful login - check for local progress migration
      if (userHasProgress) {
        try {
          const migrationSuccess = await migrateLocalProgress();
          if (migrationSuccess) {
            console.log('Successfully migrated local progress to existing account');
          } else {
            console.warn('Failed to migrate local progress');
          }
        } catch (error) {
          console.error('Error during progress migration:', error);
        }
      }

      router.push('/dashboard');
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

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="w-full max-w-md">
        <div className="text-center mb-8">
          <Heading level={1} className="text-3xl font-bold text-reading-text">
            Welcome back
          </Heading>
          <BodyText className="mt-2 text-reading-text-muted">
            Sign in to continue your memory training
          </BodyText>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  placeholder="Enter your password"
                />
              </FormField>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <LinkText href="/auth/reset-password" className="text-brand-600 hover:text-brand-500">
                    Forgot your password?
                  </LinkText>
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Sign in
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <BodyText className="text-reading-text-muted">
                Don&apos;t have an account?{' '}
                <LinkText href="/auth/signup" className="text-brand-600 hover:text-brand-500 font-medium">
                  Sign up
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

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3">
        <div className="text-center space-x-4 sm:space-x-6">
          <a href="/contact" className="label-mono text-xs opacity-60 hover:opacity-100">
            Contact
          </a>
          <a href="/privacy" className="label-mono text-xs opacity-60 hover:opacity-100">
            Privacy Policy
          </a>
          <a href="/terms" className="label-mono text-xs opacity-60 hover:opacity-100">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}