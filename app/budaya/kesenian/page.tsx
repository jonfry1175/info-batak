export default function KesenianPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Kesenian Batak</h1>
        <p className="text-lg text-foreground/70 mb-12">
          Menjelajahi kekayaan seni musik, tari, dan kerajinan tradisional Batak
        </p>

        {/* Musik Tradisional */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Musik Tradisional</h2>

          <div className="space-y-8">
            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8">
              <h3 className="font-bold text-2xl mb-4 text-accent">Gondang Sabangunan</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Gondang Sabangunan adalah ansambel musik tradisional Batak Toba yang dimainkan dalam
                berbagai upacara adat. "Sabangunan" berarti satu bangunan atau satu kesatuan,
                menandakan bahwa semua instrumen harus dimainkan secara harmonis.
              </p>
              <div className="bg-background rounded-lg p-6 mt-4">
                <h4 className="font-semibold mb-3">Instrumen dalam Gondang Sabangunan:</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
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
                      <strong>Hesek-hesek:</strong> Alat musik berbunyi gemerincing sebagai pelengkap
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-accent">Musik Gondang Karo</h3>
              <p className="text-foreground/80">
                Musik tradisional Batak Karo yang dimainkan dengan instrumen gendang dan gung (gong).
                Memiliki karakter yang berbeda dari Gondang Toba namun sama-sama sakral dan
                digunakan dalam upacara adat.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-accent">Gondang Dol (Mandailing)</h3>
              <p className="text-foreground/80">
                Ansambel musik Mandailing yang terdiri dari gordang (drum besar), mongmongan (gong),
                dan alat musik lainnya. Meskipun masyarakat Mandailing mayoritas Muslim, musik ini
                tetap dipertahankan sebagai warisan budaya.
              </p>
            </div>
          </div>
        </section>

        {/* Tarian Tradisional */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Tarian Tradisional</h2>

          <div className="space-y-6">
            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8">
              <h3 className="font-bold text-2xl mb-4 text-accent">Tortor</h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Tortor adalah tarian tradisional Batak yang dilakukan dalam berbagai upacara adat.
                Gerakan tarian ini mengandung makna filosofis yang mendalam dan tidak boleh dilakukan
                sembarangan.
              </p>
              <div className="bg-background rounded-lg p-6 mt-4">
                <h4 className="font-semibold mb-3">Jenis-jenis Tortor:</h4>
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
              <h3 className="font-bold text-xl mb-3 text-accent">Tari Piso Surit (Karo)</h3>
              <p className="text-foreground/80">
                Tarian perang tradisional Batak Karo yang menggambarkan keberanian prajurit dengan
                menggunakan pisau (piso surit). Gerakan tarian ini lincah dan penuh semangat.
              </p>
            </div>
          </div>
        </section>

        {/* Kerajinan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Kerajinan Tradisional</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">🧵</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Ulos</h3>
              <p className="text-foreground/80 text-sm">
                Kain tenun tradisional Batak yang ditenun dengan tangan menggunakan benang kapas.
                Setiap motif ulos memiliki makna dan fungsi tertentu dalam upacara adat. Ulos
                melambangkan kehangatan, kasih sayang, dan berkat.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Rumah Adat (Ruma Bolon)</h3>
              <p className="text-foreground/80 text-sm">
                Arsitektur rumah tradisional Batak Toba dengan atap berbentuk perahu terbalik,
                melambangkan nenek moyang yang datang melalui laut. Rumah ini dibangun tanpa paku,
                menggunakan sistem konstruksi yang rumit namun kokoh.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">🗡️</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Piso Gaja Dompak</h3>
              <p className="text-foreground/80 text-sm">
                Keris atau pedang tradisional Batak yang memiliki hulu berbentuk kepala kerbau atau
                naga. Dianggap memiliki kekuatan magis dan sering dijadikan pusaka keluarga.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">📿</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Ukiran Gorga</h3>
              <p className="text-foreground/80 text-sm">
                Seni ukir tradisional Batak dengan motif-motif khas seperti singa-singa (tokek),
                boraspati (kadal), dan berbagai ornamen geometris yang menghiasi rumah adat, alat
                musik, dan perabotan.
              </p>
            </div>
          </div>
        </section>

        {/* Sastra Lisan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Sastra Lisan</h2>
          <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8">
            <h3 className="font-bold text-xl mb-4">Umpasa & Umpama</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Umpasa adalah ungkapan bijak atau pepatah dalam bahasa Batak yang disampaikan dalam
              bentuk pantun atau syair. Umpasa sering digunakan dalam pidato adat untuk menyampaikan
              pesan moral, nasihat, atau doa dengan bahasa yang indah dan penuh makna.
            </p>
            <div className="bg-background rounded-lg p-6">
              <p className="text-sm italic text-foreground/70 mb-2">Contoh Umpasa:</p>
              <p className="font-medium text-foreground/90">
                "Annon do haganupan di bagasan, annon do hasangapon di uhum"
              </p>
              <p className="text-sm text-foreground/60 mt-2">
                (Kehormatan bukan terletak pada pakaian, tetapi pada perilaku yang baik)
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
