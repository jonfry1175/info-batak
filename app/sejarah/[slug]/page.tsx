import { notFound } from 'next/navigation';
import { getAllRumpun, getRumpunEnhancedBySlug } from '@/lib/data';
import { RumpunDetailClient } from './RumpunDetailClient';

// Generate static params for all rumpun
export async function generateStaticParams() {
  const rumpunList = getAllRumpun();
  return rumpunList.map((rumpun) => ({
    slug: rumpun.slug,
  }));
}

export default async function RumpunDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rumpun = getRumpunEnhancedBySlug(slug);

  if (!rumpun) {
    notFound();
  }

  return <RumpunDetailClient rumpun={rumpun} />;
}
