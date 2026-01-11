import { Metadata } from 'next';
import { Gallery } from '@/components/ui/Gallery';
import { getImagesByCategory } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { PageDiscussion } from '@/components/discussion';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Aksara Batak - Sejarah, Panduan Membaca & Pustaha',
  description:
    'Pelajari Aksara Batak tradisional: Ina ni Surat (19 huruf dasar), Anak ni Surat (tanda diakritik), sejarah dari Pallava, dan media Pustaha. Termasuk dalam Unicode sejak 2010.',
  keywords: [
    'aksara batak',
    'huruf batak',
    'pustaha',
    'ina ni surat',
    'anak ni surat',
    'tulisan batak',
    'surat batak',
  ],
  openGraph: {
    title: 'Aksara Batak - Warisan Tulisan Tradisional',
    description:
      'Panduan lengkap membaca dan memahami Aksara Batak tradisional yang digunakan dalam Pustaha.',
    url: 'https://infobatak.id/budaya/aksara-batak',
    images: ['/images/budaya/aksara/hero-aksara.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/budaya/aksara-batak',
  },
};

export default function AksaraBatakPage() {
  // Get images for Pustaha gallery
  const pustahaImages = getImagesByCategory('Budaya', 'Aksara Batak');

  return (
    <>
      <PageHero
        title="Aksara Batak"
        subtitle="Jelajahi kekayaan aksara tradisional Batak yang menjadi warisan budaya leluhur"
        backgroundImage="/images/budaya/aksara/hero-aksara.png"
      />
      <div className="w-full px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Definition */}
          <section className="mb-16">
            <div className="grid gap-8 md:grid-cols-2 lg:items-center">
              <div className="bg-accent/5 border-accent rounded-lg border-l-4 p-8">
                <h2 className="text-accent mb-4 text-3xl font-bold">Apa itu Aksara Batak?</h2>
                <div className="text-foreground/80 space-y-4 leading-relaxed">
                  <p>
                    Aksara Batak adalah sistem tulisan tradisional yang digunakan oleh masyarakat
                    Batak di Sumatera Utara. Aksara ini termasuk dalam kelompok aksara <em>Brahmi</em>{' '}
                    atau <em>Pallava</em> yang memiliki kemiripan dengan aksara-aksara lain di
                    Nusantara seperti Aksara Jawa, Sunda, dan Bali.
                  </p>
                  <p>
                    Aksara ini memiliki nilai spiritual dan kebudayaan yang tinggi, karena digunakan
                    dalam penulisan kitab-kitab pusaka (<em>pustaha</em>) yang berisi pengetahuan
                    tradisional, ramalan, mantra, dan berbagai ilmu pengetahuan leluhur.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
                <Image
                  src="/images/budaya/aksara/illustration-pustaha.png"
                  alt="Traditional Batak Pustaha"
                  fill
                  className="object-cover"
                />
                <div className="from-black/60 to-transparent absolute inset-0 bg-gradient-to-t" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-white">
                  Pustaha: Kitab kuno beraksara Batak
                </p>
              </div>
            </div>
          </section>

          {/* History */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Sejarah Aksara Batak</h2>
            <div className="text-foreground/80 space-y-6 leading-relaxed">
              <div className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-xl font-bold">Asal Usul</h3>
                <p>
                  Aksara Batak dipercaya berasal dari aksara Pallava yang dibawa ke Nusantara
                  sekitar abad ke-5 Masehi. Aksara ini kemudian berkembang dan beradaptasi dengan
                  kebutuhan bahasa-bahasa lokal di Sumatera Utara.
                </p>
              </div>

              <div className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-xl font-bold">Pustaha: Media Aksara Batak</h3>
                <p>
                  Aksara Batak tradisional ditulis pada media yang disebut <em>pustaha</em>, yaitu
                  buku yang terbuat dari kulit kayu (<em>alim</em> atau <em>laklak</em>) yang
                  dilipat seperti akordeon. Tulisan dibuat menggunakan pisau kecil (<em>pongot</em>)
                  dan tinta dari jelaga (<em>apu</em>).
                </p>
                <p className="mt-3">
                  Pustaha berisi berbagai pengetahuan penting seperti: parbegu (ilmu roh), poda
                  (ramalan), tarombo (silsilah keluarga), dan ilmu pengobatan tradisional. Para ahli
                  yang menguasai aksara ini disebut <em>datu</em> atau <em>guru</em>.
                </p>
              </div>

              <div className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-xl font-bold">Perkembangan Modern</h3>
                <p>
                  Seiring masuknya sistem pendidikan modern dan penggunaan huruf Latin, penggunaan
                  Aksara Batak mulai menurun pada abad ke-20. Namun, upaya pelestarian terus
                  dilakukan melalui pendidikan, digitalisasi, dan penggunaan dalam seni serta
                  kebudayaan kontemporer.
                </p>
                <p className="mt-3">
                  Pada tahun 2010, Aksara Batak berhasil dimasukkan ke dalam standar Unicode, yang
                  memungkinkan penggunaannya di komputer dan perangkat digital modern.
                </p>
              </div>
            </div>
          </section>

          {/* Reading Guide */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Panduan Membaca Aksara Batak</h2>

            {/* Ina ni Surat */}
            <div className="mb-10">
              <div className="bg-accent/5 border-accent mb-6 rounded-lg border-l-4 p-6">
                <h3 className="text-accent mb-3 text-2xl font-bold">Ina ni Surat (Huruf Induk)</h3>
                <p className="text-foreground/80 mb-6">
                  Ina ni Surat adalah 19 huruf dasar dalam aksara Batak. Setiap huruf secara default
                  mengandung bunyi vokal 'a'.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {[
                    { char: 'ha', symbol: 'ᯂ' },
                    { char: 'na', symbol: 'ᯉ' },
                    { char: 'ba', symbol: 'ᯅ' },
                    { char: 'ka', symbol: 'ᯂ' },
                    { char: 'da', symbol: 'ᯑ' },
                    { char: 'ta', symbol: 'ᯖ' },
                    { char: 'sa', symbol: 'ᯘ' },
                    { char: 'wa', symbol: 'ᯂ' }, // Use correct symbol if distinct in font
                    { char: 'la', symbol: 'ᯞ' },
                    { char: 'pa', symbol: 'ᯇ' },
                    { char: 'ja', symbol: 'ᯐ' },
                    { char: 'ya', symbol: 'ᯛ' },
                    { char: 'ma', symbol: 'ᯔ' },
                    { char: 'ga', symbol: 'ᯎ' },
                    { char: 'ra', symbol: 'ᯒ' },
                    { char: 'nga', symbol: 'ᯝ' },
                    { char: 'nya', symbol: 'ᯠ' },
                    { char: 'i', symbol: 'ᯤ' },
                    { char: 'u', symbol: 'ᯥ' },
                  ].map((item) => (
                    <div
                      key={item.char}
                      className="bg-background group hover:border-accent flex flex-col items-center justify-center rounded-xl border p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      <span className="text-foreground mb-2 text-4xl font-medium">
                        {item.symbol}
                      </span>
                      <span className="text-accent font-mono text-lg font-bold uppercase">
                        {item.char}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Anak ni Surat */}
            <div className="mb-10">
              <div className="bg-accent/10 border-accent mb-6 rounded-lg border-l-4 p-6">
                <h3 className="text-accent mb-3 text-2xl font-bold">
                  Anak ni Surat (Tanda Diakritik)
                </h3>
                <p className="text-foreground/80 mb-4">
                  Anak ni Surat adalah tanda-tanda tambahan yang ditambahkan pada Ina ni Surat untuk
                  mengubah bunyi vokalnya atau menambahkan konsonan di akhir suku kata.
                </p>
                <div className="bg-background space-y-4 rounded-lg p-6">
                  <div>
                    <p className="mb-2 font-semibold">Tanda Vokal:</p>
                    <ul className="text-foreground/70 ml-4 list-inside list-disc space-y-1 text-sm">
                      <li>
                        <strong>Uleng-uleng</strong>: Mengubah vokal 'a' menjadi 'i' (titik di atas)
                      </li>
                      <li>
                        <strong>Pangolat</strong>: Mengubah vokal 'a' menjadi 'u' (titik di bawah)
                      </li>
                      <li>
                        <strong>Simbol e</strong>: Untuk vokal 'e'
                      </li>
                      <li>
                        <strong>Simbol o</strong>: Untuk vokal 'o'
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold">Tanda Konsonan Akhir:</p>
                    <ul className="text-foreground/70 ml-4 list-inside list-disc space-y-1 text-sm">
                      <li>
                        <strong>Pangwisik</strong>: Menandakan tidak ada vokal (konsonan mati/suku
                        kata tertutup)
                      </li>
                      <li>
                        <strong>Hamban-hamban</strong>: Untuk konsonan ganda atau konsonan akhir
                        tertentu
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="from-accent/20 to-accent/10 rounded-lg bg-gradient-to-r p-8">
              <h3 className="mb-4 text-xl font-bold">Contoh Sederhana:</h3>
              <div className="bg-background rounded-lg p-6">
                <p className="text-foreground/70 mb-3">
                  Kata <span className="text-accent font-bold">"BATAK"</span> dalam aksara Batak:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="bg-foreground/10 rounded px-2 py-1 font-mono">BA</span> = Huruf
                    'ba' (ᯅ)
                  </p>
                  <p>
                    <span className="bg-foreground/10 rounded px-2 py-1 font-mono">TA</span> = Huruf
                    'ta' (ᯖ)
                  </p>
                  <p>
                    <span className="bg-foreground/10 rounded px-2 py-1 font-mono">K</span> = Huruf
                    'ka' dengan pangwisik (ᯂ + tanda mati)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pustaha Gallery Section */}
          {pustahaImages.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-3xl font-bold">Galeri Pustaha</h2>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Koleksi foto naskah Pustaha kuno dengan tulisan Aksara Batak. Pustaha adalah buku
                tradisional yang berisi ilmu pengetahuan leluhur, ditulis oleh para datu (ahli
                spiritual) menggunakan Aksara Batak pada kulit kayu.
              </p>
              <Gallery
                images={pustahaImages}
                columns={3}
                aspectRatio="video"
                showCredits={true}
              />
            </section>
          )}


          {/* Call to Action */}
          <section className="bg-foreground/5 rounded-lg p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">Lestarikan Aksara Batak</h3>
            <p className="text-foreground/70 mx-auto mb-6 max-w-2xl">
              Aksara Batak adalah warisan budaya yang sangat berharga. Mari kita jaga dan lestarikan
              dengan mempelajari, menggunakan, dan mengajarkannya kepada generasi selanjutnya.
            </p>
          </section>

          {/* Discussion Section */}
          <PageDiscussion />
        </div>
      </div>
    </>
  );
}
