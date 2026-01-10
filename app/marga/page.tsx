'use client';

import { useState } from 'react';
import { getAllMarga } from '@/lib/data';
import { Rumpun } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MargaFilterVisual } from '@/components/marga/MargaFilterVisual';
import { PageHero } from '@/components/layout/PageHero';
import Link from 'next/link';

export default function MargaPage() {
  const [selectedRumpun, setSelectedRumpun] = useState<Rumpun | 'Semua'>('Semua');
  const allMarga = getAllMarga();

  const filteredMarga =
    selectedRumpun === 'Semua'
      ? allMarga
      : allMarga.filter((marga) => marga.rumpun === selectedRumpun);

  return (
    <>
      <PageHero
        title="Sistem Marga Batak"
        subtitle="Jelajahi sistem kekeluargaan Batak yang diwariskan secara patrilineal dari garis ayah ke anak laki-laki"
        backgroundImage="/images/homepage/card-marga.jpg"
      />
      <div className="w-full px-4 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Filter Info */}
          <div className="mb-8 text-center">
            <p className="text-foreground/70 mx-auto max-w-3xl">
              Pilih rumpun untuk melihat marga-marga yang termasuk di dalamnya.
            </p>
          </div>

          {/* Visual Filter Section */}
          <MargaFilterVisual selectedRumpun={selectedRumpun} onSelectRumpun={setSelectedRumpun} />

          {/* Marga Count */}
          <div className="mb-8 text-center">
            <p className="text-foreground/60">
              Menampilkan <span className="text-accent font-bold">{filteredMarga.length}</span>{' '}
              marga
              {selectedRumpun !== 'Semua' && (
                <span>
                  {' '}
                  dari rumpun <span className="font-bold">{selectedRumpun}</span>
                </span>
              )}
            </p>
          </div>

          {/* Marga Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredMarga.map((marga) => (
                <motion.div
                  key={marga.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Link
                    href={`/marga/${marga.slug}`}
                    className="group border-foreground/10 bg-foreground/5 hover:border-accent/50 focus-visible:ring-accent flex h-full flex-col rounded-lg border p-6 transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="group-hover:text-accent text-xl font-bold transition-colors">
                        {marga.nama}
                      </h3>
                      <Badge variant="secondary">{marga.rumpun}</Badge>
                    </div>
                    <div className="space-y-2">
                      {marga.deskripsi && (
                        <p className="text-foreground/70 text-sm">{marga.deskripsi}</p>
                      )}
                    </div>
                    <div className="text-foreground/60 group-hover:text-accent mt-4 text-sm font-medium">
                      Lihat detail marga →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Info Section */}
          <div className="bg-accent/10 border-accent mt-16 rounded-lg border-l-4 p-8">
            <h2 className="text-accent mb-4 text-2xl font-bold">Tentang Sistem Marga</h2>
            <div className="text-foreground/80 space-y-3">
              <p>
                Sistem marga dalam budaya Batak adalah sistem kekerabatan patrilineal yang sangat
                penting dalam struktur sosial masyarakat Batak. Marga diturunkan dari garis ayah ke
                anak laki-laki dan menjadi identitas kekeluargaan yang tidak dapat diubah.
              </p>
              <p>
                Terdapat 6 sub-etnis Batak utama: <strong>Toba</strong>, <strong>Karo</strong>,{' '}
                <strong>Simalungun</strong>, <strong>Pakpak</strong>, <strong>Angkola</strong>, dan{' '}
                <strong>Mandailing</strong>. Setiap rumpun memiliki sistem marga yang unik dengan
                ratusan marga yang berbeda.
              </p>
              <p>
                Sistem marga ini berperan penting dalam filosofi <em>Dalihan Na Tolu</em>, yang
                mengatur hubungan sosial masyarakat Batak berdasarkan posisi marga dalam sebuah
                perkawinan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
