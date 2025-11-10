export default function AdatIstiadatPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Adat Istiadat Batak</h1>
        <p className="text-lg text-foreground/70 mb-12">
          Memahami nilai-nilai filosofis dan tradisi yang mengatur kehidupan masyarakat Batak
        </p>

        {/* Dalihan Na Tolu */}
        <section className="mb-16">
          <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 text-accent">Dalihan Na Tolu</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Dalihan Na Tolu adalah filosofi sosial masyarakat Batak yang menjadi landasan utama
              dalam kehidupan bermasyarakat. Secara harfiah berarti "tungku nan tiga" atau "tungku
              berkaki tiga", yang melambangkan tiga pilar kehidupan sosial yang saling menopang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Hula-hula</h3>
              <p className="text-sm text-foreground/70 mb-2">
                <em>Pihak Pemberi Istri</em>
              </p>
              <p className="text-sm text-foreground/80">
                Kelompok marga yang memberikan anak perempuannya dalam perkawinan. Memiliki posisi
                yang terhormat dan dianggap sebagai sumber berkat. Dalam upacara adat, hula-hula
                duduk di posisi teratas dan mendapat penghormatan khusus.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Dongan Tubu</h3>
              <p className="text-sm text-foreground/70 mb-2">
                <em>Sesama Marga</em>
              </p>
              <p className="text-sm text-foreground/80">
                Kelompok yang memiliki marga yang sama atau marga yang setara. Hubungan ini bersifat
                persaudaraan dan kesetaraan. Mereka saling mendukung dan bekerja sama dalam berbagai
                kegiatan sosial.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="font-bold text-xl mb-3 text-accent">Boru</h3>
              <p className="text-sm text-foreground/70 mb-2">
                <em>Pihak Penerima Istri</em>
              </p>
              <p className="text-sm text-foreground/80">
                Kelompok marga yang menerima istri dari marga tertentu. Memiliki kewajiban untuk
                menghormati dan melayani hula-hula. Dalam upacara adat, boru bertanggung jawab atas
                berbagai pekerjaan teknis dan pelayanan.
              </p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 border border-foreground/10">
            <p className="text-foreground/80 leading-relaxed">
              Ketiga pilar ini harus seimbang dan saling menghormati agar masyarakat dapat hidup
              harmonis. Seperti tungku berkaki tiga yang tidak akan berdiri tegak jika salah satu
              kakinya hilang, demikian pula dengan kehidupan sosial masyarakat Batak yang bergantung
              pada keseimbangan ketiga elemen ini.
            </p>
          </div>
        </section>

        {/* Upacara Adat */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Upacara Adat Penting</h2>
          <div className="space-y-6">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2 text-accent">Mangompoi / Mangulosi</h3>
              <p className="text-foreground/80">
                Upacara pemberian ulos (kain tradisional) yang mengandung makna pemberian kehangatan,
                kasih sayang, dan berkat. Ulos diberikan dalam berbagai momen penting seperti
                pernikahan, kelahiran, atau acara syukuran.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2 text-accent">Horja / Pesta Adat</h3>
              <p className="text-foreground/80">
                Pesta adat yang diselenggarakan untuk berbagai keperluan seperti pernikahan,
                memasuki rumah baru, atau syukuran atas keberhasilan. Dalam horja, unsur Dalihan Na
                Tolu sangat terlihat dengan pembagian tugas dan posisi yang jelas.
              </p>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2 text-accent">Saur Matua</h3>
              <p className="text-foreground/80">
                Upacara perayaan syukur untuk orang tua yang telah berusia lanjut dan telah memiliki
                cucu. Ini dianggap sebagai berkah tertinggi dalam kehidupan orang Batak, karena
                mereka telah melihat keturunan mereka berkembang.
              </p>
            </div>
          </div>
        </section>

        {/* Nilai-nilai Budaya */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Nilai-nilai Budaya Batak</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Hagabeon, Hamoraon, Hasangapon</h3>
              <p className="text-sm text-foreground/80">
                Tiga hal yang menjadi tujuan hidup orang Batak: <em>Hagabeon</em> (banyak keturunan),{' '}
                <em>Hamoraon</em> (kekayaan), dan <em>Hasangapon</em> (kehormatan/martabat).
              </p>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Marsiajar (Merantau)</h3>
              <p className="text-sm text-foreground/80">
                Tradisi merantau untuk mencari ilmu dan kehidupan yang lebih baik, sambil tetap
                menjaga hubungan dengan kampung halaman dan menghormati adat istiadat.
              </p>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Marsiurupan (Gotong Royong)</h3>
              <p className="text-sm text-foreground/80">
                Semangat gotong royong dan saling membantu dalam komunitas, terutama dalam
                menghadapi pekerjaan besar atau kesulitan bersama.
              </p>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">Hormat dan Sopan Santun</h3>
              <p className="text-sm text-foreground/80">
                Sistem sapaan yang kompleks berdasarkan hubungan kekerabatan dan usia, yang
                mencerminkan penghormatan yang tinggi terhadap struktur sosial dan orang yang lebih
                tua.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
