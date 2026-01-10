'use client';

import { Gallery } from '@/components/ui/Gallery';
import { getImagesByCategory } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { MediaCard } from '@/components/ui/MediaCard';
import { Button } from '@/components/ui/button';
import { UmpasaUmpamaSection } from '@/components/ui/UmpasaUmpamaSection';
import { DiscussionSection } from '@/components/discussion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PlayCircle, Music, Move, Scissors, BookOpen } from 'lucide-react';

export default function KesenianPage() {
  const pathname = usePathname();
  
  // Get images for galleries
  const gondangImages = getImagesByCategory('Budaya', 'Gondang');
  const tortorImages = getImagesByCategory('Budaya', 'Tortor');
  const ulosImages = getImagesByCategory('Budaya', 'Ulos');
  const arsitekturImages = getImagesByCategory('Budaya', 'Arsitektur');
  const ukirImages = getImagesByCategory('Budaya', 'Seni Ukir');
  const senjataImages = getImagesByCategory('Budaya', 'Senjata');
  const gondangKaroImages = getImagesByCategory('Budaya', 'Gondang Karo');
  const gondangMandailingImages = getImagesByCategory('Budaya', 'Gondang Mandailing');
  const tariKaroImages = getImagesByCategory('Budaya', 'Tari Karo');

  return (
    <>
      <PageHero
        title="Kesenian Batak"
        subtitle="Menjelajahi kekayaan seni musik, tari, dan kerajinan tradisional Batak yang sarat makna dan filosofi"
        backgroundImage="/images/homepage/card-kesenian.jpg"
      />

      <div className="bg-background w-full pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Navigation Pills */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {[
              { name: 'Musik', icon: Music, href: '#musik' },
              { name: 'Tarian', icon: Move, href: '#tarian' },
              { name: 'Kerajinan', icon: Scissors, href: '#kerajinan' },
              { name: 'Sastra', icon: BookOpen, href: '#sastra' },
            ].map((item) => (
              <Button
                key={item.name}
                variant="outline"
                className="border-accent/20 hover:bg-accent rounded-full hover:text-white"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* Musik Tradisional */}
          <section id="musik" className="mb-24 scroll-mt-24">
            <div className="mb-10 flex items-center gap-4">
              <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                <Music className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Musik Tradisional</h2>
                <p className="text-muted-foreground mt-1">Harmoni sakral dalam setiap dentuman</p>
              </div>
            </div>

            {/* Featured: Gondang Sabangunan */}
            <div className="border-border bg-card mb-12 overflow-hidden rounded-2xl border shadow-sm lg:grid lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto lg:h-full">
                {gondangImages.length > 0 ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={gondangImages[0].src}
                      alt={gondangImages[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center">
                    <Music className="text-muted-foreground/30 h-20 w-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="bg-accent/10 text-accent mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                  Ansambel Utama
                </div>
                <h3 className="mb-4 text-3xl font-bold">Gondang Sabangunan</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Ansambel musik tradisional Batak Toba yang dimainkan dalam berbagai upacara adat
                  sakral. &quot;Sabangunan&quot; berarti satu kesatuan utuh, melambangkan harmoni
                  kosmos dan masyarakat.
                </p>

                <div className="bg-muted/50 mb-8 rounded-xl p-6">
                  <h4 className="text-foreground mb-4 font-semibold">Instrumen Utama:</h4>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li className="text-muted-foreground flex items-center gap-3 text-sm">
                      <span className="bg-background text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        1
                      </span>
                      <span>
                        <strong>Taganing:</strong> 5 gendang melodis
                      </span>
                    </li>
                    <li className="text-muted-foreground flex items-center gap-3 text-sm">
                      <span className="bg-background text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        2
                      </span>
                      <span>
                        <strong>Gordang:</strong> Gendang bass besar
                      </span>
                    </li>
                    <li className="text-muted-foreground flex items-center gap-3 text-sm">
                      <span className="bg-background text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        3
                      </span>
                      <span>
                        <strong>Sarune:</strong> Alat tiup melodi
                      </span>
                    </li>
                    <li className="text-muted-foreground flex items-center gap-3 text-sm">
                      <span className="bg-background text-accent flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        4
                      </span>
                      <span>
                        <strong>Ogung:</strong> Gong pengiring
                      </span>
                    </li>
                  </ul>
                </div>

                <Button className="w-fit gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Dengarkan Sampel
                </Button>
              </div>
            </div>

            {/* Other Music Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <MediaCard
                title="Musik Gondang Karo"
                description="Musik tradisional Batak Karo dengan instrumen gendang dan kulcapi. Memiliki karakter dinamis dan sering mengiringi tarian pergaulan muda-mudi."
                href="#"
                category="Karo"
                image={gondangKaroImages[0]?.src}
                className="bg-card"
              />
              <MediaCard
                title="Gondang Mandailing"
                description="Ansambel Gordang Sambilan (sembilan gendang besar) yang megah. Menghasilkan ritme yang kuat dan menggetarkan, warisan budaya yang tetap lestari."
                href="#"
                category="Mandailing"
                image={gondangMandailingImages[0]?.src}
                className="bg-card"
              />
            </div>

            {gondangImages.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-bold">Galeri Instrumen</h3>
                <Gallery images={gondangImages} columns={4} aspectRatio="square" />
              </div>
            )}
          </section>

          {/* Tarian Tradisional */}
          <section id="tarian" className="mb-24 scroll-mt-24">
            <div className="mb-10 flex items-center gap-4">
              <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                <Move className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Tarian Tradisional</h2>
                <p className="text-muted-foreground mt-1">Gerak tubuh sebagai doa dan komunikasi</p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Featured Tortor Card */}
              <div className="lg:col-span-2">
                <div className="group border-border bg-card relative h-full overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {tortorImages.length > 0 ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={tortorImages[0].src}
                          alt="Tarian Tortor"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                      </div>
                    ) : (
                      <div className="bg-muted h-full w-full" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <h3 className="mb-2 text-3xl font-bold text-white">Tortor Batak</h3>
                      <p className="max-w-xl text-white/90">
                        Lebih dari sekadar tarian, Tortor adalah medium spiritual. Setiap gerakan
                        tangan (manortor) memiliki arti penghormatan kepada Tuhan, leluhur, dan
                        sesama.
                      </p>
                    </div>
                  </div>
                  <div className="bg-card grid gap-4 p-8 sm:grid-cols-3">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-accent mb-1 font-semibold">Pangurason</h4>
                      <p className="text-muted-foreground text-xs">
                        Tarian pembersihan lokasi acara dari roh jahat
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-accent mb-1 font-semibold">Sipitu Cawan</h4>
                      <p className="text-muted-foreground text-xs">
                        Tarian keseimbangan dengan 7 cawan di kepala/tangan
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-accent mb-1 font-semibold">Tunggal Panaluan</h4>
                      <p className="text-muted-foreground text-xs">
                        Tarian ritual pemanggilan hujan atau tolak bala
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Cards */}
              <div className="flex flex-col gap-6">
                <MediaCard
                  title="Tari Piso Surit"
                  description="Tarian khas Karo yang menggambarkan penantian seorang gadis. Diiringi lagu Piso Surit yang mendayu-dayu."
                  href="#"
                  category="Karo"
                  image={tariKaroImages[0]?.src}
                  aspectRatio="aspect-[4/3]"
                />
                <div className="border-border bg-accent/5 flex flex-1 flex-col justify-center rounded-2xl border p-8 text-center">
                  <Move className="text-accent mx-auto mb-4 h-12 w-12 opacity-50" />
                  <h3 className="mb-2 text-lg font-bold">Filosofi Gerakan</h3>
                  <p className="text-muted-foreground text-sm">
                    &quot;Tangan ke atas memohon berkat, tangan di dada menyimpan amanah, tangan
                    terbuka memberi kasih.&quot;
                  </p>
                </div>
              </div>
            </div>

            {tortorImages.length > 0 && (
              <div className="mt-12">
                <Gallery images={tortorImages} columns={4} aspectRatio="portrait" />
              </div>
            )}
          </section>

          {/* Kerajinan Tradisional */}
          <section id="kerajinan" className="mb-24 scroll-mt-24">
            <div className="mb-10 flex items-center gap-4">
              <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-xl">
                <Scissors className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Kerajinan & Arsitektur</h2>
                <p className="text-muted-foreground mt-1">
                  Karya tangan yang memadukan fungsi dan estetika
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <MediaCard
                title="Kain Ulos"
                description="Kain tenun sakral yang melambangkan ikatan kasih sayang dan restu. Wajib ada dalam setiap adat."
                href="#"
                category="Tekstil"
                image={ulosImages[0]?.src}
                className="h-full"
              />
              <MediaCard
                title="Ruma Bolon"
                description="Rumah adat panggung dengan atap melengkung seperti kerbau, penuh ukiran gorga pelindung."
                href="#"
                category="Arsitektur"
                image={arsitekturImages[0]?.src}
                className="h-full"
              />
              <MediaCard
                title="Ukiran Gorga"
                description="Seni ukir tiga warna (merah, hitam, putih) dengan motif cicak dan singa sebagai penolak bala."
                href="#"
                category="Seni Ukir"
                image={ukirImages[0]?.src}
                className="h-full"
              />
              <MediaCard
                title="Piso Gaja Dompak"
                description="Pusaka kerajaan Sisingamangaraja XII. Pedang dengan ukiran gajah yang melambangkan kekuatan."
                href="#"
                category="Senjata"
                image={senjataImages[0]?.src}
                className="h-full"
              />
            </div>

            {ulosImages.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-bold">Keindahan Motif Ulos</h3>
                <Gallery images={ulosImages} columns={4} aspectRatio="square" />
              </div>
            )}
          </section>

          {/* Sastra Lisan */}
          <UmpasaUmpamaSection />

          {/* Discussion Section */}
          <DiscussionSection pagePath={pathname} />
        </div>
      </div>
    </>
  );
}
