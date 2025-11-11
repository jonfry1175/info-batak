import { Gallery } from '@/components/ui/Gallery';
import { getAllHouseTypes, getConstructionTechniques, getArsitekturData } from '@/lib/data';
import { getImagesByCategory } from '@/lib/data';

export default function ArsitekturPage() {
  const houseTypes = getAllHouseTypes();
  const techniques = getConstructionTechniques();
  const arsitekturData = getArsitekturData();

  // Get images for galleries (will use placeholders initially)
  const rumaImages = getImagesByCategory('Budaya', 'Arsitektur');

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-accent mb-6 text-4xl font-bold md:text-5xl">
          Arsitektur Tradisional Batak
        </h1>
        <p className="text-foreground/70 mb-12 text-lg leading-relaxed">
          Arsitektur tradisional Batak adalah salah satu warisan budaya yang paling menakjubkan.
          Rumah adat Batak tidak hanya indah secara visual, tetapi juga sarat dengan filosofi,
          teknologi konstruksi canggih, dan harmoni dengan alam.
        </p>

        {/* Ruma Bolon Toba Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Ruma Bolon (Rumah Adat Batak Toba)</h2>
          <div className="bg-accent/10 border-accent mb-8 rounded-lg border-l-4 p-8">
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <span className="font-semibold">Ruma Bolon</span> atau "rumah besar" adalah rumah
              adat tradisional Batak Toba yang megah dengan atap pelana berbentuk perahu terbalik.
              Konstruksinya yang unik tanpa menggunakan paku besi menjadikannya mahakarya arsitektur
              tradisional Indonesia.
            </p>
          </div>

          {houseTypes
            .filter(house => house.id === 'ruma-bolon-toba')
            .map(house => (
              <div key={house.id} className="mb-8">
                <h3 className="mb-4 text-2xl font-semibold">Karakteristik Utama</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {house.characteristics.map((char, index) => (
                    <div key={index} className="bg-foreground/5 flex items-start rounded-lg p-4">
                      <span className="text-accent mr-3 text-xl">•</span>
                      <span className="text-foreground/80">{char}</span>
                    </div>
                  ))}
                </div>

                <h3 className="mb-4 mt-8 text-2xl font-semibold">Struktur Bangunan</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h4 className="text-accent mb-2 font-semibold">Pondasi</h4>
                    <p className="text-foreground/70 text-sm">{house.structure.foundation}</p>
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h4 className="text-accent mb-2 font-semibold">Dinding</h4>
                    <p className="text-foreground/70 text-sm">{house.structure.walls}</p>
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h4 className="text-accent mb-2 font-semibold">Atap</h4>
                    <p className="text-foreground/70 text-sm">{house.structure.roof}</p>
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h4 className="text-accent mb-2 font-semibold">Lantai</h4>
                    <p className="text-foreground/70 text-sm">{house.structure.floor}</p>
                  </div>
                </div>

                <div className="bg-accent/10 mt-6 rounded-lg p-6">
                  <h4 className="text-accent mb-2 text-lg font-semibold">Simbolisme</h4>
                  <p className="text-foreground/80 leading-relaxed">{house.symbolism}</p>
                </div>
              </div>
            ))}
        </section>

        {/* Sopo Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Sopo (Lumbung Padi)</h2>
          {houseTypes
            .filter(house => house.id === 'sopo-toba')
            .map(house => (
              <div key={house.id}>
                <p className="text-foreground/70 mb-6 leading-relaxed">{house.description}</p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h3 className="text-accent mb-4 text-xl font-semibold">Karakteristik</h3>
                    <ul className="space-y-2">
                      {house.characteristics.map((char, index) => (
                        <li key={index} className="text-foreground/70 flex items-start text-sm">
                          <span className="text-accent mr-2">✓</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h3 className="text-accent mb-4 text-xl font-semibold">Fungsi</h3>
                    <p className="text-foreground/70 mb-4 text-sm">{house.function}</p>
                    <h4 className="text-accent mb-2 text-sm font-semibold">Simbolisme:</h4>
                    <p className="text-foreground/70 text-sm">{house.symbolism}</p>
                  </div>
                </div>
              </div>
            ))}
        </section>

        {/* Regional Variations */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Variasi Regional</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Setiap sub-etnis Batak memiliki gaya arsitektur yang sedikit berbeda, mencerminkan
            adaptasi terhadap lingkungan dan perkembangan budaya masing-masing.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Karo */}
            {houseTypes
              .filter(house => house.id === 'rumah-karo')
              .map(house => (
                <div key={house.id} className="bg-foreground/5 rounded-lg p-6">
                  <h3 className="text-accent mb-3 text-xl font-semibold">{house.name}</h3>
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {house.description}
                  </p>
                  <div className="bg-background rounded p-4">
                    <p className="text-accent mb-2 text-sm font-semibold">
                      Kapasitas: {house.capacity}
                    </p>
                    <p className="text-foreground/70 text-xs">{house.symbolism}</p>
                  </div>
                </div>
              ))}

            {/* Simalungun */}
            {houseTypes
              .filter(house => house.id === 'rumah-simalungun')
              .map(house => (
                <div key={house.id} className="bg-foreground/5 rounded-lg p-6">
                  <h3 className="text-accent mb-3 text-xl font-semibold">{house.name}</h3>
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {house.description}
                  </p>
                  <div className="bg-background rounded p-4">
                    <p className="text-accent mb-2 text-sm font-semibold">
                      Kapasitas: {house.capacity}
                    </p>
                    <p className="text-foreground/70 text-xs">{house.symbolism}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Construction Techniques */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Teknik Konstruksi Tradisional</h2>

          {techniques.map((technique, index) => (
            <div key={technique.id} className={index > 0 ? 'mt-8' : ''}>
              <h3 className="text-accent mb-4 text-2xl font-semibold">{technique.name}</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">{technique.description}</p>

              {technique.methods && (
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold">Metode:</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {technique.methods.map((method, idx) => (
                      <div key={idx} className="bg-foreground/5 flex items-start rounded p-4">
                        <span className="text-accent mr-3">→</span>
                        <span className="text-foreground/80 text-sm">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {technique.features && (
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold">Fitur:</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {technique.features.map((feature, idx) => (
                      <div key={idx} className="bg-foreground/5 flex items-start rounded p-4">
                        <span className="text-accent mr-3">→</span>
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {technique.advantages && (
                <div className="bg-accent/10 rounded-lg p-6">
                  <h4 className="text-accent mb-3 text-lg font-semibold">Keunggulan:</h4>
                  <ul className="space-y-2">
                    {technique.advantages.map((advantage, idx) => (
                      <li key={idx} className="text-foreground/80 flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Spatial Organization */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Organisasi Ruang</h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            {arsitekturData.spatialOrganization.description}
          </p>

          <h3 className="mb-4 text-2xl font-semibold">Pembagian Vertikal (Kosmologi)</h3>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {arsitekturData.spatialOrganization.verticalDivision.map((level: any, index: number) => (
              <div
                key={index}
                className="bg-foreground/5 flex flex-col justify-between rounded-lg p-6"
              >
                <div>
                  <h4 className="text-accent mb-2 text-lg font-semibold">{level.level}</h4>
                  <p className="text-foreground/70 mb-3 text-sm italic">{level.meaning}</p>
                </div>
                <p className="text-foreground/80 text-sm">{level.function}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 text-2xl font-semibold">Pembagian Horizontal</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {arsitekturData.spatialOrganization.horizontalDivision.map((area: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <h4 className="text-accent mb-2 font-semibold">{area.area}</h4>
                <p className="text-foreground/70 mb-2 text-sm">{area.function}</p>
                <p className="text-foreground/60 text-xs">Posisi: {area.position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ornaments Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Ornamen dan Ukiran</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {arsitekturData.ornaments.description}
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {arsitekturData.ornaments.types.map((ornament: any, index: number) => (
              <div key={index} className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-accent mb-3 text-xl font-semibold">{ornament.name}</h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">{ornament.description}</p>

                {ornament.locations && (
                  <div className="mb-4">
                    <p className="text-foreground/80 mb-2 text-sm font-semibold">Lokasi:</p>
                    <div className="flex flex-wrap gap-2">
                      {ornament.locations.map((loc: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-accent/20 text-accent rounded px-3 py-1 text-xs"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {ornament.symbolism && (
                  <p className="text-foreground/70 text-sm italic">
                    Simbolisme: {ornament.symbolism}
                  </p>
                )}

                {ornament.colors && (
                  <div className="mt-4">
                    <p className="text-foreground/80 mb-2 text-sm font-semibold">Warna & Makna:</p>
                    {ornament.colors.map((color: any, idx: number) => (
                      <div key={idx} className="text-foreground/70 mb-1 text-xs">
                        <span className="font-semibold">{color.name}:</span> {color.meaning}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        {rumaImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Arsitektur Batak</h2>
            <p className="text-foreground/70 mb-6">
              Koleksi foto arsitektur tradisional Batak dari berbagai daerah.
            </p>
            <Gallery
              images={rumaImages}
              columns={3}
              aspectRatio="video"
              showCredits={true}
            />
          </section>
        )}

        {/* Cultural Significance */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Makna Budaya</h2>
          <div className="bg-accent/10 space-y-6 rounded-lg p-8">
            <div>
              <h3 className="text-accent mb-2 text-lg font-semibold">Struktur Sosial</h3>
              <p className="text-foreground/80 leading-relaxed">
                {arsitekturData.culturalSignificance.socialStructure}
              </p>
            </div>
            <div>
              <h3 className="text-accent mb-2 text-lg font-semibold">Kosmologi</h3>
              <p className="text-foreground/80 leading-relaxed">
                {arsitekturData.culturalSignificance.cosmology}
              </p>
            </div>
            <div>
              <h3 className="text-accent mb-2 text-lg font-semibold">Kehidupan Komunal</h3>
              <p className="text-foreground/80 leading-relaxed">
                {arsitekturData.culturalSignificance.communityLiving}
              </p>
            </div>
            <div>
              <h3 className="text-accent mb-2 text-lg font-semibold">Keberlanjutan</h3>
              <p className="text-foreground/80 leading-relaxed">
                {arsitekturData.culturalSignificance.sustainability}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
