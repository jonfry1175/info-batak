# Implementation Plan: Marga Research Plan

## Overview

Task list untuk mengeksekusi research 27 marga Batak yang belum memiliki data detail. Research dibagi dalam 6 batch berdasarkan rumpun, dengan setiap batch menghasilkan JSON yang akan dimerge ke `content/data/marga-detail.json`.

## Tasks

- [x] 1. Persiapan Research Environment
  - Buat file prompt template per batch di folder `prompts/marga-research/`
  - Siapkan referensi marga.json untuk setiap batch
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Batch 1: Research Marga Toba (5 marga)
  - [x] 2.1 Generate prompt untuk Toba batch
    - Marga: Siahaan (id:2), Simbolon (id:3), Sinaga (id:4), Hutabarat (id:5), Napitupulu (id:6)
    - Gunakan template dari design.md
    - _Requirements: 3.1_
  - [x] 2.2 Execute research dengan LLM
    - Jalankan prompt ke LLM researcher
    - Simpan output ke `prompts/marga-research/output-toba.json`
    - _Requirements: 2.1, 4.1, 4.2, 4.3_
  - [x] 2.3 Validasi output Toba
    - Cek schema compliance
    - Cek minimum content requirements
    - Cek relatedMargas validity
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 3. Batch 2: Research Marga Karo (4 marga)
  - [x] 3.1 Generate prompt untuk Karo batch
    - Marga: Sembiring (id:8), Tarigan (id:9), Karo-Karo (id:10), Perangin-angin (id:11)
    - Gunakan template dari design.md
    - _Requirements: 3.2_
  - [x] 3.2 Execute research dengan LLM
    - Jalankan prompt ke LLM researcher
    - Simpan output ke `prompts/marga-research/output-karo.json`
    - _Requirements: 2.1, 4.1, 4.2, 4.3_
  - [x] 3.3 Validasi output Karo
    - Cek schema compliance
    - Cek minimum content requirements
    - Cek relatedMargas validity
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 4. Batch 3: Research Marga Simalungun (5 marga)
  - [x] 4.1 Generate prompt untuk Simalungun batch
    - Marga: Saragih (id:12), Purba (id:13), Sinaga (id:14), Damanik (id:15), Simatupang (id:16)
    - Gunakan template dari design.md
    - _Requirements: 3.3_
  - [x] 4.2 Execute research dengan LLM
    - Jalankan prompt ke LLM researcher
    - Simpan output ke `prompts/marga-research/output-simalungun.json`
    - _Requirements: 2.1, 4.1, 4.2, 4.3_
  - [x] 4.3 Validasi output Simalungun
    - Cek schema compliance
    - Cek minimum content requirements
    - Cek relatedMargas validity
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 5. Batch 4: Research Marga Pakpak (4 marga)
  - [x] 5.1 Generate prompt untuk Pakpak batch
    - Marga: Tumanggor (id:17), Manik (id:18), Banurea (id:19), Bancin (id:20)
    - Gunakan template dari design.md
    - _Requirements: 3.4_
  - [x] 5.2 Execute research dengan LLM
    - Jalankan prompt ke LLM researcher
    - Simpan output ke `prompts/marga-research/output-pakpak.json`
    - _Requirements: 2.1, 4.1, 4.2, 4.3_
  - [x] 5.3 Validasi output Pakpak
    - Cek schema compliance
    - Cek minimum content requirements
    - Cek relatedMargas validity
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 6. Batch 5: Research Marga Mandailing (4 marga)
  - [x] 6.1 Generate prompt untuk Mandailing batch
    - Marga: Lubis (id:22), Rangkuti (id:23), Daulay (id:24), Hasibuan (id:25)
    - Gunakan template dari design.md
    - _Requirements: 3.5_
  - [x] 6.2 Execute research dengan LLM
    - Jalankan prompt ke LLM researcher
    - Simpan output ke `prompts/marga-research/output-mandailing.json`
    - _Requirements: 2.1, 4.1, 4.2, 4.3_
  - [x] 6.3 Validasi output Mandailing
    - Cek schema compliance
    - Cek minimum content requirements
    - Cek relatedMargas validity
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 7. Batch 6: Research Marga Angkola (5 marga)
  - [x] 7.1 Generate prompt untuk Angkola batch
    - Marga: Harahap (id:26), Siregar (id:27), Rambe (id:28), Batubara (id:29), Pohan (id:30)
    - Gunakan template dari design.md
    - _Requirements: 3.6_
  - [x] 7.2 Execute research dengan LLM
    - Jalankan prompt ke LLM researcher
    - Simpan output ke `prompts/marga-research/output-angkola.json`
    - _Requirements: 2.1, 4.1, 4.2, 4.3_
  - [x] 7.3 Validasi output Angkola
    - Cek schema compliance
    - Cek minimum content requirements
    - Cek relatedMargas validity
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 8. Checkpoint - Review semua output
  - Review semua 6 batch output
  - Pastikan tidak ada duplikasi atau konflik
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Merge ke marga-detail.json
  - [x] 9.1 Merge semua output ke content/data/marga-detail.json
    - Gabungkan 27 marga baru dengan 3 marga existing
    - Pastikan array sorted by margaId
    - _Requirements: 5.4_
  - [x] 9.2 Final validation
    - Validasi final JSON file
    - Cek total 30 marga entries
    - _Requirements: 2.1, 2.2_

- [x] 10. Final Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Semua tasks termasuk validasi adalah required
- Setiap batch dapat dieksekusi secara independen
- Output disimpan terpisah per batch untuk memudahkan review
- Merge dilakukan setelah semua batch selesai dan tervalidasi
