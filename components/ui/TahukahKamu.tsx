'use client';

import { getRandomFakta } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Fakta } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export function TahukahKamu() {
  const [fakta, setFakta] = useState<Fakta | null>(null);

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
      <Info className="text-accent h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        Tahukah Kamu?
        {fakta.kategori && <Badge variant="secondary">{fakta.kategori}</Badge>}
      </AlertTitle>
      <AlertDescription className="text-foreground/80">{fakta.teks}</AlertDescription>
    </Alert>
  );
}
