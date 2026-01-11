import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kesenian Batak - Gondang, Tortor, Ulos & Seni Tradisional',
  description:
    'Eksplorasi kesenian Batak: musik Gondang Sabangunan & Gordang Sambilan, tarian Tortor, kerajinan Ulos & Gorga, dan sastra lisan Umpasa. Tradisi seni yang penuh makna spiritual.',
  keywords: [
    'gondang batak',
    'tortor',
    'ulos',
    'gorga',
    'musik batak',
    'tarian batak',
    'kesenian batak',
    'sarune',
    'taganing',
  ],
  openGraph: {
    title: 'Kesenian Batak - Musik, Tari & Kerajinan Tradisional',
    description:
      'Gondang, Tortor, Ulos, Gorga - kekayaan seni tradisional Batak yang sarat makna dan filosofi.',
    url: 'https://infobatak.id/budaya/kesenian',
    images: ['/images/budaya/kesenian/hero-kesenian.png'],
  },
  alternates: {
    canonical: 'https://infobatak.id/budaya/kesenian',
  },
};

export default function KesenianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
