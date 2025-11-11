'use client';

import { getRandomFakta } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Fakta } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function TahukahKamu() {
  const [fakta, setFakta] = useState<Fakta | null>(null);

  const refreshFakta = () => {
    setFakta(getRandomFakta());
  };

  useEffect(() => {
    setFakta(getRandomFakta());
  }, []);

  if (!fakta) {
    return (
      <div className="bg-accent/10 border-accent animate-pulse rounded-lg border-l-4 p-6">
        <div className="bg-accent/20 mb-3 h-6 w-3/4 rounded"></div>
        <div className="bg-accent/20 mb-2 h-4 w-full rounded"></div>
        <div className="bg-accent/20 h-4 w-5/6 rounded"></div>
      </div>
    );
  }

  return (
    <Alert className="border-l-accent border-l-4">
      <div className="flex flex-col gap-4 md:flex-row">
        {fakta.image && (
          <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-lg md:w-64">
            <Image
              src={fakta.image}
              alt={fakta.imageAlt || fakta.teks}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
            {fakta.imageCredit && !fakta.imageCredit.includes('Placeholder') && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-white">
                © {fakta.imageCredit}
              </div>
            )}
          </div>
        )}

        <div className="flex-1">
          <div className="mb-2 flex items-start gap-2">
            <Info className="text-accent mt-0.5 h-4 w-4 flex-shrink-0" />
            <AlertTitle className="flex flex-wrap items-center gap-2">
              Tahukah Kamu?
              {fakta.kategori && <Badge variant="secondary">{fakta.kategori}</Badge>}
            </AlertTitle>
          </div>
          <AlertDescription className="text-foreground/80 mb-4">{fakta.teks}</AlertDescription>

          <div className="flex flex-wrap gap-2">
            <Button onClick={refreshFakta} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-3 w-3" />
              Fakta Lain
            </Button>
            {fakta.relatedPage && (
              <Button asChild variant="ghost" size="sm">
                <Link href={fakta.relatedPage}>Pelajari Lebih Lanjut →</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Alert>
  );
}
