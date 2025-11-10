export default function TentangPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent text-center">
          Tentang InfoBatak.id
        </h1>
        <p className="text-lg text-foreground/70 mb-12 text-center max-w-2xl mx-auto">
          Portal digital yang berkomitmen melestarikan dan membagikan kekayaan budaya Batak
        </p>

        {/* Visi & Misi */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">Visi</h2>
              <p className="text-foreground/80 leading-relaxed">
                Menjadi portal digital utama yang informatif, modern, dan menarik mengenai segala
                aspek budaya dan sejarah Batak.
              </p>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">Misi</h2>
              <p className="text-foreground/80 leading-relaxed">
                Melestarikan, mengedukasi, dan membagikan pengetahuan tentang sejarah, budaya, adat,
                aksara, dan sistem marga Batak kepada generasi muda dan masyarakat luas.
              </p>
            </div>
          </div>
        </section>

        {/* Apa yang Kami Tawarkan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Apa yang Kami Tawarkan</h2>
          <div className="space-y-6">
            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-accent">Konten Edukatif</h3>
                  <p className="text-foreground/80 text-sm">
                    Artikel mendalam tentang sejarah Batak, sistem marga, adat istiadat, aksara,
                    musik, tarian, dan berbagai aspek budaya lainnya yang disajikan dengan bahasa
                    yang mudah dipahami.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🔍</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-accent">Sistem Marga Interaktif</h3>
                  <p className="text-foreground/80 text-sm">
                    Fitur pencarian dan penjelajahan marga Batak dengan filter untuk 6 rumpun: Toba,
                    Karo, Simalungun, Pakpak, Angkola, dan Mandailing, memudahkan Anda mengenal
                    sistem kekerabatan Batak.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✍️</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-accent">Panduan Aksara Batak</h3>
                  <p className="text-foreground/80 text-sm">
                    Penjelasan lengkap tentang Aksara Batak, mulai dari sejarah, Ina ni Surat (huruf
                    induk), Anak ni Surat (tanda diakritik), hingga cara membacanya, sebagai
                    pelestarian warisan budaya leluhur.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-accent">Fakta Menarik</h3>
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
          <h2 className="text-3xl font-bold mb-6 text-center">Untuk Siapa Website Ini?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">🌱 Generasi Muda Batak</h3>
              <p className="text-foreground/80 text-sm">
                Bagi Anda yang ingin mempelajari dan memahami akar budaya dan tradisi leluhur
                dengan cara yang modern dan mudah diakses.
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">🌏 Diaspora Batak</h3>
              <p className="text-foreground/80 text-sm">
                Untuk Anda yang berada di luar Sumatera Utara atau bahkan di luar negeri, namun
                tetap ingin terhubung dengan budaya Batak.
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">📖 Pelajar & Peneliti</h3>
              <p className="text-foreground/80 text-sm">
                Sumber informasi yang terpercaya untuk penelitian akademis, tugas sekolah, atau
                studi budaya Nusantara.
              </p>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">🤝 Masyarakat Umum</h3>
              <p className="text-foreground/80 text-sm">
                Siapa saja yang tertarik untuk mempelajari dan menghargai kekayaan budaya
                Indonesia, khususnya budaya Batak.
              </p>
            </div>
          </div>
        </section>

        {/* Komitmen */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Komitmen Kami</h2>
            <div className="space-y-3 text-foreground/80 max-w-2xl mx-auto">
              <p className="text-center">
                InfoBatak.id berkomitmen untuk menyajikan informasi yang akurat, mudah dipahami, dan
                menarik. Kami percaya bahwa pelestarian budaya harus dilakukan dengan cara yang
                modern dan relevan dengan zaman, tanpa menghilangkan esensi dan nilai-nilai luhur
                yang terkandung di dalamnya.
              </p>
              <p className="text-center font-medium text-accent">
                Mari bersama-sama melestarikan warisan budaya Batak untuk generasi mendatang.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack (Optional) */}
        <section className="text-center">
          <p className="text-sm text-foreground/60">
            Website ini dibangun dengan teknologi modern: Next.js, TypeScript, Tailwind CSS, dan
            Framer Motion untuk memberikan pengalaman terbaik kepada Anda.
          </p>
        </section>
      </div>
    </div>
  );
}
