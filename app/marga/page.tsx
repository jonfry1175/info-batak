'use client';

import { useState } from 'react';
import { getAllMarga } from '@/lib/data';
import { Rumpun } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const rumpunOptions: Rumpun[] = ['Toba', 'Karo', 'Simalungun', 'Pakpak', 'Angkola', 'Mandailing'];

export default function MargaPage() {
  const [selectedRumpun, setSelectedRumpun] = useState<Rumpun | 'Semua'>('Semua');
  const allMarga = getAllMarga();

  const filteredMarga =
    selectedRumpun === 'Semua'
      ? allMarga
      : allMarga.filter((marga) => marga.rumpun === selectedRumpun);

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-accent mb-4 text-4xl font-bold md:text-5xl">Sistem Marga Batak</h1>
          <p className="text-foreground/70 mx-auto max-w-3xl text-lg">
            Jelajahi sistem kekeluargaan Batak yang diwariskan secara patrilineal dari garis ayah ke
            anak laki-laki. Pilih rumpun untuk melihat marga-marga yang termasuk di dalamnya.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedRumpun('Semua')}
              className={`rounded-lg px-6 py-3 font-semibold transition-all ${
                selectedRumpun === 'Semua'
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/70'
              }`}
            >
              Semua
            </button>
            {rumpunOptions.map((rumpun) => (
              <button
                key={rumpun}
                onClick={() => setSelectedRumpun(rumpun)}
                className={`rounded-lg px-6 py-3 font-semibold transition-all ${
                  selectedRumpun === rumpun
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/70'
                }`}
              >
                {rumpun}
              </button>
            ))}
          </div>
        </div>

        {/* Marga Count */}
        <div className="mb-8 text-center">
          <p className="text-foreground/60">
            Menampilkan <span className="text-accent font-bold">{filteredMarga.length}</span> marga
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
                className="group border-foreground/10 bg-foreground/5 hover:border-accent/50 cursor-pointer rounded-lg border p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="group-hover:text-accent text-xl font-bold transition-colors">
                    {marga.nama}
                  </h3>
                  <span className="text-2xl">👤</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-foreground/60 font-medium">Rumpun:</span>{' '}
                    <span className="text-accent font-semibold">{marga.rumpun}</span>
                  </p>
                  {marga.deskripsi && (
                    <p className="text-foreground/70 text-sm">{marga.deskripsi}</p>
                  )}
                </div>
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
  );
}
