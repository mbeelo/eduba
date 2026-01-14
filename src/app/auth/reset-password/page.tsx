'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
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
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { resetPassword } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      const { error } = await resetPassword(formData.email);

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      setShowSuccessMessage(true);
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

  const handleTryAgain = () => {
    setShowSuccessMessage(false);
    setFormData({ email: '' });
    setErrors({});
  };

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <CardTitle>Check your email</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <BodyText className="text-reading-text-muted">
                We&apos;ve sent a password reset link to <strong>{formData.email}</strong>.
                Please check your email and follow the instructions to reset your password.
              </BodyText>

              <Alert variant="info">
                <BodyText className="text-sm">
                  The reset link will expire in 1 hour. Don&apos;t see the email? Check your spam folder.
                </BodyText>
              </Alert>

              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  onClick={handleTryAgain}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Send to different email
                </Button>

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
            Reset your password
          </Heading>
          <BodyText className="mt-2 text-reading-text-muted">
            Enter your email address and we&apos;ll send you a reset link
          </BodyText>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Password reset</CardTitle>
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

              <Button
                type="submit"
                loading={loading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Send reset link
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <BodyText className="text-reading-text-muted">
                Remember your password?{' '}
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