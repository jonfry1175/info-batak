/**
 * Property-Based Tests for Image Upload Utilities
 * Feature: comment-image-upload
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
    validateImageFile,
    isAllowedImageType,
    isFileSizeValid,
    generateStoragePath,
    getFileExtension,
    ALLOWED_IMAGE_TYPES,
    MAX_FILE_SIZE,
} from './image-upload';

describe('Image Upload Properties', () => {
    /**
     * Property 1: File Type Validation
     * For any file with a MIME type, the validation function SHALL return valid=true
     * only if the MIME type is one of: image/jpeg, image/png, image/gif, or image/webp.
     * 
     * Feature: comment-image-upload, Property 1: File Type Validation
     * Validates: Requirements 1.2
     */
    describe('Property 1: File Type Validation', () => {
        it('should only accept allowed image types', () => {
            const allowedTypes = [...ALLOWED_IMAGE_TYPES];

            fc.assert(
                fc.property(
                    fc.oneof(
                        // Generate allowed types
                        fc.constantFrom(...allowedTypes),
                        // Generate random strings that are not allowed types
                        fc.string().filter(s => !allowedTypes.includes(s as typeof allowedTypes[number]))
                    ),
                    (mimeType) => {
                        const result = validateImageFile({ type: mimeType, size: 1000 });

                        if (allowedTypes.includes(mimeType as typeof allowedTypes[number])) {
                            // Allowed types should pass validation
                            return result.valid === true;
                        } else {
                            // Non-allowed types should fail with INVALID_TYPE error
                            return result.valid === false && result.error === 'INVALID_TYPE';
                        }
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('isAllowedImageType returns true only for allowed MIME types', () => {
            const allowedTypes = [...ALLOWED_IMAGE_TYPES];

            fc.assert(
                fc.property(
                    fc.string(),
                    (mimeType) => {
                        const result = isAllowedImageType(mimeType);
                        return result === allowedTypes.includes(mimeType as typeof allowedTypes[number]);
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * Property 2: File Size Validation
     * For any file, the validation function SHALL return valid=true
     * only if the file size is less than or equal to 5MB (5,242,880 bytes).
     * 
     * Feature: comment-image-upload, Property 2: File Size Validation
     * Validates: Requirements 1.3
     */
    describe('Property 2: File Size Validation', () => {
        it('should only accept files within size limit', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 0, max: MAX_FILE_SIZE * 2 }),
                    (size) => {
                        const result = validateImageFile({ type: 'image/jpeg', size });

                        if (size > 0 && size <= MAX_FILE_SIZE) {
                            // Valid size should pass
                            return result.valid === true;
                        } else {
                            // Invalid size should fail with FILE_TOO_LARGE error
                            return result.valid === false && result.error === 'FILE_TOO_LARGE';
                        }
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('isFileSizeValid returns true only for valid sizes', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: -1000, max: MAX_FILE_SIZE * 2 }),
                    (size) => {
                        const result = isFileSizeValid(size);
                        const expected = size > 0 && size <= MAX_FILE_SIZE;
                        return result === expected;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should accept files at exactly 5MB', () => {
            const result = validateImageFile({ type: 'image/png', size: MAX_FILE_SIZE });
            expect(result.valid).toBe(true);
        });

        it('should reject files just over 5MB', () => {
            const result = validateImageFile({ type: 'image/png', size: MAX_FILE_SIZE + 1 });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('FILE_TOO_LARGE');
        });
    });

    /**
     * Property 4: Unique Filename Generation
     * For any two calls to the filename generator, the generated filenames SHALL be unique.
     * 
     * Feature: comment-image-upload, Property 4: Unique Filename Generation
     * Validates: Requirements 4.2
     */
    describe('Property 4: Unique Filename Generation', () => {
        it('should generate unique filenames for multiple calls', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 2, max: 50 }),
                    fc.uuid(),
                    fc.constantFrom('jpg', 'png', 'gif', 'webp'),
                    (count, userId, extension) => {
                        const filenames = new Set<string>();
                        for (let i = 0; i < count; i++) {
                            filenames.add(generateStoragePath(userId, `test.${extension}`));
                        }
                        // All generated filenames should be unique
                        return filenames.size === count;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * Property 5: Storage Path Structure
     * For any generated storage path, it SHALL follow the pattern {user_id}/{uuid}.{extension}
     * where user_id is a valid UUID, uuid is a valid UUID, and extension matches the original file extension.
     * 
     * Feature: comment-image-upload, Property 5: Storage Path Structure
     * Validates: Requirements 4.5
     */
    describe('Property 5: Storage Path Structure', () => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        it('should generate paths with correct structure', () => {
            fc.assert(
                fc.property(
                    fc.uuid(),
                    fc.constantFrom('image/jpeg', 'image/png', 'image/gif', 'image/webp'),
                    (userId, mimeType) => {
                        const path = generateStoragePath(userId, mimeType);
                        const parts = path.split('/');

                        // Should have exactly 2 parts: userId and filename
                        if (parts.length !== 2) return false;

                        const [pathUserId, filename] = parts;

                        // User ID should match
                        if (pathUserId !== userId) return false;

                        // Filename should have UUID and extension
                        const filenameParts = filename.split('.');
                        if (filenameParts.length !== 2) return false;

                        const [fileUuid, extension] = filenameParts;

                        // UUID should be valid
                        if (!uuidRegex.test(fileUuid)) return false;

                        // Extension should match expected
                        const expectedExt = getFileExtension(mimeType);
                        if (extension !== expectedExt) return false;

                        return true;
                    }
                ),
                { numRuns: 100 }
            );
        });

        it('should handle filename input correctly', () => {
            fc.assert(
                fc.property(
                    fc.uuid(),
                    fc.constantFrom('photo.jpg', 'image.png', 'animation.gif', 'picture.webp'),
                    (userId, filename) => {
                        const path = generateStoragePath(userId, filename);
                        const parts = path.split('/');

                        if (parts.length !== 2) return false;

                        const [pathUserId, generatedFilename] = parts;

                        // User ID should match
                        if (pathUserId !== userId) return false;

                        // Should have correct extension
                        const originalExt = filename.split('.').pop();
                        const generatedExt = generatedFilename.split('.').pop();

                        return originalExt === generatedExt;
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    // Unit tests for edge cases
    describe('Edge Cases', () => {
        it('should return NO_FILE error for null input', () => {
            const result = validateImageFile(null);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('NO_FILE');
        });

        it('should return NO_FILE error for undefined input', () => {
            const result = validateImageFile(undefined);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('NO_FILE');
        });

        it('should handle jpeg extension correctly', () => {
            expect(getFileExtension('image/jpeg')).toBe('jpg');
            expect(getFileExtension('photo.jpeg')).toBe('jpg');
        });

        it('should handle various file extensions', () => {
            expect(getFileExtension('image/png')).toBe('png');
            expect(getFileExtension('image/gif')).toBe('gif');
            expect(getFileExtension('image/webp')).toBe('webp');
        });
    });
});
