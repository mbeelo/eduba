'use client';

import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Container, Section } from '@/components/ui/layout';
import { BodyText, Heading } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { AdBanner } from '@/components/ui/ad-banner';

interface UserStats {
  totalPassages: number;
  completedPassages: number;
  totalAttempts: number;
  bestAccuracy: number;
  averageAccuracy: number;
  joinDate: string;
}

export default function AccountPage() {
  const { user, signOut, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      fetchUserStats();
    }
  }, [user, loading, router]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      setStatsLoading(true);

      // Get user progress data
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error fetching user stats:', progressError);
        return;
      }

      // Calculate stats
      const totalAttempts = progressData?.reduce((sum, p) => sum + (p.attempts || 0), 0) || 0;
      const completedPassages = progressData?.filter(p => p.completed).length || 0;
      const bestAccuracy = progressData?.reduce((max, p) => Math.max(max, p.best_accuracy || 0), 0) || 0;
      const averageAccuracy = progressData?.length > 0
        ? Math.round(progressData.reduce((sum, p) => sum + (p.best_accuracy || 0), 0) / progressData.length)
        : 0;

      setStats({
        totalPassages: progressData?.length || 0,
        completedPassages,
        totalAttempts,
        bestAccuracy,
        averageAccuracy,
        joinDate: user.created_at
      });
    } catch (error) {
      console.error('Error calculating user stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !deleteConfirm) return;

    try {
      // Delete user progress first
      const { error: progressError } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error deleting user progress:', progressError);
        return;
      }

      // Sign out the user
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleExportData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      // Create and download JSON file
      const exportData = {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        },
        progress: data,
        exported_at: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eduba-data-${user.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500" />
        </div>
      </div>
    );
  }

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
            <button className="button-subtle text-xs sm:text-sm" onClick={() => router.push('/dashboard')}>
              Dashboard
            </button>
          </div>
        </Container>
      </header>

      <main>
        <Section className="py-12">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Page Header */}
              <div className="text-center space-y-4">
                <div className="flex justify-between items-center">
                  <Heading level={1} className="text-3xl">Account Settings</Heading>
                  <button className="button-subtle text-xs sm:text-sm" onClick={signOut}>
                    <span className="hidden sm:inline">sign out</span>
                    <span className="sm:hidden">out</span>
                  </button>
                </div>
                <BodyText variant="muted">
                  Manage your profile and view your memory training progress
                </BodyText>
              </div>

              {/* Ad Banner */}
              <AdBanner className="mb-8" />

              {/* Profile Info */}
              <div className="clean-card">
                <div className="space-y-6">
                  <span className="label-mono mb-4 block">profile information</span>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <BodyText className="font-medium mb-1">Email</BodyText>
                      <BodyText variant="muted">{user.email}</BodyText>
                    </div>
                    <div>
                      <BodyText className="font-medium mb-1">Member Since</BodyText>
                      <BodyText variant="muted">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </BodyText>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Stats */}
              <div className="clean-card">
                <div className="space-y-6">
                  <span className="label-mono mb-4 block">training statistics</span>

                  {statsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto" />
                    </div>
                  ) : stats ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                          {stats.completedPassages}
                        </div>
                        <BodyText variant="muted" className="text-sm">Passages Mastered</BodyText>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                          {stats.totalAttempts}
                        </div>
                        <BodyText variant="muted" className="text-sm">Practice Sessions</BodyText>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                          {stats.bestAccuracy}%
                        </div>
                        <BodyText variant="muted" className="text-sm">Best Accuracy</BodyText>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                          {stats.averageAccuracy}%
                        </div>
                        <BodyText variant="muted" className="text-sm">Average Accuracy</BodyText>
                      </div>
                    </div>
                  ) : (
                    <BodyText variant="muted" className="text-center">No training data yet</BodyText>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div className="clean-card">
                <div className="space-y-6">
                  <span className="label-mono mb-4 block">preferences</span>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <BodyText className="font-medium">Theme</BodyText>
                        <BodyText variant="muted" className="text-sm">
                          Choose between light and dark mode
                        </BodyText>
                      </div>
                      <button className="button-subtle" onClick={toggleTheme}>
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Management */}
              <div className="clean-card">
                <div className="space-y-6">
                  <span className="label-mono mb-4 block">data management</span>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <BodyText className="font-medium">Export Data</BodyText>
                        <BodyText variant="muted" className="text-sm">
                          Download your training progress and account data
                        </BodyText>
                      </div>
                      <button className="button-subtle" onClick={handleExportData}>
                        Export
                      </button>
                    </div>

                    <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <BodyText className="font-medium text-red-600">Delete Account</BodyText>
                          <BodyText variant="muted" className="text-sm">
                            Permanently delete your account and all data
                          </BodyText>
                        </div>
                        <div className="flex items-center space-x-3">
                          {deleteConfirm ? (
                            <>
                              <button
                                className="button-subtle text-sm"
                                onClick={() => setDeleteConfirm(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                                onClick={handleDeleteAccount}
                              >
                                Confirm Delete
                              </button>
                            </>
                          ) : (
                            <button
                              className="text-red-600 hover:text-red-700 border border-red-300 px-4 py-2 rounded text-sm"
                              onClick={() => setDeleteConfirm(true)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}