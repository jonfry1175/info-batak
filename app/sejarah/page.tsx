import { Sidebar } from '@/components/layout/Sidebar';
import { RumpunCard } from '@/components/sejarah/RumpunCard';
import { getAllRumpun } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';

export default function SejarahPage() {
  const rumpunList = getAllRumpun();
  return (
    <>
      <PageHero
        title="Sejarah Batak"
        subtitle="Menelusuri jejak sejarah dan asal usul masyarakat Batak di Sumatera Utara"
        backgroundImage="/images/homepage/hero-lake-toba.jpg"
      />
      <div className="w-full px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">

            {/* Asal Usul */}
            <section className="mb-12">
              <h2 className="mb-4 text-3xl font-bold">Asal Usul Bangsa Batak</h2>
              <div className="prose prose-lg text-foreground/80 max-w-none space-y-4 leading-relaxed">
                <p>
                  Bangsa Batak adalah salah satu suku bangsa terbesar di Indonesia yang mendiami
                  wilayah Sumatera Utara. Menurut berbagai sumber sejarah dan mitologi, nenek moyang
                  bangsa Batak dipercaya berasal dari daerah Asia Tenggara daratan yang kemudian
                  bermigrasi ke Pulau Sumatera.
                </p>
                <p>
                  Dalam kepercayaan tradisional Batak, disebutkan bahwa leluhur bangsa Batak berasal
                  dari <em>Pusuk Buhit</em>, sebuah gunung yang terletak di dekat Danau Toba.
                  Menurut legenda, <em>Si Raja Batak</em> adalah nenek moyang pertama yang
                  menurunkan berbagai marga Batak.
                </p>
              </div>
            </section>

            {/* Pembagian Sub-Etnis */}
            <section className="mb-12">
              <h2 className="mb-4 text-3xl font-bold">Enam Rumpun Batak</h2>
              <div className="text-foreground/80 mb-6 space-y-4 leading-relaxed">
                <p>
                  Masyarakat Batak terdiri dari enam sub-etnis utama yang memiliki bahasa, adat, dan
                  wilayah yang berbeda namun tetap memiliki akar budaya yang sama:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rumpunList.map((rumpun) => (
                  <RumpunCard key={rumpun.id} rumpun={rumpun} />
                ))}
              </div>
            </section>
            </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
