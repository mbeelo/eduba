'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { getPathProgress, getPathMetadata, PathWithPassages, getNextUnlockedPassage } from '@/lib/progress';
import { getLocalNextUnlockedPassage, getLocalPassageProgress } from '@/lib/local-progress';
import { supabase } from '@/lib/supabase';
import {
  Container,
  Heading,
  BodyText,
  Button,
  Card,
  CardContent,
  Section,
  Alert,
  PathProgressBar,
  ProgressBadge,
  PassageNode,
  LoadingCard,
} from '@/components/ui';
import { Footer } from '@/components/ui/footer';
// TODO: Uncomment when AdSense is approved
// import { AdBanner } from '@/components/ui/ad-banner';

export default function PathDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAnonymous, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const [pathData, setPathData] = useState<PathWithPassages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [practiceLoading, setPracticeLoading] = useState(false);

  const pathId = params.pathId as string;
  const metadata = getPathMetadata(pathId);

  useEffect(() => {
    async function fetchPathData() {
      if (!pathId) return;

      setLoading(true);
      setError(null);

      try {
        let data: PathWithPassages | null = null;

        if (user && !isAnonymous) {
          // Load from server for authenticated users
          data = await getPathProgress(user.id, pathId);
        } else {
          // For anonymous users, load real passages but with local progress
          const { data: passages, error: passagesError } = await supabase
            .from('passages')
            .select('id, title, author, content, difficulty_order')
            .eq('path', pathId)
            .order('difficulty_order', { ascending: true });

          if (passagesError) {
            console.error('Error fetching passages for anonymous user:', passagesError);
            setError('Failed to load passages');
            return;
          }

          if (!passages || passages.length === 0) {
            setError('No passages found for this path');
            return;
          }

          // Apply local progress to real passages - all passages are now unlocked
          const passagesWithProgress = passages.map((passage, index) => {
            const localProgress = getLocalPassageProgress(passage.id);

            return {
              ...passage,
              progress: {
                passageId: passage.id,
                completed: localProgress.completed,
                bestAccuracy: localProgress.bestAccuracy,
                attempts: localProgress.attempts,
                isUnlocked: true // All passages are now unlocked
              }
            };
          });

          data = {
            path: pathId,
            passages: passagesWithProgress
          };
        }

        if (!data) {
          setError('Path not found');
        } else {
          setPathData(data);
        }
      } catch (err) {
        console.error('Error fetching path data:', err);
        setError('Failed to load path data');
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchPathData();
    }
  }, [pathId, user, isAnonymous, authLoading]);

  const handlePassageClick = async (passageId: string, isUnlocked: boolean) => {
    if (!isUnlocked || practiceLoading) return;

    setPracticeLoading(true);
    router.push(`/practice/${passageId}?returnPath=${pathId}`);
  };

  const handleContinueNext = async () => {
    if (!pathId || practiceLoading) return;

    setPracticeLoading(true);
    try {
      let nextPassage: string | number | null = null;

      if (user && !isAnonymous) {
        // Authenticated user - get from server
        nextPassage = await getNextUnlockedPassage(user.id, pathId);
      } else {
        // Anonymous user - get from localStorage
        nextPassage = getLocalNextUnlockedPassage(pathId);
      }

      if (nextPassage) {
        const passageId = typeof nextPassage === 'number' ? `${pathId}_${nextPassage}` : nextPassage;
        router.push(`/practice/${passageId}?returnPath=${pathId}`);
      } else {
        setPracticeLoading(false);
        // All passages completed or none available
      }
    } catch (err) {
      console.error('Error finding next passage:', err);
      setPracticeLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <header className="clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }}>
          <Container className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <Heading level={3} className="text-reading-text font-bold">
                Eduba
              </Heading>
            </div>
            <Button variant="ghost" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </Container>
        </header>

        <main>
          <Section className="py-12">
            <Container>
              <LoadingCard showHeader={true} rows={6} />
              <div className="mt-8 grid gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <LoadingCard key={i} showHeader={false} rows={2} />
                ))}
              </div>
            </Container>
          </Section>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <header className="clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }}>
          <Container className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <Heading level={3} className="text-reading-text font-bold">
                Eduba
              </Heading>
            </div>
            <Button variant="ghost" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </Container>
        </header>

        <main>
          <Section className="py-12">
            <Container className="max-w-2xl mx-auto text-center">
              <Alert variant="error" className="mb-6">
                <Heading level={2} className="text-xl font-semibold mb-2">
                  {error}
                </Heading>
                <BodyText className="mb-4">
                  We couldn&apos;t load this learning path. Please try again.
                </BodyText>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                  <Button variant="primary" onClick={handleBackToDashboard}>
                    Back to Dashboard
                  </Button>
                </div>
              </Alert>
            </Container>
          </Section>
        </main>
      </div>
    );
  }

  if (!pathData) {
    return null;
  }

  // Calculate progress stats
  const completedCount = pathData.passages.filter(p => p.progress?.completed).length;
  const totalCount = pathData.passages.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextUnlockedPassage = pathData.passages.find(p => p.progress?.isUnlocked && !p.progress?.completed);
  const hasNextPassage = !!nextUnlockedPassage;

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
            <button className="button-subtle text-lg" onClick={() => {
              // Toggle theme directly on document element for immediate effect
              const newTheme = theme === 'light' ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', newTheme);
              localStorage.setItem('theme', newTheme);
            }}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {user && !isAnonymous ? (
              // Authenticated user options
              <>
                <button
                  className="label-mono text-xs sm:text-sm hidden sm:inline opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => router.push('/account')}
                >
                  {user.email}
                </button>
                <button className="button-subtle text-xs sm:text-sm" onClick={handleBackToDashboard}>
                  dashboard
                </button>
              </>
            ) : (
              // Anonymous user options
              <>
                <button
                  className="button-primary text-xs sm:text-sm"
                  onClick={() => router.push('/auth/register')}
                >
                  <span className="hidden sm:inline">sign up</span>
                  <span className="sm:hidden">sign up</span>
                </button>
                <button
                  className="button-subtle text-xs sm:text-sm"
                  onClick={handleBackToDashboard}
                >
                  <span className="hidden sm:inline">dashboard</span>
                  <span className="sm:hidden">dash</span>
                </button>
              </>
            )}
          </div>
        </Container>
      </header>

      <main>
        <Section className="py-12">
          <Container className="max-w-4xl mx-auto">
            {/* Path Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Heading level={1} className="text-3xl font-bold text-reading-text mb-2">
                    {metadata.name}
                  </Heading>
                  <BodyText className="text-reading-text-muted text-lg">
                    {metadata.description}
                  </BodyText>
                </div>
                <div className="text-right">
                  <div className="text-sm text-reading-text-muted mb-2">
                    {completedCount}/{totalCount} ({progressPercentage}%)
                  </div>
                  {hasNextPassage && (
                    <button
                      onClick={handleContinueNext}
                      disabled={practiceLoading}
                      className="text-lg transition-colors block ml-auto"
                      style={{ color: 'var(--accent)' }}
                    >
                      {practiceLoading ? 'Loading...' : 'Continue Practice'}
                    </button>
                  )}
                </div>
              </div>

              {/* Simple Progress Bar */}
              <div className="w-full bg-neutral-200 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: 'var(--accent)'
                  }}
                />
              </div>
            </div>

            {/* TODO: Uncomment when AdSense is approved */}
            {/* <AdBanner className="mb-8" /> */}

            {/* Passages List */}
            <div className="space-y-6">
              <span className="label-mono">
                passage progression
              </span>

              <div className="space-y-3">
                {pathData.passages.map((passage, index) => {
                  const progress = passage.progress!;
                  const wordCount = Math.floor(passage.content?.length / 5) || 0;
                  const isCompleted = progress.completed;
                  const isUnlocked = progress.isUnlocked; // Always true now
                  const isCurrent = isUnlocked && !isCompleted; // Available for practice

                  return (
                    <div
                      key={passage.id}
                      className="flex items-center justify-between py-3 px-0 transition-colors"
                      style={{
                        cursor: !practiceLoading ? 'pointer' : 'default', // All passages are clickable
                        backgroundColor: 'var(--background)'
                      }}
                      onMouseEnter={(e) => {
                        if (!practiceLoading) {
                          e.currentTarget.style.backgroundColor = 'var(--accent)';
                          e.currentTarget.style.color = 'var(--background)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!practiceLoading) {
                          e.currentTarget.style.backgroundColor = 'var(--background)';
                          e.currentTarget.style.color = 'var(--foreground)';
                        }
                      }}
                      onClick={() => !practiceLoading && handlePassageClick(passage.id, true)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                          {isCompleted ? (
                            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          ) : (
                            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--background)' }} />
                          )}
                        </div>
                        <span className="font-medium text-reading-text">
                          {index + 1}. {passage.title}{passage.author ? ` — ${passage.author}` : ''}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-reading-text-muted">
                          {wordCount} words
                        </span>
                        {isCurrent && (
                          <span className="text-xs text-accent font-medium">
                            Start →
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completion Message */}
            {completedCount === totalCount && totalCount > 0 && (
              <div className="mt-8 text-center clean-card">
                <div className="text-4xl mb-3">🎉</div>
                <Heading level={3} className="text-xl font-semibold text-reading-text mb-3">
                  Path Complete!
                </Heading>
                <BodyText className="text-reading-text-muted mb-4">
                  You've mastered all passages in {metadata.name}. Your dedication to memory training
                  and the wisdom in these texts will serve you well.
                </BodyText>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={handleBackToDashboard}>
                    Explore Other Paths
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handlePassageClick(pathData.passages[0].id, true)}
                    disabled={practiceLoading}
                  >
                    Review First Passage
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}