# Implementation Plan: Rumpun Detail Enhancement

## Overview

Implementasi enhancement halaman detail rumpun Batak dengan peta interaktif, konten sejarah terstruktur, budaya dengan kategori, dan tokoh dengan informasi lengkap. Menggunakan Next.js App Router dengan static generation.

## Tasks

- [x] 1. Update data types dan struktur
  - [x] 1.1 Update types di `types/index.ts` untuk enhanced RumpunBatak
    - Tambah interface RumpunBatakEnhanced dengan wilayah, sejarah, budaya objects
    - Tambah interface TimelineEvent, EnhancedTokoh, MapMarker
    - Tambah interface untuk budaya categories
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 1.2 Buat fungsi normalizeRumpunData di `lib/data.ts`
    - Konversi format lama ke format baru
    - Handle missing fields dengan default values
    - Preserve backward compatibility
    - _Requirements: 5.5_

  - [x] 1.3 Write property test untuk data schema validity
    - **Property 1: Data Schema Validity**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
    - Test file: `lib/rumpun-enhanced.test.ts`

  - [x] 1.4 Write property test untuk backward compatibility
    - **Property 7: Backward Compatibility**
    - **Validates: Requirements 5.5**
    - Test file: `lib/rumpun-enhanced.test.ts`

- [x] 2. Update data rumpun.json dengan enhanced content
  - [x] 2.1 Update data Batak Toba dengan format enhanced
    - Tambah koordinat wilayah (2.6167, 98.8500 - Danau Toba)
    - Tambah kabupaten dan landmarks
    - Tambah timeline sejarah dengan events
    - Tambah budaya categories dengan detail
    - Enhance tokoh dengan foto placeholder, tahun, biografi, pencapaian
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 2.2 Update data Batak Karo dengan format enhanced
    - Tambah koordinat wilayah (3.1000, 98.5000 - Tanah Karo)
    - Struktur sama seperti Toba
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 2.3 Update data 4 rumpun lainnya (Simalungun, Pakpak, Angkola, Mandailing)
    - Koordinat dan data enhanced untuk masing-masing
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 3. Checkpoint - Verifikasi data layer
  - Ensure semua data rumpun sudah dalam format enhanced
  - Ensure backward compatibility function bekerja
  - Ensure all property tests pass
  - Ask user if questions arise

- [x] 4. Buat komponen MapEmbed
  - [x] 4.1 Implementasi komponen `components/sejarah/MapEmbed.tsx`
    - Google Maps iframe embed dengan koordinat
    - Fallback image jika embed gagal
    - Responsive container 16:9 aspect ratio
    - Loading skeleton state
    - _Requirements: 1.1, 1.4, 1.5_

  - [x] 4.2 Write property test untuk map coordinate validation
    - **Property 2: Map Component Data Binding**
    - **Validates: Requirements 1.1, 1.3**
    - Test file: `components/sejarah/MapEmbed.test.tsx`

- [x] 5. Buat komponen TimelineComponent
  - [x] 5.1 Implementasi komponen `components/sejarah/Timeline.tsx`
    - Vertical timeline dengan alternating layout
    - Year badge dengan accent color
    - Animated entry dengan Framer Motion
    - Optional image per event
    - _Requirements: 2.2, 2.3_

  - [x] 5.2 Write property test untuk timeline chronological order
    - **Property 3: Timeline Chronological Order**
    - **Validates: Requirements 2.2, 2.3**
    - Test file: `components/sejarah/Timeline.test.tsx`

- [x] 6. Buat komponen SejarahSection
  - [x] 6.1 Implementasi komponen `components/sejarah/SejarahSection.tsx`
    - Overview dengan ringkasan
    - Collapsible sub-sections (Asal Usul, Kerajaan, Perlawanan, Era Modern)
    - Integrate TimelineComponent
    - Image gallery untuk sejarah
    - _Requirements: 2.1, 2.4, 2.5_

  - [x] 6.2 Write property test untuk sejarah section structure
    - **Property 4: Sejarah Section Structure**
    - **Validates: Requirements 2.1**
    - Test file: `components/sejarah/SejarahSection.test.tsx`

- [x] 7. Buat komponen BudayaSection dengan CategoryTabs
  - [x] 7.1 Implementasi komponen `components/sejarah/CategoryTabs.tsx`
    - Horizontal scrollable tabs on mobile
    - Icon + label untuk setiap tab
    - Active state dengan accent color
    - _Requirements: 3.4_

  - [x] 7.2 Implementasi komponen `components/sejarah/BudayaSection.tsx`
    - Integrate CategoryTabs
    - Category content cards
    - Gallery component untuk images
    - Placeholder untuk empty categories
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [x] 7.3 Write property test untuk budaya category completeness
    - **Property 5: Budaya Category Completeness**
    - **Validates: Requirements 3.1, 3.2**
    - Test file: `components/sejarah/BudayaSection.test.tsx`

- [x] 8. Checkpoint - Verifikasi komponen section
  - Ensure MapEmbed, Timeline, SejarahSection, BudayaSection render correctly
  - Ensure all property tests pass
  - Ask user if questions arise

- [x] 9. Buat komponen TokohCard enhanced
  - [x] 9.1 Implementasi komponen `components/sejarah/TokohCard.tsx` (enhanced)
    - Avatar/foto dengan fallback placeholder
    - Periode hidup (tahun lahir - wafat)
    - Bidang/kontribusi badge
    - Expandable biography
    - Achievement list
    - Hover animation dengan Framer Motion
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 9.2 Write property test untuk tokoh card completeness
    - **Property 6: Tokoh Card Completeness**
    - **Validates: Requirements 4.1, 4.2**
    - Test file: `components/sejarah/TokohCard.test.tsx`

- [x] 10. Buat komponen TableOfContents
  - [x] 10.1 Implementasi komponen `components/sejarah/TableOfContents.tsx`
    - Sticky positioning on desktop
    - Smooth scroll to section
    - Active section highlighting dengan Intersection Observer
    - Hidden on mobile
    - _Requirements: 6.3_

- [x] 11. Update halaman detail rumpun
  - [x] 11.1 Refactor `app/sejarah/[slug]/page.tsx`
    - Integrate semua komponen baru
    - Use normalizeRumpunData untuk handle data
    - Add TableOfContents sidebar layout
    - Add section IDs untuk navigation
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 6.2_

  - [x] 11.2 Add scroll animations dengan Framer Motion
    - Fade in on scroll untuk sections
    - Stagger animation untuk cards
    - _Requirements: 6.1, 6.2_

- [x] 12. Final checkpoint - Verifikasi semua fitur
  - Ensure halaman detail menampilkan semua section baru
  - Ensure peta interaktif berfungsi dengan fallback
  - Ensure timeline menampilkan events chronologically
  - Ensure budaya tabs navigation berfungsi
  - Ensure tokoh cards expandable
  - Ensure all tests pass
  - Ask user if questions arise

## Notes

- Semua tasks termasuk property tests adalah required
- Menggunakan Google Maps iframe embed (tidak perlu API key)
- Framer Motion untuk animasi
- Intersection Observer untuk active section detection
- Static export dengan `output: 'export'` di next.config.ts
- Property-based tests menggunakan fast-check library
- Semua komponen harus responsive (mobile-first)
- Warna accent tetap #C1272D sesuai design system
