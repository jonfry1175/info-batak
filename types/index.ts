// Marga (Clan) types
export type Rumpun = 'Toba' | 'Karo' | 'Simalungun' | 'Pakpak' | 'Angkola' | 'Mandailing';

export interface Marga {
  id: string;
  nama: string;
  rumpun: Rumpun;
  slug: string;
  deskripsi?: string;
}

export interface Ancestor {
  nama: string;
  gelar?: string;
  deskripsi?: string;
}

export interface SubMarga {
  nama: string;
  deskripsi?: string;
}

export interface Tarombo {
  description: string;
  ancestors?: Ancestor[];
  subMargas?: SubMarga[];
}

export interface Wilayah {
  nama: string;
  deskripsi: string;
  latitude: number;
  longitude: number;
  provinsi?: string;
  kabupaten?: string;
}

export interface TokohMarga {
  nama: string;
  gelar?: string;
  bidang?: string;
  deskripsi: string;
}

export interface MargaDetail {
  margaId: string;
  slug: string;
  sejarah?: string;
  asalUsul?: string;
  tarombo?: Tarombo;
  wilayah?: Wilayah;
  tradisi?: string[];
  tokoh?: TokohMarga[];
  relatedMargas?: string[];
  updatedAt?: string;
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

// Berita (News) types
export type BeritaKategori = 'Budaya' | 'Sejarah' | 'Komunitas' | 'Event' | 'Wisata' | 'Kuliner';

export interface Berita {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: BeritaKategori;
  tanggal: string;
  penulis: string;
  gambar: string;
  gambarAlt: string;
  gambarCredit: string;
  tags: string[];
  featured?: boolean;
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

// Arsitektur types
export interface HouseType {
  id: string;
  name: string;
  region: string;
  type: 'residence' | 'granary' | 'other';
  description: string;
  characteristics: string[];
  structure: {
    foundation: string;
    walls: string;
    roof: string;
    floor: string;
  };
  symbolism: string;
  capacity?: string;
  function?: string;
  images: string[];
}

export interface ConstructionTechnique {
  id: string;
  name: string;
  description: string;
  methods?: string[];
  features?: string[];
  advantages?: string[];
  materials?: {
    name: string;
    usage: string;
    types?: string[];
    durability?: string;
  }[];
}

export interface ArsitekturData {
  houseTypes: HouseType[];
  constructionTechniques: ConstructionTechnique[];
  spatialOrganization: any;
  ornaments: any;
  culturalSignificance: any;
}

// Kuliner types
export interface Dish {
  id: string;
  name: string;
  alternateName?: string;
  region: string;
  category: 'main_dish' | 'appetizer' | 'soup' | 'dessert';
  type: 'fish' | 'pork' | 'buffalo' | 'vegetable' | 'other';
  description: string;
  mainIngredients: string[];
  cookingMethod: string;
  taste: string;
  significance: string;
  culturalNote?: string;
  servingSuggestion: string;
  preparationTime?: string;
  healthNote?: string;
  image: string;
}

export interface Drink {
  id: string;
  name: string;
  type: 'alcoholic' | 'non-alcoholic';
  region: string;
  description: string;
  ingredients?: string[];
  process?: string;
  taste: string;
  alcoholContent?: string;
  significance?: string;
  culturalRole?: string[];
  tradition?: string;
  modernContext?: string;
  image: string;
}

export interface CeremonialFood {
  id: string;
  name: string;
  occasion: string;
  description: string;
  preparation?: string;
  significance: string;
  tradition?: string;
  image: string;
}

export interface KulinerData {
  dishes: Dish[];
  drinks: Drink[];
  ceremonialFoods: CeremonialFood[];
  ingredients: any;
  cookingPhilosophy: any;
  diningEtiquette: any;
  regionalVariations: any;
}

// Pakaian types
export interface ClothingComponent {
  id: string;
  name: string;
  type: string;
  description: string;
  usage?: string;
  symbolism?: string;
  material?: string;
  colors?: string[];
  design?: string;
  variations?: {
    style: string;
    description: string;
  }[];
  image: string;
}

export interface UlosType {
  name: string;
  status: string;
  usage: string;
  meaning: string;
  motif: string;
  colors: string;
  image: string;
}

export interface PakaianData {
  mensAttire: {
    description: string;
    components: ClothingComponent[];
    completeOutfit: any;
  };
  womensAttire: {
    description: string;
    components: ClothingComponent[];
    completeOutfit: any;
  };
  ulosSignificance: {
    description: string;
    philosophy: string;
    types: UlosType[];
    givingTradition: any;
    weavingTradition: any;
  };
  regionalVariations: any;
  modernAdaptation: any;
  colorSymbolism: any;
}

// Bahasa types
export interface Dialect {
  id: string;
  name: string;
  alternateName: string;
  region: string;
  speakers: string;
  status: string;
  characteristics: string[];
  examples: {
    toba?: string;
    karo?: string;
    simalungun?: string;
    pakpak?: string;
    angkola?: string;
    mandailing?: string;
    indonesian: string;
    context: string;
  }[];
}

export interface Phrase {
  toba?: string;
  karo?: string;
  simalungun?: string;
  indonesian: string;
  usage: string;
  response?: string;
}

export interface UmpasaExample {
  toba: string;
  indonesian: string;
  meaning: string;
  usage: string;
}

export interface BahasaData {
  overview: {
    description: string;
    classification: string;
    speakers: string;
    region: string;
    status: string;
    script: string;
  };
  dialects: Dialect[];
  commonPhrases: {
    description: string;
    greetings: Phrase[];
    courtesy: Phrase[];
    family: Phrase[];
    everyday: Phrase[];
  };
  kinshipTerminology: any;
  umpasa: {
    description: string;
    characteristics: string[];
    examples: UmpasaExample[];
    types: any[];
  };
  proverbs: any;
  literature: any;
  languagePreservation: any;
}

// Rumpun Batak types
export interface Tokoh {
  nama: string;
  gelar: string;
  deskripsi: string;
}

export interface RumpunBatak {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  gambar: string;
  sejarah: string;
  budaya: string;
  wilayah: string;
  tokoh: Tokoh[];
}

// Enhanced Rumpun Batak types
export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  type: 'kabupaten' | 'landmark' | 'center';
}

export interface TimelineEvent {
  year: number | string;
  title: string;
  description: string;
  image?: string;
}

export interface EnhancedTokoh {
  nama: string;
  gelar: string;
  foto?: string;
  tahunLahir?: number;
  tahunWafat?: number;
  bidang: string;
  ringkasan: string;
  biografi: string;
  pencapaian: string[];
}

export interface WilayahEnhanced {
  nama: string;
  deskripsi: string;
  koordinat: {
    latitude: number;
    longitude: number;
  };
  kabupaten: string[];
  landmarks: {
    nama: string;
    latitude: number;
    longitude: number;
    deskripsi?: string;
  }[];
}

export interface SejarahImage {
  src: string;
  alt: string;
  caption: string;
}

export interface SejarahEnhanced {
  ringkasan: string;
  asalUsul: string;
  kerajaan?: string;
  perlawananKolonial?: string;
  eraModern?: string;
  timeline: TimelineEvent[];
  images?: SejarahImage[];
}

export interface BudayaCategory {
  deskripsi: string;
  jenis?: string[];
}

export interface BudayaGalleryItem {
  src: string;
  alt: string;
  category: string;
}

export interface BudayaEnhanced {
  ringkasan: string;
  sistemKekerabatan: BudayaCategory;
  musikTarian: BudayaCategory;
  pakaian: BudayaCategory;
  rumahAdat: BudayaCategory;
  upacaraAdat: BudayaCategory;
  gallery?: BudayaGalleryItem[];
}

export interface RumpunBatakEnhanced {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  gambar: string;
  wilayah: WilayahEnhanced;
  sejarah: SejarahEnhanced;
  budaya: BudayaEnhanced;
  tokoh: EnhancedTokoh[];
}

// Auth types (Supabase)
export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Discussion types
export interface Comment {
  id: string;
  user_id: string;
  page_path: string;
  content: string;
  parent_id: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommentWithUser extends Comment {
  user: {
    display_name: string | null;
    avatar_url: string | null;
  };
  like_count: number;
  is_liked: boolean;
}

export interface CommentWithReplies extends CommentWithUser {
  replies: CommentWithUser[];
}

export interface CommentLike {
  id: string;
  user_id: string;
  comment_id: string;
  created_at: string;
}

export type DiscussionError =
  | 'AUTH_REQUIRED'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'FORBIDDEN'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR';

export const discussionErrorMessages: Record<DiscussionError, string> = {
  AUTH_REQUIRED: 'Silakan login untuk melanjutkan.',
  VALIDATION_ERROR: 'Komentar tidak valid.',
  NOT_FOUND: 'Komentar tidak ditemukan.',
  FORBIDDEN: 'Anda tidak memiliki izin untuk aksi ini.',
  NETWORK_ERROR: 'Tidak dapat terhubung. Periksa koneksi internet.',
  SERVER_ERROR: 'Terjadi kesalahan. Silakan coba lagi.',
};
