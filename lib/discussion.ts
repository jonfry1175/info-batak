import { getSupabaseClient } from '@/lib/supabase';
import type {
    Comment,
    CommentWithUser,
    CommentWithReplies,
    DiscussionError,
    discussionErrorMessages,
} from '@/types';

const DEFAULT_PAGE_SIZE = 10;

/**
 * Result type for discussion operations
 */
export interface DiscussionResult<T> {
    data: T | null;
    error: DiscussionError | null;
}

/**
 * Paginated result for fetching comments
 */
export interface PaginatedCommentsResult {
    comments: CommentWithReplies[];
    totalCount: number;
    hasMore: boolean;
}

/**
 * Fetches paginated comments for a specific page with user info and like counts.
 * Returns top-level comments with their replies nested.
 * 
 * Requirements: 1.1 (sorted newest first), 1.2 (user info, like count), 1.3 (nested replies)
 */
export async function fetchComments(
    pagePath: string,
    page: number = 1,
    limit: number = DEFAULT_PAGE_SIZE
): Promise<DiscussionResult<PaginatedCommentsResult>> {
    const supabase = getSupabaseClient();
    const offset = (page - 1) * limit;

    try {
        // Get current user for is_liked check
        const { data: { user } } = await supabase.auth.getUser();
        const currentUserId = user?.id;

        // Fetch top-level comments (parent_id is null) with pagination
        const { data: topLevelComments, error: commentsError, count } = await supabase
            .from('comments')
            .select(`
        *,
        profiles!comments_user_id_profiles_fkey (
          display_name,
          avatar_url
        )
      `, { count: 'exact' })
            .eq('page_path', pagePath)
            .is('parent_id', null)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (commentsError) {
            console.error('Error fetching comments:', commentsError);
            return { data: null, error: 'SERVER_ERROR' };
        }

        if (!topLevelComments || topLevelComments.length === 0) {
            return {
                data: {
                    comments: [],
                    totalCount: count || 0,
                    hasMore: false,
                },
                error: null,
            };
        }

        // Get all comment IDs for fetching likes
        const commentIds = topLevelComments.map((c) => c.id);

        // Fetch replies for all top-level comments
        const { data: replies, error: repliesError } = await supabase
            .from('comments')
            .select(`
        *,
        profiles!comments_user_id_profiles_fkey (
          display_name,
          avatar_url
        )
      `)
            .in('parent_id', commentIds)
            .order('created_at', { ascending: true });

        if (repliesError) {
            console.error('Error fetching replies:', repliesError);
            return { data: null, error: 'SERVER_ERROR' };
        }

        // Get all reply IDs too
        const replyIds = replies?.map((r) => r.id) || [];
        const allCommentIds = [...commentIds, ...replyIds];

        // Fetch like counts for all comments
        const { data: likeCounts, error: likeCountError } = await supabase
            .from('comment_likes')
            .select('comment_id')
            .in('comment_id', allCommentIds);

        if (likeCountError) {
            console.error('Error fetching like counts:', likeCountError);
        }

        // Count likes per comment
        const likeCountMap = new Map<string, number>();
        likeCounts?.forEach((like) => {
            const current = likeCountMap.get(like.comment_id) || 0;
            likeCountMap.set(like.comment_id, current + 1);
        });

        // Fetch current user's likes
        let userLikes = new Set<string>();
        if (currentUserId) {
            const { data: userLikeData } = await supabase
                .from('comment_likes')
                .select('comment_id')
                .eq('user_id', currentUserId)
                .in('comment_id', allCommentIds);

            userLikes = new Set(userLikeData?.map((l) => l.comment_id) || []);
        }

        // Transform comments to CommentWithUser format
        const transformComment = (comment: any): CommentWithUser => ({
            id: comment.id,
            user_id: comment.user_id,
            page_path: comment.page_path,
            content: comment.content,
            parent_id: comment.parent_id,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            user: {
                display_name: comment.profiles?.display_name || null,
                avatar_url: comment.profiles?.avatar_url || null,
            },
            like_count: likeCountMap.get(comment.id) || 0,
            is_liked: userLikes.has(comment.id),
        });

        // Group replies by parent_id
        const repliesByParent = new Map<string, CommentWithUser[]>();
        replies?.forEach((reply) => {
            const parentId = reply.parent_id;
            if (!repliesByParent.has(parentId)) {
                repliesByParent.set(parentId, []);
            }
            repliesByParent.get(parentId)!.push(transformComment(reply));
        });

        // Build final result with nested replies
        const commentsWithReplies: CommentWithReplies[] = topLevelComments.map((comment) => ({
            ...transformComment(comment),
            replies: repliesByParent.get(comment.id) || [],
        }));

        return {
            data: {
                comments: commentsWithReplies,
                totalCount: count || 0,
                hasMore: (count || 0) > offset + limit,
            },
            error: null,
        };
    } catch (error) {
        console.error('Unexpected error fetching comments:', error);
        return { data: null, error: 'NETWORK_ERROR' };
    }
}

/**
 * Creates a new comment or reply.
 * 
 * Requirements: 2.1 (save and display immediately)
 */
