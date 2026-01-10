# Implementation Plan: Marga Detail Pages

## Overview

Implementasi fitur halaman detail marga dengan navigasi dari card marga ke halaman detail. Menggunakan Next.js App Router dengan static generation dan data JSON terpisah untuk future dynamic editing.

## Tasks

- [x] 1. Setup data layer dan types
  - [x] 1.1 Update type Marga di `types/index.ts` untuk menambahkan slug field
    - Tambahkan `slug: string` ke interface Marga
    - _Requirements: 7.2_

  - [x] 1.2 Tambahkan types baru di `types/index.ts` untuk MargaDetail
    - Interface MargaDetail dengan fields: margaId, slug, sejarah, asalUsul, tarombo, wilayah, tradisi, tokoh, relatedMargas, updatedAt
    - Interface Tarombo, Ancestor, SubMarga
    - Interface Wilayah dengan koordinat
    - Interface TokohMarga
    - _Requirements: 7.2_

  - [x] 1.3 Update `content/data/marga.json` untuk menambahkan slug ke setiap marga
    - Generate slug dari nama marga (lowercase, no spaces)
    - _Requirements: 7.2_

  - [x] 1.4 Buat file data `content/data/marga-detail.json` dengan sample data
    - Buat data detail untuk minimal 3 marga sebagai contoh (Sitorus, Ginting, Nasution)
    - Include semua fields: sejarah, asalUsul, tarombo, wilayah, tradisi
    - _Requirements: 7.1, 7.2_

  - [x] 1.5 Tambahkan fungsi data access di `lib/data.ts`
    - `getMargaBySlug(slug)`: return marga by slug
    - `getMargaDetailBySlug(slug)`: return marga detail by slug
    - `getFullMargaBySlug(slug)`: return combined marga + detail
    - `getAllMargaSlugs()`: return all slugs for static generation
    - _Requirements: 7.2, 7.6_

  - [x] 1.6 Write property test untuk data schema validity
    - **Property 4: Data Schema Validity**
    - **Validates: Requirements 7.2, 7.6**

- [x] 2. Checkpoint - Verifikasi data layer
  - Ensure types compile tanpa error
  - Ensure data functions return correct data
  - Ask user if questions arise

- [x] 3. Update halaman Marga utama
  - [x] 3.1 Update `app/marga/page.tsx` untuk membuat card clickable
    - Wrap card dengan Next.js Link ke `/marga/[slug]`
    - Tambahkan hover effect dan cursor pointer
    - _Requirements: 1.1, 1.2_

  - [x] 3.2 Write property test untuk navigation from card
    - **Property 1: Navigation from Card to Detail**
    - **Validates: Requirements 1.1**

- [x] 4. Buat halaman detail marga
  - [x] 4.1 Buat dynamic route `app/marga/[slug]/page.tsx`
    - Implementasi `generateStaticParams` untuk SSG
    - Load data dengan `getFullMargaBySlug()`
    - Handle 404 untuk invalid slug dengan `notFound()`
    - _Requirements: 1.3, 2.1, 2.4_

  - [x] 4.2 Implementasi Hero section
    - Nama marga sebagai heading
    - Rumpun badge
    - Deskripsi singkat
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 4.3 Implementasi Sejarah section
    - Render hanya jika data sejarah tersedia
    - _Requirements: 3.1, 3.3_

  - [x] 4.4 Implementasi Asal Usul section
    - Render hanya jika data asalUsul tersedia
    - _Requirements: 3.2_

  - [x] 4.5 Implementasi Tarombo section
    - Render ancestors jika tersedia
    - Render sub-margas jika tersedia
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 4.6 Implementasi Wilayah section dengan Map
    - Render deskripsi wilayah
    - Embed Google Maps atau static map image dengan koordinat
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 4.7 Implementasi Tradisi section
    - Render list tradisi jika tersedia
    - _Requirements: 6.1_

  - [x] 4.8 Implementasi Tokoh section
    - Render tokoh terkenal jika tersedia
    - _Requirements: 6.2_

  - [x] 4.9 Implementasi Related Margas section
    - Render link ke marga terkait jika tersedia
    - _Requirements: 6.3_

  - [x] 4.10 Implementasi Back navigation
    - Link kembali ke halaman /marga
    - _Requirements: 2.4_

  - [x] 4.11 Write property test untuk basic info rendering
    - **Property 2: Basic Info Rendering Completeness**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

  - [x] 4.12 Write property test untuk conditional section rendering
    - **Property 3: Conditional Section Rendering**
    - **Validates: Requirements 3.1, 3.2, 4.1, 4.2, 4.3, 5.1, 5.2, 5.4, 6.1, 6.2, 6.3, 7.4**

- [ ] 5. Checkpoint - Verifikasi halaman detail
  - Ensure halaman detail render dengan benar
  - Ensure sections conditional rendering bekerja
  - Ensure map menampilkan lokasi
  - Ask user if questions arise

- [ ] 6. Final testing dan polish
  - [ ] 6.1 Test navigasi end-to-end
    - Klik card → navigasi ke detail → klik back → kembali ke list
    - _Requirements: 1.1, 2.4_

  - [ ] 6.2 Test 404 handling
    - Akses `/marga/invalid-slug` → tampilkan 404
    - _Requirements: 1.3_

  - [ ] 6.3 Test partial data handling
    - Marga tanpa detail data → tampilkan info dasar saja
    - _Requirements: 7.4_

- [ ] 7. Final checkpoint - Verifikasi semua fitur
  - Ensure semua routes berfungsi
  - Ensure navigasi dari card ke detail benar
  - Ensure map menampilkan lokasi dengan benar
  - Ensure all tests pass
  - Ask user if questions arise

## Notes

- Semua tasks termasuk property tests adalah required
- Data detail dibuat untuk 3 marga sebagai sample, sisanya bisa ditambahkan nanti
- Map menggunakan Google Maps embed untuk simplicity
- Struktur data siap untuk future CRUD operations
- Menggunakan Next.js static generation untuk performa optimal
- Property-based tests menggunakan fast-check library
