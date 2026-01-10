import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Validates that required Supabase environment variables are set.
 * Throws an error with a clear message if any are missing.
 */
export function validateSupabaseEnv(): {
  supabaseUrl: string;
  supabaseAnonKey: string;
} {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const missingVars: string[] = [];

  if (!supabaseUrl) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!supabaseAnonKey) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Supabase environment variable(s): ${missingVars.join(', ')}. ` +
        'Please add them to your .env.local file.'
    );
  }

  return {
    supabaseUrl: supabaseUrl!,
    supabaseAnonKey: supabaseAnonKey!,
  };
}

/**
 * Creates and returns a Supabase client instance.
 * Validates environment variables before creating the client.
 */
export function createSupabaseClient(): SupabaseClient {
  const { supabaseUrl, supabaseAnonKey } = validateSupabaseEnv();
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Lazy-initialized singleton client
let supabaseInstance: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client instance.
 * The client is lazily initialized on first access.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }
  return supabaseInstance;
}

// Export a convenience getter for the client
// Note: This will throw if env vars are not set when accessed
export const supabase = {
  get client(): SupabaseClient {
    return getSupabaseClient();
  },
};
