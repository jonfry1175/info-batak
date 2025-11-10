export default function AksaraBatakPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">Aksara Batak</h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Jelajahi kekayaan aksara tradisional Batak yang menjadi warisan budaya leluhur
          </p>
        </div>

        {/* Definition */}
        <section className="mb-16">
          <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-accent">Apa itu Aksara Batak?</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Aksara Batak adalah sistem tulisan tradisional yang digunakan oleh masyarakat Batak
                di Sumatera Utara. Aksara ini termasuk dalam kelompok aksara <em>Brahmi</em> atau
                <em>Pallava</em> yang memiliki kemiripan dengan aksara-aksara lain di Nusantara
                seperti Aksara Jawa, Sunda, dan Bali.
              </p>
              <p>
                Aksara Batak digunakan untuk menulis berbagai bahasa Batak, termasuk Batak Toba,
                Karo, Simalungun, Pakpak/Dairi, dan Mandailing. Setiap sub-etnis Batak memiliki
                variasi aksara yang sedikit berbeda namun tetap memiliki dasar yang sama.
              </p>
              <p>
                Aksara ini memiliki nilai spiritual dan kebudayaan yang tinggi, karena digunakan
                dalam penulisan kitab-kitab pusaka (<em>pustaha</em>) yang berisi pengetahuan
                tradisional, ramalan, mantra, dan berbagai ilmu pengetahuan leluhur.
              </p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Sejarah Aksara Batak</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-accent">Asal Usul</h3>
              <p>
                Aksara Batak dipercaya berasal dari aksara Pallava yang dibawa ke Nusantara sekitar
                abad ke-5 Masehi. Aksara ini kemudian berkembang dan beradaptasi dengan kebutuhan
                bahasa-bahasa lokal di Sumatera Utara.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-accent">Pustaha: Media Aksara Batak</h3>
              <p>
                Aksara Batak tradisional ditulis pada media yang disebut <em>pustaha</em>, yaitu
                buku yang terbuat dari kulit kayu (<em>alim</em> atau <em>laklak</em>) yang dilipat
                seperti akordeon. Tulisan dibuat menggunakan pisau kecil (<em>pongot</em>) dan
                tinta dari jelaga (<em>apu</em>).
              </p>
              <p className="mt-3">
                Pustaha berisi berbagai pengetahuan penting seperti: parbegu (ilmu roh), poda
                (ramalan), tarombo (silsilah keluarga), dan ilmu pengobatan tradisional. Para ahli
                yang menguasai aksara ini disebut <em>datu</em> atau <em>guru</em>.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3 text-accent">Perkembangan Modern</h3>
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
          <h2 className="text-3xl font-bold mb-6">Panduan Membaca Aksara Batak</h2>

          {/* Ina ni Surat */}
          <div className="mb-10">
            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 mb-6">
              <h3 className="font-bold text-2xl mb-3 text-accent">Ina ni Surat (Huruf Induk)</h3>
              <p className="text-foreground/80 mb-4">
                Ina ni Surat adalah 19 huruf dasar dalam aksara Batak. Setiap huruf memiliki bunyi
                konsonan + vokal 'a' sebagai bunyi dasar.
              </p>
              <div className="bg-background rounded-lg p-6">
                <p className="font-mono text-sm text-foreground/70 mb-4">
                  Contoh urutan Ina ni Surat (Batak Toba):
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">ha</span> - ᯂ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">na</span> - ᯉ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">ba</span> - ᯅ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">ka</span> - ᯂ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">da</span> - ᯑ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">ta</span> - ᯖ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">sa</span> - ᯘ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">pa</span> - ᯇ
                  </div>
                  <div className="p-3 bg-foreground/5 rounded">
                    <span className="font-bold">ma</span> - ᯔ
                  </div>
                </div>
                <p className="text-xs text-foreground/60 mt-4">
                  Dan masih ada 10 huruf lagi: ga, ja, wa, la, ra, nga, nya, ya, i, u
                </p>
              </div>
            </div>
          </div>

          {/* Anak ni Surat */}
          <div className="mb-10">
            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 mb-6">
              <h3 className="font-bold text-2xl mb-3 text-accent">
                Anak ni Surat (Tanda Diakritik)
              </h3>
              <p className="text-foreground/80 mb-4">
                Anak ni Surat adalah tanda-tanda tambahan yang ditambahkan pada Ina ni Surat untuk
                mengubah bunyi vokalnya atau menambahkan konsonan di akhir suku kata.
              </p>
              <div className="bg-background rounded-lg p-6 space-y-4">
                <div>
                  <p className="font-semibold mb-2">Tanda Vokal:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/70 ml-4">
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
                  <p className="font-semibold mb-2">Tanda Konsonan Akhir:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/70 ml-4">
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
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg p-8">
            <h3 className="font-bold text-xl mb-4">Contoh Sederhana:</h3>
            <div className="bg-background rounded-lg p-6">
              <p className="text-foreground/70 mb-3">
                Kata <span className="font-bold text-accent">"BATAK"</span> dalam aksara Batak:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-mono bg-foreground/10 px-2 py-1 rounded">BA</span> = Huruf
                  'ba' (ᯅ)
                </p>
                <p>
                  <span className="font-mono bg-foreground/10 px-2 py-1 rounded">TA</span> = Huruf
                  'ta' (ᯖ)
                </p>
                <p>
                  <span className="font-mono bg-foreground/10 px-2 py-1 rounded">K</span> = Huruf
                  'ka' dengan pangwisik (ᯂ + tanda mati)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-foreground/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Lestarikan Aksara Batak</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Aksara Batak adalah warisan budaya yang sangat berharga. Mari kita jaga dan lestarikan
            dengan mempelajari, menggunakan, dan mengajarkannya kepada generasi selanjutnya.
          </p>
        </section>
      </div>
    </div>
  );
}
