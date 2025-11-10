import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-foreground/10 mt-auto border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-accent mb-3 text-lg font-bold">InfoBatak.id</h3>
            <p className="text-foreground/70 mb-4 text-sm">
              Portal informasi digital yang menyajikan konten tentang sejarah, budaya, adat, aksara,
              dan sistem marga Batak secara modern dan informatif.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 font-semibold">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-accent transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/sejarah"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Sejarah
                </Link>
              </li>
              <li>
                <Link
                  href="/marga"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Marga
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Budaya Links */}
          <div>
            <h4 className="mb-3 font-semibold">Budaya</h4>
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

        <div className="border-foreground/10 text-foreground/60 mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} InfoBatak.id. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
