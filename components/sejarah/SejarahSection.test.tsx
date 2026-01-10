import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { hasSubSections, getAvailableSubSections } from './SejarahSection';
import { getAllRumpunEnhanced } from '@/lib/data';
import type { SejarahEnhanced, RumpunBatakEnhanced } from '@/types';

/**
 * **Feature: rumpun-detail-enhancement, Property 4: Sejarah Section Structure**
 * **Validates: Requirements 2.1**
 *
 * For any rumpun with sejarah data, the rendered Section_Sejarah SHALL contain
 * the ringkasan and at least one sub-section (asalUsul, kerajaan, perlawananKolonial, or eraModern).
 */
describe('Property 4: Sejarah Section Structure', () => {
  const allEnhancedRumpun = getAllRumpunEnhanced();

  it('should have ringkasan for every enhanced rumpun sejarah', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allEnhancedRumpun), (rumpun: RumpunBatakEnhanced) => {
        // Every sejarah must have a non-empty ringkasan
        expect(typeof rumpun.sejarah.ringkasan).toBe('string');
        expect(rumpun.sejarah.ringkasan.length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should have at least one sub-section for every enhanced rumpun sejarah', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allEnhancedRumpun), (rumpun: RumpunBatakEnhanced) => {
        // Every sejarah must have at least one sub-section
        const hasAtLeastOneSubSection = hasSubSections(rumpun.sejarah);
        expect(hasAtLeastOneSubSection).toBe(true);

        // Verify using getAvailableSubSections
        const availableSections = getAvailableSubSections(rumpun.sejarah);
        expect(availableSections.length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should have asalUsul as a required sub-section for every enhanced rumpun', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allEnhancedRumpun), (rumpun: RumpunBatakEnhanced) => {
        // asalUsul is a required field in the enhanced format
        expect(typeof rumpun.sejarah.asalUsul).toBe('string');
        expect(rumpun.sejarah.asalUsul.length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should correctly identify available sub-sections', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allEnhancedRumpun), (rumpun: RumpunBatakEnhanced) => {
        const availableSections = getAvailableSubSections(rumpun.sejarah);

        // Verify each reported section actually has content
        availableSections.forEach((sectionKey) => {
          const content = rumpun.sejarah[sectionKey as keyof SejarahEnhanced];
          expect(content).toBeTruthy();
          if (typeof content === 'string') {
            expect(content.length).toBeGreaterThan(0);
          }
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should have hasSubSections return true when any sub-section exists', () => {
    // Test with generated sejarah objects
    fc.assert(
      fc.property(
        fc.record({
          ringkasan: fc.string({ minLength: 1 }),
          asalUsul: fc.string({ minLength: 1 }),
          kerajaan: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
          perlawananKolonial: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
          eraModern: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
          timeline: fc.constant([]),
          images: fc.constant(undefined),
        }),
        (sejarah) => {
          // Since asalUsul is always present and non-empty, hasSubSections should return true
          expect(hasSubSections(sejarah as SejarahEnhanced)).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have hasSubSections return false when no sub-sections exist', () => {
    const emptySejarah: SejarahEnhanced = {
      ringkasan: 'Some ringkasan',
      asalUsul: '', // Empty string
      kerajaan: undefined,
      perlawananKolonial: undefined,
      eraModern: undefined,
      timeline: [],
      images: undefined,
    };

    expect(hasSubSections(emptySejarah)).toBe(false);
    expect(getAvailableSubSections(emptySejarah)).toHaveLength(0);
  });

  it('should correctly count available sub-sections', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allEnhancedRumpun), (rumpun: RumpunBatakEnhanced) => {
        const availableSections = getAvailableSubSections(rumpun.sejarah);

        // Count manually
        let manualCount = 0;
        if (rumpun.sejarah.asalUsul) manualCount++;
        if (rumpun.sejarah.kerajaan) manualCount++;
        if (rumpun.sejarah.perlawananKolonial) manualCount++;
        if (rumpun.sejarah.eraModern) manualCount++;

        expect(availableSections.length).toBe(manualCount);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
