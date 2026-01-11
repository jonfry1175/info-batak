import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

const BASE_URL = 'https://infobatak.id';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'InfoBatak.id - Portal Budaya Batak Terlengkap',
    template: '%s | InfoBatak.id',
  },
  description:
    'Portal informasi digital terlengkap tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak. Pelajari kekayaan budaya Batak dari 6 rumpun: Toba, Karo, Simalungun, Pakpak, Angkola, dan Mandailing.',
  keywords: [
    'budaya batak',
    'marga batak',
    'sejarah batak',
    'adat istiadat batak',
    'aksara batak',
    'dalihan na tolu',
    'suku batak',
    'batak toba',
    'batak karo',
    'batak simalungun',
    'batak pakpak',
    'batak angkola',
    'batak mandailing',
    'ulos batak',
    'gondang batak',
    'tortor',
    'danau toba',
    'sumatera utara',
  ],
  authors: [{ name: 'InfoBatak.id', url: BASE_URL }],
  creator: 'InfoBatak.id',
  publisher: 'InfoBatak.id',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    siteName: 'InfoBatak.id',
    title: 'InfoBatak.id - Portal Budaya Batak Terlengkap',
    description:
      'Portal informasi digital terlengkap tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak.',
    images: [
      {
        url: '/images/homepage/hero-lake-toba.jpg',
        width: 1200,
        height: 630,
        alt: 'InfoBatak.id - Portal Budaya Batak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfoBatak.id - Portal Budaya Batak Terlengkap',
    description:
      'Portal informasi digital terlengkap tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak.',
    images: ['/images/homepage/hero-lake-toba.jpg'],
    creator: '@jonfry1175',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'id-ID': BASE_URL,
    },
  },
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd
          data={{
            name: 'InfoBatak.id',
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            description:
              'Portal digital yang melestarikan dan mengedukasi tentang budaya Batak',
            sameAs: ['https://instagram.com/jonfry1175'],
          }}
        />
        <WebSiteJsonLd
          data={{
            name: 'InfoBatak.id',
            url: BASE_URL,
            description:
              'Portal informasi digital tentang sejarah, budaya, adat, aksara, dan sistem marga Batak',
            searchUrl: `${BASE_URL}/marga`,
          }}
        />
      </head>
      <body className="relative flex min-h-screen flex-col antialiased">
        {/* Global Background Pattern */}
        <div className="bg-gorga-pattern pointer-events-none fixed inset-0 z-[-1] opacity-[0.03]" />
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
