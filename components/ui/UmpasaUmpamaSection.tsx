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
  const [currentExample, setCurrentExample] = useState<
    UmpasaExample | ProverbsExample | null
  >(() => getRandomExample(defaultMode));

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
    <section
      id="sastra"
      className={cn('mb-24 scroll-mt-24', className)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 md:p-16 text-center">
        <div className="absolute inset-0 bg-[url('/images/pattern-batak.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl">
          {showTitle && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-background/10 p-4 backdrop-blur-sm">
                  <Quote className="h-8 w-8 text-accent" />
                </div>
              </div>

              <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                Sastra Lisan: Umpasa & Umpama
              </h2>
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
                  ? 'bg-accent text-white hover:bg-accent/90'
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
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'border-background/30 bg-background/10 text-background hover:bg-background/20'
              )}
            >
              Umpama
            </Button>
          </div>

          {/* Current Example Display */}
          <div className="mb-10 space-y-2">
            <p className="text-xl italic font-medium md:text-2xl text-background/90">
              &quot;{currentExample.toba}&quot;
            </p>
            <p className="text-background/60">
              ({currentExample.indonesian})
            </p>
          </div>

          {/* Meaning and Usage */}
          <div className="mb-6 rounded-xl bg-background/5 p-6 backdrop-blur-sm border border-white/10 text-left">
            <h3 className="mb-2 font-bold text-accent">Makna:</h3>
            <p className="text-sm text-background/80 mb-4">
              {currentExample.meaning}
            </p>
            {hasUsage && (
              <>
                <h3 className="mb-2 font-bold text-accent">Penggunaan:</h3>
                <p className="text-sm text-background/80">
                  {currentExample.usage}
                </p>
              </>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid gap-6 text-left md:grid-cols-2 text-background/80 mb-6">
            <div className="rounded-xl bg-background/5 p-6 backdrop-blur-sm border border-white/10">
              <h3 className="mb-2 font-bold text-accent">Umpasa (Pantun)</h3>
              <p className="text-sm">
                Digunakan dalam upacara adat untuk menyampaikan berkat (pasu-pasu). Memiliki sampiran dan isi yang rimanya teratur.
              </p>
            </div>
            <div className="rounded-xl bg-background/5 p-6 backdrop-blur-sm border border-white/10">
              <h3 className="mb-2 font-bold text-accent">Umpama (Perumpamaan)</h3>
              <p className="text-sm">
                Ungkapan kiasan yang mengambil contoh dari alam atau sifat binatang untuk menasihati kebijaksanaan hidup.
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="rounded-full border-background/30 bg-background/10 text-background hover:bg-background/20"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Lihat Contoh Lain
          </Button>
        </div>
      </div>
    </section>
  );
}
