-- ============================================================================
-- Migration: 009_comment_images_storage.sql
-- Description: Creates storage bucket and RLS policies for comment images
-- Requirements: 4.1 (Storage bucket), 4.3 (RLS for upload), 4.4 (Public read)
-- ============================================================================

-- Create storage bucket for comment images with public access
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'comment-images', 
  'comment-images', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================================================
-- Storage RLS Policies
-- ============================================================================

-- Policy: Only authenticated users can upload images
-- Path structure: {user_id}/{uuid}.{extension}
CREATE POLICY "Authenticated users can upload comment images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'comment-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Anyone can view comment images (public bucket)
CREATE POLICY "Anyone can view comment images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'comment-images');

-- Policy: Users can update their own images
CREATE POLICY "Users can update own comment images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'comment-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'comment-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can delete their own images
CREATE POLICY "Users can delete own comment images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'comment-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
