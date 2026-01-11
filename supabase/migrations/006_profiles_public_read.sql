-- ============================================================================
-- Migration: 006_profiles_public_read.sql
-- Description: Allow public read access to profiles for displaying comment authors
-- Requirements: 1.2 (display user info with comments)
-- ============================================================================

-- Policy: Anyone can view basic profile info (for comment author display)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles
  FOR SELECT
  USING (true);
