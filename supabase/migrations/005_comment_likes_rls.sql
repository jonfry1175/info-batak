-- ============================================================================
-- Migration: 005_comment_likes_rls.sql
-- Description: Row Level Security policies for comment_likes table
-- Requirements: 8.2, 4.5
-- ============================================================================

-- Enable Row Level Security on comment_likes table
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS Policies for comment_likes table
-- ============================================================================

-- Policy: Anyone can read likes (including guests)
CREATE POLICY "Likes are viewable by everyone"
  ON public.comment_likes
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can like comments (but not their own)
-- Requirement 4.5: Users cannot like their own comments
CREATE POLICY "Users can like comments except their own"
  ON public.comment_likes
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM public.comments
      WHERE id = comment_id AND user_id = auth.uid()
    )
  );

-- Policy: Users can only remove their own likes (unlike)
CREATE POLICY "Users can remove own likes"
  ON public.comment_likes
  FOR DELETE
  USING (auth.uid() = user_id);
