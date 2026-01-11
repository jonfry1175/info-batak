import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Berita & Artikel Budaya Batak',
  description:
    'Informasi terkini dan artikel menarik seputar budaya, sejarah, event, komunitas, dan wisata budaya Batak di Indonesia. Tetap update dengan perkembangan budaya Batak.',
  keywords: [
    'berita batak',
    'artikel budaya batak',
    'event batak',
    'komunitas batak',
    'wisata batak',
    'festival batak',
  ],
  openGraph: {
    title: 'Berita & Artikel Budaya Batak | InfoBatak.id',
    description:
      'Update terbaru seputar budaya, sejarah, dan komunitas Batak.',
    url: 'https://infobatak.id/berita',
    images: ['/images/berita/hero-berita.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/berita',
  },
};

export default function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
