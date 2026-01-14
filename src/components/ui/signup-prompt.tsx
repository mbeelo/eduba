'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { hasLocalProgress } from '@/lib/local-progress';
import { shouldShowSignupPrompt, markSignupPromptShown, markSignupPromptDismissed } from '@/lib/session-tracking';
import {
  Card,
  CardContent,
  Heading,
  BodyText,
  Button,
} from '@/components/ui';

interface SignUpPromptProps {
  variant?: 'banner' | 'modal' | 'card';
  trigger?: 'progress' | 'time' | 'manual';
  onDismiss?: () => void;
  className?: string;
}

export function SignUpPrompt({
  variant = 'card',
  trigger = 'manual',
  onDismiss,
  className = ''
}: SignUpPromptProps) {
  const router = useRouter();
  const { user, isAnonymous } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if user is authenticated or if dismissed
  if ((user && !isAnonymous) || dismissed) {
    return null;
  }

  const handleSignUp = () => {
    router.push('/auth/register');
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleDismiss = () => {
    setDismissed(true);
    markSignupPromptDismissed();
    onDismiss?.();
  };

  const hasProgress = hasLocalProgress();

  const getPromptContent = () => {
    // Always use the progress-save focused messaging for completion-triggered prompts
    return {
      title: 'Save your progress?',
      description: `Want to save your progress and pick up where you left off?`,
      primaryText: 'Save Progress',
      benefits: ['✓ Sync across devices', '✓ Track your improvement', '✓ Never lose your work']
    };
  };

  const content = getPromptContent();

  if (variant === 'banner') {
    return (
      <div className={`bg-brand-50 border border-brand-200 p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div>
              <BodyText className="text-sm font-medium text-brand-900">
                {content.title}
              </BodyText>
              <BodyText className="text-xs text-brand-700">
                {content.description}
              </BodyText>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleDismiss}>
              Later
            </Button>
            <Button variant="primary" size="sm" onClick={handleSignUp}>
              {content.primaryText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ${className}`}>
        <Card className="max-w-md w-full">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <Heading level={3} className="text-xl font-bold text-reading-text mb-2">
                {content.title}
              </Heading>
              <BodyText className="text-reading-text-muted">
                {content.description}
              </BodyText>
            </div>

            <div className="space-y-3 mb-6">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <BodyText className="text-sm text-reading-text">{benefit}</BodyText>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button variant="primary" className="w-full" onClick={handleSignUp}>
                {content.primaryText}
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button variant="ghost" className="flex-1" onClick={handleDismiss}>
                  Continue Anonymous
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default card variant
  return (
    <Card className={`border-brand-200 bg-brand-50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">E</span>
          </div>
          <div className="flex-1">
            <Heading level={4} className="text-lg font-semibold text-brand-900 mb-2">
              {content.title}
            </Heading>
            <BodyText className="text-brand-700 mb-4">
              {content.description}
            </BodyText>

            <div className="space-y-2 mb-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <BodyText className="text-sm text-brand-700">{benefit}</BodyText>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="primary" size="sm" onClick={handleSignUp}>
                {content.primaryText}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDismiss}>
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Hook to trigger sign-up prompts based on completion count
export function useSignUpPrompts() {
  const { user, isAnonymous } = useAuth();
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);

  // Check if we should show completion-based prompt
  const checkCompletionPrompt = () => {
    if (!isAnonymous || user) return;

    if (shouldShowSignupPrompt()) {
      setShowCompletionPrompt(true);
      markSignupPromptShown();
    }
  };

  return {
    showCompletionPrompt,
    setShowCompletionPrompt,
    checkCompletionPrompt,
  };
}