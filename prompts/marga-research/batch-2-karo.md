# Research Task: Data Detail Marga Batak Karo

## Konteks
Anda adalah peneliti budaya Batak yang bertugas mengisi data detail marga untuk website InfoBatak.id. Website ini bertujuan melestarikan dan mengedukasi tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak.

## Tugas
Lakukan research mendalam untuk 4 marga berikut dari rumpun **Karo** (Merga Silima):

| ID | Nama | Slug | Deskripsi |
|----|------|------|-----------|
| 8 | Sembiring | sembiring | Marga Karo yang besar dan terhormat |
| 9 | Tarigan | tarigan | Bagian dari merga silima Karo |
| 10 | Karo-Karo | karo-karo | Marga utama Karo |
| 11 | Perangin-angin | perangin-angin | Salah satu merga silima Karo |

## Schema JSON yang HARUS Diikuti

```json
{
  "margaId": "[ID dari tabel di atas]",
  "slug": "[slug dari tabel di atas]",
  "sejarah": "[Paragraf 2-3 kalimat tentang sejarah marga]",
  "asalUsul": "[Paragraf 2-3 kalimat tentang asal usul dan penamaan marga]",
  "tarombo": {
    "description": "[Deskripsi singkat tentang tarombo/silsilah marga]",
    "ancestors": [
      {
        "nama": "[Nama leluhur]",
        "gelar": "[Gelar jika ada, optional]",
        "deskripsi": "[Deskripsi singkat tentang leluhur]"
      }
    ],
    "subMargas": [
      {
        "nama": "[Nama sub-marga/cabang]",
        "deskripsi": "[Deskripsi singkat tentang sub-marga]"
      }
    ]
  },
  "wilayah": {
    "nama": "[Nama wilayah asal]",
    "deskripsi": "[Deskripsi tentang wilayah dan karakteristiknya]",
    "latitude": [koordinat latitude],
    "longitude": [koordinat longitude],
    "provinsi": "Sumatera Utara",
    "kabupaten": "Karo"
  },
  "tradisi": [
    "[Tradisi/ritual khas marga 1]",
    "[Tradisi/ritual khas marga 2]"
  ],
  "tokoh": [
    {
      "nama": "[Nama tokoh]",
      "gelar": "[Gelar/jabatan]",
      "bidang": "[Bidang: Adat/Militer/Politik/Pendidikan/Seni/dll]",
      "deskripsi": "[Deskripsi singkat tentang tokoh]"
    }
  ],
  "relatedMargas": ["[slug marga terkait 1]", "[slug marga terkait 2]"],
  "updatedAt": "2025-01-10"
}
```

## Slug Marga Valid untuk relatedMargas

Gunakan HANYA slug berikut untuk field relatedMargas:
- Toba: sitorus, siahaan, simbolon, sinaga, hutabarat, napitupulu
- Karo: ginting, sembiring, tarigan, karo-karo, perangin-angin
- Simalungun: saragih, purba, damanik, simatupang
- Pakpak: tumanggor, manik, banurea, bancin
- Mandailing: nasution, lubis, rangkuti, daulay, hasibuan
- Angkola: harahap, siregar, rambe, batubara, pohan

## Contoh Output yang Benar (Ginting - Karo)

```json
{
  "margaId": "7",
  "slug": "ginting",
  "sejarah": "Marga Ginting adalah bagian dari Merga Silima dalam budaya Karo dan memiliki peran penting dalam struktur pemerintahan adat di Tanah Karo.",
  "asalUsul": "Nama Ginting diyakini berasal dari leluhur yang menetap di wilayah Kabanjahe dan sekitarnya. Garis keturunan dijaga ketat melalui aturan perkawinan Merga Silima.",
  "tarombo": {
    "description": "Tarombo Ginting menempatkan leluhur sebagai penjaga adat dan penyebar nilai gotong royong di dataran tinggi Karo.",
    "ancestors": [
      {
        "nama": "Guru Kinayan",
        "deskripsi": "Leluhur yang menjadi rujukan beberapa cabang marga Ginting."
      },
      {
        "nama": "Sembiring Pelawi",
        "deskripsi": "Tokoh yang menjaga hubungan antar merga di Tanah Karo."
      }
    ],
    "subMargas": [
      {
        "nama": "Ginting Mergana",
        "deskripsi": "Sub-marga yang banyak ditemukan di wilayah Kabanjahe."
      },
      {
        "nama": "Ginting Suka",
        "deskripsi": "Cabang yang dikenal sebagai penjaga lahan ladang di perbukitan."
      }
    ]
  },
  "wilayah": {
    "nama": "Kabanjahe, Tanah Karo",
    "deskripsi": "Berada di dataran tinggi Karo dengan tradisi ladang dan kebun yang kuat serta kedekatan dengan Gunung Sinabung.",
    "latitude": 3.1034,
    "longitude": 98.4891,
    "provinsi": "Sumatera Utara",
    "kabupaten": "Karo"
  },
  "tradisi": [
    "Erpangir ku lau sebagai ritual pembersihan diri dan kampung",
    "Perkulunen untuk mengatur tata cara pesta adat Ginting"
  ],
  "tokoh": [
    {
      "nama": "Djamin Ginting",
      "gelar": "Letjen TNI",
      "bidang": "Militer",
      "deskripsi": "Pahlawan nasional dari Tanah Karo yang dikenal memperjuangkan kemerdekaan."
    }
  ],
  "relatedMargas": ["tarigan", "karo-karo"],
  "updatedAt": "2024-02-20"
}
```

## Panduan Kualitas Konten

### WAJIB:
1. Gunakan terminologi Karo yang benar (Merga Silima, rakut sitelu, erpangir ku lau, perkulunen, dll)
2. Minimal 2 ancestors dalam tarombo
3. Minimal 2 sub-marga dalam tarombo
4. Minimal 2 tradisi khas marga
5. Minimal 1 tokoh (historis atau kontemporer)
6. Koordinat wilayah yang akurat (sekitar Tanah Karo/Kabanjahe)
7. relatedMargas harus menggunakan slug yang valid (prioritas sesama Karo)

### HINDARI:
1. Jangan fabrikasi informasi jika tidak yakin
2. Jangan copy-paste dari marga lain
3. Jangan campur terminologi Toba dengan Karo

### JIKA INFORMASI TIDAK TERSEDIA:
- Untuk ancestors: gunakan leluhur generik Karo
- Untuk tokoh: cari tokoh kontemporer dari marga tersebut
- Untuk tradisi: gunakan tradisi umum Karo yang relevan

## Output Format

Hasilkan output dalam format JSON array yang valid dengan 4 marga:

```json
[
  { /* Sembiring */ },
  { /* Tarigan */ },
  { /* Karo-Karo */ },
  { /* Perangin-angin */ }
]
```
