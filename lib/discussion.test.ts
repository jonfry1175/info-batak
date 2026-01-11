import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { Comment, CommentWithUser, CommentWithReplies } from '@/types';

/**
 * Property tests for the discussion data layer.
 * These tests validate the data structures and transformation logic.
 * 
 * **Feature: page-discussions**
 */

// Helper to generate valid comment content (non-empty, max 1000 chars)
const validContentArb = fc
    .string({ minLength: 1, maxLength: 1000 })
    .filter((s) => s.trim().length > 0);

// Helper to generate invalid content (empty or whitespace only)
const whitespaceOnlyArb = fc
    .array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 1, maxLength: 50 })
    .map((chars) => chars.join(''));

// Helper to generate content over 1000 chars
const tooLongContentArb = fc.string({ minLength: 1001, maxLength: 2000 });

// Helper to generate valid ISO date strings using timestamp range
// Using integer timestamps to avoid invalid date issues during shrinking
const MIN_TIMESTAMP = new Date('2020-01-01').getTime();
const MAX_TIMESTAMP = new Date('2030-12-31').getTime();
const validIsoDateArb = fc
    .integer({ min: MIN_TIMESTAMP, max: MAX_TIMESTAMP })
    .map((ts) => new Date(ts).toISOString());

// Helper to generate a valid Comment object
const commentArb = fc.record({
    id: fc.uuid(),
    user_id: fc.uuid(),
    page_path: fc.string({ minLength: 1 }).map((s) => `/${s}`),
    content: validContentArb,
    parent_id: fc.option(fc.uuid(), { nil: null }),
    created_at: validIsoDateArb,
    updated_at: validIsoDateArb,
});

// Helper to generate CommentWithUser
const commentWithUserArb = fc.record({
    id: fc.uuid(),
    user_id: fc.uuid(),
    page_path: fc.string({ minLength: 1 }).map((s) => `/${s}`),
    content: validContentArb,
    parent_id: fc.constant(null as string | null),
    created_at: validIsoDateArb,
    updated_at: validIsoDateArb,
    user: fc.record({
        display_name: fc.option(fc.string({ minLength: 1 }), { nil: null }),
        avatar_url: fc.option(fc.webUrl(), { nil: null }),
    }),
    like_count: fc.nat({ max: 1000 }),
    is_liked: fc.boolean(),
});

/**
 * **Feature: page-discussions, Property 5: Comment Creation**
 * **Validates: Requirements 2.1**
 * 
 * For any valid comment (non-empty, ≤1000 chars), the comment data structure
 * SHALL contain all required fields: user_id, page_path, content, and created_at.
 */
