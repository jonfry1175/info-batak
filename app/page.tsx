import Link from 'next/link';
import Image from 'next/image';
import { TahukahKamu } from '@/components/ui/TahukahKamu';
import { UmpasaUmpamaSection } from '@/components/ui/UmpasaUmpamaSection';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/ui/MediaCard';
import { Hero } from '@/components/home/Hero';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { getLatestBerita } from '@/lib/data';

export default function Home() {
  const latestBerita = getLatestBerita(3);

  return (
    <div className="bg-background w-full overflow-x-hidden">
      <Hero />

      <PhilosophySection />

      {/* Featured Sections - Bento Grid Style */}
      <section className="relative px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">Jelajahi Budaya Batak</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Telusuri kekayaan budaya Batak dari aksara tradisional, sistem kekerabatan, hingga
              seni dan adat istiadat yang kaya makna.
            </p>
          </div>

          <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3">
            {/* Marga - Large Feature (2x2) */}
            <div className="md:col-span-2 md:row-span-2">
              <MediaCard
                title="Sistem Marga"
                description="Jelajahi sistem kekeluargaan Batak dengan filter interaktif untuk 6 rumpun: Toba, Karo, Simalungun, dan lainnya."
                href="/marga"
                category="Keluarga"
                image="/images/homepage/card-marga.jpg"
                imageAlt="Diagram sistem kekerabatan Batak"
                index={0}
              />
            </div>

            {/* Aksara - Tall (1x2) */}
            <div className="md:col-span-1 md:row-span-2">
              <MediaCard
                title="Aksara Batak"
                description="Pelajari sejarah dan cara membaca aksara tradisional Batak yang kaya akan pengetahuan leluhur."
                href="/budaya/aksara-batak"
                category="Budaya"
                image="/images/homepage/card-aksara.jpg"
                imageAlt="Naskah Pustaha dengan tulisan Aksara Batak"
                index={1}
              />
            </div>

            {/* Adat - Standard (1x1) */}
            <div className="md:col-span-1">
              <MediaCard
                title="Adat Istiadat"
                description="Pahami filosofi Dalihan Na Tolu dan berbagai tradisi adat."
                href="/budaya/adat-istiadat"
                category="Budaya"
                image="/images/homepage/card-adat.jpg"
                imageAlt="Upacara adat Batak"
                index={2}
              />
            </div>

            {/* Kesenian - Standard (1x1) */}
            <div className="md:col-span-1">
              <MediaCard
                title="Kesenian"
                description="Jelajahi seni tradisional Batak dari Tortor hingga Ulos."
                href="/budaya/kesenian"
                category="Seni"
                image="/images/homepage/card-kesenian.jpg"
                imageAlt="Penari Tortor dalam pakaian adat"
                index={3}
              />
            </div>

            {/* Arsitektur - Standard (1x1) */}
            <div className="md:col-span-1">
              <MediaCard
                title="Rumah Adat"
                description="Telusuri arsitektur unik Ruma Bolon dan Sopo."
                href="/budaya/arsitektur"
                category="Arsitektur"
                image="/images/homepage/card-arsitektur.jpg"
                imageAlt="Rumah adat Batak Toba"
                index={4}
              />
            </div>

            {/* Kuliner - Wide (3x1) - Spanning full bottom */}
            <div className="md:col-span-3">
              <MediaCard
                title="Kuliner Nusantara Batak"
                description="Kenali cita rasa autentik masakan Batak dari Arsik, Saksang, hingga tradisi minum Tuak yang melegenda."
                href="/budaya/kuliner"
                category="Kuliner"
                image="/images/homepage/card-kuliner.jpg"
                imageAlt="Hidangan tradisional Batak"
                index={5}
              />
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/budaya">Lihat Semua Kategori →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Did You Know - With Pattern Background */}
      <section className="relative overflow-hidden py-24">
        <div className="bg-accent/5 pattern-grid absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <TahukahKamu />
          </div>
        </div>
      </section>

      {/* Sastra Lisan: Umpasa & Umpama */}
      <section className="bg-background px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <UmpasaUmpamaSection />
        </div>
      </section>

      {/* Latest News Preview - Simple Clean Layout */}
      <section className="bg-background px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Berita Terkini</h2>
              <p className="text-muted-foreground">
                Update terbaru seputar budaya dan komunitas Batak
              </p>
            </div>
            <Link
              href="/berita"
              className="text-accent hover:text-accent/80 mb-1 hidden font-medium hover:underline sm:block"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {latestBerita.map((berita) => (
              <Link
                key={berita.id}
                href={`/berita/${berita.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={berita.gambar}
                    alt={berita.gambarAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span className="bg-accent/10 text-accent rounded-full px-2 py-0.5">
                      {berita.kategori}
                    </span>
                    <span>
                      •{' '}
                      {new Date(berita.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="group-hover:text-accent text-lg font-bold transition-colors">
                    {berita.judul}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">{berita.ringkasan}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/berita" className="text-accent font-medium hover:underline">
              Lihat Semua Berita →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
