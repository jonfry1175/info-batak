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
