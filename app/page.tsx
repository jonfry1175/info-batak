import Link from 'next/link';
import { TahukahKamu } from '@/components/ui/TahukahKamu';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="from-accent/10 via-background to-background bg-gradient-to-br px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="from-accent to-accent/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              InfoBatak.id
            </h1>
            <p className="text-foreground/80 mb-8 text-xl md:text-2xl">
              Portal Budaya Batak Modern
            </p>
            <p className="text-foreground/70 mx-auto mb-10 max-w-2xl text-lg">
              Melestarikan, mengedukasi, dan membagikan pengetahuan tentang sejarah, budaya, adat,
              aksara, dan sistem marga Batak kepada generasi muda dan masyarakat luas.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/sejarah"
                className="bg-accent hover:bg-accent/90 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
              >
                Jelajahi Sejarah
              </Link>
              <Link
                href="/marga"
                className="border-accent text-accent hover:bg-accent/10 rounded-lg border-2 px-8 py-3 font-semibold transition-colors"
              >
                Lihat Marga
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Jelajahi Budaya Batak</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Aksara Batak */}
            <Link
              href="/budaya/aksara-batak"
              className="group border-foreground/10 hover:border-accent/50 bg-foreground/5 rounded-lg border p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">📜</div>
              <h3 className="group-hover:text-accent mb-2 text-xl font-bold transition-colors">
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
              className="group border-foreground/10 hover:border-accent/50 bg-foreground/5 rounded-lg border p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">👨‍👩‍👧‍👦</div>
              <h3 className="group-hover:text-accent mb-2 text-xl font-bold transition-colors">
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
              className="group border-foreground/10 hover:border-accent/50 bg-foreground/5 rounded-lg border p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">🎭</div>
              <h3 className="group-hover:text-accent mb-2 text-xl font-bold transition-colors">
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
