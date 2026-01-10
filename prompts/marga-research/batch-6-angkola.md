# Research Task: Data Detail Marga Batak Angkola

## Konteks
Anda adalah peneliti budaya Batak yang bertugas mengisi data detail marga untuk website InfoBatak.id. Website ini bertujuan melestarikan dan mengedukasi tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak.

## Tugas
Lakukan research mendalam untuk 5 marga berikut dari rumpun **Angkola**:

| ID | Nama | Slug | Deskripsi |
|----|------|------|-----------|
| 26 | Harahap | harahap | Marga besar Angkola |
| 27 | Siregar | siregar | Marga Angkola yang populer |
| 28 | Rambe | rambe | Marga Angkola yang terkenal |
| 29 | Batubara | batubara | Marga Angkola yang tersebar |
| 30 | Pohan | pohan | Marga Angkola yang terkenal |

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
    "kabupaten": "Tapanuli Selatan"
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

## Panduan Kualitas Konten

### WAJIB:
1. Gunakan terminologi Angkola yang benar (Dalihan Na Tolu versi Angkola, gordang, tortor, dll)
2. Minimal 2 ancestors dalam tarombo
3. Minimal 2 sub-marga dalam tarombo
4. Minimal 2 tradisi khas marga
5. Minimal 1 tokoh (historis atau kontemporer)
6. Koordinat wilayah yang akurat (sekitar Padangsidimpuan/Tapanuli Selatan)
7. relatedMargas harus menggunakan slug yang valid (prioritas sesama Angkola atau Mandailing)

### HINDARI:
1. Jangan fabrikasi informasi jika tidak yakin
2. Jangan copy-paste dari marga lain
3. Jangan campur terminologi dengan Toba atau Karo

### JIKA INFORMASI TIDAK TERSEDIA:
- Untuk ancestors: gunakan leluhur generik Angkola
- Untuk tokoh: cari tokoh kontemporer dari marga tersebut
- Untuk tradisi: gunakan tradisi umum Angkola yang relevan

## Output Format

Hasilkan output dalam format JSON array yang valid dengan 5 marga:

```json
[
  { /* Harahap */ },
  { /* Siregar */ },
  { /* Rambe */ },
  { /* Batubara */ },
  { /* Pohan */ }
]
```
