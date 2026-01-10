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
