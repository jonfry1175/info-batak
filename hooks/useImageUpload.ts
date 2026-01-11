'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
    validateImageFile,
    uploadImage as uploadImageToStorage,
    imageErrorMessages,
    type ImageUploadError,
    type ImageValidationResult,
} from '@/lib/image-upload';
import { getSupabaseClient } from '@/lib/supabase';

/**
 * Return type for the useImageUpload hook
 * Requirements: 1.6, 3.1, 3.2, 5.2, 5.3
 */
export interface UseImageUploadReturn {
    // State
    selectedFile: File | null;
    previewUrl: string | null;
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;

    // Actions
    selectImage: (file: File) => ImageValidationResult;
    removeImage: () => void;
    uploadImage: () => Promise<string | null>;
    resetState: () => void;
}

/**
 * Custom hook for managing image upload state and operations.
 * 
 * Requirements:
 * - 1.6: Display preview of image before submission
 * - 3.1: Provide remove button for preview
 * - 3.2: Remove image from pending upload when clicked
 * - 5.2: Show progress indicator during upload
 * - 5.3: Disable submit while uploading
 */
export function useImageUpload(): UseImageUploadReturn {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Ref to track if component is mounted
    const isMountedRef = useRef(true);
    // Ref to store the current preview URL for cleanup
    const previewUrlRef = useRef<string | null>(null);

    /**
     * Cleans up the preview URL by revoking the object URL
     */
    const cleanupPreviewUrl = useCallback(() => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
    }, []);

    /**
     * Selects an image file and generates a preview URL.
     * Validates the file before accepting it.
     * Requirements: 1.6
     */
    const selectImage = useCallback((file: File): ImageValidationResult => {
        // Clear any previous error
        setError(null);

        // Validate the file
        const validation = validateImageFile(file);

        if (!validation.valid) {
            // Set error message in Indonesian
            const errorMessage = validation.error
                ? imageErrorMessages[validation.error]
                : imageErrorMessages.UPLOAD_FAILED;
            setError(errorMessage);
            return validation;
        }

        // Clean up previous preview URL
        cleanupPreviewUrl();

        // Generate new preview URL
        const newPreviewUrl = URL.createObjectURL(file);
        previewUrlRef.current = newPreviewUrl;

        // Update state
        setSelectedFile(file);
        setPreviewUrl(newPreviewUrl);
        setUploadProgress(0);

        return validation;
    }, [cleanupPreviewUrl]);

    /**
     * Removes the selected image and cleans up the preview URL.
     * Requirements: 3.1, 3.2
     */
    const removeImage = useCallback(() => {
        cleanupPreviewUrl();
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
        setUploadProgress(0);
    }, [cleanupPreviewUrl]);

    /**
     * Resets all state to initial values.
     */
    const resetState = useCallback(() => {
        cleanupPreviewUrl();
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsUploading(false);
        setUploadProgress(0);
        setError(null);
    }, [cleanupPreviewUrl]);

    /**
     * Uploads the selected image to Supabase Storage.
     * Returns the public URL on success, null on failure.
     * Requirements: 5.2, 5.3
     */
    const uploadImage = useCallback(async (): Promise<string | null> => {
        if (!selectedFile) {
            setError(imageErrorMessages.NO_FILE);
            return null;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setError(null);

        try {
            // Get current user
            const supabase = getSupabaseClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setError(imageErrorMessages.AUTH_REQUIRED);
                setIsUploading(false);
                return null;
            }

            // Simulate progress (Supabase doesn't provide upload progress)
            // Start at 10% to show activity
            setUploadProgress(10);

            // Upload the image
            const result = await uploadImageToStorage(selectedFile, user.id);

            if (!isMountedRef.current) return null;

            // Update progress to 90% before final state update
            setUploadProgress(90);

            if (result.error) {
                const errorMessage = imageErrorMessages[result.error];
                setError(errorMessage);
                setIsUploading(false);
                setUploadProgress(0);
                return null;
            }

            // Success - set progress to 100%
            setUploadProgress(100);
            setIsUploading(false);

            return result.url;
        } catch (err) {
            if (!isMountedRef.current) return null;

            console.error('Upload error:', err);
            setError(imageErrorMessages.UPLOAD_FAILED);
            setIsUploading(false);
            setUploadProgress(0);
            return null;
        }
    }, [selectedFile]);

    /**
     * Cleanup preview URL on unmount
     */
    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
            // Clean up preview URL when component unmounts
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }
        };
    }, []);

    return {
        selectedFile,
        previewUrl,
        isUploading,
        uploadProgress,
        error,
        selectImage,
        removeImage,
        uploadImage,
        resetState,
    };
}

export default useImageUpload;
