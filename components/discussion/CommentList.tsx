'use client';

import { useAuth } from '@/components/AuthProvider';
import { CommentItem } from './CommentItem';
import { Button } from '@/components/ui/button';
import type { CommentWithReplies } from '@/types';

interface CommentListProps {
  comments: CommentWithReplies[];
  pagePath: string;
  replyingTo: string | null;
  onReply: (commentId: string) => void;
  onCancelReply: () => void;
  onSubmitReply: (content: string, imageUrl?: string) => Promise<boolean>;
  onLike: (commentId: string) => Promise<boolean>;
  onDelete: (commentId: string) => Promise<boolean>;
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

/**
 * CommentList - Renders a list of comments with pagination.
 * 
 * Requirements:
 * - 1.5: Implement pagination with load more
 * - 3.1: Handle reply state (which comment is being replied to)
 */
export function CommentList({
  comments,
  pagePath,
  replyingTo,
  onReply,
  onCancelReply,
  onSubmitReply,
  onLike,
  onDelete,
  hasMore,
  onLoadMore,
  loading,
}: CommentListProps) {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Comments */}
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isLiked={comment.is_liked}
          isOwner={user?.id === comment.user_id}
          onReply={() => onReply(comment.id)}
          onLike={onLike}
          onDelete={onDelete}
          replyingTo={replyingTo}
          onCancelReply={onCancelReply}
          onSubmitReply={onSubmitReply}
          pagePath={pagePath}
        />
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? 'Memuat...' : 'Muat lebih banyak'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CommentList;
