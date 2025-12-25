'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase';
import { UserProfile, AuthState } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Maps Supabase User to UserProfile
 */
function mapUserToProfile(user: User): UserProfile {
  return {
    id: user.id,
    email: user.email || '',
    display_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    created_at: user.created_at,
    updated_at: user.updated_at || user.created_at,
  };
}

/**
 * Maps OAuth/Auth errors to user-friendly Indonesian messages
 */
function getErrorMessage(error: AuthError | Error): string {
  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('access_denied') || errorMessage.includes('access denied')) {
    return 'Akses ditolak. Silakan coba lagi.';
  }
  if (errorMessage.includes('invalid_request') || errorMessage.includes('invalid request')) {
    return 'Permintaan tidak valid. Silakan refresh halaman.';
  }
  if (errorMessage.includes('server_error') || errorMessage.includes('server error')) {
    return 'Terjadi kesalahan server. Silakan coba lagi nanti.';
  }
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'Tidak dapat terhubung. Periksa koneksi internet Anda.';
  }
  if (errorMessage.includes('session') && errorMessage.includes('expired')) {
    return 'Sesi Anda telah berakhir. Silakan masuk kembali.';
  }
  if (errorMessage.includes('invalid') && errorMessage.includes('session')) {
    return 'Sesi tidak valid. Silakan masuk kembali.';
  }

  return 'Terjadi kesalahan. Silakan coba lagi.';
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Initialize auth state and set up listener
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const supabase = getSupabaseClient();

        // Get initial session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          if (mounted) {
            setState({
              user: null,
              loading: false,
              error: getErrorMessage(error),
            });
          }
          return;
        }

        if (mounted) {
          setState({
            user: session?.user ? mapUserToProfile(session.user) : null,
            loading: false,
            error: null,
          });
        }

        // Listen for auth state changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_IN' && session?.user) {
            setState({
              user: mapUserToProfile(session.user),
              loading: false,
              error: null,
            });
          } else if (event === 'SIGNED_OUT') {
            setState({
              user: null,
              loading: false,
              error: null,
            });
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            setState((prev) => ({
              ...prev,
              user: mapUserToProfile(session.user),
            }));
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        if (mounted) {
          setState({
            user: null,
            loading: false,
            error: error instanceof Error ? getErrorMessage(error) : 'Terjadi kesalahan.',
          });
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined,
        },
      });

      if (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: getErrorMessage(error),
        }));
      }
      // Note: On success, the page will redirect to Google OAuth
      // Loading state will be reset when the user returns and onAuthStateChange fires
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? getErrorMessage(error) : 'Terjadi kesalahan.',
      }));
    }
  }, []);

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: getErrorMessage(error),
        }));
        return;
      }

      // State will be updated by onAuthStateChange listener
      // But we also update here for immediate feedback
      setState({
        user: null,
        loading: false,
        error: null,
      });

      // Redirect to homepage after logout (Requirements 5.2)
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? getErrorMessage(error) : 'Terjadi kesalahan.',
      }));
    }
  }, []);

  const value: AuthContextType = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 * Must be used within an AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// Export for testing purposes
export { getErrorMessage, mapUserToProfile };
