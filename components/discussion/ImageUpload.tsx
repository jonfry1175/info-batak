'use client';

import { useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { ALLOWED_IMAGE_TYPES } from '@/lib/image-upload';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

/**
 * Image icon for the upload button.
 */
function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/**
 * ImageUpload component provides file input with drag-and-drop support.
 * 
 * Requirements:
 * - 1.1: Open file picker dialog when clicking image upload button
 * - 5.1: Display image icon button in comment form
 * - 5.4: Support drag-and-drop image upload
 * - 5.5: Maintain consistent styling with site's theme (light/dark mode)
 */
export function ImageUpload({ onImageSelect, onError, disabled = false }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Accept string for file input
  const acceptTypes = ALLOWED_IMAGE_TYPES.join(',');

  /**
   * Handles file selection from input or drop.
   */
  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;
    onImageSelect(file);
  }, [onImageSelect]);

  /**
   * Opens the file picker dialog.
   */
  const handleButtonClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  /**
   * Handles file input change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  /**
   * Handles drag enter event.
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  /**
   * Handles drag leave event.
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handles drag over event.
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handles drop event.
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      onError('Format file tidak didukung. Gunakan JPEG, PNG, GIF, atau WebP.');
      return;
    }

    handleFileSelect(file);
  };

  return (
    <div
      className={cn(
        'relative inline-flex',
        isDragging && 'ring-2 ring-accent ring-offset-2 rounded-md'
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptTypes}
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
        aria-label="Upload gambar"
      />

      {/* Upload button */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2',
          'text-muted-foreground hover:text-accent hover:bg-accent/10',
          'transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
        title="Tambah gambar"
        aria-label="Tambah gambar ke komentar"
      >
        <ImageIcon />
      </button>
    </div>
  );
}

export default ImageUpload;
