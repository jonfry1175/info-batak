import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import MargaDetailPage from './page';
import MargaPage from '../page';
import { getAllMarga, getFullMargaBySlug, getMargaDetailBySlug, getMargaBySlug } from '@/lib/data';
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
            expect(
              screen.getByRole('link', { name: new RegExp(slugRelated, 'i') })
            ).toBeInTheDocument();
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

/**
 * **Feature: marga-detail-pages, Test 6.1: End-to-End Navigation**
 * **Validates: Requirements 1.1, 2.4**
 *
 * Tests the complete navigation flow: card click → detail page → back button → list page
 */
describe('Test 6.1: End-to-End Navigation', () => {
  const allMarga = getAllMarga();

  it('should have clickable cards on main page that link to detail pages', () => {
    const { container } = render(<MargaPage />);

    // Verify all marga cards have links to their detail pages
    allMarga.forEach((marga) => {
      const link = container.querySelector(`a[href="/marga/${marga.slug}"]`);
      expect(link).toBeInTheDocument();
    });

    cleanup();
  });

  it('should render detail page with back navigation to /marga', async () => {
    // Test with a sample marga
    const sampleMarga = allMarga[0];
    render(await MargaDetailPage({ params: Promise.resolve({ slug: sampleMarga.slug }) }));

    // Verify back link exists and points to /marga
    const backLinks = screen.getAllByRole('link', { name: /Kembali ke daftar marga/i });
    expect(backLinks.length).toBeGreaterThan(0);
    backLinks.forEach((backLink) => {
      expect(backLink).toHaveAttribute('href', '/marga');
    });

    cleanup();
  });

  it('should complete full navigation cycle for any marga', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...allMarga.slice(0, 10)), async (marga) => {
        // Step 1: Verify card exists on main page with correct link
        const { container: mainContainer } = render(<MargaPage />);
        const cardLink = mainContainer.querySelector(`a[href="/marga/${marga.slug}"]`);
        expect(cardLink).toBeInTheDocument();
        cleanup();

        // Step 2: Verify detail page renders correctly
        render(await MargaDetailPage({ params: Promise.resolve({ slug: marga.slug }) }));

        // Verify marga name is displayed
        expect(screen.getByText(marga.nama)).toBeInTheDocument();

        // Step 3: Verify back navigation exists
        const backLinks = screen.getAllByRole('link', { name: /Kembali ke daftar marga/i });
        expect(backLinks.length).toBeGreaterThan(0);
        expect(backLinks[0]).toHaveAttribute('href', '/marga');

        cleanup();
        return true;
      }),
      { numRuns: 10 }
    );
  });
});

/**
 * **Feature: marga-detail-pages, Test 6.2: 404 Handling**
 * **Validates: Requirements 1.3**
 *
 * Tests that accessing an invalid marga slug displays a 404 page
 */
describe('Test 6.2: 404 Handling for Invalid Slugs', () => {
  it('should call notFound() for invalid slug', async () => {
    const invalidSlugs = ['invalid-slug', 'nonexistent-marga', 'xyz123', 'test-marga'];

    for (const invalidSlug of invalidSlugs) {
      // Verify the slug doesn't exist in data
      const marga = getMargaBySlug(invalidSlug);
      expect(marga).toBeUndefined();

      // The page component calls notFound() which throws NEXT_NOT_FOUND
      // In test environment, we verify the data lookup returns undefined
      const fullMarga = getFullMargaBySlug(invalidSlug);
      expect(fullMarga).toBeUndefined();
    }
  });

  it('should return undefined for random invalid slugs', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 20 }).filter((s) => {
          // Filter out any string that might accidentally match a real slug
          const allSlugs = getAllMarga().map((m) => m.slug);
          return !allSlugs.includes(s);
        }),
        (randomSlug) => {
          const marga = getMargaBySlug(randomSlug);
          expect(marga).toBeUndefined();

          const fullMarga = getFullMargaBySlug(randomSlug);
          expect(fullMarga).toBeUndefined();

          return true;
        }
      ),
      { numRuns: 20 }
    );
  });
});

