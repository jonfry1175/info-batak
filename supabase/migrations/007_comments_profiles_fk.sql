-- ============================================================================
-- Migration: 007_comments_profiles_fk.sql
-- Description: Add foreign key from comments to profiles for proper joins
-- Requirements: 1.2 (display user info with comments)
-- ============================================================================

-- Add foreign key constraint from comments.user_id to profiles.id
-- This allows Supabase to properly join comments with profiles
ALTER TABLE public.comments
  ADD CONSTRAINT comments_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
