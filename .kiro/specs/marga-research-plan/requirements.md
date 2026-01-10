# Requirements Document

## Introduction

Dokumen ini mendefinisikan kebutuhan untuk mengisi data detail 27 marga Batak yang belum memiliki informasi lengkap di file `content/data/marga-detail.json`. Data akan digunakan oleh LLM lain untuk melakukan research dan menghasilkan konten yang akurat secara budaya.

## Glossary

- **Marga**: Sistem klan/keluarga dalam budaya Batak yang menentukan identitas dan hubungan kekerabatan
- **Rumpun**: Kelompok sub-etnis Batak (Toba, Karo, Simalungun, Pakpak, Mandailing, Angkola)
- **Tarombo**: Silsilah atau garis keturunan dalam tradisi Batak
- **Research_Agent**: LLM yang akan melakukan research untuk mengisi data marga
- **Marga_Detail_Schema**: Struktur JSON yang harus diikuti untuk setiap entri marga

## Requirements

### Requirement 1: Research Prompt Template

**User Story:** Sebagai developer, saya ingin memiliki template prompt yang terstruktur, sehingga LLM dapat melakukan research marga secara konsisten.

#### Acceptance Criteria

1. THE Research_Prompt_Template SHALL include clear instructions for researching each marga field
2. THE Research_Prompt_Template SHALL specify the exact JSON schema to follow
3. THE Research_Prompt_Template SHALL include example output from existing marga data (Sitorus, Ginting, Nasution)
4. THE Research_Prompt_Template SHALL emphasize cultural accuracy and sensitivity
5. THE Research_Prompt_Template SHALL specify minimum content requirements for each field

### Requirement 2: Data Schema Compliance

**User Story:** Sebagai developer, saya ingin output research mengikuti schema yang sudah ada, sehingga data dapat langsung diintegrasikan ke sistem.

#### Acceptance Criteria

1. WHEN Research_Agent generates marga data, THE output SHALL follow the Marga_Detail_Schema exactly
2. THE Marga_Detail_Schema SHALL include: margaId, slug, sejarah, asalUsul, tarombo, wilayah, tradisi, tokoh, relatedMargas, updatedAt
3. WHEN tarombo field is generated, THE output SHALL include description, ancestors array, and subMargas array
4. WHEN wilayah field is generated, THE output SHALL include nama, deskripsi, latitude, longitude, provinsi, kabupaten
5. WHEN tokoh field is generated, THE output SHALL include nama, gelar, bidang, deskripsi for each tokoh

### Requirement 3: Research Coverage by Rumpun

**User Story:** Sebagai developer, saya ingin research mencakup semua 27 marga yang belum lengkap, sehingga database marga menjadi komprehensif.

#### Acceptance Criteria

1. THE Research_Plan SHALL cover 5 marga Toba: Siahaan, Simbolon, Sinaga, Hutabarat, Napitupulu
2. THE Research_Plan SHALL cover 4 marga Karo: Sembiring, Tarigan, Karo-Karo, Perangin-angin
3. THE Research_Plan SHALL cover 5 marga Simalungun: Saragih, Purba, Sinaga, Damanik, Simatupang
4. THE Research_Plan SHALL cover 4 marga Pakpak: Tumanggor, Manik, Banurea, Bancin
5. THE Research_Plan SHALL cover 4 marga Mandailing: Lubis, Rangkuti, Daulay, Hasibuan
6. THE Research_Plan SHALL cover 5 marga Angkola: Harahap, Siregar, Rambe, Batubara, Pohan

### Requirement 4: Content Quality Guidelines

**User Story:** Sebagai developer, saya ingin konten yang dihasilkan berkualitas tinggi dan akurat secara budaya, sehingga website dapat dipercaya sebagai sumber informasi Batak.

#### Acceptance Criteria

1. THE Research_Agent SHALL prioritize academic and cultural sources over general web content
2. WHEN information is uncertain, THE Research_Agent SHALL indicate uncertainty rather than fabricate details
3. THE Research_Agent SHALL use proper Batak terminology with Indonesian explanations
4. THE Research_Agent SHALL include at least 2 ancestors in tarombo for each marga
5. THE Research_Agent SHALL include at least 2 sub-margas for each marga where applicable
6. THE Research_Agent SHALL include at least 2 tradisi items for each marga
7. THE Research_Agent SHALL include at least 1 tokoh (historical or contemporary figure) for each marga

### Requirement 5: Batch Processing Structure

**User Story:** Sebagai developer, saya ingin research dibagi dalam batch yang manageable, sehingga proses dapat dilakukan secara bertahap dan terverifikasi.

#### Acceptance Criteria

1. THE Research_Plan SHALL organize marga into batches by rumpun
2. WHEN processing a batch, THE Research_Agent SHALL complete all marga in that rumpun before moving to next
3. THE Research_Plan SHALL specify validation checkpoints after each batch
4. THE Research_Plan SHALL include instructions for merging output into marga-detail.json
