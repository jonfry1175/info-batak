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
    <Link href={`/sejarah/${rumpun.slug}`} className="block group h-full">
      <motion.div
        className="relative flex flex-col h-full overflow-hidden rounded-xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -4,
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          } 
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
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
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white text-2xl font-bold tracking-tight drop-shadow-md">
              {rumpun.nama}
            </h3>
            <div className="h-1 w-12 bg-accent mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-5">
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4 flex-grow">
            {rumpun.deskripsi}
          </p>
          
          {/* Read More Indicator */}
          <div className="flex items-center text-accent text-sm font-semibold group/link mt-auto">
            <span className="group-hover:underline decoration-accent/50 underline-offset-4">
              Jelajahi Budaya
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
