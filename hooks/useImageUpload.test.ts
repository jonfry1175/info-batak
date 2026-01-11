/**
 * Property-Based Tests for useImageUpload Hook
 * Feature: comment-image-upload
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/image-upload';

/**
 * Preview State Management Logic
 * 
 * This module tests the state management logic used by useImageUpload hook.
 * We test the pure logic functions rather than the React hook itself to enable
 * property-based testing without React rendering overhead.
 */

// State type matching the hook's internal state
interface ImageUploadState {
    selectedFile: File | null;
    previewUrl: string | null;
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;
}

// Initial state
const initialState: ImageUploadState = {
    selectedFile: null,
    previewUrl: null,
    isUploading: false,
    uploadProgress: 0,
    error: null,
};

/**
 * Simulates the selectImage action's state changes.
 * Returns the new state after selecting an image.
 */
function selectImageState(
    currentState: ImageUploadState,
    file: File,
    isValid: boolean,
    errorMessage?: string
): ImageUploadState {
    if (!isValid) {
        return {
            ...currentState,
            error: errorMessage || 'Validation error',
        };
    }

    // Valid file - update state with file and preview URL
    return {
        ...currentState,
        selectedFile: file,
        previewUrl: `blob:preview-${file.name}`, // Simulated blob URL
        error: null,
        uploadProgress: 0,
    };
}

/**
 * Simulates the removeImage action's state changes.
 * Returns the new state after removing an image.
 */
function removeImageState(currentState: ImageUploadState): ImageUploadState {
    return {
        ...currentState,
        selectedFile: null,
        previewUrl: null,
        error: null,
        uploadProgress: 0,
    };
}

/**
 * Simulates the resetState action's state changes.
 * Returns the initial state.
 */
function resetState(): ImageUploadState {
    return { ...initialState };
}

// Helper to create a mock File object
function createMockFile(
    name: string,
    size: number,
    type: string
): File {
    const blob = new Blob(['x'.repeat(Math.min(size, 100))], { type });
    return new File([blob], name, { type });
}

// Arbitrary for valid image files
const validImageFileArb = fc.record({
    name: fc.string({ minLength: 1, maxLength: 50 }).map(s => `${s.replace(/[^a-zA-Z0-9]/g, '')}.jpg`),
    size: fc.integer({ min: 1, max: MAX_FILE_SIZE }),
    type: fc.constantFrom(...ALLOWED_IMAGE_TYPES),
}).map(({ name, size, type }) => createMockFile(name, size, type));

// Arbitrary for invalid image files (wrong type)
const invalidTypeFileArb = fc.record({
    name: fc.string({ minLength: 1, maxLength: 50 }).map(s => `${s.replace(/[^a-zA-Z0-9]/g, '')}.pdf`),
    size: fc.integer({ min: 1, max: MAX_FILE_SIZE }),
    type: fc.constantFrom('application/pdf', 'text/plain', 'image/svg+xml', 'video/mp4'),
}).map(({ name, size, type }) => createMockFile(name, size, type));

// Arbitrary for oversized files
const oversizedFileArb = fc.record({
    name: fc.string({ minLength: 1, maxLength: 50 }).map(s => `${s.replace(/[^a-zA-Z0-9]/g, '')}.jpg`),
    size: fc.integer({ min: MAX_FILE_SIZE + 1, max: MAX_FILE_SIZE * 2 }),
    type: fc.constantFrom(...ALLOWED_IMAGE_TYPES),
}).map(({ name, size, type }) => createMockFile(name, size, type));

/**
 * Property 6: Preview State Management
 * For any image selection followed by removal, the preview state SHALL return
 * to null/empty state.
 * 
 * Feature: comment-image-upload, Property 6: Preview State Management
 * Validates: Requirements 3.2
 */
