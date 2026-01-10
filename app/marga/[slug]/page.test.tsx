import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import MargaDetailPage from './page';
import { getAllMarga, getFullMargaBySlug, getMargaDetailBySlug } from '@/lib/data';
import { Marga } from '@/types';

/**
 * **Feature: marga-detail-pages, Property 2: Basic Info Rendering Completeness**
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
 *
 * For any marga slug, the detail page SHALL render the name, rumpun badge, hero image,
 * and back navigation to the main marga list.
 */
describe('Property 2: Basic Info Rendering Completeness', () => {
  const allMarga = getAllMarga();

  it('should render hero with title, rumpun badge, imagery, and back link for any marga', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...allMarga), async (marga: Marga) => {
        const expected = getFullMargaBySlug(marga.slug);
        render(await MargaDetailPage({ params: Promise.resolve({ slug: marga.slug }) }));

        const title = screen.getByText(marga.nama);
        expect(title).toBeInTheDocument();

        const rumpunLabel = expected?.rumpun ?? marga.rumpun;
        const rumpunBadges = screen.getAllByText(new RegExp(`^${rumpunLabel}$`, 'i'));
        expect(rumpunBadges.length).toBeGreaterThan(0);

        const heroImage = screen.getByAltText(`Ilustrasi marga ${marga.nama}`);
        expect(heroImage).toBeInTheDocument();

        const backLinks = screen.getAllByRole('link', { name: /Kembali ke daftar marga/i });
        expect(backLinks.length).toBeGreaterThan(0);
        backLinks.forEach((backLink) => {
          expect(backLink).toHaveAttribute('href', '/marga');
        });

        cleanup();
        return true;
      }),
      { numRuns: 50 }
    );
  });
});

/**
 * **Feature: marga-detail-pages, Property 3: Conditional Section Rendering**
 * **Validates: Requirements 3.1, 3.2, 4.1, 4.2, 4.3, 5.1, 5.2, 5.4, 6.1, 6.2, 6.3, 7.4**
 *
 * For any marga slug, sections SHALL render only when corresponding data exists,
 * supporting partial detail data gracefully.
 */
describe('Property 3: Conditional Section Rendering', () => {
  const allMarga = getAllMarga();

  it('should render sections based on available detail data', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...allMarga), async (marga: Marga) => {
        render(await MargaDetailPage({ params: Promise.resolve({ slug: marga.slug }) }));

        const detail = getMargaDetailBySlug(marga.slug);

        if (detail?.sejarah) {
          expect(screen.getByText('Sejarah')).toBeInTheDocument();
          expect(screen.getByText(detail.sejarah)).toBeInTheDocument();
        } else {
          expect(screen.queryByText('Sejarah')).not.toBeInTheDocument();
        }

        if (detail?.asalUsul) {
          expect(screen.getByText('Asal Usul')).toBeInTheDocument();
          expect(screen.getByText(detail.asalUsul)).toBeInTheDocument();
        } else {
          expect(screen.queryByText('Asal Usul')).not.toBeInTheDocument();
        }

        if (detail?.tarombo) {
          expect(screen.getByText('Tarombo')).toBeInTheDocument();

          if (detail.tarombo.ancestors?.length) {
            detail.tarombo.ancestors.forEach((ancestor) => {
              expect(screen.getByText(ancestor.nama)).toBeInTheDocument();
            });
          }

          if (detail.tarombo.subMargas?.length) {
            detail.tarombo.subMargas.forEach((sub) => {
              expect(screen.getByText(sub.nama)).toBeInTheDocument();
            });
          }
        } else {
          expect(screen.queryByText('Tarombo')).not.toBeInTheDocument();
        }

        if (detail?.wilayah) {
          expect(screen.getByText(detail.wilayah.nama)).toBeInTheDocument();
          expect(screen.getByText('Wilayah Asal')).toBeInTheDocument();
          const map = screen.getByTitle(`Peta wilayah ${detail.wilayah.nama}`);
          expect(map).toBeInTheDocument();
        } else {
          expect(screen.queryByText('Wilayah Asal')).not.toBeInTheDocument();
        }

        if (detail?.tradisi?.length) {
          expect(screen.getByText('Tradisi & Adat')).toBeInTheDocument();
          detail.tradisi.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
          });
        } else {
          expect(screen.queryByText('Tradisi & Adat')).not.toBeInTheDocument();
        }

        if (detail?.tokoh?.length) {
          expect(screen.getByText('Tokoh Terkenal')).toBeInTheDocument();
          detail.tokoh.forEach((tokoh) => {
            expect(screen.getByText(tokoh.nama)).toBeInTheDocument();
          });
        } else {
          expect(screen.queryByText('Tokoh Terkenal')).not.toBeInTheDocument();
        }

        if (detail?.relatedMargas?.length) {
          expect(screen.getByText('Marga Terkait')).toBeInTheDocument();
          detail.relatedMargas.forEach((slugRelated) => {
            expect(screen.getByRole('link', { name: new RegExp(slugRelated, 'i') })).toBeInTheDocument();
          });
        } else {
          expect(screen.queryByText('Marga Terkait')).not.toBeInTheDocument();
        }

        cleanup();
        return true;
      }),
      { numRuns: 50 }
    );
  });
});
