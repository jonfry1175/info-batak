'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CommentImageProps {
  imageUrl: string;
  alt?: string;
  onImageClick: () => void;
}

/**
 * Broken image icon for error state.
 */
function BrokenImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-8 w-8 text-muted-foreground"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="3" x2="21" y2="21" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </svg>
  );
}

/**
 * CommentImage component displays an image attached to a comment.
 * 
 * Requirements:
 * - 2.1: Display image below comment text
 * - 2.2: Show thumbnail that can be clicked to view full size
 * - 2.4: Use lazy loading for performance optimization
 * - 2.5: Display placeholder with error message if image fails to load
 */
export function CommentImage({ imageUrl, alt = 'Gambar komentar', onImageClick }: CommentImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /**
   * Handles image load success.
   */
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  /**
   * Handles image load error.
   */
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  /**
   * Handles click on the image.
   */
  const handleClick = () => {
    if (!hasError) {
      onImageClick();
    }
  };

  /**
   * Handles keyboard interaction.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !hasError) {
      e.preventDefault();
      onImageClick();
    }
  };

  // Error state
  if (hasError) {
    return (
      <div
        className={cn(
          'mt-2 rounded-lg border border-border bg-muted/50',
          'flex flex-col items-center justify-center',
          'w-48 h-32 p-4'
        )}
      >
        <BrokenImageIcon />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Gagal memuat gambar
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-block rounded-lg overflow-hidden',
          'border border-border cursor-pointer',
          'hover:border-accent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-accent focus-visible:ring-offset-2',
          'max-w-xs'
        )}
        aria-label="Klik untuk melihat gambar ukuran penuh"
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Image with lazy loading */}
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'max-h-48 w-auto object-contain',
            isLoading && 'opacity-0'
          )}
        />

        {/* Zoom indicator on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-black/0 hover:bg-black/20',
            'flex items-center justify-center transition-colors',
            'opacity-0 hover:opacity-100'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            className="h-6 w-6"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CommentImage;
