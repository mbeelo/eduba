'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { recordLocalProgress, getLocalNextUnlockedPassage, getLocalNextPassageAfter } from '@/lib/local-progress';
import { getNextUnlockedPassage, getNextPassageAfter } from '@/lib/progress';
import { supabase } from '@/lib/supabase';
import { TrainingScreen } from '@/components/training/TrainingScreen';
import { BodyText } from '@/components/ui/typography';
import { Container } from '@/components/ui';
import { analytics } from '@/lib/analytics';

interface Passage {
  id: string;
  title: string;
  author: string | null;
  content: string;
  difficulty_order: number;
  path: string;
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAnonymous, loading: authLoading, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const passageId = params.passageId as string;
  const returnPath = searchParams.get('returnPath'); // Optional path ID to return to

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDashboardClick = () => {
    if (returnPath) {
      router.push(`/path/${returnPath}`);
    } else {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    async function fetchPassage() {
      if (!passageId) {
        setError('No passage ID provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('passages')
          .select('*')
          .eq('id', passageId)
          .single();

        if (error) {
          console.error('Error fetching passage:', error);
          setError('Failed to load passage');
        } else if (!data) {
          setError('Passage not found');
        } else {
          setPassage(data);
          // Track passage started
          analytics.passageStarted(data.id, data.title);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchPassage();
    }
  }, [passageId, user, authLoading]);

  const handleTrainingComplete = async (accuracy: number) => {
    if (!passage) return;

    try {
      if (user && !isAnonymous) {
        // Server-side progress for authenticated users (keeps 80% gate)
        const { data: existingProgress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('passage_id', passage.id)
          .single();

        const isCompleted = accuracy >= 80;
        const updateData = {
          user_id: user.id,
          passage_id: passage.id,
          best_accuracy: Math.max(existingProgress?.best_accuracy || 0, accuracy),
          attempts: (existingProgress?.attempts || 0) + 1,
          completed: existingProgress?.completed || isCompleted,
          completed_at: existingProgress?.completed_at || (isCompleted ? new Date().toISOString() : null),
        };

        const { error } = await supabase
          .from('user_progress')
          .upsert(updateData, {
            onConflict: 'user_id,passage_id',
            ignoreDuplicates: false,
          });

        if (error) {
          console.error('Error updating progress:', error);
          analytics.errorOccurred('Failed to update progress', { passageId: passage.id, accuracy });
        } else {
          analytics.passageCompleted(passage.id, accuracy, updateData.attempts);
        }
      } else {
        // Local storage progress for anonymous users (NO 80% gate)
        // Anonymous users can always advance to next passage regardless of score
        const isCompleted = true; // Always true for anonymous users
        recordLocalProgress(passage.id, accuracy, isCompleted);
        analytics.passageCompleted(passage.id, accuracy, 1);
      }

      // Try to find the next passage in the current path
      try {
        let nextPassageId: string | null = null;

        if (user && !isAnonymous) {
          // Authenticated user - get next passage after current one from server
          nextPassageId = await getNextPassageAfter(user.id, passage.path, passage.id);
        } else {
          // Anonymous user - get next passage after current one from localStorage
          const nextOrder = getLocalNextPassageAfter(passage.path, passage.id);
          if (nextOrder) {
            nextPassageId = `${passage.path}_${nextOrder}`;
          }
        }

        if (nextPassageId) {
          // Navigate to next passage in the same path
          router.push(`/practice/${nextPassageId}?returnPath=${passage.path}`);
        } else {
          // No next passage - redirect back to path or dashboard
          if (returnPath) {
            router.push(`/path/${returnPath}`);
          } else {
            router.push('/dashboard');
          }
        }
      } catch (nextPassageError) {
        console.error('Error finding next passage:', nextPassageError);
        // Fallback to original behavior
        if (returnPath) {
          router.push(`/path/${returnPath}`);
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.error('Error handling training completion:', err);
    }
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-reading-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto" />
          <BodyText>Loading passage...</BodyText>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-reading-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <BodyText variant="strong" size="lg">
            {error}
          </BodyText>
          <button
            onClick={() => {
              if (returnPath) {
                router.push(`/path/${returnPath}`);
              } else {
                router.push('/dashboard');
              }
            }}
            className="text-brand-600 hover:text-brand-700 underline"
          >
            {returnPath ? 'Return to Path' : 'Return to Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  // Show training screen
  if (passage) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Header */}
        <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }}>
          <Container className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg" style={{ color: 'var(--accent)' }}>
                eduba
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="button-subtle text-lg" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              {user && !isAnonymous ? (
                // Authenticated user options
                <button
                  className="label-mono text-xs sm:text-sm hidden sm:inline opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => router.push('/account')}
                >
                  {user.email}
                </button>
              ) : (
                // Anonymous user options
                <>
                  <button
                    className="button-subtle text-xs sm:text-sm"
                    onClick={() => router.push('/auth/signup')}
                  >
                    <span className="hidden sm:inline">sign up</span>
                    <span className="sm:hidden">sign up</span>
                  </button>
                  <button
                    className="button-subtle text-xs sm:text-sm"
                    onClick={() => router.push('/auth/login')}
                  >
                    <span className="hidden sm:inline">log in</span>
                    <span className="sm:hidden">log in</span>
                  </button>
                </>
              )}
              <button className="button-subtle text-xs sm:text-sm" onClick={handleDashboardClick}>
                <span className="hidden sm:inline">{returnPath ? 'path' : 'dashboard'}</span>
                <span className="sm:hidden">{returnPath ? 'path' : 'dash'}</span>
              </button>
            </div>
          </Container>
        </header>

        <TrainingScreen
          passage={passage}
          onComplete={handleTrainingComplete}
        />
      </div>
    );
  }

  return null;
}