'use client';

import { motion } from 'framer-motion';
import { BatakFigure } from '@/components/ui/BatakFigure';
import { Rumpun } from '@/types';

interface MargaFilterVisualProps {
  selectedRumpun: Rumpun | 'Semua';
  onSelectRumpun: (rumpun: Rumpun | 'Semua') => void;
}

// Gradient configurations for each rumpun
const rumpunGradients = {
  Semua: {
    gradient: 'from-red-500 via-red-600 to-red-700',
    hoverGradient: 'group-hover:from-red-600 group-hover:via-red-700 group-hover:to-red-800',
    textColor: 'text-white',
    borderColor: 'border-red-500',
  },
  Toba: {
    gradient: 'from-blue-500 via-teal-500 to-cyan-600',
    hoverGradient: 'group-hover:from-blue-600 group-hover:via-teal-600 group-hover:to-cyan-700',
    textColor: 'text-white',
    borderColor: 'border-blue-500',
  },
  Karo: {
    gradient: 'from-green-500 via-lime-500 to-yellow-500',
    hoverGradient: 'group-hover:from-green-600 group-hover:via-lime-600 group-hover:to-yellow-600',
    textColor: 'text-white',
    borderColor: 'border-green-500',
  },
  Simalungun: {
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    hoverGradient: 'group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-rose-600',
    textColor: 'text-white',
    borderColor: 'border-purple-500',
  },
  Pakpak: {
    gradient: 'from-orange-500 via-amber-500 to-yellow-600',
    hoverGradient: 'group-hover:from-orange-600 group-hover:via-amber-600 group-hover:to-yellow-700',
    textColor: 'text-white',
    borderColor: 'border-orange-500',
  },
  Angkola: {
    gradient: 'from-amber-700 via-yellow-700 to-orange-700',
    hoverGradient: 'group-hover:from-amber-800 group-hover:via-yellow-800 group-hover:to-orange-800',
    textColor: 'text-white',
    borderColor: 'border-amber-700',
  },
  Mandailing: {
    gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    hoverGradient: 'group-hover:from-indigo-700 group-hover:via-blue-700 group-hover:to-cyan-700',
    textColor: 'text-white',
    borderColor: 'border-indigo-600',
  },
};

const rumpunOptions: (Rumpun | 'Semua')[] = [
  'Semua',
  'Toba',
  'Karo',
  'Simalungun',
  'Pakpak',
  'Angkola',
  'Mandailing',
];

export function MargaFilterVisual({ selectedRumpun, onSelectRumpun }: MargaFilterVisualProps) {
  return (
    <div className="mb-16 w-full">
      <div className="mx-auto max-w-7xl">
        {/* Main Visual Section */}
        <div className="bg-foreground/5 rounded-2xl p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Section - Figure and Text */}
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 lg:col-span-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated Figure */}
              <div className="relative">
                <BatakFigure />
              </div>

              {/* Info Text */}
              <div className="text-center lg:text-left">
                <motion.h2
                  className="text-accent mb-3 text-2xl font-bold md:text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Tahu gak, Batak punya 6 kategori loh!
                </motion.h2>
                <motion.p
                  className="text-foreground/70 text-sm md:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Setiap rumpun Batak memiliki sistem marga yang unik. Pilih salah satu untuk
                  menjelajahi marga-marga di dalamnya.
                </motion.p>
              </div>
            </motion.div>

            {/* Right Section - Category Cards */}
            <div className="lg:col-span-8">
              <motion.div
                className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {rumpunOptions.map((rumpun, index) => {
                  const config = rumpunGradients[rumpun];
                  const isSelected = selectedRumpun === rumpun;

                  return (
                    <motion.button
                      key={rumpun}
                      onClick={() => onSelectRumpun(rumpun)}
                      className={`group relative overflow-hidden rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-accent/50 ${
                        isSelected ? `ring-4 ${config.borderColor} ring-offset-2 ring-offset-background` : ''
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6 + index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -8,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`bg-gradient-to-br ${config.gradient} ${config.hoverGradient} absolute inset-0 transition-all duration-300`}
                      />

                      {/* Pattern Overlay */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(255, 255, 255, 0.1) 10px,
                            rgba(255, 255, 255, 0.1) 20px
                          )`,
                        }}
                      />

                      {/* Content */}
                      <div className="relative flex min-h-[100px] flex-col items-center justify-center p-4 sm:min-h-[120px]">
                        <motion.div
                          className={`text-center ${config.textColor}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <h3 className="text-lg font-bold drop-shadow-lg sm:text-xl md:text-2xl">
                            {rumpun}
                          </h3>
                        </motion.div>

                        {/* Selected Indicator */}
                        {isSelected && (
                          <motion.div
                            className="bg-background absolute bottom-2 right-2 rounded-full p-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <svg
                              className="text-accent h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>

                      {/* Hover Shadow Effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 shadow-2xl transition-opacity duration-300 group-hover:opacity-100" />
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

