'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Crown, Swords, Building2 } from 'lucide-react';
import { Timeline } from './Timeline';
import type { SejarahEnhanced, SejarahImage } from '@/types';

interface SejarahSectionProps {
  sejarah: SejarahEnhanced;
  rumpunNama: string;
}

interface SubSectionProps {
  title: string;
  content: string | undefined;
  icon: React.ReactNode;
  defaultOpen?: boolean;
}

function SubSection({ title, content, icon, defaultOpen = false }: SubSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!content) return null;

  return (
    <div className="border-foreground/10 border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-accent flex w-full items-center justify-between py-4 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="bg-accent/10 text-accent flex h-8 w-8 items-center justify-center rounded-lg">
            {icon}
          </span>
          <span className="text-foreground font-semibold">{title}</span>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="text-foreground/60 h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pr-4 pb-4 pl-11">
              <p className="text-foreground/70 text-sm leading-relaxed">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ImageGalleryProps {
  images: SejarahImage[];
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<SejarahImage | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-8">
        <h4 className="text-foreground mb-4 text-lg font-semibold">Galeri Sejarah</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
              {image.caption && <p className="text-foreground/60 mt-2 text-xs">{image.caption}</p>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Tutup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
                width={1200}
                height={800}
                className="h-auto max-h-[80vh] w-auto max-w-[90vw] rounded-lg object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-white">{selectedImage.alt}</p>
                {selectedImage.caption && (
                  <p className="mt-1 text-xs text-white/60">{selectedImage.caption}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Checks if a SejarahEnhanced object has at least one non-empty sub-section
 */
export function hasSubSections(sejarah: SejarahEnhanced): boolean {
  return !!(
    sejarah.asalUsul ||
    sejarah.kerajaan ||
    sejarah.perlawananKolonial ||
    sejarah.eraModern
  );
}

/**
 * Gets the list of available sub-sections from a SejarahEnhanced object
 */
export function getAvailableSubSections(sejarah: SejarahEnhanced): string[] {
  const sections: string[] = [];
  if (sejarah.asalUsul) sections.push('asalUsul');
  if (sejarah.kerajaan) sections.push('kerajaan');
  if (sejarah.perlawananKolonial) sections.push('perlawananKolonial');
  if (sejarah.eraModern) sections.push('eraModern');
  return sections;
}

export function SejarahSection({ sejarah, rumpunNama }: SejarahSectionProps) {
  const subSections = [
    {
      key: 'asalUsul',
      title: 'Asal Usul',
      content: sejarah.asalUsul,
      icon: <BookOpen className="h-4 w-4" />,
      defaultOpen: true,
    },
    {
      key: 'kerajaan',
      title: 'Kerajaan',
      content: sejarah.kerajaan,
      icon: <Crown className="h-4 w-4" />,
      defaultOpen: false,
    },
    {
      key: 'perlawananKolonial',
      title: 'Perlawanan Kolonial',
      content: sejarah.perlawananKolonial,
      icon: <Swords className="h-4 w-4" />,
      defaultOpen: false,
    },
    {
      key: 'eraModern',
      title: 'Era Modern',
      content: sejarah.eraModern,
      icon: <Building2 className="h-4 w-4" />,
      defaultOpen: false,
    },
  ];

  const hasContent = hasSubSections(sejarah);

  return (
    <section id="sejarah" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-foreground text-2xl font-bold md:text-3xl">Sejarah {rumpunNama}</h2>
          <div className="bg-accent mt-2 h-1 w-16 rounded-full" />
        </div>

        {/* Overview/Ringkasan */}
        <div className="border-foreground/10 bg-background mb-8 rounded-xl border p-6 shadow-sm">
          <p className="text-foreground/80 text-base leading-relaxed">{sejarah.ringkasan}</p>
        </div>

        {/* Collapsible Sub-sections */}
        {hasContent && (
          <div className="border-foreground/10 bg-background mb-8 rounded-xl border shadow-sm">
            {subSections.map((section) => (
              <SubSection
                key={section.key}
                title={section.title}
                content={section.content}
                icon={section.icon}
                defaultOpen={section.defaultOpen}
              />
            ))}
          </div>
        )}

        {/* Timeline */}
        {sejarah.timeline && sejarah.timeline.length > 0 && (
          <div className="mb-8">
            <h3 className="text-foreground mb-6 text-xl font-semibold">Timeline Sejarah</h3>
            <Timeline events={sejarah.timeline} />
          </div>
        )}

        {/* Image Gallery */}
        {sejarah.images && <ImageGallery images={sejarah.images} />}
      </motion.div>
    </section>
  );
}
