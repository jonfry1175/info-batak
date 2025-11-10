'use client';

import { getRandomFakta } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Fakta } from '@/types';

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
    <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-6 transition-all hover:shadow-md">
      <div className="flex items-start space-x-3">
        <svg
          className="text-accent mt-0.5 h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="text-accent mb-2 font-bold">Tahukah Kamu?</h3>
          <p className="text-foreground/80 text-sm leading-relaxed">{fakta.teks}</p>
          {fakta.kategori && (
            <span className="bg-accent/20 text-accent mt-3 inline-block rounded px-2 py-1 text-xs">
              {fakta.kategori}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
