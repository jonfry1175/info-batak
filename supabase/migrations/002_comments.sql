-- ============================================================================
-- Migration: 002_comments.sql
-- Description: Creates the comments table for page discussions
-- Requirements: 8.1, 8.3
-- ============================================================================

-- Create comments table for storing user comments on pages
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 1000 AND char_length(content) > 0),
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add comments for documentation
COMMENT ON TABLE public.comments IS 'User comments for page discussions';
COMMENT ON COLUMN public.comments.id IS 'Unique identifier for the comment';
COMMENT ON COLUMN public.comments.user_id IS 'References auth.users(id), the comment author';
COMMENT ON COLUMN public.comments.page_path IS 'URL path of the page (e.g., /sejarah/toba)';
COMMENT ON COLUMN public.comments.content IS 'Comment text content, max 1000 characters';
COMMENT ON COLUMN public.comments.parent_id IS 'References parent comment for replies, NULL for top-level comments';
COMMENT ON COLUMN public.comments.created_at IS 'Timestamp when comment was created';
COMMENT ON COLUMN public.comments.updated_at IS 'Timestamp when comment was last updated';

-- ============================================================================
-- Indexes for performance
-- ============================================================================

-- Index for fetching comments by page
CREATE INDEX idx_comments_page_path ON public.comments(page_path);

-- Index for fetching replies by parent
CREATE INDEX idx_comments_parent_id ON public.comments(parent_id);

-- Index for sorting by creation time (newest first)
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);

-- ============================================================================
-- Trigger: Auto-update updated_at timestamp
-- ============================================================================

-- Trigger to automatically update updated_at on comment changes
DROP TRIGGER IF EXISTS on_comment_updated ON public.comments;
CREATE TRIGGER on_comment_updated
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
