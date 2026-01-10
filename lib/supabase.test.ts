import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';

/**
 * **Feature: supabase-auth, Property 6: Environment variable validation**
 * **Validates: Requirements 4.3**
 *
 * For any missing required environment variable (NEXT_PUBLIC_SUPABASE_URL or
 * NEXT_PUBLIC_SUPABASE_ANON_KEY), the Auth System SHALL throw an error with
 * a message identifying the missing variable.
 */
describe('Property 6: Environment variable validation', () => {
  // Store original env values
  let originalUrl: string | undefined;
  let originalKey: string | undefined;

  beforeEach(() => {
    // Save original values
    originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    // Reset modules to ensure fresh imports
    vi.resetModules();
  });

  afterEach(() => {
    // Restore original values
    if (originalUrl !== undefined) {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    } else {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    }
    if (originalKey !== undefined) {
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
    } else {
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    }
    vi.resetModules();
  });

  it('should throw error mentioning NEXT_PUBLIC_SUPABASE_URL when URL is missing', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }), // any non-empty key value
        async (keyValue) => {
          vi.resetModules();
          // Set up env: URL missing, key present
          delete process.env.NEXT_PUBLIC_SUPABASE_URL;
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = keyValue;

          // Dynamic import to get fresh module
          const { validateSupabaseEnv } = await import('./supabase');

          try {
            validateSupabaseEnv();
            return false; // Should have thrown
          } catch (error) {
            const message = (error as Error).message;
            return message.includes('NEXT_PUBLIC_SUPABASE_URL');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should throw error mentioning NEXT_PUBLIC_SUPABASE_ANON_KEY when key is missing', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }), // any non-empty URL value
        async (urlValue) => {
          vi.resetModules();
          // Set up env: URL present, key missing
          process.env.NEXT_PUBLIC_SUPABASE_URL = urlValue;
          delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

          // Dynamic import to get fresh module
          const { validateSupabaseEnv } = await import('./supabase');

          try {
            validateSupabaseEnv();
            return false; // Should have thrown
          } catch (error) {
            const message = (error as Error).message;
            return message.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should throw error mentioning both variables when both are missing', async () => {
    vi.resetModules();
    // Clear both env vars
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const { validateSupabaseEnv } = await import('./supabase');

    try {
      validateSupabaseEnv();
      expect.fail('Should have thrown an error');
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toContain('NEXT_PUBLIC_SUPABASE_URL');
      expect(message).toContain('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
  });

  it('should return valid config when both variables are present', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }), // URL value
        fc.string({ minLength: 1 }), // Key value
        async (urlValue, keyValue) => {
          vi.resetModules();
          // Set up env: both present
          process.env.NEXT_PUBLIC_SUPABASE_URL = urlValue;
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = keyValue;

          // Dynamic import to get fresh module
          const { validateSupabaseEnv } = await import('./supabase');

          const result = validateSupabaseEnv();
          return result.supabaseUrl === urlValue && result.supabaseAnonKey === keyValue;
        }
      ),
      { numRuns: 100 }
    );
  });
});
