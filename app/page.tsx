import Link from 'next/link';
import { TahukahKamu } from '@/components/ui/TahukahKamu';
import { Button } from '@/components/ui/button';
import { MediaCard, MediaCardGrid } from '@/components/ui/MediaCard';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Background Image Support */}
      <section className="relative overflow-hidden px-4 py-32 md:py-40">
        {/* Background - will show gradient until image is added */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background">
          {/* Future: Background image will go here
          <Image
            src="/images/homepage/hero-lake-toba.jpg"
            alt="Lake Toba"
            fill
            className="object-cover"
            priority
          />
          */}
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background/80" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="from-accent to-accent/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              InfoBatak.id
            </h1>
            <p className="text-foreground/90 mb-8 text-xl font-medium md:text-2xl">
              Portal Budaya Batak Modern
            </p>
            <p className="text-foreground/80 mx-auto mb-10 max-w-2xl text-lg">
              Melestarikan, mengedukasi, dan membagikan pengetahuan tentang sejarah, budaya, adat,
              aksara, dan sistem marga Batak kepada generasi muda dan masyarakat luas.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sejarah">Jelajahi Sejarah</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/marga">Lihat Marga</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections - Jelajahi Budaya Batak */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Jelajahi Budaya Batak</h2>
            <p className="text-foreground/70 mx-auto mt-4 max-w-2xl">
              Telusuri kekayaan budaya Batak dari aksara tradisional, sistem kekerabatan, hingga
              seni dan adat istiadat yang kaya makna
            </p>
          </div>

          <MediaCardGrid columns={3}>
            <MediaCard
              title="Aksara Batak"
              description="Pelajari sejarah dan cara membaca aksara tradisional Batak yang kaya akan pengetahuan leluhur."
              href="/budaya/aksara-batak"
              category="Budaya"
              image="/images/homepage/card-aksara.jpg"
              imageAlt="Naskah Pustaha dengan tulisan Aksara Batak"
              index={0}
            />

            <MediaCard
              title="Sistem Marga"
              description="Jelajahi sistem kekeluargaan Batak dengan filter interaktif untuk 6 rumpun: Toba, Karo, Simalungun, dan lainnya."
              href="/marga"
              category="Keluarga"
              image="/images/homepage/card-marga.jpg"
              imageAlt="Diagram sistem kekerabatan Batak"
              index={1}
            />

            <MediaCard
              title="Adat Istiadat"
              description="Pahami filosofi Dalihan Na Tolu dan berbagai tradisi adat yang mengatur kehidupan masyarakat Batak."
              href="/budaya/adat-istiadat"
              category="Budaya"
              image="/images/homepage/card-adat.jpg"
              imageAlt="Upacara adat Batak"
              index={2}
            />

            <MediaCard
              title="Kesenian"
              description="Jelajahi seni tradisional Batak dari Tortor, Gondang Sabangunan, hingga keindahan tenun Ulos dan Gorga."
              href="/budaya/kesenian"
              category="Seni"
              image="/images/homepage/card-kesenian.jpg"
              imageAlt="Penari Tortor dalam pakaian adat"
              index={3}
            />

            <MediaCard
              title="Rumah Adat"
              description="Telusuri arsitektur unik Ruma Bolon dan Sopo yang sarat dengan filosofi dan kearifan leluhur."
              href="/budaya/arsitektur"
              category="Arsitektur"
              image="/images/homepage/card-arsitektur.jpg"
              imageAlt="Rumah adat Batak Toba (Ruma Bolon)"
              index={4}
            />

            <MediaCard
              title="Kuliner"
              description="Kenali cita rasa autentik masakan Batak dari Arsik, Saksang, hingga tradisi minum Tuak."
              href="/budaya/kuliner"
              category="Kuliner"
              image="/images/homepage/card-kuliner.jpg"
              imageAlt="Hidangan tradisional Batak"
              index={5}
            />
          </MediaCardGrid>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/budaya">Lihat Semua Kategori →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Did You Know */}
      <section className="bg-foreground/5 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <TahukahKamu />
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Berita Terkini</h2>
            <Link href="/berita" className="text-accent hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border-foreground/10 bg-foreground/5 rounded-lg border p-6">
              <p className="text-foreground/60 mb-2 text-sm">Segera Hadir</p>
              <h3 className="mb-2 text-lg font-bold">Artikel akan ditambahkan</h3>
              <p className="text-foreground/70 text-sm">
                Kami sedang menyiapkan konten berkualitas untuk Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
