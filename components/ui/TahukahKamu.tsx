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
      <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-accent/20 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-accent/20 rounded w-full mb-2"></div>
        <div className="h-4 bg-accent/20 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 transition-all hover:shadow-md">
      <div className="flex items-start space-x-3">
        <svg
          className="w-6 h-6 text-accent flex-shrink-0 mt-0.5"
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
          <h3 className="font-bold text-accent mb-2">Tahukah Kamu?</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{fakta.teks}</p>
          {fakta.kategori && (
            <span className="inline-block mt-3 text-xs px-2 py-1 bg-accent/20 text-accent rounded">
              {fakta.kategori}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
