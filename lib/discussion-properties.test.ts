import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { Comment, CommentWithUser, CommentWithReplies } from '@/types';

/**
 * Additional property tests for the discussion system.
 * These tests validate nesting, like toggle, self-like prevention, and cascade delete.
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

// Helper to generate a valid Comment object
const commentArb = fc.record({
    id: fc.uuid(),
    user_id: fc.uuid(),
    page_path: fc.string({ minLength: 1 }).map((s) => `/${s}`),
    content: validContentArb,
    parent_id: fc.constant(null as string | null),
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

// Helper to generate a reply (comment with parent_id set)
const replyArb = (parentId: string, pagePath: string) => fc.record({
    id: fc.uuid(),
    user_id: fc.uuid(),
    page_path: fc.constant(pagePath),
    content: validContentArb,
    parent_id: fc.constant(parentId),
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
 * **Feature: page-discussions, Property 8: Single Nesting Level**
 * **Validates: Requirements 3.4**
 * 
 * For any comment that already has a parent_id (is a reply), attempting to
 * reply to it SHALL be prevented. Only one level of nesting is allowed.
 */
describe('Property 8: Single Nesting Level - Cannot reply to replies', () => {
    /**
     * Validates if a comment can be replied to.
     * Returns true if the comment is a top-level comment (parent_id is null).
     * Returns false if the comment is already a reply (parent_id is not null).
     */
    function canReplyTo(comment: Comment | CommentWithUser): boolean {
        return comment.parent_id === null;
    }

    /**
     * Simulates attempting to create a reply to a comment.
     * Returns an error if the target comment is already a reply.
     */
    function attemptReply(
        targetComment: Comment | CommentWithUser,
        _replyContent: string
    ): { success: boolean; error?: string } {
        if (!canReplyTo(targetComment)) {
            return { success: false, error: 'VALIDATION_ERROR' };
        }
        return { success: true };
    }

    it('should allow replying to top-level comments (parent_id is null)', () => {
        fc.assert(
            fc.property(
                commentWithUserArb,
                validContentArb,
                (comment: CommentWithUser, replyContent: string) => {
                    // Top-level comments have parent_id === null
                    expect(comment.parent_id).toBeNull();

                    const result = attemptReply(comment, replyContent);
                    expect(result.success).toBe(true);
                    expect(result.error).toBeUndefined();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should prevent replying to replies (parent_id is not null)', () => {
        fc.assert(
            fc.property(
                commentWithUserArb.chain((parent) =>
                    replyArb(parent.id, parent.page_path).map((reply) => ({
                        parent,
                        reply,
                    }))
                ),
                validContentArb,
                ({ reply }, replyContent: string) => {
                    // Replies have parent_id !== null
                    expect(reply.parent_id).not.toBeNull();

                    const result = attemptReply(reply, replyContent);
                    expect(result.success).toBe(false);
                    expect(result.error).toBe('VALIDATION_ERROR');

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should correctly identify nesting level for any comment', () => {
        fc.assert(
            fc.property(
                commentWithRepliesArb,
                (commentWithReplies: CommentWithReplies) => {
                    // Parent comment should be replyable
                    expect(canReplyTo(commentWithReplies)).toBe(true);

                    // All replies should NOT be replyable
                    for (const reply of commentWithReplies.replies) {
                        expect(canReplyTo(reply)).toBe(false);
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain single nesting invariant across all comments', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 20 }),
                (comments: CommentWithReplies[]) => {
                    for (const comment of comments) {
                        // Top-level comments have null parent_id
                        expect(comment.parent_id).toBeNull();

                        // All replies have non-null parent_id pointing to top-level
                        for (const reply of comment.replies) {
                            expect(reply.parent_id).toBe(comment.id);
                            // Replies cannot have their own replies in our model
                        }
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});


/**
 * **Feature: page-discussions, Property 9: Like Toggle Round-Trip**
 * **Validates: Requirements 4.1, 4.2**
 * 
 * For any comment and user, liking then unliking the comment SHALL return
 * the like_count to its original value. This is a round-trip property.
 */
describe('Property 9: Like Toggle Round-Trip - Like then unlike returns to original', () => {
    /**
     * Simulates toggling a like on a comment.
     * Returns the new state after the toggle.
     */
    function toggleLike(
        comment: CommentWithUser,
        currentlyLiked: boolean
    ): { is_liked: boolean; like_count: number } {
        if (currentlyLiked) {
            // Unlike: decrement count
            return {
                is_liked: false,
                like_count: Math.max(0, comment.like_count - 1),
            };
        } else {
            // Like: increment count
            return {
                is_liked: true,
                like_count: comment.like_count + 1,
            };
        }
    }

    it('should return to original like_count after like then unlike', () => {
        fc.assert(
            fc.property(
                commentWithUserArb.filter((c) => !c.is_liked), // Start with unliked comment
                (comment: CommentWithUser) => {
                    const originalLikeCount = comment.like_count;
                    const originalIsLiked = comment.is_liked;

                    // First toggle: like
                    const afterLike = toggleLike(comment, originalIsLiked);
                    expect(afterLike.is_liked).toBe(true);
                    expect(afterLike.like_count).toBe(originalLikeCount + 1);

                    // Second toggle: unlike (round-trip)
                    const afterUnlike = toggleLike(
                        { ...comment, ...afterLike },
                        afterLike.is_liked
                    );
                    expect(afterUnlike.is_liked).toBe(false);
                    expect(afterUnlike.like_count).toBe(originalLikeCount);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return to original like_count after unlike then like', () => {
        fc.assert(
            fc.property(
                commentWithUserArb
                    .filter((c) => c.is_liked && c.like_count > 0), // Start with liked comment
                (comment: CommentWithUser) => {
                    const originalLikeCount = comment.like_count;
                    const originalIsLiked = comment.is_liked;

                    // First toggle: unlike
                    const afterUnlike = toggleLike(comment, originalIsLiked);
                    expect(afterUnlike.is_liked).toBe(false);
                    expect(afterUnlike.like_count).toBe(originalLikeCount - 1);

                    // Second toggle: like (round-trip)
                    const afterLike = toggleLike(
                        { ...comment, ...afterUnlike },
                        afterUnlike.is_liked
                    );
                    expect(afterLike.is_liked).toBe(true);
                    expect(afterLike.like_count).toBe(originalLikeCount);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain like_count >= 0 invariant after any number of toggles', () => {
        fc.assert(
            fc.property(
                commentWithUserArb,
                fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }),
                (comment: CommentWithUser, toggleSequence: boolean[]) => {
                    let currentState = {
                        is_liked: comment.is_liked,
                        like_count: comment.like_count,
                    };

                    // Apply sequence of toggles
                    for (const _toggle of toggleSequence) {
                        currentState = toggleLike(
                            { ...comment, ...currentState },
                            currentState.is_liked
                        );
                        // Like count should never go negative
                        expect(currentState.like_count).toBeGreaterThanOrEqual(0);
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have consistent is_liked and like_count relationship', () => {
        // Generate comments with consistent is_liked and like_count
        // If is_liked is true, like_count must be at least 1
        const consistentCommentArb = commentWithUserArb.map((c) => {
            if (c.is_liked && c.like_count === 0) {
                return { ...c, like_count: 1 };
            }
            return c;
        });

        fc.assert(
            fc.property(consistentCommentArb, (comment: CommentWithUser) => {
                const afterToggle = toggleLike(comment, comment.is_liked);

                // If we liked, count should increase
                if (!comment.is_liked && afterToggle.is_liked) {
                    expect(afterToggle.like_count).toBe(comment.like_count + 1);
                }

                // If we unliked, count should decrease (but not below 0)
                if (comment.is_liked && !afterToggle.is_liked) {
                    expect(afterToggle.like_count).toBe(comment.like_count - 1);
                    expect(afterToggle.like_count).toBeGreaterThanOrEqual(0);
                }

                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: page-discussions, Property 11: Self-Like Prevention**
 * **Validates: Requirements 4.5**
 * 
 * For any comment, the comment author SHALL NOT be able to like their own comment.
 */
describe('Property 11: Self-Like Prevention - Cannot like own comment', () => {
    /**
     * Checks if a user can like a comment.
     * Returns false if the user is the comment author.
     */
    function canUserLikeComment(userId: string, comment: Comment | CommentWithUser): boolean {
        return userId !== comment.user_id;
    }

    /**
     * Simulates attempting to like a comment.
     * Returns an error if the user is the comment author.
     */
    function attemptLike(
        userId: string,
        comment: Comment | CommentWithUser
    ): { success: boolean; error?: string } {
        if (!canUserLikeComment(userId, comment)) {
            return { success: false, error: 'FORBIDDEN' };
        }
        return { success: true };
    }

    it('should prevent author from liking their own comment', () => {
        fc.assert(
            fc.property(commentWithUserArb, (comment: CommentWithUser) => {
                // Author tries to like their own comment
                const authorId = comment.user_id;
                const result = attemptLike(authorId, comment);

                expect(result.success).toBe(false);
                expect(result.error).toBe('FORBIDDEN');

                return true;
            }),
            { numRuns: 100 }
        );
    });

    it('should allow other users to like a comment', () => {
        fc.assert(
            fc.property(
                commentWithUserArb,
                fc.uuid(),
                (comment: CommentWithUser, otherUserId: string) => {
                    // Skip if randomly generated same ID (extremely unlikely but possible)
                    if (otherUserId === comment.user_id) {
                        return true;
                    }

                    const result = attemptLike(otherUserId, comment);

                    expect(result.success).toBe(true);
                    expect(result.error).toBeUndefined();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should consistently identify self-like attempts', () => {
        fc.assert(
            fc.property(
                commentWithUserArb,
                fc.array(fc.uuid(), { minLength: 1, maxLength: 10 }),
                (comment: CommentWithUser, userIds: string[]) => {
                    for (const userId of userIds) {
                        const canLike = canUserLikeComment(userId, comment);
                        const isSameUser = userId === comment.user_id;

                        // canLike should be false if and only if it's the same user
                        expect(canLike).toBe(!isSameUser);
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should apply self-like prevention to replies as well', () => {
        fc.assert(
            fc.property(commentWithRepliesArb, (commentWithReplies: CommentWithReplies) => {
                // Check parent comment
                expect(canUserLikeComment(commentWithReplies.user_id, commentWithReplies)).toBe(
                    false
                );

                // Check all replies
                for (const reply of commentWithReplies.replies) {
                    expect(canUserLikeComment(reply.user_id, reply)).toBe(false);
                }

                return true;
            }),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: page-discussions, Property 13: Cascade Delete**
 * **Validates: Requirements 5.3**
 * 
 * For any comment with replies, deleting the parent comment SHALL also
 * delete all associated replies.
 */
describe('Property 13: Cascade Delete - Deleting parent deletes replies', () => {
    /**
     * Simulates deleting a comment and its cascade effects.
     * Returns the IDs of all deleted comments.
     */
    function cascadeDelete(
        commentId: string,
        allComments: CommentWithReplies[]
    ): { deletedIds: string[]; remainingComments: CommentWithReplies[] } {
        const deletedIds: string[] = [];

        // Find the comment to delete
        const commentToDelete = allComments.find((c) => c.id === commentId);

        if (!commentToDelete) {
            // Check if it's a reply
            for (const parent of allComments) {
                const replyToDelete = parent.replies.find((r) => r.id === commentId);
                if (replyToDelete) {
                    deletedIds.push(commentId);
                    // Remove only the reply
                    const remainingComments = allComments.map((c) => ({
                        ...c,
                        replies: c.replies.filter((r) => r.id !== commentId),
                    }));
                    return { deletedIds, remainingComments };
                }
            }
            return { deletedIds: [], remainingComments: allComments };
        }

        // Delete parent and all its replies
        deletedIds.push(commentId);
        for (const reply of commentToDelete.replies) {
            deletedIds.push(reply.id);
        }

        // Remove the comment from the list
        const remainingComments = allComments.filter((c) => c.id !== commentId);

        return { deletedIds, remainingComments };
    }

    it('should delete parent comment and all its replies', () => {
        fc.assert(
            fc.property(
                commentWithRepliesArb.filter((c) => c.replies.length > 0),
                (comment: CommentWithReplies) => {
                    const allComments = [comment];
                    const { deletedIds, remainingComments } = cascadeDelete(comment.id, allComments);

                    // Parent should be deleted
                    expect(deletedIds).toContain(comment.id);

                    // All replies should be deleted
                    for (const reply of comment.replies) {
                        expect(deletedIds).toContain(reply.id);
                    }

                    // Total deleted should be parent + all replies
                    expect(deletedIds.length).toBe(1 + comment.replies.length);

                    // No comments should remain
                    expect(remainingComments.length).toBe(0);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should only delete the specific reply when deleting a reply', () => {
        fc.assert(
            fc.property(
                commentWithRepliesArb.filter((c) => c.replies.length > 0),
                (comment: CommentWithReplies) => {
                    const allComments = [comment];
                    const replyToDelete = comment.replies[0];
                    const { deletedIds, remainingComments } = cascadeDelete(
                        replyToDelete.id,
                        allComments
                    );

                    // Only the reply should be deleted
                    expect(deletedIds.length).toBe(1);
                    expect(deletedIds).toContain(replyToDelete.id);

                    // Parent should still exist
                    expect(remainingComments.length).toBe(1);
                    expect(remainingComments[0].id).toBe(comment.id);

                    // Other replies should still exist
                    const remainingReplies = remainingComments[0].replies;
                    expect(remainingReplies.length).toBe(comment.replies.length - 1);
                    expect(remainingReplies.find((r) => r.id === replyToDelete.id)).toBeUndefined();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should handle deleting comment with no replies', () => {
        fc.assert(
            fc.property(
                commentWithUserArb.map((c) => ({ ...c, replies: [] as CommentWithUser[] })),
                (comment: CommentWithReplies) => {
                    const allComments = [comment];
                    const { deletedIds, remainingComments } = cascadeDelete(comment.id, allComments);

                    // Only the comment should be deleted
                    expect(deletedIds.length).toBe(1);
                    expect(deletedIds).toContain(comment.id);

                    // No comments should remain
                    expect(remainingComments.length).toBe(0);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain referential integrity after cascade delete', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 2, maxLength: 10 }),
                (comments: CommentWithReplies[]) => {
                    // Pick a random comment to delete
                    const indexToDelete = Math.floor(Math.random() * comments.length);
                    const commentToDelete = comments[indexToDelete];

                    const { deletedIds, remainingComments } = cascadeDelete(
                        commentToDelete.id,
                        comments
                    );

                    // Verify no remaining comment references a deleted ID
                    for (const remaining of remainingComments) {
                        expect(deletedIds).not.toContain(remaining.id);
                        for (const reply of remaining.replies) {
                            expect(deletedIds).not.toContain(reply.id);
                            // Reply's parent_id should still be valid
                            expect(remaining.id).toBe(reply.parent_id);
                        }
                    }

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should correctly count total deletions including replies', () => {
        fc.assert(
            fc.property(
                fc.array(commentWithRepliesArb, { minLength: 1, maxLength: 10 }),
                (comments: CommentWithReplies[]) => {
                    // Calculate total comments (parents + all replies)
                    const totalBefore =
                        comments.length +
                        comments.reduce((sum, c) => sum + c.replies.length, 0);

                    // Delete first comment
                    const { deletedIds, remainingComments } = cascadeDelete(
                        comments[0].id,
                        comments
                    );

                    // Calculate remaining total
                    const totalAfter =
                        remainingComments.length +
                        remainingComments.reduce((sum, c) => sum + c.replies.length, 0);

                    // Total after should equal total before minus deleted
                    expect(totalAfter).toBe(totalBefore - deletedIds.length);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});
