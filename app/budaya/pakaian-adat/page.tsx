import { Metadata } from 'next';
import { Gallery } from '@/components/ui/Gallery';
import { PageHero } from '@/components/layout/PageHero';
import { PageDiscussion } from '@/components/discussion';
import {
  getMensAttire,
  getWomensAttire,
  getUlosTypes,
  getPakaianData,
  getImagesByCategory,
} from '@/lib/data';

export const metadata: Metadata = {
  title: 'Pakaian Adat Batak - Ulos, Mangulosi & Busana Tradisional',
  description:
    'Pelajari pakaian adat Batak: filosofi Ulos yang sakral, tradisi Mangulosi, busana pria (Tali-tali, Hende) dan wanita, jenis-jenis ulos (Ragidup, Sadum, Sibolang), dan simbolisme warna.',
  keywords: [
    'ulos batak',
    'pakaian adat batak',
    'mangulosi',
    'kain tenun batak',
    'ulos ragidup',
    'busana tradisional batak',
    'ulos sadum',
  ],
  openGraph: {
    title: 'Pakaian Adat Batak - Ulos & Busana Tradisional',
    description:
      'Kain Ulos yang sakral dan pakaian adat Batak dengan filosofi mendalam dalam setiap motif.',
    url: 'https://infobatak.id/budaya/pakaian-adat',
    images: ['/images/budaya/pakaian/hero-pakaian.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/budaya/pakaian-adat',
  },
};

const SectionImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <div className="mb-8 overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-lg">
    <div className="relative aspect-video w-full overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
      />
    </div>
    {caption && (
      <div className="bg-foreground/5 p-3 text-center text-sm italic text-foreground/70 border-t border-foreground/5">
        {caption}
      </div>
    )}
  </div>
);

