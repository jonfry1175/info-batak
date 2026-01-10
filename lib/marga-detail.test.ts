import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import margaDetailData from '@/content/data/marga-detail.json';
import { getAllMarga, getAllMargaSlugs, getMargaDetailBySlug } from './data';
import { Marga, MargaDetail } from '@/types';

/**
 * **Feature: marga-detail-pages, Property 4: Data Schema Validity**
 * **Validates: Requirements 7.2, 7.6**
 *
 * For any marga detail object in marga-detail.json, it SHALL contain margaId and slug fields,
 * and the margaId SHALL reference a valid id in marga.json.
 */
describe('Property 4: Data Schema Validity', () => {
  const allMarga = getAllMarga();
  const allMargaDetails = margaDetailData as MargaDetail[];
  const margaIds = new Set(allMarga.map((marga) => marga.id));
  const margaSlugs = new Set(getAllMargaSlugs());
  const margaBySlug = new Map(allMarga.map((marga) => [marga.slug, marga]));

  it('should keep detail entries referencing valid marga ids and slugs', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allMargaDetails), (detail: MargaDetail) => {
        expect(typeof detail.margaId).toBe('string');
        expect(detail.margaId.length).toBeGreaterThan(0);
        expect(margaIds.has(detail.margaId)).toBe(true);

        expect(typeof detail.slug).toBe('string');
        expect(detail.slug.length).toBeGreaterThan(0);
        expect(margaSlugs.has(detail.slug)).toBe(true);

        const referencedMarga: Marga | undefined = margaBySlug.get(detail.slug);
        expect(referencedMarga?.id).toBe(detail.margaId);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should have unique slugs across detail data', () => {
    const detailSlugs = allMargaDetails.map((detail) => detail.slug);
    expect(new Set(detailSlugs).size).toBe(detailSlugs.length);
  });

  it('should resolve detail lookup by slug', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allMargaDetails), (detail: MargaDetail) => {
        const found = getMargaDetailBySlug(detail.slug);
        expect(found).toBeDefined();
        expect(found?.margaId).toBe(detail.margaId);
        expect(found?.slug).toBe(detail.slug);
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
