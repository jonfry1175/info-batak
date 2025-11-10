import Link from 'next/link';
import { TahukahKamu } from '@/components/ui/TahukahKamu';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-background py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              InfoBatak.id
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8">
              Portal Budaya Batak Modern
            </p>
            <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto">
              Melestarikan, mengedukasi, dan membagikan pengetahuan tentang sejarah, budaya, adat,
              aksara, dan sistem marga Batak kepada generasi muda dan masyarakat luas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sejarah"
                className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Jelajahi Sejarah
              </Link>
              <Link
                href="/marga"
                className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
              >
                Lihat Marga
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Jelajahi Budaya Batak</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Aksara Batak */}
            <Link
              href="/budaya/aksara-batak"
              className="group p-6 rounded-lg border border-foreground/10 hover:border-accent/50 transition-all hover:shadow-lg bg-foreground/5"
            >
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                Aksara Batak
              </h3>
              <p className="text-foreground/70">
                Pelajari sejarah dan cara membaca aksara tradisional Batak yang kaya akan
                pengetahuan leluhur.
              </p>
            </Link>

            {/* Marga */}
            <Link
              href="/marga"
              className="group p-6 rounded-lg border border-foreground/10 hover:border-accent/50 transition-all hover:shadow-lg bg-foreground/5"
            >
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                Sistem Marga
              </h3>
              <p className="text-foreground/70">
                Jelajahi sistem kekeluargaan Batak dengan filter interaktif untuk 6 rumpun: Toba,
                Karo, Simalungun, dan lainnya.
              </p>
            </Link>

            {/* Adat Istiadat */}
            <Link
              href="/budaya/adat-istiadat"
              className="group p-6 rounded-lg border border-foreground/10 hover:border-accent/50 transition-all hover:shadow-lg bg-foreground/5"
            >
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                Adat Istiadat
              </h3>
              <p className="text-foreground/70">
                Pahami filosofi Dalihan Na Tolu dan berbagai tradisi adat yang mengatur kehidupan
                masyarakat Batak.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Did You Know */}
      <section className="py-16 px-4 bg-foreground/5">
        <div className="max-w-3xl mx-auto">
          <TahukahKamu />
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Berita Terkini</h2>
            <Link href="/berita" className="text-accent hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-foreground/10 bg-foreground/5">
              <p className="text-foreground/60 text-sm mb-2">Segera Hadir</p>
              <h3 className="font-bold text-lg mb-2">Artikel akan ditambahkan</h3>
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
