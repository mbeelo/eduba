'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BodyText, Heading, FeedbackText } from '@/components/ui/typography';
import { Layout } from '@/components/ui/layout';
import { getAccuracyDescription, getEncouragementMessage, calculateFormatAccuracy } from '@/lib/comparison';
import type { ComparisonResult } from '@/lib/comparison';
import { AdBanner } from '@/components/ui/ad-banner';
import { useAuth } from '@/lib/auth';
import { PracticeCompletionPanel } from '@/components/pro/PracticeCompletionPanel';
import { SignUpPrompt, useSignUpPrompts } from '@/components/ui/signup-prompt';
import { incrementPracticeCompletions } from '@/lib/session-tracking';
import { useEffect } from 'react';

interface Passage {
  id: string;
  title: string;
  author: string | null;
  content: string;
  difficulty_order: number;
}

interface ResultsPhaseProps {
  passage: Passage;
  userAttempt: string;
  comparisonResult: ComparisonResult;
  onTryAgain: () => void;
  onComplete: () => void;
}

function renderTextWithFormatting(text: string, compareText: string, isOriginal: boolean) {
  const chars = text.split('');
  const compareChars = compareText.split('');

  return chars.map((char, index) => {
    const compareChar = compareChars[index];
    let className = '';
    let title = '';

    if (isOriginal) {
      // For original text, highlight what's missing or different in user attempt
      if (!compareChar) {
        // Character missing in attempt
        className = 'bg-red-100 dark:bg-red-900/30 underline decoration-red-500';
        title = 'Missing in your attempt';
      } else if (char !== compareChar) {
        // Character different in attempt
        if (char.toLowerCase() === compareChar.toLowerCase()) {
          // Capitalization difference
          className = 'bg-yellow-100 dark:bg-yellow-900/30 underline decoration-yellow-500';
          title = `Should be "${char}" (capitalization)`;
        } else {
          // Different character entirely
          className = 'bg-red-100 dark:bg-red-900/30 underline decoration-red-500';
          title = `Should be "${char}", you typed "${compareChar}"`;
        }
      }
    } else {
      // For user attempt, highlight what's wrong compared to original
      const originalChar = compareChars[index];
      if (!originalChar) {
        // Extra character in attempt
        className = 'bg-blue-100 dark:bg-blue-900/30 underline decoration-blue-500';
        title = 'Extra character (not in original)';
      } else if (char !== originalChar) {
        // Character different from original
        if (char.toLowerCase() === originalChar.toLowerCase()) {
          // Capitalization difference
          className = 'bg-yellow-100 dark:bg-yellow-900/30 underline decoration-yellow-500';
          title = `Should be "${originalChar}" (capitalization)`;
        } else {
          // Different character entirely
          className = 'bg-red-100 dark:bg-red-900/30 underline decoration-red-500';
          title = `Should be "${originalChar}"`;
        }
      }
    }

    return (
      <span
        key={index}
        className={className}
        title={title}
      >
        {char}
      </span>
    );
  });
}

