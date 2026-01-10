import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllRumpunEnhanced } from '@/lib/data';
import {
  getCategoryData,
  getNonEmptyCategories,
  getCategoryTitle,
} from './BudayaSection';
import { defaultBudayaCategories } from './CategoryTabs';
import type { RumpunBatakEnhanced, BudayaEnhanced, BudayaCategory } from '@/types';

/**
 * **Feature: rumpun-detail-enhancement, Property 5: Budaya Category Completeness**
 * **Validates: Requirements 3.1, 3.2**
 *
 * For any rumpun with budaya data, the rendered Section_Budaya SHALL display
 * all non-empty categories with their title and description.
 */
describe('Property 5: Budaya Category Completeness', () => {
  const allEnhancedRumpun = getAllRumpunEnhanced();

  it('should have budaya data for all enhanced rumpun', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allEnhancedRumpun),
        (rumpun: RumpunBatakEnhanced) => {
          expect(rumpun.budaya).toBeDefined();
          expect(typeof rumpun.budaya).toBe('object');
          expect(rumpun.budaya).not.toBeNull();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have ringkasan for all budaya data', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allEnhancedRumpun),
        (rumpun: RumpunBatakEnhanced) => {
          expect(typeof rumpun.budaya.ringkasan).toBe('string');
          expect(rumpun.budaya.ringkasan.length).toBeGreaterThan(0);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return correct category data for all valid category IDs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allEnhancedRumpun),
        fc.constantFrom(...defaultBudayaCategories.map((c) => c.id)),
        (rumpun: RumpunBatakEnhanced, categoryId: string) => {
          const categoryData = getCategoryData(rumpun.budaya, categoryId);

          // Category data should exist for all default categories
          expect(categoryData).not.toBeNull();
          expect(typeof categoryData).toBe('object');

          // Category should have deskripsi field
          expect(typeof categoryData!.deskripsi).toBe('string');

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have non-empty description for all categories in enhanced rumpun', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allEnhancedRumpun),
        (rumpun: RumpunBatakEnhanced) => {
          // All 5 categories should have non-empty descriptions
          const nonEmptyCategories = getNonEmptyCategories(rumpun.budaya);

          // At least some categories should have content
          expect(nonEmptyCategories.length).toBeGreaterThan(0);

          // Each non-empty category should have valid description
          nonEmptyCategories.forEach((categoryId) => {
            const categoryData = getCategoryData(rumpun.budaya, categoryId);
            expect(categoryData).not.toBeNull();
            expect(categoryData!.deskripsi.length).toBeGreaterThan(0);
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have valid title for all category IDs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...defaultBudayaCategories.map((c) => c.id)),
        (categoryId: string) => {
          const title = getCategoryTitle(categoryId);

          expect(typeof title).toBe('string');
          expect(title.length).toBeGreaterThan(0);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have all 5 default categories defined', () => {
    expect(defaultBudayaCategories).toHaveLength(5);

    const expectedCategories = [
      'sistemKekerabatan',
      'musikTarian',
      'pakaian',
      'rumahAdat',
      'upacaraAdat',
    ];

    expectedCategories.forEach((categoryId) => {
      const category = defaultBudayaCategories.find((c) => c.id === categoryId);
      expect(category).toBeDefined();
      expect(category!.title.length).toBeGreaterThan(0);
    });
  });

  it('should have jenis array for categories that have it', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allEnhancedRumpun),
        fc.constantFrom(...defaultBudayaCategories.map((c) => c.id)),
        (rumpun: RumpunBatakEnhanced, categoryId: string) => {
          const categoryData = getCategoryData(rumpun.budaya, categoryId);

          if (categoryData && categoryData.jenis) {
            // If jenis exists, it should be an array
            expect(Array.isArray(categoryData.jenis)).toBe(true);

            // Each item in jenis should be a non-empty string
            categoryData.jenis.forEach((item) => {
              expect(typeof item).toBe('string');
              expect(item.length).toBeGreaterThan(0);
            });
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return null for invalid category IDs', () => {
    const invalidCategoryIds = ['invalid', 'unknown', 'test', ''];

    invalidCategoryIds.forEach((invalidId) => {
      const categoryData = getCategoryData(allEnhancedRumpun[0].budaya, invalidId);
      expect(categoryData).toBeNull();
    });
  });

  it('should have gallery array if present', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allEnhancedRumpun),
        (rumpun: RumpunBatakEnhanced) => {
          if (rumpun.budaya.gallery) {
            expect(Array.isArray(rumpun.budaya.gallery)).toBe(true);

            rumpun.budaya.gallery.forEach((item) => {
              expect(typeof item.src).toBe('string');
              expect(typeof item.alt).toBe('string');
              expect(typeof item.category).toBe('string');
            });
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
