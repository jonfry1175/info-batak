// Marga (Clan) types
export type Rumpun = 'Toba' | 'Karo' | 'Simalungun' | 'Pakpak' | 'Angkola' | 'Mandailing';

export interface Marga {
  id: string;
  nama: string;
  rumpun: Rumpun;
  deskripsi?: string;
}

// Fakta (Did You Know) types
export interface Fakta {
  id: string;
  teks: string;
  kategori?: string;
}

// Article/News types
export interface ArticleMetadata {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  tags?: string[];
}

export interface Article extends ArticleMetadata {
  content: string;
}
