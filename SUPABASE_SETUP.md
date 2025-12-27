# Supabase Authentication Setup Guide

Panduan lengkap untuk mengkonfigurasi autentikasi Supabase dengan Google OAuth untuk InfoBatak.id.

## Daftar Isi

1. [Environment Variables](#environment-variables)
2. [Membuat Project Supabase](#membuat-project-supabase)
3. [Konfigurasi Google OAuth](#konfigurasi-google-oauth)
4. [Setup Database](#setup-database)
5. [Testing](#testing)

---

## Environment Variables

### Required Variables

Buat file `.env.local` di root project dengan variabel berikut:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Cara Mendapatkan Values

1. **NEXT_PUBLIC_SUPABASE_URL**:
   - Buka Supabase Dashboard → Project Settings → API
   - Copy nilai dari "Project URL"

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**:
   - Buka Supabase Dashboard → Project Settings → API
   - Copy nilai dari "anon public" key (bukan service_role!)

### Contoh .env.local

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Penting**: Jangan commit file `.env.local` ke repository. File ini sudah ada di `.gitignore`.

---

## Membuat Project Supabase

### Langkah 1: Buat Akun & Project

1. Kunjungi [supabase.com](https://supabase.com) dan buat akun
2. Klik "New Project"
3. Isi detail project:
   - **Name**: `infobatak` (atau nama lain)
   - **Database Password**: Buat password yang kuat
   - **Region**: Pilih region terdekat (Singapore untuk Indonesia)
4. Klik "Create new project" dan tunggu hingga selesai

### Langkah 2: Catat Credentials

Setelah project dibuat:

1. Buka **Project Settings** → **API**
2. Catat:
   - Project URL
   - anon public key

---

## Konfigurasi Google OAuth

### Langkah 1: Setup Google Cloud Console

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang ada
3. Buka **APIs & Services** → **Credentials**
4. Klik **Create Credentials** → **OAuth client ID**

### Langkah 2: Konfigurasi OAuth Consent Screen

Jika belum ada, konfigurasikan OAuth consent screen:

1. Buka **APIs & Services** → **OAuth consent screen**
2. Pilih **External** (untuk production) atau **Internal** (untuk testing)
3. Isi informasi aplikasi:
   - **App name**: InfoBatak.id
   - **User support email**: email Anda
   - **Developer contact**: email Anda
4. Klik **Save and Continue**
5. Di bagian Scopes, tambahkan:
   - `email`
   - `profile`
   - `openid`
6. Klik **Save and Continue** hingga selesai

### Langkah 3: Buat OAuth Client ID

1. Kembali ke **Credentials** → **Create Credentials** → **OAuth client ID**
2. Pilih **Application type**: Web application
3. **Name**: InfoBatak Auth
4. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-domain.com
   ```
5. **Authorized redirect URIs**:
   ```
   https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
   ```
   > Ganti `YOUR-PROJECT-ID` dengan ID project Supabase Anda
6. Klik **Create**
7. Catat **Client ID** dan **Client Secret**

### Langkah 4: Aktifkan Google Provider di Supabase

1. Buka Supabase Dashboard → **Authentication** → **Providers**
2. Cari **Google** dan klik untuk expand
3. Toggle **Enable Sign in with Google**
4. Masukkan:
   - **Client ID**: dari Google Cloud Console
   - **Client Secret**: dari Google Cloud Console
5. Klik **Save**

### Langkah 5: Konfigurasi Redirect URLs

1. Buka Supabase Dashboard → **Authentication** → **URL Configuration**
2. Tambahkan di **Redirect URLs**:
   ```
   http://localhost:3000
   http://localhost:3000/login
   https://your-domain.com
   https://your-domain.com/login
   ```

---

## Setup Database

### Menjalankan Migration

1. Buka Supabase Dashboard → **SQL Editor**
2. Klik **New query**
3. Copy seluruh isi file `supabase/migrations/001_profiles.sql`
4. Paste ke SQL Editor
5. Klik **Run** untuk menjalankan migration

### Verifikasi Setup

Setelah menjalankan migration, verifikasi:

1. **Table profiles**: Buka **Table Editor** → pastikan table `profiles` ada
2. **RLS Policies**: Buka **Authentication** → **Policies** → pastikan ada 3 policies untuk table profiles
3. **Trigger**: Buka **Database** → **Triggers** → pastikan trigger `on_auth_user_created` ada

### Schema Overview

```
profiles
├── id (UUID, PK, FK → auth.users)
├── email (TEXT, NOT NULL)
├── display_name (TEXT, nullable)
├── avatar_url (TEXT, nullable)
├── created_at (TIMESTAMPTZ)
└── updated_at (TIMESTAMPTZ)
```

---

## Testing

### Test di Development

1. Pastikan environment variables sudah di-set di `.env.local`
2. Jalankan development server:
   ```bash
   pnpm dev
   ```
3. Buka `http://localhost:3000`
4. Klik "Daftar/Masuk" di navbar
5. Klik "Masuk dengan Google"
6. Login dengan akun Google
7. Verifikasi:
   - User ter-redirect ke homepage
   - Navbar menampilkan avatar user
   - Profile tersimpan di database (cek di Supabase Table Editor)

### Troubleshooting

#### Error: "Invalid redirect URL"

- Pastikan URL sudah ditambahkan di Supabase Authentication → URL Configuration
- Pastikan URL di Google Cloud Console Authorized redirect URIs sudah benar

#### Error: "Missing environment variables"

- Pastikan file `.env.local` ada dan berisi nilai yang benar
- Restart development server setelah mengubah `.env.local`

#### Error: "OAuth error"

- Pastikan Client ID dan Client Secret di Supabase sudah benar
- Pastikan Google OAuth consent screen sudah dikonfigurasi

#### Profile tidak tersimpan di database

- Pastikan migration sudah dijalankan
- Cek apakah trigger `on_auth_user_created` aktif
- Cek logs di Supabase Dashboard → Logs

---

## Production Deployment

Untuk deployment ke production:

1. Set environment variables di hosting platform (Vercel, Netlify, dll)
2. Tambahkan production URL ke:
   - Supabase Authentication → URL Configuration
   - Google Cloud Console → Authorized redirect URIs
3. Update Google OAuth consent screen ke production mode jika diperlukan

---

## Referensi

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Google OAuth Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
