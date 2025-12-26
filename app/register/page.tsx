'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Info } from 'lucide-react';

/**
 * Maps OAuth error codes from URL to user-friendly Indonesian messages
 */
function getOAuthErrorMessage(
  errorCode: string | null,
  errorDescription: string | null
): string | null {
  if (!errorCode) return null;

  switch (errorCode) {
    case 'access_denied':
      return 'Akses ditolak. Silakan coba lagi.';
    case 'invalid_request':
      return 'Permintaan tidak valid. Silakan refresh halaman.';
    case 'server_error':
      return 'Terjadi kesalahan server. Silakan coba lagi nanti.';
    case 'temporarily_unavailable':
      return 'Layanan sedang tidak tersedia. Silakan coba lagi nanti.';
    case 'unauthorized_client':
      return 'Aplikasi tidak diizinkan. Silakan hubungi administrator.';
    default:
      if (errorDescription) {
        return `Terjadi kesalahan: ${errorDescription}`;
      }
      return 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, error: authError, signInWithGoogle } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Handle OAuth redirect callback - derive error from URL params
  const oauthError = useMemo(() => {
    const errorCode = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    return getOAuthErrorMessage(errorCode, errorDescription);
  }, [searchParams]);

  // Redirect to homepage if already authenticated
  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoogleSignUp = async () => {
    setIsSigningUp(true);

    try {
      await signInWithGoogle();
      // Note: On success, the page will redirect to Google OAuth
      // The loading state will be handled by the redirect
    } catch {
      setIsSigningUp(false);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="text-accent h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Don't render register form if already authenticated (will redirect)
  if (user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="text-accent h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Combine errors from OAuth callback and auth context
  const displayError = oauthError || authError;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Daftar di InfoBatak.id</CardTitle>
          <CardDescription>
            Buat akun untuk mengakses fitur lengkap dan menyimpan preferensi Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Message Display */}
          {displayError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{displayError}</AlertDescription>
            </Alert>
          )}

          {/* Info about Google OAuth Registration */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Pendaftaran menggunakan akun Google Anda. Tidak perlu membuat password baru - cukup
              gunakan akun Google yang sudah ada.
            </AlertDescription>
          </Alert>

          {/* Google Sign Up Button */}
          <Button onClick={handleGoogleSignUp} disabled={isSigningUp} className="w-full" size="lg">
            {isSigningUp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghubungkan...
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Daftar dengan Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">Sudah punya akun?</span>
            </div>
          </div>

          {/* Link to Login Page */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-accent hover:text-accent/80 text-sm font-medium underline-offset-4 hover:underline"
            >
              Masuk sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
