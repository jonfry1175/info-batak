export default function BeritaPage() {
  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-accent mb-4 text-4xl font-bold md:text-5xl">Berita & Artikel</h1>
          <p className="text-foreground/70 mx-auto max-w-3xl text-lg">
            Informasi terkini dan artikel menarik seputar budaya, sejarah, dan kehidupan masyarakat
            Batak
          </p>
        </div>

        {/* Coming Soon */}
        <div className="mx-auto max-w-2xl py-20 text-center">
          <div className="bg-foreground/5 border-foreground/10 rounded-lg border p-12">
            <div className="mb-6 text-6xl">📰</div>
            <h2 className="mb-4 text-2xl font-bold">Segera Hadir</h2>
            <p className="text-foreground/70 mb-8">
              Kami sedang menyiapkan konten berkualitas untuk Anda. Artikel dan berita menarik
              seputar budaya Batak akan segera ditambahkan.
            </p>
            <div className="bg-accent/10 border-accent/30 inline-block rounded-lg border px-6 py-3">
              <p className="text-foreground/80 text-sm">
                <strong className="text-accent">Tip:</strong> Sementara menunggu, Anda bisa
                menjelajahi halaman Sejarah, Marga, dan Aksara Batak untuk mempelajari lebih lanjut
                tentang budaya Batak.
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-foreground/5 border-foreground/10 rounded-lg border p-6 opacity-50"
            >
              <div className="bg-foreground/10 mb-4 aspect-video rounded-lg"></div>
              <div className="bg-foreground/10 mb-2 h-4 w-3/4 rounded"></div>
              <div className="bg-foreground/10 mb-1 h-3 w-full rounded"></div>
              <div className="bg-foreground/10 h-3 w-5/6 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
