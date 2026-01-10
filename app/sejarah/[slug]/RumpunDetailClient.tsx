'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin } from 'lucide-react';
import { MapEmbed } from '@/components/sejarah/MapEmbed';
import { SejarahSection } from '@/components/sejarah/SejarahSection';
import { BudayaSection } from '@/components/sejarah/BudayaSection';
import { TokohCard } from '@/components/sejarah/TokohCard';
import { TableOfContents, defaultRumpunSections } from '@/components/sejarah/TableOfContents';
import type { RumpunBatakEnhanced, MapMarker } from '@/types';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  }
};

// Stagger animation for cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Stagger animation for badges/tags
const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};


interface RumpunDetailClientProps {
  rumpun: RumpunBatakEnhanced;
}

export function RumpunDetailClient({ rumpun }: RumpunDetailClientProps) {
  // Generate map markers from landmarks and kabupaten
  const mapMarkers: MapMarker[] = [
    // Center marker
    {
      lat: rumpun.wilayah.koordinat.latitude,
      lng: rumpun.wilayah.koordinat.longitude,
      label: rumpun.wilayah.nama,
      type: 'center'
    },
    // Landmark markers
    ...rumpun.wilayah.landmarks.map((landmark) => ({
      lat: landmark.latitude,
      lng: landmark.longitude,
      label: landmark.nama,
      type: 'landmark' as const
    })),
    // Kabupaten markers (without coordinates, just for legend)
    ...rumpun.wilayah.kabupaten.map((kab) => ({
      lat: rumpun.wilayah.koordinat.latitude,
      lng: rumpun.wilayah.koordinat.longitude,
      label: kab,
      type: 'kabupaten' as const
    }))
  ];

  return (
    <div className="w-full">
      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <Link
          href="/sejarah"
          className="text-accent hover:text-accent/80 inline-flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Kembali ke Sejarah</span>
        </Link>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="mb-12 px-4 pt-6"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-2xl md:h-[400px]">
            <Image
              src={rumpun.gambar}
              alt={rumpun.nama}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
                {rumpun.nama}
              </h1>
              <p className="mt-2 text-lg text-white/90 md:text-xl">{rumpun.deskripsi}</p>
            </div>
          </div>
        </div>
      </motion.section>


      {/* Main Content with Sidebar */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex gap-8">
          {/* Table of Contents - Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <TableOfContents sections={defaultRumpunSections} />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1 space-y-16">
            {/* Wilayah Section */}
            <motion.section 
              id="wilayah" 
              className="scroll-mt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={sectionVariants}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Wilayah {rumpun.nama}
                </h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-accent" />
              </div>

              {/* Map */}
              <div className="mb-6">
                <MapEmbed
                  latitude={rumpun.wilayah.koordinat.latitude}
                  longitude={rumpun.wilayah.koordinat.longitude}
                  zoom={10}
                  markers={mapMarkers}
                  fallbackImage={rumpun.gambar}
                  title={rumpun.nama}
                />
              </div>

              {/* Location Description */}
              <div className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm">
                <p className="mb-4 text-base leading-relaxed text-foreground/80">
                  {rumpun.wilayah.deskripsi}
                </p>

                {/* Kabupaten List */}
                {rumpun.wilayah.kabupaten.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      Kabupaten/Kota:
                    </h4>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={badgeContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {rumpun.wilayah.kabupaten.map((kab, index) => (
                        <motion.span
                          key={index}
                          variants={badgeVariants}
                          className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1.5 text-sm text-foreground/70"
                        >
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          {kab}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                )}


                {/* Landmarks */}
                {rumpun.wilayah.landmarks.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      Landmark Penting:
                    </h4>
                    <motion.div 
                      className="grid gap-3 sm:grid-cols-2"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {rumpun.wilayah.landmarks.map((landmark, index) => (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          className="rounded-lg bg-accent/5 p-3"
                        >
                          <p className="font-medium text-foreground">{landmark.nama}</p>
                          {landmark.deskripsi && (
                            <p className="mt-1 text-xs text-foreground/60">
                              {landmark.deskripsi}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Sejarah Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={sectionVariants}
            >
              <SejarahSection sejarah={rumpun.sejarah} rumpunNama={rumpun.nama} />
            </motion.div>

            {/* Budaya Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={sectionVariants}
            >
              <BudayaSection budaya={rumpun.budaya} rumpunNama={rumpun.nama} />
            </motion.div>


            {/* Tokoh Section */}
            <motion.section 
              id="tokoh" 
              className="scroll-mt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={sectionVariants}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Tokoh Penting {rumpun.nama}
                </h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-accent" />
              </div>

              {rumpun.tokoh.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {rumpun.tokoh.map((tokoh, index) => (
                    <motion.div key={index} variants={cardVariants}>
                      <TokohCard tokoh={tokoh} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="rounded-xl border border-dashed border-foreground/20 p-8 text-center">
                  <p className="text-foreground/60">
                    Informasi tokoh penting akan segera ditambahkan.
                  </p>
                </div>
              )}
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
}
