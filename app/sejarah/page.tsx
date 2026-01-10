import { Sidebar } from '@/components/layout/Sidebar';
import { RumpunCard } from '@/components/sejarah/RumpunCard';
import { getAllRumpun } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { BookOpen, Users, MapPin, History } from 'lucide-react';
import Link from 'next/link';

export default function SejarahPage() {
  const rumpunList = getAllRumpun();
  
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="Sejarah Batak"
        subtitle="Menelusuri jejak sejarah, asal usul, dan kekayaan budaya masyarakat Batak di Sumatera Utara"
        backgroundImage="/images/homepage/hero-lake-toba.jpg"
      />
      
      <div className="w-full px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16">

              {/* Asal Usul Section */}
              <section className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-accent to-transparent opacity-50 hidden md:block rounded-full" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <History className="h-5 w-5" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Asal Usul Bangsa Batak</h2>
                </div>
                
                <div className="prose prose-lg text-foreground/80 max-w-none leading-relaxed">
                  <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 mb-6 not-prose">
                    <p className="text-lg font-medium italic text-foreground/90">
                      "Bangsa Batak adalah salah satu suku bangsa terbesar di Indonesia yang mendiami wilayah Sumatera Utara, dengan kekayaan budaya yang telah bertahan berabad-abad."
                    </p>
                  </div>
                  
                  <p>
                    Menurut berbagai sumber sejarah dan mitologi, nenek moyang bangsa Batak dipercaya berasal dari daerah Asia Tenggara daratan yang kemudian bermigrasi ke Pulau Sumatera dalam beberapa gelombang. Jejak migrasi ini membentuk pola pemukiman awal di sekitar kaldera purba.
                  </p>
                  <p>
                    Dalam kepercayaan tradisional Batak, disebutkan bahwa leluhur bangsa Batak berasal dari <strong className="text-accent">Pusuk Buhit</strong>, sebuah gunung vulkanik yang terletak di sisi barat Danau Toba. Menurut legenda, <em>Si Raja Batak</em> adalah nenek moyang pertama yang diturunkan Dewata ke puncak gunung tersebut, yang kemudian membangun pemukiman pertama di Sianjur Mula-mula dan menurunkan berbagai marga Batak yang ada saat ini.
                  </p>
                </div>
              </section>

              {/* Pembagian Sub-Etnis Section */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Enam Rumpun Batak</h2>
                    <p className="text-muted-foreground mt-1">Keberagaman dalam kesatuan budaya</p>
                  </div>
                </div>
                
                <div className="mb-8 p-4 bg-background border border-border/60 rounded-xl shadow-sm">
                  <p className="text-foreground/80 leading-relaxed">
                    Meskipun memiliki akar yang sama, masyarakat Batak berkembang menjadi enam sub-etnis utama. Masing-masing kelompok ini memiliki dialek bahasa, variasi adat istiadat, dan wilayah persebaran yang berbeda, namun tetap terikat dalam filosofi <em>Dalihan Na Tolu</em>.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {rumpunList.map((rumpun) => (
                    <RumpunCard key={rumpun.id} rumpun={rumpun} />
                  ))}
                </div>
              </section>
              
              {/* Additional Context Section */}
              <section className="bg-muted/20 rounded-2xl p-8 border border-border/50">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">Wilayah Persebaran</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Masyarakat Batak secara tradisional mendiami dataran tinggi di sekitar Danau Toba dan wilayah pesisir sekitarnya. Kini, diaspora Batak dapat ditemukan di seluruh penjuru Indonesia dan dunia, namun ikatan dengan <em>Bona Pasogit</em> (tanah kelahiran) tetap dipegang teguh.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">
                <Sidebar />
                
                {/* Extra sidebar content if needed */}
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <h3 className="font-bold">Kamus Istilah</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-accent/10 pb-2">
                      <span className="font-medium">Bona Pasogit</span>
                      <span className="text-muted-foreground">Kampung halaman</span>
                    </li>
                    <li className="flex justify-between border-b border-accent/10 pb-2">
                      <span className="font-medium">Tarombo</span>
                      <span className="text-muted-foreground">Silsilah garis keturunan</span>
                    </li>
                    <li className="flex justify-between border-b border-accent/10 pb-2">
                      <span className="font-medium">Ulos</span>
                      <span className="text-muted-foreground">Kain tenun tradisional</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <Link href="/budaya/adat-istiadat" className="text-accent hover:underline text-xs flex items-center">
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
  )
}
