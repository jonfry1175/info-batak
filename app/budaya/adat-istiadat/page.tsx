import { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/layout/PageHero';
import { PageDiscussion } from '@/components/discussion';

export const metadata: Metadata = {
  title: 'Adat Istiadat Batak - Dalihan Na Tolu, Upacara & Nilai Budaya',
  description:
    'Pahami filosofi Dalihan Na Tolu (Hula-hula, Dongan Tubu, Boru), upacara adat Mangulosi, Horja, Saur Matua, dan nilai luhur budaya Batak: Hamoraon, Hagabeon, Hasangapon.',
  keywords: [
    'dalihan na tolu',
    'adat istiadat batak',
    'hula-hula',
    'dongan tubu',
    'boru',
    'mangulosi',
    'upacara batak',
    'tradisi batak',
  ],
  openGraph: {
    title: 'Adat Istiadat Batak - Dalihan Na Tolu & Tradisi',
    description:
      'Filosofi Dalihan Na Tolu dan berbagai upacara adat yang mengatur kehidupan masyarakat Batak.',
    url: 'https://infobatak.id/budaya/adat-istiadat',
    images: ['/images/budaya/adat/hero-adat.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/budaya/adat-istiadat',
  },
};

export default function AdatIstiadatPage() {
  return (
    <>
      <PageHero
        title="Adat Istiadat Batak"
        subtitle="Memahami nilai-nilai filosofis dan tradisi yang mengatur kehidupan masyarakat Batak"
        backgroundImage="/images/budaya/adat/hero-adat.png"
      />

      <div className="relative w-full overflow-hidden">
        {/* Decorative background pattern - subtle */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url(/images/budaya/adat/gorga-pattern.png)',
            backgroundSize: '400px',
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
          {/* Dalihan Na Tolu Section */}
          <section className="mb-24">
            <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="bg-accent/10 border-accent/20 text-accent inline-block rounded-full border px-4 py-1.5 text-sm font-semibold tracking-wide">
                  Filosofi Utama
                </div>
                <h2 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  Dalihan Na Tolu
                </h2>
                <p className="text-foreground/80 text-lg leading-relaxed font-light">
                  Filosofi sosial masyarakat Batak yang menjadi landasan utama dalam kehidupan
                  bermasyarakat. Secara harfiah berarti{' '}
                  <span className="text-accent font-medium">"tungku nan tiga"</span>, melambangkan
                  tiga pilar kehidupan sosial yang harus seimbang untuk menopang "periuk" kehidupan.
                </p>
                <div className="bg-accent h-1 w-20 rounded-full opacity-60"></div>
                <p className="text-foreground/70 italic">
                  "Manatmardongan tubu, elek marboru, somba marhula-hula"
                </p>
              </div>
              <div className="group relative">
                <div className="bg-accent/20 absolute -inset-4 rounded-[2rem] opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-70"></div>
                <div className="border-foreground/5 relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border shadow-2xl">
                  <Image
                    src="/images/budaya/adat/dalihan-na-tolu.png"
                    alt="Dalihan Na Tolu Symbolism"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 font-medium text-white">
                    Simbol Keseimbangan Sosial
                  </div>
                </div>
              </div>
            </div>

            {/* The 3 Pillars Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  emoji: '👨‍👩‍👧',
                  title: 'Hula-hula',
                  subtitle: 'Pihak Pemberi Istri',
                  desc: "Posisi paling dihormati (sumber berkat). Kita harus 'Somba' (Hormat) kepada mereka.",
                  gradient: 'from-red-500/10 to-transparent',
                },
                {
                  emoji: '👥',
                  title: 'Dongan Tubu',
                  subtitle: 'Sesama Marga',
                  desc: "Teman seperjuangan satu darah. Kita harus 'Manat' (Hati-hati/Sopan) menjaga persaudaraan.",
                  gradient: 'from-blue-500/10 to-transparent',
                },
                {
                  emoji: '👶',
                  title: 'Boru',
                  subtitle: 'Pihak Penerima Istri',
                  desc: "Pihak yang melayani. Kita harus 'Elek' (Mengayomi/Lemah lembut) kepada mereka.",
                  gradient: 'from-yellow-500/10 to-transparent',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-background border-foreground/10 relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl ${item.gradient} rounded-bl-[4rem]`}
                  ></div>
                  <div className="mb-6 transform text-5xl drop-shadow-lg filter transition-transform duration-300 group-hover:scale-110">
                    {item.emoji}
                  </div>
                  <h3 className="text-foreground group-hover:text-accent mb-1 text-2xl font-bold transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-accent mb-4 text-sm font-semibold tracking-wider uppercase">
                    {item.subtitle}
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Upacara Adat Section */}
          <section className="mb-24">
            <div className="mb-12 flex flex-col items-end justify-between md:flex-row">
              <div className="max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Upacara Adat Penting</h2>
                <p className="text-foreground/60 text-lg">
                  Momen-momen sakral dalam siklus kehidupan orang Batak yang dirayakan dengan penuh
                  hikmat.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Mangulosi (With Image) */}
              <div className="group bg-background border-foreground/10 overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="/images/budaya/adat/mangulosi.png"
                    alt="Upacara Mangulosi"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                  <div className="bg-accent absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
                    Sakral
                  </div>
                </div>
                <div className="relative p-8">
                  <h3 className="group-hover:text-accent mb-3 text-2xl font-bold transition-colors">
                    Mangulosi
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    Pemberian ulos sebagai simbol kehangatan dan berkat. Dilakukan pada pernikahan,
                    kelahiran, dan momen penting lainnya.
                  </p>
                  <button className="text-accent flex items-center text-sm font-semibold group-hover:underline">
                    Pelajari Selengkapnya <span className="ml-2">→</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Horja (With Pattern) */}
              <div className="group bg-background border-foreground/10 overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="bg-foreground/5 relative flex h-56 items-center justify-center overflow-hidden">
                  <div
                    className="absolute inset-0 bg-repeat opacity-20"
                    style={{
                      backgroundImage: 'url(/images/budaya/adat/gorga-pattern.png)',
                      backgroundSize: '150px',
                    }}
                  ></div>
                  <div className="z-10 text-6xl opacity-80 transition-transform duration-500 group-hover:scale-110">
                    🎉
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="group-hover:text-accent mb-3 text-2xl font-bold transition-colors">
                    Horja / Pesta Adat
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    Pesta adat besar yang melibatkan unsur Dalihan Na Tolu secara lengkap. Diadakan
                    untuk syukuran rumah baru atau pernikahan agung.
                  </p>
                  <button className="text-accent flex items-center text-sm font-semibold group-hover:underline">
                    Pelajari Selengkapnya <span className="ml-2">→</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Saur Matua (With Gradient) */}
              <div className="group bg-background border-foreground/10 overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800">
                  <div
                    className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: 'url(/images/budaya/adat/gorga-pattern.png)',
                      backgroundSize: '150px',
                    }}
                  ></div>
                  <div className="z-10 text-6xl transition-transform duration-500 group-hover:scale-110">
                    👴
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="group-hover:text-accent mb-3 text-2xl font-bold transition-colors">
                    Saur Matua
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    Penghormatan tertinggi bagi orang tua yang meninggal di usia lanjut dan telah
                    melihat semua anaknya menikah (Sari Matua).
                  </p>
                  <button className="text-accent flex items-center text-sm font-semibold group-hover:underline">
                    Pelajari Selengkapnya <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Nilai Budaya Section - Full Width Feature */}
          <section className="bg-foreground text-background relative overflow-hidden rounded-[2.5rem] p-8 md:p-16">
            {/* Background Texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(/images/budaya/adat/gorga-pattern.png)',
                backgroundSize: '300px',
              }}
            ></div>

            <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-5xl">Nilai Luhur Budaya Batak</h2>
              <p className="text-background/70 text-lg">
                Prinsip-prinsip kehidupan yang dipegang teguh untuk mencapai kesejahteraan lahir dan
                batin.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
              <div className="group flex gap-6">
                <div className="bg-accent shadow-accent/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  💎
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">3H: Hagabeon, Hamoraon, Hasangapon</h3>
                  <p className="text-background/60 leading-relaxed">
                    Tujuan hidup utama: Keturunan (Hagabeon), Kekayaan (Hamoraon), dan Kehormatan
                    (Hasangapon).
                  </p>
                </div>
              </div>

              <div className="group flex gap-6">
                <div className="bg-accent shadow-accent/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  🌏
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Marsiajar (Merantau)</h3>
                  <p className="text-background/60 leading-relaxed">
                    Tradisi pergi mencari ilmu dan kesuksesan di tanah orang, tanpa melupakan
                    kampung halaman (Bonapasogit).
                  </p>
                </div>
              </div>

              <div className="group flex gap-6">
                <div className="bg-accent shadow-accent/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  🤝
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Marsiurupan</h3>
                  <p className="text-background/60 leading-relaxed">
                    Semangat gotong royong yang kuat. Berat sama dipikul, ringan sama dijinjing
                    dalam setiap kegiatan adat.
                  </p>
                </div>
              </div>

              <div className="group flex gap-6">
                <div className="bg-accent shadow-accent/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  🙏
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Sopan Santun</h3>
                  <p className="text-background/60 leading-relaxed">
                    Sistem kekerabatan (Partuturon) mengajarkan posisi diri yang tepat untuk saling
                    menghormati antara muda dan tua.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Discussion Section */}
          <PageDiscussion />
        </div>
      </div>
    </>
  );
}
