-- ============================================================================
-- Migration: 004_comments_rls.sql
-- Description: Row Level Security policies for comments table
-- Requirements: 8.2
-- ============================================================================

-- Enable Row Level Security on comments table
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS Policies for comments table
-- ============================================================================

-- Policy: Anyone can read comments (including guests)
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can create comments (user_id must match auth.uid())
CREATE POLICY "Authenticated users can create comments"
  ON public.comments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own comments
CREATE POLICY "Users can delete own comments"
  ON public.comments
  FOR DELETE
  USING (auth.uid() = user_id);