export async function createComment(
    pagePath: string,
    content: string,
    parentId?: string
): Promise<DiscussionResult<Comment>> {
    const supabase = getSupabaseClient();

    // Validate content
    const trimmedContent = content.trim();
    if (!trimmedContent) {
        return { data: null, error: 'VALIDATION_ERROR' };
    }
    if (trimmedContent.length > 1000) {
        return { data: null, error: 'VALIDATION_ERROR' };
    }

    try {
        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: 'AUTH_REQUIRED' };
        }

        // If this is a reply, verify parent exists and is not itself a reply
        if (parentId) {
            const { data: parentComment, error: parentError } = await supabase
                .from('comments')
                .select('id, parent_id')
                .eq('id', parentId)
                .single();

            if (parentError || !parentComment) {
                return { data: null, error: 'NOT_FOUND' };
            }

            // Prevent nested replies (only one level of nesting allowed)
            if (parentComment.parent_id !== null) {
                return { data: null, error: 'VALIDATION_ERROR' };
            }
        }

        // Insert the comment
        const { data: newComment, error: insertError } = await supabase
            .from('comments')
            .insert({
                user_id: user.id,
                page_path: pagePath,
                content: trimmedContent,
                parent_id: parentId || null,
            })
            .select()
            .single();

        if (insertError) {
            console.error('Error creating comment:', insertError);
            return { data: null, error: 'SERVER_ERROR' };
        }

        return { data: newComment, error: null };
    } catch (error) {
        console.error('Unexpected error creating comment:', error);
        return { data: null, error: 'NETWORK_ERROR' };
    }
}

/**
 * Deletes a comment. Cascade delete of replies is handled by the database.
 * 
 * Requirements: 5.2 (remove from database), 5.3 (cascade delete replies)
 */
export async function deleteComment(
    commentId: string
): Promise<DiscussionResult<boolean>> {
    const supabase = getSupabaseClient();

    try {
        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: 'AUTH_REQUIRED' };
        }

        // Verify the comment exists and belongs to the user
        const { data: comment, error: fetchError } = await supabase
            .from('comments')
            .select('id, user_id')
            .eq('id', commentId)
            .single();

        if (fetchError || !comment) {
            return { data: null, error: 'NOT_FOUND' };
        }

        if (comment.user_id !== user.id) {
            return { data: null, error: 'FORBIDDEN' };
        }

        // Delete the comment (RLS will also enforce ownership)
        const { error: deleteError } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (deleteError) {
            console.error('Error deleting comment:', deleteError);
            return { data: null, error: 'SERVER_ERROR' };
        }

        return { data: true, error: null };
    } catch (error) {
        console.error('Unexpected error deleting comment:', error);
        return { data: null, error: 'NETWORK_ERROR' };
    }
}

/**
 * Toggles like on a comment. If already liked, removes the like.
 * 
 * Requirements: 4.1 (add like), 4.2 (toggle/remove like)
 */
export async function toggleLike(
    commentId: string
): Promise<DiscussionResult<{ liked: boolean; likeCount: number }>> {
    const supabase = getSupabaseClient();

    try {
        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: 'AUTH_REQUIRED' };
        }

        // Check if the comment exists
        const { data: comment, error: commentError } = await supabase
            .from('comments')
            .select('id, user_id')
            .eq('id', commentId)
            .single();

        if (commentError || !comment) {
            return { data: null, error: 'NOT_FOUND' };
        }

        // Prevent self-liking (also enforced by RLS)
        if (comment.user_id === user.id) {
            return { data: null, error: 'FORBIDDEN' };
        }

        // Check if user already liked this comment
        const { data: existingLike } = await supabase
            .from('comment_likes')
            .select('id')
            .eq('user_id', user.id)
            .eq('comment_id', commentId)
            .single();

        let liked: boolean;

        if (existingLike) {
            // Unlike: remove the like
            const { error: deleteError } = await supabase
                .from('comment_likes')
                .delete()
                .eq('id', existingLike.id);

            if (deleteError) {
                console.error('Error removing like:', deleteError);
                return { data: null, error: 'SERVER_ERROR' };
            }
            liked = false;
        } else {
            // Like: add the like
            const { error: insertError } = await supabase
                .from('comment_likes')
                .insert({
                    user_id: user.id,
                    comment_id: commentId,
                });

            if (insertError) {
                console.error('Error adding like:', insertError);
                return { data: null, error: 'SERVER_ERROR' };
            }
            liked = true;
        }

        // Get updated like count
        const { count } = await supabase
            .from('comment_likes')
            .select('*', { count: 'exact', head: true })
            .eq('comment_id', commentId);

        return {
            data: {
                liked,
                likeCount: count || 0,
            },
            error: null,
        };
    } catch (error) {
        console.error('Unexpected error toggling like:', error);
        return { data: null, error: 'NETWORK_ERROR' };
    }
}

/**
 * Gets the total comment count for a page (top-level comments only).
 */
export async function getCommentCount(
    pagePath: string
): Promise<DiscussionResult<number>> {
    const supabase = getSupabaseClient();

    try {
        const { count, error } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('page_path', pagePath)
            .is('parent_id', null);

        if (error) {
            console.error('Error getting comment count:', error);
            return { data: null, error: 'SERVER_ERROR' };
        }

        return { data: count || 0, error: null };
    } catch (error) {
        console.error('Unexpected error getting comment count:', error);
        return { data: null, error: 'NETWORK_ERROR' };
    }
}
