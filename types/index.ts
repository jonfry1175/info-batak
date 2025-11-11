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
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  relatedPage?: string;
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

// Media types
export type MediaCategory = 'Homepage' | 'Budaya' | 'Sejarah' | 'Marga' | 'Fakta' | 'General';
export type VideoCategory = 'Educational' | 'Performances' | 'Documentaries' | 'Tutorials';

export interface MediaImage {
  id: string;
  src: string;
  alt: string;
  category: MediaCategory;
  subcategory?: string;
  photographer?: string;
  year?: number;
  license?: string;
  description?: string;
  keywords?: string[];
  width?: number;
  height?: number;
  placeholder?: boolean;
}

export interface MediaVideo {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  category: VideoCategory;
  subcategory?: string;
  duration: number; // in seconds
  creator?: string;
  year?: number;
  license?: string;
  keywords?: string[];
  hasCaption?: boolean;
  hasTranscript?: boolean;
  placeholder?: boolean;
}

export interface MediaAudio {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  duration: number; // in seconds
  performer?: string;
  year?: number;
  license?: string;
  keywords?: string[];
  placeholder?: boolean;
}

export interface MediaLibrary {
  images: MediaImage[];
  videos: MediaVideo[];
  audio: MediaAudio[];
}