export function ResultsPhase({
  passage,
  userAttempt,
  comparisonResult,
  onTryAgain,
  onComplete
}: ResultsPhaseProps) {
  const { accuracy, wordComparisons, totalWords, correctWords, missingWords, incorrectWords } = comparisonResult;
  const { user, isAnonymous } = useAuth();
  const { showCompletionPrompt, checkCompletionPrompt } = useSignUpPrompts();

  // For authenticated users, use 80% gate. For anonymous users, always "pass"
  const isPassing = isAnonymous ? true : accuracy >= 80;

  // Track completion and check for signup prompt
  useEffect(() => {
    incrementPracticeCompletions();
    checkCompletionPrompt();
  }, [checkCompletionPrompt]);


  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Results Header */}
        <div className="mb-8">
          <div className="text-center space-y-6">
            <div>
              <Heading level={1} className="text-2xl md:text-3xl mb-2">
                {passage.title}
              </Heading>
              {passage.author && (
                <BodyText variant="muted">
                  {passage.author}
                </BodyText>
              )}
            </div>

            <span className="label-mono">
              phase 3: results
            </span>

            {/* Accuracy Display */}
            <div className="space-y-2">
              <div className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>
                {accuracy}% <span className="text-sm font-normal" style={{ color: 'var(--foreground)' }}>
                  {getAccuracyDescription(accuracy)}
                </span>
              </div>

              <span className="label-mono">
                {correctWords} of {totalWords} words correct
              </span>
            </div>
          </div>
        </div>

        {/* Comparison View */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Original Text - Clean */}
          <div className="h-fit">
            <div className="space-y-4">
              <span className="label-mono">original text</span>
              <div className="leading-relaxed break-words overflow-wrap-anywhere font-mono">
                {passage.content.split(/([\s\.,;:!?]+)/).filter(Boolean).map((token, index) => {
                  // Check if this token is a word
                  if (/\w/.test(token)) {
                    // Normalize the token for comparison
                    const normalizedToken = token.toLowerCase().replace(/[^\w]/g, '');

                    // Check if this word is missing from user's attempt
                    if (missingWords.includes(normalizedToken)) {
                      return (
                        <span
                          key={index}
                          style={{
                            backgroundColor: 'var(--accent)',
                            color: 'var(--background)',
                            padding: '1px 2px',
                            borderRadius: '2px'
                          }}
                        >
                          {token}
                        </span>
                      );
                    }
                  } else if (/[^\w\s]/.test(token)) {
                    // This token contains punctuation - check if it exists in user's attempt
                    if (!userAttempt.includes(token.trim())) {
                      return (
                        <span
                          key={index}
                          style={{
                            backgroundColor: 'var(--accent)',
                            color: 'var(--background)',
                            padding: '1px 2px',
                            borderRadius: '2px'
                          }}
                        >
                          {token}
                        </span>
                      );
                    }
                  }

                  return <span key={index}>{token}</span>;
                })}
              </div>
              {/* Legend for original text */}
              <div className="text-center text-xs opacity-60">
                highlighted = missed
              </div>
            </div>
          </div>

          {/* User Attempt with Error Highlighting */}
          <div className="h-fit">
            <div className="space-y-4">
              <span className="label-mono">your attempt</span>
              <div className="leading-relaxed break-words overflow-wrap-anywhere font-mono">
                {userAttempt ? (
                  <>
                    {userAttempt.split(/(\s+)/).map((token, index) => {
                      // Check if this token is a word (not whitespace)
                      if (/\w/.test(token)) {
                        // Normalize the token for comparison
                        const normalizedToken = token.toLowerCase().replace(/[^\w]/g, '');

                        // Check if this word is incorrect (not in original)
                        if (incorrectWords.includes(normalizedToken)) {
                          return (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                padding: '1px 2px',
                                borderRadius: '2px'
                              }}
                            >
                              {token}
                            </span>
                          );
                        }
                      }

                      return <span key={index}>{token}</span>;
                    })}
                  </>
                ) : (
                  <span className="italic opacity-60">
                    no attempt recorded
                  </span>
                )}
              </div>
              {/* Legend for user attempt */}
              <div className="text-center text-xs opacity-60">
                highlighted = incorrect
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner className="mb-8" />

        {/* Practice Completion Panel */}
        <div className="max-w-4xl mx-auto mb-8">
          <PracticeCompletionPanel />
        </div>

        {/* Signup Prompt */}
        {showCompletionPrompt && (
          <div className="max-w-4xl mx-auto mb-8">
            <SignUpPrompt variant="card" trigger="progress" />
          </div>
        )}

        {/* Results Message and Actions */}
        <div className="text-center space-y-8">
          {isPassing ? (
            <div className="space-y-4">
              <Heading level={2} className="text-xl">
                {isAnonymous ? 'passage complete!' : 'passage mastered!'}
              </Heading>
            </div>
          ) : (
            <div className="space-y-4">
              <Heading level={2} className="text-xl">
                keep practicing
              </Heading>
              {!isAnonymous && (
                <BodyText className="text-reading-text-muted">
                  You need 80% accuracy to master this passage.
                </BodyText>
              )}
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {!isPassing && (
              <button
                onClick={onTryAgain}
                className="text-lg transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                try again
              </button>
            )}

            <button
              onClick={onComplete}
              className="text-lg transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              {isAnonymous
                ? 'next passage'
                : isPassing
                  ? 'next passage'
                  : 'skip for now'
              }
            </button>

            {isPassing && !isAnonymous && (
              <button
                onClick={onTryAgain}
                className="text-lg transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                practice again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}