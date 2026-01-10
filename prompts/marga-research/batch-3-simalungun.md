# Research Task: Data Detail Marga Batak Simalungun

## Konteks
Anda adalah peneliti budaya Batak yang bertugas mengisi data detail marga untuk website InfoBatak.id. Website ini bertujuan melestarikan dan mengedukasi tentang sejarah, budaya, adat istiadat, aksara, dan sistem marga Batak.

## Tugas
Lakukan research mendalam untuk 5 marga berikut dari rumpun **Simalungun**:

| ID | Nama | Slug | Deskripsi |
|----|------|------|-----------|
| 12 | Saragih | saragih | Marga Simalungun yang besar |
| 13 | Purba | purba | Marga Simalungun yang populer |
| 14 | Sinaga | sinaga | Marga Simalungun yang tersebar |
| 15 | Damanik | damanik | Marga besar Simalungun |
| 16 | Simatupang | simatupang | Marga Simalungun yang terkenal |

**Catatan:** Sinaga di Simalungun berbeda dengan Sinaga di Toba. Pastikan konteks Simalungun.

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
    "kabupaten": "Simalungun"
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
1. Gunakan terminologi Simalungun yang benar (Tolu Sahundulan, Habonaran Do Bona, Tortor Simalungun, dll)
2. Minimal 2 ancestors dalam tarombo
3. Minimal 2 sub-marga dalam tarombo
4. Minimal 2 tradisi khas marga
5. Minimal 1 tokoh (historis atau kontemporer)
6. Koordinat wilayah yang akurat (sekitar Pematangsiantar/Simalungun)
7. relatedMargas harus menggunakan slug yang valid (prioritas sesama Simalungun)

### HINDARI:
1. Jangan fabrikasi informasi jika tidak yakin
2. Jangan copy-paste dari marga lain
3. Jangan campur dengan konteks Toba (terutama untuk Sinaga)

### JIKA INFORMASI TIDAK TERSEDIA:
- Untuk ancestors: gunakan leluhur generik Simalungun
- Untuk tokoh: cari tokoh kontemporer dari marga tersebut
- Untuk tradisi: gunakan tradisi umum Simalungun yang relevan

## Output Format

Hasilkan output dalam format JSON array yang valid dengan 5 marga:

```json
[
  { /* Saragih */ },
  { /* Purba */ },
  { /* Sinaga */ },
  { /* Damanik */ },
  { /* Simatupang */ }
]
```
