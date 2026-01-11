-- ============================================================================
-- Migration: 008_comments_image_url.sql
-- Description: Adds image_url column to comments table for image attachments
-- Requirements: 4.1 (Storage bucket for comment images)
-- ============================================================================

-- Add image_url column to comments table
ALTER TABLE public.comments 
ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.comments.image_url IS 'URL of attached image stored in Supabase Storage, NULL if no image';

-- ============================================================================
-- Index for performance
-- ============================================================================

-- Partial index for queries that filter by image presence
-- This optimizes queries like "get all comments with images"
CREATE INDEX IF NOT EXISTS idx_comments_image_url 
ON public.comments(image_url) 
WHERE image_url IS NOT NULL;
