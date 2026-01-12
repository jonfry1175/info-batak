import { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import { RumpunCard } from '@/components/sejarah/RumpunCard';
import { getAllRumpun } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { PageDiscussion } from '@/components/discussion';
import { BookOpen, Users, MapPin, History } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sejarah Batak - Asal Usul & 6 Rumpun Suku Batak',
  description:
    'Pelajari sejarah lengkap suku Batak dari asal usul Si Raja Batak, Pusuk Buhit, hingga perkembangan 6 rumpun: Toba, Karo, Simalungun, Pakpak, Angkola, dan Mandailing. Sejarah migrasi dan penyebaran di Sumatera Utara.',
  keywords: [
    'sejarah batak',
    'asal usul batak',
    'si raja batak',
    'pusuk buhit',
    'rumpun batak',
    'suku batak',
    'sejarah danau toba',
  ],
  openGraph: {
    title: 'Sejarah Batak - Asal Usul & 6 Rumpun Suku Batak',
    description:
      'Telusuri jejak sejarah suku Batak dari legenda Si Raja Batak hingga 6 rumpun di Sumatera Utara.',
    url: 'https://infobatak.id/sejarah',
    images: ['/images/sejarah/hero-sejarah-new.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/sejarah',
  },
};

export default function SejarahPage() {
  const rumpunList = getAllRumpun();

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        title="Sejarah Batak"
        subtitle="Menelusuri jejak sejarah, asal usul, dan kekayaan budaya masyarakat Batak di Sumatera Utara"
        backgroundImage="/images/sejarah/hero-sejarah-new.png"
      />

      <div className="w-full px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Main Content */}
            <div className="space-y-16 lg:col-span-8">
              {/* Asal Usul Section */}
              <section className="relative">
                <div className="from-accent absolute top-0 -left-4 hidden h-full w-1 rounded-full bg-gradient-to-b to-transparent opacity-50 md:block" />

                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-accent/10 text-accent flex h-10 w-10 items-center justify-center rounded-full">
                    <History className="h-5 w-5" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Asal Usul Bangsa Batak</h2>
                </div>

                <div className="prose prose-lg text-foreground/80 max-w-none leading-relaxed">
                  <div className="bg-muted/30 border-border/50 not-prose mb-6 rounded-2xl border p-6">
                    <p className="text-foreground/90 text-lg font-medium italic">
                      "Bangsa Batak adalah salah satu suku bangsa terbesar di Indonesia yang
                      mendiami wilayah Sumatera Utara, dengan kekayaan budaya yang telah bertahan
                      berabad-abad."
                    </p>
                  </div>

                  <p>
                    Menurut berbagai sumber sejarah dan mitologi, nenek moyang bangsa Batak
                    dipercaya berasal dari daerah Asia Tenggara daratan yang kemudian bermigrasi ke
                    Pulau Sumatera dalam beberapa gelombang. Jejak migrasi ini membentuk pola
                    pemukiman awal di sekitar kaldera purba.
                  </p>
                  <p>
                    Dalam kepercayaan tradisional Batak, disebutkan bahwa leluhur bangsa Batak
                    berasal dari <strong className="text-accent">Pusuk Buhit</strong>, sebuah gunung
                    vulkanik yang terletak di sisi barat Danau Toba. Menurut legenda,{' '}
                    <em>Si Raja Batak</em> adalah nenek moyang pertama yang diturunkan Dewata ke
                    puncak gunung tersebut, yang kemudian membangun pemukiman pertama di Sianjur
                    Mula-mula dan menurunkan berbagai marga Batak yang ada saat ini.
                  </p>
                </div>
              </section>

              {/* Pembagian Sub-Etnis Section */}
              <section>
                <div className="mb-8 flex items-center gap-3">
                  <div className="bg-accent/10 text-accent flex h-10 w-10 items-center justify-center rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Enam Rumpun Batak</h2>
                    <p className="text-muted-foreground mt-1">Keberagaman dalam kesatuan budaya</p>
                  </div>
                </div>

                <div className="bg-background border-border/60 mb-8 rounded-xl border p-4 shadow-sm">
                  <p className="text-foreground/80 leading-relaxed">
                    Meskipun memiliki akar yang sama, masyarakat Batak berkembang menjadi enam
                    sub-etnis utama. Masing-masing kelompok ini memiliki dialek bahasa, variasi adat
                    istiadat, dan wilayah persebaran yang berbeda, namun tetap terikat dalam
                    filosofi <em>Dalihan Na Tolu</em>.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {rumpunList.map((rumpun) => (
                    <RumpunCard key={rumpun.id} rumpun={rumpun} />
                  ))}
                </div>
              </section>

              {/* Additional Context Section */}
              <section className="bg-muted/20 border-border/50 rounded-2xl border p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-accent mt-1 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="mb-3 text-xl font-bold">Wilayah Persebaran</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Masyarakat Batak secara tradisional mendiami dataran tinggi di sekitar Danau
                      Toba dan wilayah pesisir sekitarnya. Kini, diaspora Batak dapat ditemukan di
                      seluruh penjuru Indonesia dan dunia, namun ikatan dengan <em>Bona Pasogit</em>{' '}
                      (tanah kelahiran) tetap dipegang teguh.
                    </p>
                  </div>
                </div>
              </section>

              {/* Discussion Section */}
              <PageDiscussion />
            </div>

            {/* Sidebar */}
            <div className="space-y-8 lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <Sidebar />

                {/* Extra sidebar content if needed */}
                <div className="border-accent/20 bg-accent/5 rounded-xl border p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <BookOpen className="text-accent h-5 w-5" />
                    <h3 className="font-bold">Kamus Istilah</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="border-accent/10 flex justify-between border-b pb-2">
                      <span className="font-medium">Bona Pasogit</span>
                      <span className="text-muted-foreground">Kampung halaman</span>
                    </li>
                    <li className="border-accent/10 flex justify-between border-b pb-2">
                      <span className="font-medium">Tarombo</span>
                      <span className="text-muted-foreground">Silsilah garis keturunan</span>
                    </li>
                    <li className="border-accent/10 flex justify-between border-b pb-2">
                      <span className="font-medium">Ulos</span>
                      <span className="text-muted-foreground">Kain tenun tradisional</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <Link
                        href="/budaya/adat-istiadat"
                        className="text-accent flex items-center text-xs hover:underline"
                      >
                        Lihat kamus lengkap <ArrowRightIcon className="ml-1 h-3 w-3" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
