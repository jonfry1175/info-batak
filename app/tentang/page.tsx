export default function TentangPage() {
  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-accent mb-6 text-center text-4xl font-bold md:text-5xl">
          Tentang InfoBatak.id
        </h1>
        <p className="text-foreground/70 mx-auto mb-12 max-w-2xl text-center text-lg">
          Portal digital yang berkomitmen melestarikan dan membagikan kekayaan budaya Batak
        </p>

        {/* Visi & Misi */}
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
              <h2 className="text-accent mb-4 text-2xl font-bold">Visi</h2>
              <p className="text-foreground/80 leading-relaxed">
                Menjadi portal digital utama yang informatif, modern, dan menarik mengenai segala
                aspek budaya dan sejarah Batak.
              </p>
            </div>

            <div className="bg-accent/10 border-accent rounded-lg border-l-4 p-8">
              <h2 className="text-accent mb-4 text-2xl font-bold">Misi</h2>
              <p className="text-foreground/80 leading-relaxed">
                Melestarikan, mengedukasi, dan membagikan pengetahuan tentang sejarah, budaya, adat,
                aksara, dan sistem marga Batak kepada generasi muda dan masyarakat luas.
              </p>
            </div>
          </div>
        </section>

        {/* Apa yang Kami Tawarkan */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Apa yang Kami Tawarkan</h2>
          <div className="space-y-6">
            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="text-accent mb-2 text-lg font-bold">Konten Edukatif</h3>
                  <p className="text-foreground/80 text-sm">
                    Artikel mendalam tentang sejarah Batak, sistem marga, adat istiadat, aksara,
                    musik, tarian, dan berbagai aspek budaya lainnya yang disajikan dengan bahasa
                    yang mudah dipahami.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🔍</div>
                <div>
                  <h3 className="text-accent mb-2 text-lg font-bold">Sistem Marga Interaktif</h3>
                  <p className="text-foreground/80 text-sm">
                    Fitur pencarian dan penjelajahan marga Batak dengan filter untuk 6 rumpun: Toba,
                    Karo, Simalungun, Pakpak, Angkola, dan Mandailing, memudahkan Anda mengenal
                    sistem kekerabatan Batak.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✍️</div>
                <div>
                  <h3 className="text-accent mb-2 text-lg font-bold">Panduan Aksara Batak</h3>
                  <p className="text-foreground/80 text-sm">
                    Penjelasan lengkap tentang Aksara Batak, mulai dari sejarah, Ina ni Surat (huruf
                    induk), Anak ni Surat (tanda diakritik), hingga cara membacanya, sebagai
                    pelestarian warisan budaya leluhur.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="text-accent mb-2 text-lg font-bold">Fakta Menarik</h3>
                  <p className="text-foreground/80 text-sm">
                    Fitur "Tahukah Kamu?" yang menyajikan fakta-fakta unik dan menarik tentang
                    budaya Batak untuk menambah wawasan Anda dengan cara yang engaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Untuk Siapa Website Ini?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="mb-2 text-lg font-bold">🌱 Generasi Muda Batak</h3>
              <p className="text-foreground/80 text-sm">
                Bagi Anda yang ingin mempelajari dan memahami akar budaya dan tradisi leluhur dengan
                cara yang modern dan mudah diakses.
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="mb-2 text-lg font-bold">🌏 Diaspora Batak</h3>
              <p className="text-foreground/80 text-sm">
                Untuk Anda yang berada di luar Sumatera Utara atau bahkan di luar negeri, namun
                tetap ingin terhubung dengan budaya Batak.
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="mb-2 text-lg font-bold">📖 Pelajar & Peneliti</h3>
              <p className="text-foreground/80 text-sm">
                Sumber informasi yang terpercaya untuk penelitian akademis, tugas sekolah, atau
                studi budaya Nusantara.
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="mb-2 text-lg font-bold">🤝 Masyarakat Umum</h3>
              <p className="text-foreground/80 text-sm">
                Siapa saja yang tertarik untuk mempelajari dan menghargai kekayaan budaya Indonesia,
                khususnya budaya Batak.
              </p>
            </div>
          </div>
        </section>

        {/* Komitmen */}
        <section className="mb-16">
          <div className="from-accent/20 to-accent/10 rounded-lg bg-gradient-to-r p-8">
            <h2 className="mb-4 text-center text-2xl font-bold">Komitmen Kami</h2>
            <div className="text-foreground/80 mx-auto max-w-2xl space-y-3">
              <p className="text-center">
                InfoBatak.id berkomitmen untuk menyajikan informasi yang akurat, mudah dipahami, dan
                menarik. Kami percaya bahwa pelestarian budaya harus dilakukan dengan cara yang
                modern dan relevan dengan zaman, tanpa menghilangkan esensi dan nilai-nilai luhur
                yang terkandung di dalamnya.
              </p>
              <p className="text-accent text-center font-medium">
                Mari bersama-sama melestarikan warisan budaya Batak untuk generasi mendatang.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack (Optional) */}
        <section className="text-center">
          <p className="text-foreground/60 text-sm">
            Website ini dibangun dengan teknologi modern: Next.js, TypeScript, Tailwind CSS, dan
            Framer Motion untuk memberikan pengalaman terbaik kepada Anda.
          </p>
        </section>
      </div>
    </div>
  );
}
