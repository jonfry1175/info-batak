# Design Document: Rumpun Batak Pages

## Overview

Fitur ini akan meningkatkan halaman Sejarah (`/sejarah`) dengan fokus pada enam rumpun Batak. Setiap rumpun akan ditampilkan sebagai card dengan gambar representatif yang dapat diklik untuk navigasi ke halaman detail. Halaman detail akan berisi informasi lengkap tentang rumpun tersebut termasuk tokoh-tokoh penting.

## Architecture

### Page Structure

```
/sejarah                    → Halaman utama dengan overview dan 6 card rumpun
/sejarah/[slug]             → Halaman detail untuk setiap rumpun
  ├── /sejarah/toba
  ├── /sejarah/karo
  ├── /sejarah/simalungun
  ├── /sejarah/pakpak
  ├── /sejarah/angkola
  └── /sejarah/mandailing
```

### Data Flow

```mermaid
graph TD
    A[rumpun.json] --> B[lib/data.ts]
    B --> C[getAllRumpun]
    B --> D[getRumpunBySlug]
    C --> E[/sejarah page]
    D --> F[/sejarah/slug page]
    E --> G[RumpunCard Component]
    F --> H[RumpunDetail Component]
```

## Components and Interfaces

### RumpunCard Component

Komponen card untuk menampilkan preview rumpun di halaman utama.

```typescript
interface RumpunCardProps {
  rumpun: Rumpun;
}

// Usage
<RumpunCard rumpun={rumpunData} />
```

Features:

- Menampilkan gambar representatif dengan aspect ratio 16:9
- Nama rumpun sebagai heading
- Deskripsi singkat
- Hover effect dengan scale animation
- Clickable untuk navigasi ke detail page
- Fallback image jika gambar gagal load

### Halaman Detail Rumpun

Dynamic route page yang menampilkan informasi lengkap tentang satu rumpun.

Sections:

1. Hero section dengan gambar besar
2. Sejarah dan asal usul
3. Budaya dan tradisi
4. Tokoh penting dari rumpun tersebut
5. Back navigation ke halaman sejarah

## Data Models

### Rumpun Type

```typescript
interface Rumpun {
  id: string;
  nama: string; // e.g., "Batak Toba"
  slug: string; // e.g., "toba"
  deskripsi: string; // Deskripsi singkat untuk card
  gambar: string; // Path ke gambar representatif
  sejarah: string; // Konten sejarah lengkap
  budaya: string; // Konten budaya dan tradisi
  wilayah: string; // Wilayah geografis
  tokoh: Tokoh[]; // Array tokoh penting
}

interface Tokoh {
  nama: string;
  gelar: string; // e.g., "Pahlawan Nasional"
  deskripsi: string;
}
```

### Data File Structure

File: `content/data/rumpun.json`

```json
{
  "rumpun": [
    {
      "id": "toba",
      "nama": "Batak Toba",
      "slug": "toba",
      "deskripsi": "Sub-etnis terbesar yang mendiami kawasan sekitar Danau Toba...",
      "gambar": "/images/rumpun/toba.jpg",
      "sejarah": "...",
      "budaya": "...",
      "wilayah": "Danau Toba dan Tapanuli Utara",
      "tokoh": [
        {
          "nama": "Raja Sisingamangaraja XII",
          "gelar": "Pahlawan Nasional Indonesia",
          "deskripsi": "..."
        }
      ]
    }
  ]
}
```

### Data Access Functions

```typescript
// lib/data.ts additions
export function getAllRumpun(): Rumpun[];
export function getRumpunBySlug(slug: string): Rumpun | undefined;
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Card Rendering Completeness

_For any_ rumpun data in the JSON file, the rendered RumpunCard SHALL contain the rumpun name, description, and a valid image element.

**Validates: Requirements 1.1, 1.2**

### Property 2: Navigation Correctness

_For any_ RumpunCard clicked, the navigation SHALL route to `/sejarah/{slug}` where slug matches the rumpun's slug property.

**Validates: Requirements 2.1**

### Property 3: Detail Page Structure

_For any_ valid rumpun slug, the detail page SHALL display the rumpun name as title, hero image, sejarah section, budaya section, and back navigation link.

**Validates: Requirements 3.1, 3.2, 3.3, 3.5**

### Property 4: Tokoh Display Correctness

_For any_ rumpun with tokoh data, the detail page SHALL display each tokoh with nama, gelar, and deskripsi fields.

**Validates: Requirements 3.4, 5.2, 5.3**

### Property 5: Data Schema Validity

_For any_ rumpun object in rumpun.json, it SHALL contain all required fields: id, nama, slug, deskripsi, gambar, sejarah, budaya, wilayah, and tokoh.

**Validates: Requirements 6.2**

## Error Handling

### Invalid Route Handling

- Jika user mengakses `/sejarah/[invalid-slug]`, sistem akan menampilkan halaman 404
- Implementasi menggunakan Next.js `notFound()` function

### Image Loading Errors

- Jika gambar gagal load, tampilkan placeholder image
- Gunakan Next.js Image component dengan `onError` handler
- Fallback image: `/images/placeholder-rumpun.jpg`

### Data Loading Errors

- Jika data JSON tidak valid, log error dan tampilkan empty state
- Graceful degradation untuk missing fields

## Testing Strategy

### Unit Tests

Unit tests akan fokus pada:

- Data access functions (`getAllRumpun`, `getRumpunBySlug`)
- Component rendering dengan berbagai props
- Edge cases (empty data, missing fields)

### Property-Based Tests

Property-based tests menggunakan `fast-check` library untuk:

- Validasi schema data rumpun
- Validasi navigasi URL generation
- Validasi rendering completeness

Konfigurasi:

- Minimum 100 iterations per property test
- Tag format: **Feature: rumpun-batak-pages, Property {number}: {property_text}**

### Integration Tests

- Route navigation testing
- Page rendering dengan real data
- 404 handling untuk invalid routes
