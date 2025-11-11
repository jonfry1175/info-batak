import { Gallery } from '@/components/ui/Gallery';
import { getImagesByCategory } from '@/lib/data';

export default function KesenianPage() {
  // Get images for galleries
  const gondangImages = getImagesByCategory('Budaya', 'Gondang');
  const tortorImages = getImagesByCategory('Budaya', 'Tortor');
  const ulosImages = getImagesByCategory('Budaya', 'Ulos');

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-accent mb-6 text-4xl font-bold md:text-5xl">Kesenian Batak</h1>
        <p className="text-foreground/70 mb-12 text-lg">
          Menjelajahi kekayaan seni musik, tari, dan kerajinan tradisional Batak
        </p>

        {/* Musik Tradisional */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Musik Tradisional</h2>

          <div className="space-y-8">
            <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
              <h3 className="text-accent mb-4 text-2xl font-bold">Gondang Sabangunan</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Gondang Sabangunan adalah ansambel musik tradisional Batak Toba yang dimainkan dalam
                berbagai upacara adat. "Sabangunan" berarti satu bangunan atau satu kesatuan,
                menandakan bahwa semua instrumen harus dimainkan secara harmonis.
              </p>
              <div className="bg-background mt-4 rounded-lg p-6">
                <h4 className="mb-3 font-semibold">Instrumen dalam Gondang Sabangunan:</h4>
                <ul className="text-foreground/80 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">🥁</span>
                    <div>
                      <strong>Taganing:</strong> 5 buah gendang dengan nada berbeda yang dimainkan
                      dengan irama kompleks
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🥁</span>
                    <div>
                      <strong>Gordang:</strong> Gendang besar yang memberikan nada bass
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🥁</span>
                    <div>
                      <strong>Odap-odap:</strong> 2 buah gendang kecil sebagai pengiring
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🎺</span>
                    <div>
                      <strong>Sarune:</strong> Alat tiup tradisional yang terbuat dari kayu dan
                      tanduk kerbau
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🔔</span>
                    <div>
                      <strong>Hesek-hesek:</strong> Alat musik berbunyi gemerincing sebagai
                      pelengkap
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-3 text-xl font-bold">Musik Gondang Karo</h3>
              <p className="text-foreground/80">
                Musik tradisional Batak Karo yang dimainkan dengan instrumen gendang dan gung
                (gong). Memiliki karakter yang berbeda dari Gondang Toba namun sama-sama sakral dan
                digunakan dalam upacara adat.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-3 text-xl font-bold">Gondang Dol (Mandailing)</h3>
              <p className="text-foreground/80">
                Ansambel musik Mandailing yang terdiri dari gordang (drum besar), mongmongan (gong),
                dan alat musik lainnya. Meskipun masyarakat Mandailing mayoritas Muslim, musik ini
                tetap dipertahankan sebagai warisan budaya.
              </p>
            </div>
          </div>
        </section>

        {/* Gondang Gallery */}
        {gondangImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Instrumen Gondang</h2>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Koleksi foto instrumen musik tradisional Gondang Sabangunan, dari taganing hingga sarune.
            </p>
            <Gallery
              images={gondangImages}
              columns={3}
              aspectRatio="square"
              showCredits={true}
            />
          </section>
        )}

        {/* Tarian Tradisional */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Tarian Tradisional</h2>

          <div className="space-y-6">
            <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
              <h3 className="text-accent mb-4 text-2xl font-bold">Tortor</h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Tortor adalah tarian tradisional Batak yang dilakukan dalam berbagai upacara adat.
                Gerakan tarian ini mengandung makna filosofis yang mendalam dan tidak boleh
                dilakukan sembarangan.
              </p>
              <div className="bg-background mt-4 rounded-lg p-6">
                <h4 className="mb-3 font-semibold">Jenis-jenis Tortor:</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-accent">Tortor Pangurason:</strong>
                    <p className="text-foreground/70 mt-1">
                      Tarian yang dilakukan saat pemberian berkat atau ulos, biasanya dipimpin oleh
                      pihak hula-hula
                    </p>
                  </div>
                  <div>
                    <strong className="text-accent">Tortor Sipitu Cawan:</strong>
                    <p className="text-foreground/70 mt-1">
                      Tarian dengan 7 piring yang berisi lilin, melambangkan tujuh unsur kehidupan
                    </p>
                  </div>
                  <div>
                    <strong className="text-accent">Tortor Tunggal Panaluan:</strong>
                    <p className="text-foreground/70 mt-1">
                      Tarian tunggal yang dilakukan oleh satu orang dalam momen khusus
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-accent mb-3 text-xl font-bold">Tari Piso Surit (Karo)</h3>
              <p className="text-foreground/80">
                Tarian perang tradisional Batak Karo yang menggambarkan keberanian prajurit dengan
                menggunakan pisau (piso surit). Gerakan tarian ini lincah dan penuh semangat.
              </p>
            </div>
          </div>
        </section>

        {/* Tortor Gallery */}
        {tortorImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Gerakan Tortor</h2>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Dokumentasi visual dari berbagai gerakan tarian Tortor dalam upacara adat Batak.
            </p>
            <Gallery
              images={tortorImages}
              columns={4}
              aspectRatio="portrait"
              showCredits={true}
            />
          </section>
        )}

        {/* Kerajinan */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Kerajinan Tradisional</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="mb-4 text-4xl">🧵</div>
              <h3 className="text-accent mb-3 text-xl font-bold">Ulos</h3>
              <p className="text-foreground/80 text-sm">
                Kain tenun tradisional Batak yang ditenun dengan tangan menggunakan benang kapas.
                Setiap motif ulos memiliki makna dan fungsi tertentu dalam upacara adat. Ulos
                melambangkan kehangatan, kasih sayang, dan berkat.
              </p>
            </div>

            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="mb-4 text-4xl">🏠</div>
              <h3 className="text-accent mb-3 text-xl font-bold">Rumah Adat (Ruma Bolon)</h3>
              <p className="text-foreground/80 text-sm">
                Arsitektur rumah tradisional Batak Toba dengan atap berbentuk perahu terbalik,
                melambangkan nenek moyang yang datang melalui laut. Rumah ini dibangun tanpa paku,
                menggunakan sistem konstruksi yang rumit namun kokoh.
              </p>
            </div>

            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="mb-4 text-4xl">🗡️</div>
              <h3 className="text-accent mb-3 text-xl font-bold">Piso Gaja Dompak</h3>
              <p className="text-foreground/80 text-sm">
                Keris atau pedang tradisional Batak yang memiliki hulu berbentuk kepala kerbau atau
                naga. Dianggap memiliki kekuatan magis dan sering dijadikan pusaka keluarga.
              </p>
            </div>

            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="mb-4 text-4xl">📿</div>
              <h3 className="text-accent mb-3 text-xl font-bold">Ukiran Gorga</h3>
              <p className="text-foreground/80 text-sm">
                Seni ukir tradisional Batak dengan motif-motif khas seperti singa-singa (tokek),
                boraspati (kadal), dan berbagai ornamen geometris yang menghiasi rumah adat, alat
                musik, dan perabotan.
              </p>
            </div>
          </div>
        </section>

        {/* Ulos Patterns Gallery */}
        {ulosImages.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold">Galeri Motif Ulos</h2>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Detail close-up dari berbagai motif dan pola tenun ulos tradisional Batak yang indah dan sarat makna.
            </p>
            <Gallery
              images={ulosImages}
              columns={4}
              aspectRatio="square"
              showCredits={true}
            />
          </section>
        )}

        {/* Sastra Lisan */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Sastra Lisan</h2>
          <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
            <h3 className="mb-4 text-xl font-bold">Umpasa & Umpama</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Umpasa adalah ungkapan bijak atau pepatah dalam bahasa Batak yang disampaikan dalam
              bentuk pantun atau syair. Umpasa sering digunakan dalam pidato adat untuk menyampaikan
              pesan moral, nasihat, atau doa dengan bahasa yang indah dan penuh makna.
            </p>
            <div className="bg-background rounded-lg p-6">
              <p className="text-foreground/70 mb-2 text-sm italic">Contoh Umpasa:</p>
              <p className="text-foreground/90 font-medium">
                "Annon do haganupan di bagasan, annon do hasangapon di uhum"
              </p>
              <p className="text-foreground/60 mt-2 text-sm">
                (Kehormatan bukan terletak pada pakaian, tetapi pada perilaku yang baik)
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
