# Requirements Document

## Introduction

Fitur ini bertujuan untuk meningkatkan halaman Sejarah dengan fokus pada enam rumpun Batak. Setiap rumpun akan memiliki gambar representatif dan halaman detail tersendiri. Konten "Batak di Era Modern" akan dihapus, dan "Tokoh Penting dalam Sejarah Batak" akan dipindahkan ke halaman detail masing-masing rumpun.

## Glossary

- **Rumpun_Batak**: Enam sub-etnis utama Batak yaitu Toba, Karo, Simalungun, Pakpak, Angkola, dan Mandailing
- **Halaman_Sejarah**: Halaman utama di `/sejarah` yang menampilkan overview sejarah Batak
- **Halaman_Detail_Rumpun**: Halaman individual untuk setiap rumpun di `/sejarah/[rumpun]`
- **Card_Rumpun**: Komponen kartu yang menampilkan gambar dan informasi singkat rumpun
- **Tokoh_Penting**: Bagian yang menampilkan tokoh-tokoh bersejarah dari rumpun tertentu

## Requirements

### Requirement 1: Tampilan Card Rumpun dengan Gambar

**User Story:** As a visitor, I want to see visual cards for each Batak rumpun with representative images, so that I can better understand and identify each sub-ethnic group.

#### Acceptance Criteria

1. WHEN the Halaman_Sejarah loads, THE Card_Rumpun SHALL display a representative image for each of the six Rumpun_Batak
2. THE Card_Rumpun SHALL include the rumpun name, a brief description, and a clickable image
3. WHEN an image fails to load, THE Card_Rumpun SHALL display a fallback placeholder image
4. THE Card_Rumpun SHALL be responsive and display properly on mobile, tablet, and desktop devices

### Requirement 2: Navigasi ke Halaman Detail Rumpun

**User Story:** As a visitor, I want to click on a rumpun card to navigate to its dedicated page, so that I can learn more detailed information about that specific sub-ethnic group.

#### Acceptance Criteria

1. WHEN a user clicks on a Card_Rumpun, THE System SHALL navigate to the corresponding Halaman_Detail_Rumpun at `/sejarah/[rumpun-slug]`
2. THE System SHALL support six routes: `/sejarah/toba`, `/sejarah/karo`, `/sejarah/simalungun`, `/sejarah/pakpak`, `/sejarah/angkola`, `/sejarah/mandailing`
3. WHEN a user navigates to an invalid rumpun route, THE System SHALL display a 404 page

### Requirement 3: Halaman Detail Rumpun

**User Story:** As a visitor, I want to view a dedicated page for each rumpun, so that I can learn comprehensive information about that specific Batak sub-ethnic group.

#### Acceptance Criteria

1. THE Halaman_Detail_Rumpun SHALL display the rumpun name as the page title
2. THE Halaman_Detail_Rumpun SHALL include a hero image representing the rumpun
3. THE Halaman_Detail_Rumpun SHALL contain detailed information about the rumpun's history, culture, and traditions
4. THE Halaman_Detail_Rumpun SHALL include a Tokoh_Penting section showing historical figures from that rumpun
5. THE Halaman_Detail_Rumpun SHALL include navigation back to the main Halaman_Sejarah

### Requirement 4: Penghapusan Konten "Batak di Era Modern"

**User Story:** As a content manager, I want to remove the "Batak di Era Modern" section from the Sejarah page, so that the page focuses specifically on the six rumpun Batak.

#### Acceptance Criteria

1. WHEN the Halaman_Sejarah is rendered, THE System SHALL NOT display the "Batak di Era Modern" section
2. THE System SHALL preserve all other existing content on the Halaman_Sejarah

### Requirement 5: Pemindahan Tokoh Penting ke Halaman Detail

**User Story:** As a visitor, I want to see historical figures on the relevant rumpun detail page, so that I can understand the important people from each specific sub-ethnic group.

#### Acceptance Criteria

1. WHEN the Halaman_Sejarah is rendered, THE System SHALL NOT display the "Tokoh Penting dalam Sejarah Batak" section
2. THE Halaman_Detail_Rumpun SHALL display Tokoh_Penting relevant to that specific rumpun
3. THE Tokoh_Penting section SHALL include the figure's name, title/role, and description

### Requirement 6: Data Rumpun Batak

**User Story:** As a developer, I want rumpun data to be stored in a structured JSON file, so that content can be easily maintained and updated.

#### Acceptance Criteria

1. THE System SHALL store rumpun data in a JSON file at `content/data/rumpun.json`
2. THE rumpun data SHALL include: id, nama, slug, deskripsi, gambar, sejarah, budaya, and tokoh fields
3. WHEN the data file is updated, THE System SHALL reflect changes after rebuild
