/**
 * Image Upload Utilities for Comment Images
 * Handles file validation, storage path generation, and Supabase Storage operations
 */

import { getSupabaseClient } from './supabase';

// ============================================================================
// Constants
// ============================================================================

export const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const STORAGE_BUCKET = 'comment-images';

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

// ============================================================================
// Error Types and Messages
// ============================================================================

export type ImageUploadError =
    | 'INVALID_TYPE'
    | 'FILE_TOO_LARGE'
    | 'NO_FILE'
    | 'AUTH_REQUIRED'
    | 'UPLOAD_FAILED'
    | 'DELETE_FAILED';

export const imageErrorMessages: Record<ImageUploadError, string> = {
    INVALID_TYPE: 'Format file tidak didukung. Gunakan JPEG, PNG, GIF, atau WebP.',
    FILE_TOO_LARGE: 'Ukuran file terlalu besar. Maksimal 5MB.',
    NO_FILE: 'Tidak ada file yang dipilih.',
    AUTH_REQUIRED: 'Silakan login untuk mengupload gambar.',
    UPLOAD_FAILED: 'Gagal mengupload gambar. Silakan coba lagi.',
    DELETE_FAILED: 'Gagal menghapus gambar.',
};

// ============================================================================
// Validation Types
// ============================================================================

export interface ImageValidationResult {
    valid: boolean;
    error?: ImageUploadError;
}

export interface ImageUploadResult {
    url: string | null;
    error: ImageUploadError | null;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates if the file type is an allowed image type.
 * @param mimeType - The MIME type of the file
 * @returns true if the MIME type is allowed
 */
export function isAllowedImageType(mimeType: string): mimeType is AllowedImageType {
    return ALLOWED_IMAGE_TYPES.includes(mimeType as AllowedImageType);
}

/**
 * Validates if the file size is within the allowed limit.
 * @param size - The file size in bytes
 * @returns true if the file size is within limit
 */
export function isFileSizeValid(size: number): boolean {
    return size > 0 && size <= MAX_FILE_SIZE;
}

/**
 * Validates an image file for type and size.
 * @param file - The file to validate (or a partial file-like object for testing)
 * @returns Validation result with valid flag and optional error code
 */
export function validateImageFile(
    file: { type: string; size: number } | null | undefined
): ImageValidationResult {
    if (!file) {
        return { valid: false, error: 'NO_FILE' };
    }

    if (!isAllowedImageType(file.type)) {
        return { valid: false, error: 'INVALID_TYPE' };
    }

    if (!isFileSizeValid(file.size)) {
        return { valid: false, error: 'FILE_TOO_LARGE' };
    }

    return { valid: true };
}

// ============================================================================
// Storage Path Generation
// ============================================================================

/**
 * Extracts the file extension from a filename or MIME type.
 * @param filename - The filename or MIME type
 * @returns The file extension (without dot)
 */
export function getFileExtension(filename: string): string {
    // Handle MIME types
    if (filename.startsWith('image/')) {
        const mimeExt = filename.split('/')[1];
        return mimeExt === 'jpeg' ? 'jpg' : mimeExt;
    }

    // Handle filenames
    const parts = filename.split('.');
    if (parts.length > 1) {
        const ext = parts.pop()?.toLowerCase() || '';
        return ext === 'jpeg' ? 'jpg' : ext;
    }

    return '';
}

/**
 * Generates a unique storage path for an image.
 * Format: {user_id}/{uuid}.{extension}
 * @param userId - The user's UUID
 * @param filenameOrMimeType - The original filename or MIME type
 * @returns The storage path
 */
export function generateStoragePath(userId: string, filenameOrMimeType: string): string {
    const uuid = crypto.randomUUID();
    const extension = getFileExtension(filenameOrMimeType);
    return `${userId}/${uuid}.${extension}`;
}

// ============================================================================
// Supabase Storage Operations
// ============================================================================

/**
 * Uploads an image to Supabase Storage.
 * @param file - The file to upload
 * @param userId - The user's UUID
 * @returns Upload result with URL or error
 */
export async function uploadImage(
    file: File,
    userId: string
): Promise<ImageUploadResult> {
    // Validate file first
    const validation = validateImageFile(file);
    if (!validation.valid) {
        return { url: null, error: validation.error || 'UPLOAD_FAILED' };
    }

    const supabase = getSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { url: null, error: 'AUTH_REQUIRED' };
    }

    // Generate storage path
    const storagePath = generateStoragePath(userId, file.name || file.type);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) {
        console.error('Upload error:', uploadError);
        return { url: null, error: 'UPLOAD_FAILED' };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(storagePath);

    return { url: publicUrl, error: null };
}

/**
 * Deletes an image from Supabase Storage.
 * @param imageUrl - The public URL of the image to delete
 * @returns true if deletion was successful, false otherwise
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
    if (!imageUrl) {
        return false;
    }

    const supabase = getSupabaseClient();

    // Extract storage path from URL
    // URL format: https://{project}.supabase.co/storage/v1/object/public/comment-images/{path}
    const storagePath = extractStoragePathFromUrl(imageUrl);
    if (!storagePath) {
        console.error('Could not extract storage path from URL:', imageUrl);
        return false;
    }

    const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([storagePath]);

    if (error) {
        console.error('Delete error:', error);
        return false;
    }

    return true;
}

/**
 * Extracts the storage path from a Supabase Storage public URL.
 * @param url - The public URL
 * @returns The storage path or null if extraction fails
 */
export function extractStoragePathFromUrl(url: string): string | null {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');

        // Find the bucket name in the path and get everything after it
        const bucketIndex = pathParts.indexOf(STORAGE_BUCKET);
        if (bucketIndex === -1) {
            return null;
        }

        // Join everything after the bucket name
        const storagePath = pathParts.slice(bucketIndex + 1).join('/');
        return storagePath || null;
    } catch {
        return null;
    }
}
