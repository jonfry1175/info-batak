'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getLatestBerita } from '@/lib/data';
import { DiscussionSection } from '@/components/discussion';
import { Berita } from '@/types';

interface BeritaDetailClientProps {
  berita: Berita;
}

function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BeritaDetailClient({ berita }: BeritaDetailClientProps) {
  const pathname = usePathname();
  const relatedBerita = getLatestBerita(4)
    .filter((b) => b.slug !== berita.slug)
    .slice(0, 3);

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="text-foreground/60 flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Beranda
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/berita" className="hover:text-accent transition-colors">
                  Berita
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground truncate">{berita.judul}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-accent rounded-full px-3 py-1 text-sm font-medium text-white">
                {berita.kategori}
              </span>
              <span className="text-foreground/60 text-sm">{formatTanggal(berita.tanggal)}</span>
            </div>
            <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{berita.judul}</h1>
            <p className="text-foreground/70 text-lg">{berita.ringkasan}</p>
            <div className="text-foreground/50 mt-4 text-sm">
              Oleh <span className="font-medium">{berita.penulis}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={berita.gambar}
              alt={berita.gambarAlt}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          {berita.gambarCredit && (
            <p className="text-foreground/50 -mt-6 mb-8 text-center text-xs">
              Foto: {berita.gambarCredit}
            </p>
          )}

          {/* Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {berita.konten.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/80 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Tags */}
          <div className="border-foreground/10 mt-8 border-t pt-6">
            <div className="flex flex-wrap gap-2">
              {berita.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-foreground/5 text-foreground/70 rounded-full px-3 py-1 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Discussion Section */}
          <DiscussionSection pagePath={pathname} />

          {/* Related Articles */}
          {relatedBerita.length > 0 && (
            <section className="border-foreground/10 mt-12 border-t pt-8">
              <h2 className="text-foreground mb-6 text-2xl font-bold">Berita Lainnya</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedBerita.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`} className="group">
                    <article className="bg-foreground/5 border-foreground/10 overflow-hidden rounded-xl border transition-all hover:shadow-lg">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.gambar}
                          alt={item.gambarAlt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-accent text-xs font-medium">{item.kategori}</span>
                        <h3 className="text-foreground group-hover:text-accent mt-1 line-clamp-2 leading-tight font-bold transition-colors">
                          {item.judul}
                        </h3>
                        <span className="text-foreground/50 mt-2 block text-xs">
                          {formatTanggal(item.tanggal)}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/berita"
              className="bg-accent hover:bg-accent/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-colors"
            >
              ← Kembali ke Berita
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
