'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RumpunBatak } from '@/types';
import { useState } from 'react';

interface RumpunCardProps {
  rumpun: RumpunBatak;
}

export function RumpunCard({ rumpun }: RumpunCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/sejarah/${rumpun.slug}`} className="block group">
      <motion.div
        className="relative overflow-hidden rounded-xl bg-background border border-border shadow-lg transition-shadow hover:shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -8,
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          } 
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-foreground/5">
          <Image
            src={imageError ? '/images/rumpun/placeholder.jpg' : rumpun.gambar}
            alt={`Gambar representatif ${rumpun.nama}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Rumpun Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-2xl font-bold drop-shadow-lg">
              {rumpun.nama}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <p className="text-foreground/80 text-sm line-clamp-3 leading-relaxed">
            {rumpun.deskripsi}
          </p>
          
          {/* Read More Indicator */}
          <div className="mt-4 flex items-center text-accent text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
            <span>Pelajari lebih lanjut</span>
            <svg 
              className="ml-2 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
