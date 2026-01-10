import { TahukahKamu } from '@/components/ui/TahukahKamu';
import { getLatestBerita } from '@/lib/data';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export function Sidebar() {
  const popularArticles = getLatestBerita(5);

  return (
    <aside className="space-y-8">
      {/* Did You Know Component */}
      <TahukahKamu />

      {/* Popular Articles */}
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
              <TrendingUp className="h-4 w-4" />
            </div>
            <CardTitle className="text-lg">Artikel Populer</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {popularArticles.length > 0 ? (
            <div className="flex flex-col">
              {popularArticles.map((berita, index) => (
                <Link
                  key={berita.id}
                  href={`/berita/${berita.slug}`}
                  className="group relative flex gap-4 p-4 hover:bg-muted/50 transition-colors duration-200 border-b border-border/40 last:border-0"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-muted-foreground/50 bg-muted group-hover:bg-accent group-hover:text-white transition-colors duration-200 mt-0.5">
                    {index + 1}
                  </span>
                  
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <h4 className="text-sm font-medium leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {berita.judul}
                    </h4>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center rounded-full bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent border border-accent/10">
                        {berita.kategori}
                      </span>
                      <span className="flex items-center gap-1 opacity-80">
                        <Calendar className="h-3 w-3" />
                        {new Date(berita.tanggal).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">Belum ada artikel populer.</p>
            </div>
          )}
        </CardContent>
        
        {popularArticles.length > 0 && (
          <CardFooter className="p-2 border-t border-border/40 bg-muted/20">
            <Button asChild variant="ghost" className="w-full justify-between text-muted-foreground hover:text-accent group h-9" size="sm">
              <Link href="/berita">
                Lihat Semua Berita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </aside>
  );
}
