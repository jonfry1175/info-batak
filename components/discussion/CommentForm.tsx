'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ImageUpload } from './ImageUpload';
import { ImagePreview } from './ImagePreview';
import { useImageUpload } from '@/hooks/useImageUpload';

const MAX_COMMENT_LENGTH = 1000;

interface CommentFormProps {
  pagePath: string;
  parentId?: string;
  onSubmit: (content: string, imageUrl?: string) => Promise<boolean>;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

/**
 * CommentForm component for creating new comments or replies.
 * 
 * Requirements:
 * - 2.2: Prompt guests to login
 * - 2.3: Prevent empty comment submission
 * - 2.4: Clear input on success
 * - 2.5: Limit to 1000 characters
 * - 3.1: Show reply input when clicking reply
 * - 1.7: Upload image before create comment (image upload)
 * - 5.3: Disable submit while uploading (image upload)
 */
export function CommentForm({
  pagePath,
  parentId,
  onSubmit,
  onCancel,
  placeholder = 'Tulis komentar...',
  autoFocus = false,
}: CommentFormProps) {
  const { user, loading: authLoading } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Image upload hook
  const {
    selectedFile,
    previewUrl,
    isUploading,
    uploadProgress,
    error: imageError,
    selectImage,
    removeImage,
    uploadImage,
    resetState: resetImageState,
  } = useImageUpload();

  const isReply = !!parentId;
  const trimmedContent = content.trim();
  const charCount = trimmedContent.length;
  const isOverLimit = charCount > MAX_COMMENT_LENGTH;
  const isEmpty = charCount === 0;
  // Disable submit when empty, over limit, submitting, or uploading
  const isDisabled = isEmpty || isOverLimit || isSubmitting || isUploading;

  // Auto-focus for reply forms
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDisabled) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Upload image first if selected
      let imageUrl: string | undefined;
      if (selectedFile) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          // Upload failed, error is already set by the hook
          setIsSubmitting(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const success = await onSubmit(trimmedContent, imageUrl);
      
      if (success) {
        setContent('');
        resetImageState();
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    } catch (err) {
      setError('Gagal mengirim komentar. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login prompt for guests
  if (!authLoading && !user) {
    return (
      <div className={cn(
        'rounded-lg border border-border bg-muted/30 p-4',
        isReply && 'ml-12 mt-2'
      )}>
        <p className="text-sm text-muted-foreground mb-3">
          Silakan login untuk {isReply ? 'membalas' : 'berkomentar'}.
        </p>
        <Button asChild size="sm">
          <Link href="/login">Masuk</Link>
        </Button>
      </div>
    );
  }

  /**
   * Handles image selection from ImageUpload component.
   */
  const handleImageSelect = (file: File) => {
    selectImage(file);
  };

  /**
   * Handles image selection error.
   */
  const handleImageError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Combined error from form or image upload
  const displayError = error || imageError;

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn('space-y-3', isReply && 'ml-12 mt-2')}
    >
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          disabled={isSubmitting || authLoading || isUploading}
          rows={isReply ? 2 : 3}
          className={cn(
            'w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isOverLimit && 'border-destructive focus:ring-destructive',
            !isOverLimit && 'border-border'
          )}
          aria-label={isReply ? 'Tulis balasan' : 'Tulis komentar'}
          aria-describedby="char-count"
        />
      </div>

      {/* Image preview */}
      {selectedFile && previewUrl && (
        <ImagePreview
          file={selectedFile}
          previewUrl={previewUrl}
          onRemove={removeImage}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      )}

      {/* Character counter and error */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {displayError && (
            <p className="text-sm text-destructive">{displayError}</p>
          )}
        </div>
        <span 
          id="char-count"
          className={cn(
            'text-xs',
            isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'
          )}
        >
          {charCount}/{MAX_COMMENT_LENGTH}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        {/* Image upload button */}
        <ImageUpload
          onImageSelect={handleImageSelect}
          onError={handleImageError}
          disabled={isSubmitting || isUploading || !!selectedFile}
        />

        <div className="flex items-center gap-2">
          {isReply && onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isSubmitting || isUploading}
            >
              Batal
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={isDisabled}
          >
            {isSubmitting || isUploading ? 'Mengirim...' : isReply ? 'Balas' : 'Kirim'}
          </Button>
        </div>
      </div>
    </form>
  );
}

/**
 * Validates comment content.
 * Exported for testing purposes.
 * 
 * Requirements:
 * - 2.3: Empty/whitespace-only comments are invalid
 * - 2.5: Comments over 1000 chars are invalid
 */
export function validateComment(content: string): { valid: boolean; error?: string } {
  const trimmed = content.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Komentar tidak boleh kosong.' };
  }
  
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    return { valid: false, error: `Komentar maksimal ${MAX_COMMENT_LENGTH} karakter.` };
  }
  
  return { valid: true };
}

export default CommentForm;
