import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import MargaPage from './page';
import { getAllMarga } from '@/lib/data';
import { Marga } from '@/types';

/**
 * **Feature: marga-detail-pages, Property 1: Navigation from Card to Detail**
 * **Validates: Requirements 1.1**
 *
 * For any marga card rendered on the main marga page, clicking it SHALL navigate
 * to `/marga/{slug}` where slug matches the marga's slug property.
 */
describe('Property 1: Navigation from Card to Detail', () => {
  const allMarga = getAllMarga();

  it('should render clickable link for each marga card pointing to its detail route', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allMarga), (marga: Marga) => {
        const { container } = render(<MargaPage />);

        // Each marga card is wrapped with a Link to /marga/{slug}
        const link = container.querySelector(`a[href="/marga/${marga.slug}"]`);
        expect(link).toBeInTheDocument();

        // Ensure slug consistency between data and rendered link
        expect(marga.slug).toBeTruthy();
        expect(marga.slug.length).toBeGreaterThan(0);

        cleanup();
        return true;
      }),
      { numRuns: 50 }
    );
  });

  it('should render correct number of marga cards', () => {
    const { container } = render(<MargaPage />);
    const links = container.querySelectorAll('a[href^="/marga/"]');
    expect(links.length).toBe(allMarga.length);
    cleanup();
  });
});