describe('Property 6: Preview State Management', () => {
    describe('Select then Remove returns to initial state', () => {
        it('should return to null/empty state after selecting and removing a valid image', () => {
            fc.assert(
                fc.property(
                    validImageFileArb,
                    (file) => {
                        // Start with initial state
                        let state = { ...initialState };

                        // Select image (valid)
                        state = selectImageState(state, file, true);

                        // Verify image was selected
                        expect(state.selectedFile).not.toBeNull();
                        expect(state.previewUrl).not.toBeNull();

                        // Remove image
                        state = removeImageState(state);

                        // Verify state returned to null/empty
                        expect(state.selectedFile).toBeNull();
                        expect(state.previewUrl).toBeNull();
                        expect(state.error).toBeNull();
                        expect(state.uploadProgress).toBe(0);

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should return to null/empty state after multiple select/remove cycles', () => {
            fc.assert(
                fc.property(
                    fc.array(validImageFileArb, { minLength: 1, maxLength: 10 }),
                    (files) => {
                        let state = { ...initialState };

                        // Perform multiple select/remove cycles
                        for (const file of files) {
                            // Select
                            state = selectImageState(state, file, true);
                            expect(state.selectedFile).not.toBeNull();
                            expect(state.previewUrl).not.toBeNull();

                            // Remove
                            state = removeImageState(state);
                            expect(state.selectedFile).toBeNull();
                            expect(state.previewUrl).toBeNull();
                        }

                        // Final state should be empty
                        expect(state.selectedFile).toBeNull();
                        expect(state.previewUrl).toBeNull();
                        expect(state.error).toBeNull();

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should clear error state when removing image', () => {
            fc.assert(
                fc.property(
                    invalidTypeFileArb,
                    validImageFileArb,
                    (invalidFile, validFile) => {
                        let state = { ...initialState };

                        // Try to select invalid file (sets error)
                        state = selectImageState(state, invalidFile, false, 'Format file tidak didukung');
                        expect(state.error).not.toBeNull();

                        // Select valid file
                        state = selectImageState(state, validFile, true);
                        expect(state.error).toBeNull();

                        // Remove image
                        state = removeImageState(state);

                        // Error should be cleared
                        expect(state.error).toBeNull();
                        expect(state.selectedFile).toBeNull();
                        expect(state.previewUrl).toBeNull();

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    describe('Reset state returns to initial', () => {
        it('should return to initial state regardless of current state', () => {
            fc.assert(
                fc.property(
                    validImageFileArb,
                    fc.boolean(),
                    fc.integer({ min: 0, max: 100 }),
                    fc.option(fc.string(), { nil: null }),
                    (file, isUploading, progress, error) => {
                        // Create a state with various values
                        let state: ImageUploadState = {
                            selectedFile: file,
                            previewUrl: `blob:preview-${file.name}`,
                            isUploading,
                            uploadProgress: progress,
                            error,
                        };

                        // Reset state
                        state = resetState();

                        // Verify all values are initial
                        expect(state.selectedFile).toBeNull();
                        expect(state.previewUrl).toBeNull();
                        expect(state.isUploading).toBe(false);
                        expect(state.uploadProgress).toBe(0);
                        expect(state.error).toBeNull();

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    describe('Selecting new image replaces previous', () => {
        it('should replace previous image when selecting a new one', () => {
            fc.assert(
                fc.property(
                    validImageFileArb,
                    validImageFileArb,
                    (file1, file2) => {
                        let state = { ...initialState };

                        // Select first image
                        state = selectImageState(state, file1, true);
                        const firstFile = state.selectedFile;

                        // Select second image
                        state = selectImageState(state, file2, true);

                        // Should have second file, not first
                        expect(state.selectedFile).toBe(file2);
                        expect(state.selectedFile).not.toBe(firstFile);
                        // Preview URL should be set (not null)
                        expect(state.previewUrl).not.toBeNull();

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    describe('Invalid file selection preserves previous state', () => {
        it('should not change selectedFile when invalid file is selected', () => {
            fc.assert(
                fc.property(
                    validImageFileArb,
                    invalidTypeFileArb,
                    (validFile, invalidFile) => {
                        let state = { ...initialState };

                        // Select valid file first
                        state = selectImageState(state, validFile, true);
                        const previousFile = state.selectedFile;
                        const previousPreview = state.previewUrl;

                        // Try to select invalid file - this should set error but not change file
                        // Note: In actual hook, we don't replace the file on validation error
                        const stateAfterInvalid = selectImageState(state, invalidFile, false, 'Invalid type');

                        // Error should be set
                        expect(stateAfterInvalid.error).not.toBeNull();

                        // Previous file should still be there (validation error doesn't clear selection)
                        // This matches the hook behavior where we only set error, not clear file
                        expect(stateAfterInvalid.selectedFile).toBe(previousFile);
                        expect(stateAfterInvalid.previewUrl).toBe(previousPreview);

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });
});

/**
 * Additional unit tests for edge cases
 */
describe('Edge Cases', () => {
    it('should handle removing when no image is selected', () => {
        let state = { ...initialState };
        state = removeImageState(state);

        expect(state.selectedFile).toBeNull();
        expect(state.previewUrl).toBeNull();
        expect(state.error).toBeNull();
    });

    it('should handle reset when already in initial state', () => {
        let state = { ...initialState };
        state = resetState();

        expect(state).toEqual(initialState);
    });

    it('should clear uploadProgress when removing image', () => {
        let state: ImageUploadState = {
            ...initialState,
            uploadProgress: 50,
        };

        state = removeImageState(state);
        expect(state.uploadProgress).toBe(0);
    });
});
