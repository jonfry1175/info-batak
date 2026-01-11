# Requirements Document

## Introduction

Fitur upload gambar untuk komentar di InfoBatak.id yang memungkinkan pengguna menambahkan gambar pada komentar mereka, mirip dengan fitur komentar di Facebook. Gambar akan disimpan di Supabase Storage dan ditampilkan inline dengan teks komentar.

## Glossary

- **Comment_Image_System**: Sistem yang mengelola upload, penyimpanan, dan tampilan gambar pada komentar
- **Supabase_Storage**: Layanan penyimpanan file dari Supabase untuk menyimpan gambar
- **Image_Preview**: Tampilan preview gambar sebelum komentar disubmit
- **Comment**: Komentar yang sudah ada di sistem diskusi (dari page-discussions spec)
- **User**: Pengguna yang sudah terautentikasi melalui Supabase Auth

## Requirements

### Requirement 1: Upload Gambar pada Komentar

**User Story:** As a logged-in user, I want to attach an image to my comment, so that I can share visual content in discussions.

#### Acceptance Criteria

1. WHEN a logged-in user clicks the image upload button, THE Comment_Image_System SHALL open a file picker dialog
2. WHEN a user selects an image file, THE Comment_Image_System SHALL validate that the file is an allowed image type (JPEG, PNG, GIF, WebP)
3. WHEN a user selects an image file, THE Comment_Image_System SHALL validate that the file size is under 5MB
4. IF a user selects an invalid file type, THEN THE Comment_Image_System SHALL display an error message in Indonesian
5. IF a user selects a file larger than 5MB, THEN THE Comment_Image_System SHALL display an error message in Indonesian
6. WHEN a valid image is selected, THE Comment_Image_System SHALL display a preview of the image before submission
7. WHEN a user submits a comment with an image, THE Comment_Image_System SHALL upload the image to Supabase Storage and save the URL with the comment

### Requirement 2: Menampilkan Gambar pada Komentar

**User Story:** As a visitor, I want to see images attached to comments, so that I can view visual content shared by other users.

#### Acceptance Criteria

1. WHEN a comment has an attached image, THE Comment_Image_System SHALL display the image below the comment text
2. WHEN displaying an image, THE Comment_Image_System SHALL show a thumbnail that can be clicked to view full size
3. WHEN a user clicks on a comment image, THE Comment_Image_System SHALL open a lightbox/modal showing the full-size image
4. WHEN displaying images, THE Comment_Image_System SHALL use lazy loading for performance optimization
5. IF an image fails to load, THEN THE Comment_Image_System SHALL display a placeholder with error message

### Requirement 3: Menghapus Gambar

**User Story:** As a comment author, I want to remove an attached image, so that I can edit my comment's visual content.

#### Acceptance Criteria

1. WHEN a user is previewing an image before submission, THE Comment_Image_System SHALL provide a remove button
2. WHEN a user clicks remove on preview, THE Comment_Image_System SHALL remove the image from the pending upload
3. WHEN a comment with an image is deleted, THE Comment_Image_System SHALL also delete the image from Supabase Storage

### Requirement 4: Storage dan Security

**User Story:** As a system administrator, I want images stored securely with proper access control, so that the system is protected from abuse.

#### Acceptance Criteria

1. THE Comment_Image_System SHALL store images in a dedicated Supabase Storage bucket named "comment-images"
2. THE Comment_Image_System SHALL generate unique filenames using UUID to prevent conflicts
3. THE Comment_Image_System SHALL enforce Row Level Security so only authenticated users can upload
4. THE Comment_Image_System SHALL allow public read access to uploaded images
5. THE Comment_Image_System SHALL organize images by user_id in the storage path (e.g., `{user_id}/{uuid}.{ext}`)

### Requirement 5: UI/UX Upload Experience

**User Story:** As a user, I want a smooth and intuitive image upload experience, so that adding images to comments feels natural.

#### Acceptance Criteria

1. THE Comment_Image_System SHALL display an image icon button in the comment form
2. WHEN an image is being uploaded, THE Comment_Image_System SHALL show a progress indicator
3. WHEN upload is in progress, THE Comment_Image_System SHALL disable the submit button
4. THE Comment_Image_System SHALL support drag-and-drop image upload onto the comment form
5. THE Comment_Image_System SHALL maintain consistent styling with the site's theme (light/dark mode)
6. WHEN an image is attached, THE Comment_Image_System SHALL show a small preview thumbnail in the form

