'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  overlayOpacity?: number;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.6,
}: PageHeroProps) {
  return (
    <div
      className="relative flex h-[50vh] min-h-[300px] items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-white/90 drop-shadow-md md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
