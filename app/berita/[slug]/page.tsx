import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBerita, getBeritaBySlug } from '@/lib/data';
import BeritaDetailClient from './BeritaDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allBerita = getAllBerita();
  return allBerita.map((berita) => ({
    slug: berita.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }

  return {
    title: `${berita.judul} | InfoBatak.id`,
    description: berita.ringkasan,
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan,
      images: [berita.gambar],
    },
  };
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);

  if (!berita) {
    notFound();
  }

  return <BeritaDetailClient berita={berita} />;
}
