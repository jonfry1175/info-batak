import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllRumpun, getRumpunEnhancedBySlug } from '@/lib/data';
import { RumpunDetailClient } from './RumpunDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all rumpun
export async function generateStaticParams() {
  const rumpunList = getAllRumpun();
  return rumpunList.map((rumpun) => ({
    slug: rumpun.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rumpun = getRumpunEnhancedBySlug(slug);

  if (!rumpun) {
    return {
      title: 'Rumpun Tidak Ditemukan',
    };
  }

  const title = `Sejarah Batak ${rumpun.nama} - Asal Usul, Budaya & Tokoh`;
  const description =
    rumpun.sejarah?.ringkasan ||
    `Pelajari sejarah lengkap, budaya, adat istiadat, dan tokoh-tokoh terkenal dari rumpun Batak ${rumpun.nama}. ${rumpun.deskripsi}`;

  return {
    title,
    description,
    keywords: [
      `batak ${rumpun.nama.toLowerCase()}`,
      `sejarah batak ${rumpun.nama.toLowerCase()}`,
      `budaya ${rumpun.nama.toLowerCase()}`,
      `marga ${rumpun.nama.toLowerCase()}`,
      'suku batak',
      'sumatera utara',
    ],
    openGraph: {
      title,
      description,
      url: `https://infobatak.id/sejarah/${slug}`,
      images: rumpun.gambar ? [rumpun.gambar] : undefined,
    },
    alternates: {
      canonical: `https://infobatak.id/sejarah/${slug}`,
    },
  };
}

export default async function RumpunDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rumpun = getRumpunEnhancedBySlug(slug);

  if (!rumpun) {
    notFound();
  }

  return <RumpunDetailClient rumpun={rumpun} />;
}
