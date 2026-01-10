import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getAllMargaSlugs, getFullMargaBySlug, getMargaBySlug } from '@/lib/data';
import { MargaDetail } from '@/types';

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllMargaSlugs().map((slug) => ({ slug }));
}

export default async function MargaDetailPage({
  params
}: {
  params: Promise<Params> | Params;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const marga = getFullMargaBySlug(slug);

  if (!marga) {
    notFound();
  }

  const detail = marga as MargaDetail & typeof marga;
  const heroImage = '/images/homepage/card-marga.jpg';

  const relatedMargas = (detail.relatedMargas || []).map((relatedSlug) => {
    const related = getMargaBySlug(relatedSlug);
    return { slug: relatedSlug, nama: related?.nama ?? relatedSlug };
  });

  const mapEmbedSrc =
    detail.wilayah &&
    `https://www.google.com/maps?q=${detail.wilayah.latitude},${detail.wilayah.longitude}&z=10&output=embed`;

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* Hero Section */}
        <section className="overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-r from-accent/10 via-foreground/5 to-background shadow-lg">
          <div className="grid gap-0 md:grid-cols-[1.2fr,1fr] md:gap-8">
            <div className="p-8 md:p-10">
              <div className="mb-4 flex items-center gap-3">
                <Badge variant="secondary">{marga.rumpun}</Badge>
                {detail.updatedAt && (
                  <span className="text-foreground/60 text-xs">
                    Diperbarui {new Date(detail.updatedAt).toLocaleDateString('id-ID')}
                  </span>
                )}
              </div>
              <h1 className="text-accent mb-3 text-4xl font-extrabold md:text-5xl">{marga.nama}</h1>
              {marga.deskripsi && (
                <p className="text-foreground/80 text-lg leading-relaxed md:text-xl">
                  {marga.deskripsi}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-foreground/10 px-4 py-2 text-sm text-foreground/80">
                  Identitas marga Batak
                </span>
                <span className="rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
                  Rumpun {marga.rumpun}
                </span>
              </div>
            </div>
            <div className="relative h-64 w-full md:h-full">
              <Image
                src={heroImage}
                alt={`Ilustrasi marga ${marga.nama}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* Sejarah & Asal Usul */}
        <div className="grid gap-6 md:grid-cols-2">
          {detail.sejarah && (
            <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 shadow-sm">
              <h2 className="text-accent mb-3 text-2xl font-bold">Sejarah</h2>
              <p className="text-foreground/80 leading-relaxed">{detail.sejarah}</p>
            </section>
          )}
          {detail.asalUsul && (
            <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 shadow-sm">
              <h2 className="text-accent mb-3 text-2xl font-bold">Asal Usul</h2>
              <p className="text-foreground/80 leading-relaxed">{detail.asalUsul}</p>
            </section>
          )}
        </div>

        {/* Tarombo */}
        {detail.tarombo && (
          <section className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-foreground/60 text-sm uppercase tracking-wide">Silsilah</p>
                <h2 className="text-accent text-2xl font-bold">Tarombo</h2>
              </div>
              <Badge variant="outline">Patrilineal</Badge>
            </div>
            {detail.tarombo.description && (
              <p className="text-foreground/80 mb-4 leading-relaxed">{detail.tarombo.description}</p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {detail.tarombo.ancestors && detail.tarombo.ancestors.length > 0 && (
                <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                  <h3 className="text-foreground mb-3 text-lg font-semibold">Leluhur Utama</h3>
                  <ul className="space-y-3">
                    {detail.tarombo.ancestors.map((ancestor) => (
                      <li
                        key={ancestor.nama}
                        className="rounded-md border border-foreground/10 bg-background p-3"
                      >
                        <p className="font-semibold">{ancestor.nama}</p>
                        {ancestor.gelar && (
                          <p className="text-foreground/70 text-sm">{ancestor.gelar}</p>
                        )}
                        {ancestor.deskripsi && (
                          <p className="text-foreground/70 text-sm">{ancestor.deskripsi}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.tarombo.subMargas && detail.tarombo.subMargas.length > 0 && (
                <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                  <h3 className="text-foreground mb-3 text-lg font-semibold">Sub-marga</h3>
                  <ul className="space-y-3">
                    {detail.tarombo.subMargas.map((sub) => (
                      <li
                        key={sub.nama}
                        className="rounded-md border border-foreground/10 bg-background p-3"
                      >
                        <p className="font-semibold">{sub.nama}</p>
                        {sub.deskripsi && (
                          <p className="text-foreground/70 text-sm">{sub.deskripsi}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Wilayah */}
        {detail.wilayah && (
          <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-foreground/60 text-sm uppercase tracking-wide">Wilayah Asal</p>
                <h2 className="text-accent text-2xl font-bold">{detail.wilayah.nama}</h2>
              </div>
              <Badge variant="secondary">Geo-heritage</Badge>
            </div>
            <p className="text-foreground/80 mb-4 leading-relaxed">{detail.wilayah.deskripsi}</p>

            <div className="grid gap-4 md:grid-cols-[1.3fr,1fr]">
              {mapEmbedSrc && (
                <div className="overflow-hidden rounded-lg border border-foreground/10 bg-background">
                  <iframe
                    title={`Peta wilayah ${detail.wilayah.nama}`}
                    src={mapEmbedSrc}
                    className="h-72 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
              <div className="grid gap-3 rounded-lg border border-foreground/10 bg-background p-4 text-sm text-foreground/80">
                <div className="flex items-center justify-between">
                  <span>Provinsi</span>
                  <span className="font-semibold">{detail.wilayah.provinsi ?? 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kabupaten</span>
                  <span className="font-semibold">{detail.wilayah.kabupaten ?? 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Koordinat</span>
                  <span className="font-semibold">
                    {detail.wilayah.latitude}, {detail.wilayah.longitude}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tradisi */}
        {detail.tradisi && detail.tradisi.length > 0 && (
          <section className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm">
            <h2 className="text-accent mb-4 text-2xl font-bold">Tradisi &amp; Adat</h2>
            <ul className="space-y-3">
              {detail.tradisi.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-foreground/10 bg-foreground/5 p-4 text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tokoh */}
        {detail.tokoh && detail.tokoh.length > 0 && (
          <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-accent text-2xl font-bold">Tokoh Terkenal</h2>
              <Badge variant="outline">Figur</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {detail.tokoh.map((tokoh) => (
                <div
                  key={tokoh.nama}
                  className="rounded-lg border border-foreground/10 bg-background p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{tokoh.nama}</p>
                      {tokoh.gelar && <p className="text-foreground/70 text-sm">{tokoh.gelar}</p>}
                    </div>
                    {tokoh.bidang && (
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                        {tokoh.bidang}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground/80 mt-2 text-sm leading-relaxed">
                    {tokoh.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Margas */}
        {relatedMargas.length > 0 && (
          <section className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-accent text-2xl font-bold">Marga Terkait</h2>
              <Badge variant="outline">Koneksi</Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              {relatedMargas.map((related) => (
                <Link
                  key={related.slug}
                  href={`/marga/${related.slug}`}
                  className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {related.nama}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Navigation */}
        <div className="flex justify-center">
          <Link
            href="/marga"
            className="rounded-full border border-foreground/20 bg-foreground/5 px-5 py-3 text-sm font-semibold text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Kembali ke daftar marga
          </Link>
        </div>
      </div>
    </div>
  );
}
