'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { CommentForm } from './CommentForm';
import { CommentImage } from './CommentImage';
import { Lightbox } from './Lightbox';
import { cn } from '@/lib/utils';
import type { CommentWithUser, CommentWithReplies } from '@/types';

interface CommentItemProps {
  comment: CommentWithReplies | CommentWithUser;
  isLiked: boolean;
  isOwner: boolean;
  onReply: () => void;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  replyingTo?: string | null;
  onCancelReply?: () => void;
  onSubmitReply?: (content: string, imageUrl?: string) => Promise<boolean>;
  pagePath: string;
}

/**
 * Formats a timestamp to a relative or absolute date string.
 */
function formatTimestamp(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Default avatar component when user has no avatar.
 */
function DefaultAvatar({ name }: { name: string | null }) {
  const initial = name?.charAt(0).toUpperCase() || '?';
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-medium">
      {initial}
    </div>
  );
}

/**
 * Heart icon for like button.
 */
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

/**
 * Reply icon.
 */
function ReplyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
      />
    </svg>
  );
}

/**
 * Trash icon for delete button.
 */
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

/**
 * CommentItem component displays a single comment with actions.
 * 
 * Requirements:
 * - 1.2: Display avatar, name, content, timestamp, like count
 * - 1.3: Display nested replies
 * - 4.3: Show like status
 * - 5.1: Show delete option for owner
 * - 2.1: Display image below comment text (image upload)
 * - 2.2: Show thumbnail that can be clicked to view full size (image upload)
 * - 2.3: Open lightbox/modal showing full-size image (image upload)
 */
export function CommentItem({
  comment,
  isLiked,
  isOwner,
  onReply,
  onLike,
  onDelete,
  replyingTo,
  onCancelReply,
  onSubmitReply,
  pagePath,
}: CommentItemProps) {
  const { user } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const displayName = comment.user.display_name || 'Pengguna';
  const avatarUrl = comment.user.avatar_url;
  const isReply = !!comment.parent_id;
  const hasReplies = 'replies' in comment && comment.replies.length > 0;
  const isShowingReplyForm = replyingTo === comment.id;
  const hasImage = !!comment.image_url;
  
  // Prevent self-liking
  const canLike = user && comment.user_id !== user.id;

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(comment.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className={cn('group', isReply && 'ml-12 mt-3')}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`Avatar ${displayName}`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <DefaultAvatar name={displayName} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-foreground text-sm">
              {displayName}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(comment.created_at)}
            </span>
          </div>

          {/* Comment text */}
          <p className="mt-1 text-sm text-foreground whitespace-pre-wrap break-words">
            {comment.content}
          </p>

          {/* Comment image */}
          {hasImage && comment.image_url && (
            <CommentImage
              imageUrl={comment.image_url}
              alt={`Gambar dari ${displayName}`}
              onImageClick={() => setLightboxOpen(true)}
            />
          )}

          {/* Actions */}
          <div className="mt-2 flex items-center gap-1">
            {/* Like button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!canLike}
              className={cn(
                'h-8 px-2 gap-1.5',
                isLiked && 'text-accent'
              )}
              title={!user ? 'Login untuk menyukai' : !canLike ? 'Tidak bisa menyukai komentar sendiri' : isLiked ? 'Batal suka' : 'Suka'}
            >
              <HeartIcon filled={isLiked} />
              {comment.like_count > 0 && (
                <span className="text-xs">{comment.like_count}</span>
              )}
            </Button>

            {/* Reply button (only for top-level comments) */}
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReply}
                className="h-8 px-2 gap-1.5"
                title="Balas"
              >
                <ReplyIcon />
                <span className="text-xs">Balas</span>
              </Button>
            )}

            {/* Delete button (only for owner) */}
            {isOwner && (
              <>
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-xs text-muted-foreground">Hapus?</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Ya
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelDelete}
                      className="h-7 px-2"
                    >
                      Tidak
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    title="Hapus"
                  >
                    <TrashIcon />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reply form */}
      {isShowingReplyForm && onSubmitReply && onCancelReply && (
        <CommentForm
          pagePath={pagePath}
          parentId={comment.id}
          onSubmit={onSubmitReply}
          onCancel={onCancelReply}
          placeholder={`Balas ${displayName}...`}
          autoFocus
        />
      )}

      {/* Nested replies */}
      {hasReplies && (
        <div className="mt-3 space-y-3">
          {(comment as CommentWithReplies).replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isLiked={reply.is_liked}
              isOwner={user?.id === reply.user_id}
              onReply={() => {}} // Replies can't have replies
              onLike={onLike}
              onDelete={onDelete}
              pagePath={pagePath}
            />
          ))}
        </div>
      )}

      {/* Lightbox for full-size image view */}
      {hasImage && comment.image_url && (
        <Lightbox
          imageUrl={comment.image_url}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

export default CommentItem;
