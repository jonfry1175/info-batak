'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MargaSearch } from './MargaSearch';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src="/videos/batak-culture.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Additional gradient overlay */}
        <div className="to-background absolute inset-0 bg-gradient-to-b from-black/40 via-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
          className="mx-auto max-w-4xl space-y-8"
        >
          {/* Badge/Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-white uppercase backdrop-blur-sm">
              Horas! Selamat Datang
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold tracking-tight text-balance md:text-7xl lg:text-8xl">
            <span className="text-white drop-shadow-2xl">InfoBatak</span>
            <span className="text-accent drop-shadow-2xl">.id</span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-balance text-white/90 drop-shadow-lg md:text-2xl">
            Jelajahi kekayaan budaya Batak. Dari sejarah, adat istiadat, hingga jejak silsilah marga
            dalam satu portal modern.
          </p>

          {/* Interactive Search */}
          <div className="py-8">
            <MargaSearch />
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-white/70">
              <span>Populer:</span>
              {['Sinaga', 'Lubis', 'Simanjuntak', 'Siregar'].map((m) => (
                <Link
                  key={m}
                  href={`/marga?search=${m}`}
                  className="hover:text-accent text-white underline decoration-dotted transition-colors"
                >
                  {m}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="shadow-accent/20 hover:shadow-accent/40 h-12 rounded-full px-8 text-lg shadow-lg transition-all hover:-translate-y-1"
            >
              <Link href="/sejarah">Mulai Menjelajah</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-background/50 hover:bg-accent/5 hover:text-accent h-12 rounded-full px-8 text-lg backdrop-blur-sm transition-all"
            >
              <Link href="/marga">Lihat Semua Marga</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-muted-foreground/50 absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="from-muted-foreground/50 h-12 w-px bg-linear-to-b to-transparent" />
      </motion.div>
    </section>
  );
}
