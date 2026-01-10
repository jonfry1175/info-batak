# Implementation Plan: Rumpun Batak Pages

## Overview

Implementasi fitur halaman rumpun Batak dengan card visual dan halaman detail untuk setiap rumpun. Menggunakan Next.js App Router dengan static generation.

## Tasks

- [x] 1. Setup data layer dan types
  - [x] 1.1 Tambahkan type Rumpun dan Tokoh di `types/index.ts`
    - Interface RumpunBatak dengan fields: id, nama, slug, deskripsi, gambar, sejarah, budaya, wilayah, tokoh
    - Interface Tokoh dengan fields: nama, gelar, deskripsi
    - _Requirements: 6.2_

  - [x] 1.2 Buat file data `content/data/rumpun.json` dengan data 6 rumpun
    - Data lengkap untuk Toba, Karo, Simalungun, Pakpak, Angkola, Mandailing
    - Include tokoh penting untuk setiap rumpun
    - _Requirements: 6.1, 6.2_

  - [x] 1.3 Tambahkan fungsi data access di `lib/data.ts`
    - `getAllRumpun()`: return semua rumpun
    - `getRumpunBySlug(slug)`: return rumpun by slug atau undefined
    - _Requirements: 6.1_

  - [x] 1.4 Write property test untuk data schema validity
    - **Property 5: Data Schema Validity**
    - **Validates: Requirements 6.2**
    - Test file: `lib/rumpun.test.ts`

- [x] 2. Download dan setup gambar rumpun
  - [x] 2.1 Download gambar representatif untuk setiap rumpun
    - Folder `public/images/rumpun/` sudah ada
    - 6 gambar tersedia: toba.jpg, karo.jpg, simalungun.jpg, pakpak.jpg, angkola.jpg, mandailing.jpg
    - _Requirements: 1.1_

  - [x] 2.2 Buat placeholder image untuk fallback
    - File: `public/images/rumpun/placeholder.jpg` sudah ada
    - _Requirements: 1.3_

- [x] 3. Buat komponen RumpunCard
  - [x] 3.1 Implementasi komponen `components/sejarah/RumpunCard.tsx`
    - Card dengan gambar, nama, dan deskripsi
    - Clickable dengan Link ke `/sejarah/[slug]`
    - Hover animation dengan Framer Motion
    - Image fallback handling dengan useState
    - _Requirements: 1.1, 1.2, 1.3, 2.1_

  - [x] 3.2 Write property test untuk card rendering
    - **Property 1: Card Rendering Completeness**
    - **Validates: Requirements 1.1, 1.2**
    - Test file: `components/sejarah/RumpunCard.test.tsx`

- [x] 4. Update halaman Sejarah utama
  - [x] 4.1 Modifikasi `app/sejarah/page.tsx`
    - Hapus section "Batak di Era Modern"
    - Hapus section "Tokoh Penting dalam Sejarah Batak"
    - Ganti card rumpun statis dengan RumpunCard component
    - Load data dari `getAllRumpun()`
    - _Requirements: 4.1, 4.2, 5.1_

  - [x] 4.2 Write unit test untuk halaman sejarah
    - Test absence of "Batak di Era Modern" section
    - Test absence of "Tokoh Penting" section
    - Test presence of 6 RumpunCard
    - _Requirements: 4.1, 5.1_

- [x] 5. Checkpoint - Verifikasi halaman utama
  - Ensure halaman sejarah menampilkan 6 card rumpun dengan gambar
  - Ensure section yang dihapus tidak muncul
  - Ask user if questions arise

- [x] 6. Buat halaman detail rumpun
  - [x] 6.1 Buat dynamic route `app/sejarah/[slug]/page.tsx`
    - Implementasi `generateStaticParams` untuk SSG
    - Load data dengan `getRumpunBySlug()`
    - Handle 404 untuk invalid slug dengan `notFound()`
    - _Requirements: 2.2, 2.3_

  - [x] 6.2 Implementasi layout halaman detail
    - Hero section dengan gambar besar
    - Section sejarah rumpun
    - Section budaya dan tradisi
    - Section tokoh penting
    - Back navigation ke `/sejarah`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 6.3 Write property test untuk detail page structure
    - **Property 3: Detail Page Structure**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.5**

  - [x] 6.4 Write property test untuk tokoh display
    - **Property 4: Tokoh Display Correctness**
    - **Validates: Requirements 3.4, 5.2, 5.3**

- [x] 7. Implementasi navigasi dan routing
  - [x] 7.1 Verifikasi navigasi dari card ke detail page
    - Test klik card navigasi ke URL yang benar
    - _Requirements: 2.1_

  - [x] 7.2 Write property test untuk navigation correctness
    - **Property 2: Navigation Correctness**
    - **Validates: Requirements 2.1**

- [x] 8. Final checkpoint - Verifikasi semua fitur
  - Ensure semua 6 route detail berfungsi
  - Ensure navigasi dari card ke detail benar
  - Ensure tokoh penting muncul di halaman detail
  - Ensure all tests pass
  - Ask user if questions arise

## Notes

- Semua tasks termasuk testing adalah required
- Gambar sudah tersedia di `public/images/rumpun/`
- Menggunakan Next.js Image component untuk optimasi
- Framer Motion untuk animasi hover pada card
- Property-based tests menggunakan fast-check library
- Static export dengan `output: 'export'` di next.config.ts
