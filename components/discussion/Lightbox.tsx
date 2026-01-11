'use client';

import { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface LightboxProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * X icon for close button.
 */
function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-6 w-6"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Lightbox component displays full-size image in a modal.
 * 
 * Requirements:
 * - 2.3: Open lightbox/modal showing full-size image when clicked
 *   - Modal full-screen untuk gambar
 *   - Close button dan click outside to close
 *   - Keyboard support (Escape to close)
 */
export function Lightbox({ imageUrl, isOpen, onClose }: LightboxProps) {
  /**
   * Handles keyboard events for closing the lightbox.
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  /**
   * Handles click on the backdrop to close.
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the image
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add keyboard listener when open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tampilan gambar ukuran penuh"
      className={cn(
        'fixed inset-0 z-50',
        'flex items-center justify-center',
        'bg-black/90 backdrop-blur-sm',
        'animate-in fade-in duration-200'
      )}
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className={cn(
          'absolute top-4 right-4 z-10',
          'rounded-full p-2',
          'bg-white/10 text-white',
          'hover:bg-white/20 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-white focus-visible:ring-offset-2',
          'focus-visible:ring-offset-black'
        )}
        aria-label="Tutup"
      >
        <XIcon />
      </button>

      {/* Image container */}
      <div className="relative max-w-[90vw] max-h-[90vh] p-4">
        <img
          src={imageUrl}
          alt="Gambar ukuran penuh"
          className={cn(
            'max-w-full max-h-[85vh] w-auto h-auto',
            'object-contain rounded-lg',
            'animate-in zoom-in-95 duration-200'
          )}
        />
      </div>

      {/* Instructions */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        Tekan Escape atau klik di luar gambar untuk menutup
      </p>
    </div>
  );
}

export default Lightbox;
