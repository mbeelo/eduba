'use client';

import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserPathsProgress, getPathMetadata, PathProgress } from '@/lib/progress';
import { getLocalPathsProgress } from '@/lib/local-progress';
import {
  Container,
  Heading,
  BodyText,
  Section,
} from '@/components/ui';
import { Footer } from '@/components/ui/footer';
import { AdBanner } from '@/components/ui/ad-banner';
import { SignUpPrompt } from '@/components/ui/signup-prompt';

export default function DashboardPage() {
  const { user, isAnonymous, signOut, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [pathsProgress, setPathsProgress] = useState<PathProgress[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handlePathClick = (path: string) => {
    router.push(`/path/${path}`);
  };

  useEffect(() => {
    async function loadProgress() {
      setProgressLoading(true);
      setProgressError(null);

      try {
        let progress: PathProgress[];

        if (user && !isAnonymous) {
          // Load from server for authenticated users
          progress = await getUserPathsProgress(user.id);
        } else {
          // Load from localStorage for anonymous users
          progress = getLocalPathsProgress();
        }

        setPathsProgress(progress);
      } catch (error) {
        console.error('Error loading progress:', error);
        setProgressError('Failed to load progress data');
      } finally {
        setProgressLoading(false);
      }
    }

    if (!loading) {
      loadProgress();
    }
  }, [user, isAnonymous, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <BodyText className="text-reading-text-muted">Loading your dashboard...</BodyText>
        </div>
      </div>
    );
  }

  // Allow both authenticated and anonymous access
  // No need to redirect to auth anymore

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
          </div>
        </Container>
      </header>

      <main>
        <Section className="py-12">
          <Container>
            {/* Show progress only if user has actual progress */}
            {!progressLoading && pathsProgress.some(path => path.completedPassages > 0) && (
              <div className="mb-12">
                <span className="label-mono mb-6 block">
                  your progress
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="clean-card text-center p-4">
                    <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                      {pathsProgress.reduce((total, path) => total + path.completedPassages, 0)}
                    </div>
                    <span className="label-mono text-xs">passages mastered</span>
                  </div>
                  <div className="clean-card text-center p-4">
                    <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                      {pathsProgress.reduce((total, path) => total + path.totalAttempts, 0)}
                    </div>
                    <span className="label-mono text-xs">practice sessions</span>
                  </div>
                  <div className="clean-card text-center p-4">
                    <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                      {(() => {
                        const pathsWithAccuracy = pathsProgress.filter(path => path.averageAccuracy > 0);
                        if (pathsWithAccuracy.length === 0) return 0;
                        return Math.round(pathsWithAccuracy.reduce((total, path) => total + path.averageAccuracy, 0) / pathsWithAccuracy.length);
                      })()}%
                    </div>
                    <span className="label-mono text-xs">average accuracy</span>
                  </div>
                  <div className="clean-card text-center p-4">
                    <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                      {pathsProgress.filter(path => path.completedPassages > 0).length}
                    </div>
                    <span className="label-mono text-xs">paths started</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sign-up prompt for anonymous users with progress */}
            {isAnonymous && pathsProgress.some(path => path.completedPassages > 0) && (
              <SignUpPrompt
                variant="banner"
                trigger="progress"
                className="mb-8"
              />
            )}

            <AdBanner
              className="mb-8"
              adSlot={process.env.NEXT_PUBLIC_ADSENSE_DASHBOARD_SLOT || "1234567890"}
              adFormat="rectangle"
            />

            {/* Learning Paths Section - Simple List */}
            <div className="mb-8">
              <span className="label-mono mb-6 block">
                learning paths
              </span>

              {progressError && (
                <div className="mb-6 p-4 clean-card border-l-4 border-red-500">
                  <div className="text-sm font-medium text-red-700 mb-2">
                    Unable to Load Progress
                  </div>
                  <BodyText className="text-red-600 mb-4">{progressError}</BodyText>
                  <div className="flex gap-2">
                    <button
                      className="button-primary text-sm px-4 py-2"
                      onClick={() => {
                        setProgressError(null);
                        setProgressLoading(true);
                        // Trigger reload of progress data
                        if (user && !isAnonymous) {
                          getUserPathsProgress(user.id).then(setPathsProgress).catch((error) => {
                            console.error('Error reloading progress:', error);
                            setProgressError('Failed to reload progress data');
                          }).finally(() => setProgressLoading(false));
                        } else {
                          try {
                            const progress = getLocalPathsProgress();
                            setPathsProgress(progress);
                          } catch (error) {
                            console.error('Error reloading local progress:', error);
                            setProgressError('Failed to reload local progress data');
                          } finally {
                            setProgressLoading(false);
                          }
                        }
                      }}
                    >
                      Retry
                    </button>
                    <button
                      className="button-subtle text-sm px-4 py-2"
                      onClick={() => setProgressError(null)}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {progressLoading ? (
                <div className="space-y-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="clean-card p-4 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="h-5 bg-gray-200 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {pathsProgress.map((progress) => {
                    const metadata = getPathMetadata(progress.path);
                    const hasProgress = progress.completedPassages > 0;
                    const progressPercentage = progress.totalPassages > 0 ? (progress.completedPassages / progress.totalPassages) * 100 : 0;
                    return (
                      <button
                        key={progress.path}
                        onClick={() => handlePathClick(progress.path)}
                        className="clean-card w-full p-4 text-left hover:shadow-md transition-shadow group relative overflow-hidden"
                      >
                        {/* Progress bar background */}
                        {hasProgress && (
                          <div
                            className="absolute bottom-0 left-0 h-1 bg-accent/20 transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-reading-text font-medium group-hover:text-accent transition-colors">
                                {metadata.name}
                              </span>
                              {hasProgress && (
                                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                                  {progress.completedPassages} completed
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-reading-text-muted mt-1 group-hover:text-reading-text transition-colors">
                              {metadata.description}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${hasProgress ? 'text-accent' : 'text-reading-text-muted'}`}>
                              {progress.completedPassages}/{progress.totalPassages}
                            </span>
                            <span className="text-accent">→</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>


          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}