'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllBerita, getFeaturedBerita } from '@/lib/data';
import { BeritaKategori } from '@/types';
import { PageHero } from '@/components/layout/PageHero';
import { PageDiscussion } from '@/components/discussion';

const kategoriList: BeritaKategori[] = [
  'Budaya',
  'Sejarah',
  'Komunitas',
  'Event',
  'Wisata',
  'Kuliner',
];

function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BeritaPage() {
  const [selectedKategori, setSelectedKategori] = useState<BeritaKategori | 'Semua'>('Semua');
  const allBerita = getAllBerita();
  const featuredBerita = getFeaturedBerita();

  const filteredBerita =
    selectedKategori === 'Semua'
      ? allBerita
      : allBerita.filter((b) => b.kategori === selectedKategori);

  return (
    <>
      <PageHero
        title="Berita & Artikel"
        subtitle="Informasi terkini dan artikel menarik seputar budaya, sejarah, dan kehidupan masyarakat Batak"
        backgroundImage="/images/berita/hero-berita.png"
        overlayOpacity={0.5}
      />
      <div className="w-full px-4 py-12">
        <div className="mx-auto max-w-7xl">
          {featuredBerita.length > 0 && (
            <FeaturedSection berita={featuredBerita} formatTanggal={formatTanggal} />
          )}

          <FilterButtons
            kategoriList={kategoriList}
            selectedKategori={selectedKategori}
            setSelectedKategori={setSelectedKategori}
          />

          <NewsGrid
            selectedKategori={selectedKategori}
            filteredBerita={filteredBerita}
            formatTanggal={formatTanggal}
          />

          {/* Discussion Section */}
          <div className="mt-16">
            <PageDiscussion />
          </div>
        </div>
      </div>
    </>
  );
}

function FeaturedSection({
  berita,
  formatTanggal,
}: {
  berita: ReturnType<typeof getFeaturedBerita>;
  formatTanggal: (t: string) => string;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-foreground mb-6 text-2xl font-bold">Berita Utama</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Link href={`/berita/${berita[0].slug}`} className="group lg:col-span-2">
          <div className="bg-foreground/5 border-foreground/10 relative overflow-hidden rounded-xl border transition-all hover:shadow-lg">
            <div className="relative aspect-[16/9]">
              <Image
                src={berita[0].gambar}
                alt={berita[0].gambarAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                <span className="bg-accent mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium">
                  {berita[0].kategori}
                </span>
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">{berita[0].judul}</h3>
                <p className="mb-2 text-sm text-white/80">{berita[0].ringkasan}</p>
                <span className="text-xs text-white/60">{formatTanggal(berita[0].tanggal)}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex flex-col gap-6">
          {berita.slice(1, 3).map((item) => (
            <Link key={item.id} href={`/berita/${item.slug}`} className="group flex-1">
              <div className="bg-foreground/5 border-foreground/10 relative h-full overflow-hidden rounded-xl border transition-all hover:shadow-lg">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.gambar}
                    alt={item.gambarAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                    <span className="bg-accent mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium">
                      {item.kategori}
                    </span>
                    <h3 className="text-lg leading-tight font-bold">{item.judul}</h3>
                    <span className="mt-1 block text-xs text-white/60">
                      {formatTanggal(item.tanggal)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterButtons({
  kategoriList,
  selectedKategori,
  setSelectedKategori,
}: {
  kategoriList: BeritaKategori[];
  selectedKategori: BeritaKategori | 'Semua';
  setSelectedKategori: (k: BeritaKategori | 'Semua') => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => setSelectedKategori('Semua')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selectedKategori === 'Semua'
            ? 'bg-accent text-white'
            : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
        }`}
      >
        Semua
      </button>
      {kategoriList.map((kategori) => (
        <button
          key={kategori}
          onClick={() => setSelectedKategori(kategori)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedKategori === kategori
              ? 'bg-accent text-white'
              : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
          }`}
        >
          {kategori}
        </button>
      ))}
    </div>
  );
}

function NewsGrid({
  selectedKategori,
  filteredBerita,
  formatTanggal,
}: {
  selectedKategori: BeritaKategori | 'Semua';
  filteredBerita: ReturnType<typeof getAllBerita>;
  formatTanggal: (t: string) => string;
}) {
  return (
    <section>
      <h2 className="text-foreground mb-6 text-2xl font-bold">
        {selectedKategori === 'Semua' ? 'Semua Berita' : `Berita ${selectedKategori}`}
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedKategori}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredBerita.map((berita, index) => (
            <motion.div
              key={berita.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/berita/${berita.slug}`} className="group block h-full">
                <article className="bg-foreground/5 border-foreground/10 flex h-full flex-col overflow-hidden rounded-xl border transition-all hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={berita.gambar}
                      alt={berita.gambarAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="bg-accent/10 text-accent rounded-full px-2.5 py-0.5 text-xs font-medium">
                        {berita.kategori}
                      </span>
                      <span className="text-foreground/50 text-xs">
                        {formatTanggal(berita.tanggal)}
                      </span>
                    </div>
                    <h3 className="text-foreground group-hover:text-accent mb-2 text-lg leading-tight font-bold transition-colors">
                      {berita.judul}
                    </h3>
                    <p className="text-foreground/70 mb-4 line-clamp-2 flex-1 text-sm">
                      {berita.ringkasan}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {berita.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-foreground/5 text-foreground/60 rounded px-2 py-0.5 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {filteredBerita.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-foreground/60">Belum ada berita untuk kategori ini.</p>
        </div>
      )}
    </section>
  );
}
