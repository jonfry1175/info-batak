import { Sidebar } from '@/components/layout/Sidebar';

export default function SejarahPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Sejarah Batak</h1>
            <p className="text-lg text-foreground/70 mb-8">
              Menelusuri jejak sejarah dan asal usul masyarakat Batak di Sumatera Utara
            </p>

            {/* Asal Usul */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Asal Usul Bangsa Batak</h2>
              <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4">
                <p>
                  Bangsa Batak adalah salah satu suku bangsa terbesar di Indonesia yang mendiami
                  wilayah Sumatera Utara. Menurut berbagai sumber sejarah dan mitologi, nenek moyang
                  bangsa Batak dipercaya berasal dari daerah Asia Tenggara daratan yang kemudian
                  bermigrasi ke Pulau Sumatera.
                </p>
                <p>
                  Dalam kepercayaan tradisional Batak, disebutkan bahwa leluhur bangsa Batak berasal
                  dari <em>Pusuk Buhit</em>, sebuah gunung yang terletak di dekat Danau Toba.
                  Menurut legenda, <em>Si Raja Batak</em> adalah nenek moyang pertama yang menurunkan
                  berbagai marga Batak.
                </p>
              </div>
            </section>

            {/* Pembagian Sub-Etnis */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Enam Rumpun Batak</h2>
              <div className="text-foreground/80 leading-relaxed space-y-4 mb-6">
                <p>
                  Masyarakat Batak terdiri dari enam sub-etnis utama yang memiliki bahasa, adat, dan
                  wilayah yang berbeda namun tetap memiliki akar budaya yang sama:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <h3 className="font-bold text-xl mb-2 text-accent">Batak Toba</h3>
                  <p className="text-sm text-foreground/70">
                    Sub-etnis terbesar yang mendiami kawasan sekitar Danau Toba dan Tapanuli Utara.
                    Dikenal dengan sistem Dalihan Na Tolu dan musik Gondang Sabangunan.
                  </p>
                </div>

                <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <h3 className="font-bold text-xl mb-2 text-accent">Batak Karo</h3>
                  <p className="text-sm text-foreground/70">
                    Mendiami dataran tinggi Karo dan memiliki sistem marga yang dikenal sebagai
                    "Merga Silima" (lima marga utama).
                  </p>
                </div>

                <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <h3 className="font-bold text-xl mb-2 text-accent">Batak Simalungun</h3>
                  <p className="text-sm text-foreground/70">
                    Bermukim di wilayah Simalungun dengan kerajaan-kerajaan kecil yang dipimpin oleh
                    raja-raja lokal.
                  </p>
                </div>

                <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <h3 className="font-bold text-xl mb-2 text-accent">Batak Pakpak</h3>
                  <p className="text-sm text-foreground/70">
                    Mendiami kawasan Pakpak Bharat (dahulu Dairi) dengan budaya yang kaya akan seni
                    dan musik tradisional.
                  </p>
                </div>

                <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <h3 className="font-bold text-xl mb-2 text-accent">Batak Angkola</h3>
                  <p className="text-sm text-foreground/70">
                    Bermukim di Tapanuli Selatan bagian utara, memiliki pengaruh budaya Islam yang
                    kuat namun tetap mempertahankan tradisi Batak.
                  </p>
                </div>

                <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                  <h3 className="font-bold text-xl mb-2 text-accent">Batak Mandailing</h3>
                  <p className="text-sm text-foreground/70">
                    Mendiami Tapanuli Selatan bagian selatan. Mayoritas beragama Islam namun tetap
                    menjaga sistem marga dan adat istiadat Batak.
                  </p>
                </div>
              </div>
            </section>

            {/* Tokoh Sejarah */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Tokoh Penting dalam Sejarah Batak</h2>
              <div className="space-y-6">
                <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-2">Raja Sisingamangaraja XII</h3>
                  <p className="text-sm text-foreground/70 mb-2">
                    <em>Pahlawan Nasional Indonesia</em>
                  </p>
                  <p className="text-foreground/80">
                    Raja terakhir dari dinasti Sisingamangaraja yang memimpin perlawanan rakyat Batak
                    Toba melawan kolonialisme Belanda dari tahun 1877 hingga gugurnya pada tahun
                    1907. Ia dianugerahi gelar Pahlawan Nasional Indonesia.
                  </p>
                </div>

                <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-2">I.L. Nommensen</h3>
                  <p className="text-sm text-foreground/70 mb-2">
                    <em>Misionaris dan Tokoh Pendidikan</em>
                  </p>
                  <p className="text-foreground/80">
                    Ludwig Ingwer Nommensen adalah misionaris Jerman yang membawa agama Kristen ke
                    tanah Batak pada abad ke-19. Selain menyebarkan agama, ia juga mendirikan
                    sekolah-sekolah dan mengembangkan tulisan Latin untuk bahasa Batak, yang
                    berkontribusi besar pada pendidikan dan literasi masyarakat Batak.
                  </p>
                </div>
              </div>
            </section>

            {/* Era Modern */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Batak di Era Modern</h2>
              <div className="text-foreground/80 leading-relaxed space-y-4">
                <p>
                  Pada era modern, masyarakat Batak telah mengalami perkembangan pesat dalam
                  berbagai bidang. Pendidikan tinggi yang sudah maju sejak awal abad ke-20 telah
                  menghasilkan banyak tokoh-tokoh penting di tingkat nasional dan internasional.
                </p>
                <p>
                  Masyarakat Batak dikenal dengan semangat merantau (<em>marsiajar</em>) yang kuat.
                  Banyak orang Batak yang sukses di berbagai bidang seperti politik, pendidikan,
                  bisnis, hukum, musik, dan seni. Namun mereka tetap menjaga identitas budaya dan
                  sistem marga mereka di manapun berada.
                </p>
                <p>
                  Hingga kini, upaya pelestarian budaya Batak terus dilakukan melalui organisasi
                  adat, pendidikan budaya, festival, dan digitalisasi warisan budaya seperti Aksara
                  Batak, musik tradisional, dan pustaha (manuskrip kuno).
                </p>
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
  );
}
