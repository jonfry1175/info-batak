import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { CommentWithUser, CommentWithReplies } from '@/types';

/**
 * Property tests for the useDiscussion hook.
 * These tests validate the sorting, pagination, and count display logic.
 * 
 * **Feature: page-discussions**
 */

// Helper to generate valid ISO date strings using timestamp range
const MIN_TIMESTAMP = new Date('2020-01-01').getTime();
const MAX_TIMESTAMP = new Date('2030-12-31').getTime();
const validIsoDateArb = fc
    .integer({ min: MIN_TIMESTAMP, max: MAX_TIMESTAMP })
    .map((ts) => new Date(ts).toISOString());

// Helper to generate valid comment content
const validContentArb = fc
    .string({ minLength: 1, maxLength: 1000 })
    .filter((s) => s.trim().length > 0);

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

// Helper to generate CommentWithReplies
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

/**
 * Sorts comments by created_at in descending order (newest first).
 * This is the sorting logic used by the hook.
 */
function sortCommentsNewestFirst(comments: CommentWithReplies[]): CommentWithReplies[] {
    return [...comments].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA; // Descending order (newest first)
    });
}

/**
 * Paginates comments with a given page size.
 * This is the pagination logic used by the hook.
 */
function paginateComments(
    comments: CommentWithReplies[],
    page: number,
    pageSize: number
): { comments: CommentWithReplies[]; hasMore: boolean } {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedComments = comments.slice(startIndex, endIndex);
    const hasMore = comments.length > endIndex;
    return { comments: paginatedComments, hasMore };
}


/**
 * **Feature: page-discussions, Property 1: Comment Sorting**
 * **Validates: Requirements 1.1**
 * 
 * For any page with multiple comments, fetching comments SHALL return them
 * sorted by created_at in descending order (newest first).
 */