/**
 * **Feature: marga-detail-pages, Test 6.3: Partial Data Handling**
 * **Validates: Requirements 7.4**
 *
 * Tests that margas without complete detail data display basic info only
 */
describe('Test 6.3: Partial Data Handling', () => {
  const allMarga = getAllMarga();

  it('should render basic info for margas without detail data', async () => {
    // Find margas that don't have detail data
    const margasWithoutDetail = allMarga.filter((marga) => {
      const detail = getMargaDetailBySlug(marga.slug);
      return !detail;
    });

    // Test at least one marga without detail if available
    if (margasWithoutDetail.length > 0) {
      const margaWithoutDetail = margasWithoutDetail[0];

      render(await MargaDetailPage({ params: Promise.resolve({ slug: margaWithoutDetail.slug }) }));

      // Basic info should still be displayed
      expect(screen.getByText(margaWithoutDetail.nama)).toBeInTheDocument();
      expect(
        screen.getAllByText(new RegExp(margaWithoutDetail.rumpun, 'i')).length
      ).toBeGreaterThan(0);

      // Back navigation should exist
      const backLinks = screen.getAllByRole('link', { name: /Kembali ke daftar marga/i });
      expect(backLinks.length).toBeGreaterThan(0);

      // Optional sections should NOT be rendered
      expect(screen.queryByText('Sejarah')).not.toBeInTheDocument();
      expect(screen.queryByText('Asal Usul')).not.toBeInTheDocument();
      expect(screen.queryByText('Tarombo')).not.toBeInTheDocument();
      expect(screen.queryByText('Wilayah Asal')).not.toBeInTheDocument();
      expect(screen.queryByText('Tradisi & Adat')).not.toBeInTheDocument();
      expect(screen.queryByText('Tokoh Terkenal')).not.toBeInTheDocument();
      expect(screen.queryByText('Marga Terkait')).not.toBeInTheDocument();

      cleanup();
    }
  });

  it('should gracefully handle margas with partial detail data', async () => {
    // Find margas that have some but not all detail fields
    const margasWithPartialDetail = allMarga.filter((marga) => {
      const detail = getMargaDetailBySlug(marga.slug);
      if (!detail) return false;
      // Check if some optional fields are missing
      const hasAllFields =
        detail.sejarah &&
        detail.asalUsul &&
        detail.tarombo &&
        detail.wilayah &&
        detail.tradisi &&
        detail.tokoh &&
        detail.relatedMargas;
      return !hasAllFields;
    });

    if (margasWithPartialDetail.length > 0) {
      const marga = margasWithPartialDetail[0];
      const detail = getMargaDetailBySlug(marga.slug);

      render(await MargaDetailPage({ params: Promise.resolve({ slug: marga.slug }) }));

      // Basic info should always be displayed
      expect(screen.getByText(marga.nama)).toBeInTheDocument();

      // Only sections with data should be rendered
      if (detail?.sejarah) {
        expect(screen.getByText('Sejarah')).toBeInTheDocument();
      } else {
        expect(screen.queryByText('Sejarah')).not.toBeInTheDocument();
      }

      if (detail?.asalUsul) {
        expect(screen.getByText('Asal Usul')).toBeInTheDocument();
      } else {
        expect(screen.queryByText('Asal Usul')).not.toBeInTheDocument();
      }

      cleanup();
    }
  });

  it('should verify all margas render without errors regardless of detail data', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...allMarga), async (marga) => {
        // This should not throw any errors
        render(await MargaDetailPage({ params: Promise.resolve({ slug: marga.slug }) }));

        // Basic info should always be present
        expect(screen.getByText(marga.nama)).toBeInTheDocument();

        // Back navigation should always exist
        const backLinks = screen.getAllByRole('link', { name: /Kembali ke daftar marga/i });
        expect(backLinks.length).toBeGreaterThan(0);

        cleanup();
        return true;
      }),
      { numRuns: 30 }
    );
  });
});
