import { MediaCard, MediaCardGrid } from '@/components/ui/MediaCard';

export default function BudayaPage() {
  const budayaCategories = [
    {
      title: 'Adat Istiadat',
      description: 'Sistem adat dan tradisi yang mengatur kehidupan masyarakat Batak',
      href: '/budaya/adat-istiadat',
      category: 'Adat',
      image: '/images/budaya/adat/card-adat.jpg',
    },
    {
      title: 'Kesenian',
      description: 'Seni musik (Gondang), tari (Tortor), kerajinan (Ulos, Gorga)',
      href: '/budaya/kesenian',
      category: 'Seni',
      image: '/images/budaya/kesenian/card-kesenian.jpg',
    },
    {
      title: 'Aksara Batak',
      description: 'Sistem tulisan tradisional yang kaya akan filosofi dan sejarah',
      href: '/budaya/aksara-batak',
      category: 'Aksara',
      image: '/images/budaya/aksara/card-aksara.jpg',
    },
    {
      title: 'Arsitektur Tradisional',
      description: 'Rumah Adat Batak (Ruma Bolon, Sopo) dengan konstruksi unik tanpa paku',
      href: '/budaya/arsitektur',
      category: 'Arsitektur',
      image: '/images/budaya/arsitektur/card-arsitektur.jpg',
    },
    {
      title: 'Kuliner Tradisional',
      description: 'Masakan khas Batak: Arsik, Saksang, Naniura dengan bumbu andaliman',
      href: '/budaya/kuliner',
      category: 'Kuliner',
      image: '/images/budaya/kuliner/card-kuliner.jpg',
    },
    {
      title: 'Pakaian Adat',
      description: 'Pakaian tradisional dan kain Ulos yang sarat makna filosofis',
      href: '/budaya/pakaian-adat',
      category: 'Pakaian',
      image: '/images/budaya/pakaian/card-pakaian.jpg',
    },
    {
      title: 'Bahasa Batak',
      description: 'Ragam dialek Batak (Toba, Karo, Simalungun) dan tradisi sastra lisan',
      href: '/budaya/bahasa',
      category: 'Bahasa',
      image: '/images/budaya/bahasa/card-bahasa.jpg',
    },
  ];

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-accent mb-6 text-4xl font-bold md:text-5xl">
          Budaya Batak
        </h1>
        <p className="text-foreground/70 mb-4 text-lg leading-relaxed">
          Masyarakat Batak memiliki kekayaan budaya yang luar biasa, mulai dari sistem adat
          yang mengatur kehidupan sosial, seni musik dan tari yang energik, aksara tradisional
          yang unik, hingga kuliner yang kaya akan rasa dan filosofi.
        </p>
        <p className="text-foreground/70 mb-12 text-lg leading-relaxed">
          Setiap aspek budaya Batak mencerminkan kebijaksanaan leluhur dan nilai-nilai luhur
          yang diwariskan turun-temurun. Jelajahi berbagai kategori budaya Batak di bawah ini:
        </p>

        {/* Category Cards Grid */}
        <section>
          <h2 className="mb-8 text-3xl font-bold">Kategori Budaya</h2>
          <MediaCardGrid columns={3}>
            {budayaCategories.map((category, index) => (
              <MediaCard
                key={category.href}
                title={category.title}
                description={category.description}
                image={category.image}
                href={category.href}
                category={category.category}
                index={index}
              />
            ))}
          </MediaCardGrid>
        </section>

        {/* Cultural Philosophy Section */}
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">Filosofi Budaya Batak</h2>
          <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
            <h3 className="mb-4 text-2xl font-semibold">Dalihan Na Tolu</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Konsep <span className="font-semibold">Dalihan Na Tolu</span> (tungku berkaki tiga)
              adalah fondasi kehidupan sosial masyarakat Batak. Tiga pilar ini adalah:
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-xl font-semibold">Hula-hula</h4>
                <p className="text-foreground/70 text-sm">
                  Pemberi istri (keluarga pihak istri/ibu). Dihormati setinggi-tingginya (somba).
                </p>
              </div>
              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-xl font-semibold">Dongan Tubu</h4>
                <p className="text-foreground/70 text-sm">
                  Saudara semarga (kerabat sedarah). Hubungan sejajar dan saling menghormati.
                </p>
              </div>
              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-xl font-semibold">Boru</h4>
                <p className="text-foreground/70 text-sm">
                  Penerima istri (yang menikahi anak perempuan). Dihargai dan dilindungi (elek).
                </p>
              </div>
            </div>
            <p className="text-foreground/80 mt-6 leading-relaxed">
              Ketiga pilar ini harus ada dan seimbang dalam setiap upacara adat. Seperti tungku
              yang membutuhkan tiga kaki untuk stabil, masyarakat Batak membutuhkan ketiga elemen
              ini untuk harmonis.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">Nilai-Nilai Luhur</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-3 text-xl font-semibold">Hamoraon</h3>
              <p className="text-foreground/70 leading-relaxed">
                Kekayaan material yang diperoleh melalui kerja keras dan kejujuran. Bukan hanya
                harta, tapi juga kebijaksanaan dalam mengelolanya.
              </p>
            </div>
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-3 text-xl font-semibold">Hagabeon</h3>
              <p className="text-foreground/70 leading-relaxed">
                Banyak keturunan yang berkualitas. Simbol kelanjutan marga dan kebahagiaan
                keluarga yang harmonis.
              </p>
            </div>
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-3 text-xl font-semibold">Hasangapon</h3>
              <p className="text-foreground/70 leading-relaxed">
                Kehormatan dan martabat yang diperoleh melalui perilaku baik, belas kasihan, dan
                kontribusi kepada masyarakat.
              </p>
            </div>
          </div>
          <div className="bg-accent/10 mt-6 rounded-lg p-6">
            <p className="text-foreground/80 italic leading-relaxed">
              "Hamoraon di na tongtong, Hagabeon di na so pola, Hasangapon di na marroha"
            </p>
            <p className="text-foreground/70 mt-2 text-sm">
              Kekayaan pada yang jujur, Banyak keturunan pada yang setia, Kehormatan pada yang
              berbelas kasihan.
            </p>
          </div>
        </section>

        {/* Cultural Colors Section */}
        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">Warna Budaya Batak</h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            Tiga warna utama dalam budaya Batak memiliki makna filosofis yang dalam, mencerminkan
            nilai-nilai kehidupan:
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border-accent rounded-lg border-2 p-6">
              <div className="bg-accent mb-4 h-16 rounded"></div>
              <h3 className="text-accent mb-2 text-xl font-semibold">Merah</h3>
              <p className="text-foreground/70 text-sm">
                Melambangkan keberanian, kekuatan, semangat, dan kehidupan yang penuh vitalitas.
              </p>
            </div>
            <div className="rounded-lg border-2 border-black p-6">
              <div className="mb-4 h-16 rounded bg-black"></div>
              <h3 className="mb-2 text-xl font-semibold">Hitam</h3>
              <p className="text-foreground/70 text-sm">
                Melambangkan kebijaksanaan, keteguhan hati, keseriusan, dan kedewasaan.
              </p>
            </div>
            <div className="rounded-lg border-2 border-gray-300 p-6">
              <div className="mb-4 h-16 rounded bg-white"></div>
              <h3 className="mb-2 text-xl font-semibold">Putih</h3>
              <p className="text-foreground/70 text-sm">
                Melambangkan kesucian, kejujuran, spiritualitas, dan kemurnian niat.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
