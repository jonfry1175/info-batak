# InfoBatak.id - Portal Budaya Batak

Portal informasi digital yang menyajikan konten tentang sejarah, budaya, adat, aksara, dan sistem marga Batak secara modern dan informatif.

## 🚀 Fitur Utama

### 1. **Halaman Aksara Batak** (`/budaya/aksara-batak`)
Halaman edukatif yang menjelaskan:
- Definisi dan sejarah Aksara Batak
- Ina ni Surat (19 huruf induk)
- Anak ni Surat (tanda diakritik)
- Panduan membaca aksara dengan contoh

### 2. **Halaman Marga Interaktif** (`/marga`)
Fitur pencarian marga dengan:
- Filter untuk 6 rumpun: Toba, Karo, Simalungun, Pakpak, Angkola, Mandailing
- Galeri kartu marga yang responsif
- Animasi smooth dengan Framer Motion
- 30+ data marga dari berbagai rumpun

### 3. **Komponen "Tahukah Kamu?"**
Komponen reusable yang menampilkan fakta menarik:
- Data dari `content/data/fakta.json` (12 fakta)
- Ditampilkan di Homepage (random)
- Di Sidebar halaman Sejarah
- Dapat diembed di konten Markdown

### 4. **Dark Mode Toggle**
- Tombol toggle di Navbar
- Persisten dengan localStorage
- Smooth transition
- Mendukung system preference

## 📁 Struktur Project

```
info-batak/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout dengan Navbar & Footer
│   ├── page.tsx                 # Homepage
│   ├── sejarah/                 # Halaman Sejarah (dengan sidebar)
│   ├── marga/                   # Halaman Marga Interaktif
│   ├── budaya/
│   │   ├── aksara-batak/       # Halaman Aksara Batak
│   │   ├── adat-istiadat/      # Halaman Adat Istiadat
│   │   └── kesenian/           # Halaman Kesenian
│   ├── berita/                  # Halaman Berita (placeholder)
│   └── tentang/                 # Halaman Tentang
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation dengan dark mode toggle
│   │   ├── Footer.tsx          # Footer
│   │   └── Sidebar.tsx         # Sidebar dengan TahukahKamu
│   ├── ui/
│   │   ├── DarkModeToggle.tsx  # Toggle button
│   │   └── TahukahKamu.tsx     # Did You Know component
│   └── ThemeProvider.tsx       # next-themes provider
│
├── content/
│   └── data/
│       ├── fakta.json          # 12 fakta menarik
│       └── marga.json          # 30 data marga
│
├── lib/
│   └── data.ts                 # Helper functions untuk data
│
├── types/
│   └── index.ts                # TypeScript types
│
└── public/                     # Static assets
```

## 🎨 Desain & Tema

### Color Palette (Bendera Batak)
- **Light Mode:**
  - Background: `#FEFEFE` (Putih)
  - Foreground: `#212121` (Hitam)
  - Accent: `#C1272D` (Merah Batak)

- **Dark Mode:**
  - Background: `#212121` (Hitam)
  - Foreground: `#FFFFFF` (Putih)
  - Accent: `#C1272D` (Merah Batak - konsisten)

### Typography
- Primary Font: Geist Sans
- Monospace Font: Geist Mono

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router) dengan Static Export
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Theme:** next-themes
- **Markdown:** gray-matter, remark, remark-html

## 📦 Installation & Development

### Prerequisites
- Node.js 18+
- npm atau yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000)

### Build for Production (Static Export)
```bash
npm run build
```

Output akan berada di folder `out/` sebagai static HTML yang siap di-deploy.

### Preview Production Build
```bash
npx serve out
```

## 🚀 Deployment

Karena website ini adalah static site, dapat di-deploy ke:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- Any static hosting service

### Deploy ke Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📝 Content Management

### Menambahkan Fakta Baru
Edit `content/data/fakta.json`:
```json
{
  "id": "13",
  "teks": "Fakta menarik tentang budaya Batak...",
  "kategori": "Kategori"
}
```

### Menambahkan Marga Baru
Edit `content/data/marga.json`:
```json
{
  "id": "31",
  "nama": "Nama Marga",
  "rumpun": "Toba",
  "deskripsi": "Deskripsi singkat"
}
```

## 🎯 Roadmap

- [ ] Sistem blog dengan Markdown support
- [ ] Search functionality
- [ ] Multi-language support (Bahasa Batak)
- [ ] Aksara Batak font integration
- [ ] Interactive genealogy tree
- [ ] Audio untuk musik Gondang
- [ ] Video tutorial Tortor

## 📄 License

Copyright © 2025 InfoBatak.id. All rights reserved.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ for preserving Batak culture**
