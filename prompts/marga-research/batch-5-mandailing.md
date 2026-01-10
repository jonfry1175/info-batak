# Research Task: Data Detail Marga Batak Mandailing

## Konteks
Anda adalah peneliti budaya Batak yang bertugas mengisi data detail marga untuk website InfoBatak.id. Website ini bertujuan melestarikan dan mengedukasi tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak.

## Tugas
Lakukan research mendalam untuk 4 marga berikut dari rumpun **Mandailing**:

| ID | Nama | Slug | Deskripsi |
|----|------|------|-----------|
| 22 | Lubis | lubis | Marga Mandailing yang tersebar luas |
| 23 | Rangkuti | rangkuti | Marga Mandailing yang terkenal |
| 24 | Daulay | daulay | Marga Mandailing yang populer |
| 25 | Hasibuan | hasibuan | Marga besar Mandailing |

**Catatan:** Nasution (id:21) sudah ada datanya, jadi tidak perlu di-research.

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
    "kabupaten": "Mandailing Natal"
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

## Contoh Output yang Benar (Nasution - Mandailing)

```json
{
  "margaId": "21",
  "slug": "nasution",
  "sejarah": "Marga Nasution berasal dari Mandailing Godang dengan sejarah panjang dalam perdagangan dan pendidikan di Sumatera Utara.",
  "asalUsul": "Asal usul Nasution dikaitkan dengan keturunan Nasution yang bermukim di Pidoli dan Hutapungkut sebelum menyebar ke berbagai wilayah rantau.",
  "tarombo": {
    "description": "Tarombo Nasution menekankan hubungan erat antar mora, kahanggi, dan anak boru dalam struktur Mandailing.",
    "ancestors": [
      {
        "nama": "Ompu Nasution",
        "deskripsi": "Leluhur yang menjadi rujukan utama banyak cabang Nasution."
      }
    ],
    "subMargas": [
      {
        "nama": "Nasution Pidoli",
        "deskripsi": "Cabang yang menjaga tradisi ulos bulang dan gondang Naposo."
      },
      {
        "nama": "Nasution Hutapungkut",
        "deskripsi": "Cabang yang berkembang di daerah Mandailing Julu."
      }
    ]
  },
  "wilayah": {
    "nama": "Mandailing Godang",
    "deskripsi": "Wilayah asal di sepanjang aliran Sungai Batang Gadis dengan budaya agraris dan literasi Al-Qur'an yang kuat.",
    "latitude": 0.7667,
    "longitude": 99.4503,
    "provinsi": "Sumatera Utara",
    "kabupaten": "Mandailing Natal"
  },
  "tradisi": [
    "Markobar untuk menghubungkan kekerabatan antar huta",
    "Upacara manyapai pada siklus pertanian dan pesta adat"
  ],
  "tokoh": [
    {
      "nama": "Abdul Haris Nasution",
      "gelar": "Jenderal TNI",
      "bidang": "Militer",
      "deskripsi": "Tokoh nasional kelahiran Hutapungkut yang berperan besar dalam sejarah TNI."
    }
  ],
  "relatedMargas": ["lubis", "harahap"],
  "updatedAt": "2024-03-12"
}
```

## Panduan Kualitas Konten

### WAJIB:
1. Gunakan terminologi Mandailing yang benar (Dalihan Na Tolu versi Mandailing: mora, kahanggi, anak boru; markobar, gordang sambilan, dll)
2. Minimal 2 ancestors dalam tarombo
3. Minimal 2 sub-marga dalam tarombo
4. Minimal 2 tradisi khas marga
5. Minimal 1 tokoh (historis atau kontemporer)
6. Koordinat wilayah yang akurat (sekitar Panyabungan/Mandailing Natal)
7. relatedMargas harus menggunakan slug yang valid (prioritas sesama Mandailing atau Angkola)

### HINDARI:
1. Jangan fabrikasi informasi jika tidak yakin
2. Jangan copy-paste dari marga lain
3. Jangan campur terminologi dengan Toba

### JIKA INFORMASI TIDAK TERSEDIA:
- Untuk ancestors: gunakan leluhur generik Mandailing
- Untuk tokoh: cari tokoh kontemporer dari marga tersebut
- Untuk tradisi: gunakan tradisi umum Mandailing yang relevan

## Output Format

Hasilkan output dalam format JSON array yang valid dengan 4 marga:

```json
[
  { /* Lubis */ },
  { /* Rangkuti */ },
  { /* Daulay */ },
  { /* Hasibuan */ }
]
```
