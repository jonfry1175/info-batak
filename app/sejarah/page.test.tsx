import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SejarahPage from './page';
import { getAllRumpun } from '@/lib/data';

/**
 * Unit tests for Sejarah page
 * **Validates: Requirements 4.1, 5.1**
 *
 * Tests verify:
 * - Absence of "Batak di Era Modern" section
 * - Absence of "Tokoh Penting dalam Sejarah Batak" section
 * - Presence of 6 RumpunCard components
 */
describe('Sejarah Page', () => {
    it('should NOT display "Batak di Era Modern" section', () => {
        render(<SejarahPage />);

        // Check that the "Batak di Era Modern" heading does not exist
        const modernEraHeading = screen.queryByText('Batak di Era Modern');
        expect(modernEraHeading).not.toBeInTheDocument();

        // Check that specific content from that section does not exist
        const modernEraContent = screen.queryByText(/Pada era modern, masyarakat Batak telah mengalami perkembangan pesat/i);
        expect(modernEraContent).not.toBeInTheDocument();

        const marsiajarContent = screen.queryByText(/marsiajar/i);
        expect(marsiajarContent).not.toBeInTheDocument();
    });

    it('should NOT display "Tokoh Penting dalam Sejarah Batak" section', () => {
        render(<SejarahPage />);

        // Check that the "Tokoh Penting dalam Sejarah Batak" heading does not exist
        const tokohHeading = screen.queryByText('Tokoh Penting dalam Sejarah Batak');
        expect(tokohHeading).not.toBeInTheDocument();

        // Check that specific tokoh names from that section do not exist
        const sisingamangaraja = screen.queryByText('Raja Sisingamangaraja XII');
        expect(sisingamangaraja).not.toBeInTheDocument();

        const nommensen = screen.queryByText('I.L. Nommensen');
        expect(nommensen).not.toBeInTheDocument();
    });

    it('should display 6 RumpunCard components', () => {
        const { container } = render(<SejarahPage />);
        const allRumpun = getAllRumpun();

        // Verify we have 6 rumpun in data
        expect(allRumpun).toHaveLength(6);

        // Check that all 6 rumpun names are rendered
        allRumpun.forEach((rumpun) => {
            const rumpunName = screen.getByText(rumpun.nama);
            expect(rumpunName).toBeInTheDocument();
        });

        // Check that all 6 rumpun descriptions are rendered
        allRumpun.forEach((rumpun) => {
            const rumpunDescription = screen.getByText(rumpun.deskripsi);
            expect(rumpunDescription).toBeInTheDocument();
        });

        // Check that we have 6 links to detail pages
        allRumpun.forEach((rumpun) => {
            const linkElement = container.querySelector(`a[href="/sejarah/${rumpun.slug}"]`);
            expect(linkElement).toBeInTheDocument();
        });
    });

    it('should display the "Enam Rumpun Batak" section heading', () => {
        render(<SejarahPage />);

        const rumpunHeading = screen.getByText('Enam Rumpun Batak');
        expect(rumpunHeading).toBeInTheDocument();
    });

    it('should display the "Asal Usul Bangsa Batak" section', () => {
        render(<SejarahPage />);

        const asalUsulHeading = screen.getByText('Asal Usul Bangsa Batak');
        expect(asalUsulHeading).toBeInTheDocument();

        // Check that content from this section still exists
        const pusukBuhitContent = screen.getByText(/Pusuk Buhit/i);
        expect(pusukBuhitContent).toBeInTheDocument();
    });

    it('should have the main page title "Sejarah Batak"', () => {
        render(<SejarahPage />);

        const pageTitle = screen.getByText('Sejarah Batak');
        expect(pageTitle).toBeInTheDocument();
    });
});
