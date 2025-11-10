export default function BeritaPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">Berita & Artikel</h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Informasi terkini dan artikel menarik seputar budaya, sejarah, dan kehidupan masyarakat
            Batak
          </p>
        </div>

        {/* Coming Soon */}
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="bg-foreground/5 rounded-lg p-12 border border-foreground/10">
            <div className="text-6xl mb-6">📰</div>
            <h2 className="text-2xl font-bold mb-4">Segera Hadir</h2>
            <p className="text-foreground/70 mb-8">
              Kami sedang menyiapkan konten berkualitas untuk Anda. Artikel dan berita menarik
              seputar budaya Batak akan segera ditambahkan.
            </p>
            <div className="inline-block bg-accent/10 border border-accent/30 rounded-lg px-6 py-3">
              <p className="text-sm text-foreground/80">
                <strong className="text-accent">Tip:</strong> Sementara menunggu, Anda bisa
                menjelajahi halaman Sejarah, Marga, dan Aksara Batak untuk mempelajari lebih lanjut
                tentang budaya Batak.
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-foreground/5 rounded-lg p-6 border border-foreground/10 opacity-50"
            >
              <div className="aspect-video bg-foreground/10 rounded-lg mb-4"></div>
              <div className="h-4 bg-foreground/10 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-foreground/10 rounded w-full mb-1"></div>
              <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
