-- ============================================================================
-- Migration: 003_comment_likes.sql
-- Description: Creates the comment_likes table for tracking likes on comments
-- Requirements: 8.1
-- ============================================================================

-- Create comment_likes table for storing user likes on comments
CREATE TABLE IF NOT EXISTS public.comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Unique constraint: one like per user per comment
  CONSTRAINT unique_user_comment_like UNIQUE (user_id, comment_id)
);

-- Add comments for documentation
COMMENT ON TABLE public.comment_likes IS 'Tracks user likes on comments';
COMMENT ON COLUMN public.comment_likes.id IS 'Unique identifier for the like';
COMMENT ON COLUMN public.comment_likes.user_id IS 'References auth.users(id), the user who liked';
COMMENT ON COLUMN public.comment_likes.comment_id IS 'References comments(id), the liked comment';
COMMENT ON COLUMN public.comment_likes.created_at IS 'Timestamp when like was created';

-- ============================================================================
-- Indexes for performance
-- ============================================================================

-- Index for counting likes per comment
CREATE INDEX idx_comment_likes_comment_id ON public.comment_likes(comment_id);
