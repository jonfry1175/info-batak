import { describe, it, expect } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import { TokohCard, getInitials, formatLifePeriod, hasRequiredFields } from './TokohCard';
import { getAllRumpunEnhanced } from '@/lib/data';
import type { EnhancedTokoh } from '@/types';

/**
 * **Feature: rumpun-detail-enhancement, Property 6: Tokoh Card Completeness**
 * **Validates: Requirements 4.1, 4.2**
 *
 * For any tokoh in the tokoh array, the rendered TokohCard SHALL display
 * nama, gelar, and either foto or placeholder avatar.
 */
describe('Property 6: Tokoh Card Completeness', () => {
  // Get all tokoh from all enhanced rumpun
  const allEnhancedRumpun = getAllRumpunEnhanced();
  const allTokoh: EnhancedTokoh[] = allEnhancedRumpun.flatMap((rumpun) => rumpun.tokoh);

  it('should have tokoh data to test', () => {
    expect(allTokoh.length).toBeGreaterThan(0);
  });

  it('should render nama for every tokoh', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allTokoh), (tokoh: EnhancedTokoh) => {
        render(<TokohCard tokoh={tokoh} />);

        // Check that tokoh nama is rendered
        const namaElement = screen.getByText(tokoh.nama);
        expect(namaElement).toBeInTheDocument();

        cleanup();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should render gelar for every tokoh', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allTokoh), (tokoh: EnhancedTokoh) => {
        render(<TokohCard tokoh={tokoh} />);

        // Check that tokoh gelar is rendered
        const gelarElement = screen.getByText(tokoh.gelar);
        expect(gelarElement).toBeInTheDocument();

        cleanup();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should render either foto or placeholder avatar for every tokoh', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allTokoh), (tokoh: EnhancedTokoh) => {
        const { container } = render(<TokohCard tokoh={tokoh} />);

        // Check for either an image or a placeholder avatar
        const imageElement = container.querySelector('img');
        const avatarPlaceholder = container.querySelector('.bg-accent\\/10');

        // At least one should exist
        const hasImageOrPlaceholder = imageElement !== null || avatarPlaceholder !== null;
        expect(hasImageOrPlaceholder).toBe(true);

        cleanup();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should render bidang badge when bidang is provided', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allTokoh.filter((t) => t.bidang)), (tokoh: EnhancedTokoh) => {
        render(<TokohCard tokoh={tokoh} />);

        // Check that bidang is rendered
        const bidangElement = screen.getByText(tokoh.bidang);
        expect(bidangElement).toBeInTheDocument();

        cleanup();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should render ringkasan for every tokoh', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allTokoh.filter((t) => t.ringkasan)),
        (tokoh: EnhancedTokoh) => {
          render(<TokohCard tokoh={tokoh} />);

          // Check that ringkasan is rendered (may be truncated)
          const ringkasanElement = screen.getByText((content) =>
            content.includes(tokoh.ringkasan.substring(0, 20))
          );
          expect(ringkasanElement).toBeInTheDocument();

          cleanup();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have expand button for every tokoh', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allTokoh), (tokoh: EnhancedTokoh) => {
        render(<TokohCard tokoh={tokoh} />);

        // Check that expand button exists
        const expandButton = screen.getByRole('button', { name: /lihat selengkapnya/i });
        expect(expandButton).toBeInTheDocument();

        cleanup();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should show biografi when expanded', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allTokoh.filter((t) => t.biografi)),
        (tokoh: EnhancedTokoh) => {
          render(<TokohCard tokoh={tokoh} />);

          // Click expand button
          const expandButton = screen.getByRole('button', { name: /lihat selengkapnya/i });
          fireEvent.click(expandButton);

          // Check that biografi is now visible
          const biografiElement = screen.getByText((content) =>
            content.includes(tokoh.biografi.substring(0, 30))
          );
          expect(biografiElement).toBeInTheDocument();

          cleanup();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should show pencapaian list when expanded', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allTokoh.filter((t) => t.pencapaian && t.pencapaian.length > 0)),
        (tokoh: EnhancedTokoh) => {
          const { container } = render(<TokohCard tokoh={tokoh} />);

          // Click expand button
          const expandButton = screen.getByRole('button', { name: /lihat selengkapnya/i });
          fireEvent.click(expandButton);

          // Check that the Pencapaian section header is visible
          const pencapaianHeader = screen.getByText('Pencapaian');
          expect(pencapaianHeader).toBeInTheDocument();

          // Check that the pencapaian list exists with correct number of items
          const pencapaianList = container.querySelectorAll('ul.space-y-2 li');
          expect(pencapaianList.length).toBe(tokoh.pencapaian.length);

          cleanup();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Unit tests for helper functions
 */
describe('TokohCard Helper Functions', () => {
  describe('getInitials', () => {
    it('should return correct initials for two-word names', () => {
      expect(getInitials('Raja Sisingamangaraja')).toBe('RS');
    });

    it('should return correct initials for single-word names', () => {
      expect(getInitials('Nommensen')).toBe('N');
    });

    it('should return correct initials for multi-word names', () => {
      expect(getInitials('Dr. Ingwer Ludwig Nommensen')).toBe('DI');
    });

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });

  describe('formatLifePeriod', () => {
    it('should format birth and death years correctly', () => {
      expect(formatLifePeriod(1849, 1907)).toBe('1849 - 1907');
    });

    it('should format birth year only', () => {
      expect(formatLifePeriod(1950, undefined)).toBe('1950 - sekarang');
    });

    it('should format death year only', () => {
      expect(formatLifePeriod(undefined, 1907)).toBe('? - 1907');
    });

    it('should return null when no years provided', () => {
      expect(formatLifePeriod(undefined, undefined)).toBeNull();
    });
  });

  describe('hasRequiredFields', () => {
    it('should return true when nama and gelar are present', () => {
      const tokoh: EnhancedTokoh = {
        nama: 'Test Name',
        gelar: 'Test Gelar',
        bidang: 'Test',
        ringkasan: 'Test',
        biografi: 'Test',
        pencapaian: [],
      };
      expect(hasRequiredFields(tokoh)).toBe(true);
    });

    it('should return false when nama is empty', () => {
      const tokoh: EnhancedTokoh = {
        nama: '',
        gelar: 'Test Gelar',
        bidang: 'Test',
        ringkasan: 'Test',
        biografi: 'Test',
        pencapaian: [],
      };
      expect(hasRequiredFields(tokoh)).toBe(false);
    });

    it('should return false when gelar is empty', () => {
      const tokoh: EnhancedTokoh = {
        nama: 'Test Name',
        gelar: '',
        bidang: 'Test',
        ringkasan: 'Test',
        biografi: 'Test',
        pencapaian: [],
      };
      expect(hasRequiredFields(tokoh)).toBe(false);
    });
  });
});

/**
 * Unit tests for life period display
 */
describe('TokohCard Life Period Display', () => {
  const allEnhancedRumpun = getAllRumpunEnhanced();
  const allTokoh: EnhancedTokoh[] = allEnhancedRumpun.flatMap((rumpun) => rumpun.tokoh);
  const tokohWithYears = allTokoh.filter((t) => t.tahunLahir || t.tahunWafat);

  it('should display life period when years are available', () => {
    tokohWithYears.forEach((tokoh) => {
      render(<TokohCard tokoh={tokoh} />);

      const lifePeriod = formatLifePeriod(tokoh.tahunLahir, tokoh.tahunWafat);
      if (lifePeriod) {
        const periodElement = screen.getByText(lifePeriod);
        expect(periodElement).toBeInTheDocument();
      }

      cleanup();
    });
  });
});
