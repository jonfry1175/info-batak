'use client';

import { useState } from 'react';
import { getUmpasaExamples, getProverbsExamples } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UmpasaUmpamaSectionProps {
  defaultMode?: 'umpasa' | 'umpama';
  showTitle?: boolean;
  className?: string;
}

type Mode = 'umpasa' | 'umpama';

interface UmpasaExample {
  toba: string;
  indonesian: string;
  meaning: string;
  usage: string;
}

interface ProverbsExample {
  toba: string;
  indonesian: string;
  meaning: string;
}

export function UmpasaUmpamaSection({
  defaultMode = 'umpasa',
  showTitle = true,
  className,
}: UmpasaUmpamaSectionProps) {
  const umpasaExamples = getUmpasaExamples();
  const proverbsExamples = getProverbsExamples();

  const getRandomExample = (type: Mode): UmpasaExample | ProverbsExample | null => {
    if (type === 'umpasa') {
      if (umpasaExamples.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * umpasaExamples.length);
      return umpasaExamples[randomIndex] as UmpasaExample;
    } else {
      if (proverbsExamples.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * proverbsExamples.length);
      return proverbsExamples[randomIndex] as ProverbsExample;
    }
  };

  const [mode, setMode] = useState<Mode>(defaultMode);
  const [currentExample, setCurrentExample] = useState<UmpasaExample | ProverbsExample | null>(() =>
    getRandomExample(defaultMode)
  );

  const handleToggle = (newMode: Mode) => {
    setMode(newMode);
    setCurrentExample(getRandomExample(newMode));
  };

  const handleRefresh = () => {
    setCurrentExample(getRandomExample(mode));
  };

  if (!currentExample) {
    return null;
  }

  const isUmpasa = mode === 'umpasa';
  const hasUsage = isUmpasa && 'usage' in currentExample;

  return (
    <section id="sastra" className={cn('mb-24 scroll-mt-24', className)}>
      <div className="bg-foreground text-background relative overflow-hidden rounded-3xl p-8 text-center md:p-16">
        <div className="absolute inset-0 bg-[url('/images/pattern-batak.png')] opacity-10" />
        <div className="from-accent/20 absolute inset-0 bg-gradient-to-br to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl">
          {showTitle && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="bg-background/10 rounded-full p-4 backdrop-blur-sm">
                  <Quote className="text-accent h-8 w-8" />
                </div>
              </div>

              <h2 className="mb-8 text-3xl font-bold md:text-4xl">Sastra Lisan: Umpasa & Umpama</h2>
            </>
          )}

          {/* Toggle Buttons */}
          <div className="mb-8 flex justify-center gap-3">
            <Button
              onClick={() => handleToggle('umpasa')}
              variant={mode === 'umpasa' ? 'default' : 'outline'}
              className={cn(
                'rounded-full',
                mode === 'umpasa'
                  ? 'bg-accent hover:bg-accent/90 text-white'
                  : 'border-background/30 bg-background/10 text-background hover:bg-background/20'
              )}
            >
              Umpasa
            </Button>
            <Button
              onClick={() => handleToggle('umpama')}
              variant={mode === 'umpama' ? 'default' : 'outline'}
              className={cn(
                'rounded-full',
                mode === 'umpama'
                  ? 'bg-accent hover:bg-accent/90 text-white'
                  : 'border-background/30 bg-background/10 text-background hover:bg-background/20'
              )}
            >
              Umpama
            </Button>
          </div>

          {/* Current Example Display */}
          <div className="mb-10 space-y-2">
            <p className="text-background/90 text-xl font-medium italic md:text-2xl">
              &quot;{currentExample.toba}&quot;
            </p>
            <p className="text-background/60">({currentExample.indonesian})</p>
          </div>

          {/* Meaning and Usage */}
          <div className="bg-background/5 mb-6 rounded-xl border border-white/10 p-6 text-left backdrop-blur-sm">
            <h3 className="text-accent mb-2 font-bold">Makna:</h3>
            <p className="text-background/80 mb-4 text-sm">{currentExample.meaning}</p>
            {hasUsage && (
              <>
                <h3 className="text-accent mb-2 font-bold">Penggunaan:</h3>
                <p className="text-background/80 text-sm">{currentExample.usage}</p>
              </>
            )}
          </div>

          {/* Info Cards */}
          <div className="text-background/80 mb-6 grid gap-6 text-left md:grid-cols-2">
            <div className="bg-background/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="text-accent mb-2 font-bold">Umpasa (Pantun)</h3>
              <p className="text-sm">
                Digunakan dalam upacara adat untuk menyampaikan berkat (pasu-pasu). Memiliki
                sampiran dan isi yang rimanya teratur.
              </p>
            </div>
            <div className="bg-background/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="text-accent mb-2 font-bold">Umpama (Perumpamaan)</h3>
              <p className="text-sm">
                Ungkapan kiasan yang mengambil contoh dari alam atau sifat binatang untuk menasihati
                kebijaksanaan hidup.
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="border-background/30 bg-background/10 text-background hover:bg-background/20 rounded-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Lihat Contoh Lain
          </Button>
        </div>
      </div>
    </section>
  );
}
