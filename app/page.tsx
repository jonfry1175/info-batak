import Link from 'next/link';
import { TahukahKamu } from '@/components/ui/TahukahKamu';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/ui/MediaCard';
import { Hero } from '@/components/home/Hero';
import { PhilosophySection } from '@/components/home/PhilosophySection';

export default function Home() {
  return (
    <div className="w-full bg-background overflow-x-hidden">
      <Hero />

      <PhilosophySection />

      {/* Featured Sections - Bento Grid Style */}
      <section className="px-4 py-24 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Jelajahi Budaya Batak</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Telusuri kekayaan budaya Batak dari aksara tradisional, sistem kekerabatan, hingga
              seni dan adat istiadat yang kaya makna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pattern-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl">
            <TahukahKamu />
          </div>
        </div>
      </section>

      {/* Latest News Preview - Simple Clean Layout */}
      <section className="px-4 py-24 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12 border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Berita Terkini</h2>
              <p className="text-muted-foreground">Update terbaru seputar budaya dan komunitas Batak</p>
            </div>
            <Link href="/berita" className="text-accent hover:text-accent/80 font-medium hover:underline mb-1 hidden sm:block">
              Lihat Semua →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-muted aspect-video rounded-xl mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-accent/10 flex items-center justify-center text-muted-foreground/50 font-medium">
                     Coming Soon
                   </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full">Berita</span>
                    <span>• 25 Des 2025</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-accent transition-colors">Artikel Menarik Segera Hadir</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    Kami sedang menyiapkan konten berkualitas mendalam tentang sejarah dan perkembangan budaya Batak di era modern.
                  </p>
                </div>
              </div>
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
