'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { MediaImage } from '@/types';

interface GalleryProps {
  images: MediaImage[];
  columns?: 2 | 3 | 4;
  aspectRatio?: 'square' | 'video' | 'portrait';
  showCredits?: boolean;
  className?: string;
}

export function Gallery({
  images,
  columns = 3,
  aspectRatio = 'video',
  showCredits = false,
  className = '',
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<MediaImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openLightbox = (image: MediaImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'next'
        ? (selectedIndex + 1) % images.length
        : (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  // Filter out placeholder images for production
  const displayImages = images.filter((img) => !img.placeholder);

  if (displayImages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-foreground/20 p-8 text-center">
        <p className="text-sm text-foreground/60">
          Gallery belum tersedia. Gambar akan ditambahkan segera.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid gap-4 ${gridCols[columns]} ${className}`}>
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group cursor-pointer overflow-hidden rounded-lg bg-background/50"
            onClick={() => openLightbox(image, index)}
          >
            <div className={`relative ${aspectRatios[aspectRatio]} overflow-hidden`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${100 / columns}vw, ${100 / columns}vw`}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
            {showCredits && image.photographer && (
              <div className="p-2">
                <p className="text-xs text-foreground/60">
                  © {image.photographer}
                  {image.year && ` (${image.year})`}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Tutup"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                  aria-label="Gambar sebelumnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                  aria-label="Gambar berikutnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width || 1200}
                height={selectedImage.height || 800}
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-lg object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-white">{selectedImage.alt}</p>
                {selectedImage.photographer && (
                  <p className="mt-1 text-xs text-white/60">
                    © {selectedImage.photographer}
                    {selectedImage.year && ` • ${selectedImage.year}`}
                  </p>
                )}
                {selectedImage.description && (
                  <p className="mt-2 text-xs text-white/80">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Counter */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {selectedIndex + 1} / {displayImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
