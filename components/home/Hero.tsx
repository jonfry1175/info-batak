'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MargaSearch } from './MargaSearch';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
      {/* Dynamic Background */}
      <div className="bg-background absolute inset-0">
        <div className="pattern-gorga absolute inset-0 animate-pulse opacity-10" />
        <div className="via-background/50 to-background absolute inset-0 bg-gradient-to-b from-transparent" />
        <div className="from-accent/5 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent" />
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
            <span className="border-accent/20 bg-accent/5 text-accent rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide uppercase">
              Horas! Selamat Datang
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold tracking-tight text-balance md:text-7xl lg:text-8xl">
            <span className="from-foreground via-foreground/90 to-foreground/70 bg-gradient-to-r bg-clip-text text-transparent">
              InfoBatak
            </span>
            <span className="text-accent">.id</span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed text-balance md:text-2xl">
            Jelajahi kekayaan budaya Batak. Dari sejarah, adat istiadat, hingga jejak silsilah marga
            dalam satu portal modern.
          </p>

          {/* Interactive Search */}
          <div className="py-8">
            <MargaSearch />
            <div className="text-muted-foreground mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <span>Populer:</span>
              {['Sinaga', 'Lubis', 'Simanjuntak', 'Siregar'].map((m) => (
                <Link
                  key={m}
                  href={`/marga?search=${m}`}
                  className="hover:text-accent underline decoration-dotted transition-colors"
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
        <div className="from-muted-foreground/50 h-12 w-px bg-gradient-to-b to-transparent" />
      </motion.div>
    </section>
  );
}
