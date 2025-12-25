# Requirements Document

## Introduction

Fitur autentikasi untuk InfoBatak.id menggunakan Supabase sebagai backend authentication. Sistem ini memungkinkan pengguna untuk mendaftar dan masuk menggunakan akun Google OAuth. Fitur ini mencakup skema database user sederhana, tombol navigasi untuk akses autentikasi, serta halaman register dan login yang terintegrasi dengan Supabase Auth.

## Glossary

- **Supabase**: Platform backend-as-a-service yang menyediakan database PostgreSQL dan layanan autentikasi
- **OAuth**: Protokol autentikasi yang memungkinkan login menggunakan akun pihak ketiga (Google)
- **User Schema**: Struktur tabel database untuk menyimpan data pengguna
- **Auth System**: Sistem autentikasi yang mengelola proses login, register, dan session management
- **Navbar**: Komponen navigasi utama website yang menampilkan menu dan tombol akses

## Requirements

### Requirement 1

**User Story:** As a visitor, I want to see authentication buttons in the navbar, so that I can easily access login and register functionality.

#### Acceptance Criteria

1. WHEN a visitor views the navbar THEN the Auth System SHALL display a "Daftar/Masuk" button that is visible and accessible
2. WHEN a user clicks the "Daftar/Masuk" button THEN the Auth System SHALL navigate the user to the login page
3. WHILE a user is authenticated THEN the Auth System SHALL display the user's profile information or avatar instead of the "Daftar/Masuk" button
4. WHEN an authenticated user clicks their profile THEN the Auth System SHALL display a dropdown menu with logout option

### Requirement 2

**User Story:** As a visitor, I want to register and login using my Google account, so that I can access the website without creating a new password.

#### Acceptance Criteria

1. WHEN a visitor accesses the login page THEN the Auth System SHALL display a "Masuk dengan Google" button
2. WHEN a visitor clicks the "Masuk dengan Google" button THEN the Auth System SHALL initiate Google OAuth flow via Supabase
3. WHEN Google OAuth authentication succeeds THEN the Auth System SHALL create or retrieve the user record and establish a session
4. WHEN Google OAuth authentication fails THEN the Auth System SHALL display an appropriate error message to the user
5. WHEN a visitor accesses the register page THEN the Auth System SHALL display the same Google OAuth option as the login page

### Requirement 3

**User Story:** As a system administrator, I want a simple user schema in Supabase, so that I can store and manage user data efficiently.

#### Acceptance Criteria

1. WHEN a new user authenticates via Google OAuth THEN the User Schema SHALL store the user's id, email, display name, and avatar URL
2. WHEN user data is stored THEN the User Schema SHALL include created_at and updated_at timestamps
3. WHEN querying user data THEN the User Schema SHALL enforce Row Level Security (RLS) policies to protect user information

### Requirement 4

**User Story:** As a developer, I want clear documentation for Supabase environment setup, so that I can configure the authentication system correctly.

#### Acceptance Criteria

1. WHEN setting up the project THEN the Auth System SHALL require NEXT_PUBLIC_SUPABASE_URL environment variable
2. WHEN setting up the project THEN the Auth System SHALL require NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable
3. WHEN environment variables are missing THEN the Auth System SHALL provide clear error messages indicating which variables are required
4. WHEN documenting setup THEN the Auth System SHALL include instructions for configuring Google OAuth in Supabase dashboard

### Requirement 5

**User Story:** As a user, I want to logout from my account, so that I can secure my session when using shared devices.

#### Acceptance Criteria

1. WHEN an authenticated user clicks the logout option THEN the Auth System SHALL terminate the user's session
2. WHEN logout succeeds THEN the Auth System SHALL redirect the user to the homepage
3. WHEN logout succeeds THEN the Auth System SHALL update the navbar to show the "Daftar/Masuk" button
