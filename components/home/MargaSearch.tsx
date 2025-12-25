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
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative group">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input
            type="text"
            placeholder="Cari marga kamu (contoh: Sinaga, Lubis)..."
            className="pl-10 h-12 text-base shadow-lg border-accent/20 focus-visible:ring-accent bg-background/90 backdrop-blur-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
          />
          <Button 
            type="submit" 
            size="icon"
            className="absolute right-1 h-10 w-10 bg-accent hover:bg-accent/90"
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
            className="absolute top-full left-0 right-0 mt-2 p-2 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="text-xs font-medium text-muted-foreground px-3 py-2">
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
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors text-left"
                  >
                    <span className="font-medium">{marga.nama}</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {marga.rumpun}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t pt-2 px-2">
              <button
                onClick={() => handleSearch()}
                className="w-full text-center text-sm text-accent hover:underline py-1"
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

