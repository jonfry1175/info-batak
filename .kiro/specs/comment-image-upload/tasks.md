# Implementation Plan: Comment Image Upload

## Overview

Implementasi fitur upload gambar untuk komentar di InfoBatak.id. Menggunakan Supabase Storage untuk penyimpanan dan terintegrasi dengan sistem diskusi yang sudah ada.

## Tasks

- [x] 1. Setup database dan storage
  - [x] 1.1 Tambah kolom image_url di tabel comments
    - Jalankan migration untuk menambah kolom `image_url TEXT DEFAULT NULL`
    - Tambah index untuk query optimization
    - _Requirements: 4.1_
  - [x] 1.2 Setup Supabase Storage bucket
    - Buat bucket "comment-images" dengan public access
    - Setup RLS policies untuk upload (authenticated only) dan read (public)
    - _Requirements: 4.1, 4.3, 4.4_

- [x] 2. Implementasi image upload utilities
  - [x] 2.1 Buat fungsi validasi file di `lib/image-upload.ts`
    - Validasi MIME type (JPEG, PNG, GIF, WebP)
    - Validasi file size (max 5MB)
    - Return error codes untuk pesan Indonesia
    - _Requirements: 1.2, 1.3, 1.4, 1.5_
  - [x] 2.2 Write property test untuk file validation
    - **Property 1: File Type Validation**
    - **Property 2: File Size Validation**
    - **Validates: Requirements 1.2, 1.3**
  - [x] 2.3 Buat fungsi generate storage path
    - Format: `{user_id}/{uuid}.{extension}`
    - Gunakan crypto.randomUUID() untuk unique filename
    - _Requirements: 4.2, 4.5_
  - [x] 2.4 Write property test untuk storage path generation
    - **Property 4: Unique Filename Generation**
    - **Property 5: Storage Path Structure**
    - **Validates: Requirements 4.2, 4.5**
  - [x] 2.5 Buat fungsi upload image ke Supabase Storage
    - Upload file ke bucket "comment-images"
    - Return public URL setelah upload sukses
    - Handle errors dengan error codes
    - _Requirements: 1.7, 4.1_
  - [x] 2.6 Buat fungsi delete image dari Storage
    - Delete file berdasarkan path
    - Handle errors gracefully
    - _Requirements: 3.3_

- [x] 3. Checkpoint - Validasi utilities
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implementasi useImageUpload hook
  - [x] 4.1 Buat hook `useImageUpload` di `hooks/useImageUpload.ts`
    - State: selectedFile, previewUrl, isUploading, uploadProgress, error
    - Actions: selectImage, removeImage, uploadImage, resetState
    - Generate preview URL dengan URL.createObjectURL
    - Cleanup preview URL on unmount
    - _Requirements: 1.6, 3.1, 3.2, 5.2, 5.3_
  - [x] 4.2 Write property test untuk preview state management
    - **Property 6: Preview State Management**
    - **Validates: Requirements 3.2**

- [x] 5. Implementasi UI components
  - [x] 5.1 Buat komponen ImageUpload di `components/discussion/ImageUpload.tsx`
    - File input dengan accept untuk image types
    - Drag-and-drop support
    - Icon button untuk trigger file picker
    - Theme-aware styling (light/dark mode)
    - _Requirements: 1.1, 5.1, 5.4, 5.5_
  - [x] 5.2 Buat komponen ImagePreview di `components/discussion/ImagePreview.tsx`
    - Tampilkan thumbnail preview
    - Remove button untuk hapus gambar
    - Loading indicator saat upload
    - _Requirements: 1.6, 3.1, 5.2, 5.6_
  - [x] 5.3 Buat komponen CommentImage di `components/discussion/CommentImage.tsx`
    - Tampilkan gambar dengan lazy loading
    - Click handler untuk buka lightbox
    - Error placeholder jika gagal load
    - _Requirements: 2.1, 2.2, 2.4, 2.5_
  - [x] 5.4 Buat komponen Lightbox di `components/discussion/Lightbox.tsx`
    - Modal full-screen untuk gambar
    - Close button dan click outside to close
    - Keyboard support (Escape to close)
    - _Requirements: 2.3_

- [-] 6. Checkpoint - Validasi UI components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Integrasi dengan sistem diskusi
  - [ ] 7.1 Update CommentForm untuk support image upload
    - Tambah ImageUpload dan ImagePreview components
    - Disable submit saat uploading
    - Upload image sebelum create comment
    - Pass image_url ke createComment
    - _Requirements: 1.7, 5.3_
  - [ ] 7.2 Update fungsi createComment di `lib/discussion.ts`
    - Tambah parameter optional imageUrl
    - Simpan image_url ke database
    - _Requirements: 1.7_
  - [ ] 7.3 Update CommentItem untuk tampilkan gambar
    - Render CommentImage jika image_url ada
    - Integrate Lightbox untuk full-size view
    - _Requirements: 2.1, 2.2, 2.3_
  - [ ] 7.4 Update deleteComment untuk hapus gambar dari storage
    - Fetch image_url sebelum delete
    - Delete image dari storage setelah delete comment
    - _Requirements: 3.3_
  - [ ] 7.5 Write property test untuk cascade delete
    - **Property 7: Cascade Delete Storage**
    - **Validates: Requirements 3.3**

- [ ] 8. Update types
  - [ ] 8.1 Update TypeScript types di `types/index.ts`
    - Tambah image_url ke Comment interface
    - Tambah ImageUploadError type
    - Tambah imageErrorMessages constant
    - _Requirements: 1.4, 1.5_

- [ ] 9. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Supabase Storage bucket harus dibuat manual via dashboard atau migration
- Image URL akan public accessible setelah upload
- Cascade delete image saat comment dihapus penting untuk storage cleanup

