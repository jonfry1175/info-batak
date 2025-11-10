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
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">Sistem Marga Batak</h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Jelajahi sistem kekeluargaan Batak yang diwariskan secara patrilineal dari garis ayah
            ke anak laki-laki. Pilih rumpun untuk melihat marga-marga yang termasuk di dalamnya.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedRumpun('Semua')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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
        <div className="text-center mb-8">
          <p className="text-foreground/60">
            Menampilkan <span className="font-bold text-accent">{filteredMarga.length}</span>{' '}
            marga
            {selectedRumpun !== 'Semua' && (
              <span> dari rumpun <span className="font-bold">{selectedRumpun}</span></span>
            )}
          </p>
        </div>

        {/* Marga Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMarga.map((marga) => (
              <motion.div
                key={marga.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-lg border border-foreground/10 bg-foreground/5 hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                    {marga.nama}
                  </h3>
                  <span className="text-2xl">👤</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-foreground/60">Rumpun:</span>{' '}
                    <span className="font-semibold text-accent">{marga.rumpun}</span>
                  </p>
                  {marga.deskripsi && (
                    <p className="text-sm text-foreground/70">{marga.deskripsi}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Info Section */}
        <div className="mt-16 p-8 bg-accent/10 border-l-4 border-accent rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-accent">Tentang Sistem Marga</h2>
          <div className="space-y-3 text-foreground/80">
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