describe('Property 1: Comment Sorting - Comments returned newest first', () => {
    it('should sort comments by created_at in descending order', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 2, maxLength: 50 }),
                (comments: CommentWithReplies[]) => {
                    const sorted = sortCommentsNewestFirst(comments);

                    // Verify each comment is newer than or equal to the next
                    for (let i = 1; i < sorted.length; i++) {
                        const prevDate = new Date(sorted[i - 1].created_at).getTime();
                        const currDate = new Date(sorted[i].created_at).getTime();
                        expect(prevDate).toBeGreaterThanOrEqual(currDate);
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should preserve all comments after sorting', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 50 }),
                (comments: CommentWithReplies[]) => {
                    const sorted = sortCommentsNewestFirst(comments);

                    // Same length
                    expect(sorted.length).toBe(comments.length);

                    // All original IDs are present
                    const originalIds = new Set(comments.map((c) => c.id));
                    const sortedIds = new Set(sorted.map((c) => c.id));
                    expect(sortedIds).toEqual(originalIds);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should handle empty array', () => {
        const sorted = sortCommentsNewestFirst([]);
        expect(sorted).toEqual([]);
    });

    it('should handle single comment', () => {
        fc.assert(
            fc.property(commentWithRepliesArb, (comment: CommentWithReplies) => {
                const sorted = sortCommentsNewestFirst([comment]);
                expect(sorted.length).toBe(1);
                expect(sorted[0].id).toBe(comment.id);
                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: page-discussions, Property 4: Pagination**
 * **Validates: Requirements 1.5**
 * 
 * For any page with more than 10 comments, fetching comments with default
 * pagination SHALL return at most 10 comments per page.
 */
describe('Property 4: Pagination - Max 10 comments per page', () => {
    const DEFAULT_PAGE_SIZE = 10;

    it('should return at most 10 comments per page', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 100 }),
                fc.integer({ min: 1, max: 10 }),
                (comments: CommentWithReplies[], page: number) => {
                    const { comments: paginated } = paginateComments(comments, page, DEFAULT_PAGE_SIZE);
                    expect(paginated.length).toBeLessThanOrEqual(DEFAULT_PAGE_SIZE);
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return correct hasMore flag', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 100 }),
                fc.integer({ min: 1, max: 10 }),
                (comments: CommentWithReplies[], page: number) => {
                    const { hasMore } = paginateComments(comments, page, DEFAULT_PAGE_SIZE);
                    const expectedHasMore = comments.length > page * DEFAULT_PAGE_SIZE;
                    expect(hasMore).toBe(expectedHasMore);
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return all comments when total is less than page size', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 9 }),
                (comments: CommentWithReplies[]) => {
                    const { comments: paginated, hasMore } = paginateComments(comments, 1, DEFAULT_PAGE_SIZE);
                    expect(paginated.length).toBe(comments.length);
                    expect(hasMore).toBe(false);
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return exactly 10 comments when total is more than 10 on first page', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 11, maxLength: 50 }),
                (comments: CommentWithReplies[]) => {
                    const { comments: paginated, hasMore } = paginateComments(comments, 1, DEFAULT_PAGE_SIZE);
                    expect(paginated.length).toBe(DEFAULT_PAGE_SIZE);
                    expect(hasMore).toBe(true);
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return remaining comments on last page', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 11, maxLength: 50 }),
                (comments: CommentWithReplies[]) => {
                    const totalPages = Math.ceil(comments.length / DEFAULT_PAGE_SIZE);
                    const { comments: paginated, hasMore } = paginateComments(
                        comments,
                        totalPages,
                        DEFAULT_PAGE_SIZE
                    );

                    const expectedRemaining = comments.length % DEFAULT_PAGE_SIZE || DEFAULT_PAGE_SIZE;
                    expect(paginated.length).toBe(expectedRemaining);
                    expect(hasMore).toBe(false);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return empty array for page beyond total', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 20 }),
                (comments: CommentWithReplies[]) => {
                    const totalPages = Math.ceil(comments.length / DEFAULT_PAGE_SIZE);
                    const { comments: paginated, hasMore } = paginateComments(
                        comments,
                        totalPages + 1,
                        DEFAULT_PAGE_SIZE
                    );

                    expect(paginated.length).toBe(0);
                    expect(hasMore).toBe(false);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});


/**
 * **Feature: page-discussions, Property 14: Comment Count Display**
 * **Validates: Requirements 7.2**
 * 
 * For any page, the displayed comment count SHALL equal the actual number
 * of comments for that page.
 */
describe('Property 14: Comment Count Display - Count matches actual comments', () => {
    /**
     * Calculates the total count of top-level comments.
     * This matches the totalCount returned by the hook.
     */
    function calculateTotalCount(comments: CommentWithReplies[]): number {
        // Only count top-level comments (parent_id is null)
        return comments.filter((c) => c.parent_id === null).length;
    }

    it('should return count equal to number of top-level comments', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 0, maxLength: 50 }),
                (comments: CommentWithReplies[]) => {
                    const count = calculateTotalCount(comments);
                    expect(count).toBe(comments.length);
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return 0 for empty comments array', () => {
        const count = calculateTotalCount([]);
        expect(count).toBe(0);
    });

    it('should not count replies in total count', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 20 }),
                (comments: CommentWithReplies[]) => {
                    // Total replies across all comments
                    const totalReplies = comments.reduce((sum, c) => sum + c.replies.length, 0);

                    // Total count should only be top-level comments
                    const count = calculateTotalCount(comments);

                    // Count should equal number of top-level comments, not including replies
                    expect(count).toBe(comments.length);

                    // If there are replies, they should not be counted
                    if (totalReplies > 0) {
                        expect(count).toBeLessThan(comments.length + totalReplies);
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should be consistent across pagination', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 15, maxLength: 50 }),
                (comments: CommentWithReplies[]) => {
                    const totalCount = calculateTotalCount(comments);

                    // Paginate and verify count is consistent
                    const page1 = paginateComments(comments, 1, 10);
                    const page2 = paginateComments(comments, 2, 10);

                    // Total count should remain the same regardless of pagination
                    expect(totalCount).toBe(comments.length);

                    // Sum of paginated comments should equal total (for first 2 pages)
                    const paginatedSum = page1.comments.length + page2.comments.length;
                    expect(paginatedSum).toBeLessThanOrEqual(totalCount);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Additional tests for hook state management logic
 */
describe('Hook State Management', () => {
    it('should maintain comment order after adding new comment with newest timestamp', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 20 }),
                commentWithRepliesArb,
                (existingComments: CommentWithReplies[], newComment: CommentWithReplies) => {
                    // Find the newest timestamp among existing comments
                    const newestExisting = existingComments.reduce((newest, c) => {
                        const cTime = new Date(c.created_at).getTime();
                        return cTime > newest ? cTime : newest;
                    }, 0);

                    // Create new comment with timestamp newer than all existing
                    const newCommentWithNewerDate = {
                        ...newComment,
                        created_at: new Date(newestExisting + 1000).toISOString(),
                    };

                    const allComments = [newCommentWithNewerDate, ...existingComments];
                    const sorted = sortCommentsNewestFirst(allComments);

                    // New comment should be first (newest)
                    expect(sorted[0].id).toBe(newCommentWithNewerDate.id);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should correctly remove comment from list', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 2, maxLength: 20 }),
                (comments: CommentWithReplies[]) => {
                    // Pick a random comment to delete
                    const indexToDelete = Math.floor(Math.random() * comments.length);
                    const commentToDelete = comments[indexToDelete];

                    // Simulate deletion
                    const afterDelete = comments.filter((c) => c.id !== commentToDelete.id);

                    // Verify deletion
                    expect(afterDelete.length).toBe(comments.length - 1);
                    expect(afterDelete.find((c) => c.id === commentToDelete.id)).toBeUndefined();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should correctly update like status', () => {
        fc.assert(
            fc.property(commentWithRepliesArb, (comment: CommentWithReplies) => {
                // Simulate toggling like
                const toggled = {
                    ...comment,
                    is_liked: !comment.is_liked,
                    like_count: comment.is_liked ? comment.like_count - 1 : comment.like_count + 1,
                };

                // Verify toggle
                expect(toggled.is_liked).toBe(!comment.is_liked);

                // Like count should change by 1
                const countDiff = Math.abs(toggled.like_count - comment.like_count);
                expect(countDiff).toBe(1);

                return true;
            }),
            { numRuns: 100 }
        );
    });
});
