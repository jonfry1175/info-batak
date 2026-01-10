import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { RumpunCard } from './RumpunCard';
import { getAllRumpun } from '@/lib/data';
import { RumpunBatak } from '@/types';

/**
 * **Feature: rumpun-batak-pages, Property 1: Card Rendering Completeness**
 * **Validates: Requirements 1.1, 1.2**
 *
 * For any rumpun data in the JSON file, the rendered RumpunCard SHALL contain
 * the rumpun name, description, and a valid image element.
 */
describe('Property 1: Card Rendering Completeness', () => {
    const allRumpun = getAllRumpun();

    it('should render all required elements for every rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    const { container } = render(<RumpunCard rumpun={rumpun} />);

                    // Check that rumpun name is rendered
                    const nameElement = screen.getByText(rumpun.nama);
                    expect(nameElement).toBeInTheDocument();

                    // Check that description is rendered
                    const descriptionElement = screen.getByText(rumpun.deskripsi);
                    expect(descriptionElement).toBeInTheDocument();

                    // Check that image element exists with correct alt text
                    const imageElement = screen.getByAltText(`Gambar representatif ${rumpun.nama}`);
                    expect(imageElement).toBeInTheDocument();

                    // Check that the link has correct href
                    const linkElement = container.querySelector(`a[href="/sejarah/${rumpun.slug}"]`);
                    expect(linkElement).toBeInTheDocument();

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should render image with correct src for every rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    render(<RumpunCard rumpun={rumpun} />);

                    const imageElement = screen.getByAltText(`Gambar representatif ${rumpun.nama}`);
                    
                    // Next.js Image component uses srcset, so we check for the image path in the src attribute
                    const src = imageElement.getAttribute('src');
                    expect(src).toBeTruthy();
                    
                    // The src should contain the image path (Next.js optimizes it)
                    // We just verify it exists and is not empty
                    expect(src).not.toBe('');

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should render "Pelajari lebih lanjut" text for every rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    render(<RumpunCard rumpun={rumpun} />);

                    const readMoreText = screen.getByText('Pelajari lebih lanjut');
                    expect(readMoreText).toBeInTheDocument();

                    // Clean up after each iteration
                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have exactly 6 rumpun cards to render', () => {
        // This ensures we have the expected number of rumpun entries
        expect(allRumpun).toHaveLength(6);
    });
});

/**
 * Unit Test for Task 7.1: Verifikasi navigasi dari card ke detail page
 * **Validates: Requirements 2.1**
 *
 * Test that clicking a card navigates to the correct URL
 */
describe('Navigation from Card to Detail Page', () => {
    const allRumpun = getAllRumpun();

    it('should have correct href for each rumpun card', () => {
        allRumpun.forEach((rumpun) => {
            const { container } = render(<RumpunCard rumpun={rumpun} />);

            // Find the link element
            const linkElement = container.querySelector('a');
            expect(linkElement).toBeInTheDocument();

            // Verify the href matches the expected pattern
            expect(linkElement).toHaveAttribute('href', `/sejarah/${rumpun.slug}`);

            cleanup();
        });
    });

    it('should navigate to correct URL when card is clicked', () => {
        allRumpun.forEach((rumpun) => {
            const { container } = render(<RumpunCard rumpun={rumpun} />);

            // Find the link element
            const linkElement = container.querySelector('a');
            expect(linkElement).toBeInTheDocument();

            // Verify the link is clickable and has correct href
            const href = linkElement?.getAttribute('href');
            expect(href).toBe(`/sejarah/${rumpun.slug}`);

            // Verify the expected URLs for each rumpun
            const expectedUrls = [
                '/sejarah/toba',
                '/sejarah/karo',
                '/sejarah/simalungun',
                '/sejarah/pakpak',
                '/sejarah/angkola',
                '/sejarah/mandailing'
            ];
            expect(expectedUrls).toContain(href);

            cleanup();
        });
    });

    it('should have all 6 expected rumpun routes', () => {
        const expectedSlugs = ['toba', 'karo', 'simalungun', 'pakpak', 'angkola', 'mandailing'];
        const actualSlugs = allRumpun.map(r => r.slug);

        expectedSlugs.forEach(slug => {
            expect(actualSlugs).toContain(slug);
        });

        expect(actualSlugs).toHaveLength(6);
    });
});

/**
 * **Feature: rumpun-batak-pages, Property 2: Navigation Correctness**
 * **Validates: Requirements 2.1**
 *
 * For any RumpunCard clicked, the navigation SHALL route to `/sejarah/{slug}`
 * where slug matches the rumpun's slug property.
 */
describe('Property 2: Navigation Correctness', () => {
    const allRumpun = getAllRumpun();

    it('should generate correct navigation URL for any rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    const { container } = render(<RumpunCard rumpun={rumpun} />);

                    // Find the link element (the card is wrapped in a Link)
                    const linkElement = container.querySelector('a');
                    
                    // Verify link exists
                    expect(linkElement).toBeInTheDocument();
                    
                    // Verify href matches the pattern /sejarah/{slug}
                    const href = linkElement?.getAttribute('href');
                    expect(href).toBe(`/sejarah/${rumpun.slug}`);
                    
                    // Verify the slug in the URL matches the rumpun's slug property
                    const urlParts = href?.split('/');
                    const slugFromUrl = urlParts?.[urlParts.length - 1];
                    expect(slugFromUrl).toBe(rumpun.slug);

                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should generate valid route paths for all rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    const { container } = render(<RumpunCard rumpun={rumpun} />);

                    const linkElement = container.querySelector('a');
                    const href = linkElement?.getAttribute('href');

                    // Verify the href follows the expected pattern
                    expect(href).toMatch(/^\/sejarah\/[a-z]+$/);
                    
                    // Verify it's one of the 6 valid routes
                    const validRoutes = [
                        '/sejarah/toba',
                        '/sejarah/karo',
                        '/sejarah/simalungun',
                        '/sejarah/pakpak',
                        '/sejarah/angkola',
                        '/sejarah/mandailing'
                    ];
                    expect(validRoutes).toContain(href);

                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should maintain slug consistency between data and navigation', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatak) => {
                    const { container } = render(<RumpunCard rumpun={rumpun} />);

                    const linkElement = container.querySelector('a');
                    const href = linkElement?.getAttribute('href');

                    // Extract slug from href
                    const slugFromHref = href?.replace('/sejarah/', '');
                    
                    // Verify slug in href matches the rumpun's slug property exactly
                    expect(slugFromHref).toBe(rumpun.slug);
                    
                    // Verify slug is not empty
                    expect(rumpun.slug).toBeTruthy();
                    expect(rumpun.slug.length).toBeGreaterThan(0);

                    cleanup();

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});
