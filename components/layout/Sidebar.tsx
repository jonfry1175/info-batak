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
      <Card className="border-border/60 overflow-hidden shadow-sm">
        <CardHeader className="border-border/40 bg-muted/10 border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-accent/10 text-accent ring-accent/20 flex h-8 w-8 items-center justify-center rounded-lg ring-1">
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
                  className="group hover:bg-muted/50 border-border/40 relative flex gap-4 border-b p-4 transition-colors duration-200 last:border-0"
                >
                  <span className="text-muted-foreground/50 bg-muted group-hover:bg-accent mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 group-hover:text-white">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <h4 className="group-hover:text-accent line-clamp-2 text-sm leading-snug font-medium transition-colors duration-200">
                      {berita.judul}
                    </h4>

                    <div className="text-muted-foreground flex items-center gap-3 text-xs">
                      <span className="bg-accent/5 text-accent border-accent/10 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium">
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
            <div className="text-muted-foreground p-8 text-center">
              <p className="text-sm">Belum ada artikel populer.</p>
            </div>
          )}
        </CardContent>

        {popularArticles.length > 0 && (
          <CardFooter className="border-border/40 bg-muted/20 border-t p-2">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-accent group h-9 w-full justify-between"
              size="sm"
            >
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
