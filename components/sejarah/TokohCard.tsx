'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Award, User } from 'lucide-react';
import type { EnhancedTokoh } from '@/types';

interface TokohCardProps {
  tokoh: EnhancedTokoh;
  onExpand?: () => void;
}

/**
 * Generates initials from a name for the avatar placeholder
 */
export function getInitials(nama: string): string {
  return nama
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Formats the life period string from birth and death years
 */
export function formatLifePeriod(tahunLahir?: number, tahunWafat?: number): string | null {
  if (!tahunLahir && !tahunWafat) return null;
  if (tahunLahir && tahunWafat) return `${tahunLahir} - ${tahunWafat}`;
  if (tahunLahir) return `${tahunLahir} - sekarang`;
  return `? - ${tahunWafat}`;
}

/**
 * Validates that a tokoh has the required display fields
 */
export function hasRequiredFields(tokoh: EnhancedTokoh): boolean {
  return Boolean(tokoh.nama && tokoh.gelar);
}

export function TokohCard({ tokoh, onExpand }: TokohCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const lifePeriod = formatLifePeriod(tokoh.tahunLahir, tokoh.tahunWafat);
  const initials = getInitials(tokoh.nama);
  const hasFoto = tokoh.foto && !imageError;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && onExpand) {
      onExpand();
    }
  };

  return (
    <motion.div
      className="group border-foreground/10 bg-background overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="flex gap-4 p-4">
        {/* Avatar/Photo */}
        <div className="border-accent/20 relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2">
          {hasFoto ? (
            <Image
              src={tokoh.foto!}
              alt={`Foto ${tokoh.nama}`}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="80px"
            />
          ) : (
            <div className="bg-accent/10 flex h-full w-full items-center justify-center">
              {initials ? (
                <span className="text-accent text-xl font-bold">{initials}</span>
              ) : (
                <User className="text-accent/60 h-8 w-8" />
              )}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="min-w-0 flex-1">
          <h3 className="text-foreground truncate text-lg font-bold">{tokoh.nama}</h3>
          <p className="text-accent text-sm font-medium">{tokoh.gelar}</p>

          {/* Life Period */}
          {lifePeriod && <p className="text-foreground/60 mt-1 text-xs">{lifePeriod}</p>}

          {/* Bidang Badge */}
          {tokoh.bidang && (
            <span className="bg-accent/10 text-accent mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
              <Award className="h-3 w-3" />
              {tokoh.bidang}
            </span>
          )}
        </div>
      </div>

      {/* Ringkasan */}
      <div className="px-4 pb-3">
        <p className="text-foreground/70 line-clamp-2 text-sm">{tokoh.ringkasan}</p>
      </div>

      {/* Expand Button */}
      <button
        onClick={handleExpand}
        className="border-foreground/10 text-foreground/60 hover:bg-foreground/5 hover:text-foreground flex w-full items-center justify-center gap-2 border-t py-3 text-sm font-medium transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`tokoh-detail-${tokoh.nama.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span>{isExpanded ? 'Tutup' : 'Lihat Selengkapnya'}</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`tokoh-detail-${tokoh.nama.replace(/\s+/g, '-').toLowerCase()}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-foreground/10 overflow-hidden border-t"
          >
            <div className="space-y-4 p-4">
              {/* Full Biography */}
              {tokoh.biografi && (
                <div>
                  <h4 className="text-foreground mb-2 text-sm font-semibold">Biografi</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">{tokoh.biografi}</p>
                </div>
              )}

              {/* Achievements */}
              {tokoh.pencapaian && tokoh.pencapaian.length > 0 && (
                <div>
                  <h4 className="text-foreground mb-2 text-sm font-semibold">Pencapaian</h4>
                  <ul className="space-y-2">
                    {tokoh.pencapaian.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="text-foreground/70 flex items-start gap-2 text-sm"
                      >
                        <Award className="text-accent mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
