'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllMarga } from '@/lib/data';
import { Marga } from '@/types';

export function MargaSearch() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Marga[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [allMarga, setAllMarga] = React.useState<Marga[]>([]);

  React.useEffect(() => {
    // Load marga data on mount
    setAllMarga(getAllMarga());
  }, []);

  React.useEffect(() => {
    if (query.length > 1) {
      const filtered = allMarga
        .filter((m) => m.nama.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, allMarga]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query) {
      router.push(`/marga?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <form onSubmit={handleSearch} className="group relative">
        <div className="relative flex items-center">
          <Search className="text-muted-foreground group-focus-within:text-accent absolute left-3 h-5 w-5 transition-colors" />
          <Input
            type="text"
            placeholder="Cari marga kamu (contoh: Sinaga, Lubis)..."
            className="border-accent/20 focus-visible:ring-accent bg-background/90 h-12 pl-10 text-base shadow-lg backdrop-blur-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-accent hover:bg-accent/90 absolute right-1 h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-background/95 border-border absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border p-2 shadow-xl backdrop-blur-md"
          >
            <div className="text-muted-foreground px-3 py-2 text-xs font-medium">
              Hasil Pencarian
            </div>
            <ul className="space-y-1">
              {results.map((marga) => (
                <li key={marga.id}>
                  <button
                    onClick={() => {
                      setQuery(marga.nama);
                      router.push(`/marga?search=${encodeURIComponent(marga.nama)}`);
                      setIsOpen(false);
                    }}
                    className="hover:bg-accent/10 hover:text-accent flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors"
                  >
                    <span className="font-medium">{marga.nama}</span>
                    <span className="text-muted-foreground bg-secondary rounded-full px-2 py-0.5 text-xs">
                      {marga.rumpun}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t px-2 pt-2">
              <button
                onClick={() => handleSearch()}
                className="text-accent w-full py-1 text-center text-sm hover:underline"
              >
                Lihat semua hasil "{query}"
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
