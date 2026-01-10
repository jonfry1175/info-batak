import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllRumpun, getRumpunBySlug } from '@/lib/data';
import { ChevronLeft } from 'lucide-react';

export async function generateStaticParams() {
  const rumpunList = getAllRumpun();
  return rumpunList.map((rumpun) => ({
    slug: rumpun.slug,
  }));
}

export default async function RumpunDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rumpun = getRumpunBySlug(slug);

  if (!rumpun) {
    notFound();
  }

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/sejarah"
          className="text-accent hover:text-accent/80 mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Kembali ke Sejarah</span>
        </Link>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={rumpun.gambar}
              alt={rumpun.nama}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-accent mb-4 text-4xl font-bold md:text-5xl">{rumpun.nama}</h1>
          <p className="text-foreground/70 text-lg">{rumpun.deskripsi}</p>
        </section>

        {/* Wilayah Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Wilayah</h2>
          <p className="text-foreground/80 leading-relaxed">{rumpun.wilayah}</p>
        </section>

        {/* Sejarah Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sejarah</h2>
          <div className="prose prose-lg text-foreground/80 max-w-none leading-relaxed">
            <p>{rumpun.sejarah}</p>
          </div>
        </section>

        {/* Budaya Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Budaya dan Tradisi</h2>
          <div className="prose prose-lg text-foreground/80 max-w-none leading-relaxed">
            <p>{rumpun.budaya}</p>
          </div>
        </section>

        {/* Tokoh Penting Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tokoh Penting</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rumpun.tokoh.map((tokoh, index) => (
              <div
                key={index}
                className="bg-background border-foreground/10 rounded-lg border p-6 shadow-sm"
              >
                <h3 className="text-accent mb-2 text-xl font-bold">{tokoh.nama}</h3>
                <p className="text-foreground/60 mb-3 text-sm font-medium">{tokoh.gelar}</p>
                <p className="text-foreground/80 leading-relaxed">{tokoh.deskripsi}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
