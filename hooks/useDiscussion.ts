'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import {
    fetchComments,
    createComment,
    deleteComment as deleteCommentApi,
    toggleLike as toggleLikeApi,
    type PaginatedCommentsResult,
} from '@/lib/discussion';
import type {
    CommentWithReplies,
    CommentWithUser,
    DiscussionError,
    discussionErrorMessages,
} from '@/types';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

const DEFAULT_PAGE_SIZE = 10;

/**
 * Return type for the useDiscussion hook
 * Requirements: 1.1, 2.1, 4.1, 5.2
 */
export interface UseDiscussionReturn {
    comments: CommentWithReplies[];
    loading: boolean;
    error: DiscussionError | null;
    totalCount: number;
    hasMore: boolean;

    // Actions
    addComment: (content: string, parentId?: string) => Promise<boolean>;
    deleteComment: (commentId: string) => Promise<boolean>;
    toggleLike: (commentId: string) => Promise<boolean>;
    loadMore: () => Promise<void>;
    refresh: () => Promise<void>;

    // Reply state
    replyingTo: string | null;
    setReplyingTo: (commentId: string | null) => void;
}

/**
 * Custom hook for managing page discussions with real-time updates.
 * 
 * Requirements:
 * - 1.1: Display comments sorted newest first
 * - 2.1: Save and display comments immediately
 * - 4.1, 4.2: Like/unlike toggle
 * - 5.2: Delete comments
 * - 6.1, 6.2, 6.3: Real-time updates
 */
export function useDiscussion(pagePath: string): UseDiscussionReturn {
    const [comments, setComments] = useState<CommentWithReplies[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<DiscussionError | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    // Refs for cleanup and tracking
    const channelRef = useRef<RealtimeChannel | null>(null);
    const isMountedRef = useRef(true);

    /**
     * Fetches comments for the current page
     */
    const loadComments = useCallback(async (page: number = 1, append: boolean = false) => {
        if (!append) {
            setLoading(true);
        }
        setError(null);

        const result = await fetchComments(pagePath, page, DEFAULT_PAGE_SIZE);

        if (!isMountedRef.current) return;

        if (result.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        if (result.data) {
            if (append) {
                setComments(prev => [...prev, ...result.data!.comments]);
            } else {
                setComments(result.data.comments);
            }
            setTotalCount(result.data.totalCount);
            setHasMore(result.data.hasMore);
            setCurrentPage(page);
        }

        setLoading(false);
    }, [pagePath]);

    /**
     * Refreshes all comments from the beginning
     */
    const refresh = useCallback(async () => {
        setCurrentPage(1);
        await loadComments(1, false);
    }, [loadComments]);

    /**
     * Loads more comments (pagination)
     * Requirements: 1.5
     */
    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        await loadComments(currentPage + 1, true);
    }, [hasMore, loading, currentPage, loadComments]);

    /**
     * Adds a new comment or reply
     * Requirements: 2.1
     */
    const addComment = useCallback(async (content: string, parentId?: string): Promise<boolean> => {
        const result = await createComment(pagePath, content, parentId);

        if (result.error) {
            setError(result.error);
            return false;
        }

        // Refresh to get the new comment with user info
        // Real-time will also update, but this ensures immediate feedback
        await refresh();

        // Clear reply state if this was a reply
        if (parentId) {
            setReplyingTo(null);
        }

        return true;
    }, [pagePath, refresh]);

    /**
     * Deletes a comment
     * Requirements: 5.2
     */
    const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
        const result = await deleteCommentApi(commentId);

        if (result.error) {
            setError(result.error);
            return false;
        }

        // Optimistically remove from local state
        setComments(prev => {
            // Remove if it's a top-level comment
            const filtered = prev.filter(c => c.id !== commentId);

            // Also remove from replies
            return filtered.map(comment => ({
                ...comment,
                replies: comment.replies.filter(r => r.id !== commentId),
            }));
        });

        // Update total count
        setTotalCount(prev => Math.max(0, prev - 1));

        return true;
    }, []);

    /**
     * Toggles like on a comment
     * Requirements: 4.1, 4.2
     */
    const toggleLike = useCallback(async (commentId: string): Promise<boolean> => {
        const result = await toggleLikeApi(commentId);

        if (result.error) {
            setError(result.error);
            return false;
        }

        if (result.data) {
            // Optimistically update local state
            setComments(prev => prev.map(comment => {
                // Check if it's the target comment
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        is_liked: result.data!.liked,
                        like_count: result.data!.likeCount,
                    };
                }

                // Check replies
                return {
                    ...comment,
                    replies: comment.replies.map(reply => {
                        if (reply.id === commentId) {
                            return {
                                ...reply,
                                is_liked: result.data!.liked,
                                like_count: result.data!.likeCount,
                            };
                        }
                        return reply;
                    }),
                };
            }));
        }

        return true;
    }, []);


    /**
     * Sets up Supabase Realtime subscription for live updates
     * Requirements: 6.1, 6.2, 6.3
     */
    useEffect(() => {
        const supabase = getSupabaseClient();

        // Subscribe to comments changes for this page
        const channel = supabase
            .channel(`discussions:${pagePath}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'comments',
                    filter: `page_path=eq.${pagePath}`,
                },
                (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
                    // Refresh to get the new comment with full user info
                    // This ensures we have avatar, display_name, etc.
                    if (isMountedRef.current) {
                        refresh();
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'comments',
                },
                (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
                    // Remove deleted comment from local state
                    if (isMountedRef.current && payload.old && 'id' in payload.old) {
                        const deletedId = payload.old.id as string;
                        setComments(prev => {
                            const filtered = prev.filter(c => c.id !== deletedId);
                            return filtered.map(comment => ({
                                ...comment,
                                replies: comment.replies.filter(r => r.id !== deletedId),
                            }));
                        });
                        setTotalCount(prev => Math.max(0, prev - 1));
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'comment_likes',
                },
                (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
                    // Refresh to update like counts
                    // This is simpler than tracking individual like changes
                    if (isMountedRef.current) {
                        refresh();
                    }
                }
            )
            .subscribe();

        channelRef.current = channel;

        // Cleanup on unmount
        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
                channelRef.current = null;
            }
        };
    }, [pagePath, refresh]);

    /**
     * Initial load on mount
     */
    useEffect(() => {
        isMountedRef.current = true;
        loadComments(1, false);

        return () => {
            isMountedRef.current = false;
        };
    }, [loadComments]);

    return {
        comments,
        loading,
        error,
        totalCount,
        hasMore,
        addComment,
        deleteComment,
        toggleLike,
        loadMore,
        refresh,
        replyingTo,
        setReplyingTo,
    };
}

export default useDiscussion;
