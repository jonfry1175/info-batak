'use client';

import { useDiscussion } from '@/hooks/useDiscussion';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { cn } from '@/lib/utils';
import { discussionErrorMessages, type DiscussionError } from '@/types';

interface DiscussionSectionProps {
  pagePath: string;
  className?: string;
}

/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
    </div>
  );
}

/**
 * Error display component
 */
function ErrorMessage({ error, onRetry }: { error: DiscussionError; onRetry: () => void }) {
  const message = discussionErrorMessages[error] || 'Terjadi kesalahan.';
  
  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
      <p className="text-sm text-destructive mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="text-sm text-accent hover:underline"
      >
        Coba lagi
      </button>
    </div>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
      <p className="text-muted-foreground">
        Belum ada komentar. Jadilah yang pertama berkomentar!
      </p>
    </div>
  );
}

/**
 * Comment count icon
 */
function CommentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}


/**
 * DiscussionSection - Main container component for page discussions.
 * 
 * Requirements:
 * - 1.4: Display empty state message
 * - 7.1: Display at bottom of content pages
 * - 7.2: Show total comment count in header
 * - 7.3: Dark/light mode support (via Tailwind)
 * - 7.4: Show loading indicator
 * - 7.5: Display user-friendly error messages in Indonesian
 */
export function DiscussionSection({ pagePath, className }: DiscussionSectionProps) {
  const {
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
  } = useDiscussion(pagePath);

  const handleAddComment = async (content: string): Promise<boolean> => {
    return addComment(content);
  };

  const handleAddReply = async (content: string): Promise<boolean> => {
    if (!replyingTo) return false;
    return addComment(content, replyingTo);
  };

  return (
    <section 
      className={cn('py-8 border-t border-border', className)}
      aria-labelledby="discussion-heading"
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <CommentIcon />
        <h2 
          id="discussion-heading" 
          className="text-xl font-semibold text-foreground"
        >
          Diskusi
        </h2>
        <span className="text-sm text-muted-foreground">
          ({totalCount} komentar)
        </span>
      </div>

      {/* Comment Form for new comments */}
      <div className="mb-6">
        <CommentForm
          pagePath={pagePath}
          onSubmit={handleAddComment}
        />
      </div>

      {/* Loading State */}
      {loading && comments.length === 0 && <LoadingSpinner />}

      {/* Error State */}
      {error && !loading && (
        <ErrorMessage error={error} onRetry={refresh} />
      )}

      {/* Empty State */}
      {!loading && !error && comments.length === 0 && <EmptyState />}

      {/* Comment List */}
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          pagePath={pagePath}
          replyingTo={replyingTo}
          onReply={setReplyingTo}
          onCancelReply={() => setReplyingTo(null)}
          onSubmitReply={handleAddReply}
          onLike={toggleLike}
          onDelete={deleteComment}
          hasMore={hasMore}
          onLoadMore={loadMore}
          loading={loading}
        />
      )}
    </section>
  );
}

export default DiscussionSection;
