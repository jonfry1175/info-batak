'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { CategoryTabs, defaultBudayaCategories } from './CategoryTabs';
import type { BudayaEnhanced, BudayaGalleryItem, BudayaCategory } from '@/types';

interface BudayaSectionProps {
  budaya: BudayaEnhanced;
  rumpunNama: string;
}

interface CategoryContentProps {
  category: BudayaCategory;
  title: string;
}

function CategoryContent({ category, title }: CategoryContentProps) {
  if (!category.deskripsi) {
    return (
      <div className="rounded-lg border border-dashed border-foreground/20 p-8 text-center">
        <p className="text-sm text-foreground/60">
          Informasi tentang {title.toLowerCase()} akan segera ditambahkan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
        {category.deskripsi}
      </p>

      {category.jenis && category.jenis.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Jenis-jenis:</h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {category.jenis.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 text-sm text-foreground/70"
              >
                <ChevronRight className="h-4 w-4 text-accent" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface BudayaGalleryProps {
  images: BudayaGalleryItem[];
  categoryFilter?: string;
}

function BudayaGallery({ images, categoryFilter }: BudayaGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<BudayaGalleryItem | null>(null);

  // Filter images by category if filter is provided
  const filteredImages = categoryFilter
    ? images.filter((img) => img.category === categoryFilter)
    : images;

  if (filteredImages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-6">
        <h4 className="mb-4 text-sm font-semibold text-foreground">Galeri</h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
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
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Tutup"
            >
              <X className="h-6 w-6" />
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/**
 * Gets the category data from BudayaEnhanced by category ID
 */
export function getCategoryData(
  budaya: BudayaEnhanced,
  categoryId: string
): BudayaCategory | null {
  switch (categoryId) {
    case 'sistemKekerabatan':
      return budaya.sistemKekerabatan;
    case 'musikTarian':
      return budaya.musikTarian;
    case 'pakaian':
      return budaya.pakaian;
    case 'rumahAdat':
      return budaya.rumahAdat;
    case 'upacaraAdat':
      return budaya.upacaraAdat;
    default:
      return null;
  }
}

/**
 * Gets the list of non-empty categories from BudayaEnhanced
 */
export function getNonEmptyCategories(budaya: BudayaEnhanced): string[] {
  const categories: string[] = [];
  if (budaya.sistemKekerabatan?.deskripsi) categories.push('sistemKekerabatan');
  if (budaya.musikTarian?.deskripsi) categories.push('musikTarian');
  if (budaya.pakaian?.deskripsi) categories.push('pakaian');
  if (budaya.rumahAdat?.deskripsi) categories.push('rumahAdat');
  if (budaya.upacaraAdat?.deskripsi) categories.push('upacaraAdat');
  return categories;
}

/**
 * Gets the title for a category ID
 */
export function getCategoryTitle(categoryId: string): string {
  const category = defaultBudayaCategories.find((c) => c.id === categoryId);
  return category?.title || categoryId;
}

export function BudayaSection({ budaya, rumpunNama }: BudayaSectionProps) {
  const [activeCategory, setActiveCategory] = useState(defaultBudayaCategories[0].id);

  const currentCategoryData = getCategoryData(budaya, activeCategory);
  const currentCategoryTitle = getCategoryTitle(activeCategory);

  // Filter gallery images for current category
  const categoryGalleryImages = budaya.gallery?.filter(
    (img) => img.category === activeCategory
  );

  return (
    <section id="budaya" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Budaya {rumpunNama}
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-accent" />
        </div>

        {/* Overview/Ringkasan */}
        <div className="mb-8 rounded-xl border border-foreground/10 bg-background p-6 shadow-sm">
          <p className="text-base leading-relaxed text-foreground/80">{budaya.ringkasan}</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <CategoryTabs
            categories={defaultBudayaCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            id={`panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={activeCategory}
            className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              {currentCategoryTitle}
            </h3>

            {currentCategoryData ? (
              <CategoryContent
                category={currentCategoryData}
                title={currentCategoryTitle}
              />
            ) : (
              <div className="rounded-lg border border-dashed border-foreground/20 p-8 text-center">
                <p className="text-sm text-foreground/60">
                  Informasi tentang {currentCategoryTitle.toLowerCase()} akan segera
                  ditambahkan.
                </p>
              </div>
            )}

            {/* Category-specific gallery */}
            {categoryGalleryImages && categoryGalleryImages.length > 0 && (
              <BudayaGallery images={categoryGalleryImages} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Full Gallery (all categories) */}
        {budaya.gallery && budaya.gallery.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Galeri Budaya {rumpunNama}
            </h3>
            <BudayaGallery images={budaya.gallery} />
          </div>
        )}
      </motion.div>
    </section>
  );
}