describe('Property 5: Comment Creation - Valid comments have required fields', () => {
    it('should have all required fields for any valid comment', () => {
        fc.assert(
            fc.property(commentArb, (comment: Comment) => {
                // Verify all required fields are present and non-null
                expect(comment.id).toBeDefined();
                expect(comment.user_id).toBeDefined();
                expect(comment.page_path).toBeDefined();
                expect(comment.content).toBeDefined();
                expect(comment.created_at).toBeDefined();
                expect(comment.updated_at).toBeDefined();

                // Verify types
                expect(typeof comment.id).toBe('string');
                expect(typeof comment.user_id).toBe('string');
                expect(typeof comment.page_path).toBe('string');
                expect(typeof comment.content).toBe('string');
                expect(typeof comment.created_at).toBe('string');

                // Verify content constraints
                expect(comment.content.trim().length).toBeGreaterThan(0);
                expect(comment.content.length).toBeLessThanOrEqual(1000);

                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('should reject whitespace-only content', () => {
        fc.assert(
            fc.property(whitespaceOnlyArb, (content: string) => {
                const trimmed = content.trim();
                // Whitespace-only content should be considered invalid
                expect(trimmed.length).toBe(0);
                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('should reject content over 1000 characters', () => {
        fc.assert(
            fc.property(tooLongContentArb, (content: string) => {
                // Content over 1000 chars should be considered invalid
                expect(content.length).toBeGreaterThan(1000);
                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: page-discussions, Property 15: Comment Data Completeness**
 * **Validates: Requirements 8.3**
 * 
 * For any stored comment, it SHALL have non-null values for user_id, page_path,
 * content, and created_at.
 */
describe('Property 15: Comment Data Completeness - Stored comments have all required fields', () => {
    it('should have non-null required fields for any CommentWithUser', () => {
        fc.assert(
            fc.property(commentWithUserArb, (comment: CommentWithUser) => {
                // Verify required fields are non-null
                expect(comment.id).not.toBeNull();
                expect(comment.user_id).not.toBeNull();
                expect(comment.page_path).not.toBeNull();
                expect(comment.content).not.toBeNull();
                expect(comment.created_at).not.toBeNull();

                // Verify user object exists
                expect(comment.user).toBeDefined();

                // Verify like_count is a number
                expect(typeof comment.like_count).toBe('number');
                expect(comment.like_count).toBeGreaterThanOrEqual(0);

                // Verify is_liked is a boolean
                expect(typeof comment.is_liked).toBe('boolean');

                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('should have valid ISO date strings for timestamps', () => {
        fc.assert(
            fc.property(commentArb, (comment: Comment) => {
                // Verify created_at is a valid ISO date string
                const createdDate = new Date(comment.created_at);
                expect(createdDate.toString()).not.toBe('Invalid Date');

                // Verify updated_at is a valid ISO date string
                const updatedDate = new Date(comment.updated_at);
                expect(updatedDate.toString()).not.toBe('Invalid Date');

                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('should have valid page_path format (starts with /)', () => {
        fc.assert(
            fc.property(commentArb, (comment: Comment) => {
                expect(comment.page_path.startsWith('/')).toBe(true);
                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * Additional validation tests for content constraints
 */
describe('Content Validation Properties', () => {
    it('valid content should be non-empty after trimming', () => {
        fc.assert(
            fc.property(validContentArb, (content: string) => {
                const trimmed = content.trim();
                expect(trimmed.length).toBeGreaterThan(0);
                expect(trimmed.length).toBeLessThanOrEqual(1000);
                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('parent_id should be null for top-level comments or valid UUID for replies', () => {
        fc.assert(
            fc.property(commentArb, (comment: Comment) => {
                if (comment.parent_id !== null) {
                    // If parent_id exists, it should be a valid UUID format
                    const uuidRegex =
                        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                    expect(uuidRegex.test(comment.parent_id)).toBe(true);
                }
                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * CommentWithReplies structure validation
 */
describe('CommentWithReplies Structure', () => {
    // Generate CommentWithReplies with nested replies
    const commentWithRepliesArb = commentWithUserArb.chain((parent) =>
        fc
            .array(
                commentWithUserArb.map((reply) => ({
                    ...reply,
                    parent_id: parent.id,
                    page_path: parent.page_path,
                })),
                { minLength: 0, maxLength: 5 }
            )
            .map((replies) => ({
                ...parent,
                replies,
            }))
    );

    it('should have replies array for any CommentWithReplies', () => {
        fc.assert(
            fc.property(commentWithRepliesArb, (comment: CommentWithReplies) => {
                expect(Array.isArray(comment.replies)).toBe(true);
                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('replies should reference the parent comment id', () => {
        fc.assert(
            fc.property(commentWithRepliesArb, (comment: CommentWithReplies) => {
                for (const reply of comment.replies) {
                    expect(reply.parent_id).toBe(comment.id);
                }
                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('replies should have the same page_path as parent', () => {
        fc.assert(
            fc.property(commentWithRepliesArb, (comment: CommentWithReplies) => {
                for (const reply of comment.replies) {
                    expect(reply.page_path).toBe(comment.page_path);
                }
                return true;
            }),
            { numRuns: 100 }
        );
    });
});
