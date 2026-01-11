'use client';

import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  file: File | null;
  previewUrl: string | null;
  onRemove: () => void;
  isUploading: boolean;
  uploadProgress?: number;
}

/**
 * X icon for remove button.
 */
function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Loading spinner icon.
 */
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/**
 * ImagePreview component shows selected image before submission.
 * 
 * Requirements:
 * - 1.6: Display preview of image before submission
 * - 3.1: Provide remove button for preview
 * - 5.2: Show progress indicator during upload
 * - 5.6: Show small preview thumbnail in form
 */
export function ImagePreview({
  file,
  previewUrl,
  onRemove,
  isUploading,
  uploadProgress = 0,
}: ImagePreviewProps) {
  // Don't render if no file or preview
  if (!file || !previewUrl) {
    return null;
  }

  return (
    <div className="relative inline-block mt-2">
      {/* Thumbnail container */}
      <div
        className={cn(
          'relative rounded-lg overflow-hidden border border-border',
          'w-24 h-24 bg-muted'
        )}
      >
        {/* Preview image */}
        <img
          src={previewUrl}
          alt={`Preview: ${file.name}`}
          className={cn(
            'w-full h-full object-cover',
            isUploading && 'opacity-50'
          )}
        />

        {/* Upload overlay with progress */}
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <LoadingSpinner />
            {uploadProgress > 0 && (
              <span className="text-xs text-white mt-1 font-medium">
                {Math.round(uploadProgress)}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Remove button */}
      {!isUploading && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'absolute -top-2 -right-2 rounded-full p-1',
            'bg-foreground text-background',
            'hover:bg-destructive hover:text-white',
            'transition-colors focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
          )}
          title="Hapus gambar"
          aria-label="Hapus gambar"
        >
          <XIcon />
        </button>
      )}

      {/* File name (truncated) */}
      <p className="text-xs text-muted-foreground mt-1 truncate max-w-24">
        {file.name}
      </p>
    </div>
  );
}

export default ImagePreview;
