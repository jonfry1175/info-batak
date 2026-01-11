import { MetadataRoute } from 'next';
import { getAllMarga, getAllBerita, getAllRumpun } from '@/lib/data';

// Required for static export
export const dynamic = 'force-static';

const BASE_URL = 'https://infobatak.id';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/sejarah`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/marga`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/budaya`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/adat-istiadat`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/aksara-batak`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/arsitektur`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/bahasa`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/kesenian`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/kuliner`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/budaya/pakaian-adat`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/berita`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/tentang`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    // Dynamic rumpun/sejarah pages
    const rumpunPages: MetadataRoute.Sitemap = getAllRumpun().map((rumpun) => ({
        url: `${BASE_URL}/sejarah/${rumpun.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Dynamic marga pages
    const margaPages: MetadataRoute.Sitemap = getAllMarga().map((marga) => ({
        url: `${BASE_URL}/marga/${marga.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic berita pages
    const beritaPages: MetadataRoute.Sitemap = getAllBerita().map((berita) => ({
        url: `${BASE_URL}/berita/${berita.slug}`,
        lastModified: berita.tanggal,
        changeFrequency: 'yearly',
        priority: 0.6,
    }));

    return [...staticPages, ...rumpunPages, ...margaPages, ...beritaPages];
}
