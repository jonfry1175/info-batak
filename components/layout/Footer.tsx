import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-foreground/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-accent mb-3">InfoBatak.id</h3>
            <p className="text-foreground/70 text-sm mb-4">
              Portal informasi digital yang menyajikan konten tentang sejarah, budaya, adat,
              aksara, dan sistem marga Batak secara modern dan informatif.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-accent transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/sejarah" className="text-foreground/70 hover:text-accent transition-colors">
                  Sejarah
                </Link>
              </li>
              <li>
                <Link href="/marga" className="text-foreground/70 hover:text-accent transition-colors">
                  Marga
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-foreground/70 hover:text-accent transition-colors">
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Budaya Links */}
          <div>
            <h4 className="font-semibold mb-3">Budaya</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/budaya/adat-istiadat"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Adat Istiadat
                </Link>
              </li>
              <li>
                <Link
                  href="/budaya/kesenian"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Kesenian
                </Link>
              </li>
              <li>
                <Link
                  href="/budaya/aksara-batak"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Aksara Batak
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-foreground/10 text-center text-sm text-foreground/60">
          <p>&copy; {currentYear} InfoBatak.id. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
