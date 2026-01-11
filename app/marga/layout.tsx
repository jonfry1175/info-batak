import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistem Marga Batak - 170+ Marga dari 6 Rumpun',
  description:
    'Database lengkap marga Batak dari 6 rumpun: Toba, Karo, Simalungun, Pakpak, Angkola, dan Mandailing. Temukan asal usul, sejarah, dan informasi lengkap marga Anda.',
  keywords: [
    'marga batak',
    'daftar marga batak',
    'marga batak toba',
    'marga karo',
    'marga simalungun',
    'arti marga batak',
    'silsilah marga batak',
    'sistem marga',
  ],
  openGraph: {
    title: 'Sistem Marga Batak - Database Lengkap 170+ Marga',
    description:
      'Jelajahi sistem marga Batak patrilineal dari 6 rumpun. Temukan informasi lengkap tentang marga Anda.',
    url: 'https://infobatak.id/marga',
    images: ['/images/homepage/card-marga.jpg'],
  },
  alternates: {
    canonical: 'https://infobatak.id/marga',
  },
};

export default function MargaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
