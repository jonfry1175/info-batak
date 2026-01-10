'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RumpunBatakEnhanced } from '@/types';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface RumpunCardProps {
  rumpun: RumpunBatakEnhanced;
}

export function RumpunCard({ rumpun }: RumpunCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/sejarah/${rumpun.slug}`} className="group block h-full">
      <motion.div
        className="bg-card border-border hover:border-accent/50 relative flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -4,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Section */}
        <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageError ? '/images/rumpun/placeholder.jpg' : rumpun.gambar}
            alt={`Gambar representatif ${rumpun.nama}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-50" />

          {/* Rumpun Name Overlay */}
          <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-5 transition-transform duration-300 group-hover:translate-y-0">
            <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {rumpun.nama}
            </h3>
            <div className="bg-accent mt-2 h-1 w-12 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-grow flex-col p-5">
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
            {rumpun.deskripsi}
          </p>

          {/* Read More Indicator */}
          <div className="text-accent group/link mt-auto flex items-center text-sm font-semibold">
            <span className="decoration-accent/50 underline-offset-4 group-hover:underline">
              Jelajahi Budaya
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
