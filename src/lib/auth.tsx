'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { exportLocalProgress, clearLocalProgress } from './local-progress';

interface AuthContextType {
  user: User | null;
  isAnonymous: boolean;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  setAnonymous: (anonymous: boolean) => void;
  migrateLocalProgress: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setUser(session?.user ?? null);
          // If no session, set anonymous mode
          if (!session?.user) {
            setIsAnonymous(true);
          }
        }
      } catch (error) {
        console.error('Unexpected error getting session:', error);
        // On error, allow anonymous access
        setIsAnonymous(true);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setUser(session?.user ?? null);
        // Update anonymous state based on session
        if (session?.user) {
          setIsAnonymous(false);
        } else {
          setIsAnonymous(true);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await supabase.auth.signUp({
      email,
      password,
    });
    return response;
  };

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return response;
  };

  const signOut = async () => {
    const response = await supabase.auth.signOut();
    return response;
  };

  const resetPassword = async (email: string) => {
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return response;
  };

  const setAnonymous = (anonymous: boolean) => {
    setIsAnonymous(anonymous);
  };

  const migrateLocalProgress = async (): Promise<boolean> => {
    if (!user || isAnonymous) {
      console.warn('Cannot migrate progress: no authenticated user');
      return false;
    }

    try {
      const localData = exportLocalProgress();

      // If no local progress, nothing to migrate
      if (Object.keys(localData.passageProgress).length === 0) {
        return true;
      }

      console.log('Migrating local progress to server...', localData);

      // Convert local progress to server format and upload
      const migrationPromises = Object.entries(localData.passageProgress).map(
        async ([passageId, progress]) => {
          const { data, error } = await supabase
            .from('user_progress')
            .upsert({
              user_id: user.id,
              passage_id: passageId,
              completed: progress.completed,
              best_accuracy: progress.bestAccuracy,
              attempts: progress.attempts,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id,passage_id'
            });

          if (error) {
            console.error(`Failed to migrate progress for passage ${passageId}:`, error);
            throw error;
          }

          return data;
        }
      );

      await Promise.all(migrationPromises);

      // Clear local storage after successful migration
      clearLocalProgress();

      console.log('Local progress successfully migrated to server');
      return true;
    } catch (error) {
      console.error('Failed to migrate local progress:', error);
      return false;
    }
  };

  const value = {
    user,
    isAnonymous,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    setAnonymous,
    migrateLocalProgress,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Custom hook for requiring authentication
export function useRequireAuth() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth/login';
    }
  }, [user, loading]);

  return { user, loading };
}