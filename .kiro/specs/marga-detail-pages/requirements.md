# Requirements Document

## Introduction

Fitur ini bertujuan untuk menambahkan halaman detail untuk setiap marga Batak. Ketika pengguna mengklik salah satu card marga di halaman `/marga`, mereka akan diarahkan ke halaman detail yang berisi informasi lengkap tentang marga tersebut termasuk sejarah, asal usul, tarombo (silsilah), wilayah asal dengan peta, dan informasi lainnya.

## Glossary

- **Marga**: Sistem kekerabatan patrilineal dalam budaya Batak yang diturunkan dari garis ayah
- **Halaman_Marga**: Halaman utama di `/marga` yang menampilkan daftar semua marga
- **Halaman_Detail_Marga**: Halaman individual untuk setiap marga di `/marga/[slug]`
- **Card_Marga**: Komponen kartu yang menampilkan preview marga di halaman utama
- **Tarombo**: Silsilah atau pohon keluarga dalam tradisi Batak
- **Rumpun_Batak**: Enam sub-etnis utama Batak (Toba, Karo, Simalungun, Pakpak, Angkola, Mandailing)

## Requirements

### Requirement 1: Navigasi dari Card Marga ke Halaman Detail

**User Story:** As a visitor, I want to click on a marga card to navigate to its dedicated detail page, so that I can learn comprehensive information about that specific marga.

#### Acceptance Criteria

1. WHEN a user clicks on a Card_Marga, THE System SHALL navigate to the corresponding Halaman_Detail_Marga at `/marga/[marga-slug]`
2. THE Card_Marga SHALL display a visual indicator (cursor pointer, hover effect) to show it is clickable
3. WHEN a user navigates to an invalid marga route, THE System SHALL display a 404 page

### Requirement 2: Halaman Detail Marga - Informasi Dasar

**User Story:** As a visitor, I want to view basic information about a marga on its detail page, so that I can understand the identity of that marga.

#### Acceptance Criteria

1. THE Halaman_Detail_Marga SHALL display the marga name as the page title
2. THE Halaman_Detail_Marga SHALL display the rumpun (sub-ethnic group) the marga belongs to
3. THE Halaman_Detail_Marga SHALL include a hero section with representative imagery
4. THE Halaman_Detail_Marga SHALL include navigation back to the main Halaman_Marga

### Requirement 3: Sejarah dan Asal Usul Marga

**User Story:** As a visitor, I want to read about the history and origin of a marga, so that I can understand its heritage and background.

#### Acceptance Criteria

1. THE Halaman_Detail_Marga SHALL include a section about the marga's history (sejarah)
2. THE Halaman_Detail_Marga SHALL include information about the marga's origin story (asal usul)
3. THE sejarah section SHALL describe the founding and development of the marga

### Requirement 4: Tarombo (Silsilah)

**User Story:** As a visitor, I want to see the tarombo (genealogy) of a marga, so that I can understand the lineage and family tree structure.

#### Acceptance Criteria

1. THE Halaman_Detail_Marga SHALL include a tarombo section showing the marga's genealogical structure
2. THE tarombo section SHALL display key ancestors or founding figures
3. THE tarombo section SHALL explain the branching of sub-margas if applicable

### Requirement 5: Wilayah Asal dengan Peta

**User Story:** As a visitor, I want to see where a marga originates from on a map, so that I can understand the geographical context of the marga.

#### Acceptance Criteria

1. THE Halaman_Detail_Marga SHALL include a section showing the marga's region of origin (wilayah asal)
2. THE wilayah section SHALL include a visual map showing the geographical location
3. THE map SHALL be interactive or at minimum display the region clearly
4. THE wilayah section SHALL include a text description of the region

### Requirement 6: Informasi Tambahan

**User Story:** As a visitor, I want to see additional cultural information about a marga, so that I can have a comprehensive understanding.

#### Acceptance Criteria

1. THE Halaman_Detail_Marga SHALL include information about notable traditions or customs specific to the marga
2. THE Halaman_Detail_Marga MAY include information about famous figures from the marga
3. THE Halaman_Detail_Marga MAY include related margas or connections to other margas

### Requirement 7: Data Marga Detail

**User Story:** As a developer, I want marga detail data to be stored in a structured format that is ready for future dynamic editing, so that content can be easily maintained and updated.

#### Acceptance Criteria

1. THE System SHALL store marga detail data in a separate JSON file at `content/data/marga-detail.json`
2. THE marga detail data SHALL include: margaId (reference to marga.json), slug, sejarah, asalUsul, tarombo, wilayah (with coordinates and description), and tradisi fields
3. THE data structure SHALL be designed to support future CRUD operations (create, read, update, delete)
4. THE System SHALL support margas without complete detail data by showing available information only
5. WHEN the data file is updated, THE System SHALL reflect changes after rebuild
6. THE data structure SHALL use normalized references (margaId) to link with existing marga.json data
