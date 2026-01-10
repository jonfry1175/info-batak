import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import RumpunDetailPage from './page';
import { getAllRumpun } from '@/lib/data';
import { RumpunBatak } from '@/types';

/**
 * **Feature: rumpun-batak-pages, Property 3: Detail Page Structure**
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.5**
 *
 * For any valid rumpun slug, the detail page SHALL display the rumpun name as title,
 * hero image, sejarah section, budaya section, and back navigation link.
 */
describe('Property 3: Detail Page Structure', () => {
    const allRumpun = getAllRumpun();

    it('should display all required sections for every rumpun', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.constantFrom(...allRumpun),
                async (rumpun: RumpunBatak) => {
                    render(await RumpunDetailPage({ params: Promise.resolve({ slug: rumpun.slug }) }));

                    // Requirement 3.1: Page title with rumpun name
                    const titleElement = screen.getByText(rumpun.nama);
                    expect(titleElement).toBeInTheDocument();

                    // Requirement 3.2: Hero image
                    const heroImage = screen.getByAltText(rumpun.nama);
                    expect(heroImage).toBeInTheDocument();

                    // Requirement 3.3: Sejarah section
                    const sejarahHeading = screen.getByText('Sejarah');
                    expect(sejarahHeading).toBeInTheDocument();
                    const sejarahContent = screen.getByText(rumpun.sejarah);
                    expect(sejarahContent).toBeInTheDocument();

                    // Requirement 3.3: Budaya section
                    const budayaHeading = screen.getByText('Budaya dan Tradisi');
                    expect(budayaHeading).toBeInTheDocument();
                    const budayaContent = screen.getByText(rumpun.budaya);
                    expect(budayaContent).toBeInTheDocument();

                    // Requirement 3.5: Back navigation
                    const backLink = screen.getByText('Kembali ke Sejarah');
                    expect(backLink).toBeInTheDocument();
                    expect(backLink.closest('a')).toHaveAttribute('href', '/sejarah');

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should display wilayah section for every rumpun', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.constantFrom(...allRumpun),
                async (rumpun: RumpunBatak) => {
                    render(await RumpunDetailPage({ params: Promise.resolve({ slug: rumpun.slug }) }));

                    const wilayahHeading = screen.getByText('Wilayah');
                    expect(wilayahHeading).toBeInTheDocument();

                    const wilayahContent = screen.getByText(rumpun.wilayah);
                    expect(wilayahContent).toBeInTheDocument();

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should display description for every rumpun', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.constantFrom(...allRumpun),
                async (rumpun: RumpunBatak) => {
                    render(await RumpunDetailPage({ params: Promise.resolve({ slug: rumpun.slug }) }));

                    const descriptionElement = screen.getByText(rumpun.deskripsi);
                    expect(descriptionElement).toBeInTheDocument();

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * **Feature: rumpun-batak-pages, Property 4: Tokoh Display Correctness**
 * **Validates: Requirements 3.4, 5.2, 5.3**
 *
 * For any rumpun with tokoh data, the detail page SHALL display each tokoh
 * with nama, gelar, and deskripsi fields.
 */
describe('Property 4: Tokoh Display Correctness', () => {
    const allRumpun = getAllRumpun();

    it('should display tokoh section heading for every rumpun', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.constantFrom(...allRumpun),
                async (rumpun: RumpunBatak) => {
                    render(await RumpunDetailPage({ params: Promise.resolve({ slug: rumpun.slug }) }));

                    // Requirement 5.2: Tokoh section exists
                    const tokohHeading = screen.getByText('Tokoh Penting');
                    expect(tokohHeading).toBeInTheDocument();

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should display all tokoh with nama, gelar, and deskripsi for every rumpun', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.constantFrom(...allRumpun),
                async (rumpun: RumpunBatak) => {
                    render(await RumpunDetailPage({ params: Promise.resolve({ slug: rumpun.slug }) }));

                    // Requirement 3.4, 5.3: Each tokoh has nama, gelar, deskripsi
                    rumpun.tokoh.forEach((tokoh) => {
                        const namaElement = screen.getByText(tokoh.nama);
                        expect(namaElement).toBeInTheDocument();

                        const gelarElement = screen.getByText(tokoh.gelar);
                        expect(gelarElement).toBeInTheDocument();

                        const deskripsiElement = screen.getByText(tokoh.deskripsi);
                        expect(deskripsiElement).toBeInTheDocument();
                    });

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have at least one tokoh for every rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    // Verify data integrity: every rumpun should have tokoh
                    expect(rumpun.tokoh).toBeDefined();
                    expect(rumpun.tokoh.length).toBeGreaterThan(0);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});