export default function PakaianAdatPage() {
  const mensAttire = getMensAttire();
  const womensAttire = getWomensAttire();
  const ulosTypes = getUlosTypes();
  const pakaianData = getPakaianData();

  // Get images for gallery
  const pakaianImages = getImagesByCategory('Budaya', 'Pakaian Adat');
  const ulosImages = getImagesByCategory('Budaya', 'Ulos');

  return (
    <>
      <PageHero
        title="Pakaian Adat Batak"
        subtitle="Keagungan tenun Ulos dan busana tradisional yang memancarkan identitas budaya"
        backgroundImage="/images/budaya/pakaian/hero-pakaian.png"
      />
      <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-accent mb-6 text-4xl font-bold md:text-5xl">Pakaian Adat Batak</h1>
        <p className="text-foreground/70 mb-12 text-lg leading-relaxed">
          Pakaian adat Batak bukan sekadar busana, melainkan identitas budaya yang sarat dengan
          makna filosofis. Setiap komponen pakaian, terutama{' '}
          <span className="font-semibold">ulos</span>, memiliki simbolisme mendalam yang
          mencerminkan nilai-nilai luhur masyarakat Batak.
        </p>

        {/* Men's Attire Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Pakaian Adat Pria</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">{mensAttire.description}</p>
          
          <SectionImage 
            src="/images/budaya/pakaian/pakaian-pria-visual.png" 
            alt="Pakaian Adat Pria Batak"
            caption="Busana adat pria Batak melambangkan wibawa dan kepemimpinan"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mensAttire.components.map((component) => (
              <div key={component.id} className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-lg font-semibold">{component.name}</h3>
                <p className="text-foreground/60 mb-3 text-xs uppercase">{component.type}</p>
                <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                  {component.description}
                </p>

                {component.usage && (
                  <div className="mb-3">
                    <p className="text-accent mb-1 text-xs font-semibold">Penggunaan:</p>
                    <p className="text-foreground/70 text-xs">{component.usage}</p>
                  </div>
                )}

                {component.symbolism && (
                  <div className="bg-accent/10 rounded p-3">
                    <p className="text-accent mb-1 text-xs font-semibold">Simbolisme:</p>
                    <p className="text-foreground/80 text-xs italic">{component.symbolism}</p>
                  </div>
                )}

                {component.variations && component.variations.length > 0 && (
                  <div className="mt-3">
                    <p className="text-accent mb-2 text-xs font-semibold">Variasi:</p>
                    {component.variations.map((variation, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="text-foreground/80 text-xs font-medium">{variation.style}</p>
                        <p className="text-foreground/60 text-xs">{variation.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Women's Attire Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Pakaian Adat Wanita</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">{womensAttire.description}</p>

          <SectionImage 
            src="/images/budaya/pakaian/pakaian-wanita-visual.png" 
            alt="Pakaian Adat Wanita Batak"
            caption="Keanggunan busana wanita Batak dengan dominasi warna merah, hitam, dan emas"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {womensAttire.components.map((component) => (
              <div key={component.id} className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-lg font-semibold">{component.name}</h3>
                <p className="text-foreground/60 mb-3 text-xs uppercase">{component.type}</p>
                <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                  {component.description}
                </p>

                {component.material && (
                  <div className="mb-3">
                    <p className="text-accent mb-1 text-xs font-semibold">Material:</p>
                    <p className="text-foreground/70 text-xs">{component.material}</p>
                  </div>
                )}

                {component.colors && component.colors.length > 0 && (
                  <div className="mb-3">
                    <p className="text-accent mb-2 text-xs font-semibold">Warna:</p>
                    <div className="flex flex-wrap gap-1">
                      {component.colors.map((color, idx) => (
                        <span key={idx} className="bg-accent/20 rounded-full px-2 py-1 text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {component.symbolism && (
                  <div className="bg-accent/10 rounded p-3">
                    <p className="text-accent mb-1 text-xs font-semibold">Simbolisme:</p>
                    <p className="text-foreground/80 text-xs italic">{component.symbolism}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Ulos Significance - Main Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Ulos: Lebih dari Sekadar Kain</h2>
          <div className="bg-accent/10 border-accent mb-8 rounded-lg border-l-4 p-8">
            <h3 className="text-accent mb-4 text-2xl font-semibold">Filosofi Ulos</h3>
            <p className="text-foreground/80 mb-4 text-lg leading-relaxed">
              {pakaianData.ulosSignificance.philosophy}
            </p>
            <p className="text-foreground/70 leading-relaxed">
              {pakaianData.ulosSignificance.description}
            </p>
          </div>

          <SectionImage 
            src="/images/budaya/pakaian/jenis-ulos-visual.png" 
            alt="Berbagai Jenis Ulos Batak"
            caption="Ragam jenis Ulos dengan motif dan filosofi yang berbeda"
          />

          {/* Ulos Types Grid */}
          <h3 className="mb-6 text-2xl font-semibold">Jenis-Jenis Ulos</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ulosTypes.map((ulos, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 ${
                  ulos.status === 'Paling sakral'
                    ? 'bg-accent/20 border-accent border-2'
                    : 'bg-foreground/5'
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <h4 className="text-accent text-xl font-semibold">{ulos.name}</h4>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      ulos.status === 'Paling sakral'
                        ? 'bg-accent text-white'
                        : 'bg-accent/30 text-accent'
                    }`}
                  >
                    {ulos.status}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-accent mb-1 text-sm font-semibold">Penggunaan:</p>
                  <p className="text-foreground/70 text-sm">{ulos.usage}</p>
                </div>

                <div className="mb-3">
                  <p className="text-accent mb-1 text-sm font-semibold">Makna:</p>
                  <p className="text-foreground/70 text-sm">{ulos.meaning}</p>
                </div>

                <div className="mb-3">
                  <p className="text-accent mb-1 text-sm font-semibold">Motif:</p>
                  <p className="text-foreground/70 text-sm italic">{ulos.motif}</p>
                </div>

                <div className="bg-background rounded p-3">
                  <p className="text-accent mb-1 text-xs font-semibold">Warna Khas:</p>
                  <p className="text-foreground/70 text-xs">{ulos.colors}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mangulosi Tradition */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Tradisi Mangulosi (Memberi Ulos)</h2>
          
          <SectionImage 
            src="/images/budaya/pakaian/mangulosi-visual.png" 
            alt="Upacara Mangulosi"
            caption="Mangulosi: Simbol pemberian berkat dan perlindungan dalam adat Batak"
          />

          <div className="bg-foreground/5 mb-8 rounded-lg p-8">
            <p className="text-foreground/70 mb-6 leading-relaxed">
              {pakaianData.ulosSignificance.givingTradition.description}
            </p>

            <h3 className="mb-4 text-xl font-semibold">Acara Pemberian Ulos</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {pakaianData.ulosSignificance.givingTradition.occasions.map(
                (occasion: any, index: number) => (
                  <div key={index} className="bg-background rounded-lg p-6">
                    <h4 className="text-accent mb-2 text-lg font-semibold">{occasion.event}</h4>
                    <div className="mb-3">
                      <p className="text-foreground/80 text-sm">
                        <span className="font-semibold">Pemberi:</span> {occasion.giver}
                      </p>
                      <p className="text-foreground/80 text-sm">
                        <span className="font-semibold">Penerima:</span> {occasion.receiver}
                      </p>
                    </div>
                    <div className="bg-accent/10 rounded p-3">
                      <p className="text-foreground/80 text-sm italic">{occasion.meaning}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="bg-accent/10 mt-6 rounded-lg p-6">
              <h4 className="text-accent mb-2 text-lg font-semibold">Upacara Pemberian</h4>
              <p className="text-foreground/80 leading-relaxed">
                {pakaianData.ulosSignificance.givingTradition.ceremony}
              </p>
              <p className="text-foreground/70 mt-4 italic">
                "{pakaianData.ulosSignificance.givingTradition.symbolism}"
              </p>
            </div>
          </div>
        </section>

        {/* Weaving Tradition */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Tradisi Menenun Ulos</h2>
          
          <SectionImage 
            src="/images/budaya/pakaian/menenun-ulos-visual.png" 
            alt="Menenun Ulos Tradisional"
            caption="Proses menenun Ulos yang membutuhkan kesabaran dan keahlian tinggi"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-4 text-xl font-semibold">Proses Menenun</h3>
              <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
                {pakaianData.ulosSignificance.weavingTradition.description}
              </p>
              <div className="space-y-3">
                {pakaianData.ulosSignificance.weavingTradition.process.map(
                  (step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="text-accent mr-3 font-semibold">{index + 1}.</span>
                      <span className="text-foreground/70 text-sm">{step}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="bg-foreground/5 mb-4 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-lg font-semibold">Waktu Pengerjaan</h4>
                <p className="text-foreground/70 text-sm">
                  {pakaianData.ulosSignificance.weavingTradition.timeRequired}
                </p>
              </div>

              <div className="bg-foreground/5 mb-4 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-lg font-semibold">Material</h4>
                <p className="text-foreground/70 text-sm">
                  {pakaianData.ulosSignificance.weavingTradition.materials}
                </p>
              </div>

              <div className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 text-lg font-semibold">Keahlian</h4>
                <p className="text-foreground/70 text-sm">
                  {pakaianData.ulosSignificance.weavingTradition.skill}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Symbolism */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Simbolisme Warna</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {pakaianData.colorSymbolism.description}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pakaianData.colorSymbolism.colors.map((colorData: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <div
                  className={`mb-4 h-20 rounded ${
                    colorData.color === 'Merah'
                      ? 'bg-accent'
                      : colorData.color === 'Hitam'
                        ? 'bg-black'
                        : colorData.color === 'Putih'
                          ? 'border-foreground/20 border bg-white'
                          : 'bg-yellow-500'
                  }`}
                ></div>
                <h3 className="text-accent mb-2 text-lg font-semibold">{colorData.color}</h3>
                <p className="text-foreground/70 mb-3 text-sm">{colorData.meaning}</p>
                <p className="text-foreground/60 text-xs italic">Digunakan: {colorData.usage}</p>
              </div>
            ))}
          </div>
          <div className="bg-accent/10 mt-8 rounded-lg p-6">
            <p className="text-foreground/80 leading-relaxed italic">
              {pakaianData.colorSymbolism.philosophy}
            </p>
          </div>
        </section>

        {/* Regional Variations */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Variasi Regional</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {pakaianData.regionalVariations.description}
          </p>

          <SectionImage 
            src="/images/budaya/pakaian/variasi-regional-visual.png" 
            alt="Variasi Regional Pakaian Adat Batak"
            caption="Perbedaan ciri khas busana dan hiasan kepala antar sub-etnis Batak"
          />
          <div className="grid grid-cols-1 gap-6">
            {pakaianData.regionalVariations.variations.map((region: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-accent mb-3 text-xl font-semibold">{region.region}</h3>
                    <p className="text-foreground/70 mb-4 text-sm">{region.characteristics}</p>
                    <div className="bg-background rounded p-3">
                      <p className="text-accent mb-1 text-xs font-semibold">Hiasan Kepala:</p>
                      <p className="text-foreground/70 text-xs">{region.headpiece}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-accent mb-2 text-sm font-semibold">Ciri Khas:</h4>
                    <p className="text-foreground/70 mb-4 text-sm italic">{region.distinctive}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modern Adaptation */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Adaptasi Modern</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {pakaianData.modernAdaptation.description}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pakaianData.modernAdaptation.adaptations.map((adaptation: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-lg font-semibold">{adaptation.context}</h3>
                <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                  {adaptation.style}
                </p>
                <div className="bg-accent/10 rounded p-3">
                  <p className="text-foreground/80 text-xs italic">{adaptation.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-accent/10 mt-6 rounded-lg p-6">
            <p className="text-foreground/80 leading-relaxed">
              {pakaianData.modernAdaptation.conservation}
            </p>
          </div>
        </section>

        {/* Gallery Sections */}
        {pakaianImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Pakaian Adat</h2>
            <Gallery images={pakaianImages} columns={3} aspectRatio="portrait" showCredits={true} />
          </section>
        )}

        {ulosImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Motif Ulos</h2>
            <p className="text-foreground/70 mb-6">
              Detail motif dan pola tenun ulos dari berbagai jenis.
            </p>
            <Gallery images={ulosImages} columns={4} aspectRatio="square" showCredits={true} />
          </section>
        )}

        {/* Discussion Section */}
        <PageDiscussion />
      </div>
    </div>
    </>
  );
}
