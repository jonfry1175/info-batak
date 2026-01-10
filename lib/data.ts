import {
  Fakta,
  Marga,
  MargaDetail,
  MediaLibrary,
  MediaImage,
  MediaVideo,
  MediaAudio,
  ArsitekturData,
  KulinerData,
  PakaianData,
  BahasaData,
  Berita,
  BeritaKategori,
  RumpunBatak,
  RumpunBatakEnhanced,
  EnhancedTokoh,
  Tokoh
} from '@/types';
import faktaData from '@/content/data/fakta.json';
import margaData from '@/content/data/marga.json';
import margaDetailData from '@/content/data/marga-detail.json';
import mediaData from '@/content/data/media.json';
import arsitekturData from '@/content/data/arsitektur.json';
import kulinerData from '@/content/data/kuliner.json';
import pakaianData from '@/content/data/pakaian.json';
import bahasaData from '@/content/data/bahasa.json';
import beritaData from '@/content/data/berita.json';
import rumpunData from '@/content/data/rumpun.json';

export function getAllFakta(): Fakta[] {
  return faktaData as Fakta[];
}

export function getRandomFakta(): Fakta {
  const fakta = getAllFakta();
  const randomIndex = Math.floor(Math.random() * fakta.length);
  return fakta[randomIndex];
}

export function getAllMarga(): Marga[] {
  return margaData as Marga[];
}

export function getMargaBySlug(slug: string): Marga | undefined {
  return getAllMarga().find((marga) => marga.slug === slug);
}

export function getMargaByRumpun(rumpun: string): Marga[] {
  return getAllMarga().filter((marga) => marga.rumpun === rumpun);
}

export function getAllMargaSlugs(): string[] {
  return getAllMarga().map((marga) => marga.slug);
}

export function getMargaDetailBySlug(slug: string): MargaDetail | undefined {
  return (margaDetailData as MargaDetail[]).find((detail) => detail.slug === slug);
}

export function getFullMargaBySlug(slug: string): (Marga & Partial<MargaDetail>) | undefined {
  const baseMarga = getMargaBySlug(slug);

  if (!baseMarga) {
    return undefined;
  }

  const detail = getMargaDetailBySlug(slug);
  return {
    ...baseMarga,
    ...(detail ?? {})
  };
}

// Media Library functions
export function getAllMedia(): MediaLibrary {
  return mediaData as MediaLibrary;
}

export function getAllImages(): MediaImage[] {
  return getAllMedia().images || [];
}

export function getAllVideos(): MediaVideo[] {
  return getAllMedia().videos || [];
}

export function getAllAudio(): MediaAudio[] {
  return getAllMedia().audio || [];
}

export function getImageById(id: string): MediaImage | undefined {
  return getAllImages().find((image) => image.id === id);
}

export function getImagesByCategory(category: string, subcategory?: string): MediaImage[] {
  let images = getAllImages().filter((image) => image.category === category);
  if (subcategory) {
    images = images.filter((image) => image.subcategory === subcategory);
  }
  return images;
}

export function getVideoById(id: string): MediaVideo | undefined {
  return getAllVideos().find((video) => video.id === id);
}

export function getVideosByCategory(category: string, subcategory?: string): MediaVideo[] {
  let videos = getAllVideos().filter((video) => video.category === category);
  if (subcategory) {
    videos = videos.filter((video) => video.subcategory === subcategory);
  }
  return videos;
}

export function searchMedia(query: string): {
  images: MediaImage[];
  videos: MediaVideo[];
  audio: MediaAudio[];
} {
  const lowerQuery = query.toLowerCase();

  const images = getAllImages().filter((image) =>
    image.keywords?.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
    image.description?.toLowerCase().includes(lowerQuery) ||
    image.alt.toLowerCase().includes(lowerQuery)
  );

  const videos = getAllVideos().filter((video) =>
    video.keywords?.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    video.title.toLowerCase().includes(lowerQuery)
  );

  const audio = getAllAudio().filter((a) =>
    a.keywords?.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
    a.description.toLowerCase().includes(lowerQuery) ||
    a.title.toLowerCase().includes(lowerQuery)
  );

  return { images, videos, audio };
}

// Arsitektur functions
export function getArsitekturData(): ArsitekturData {
  return arsitekturData as ArsitekturData;
}

export function getAllHouseTypes() {
  return getArsitekturData().houseTypes;
}

export function getHouseTypeById(id: string) {
  return getAllHouseTypes().find(house => house.id === id);
}

export function getHouseTypesByRegion(region: string) {
  return getAllHouseTypes().filter(house => house.region === region);
}

export function getConstructionTechniques() {
  return getArsitekturData().constructionTechniques;
}

// Kuliner functions
export function getKulinerData(): KulinerData {
  return kulinerData as KulinerData;
}

export function getAllDishes() {
  return getKulinerData().dishes;
}

export function getDishById(id: string) {
  return getAllDishes().find(dish => dish.id === id);
}

export function getDishesByRegion(region: string) {
  return getAllDishes().filter(dish => dish.region.includes(region));
}

export function getDishesByCategory(category: string) {
  return getAllDishes().filter(dish => dish.category === category);
}

export function getAllDrinks() {
  return getKulinerData().drinks;
}

export function getCeremonialFoods() {
  return getKulinerData().ceremonialFoods;
}

// Pakaian functions
export function getPakaianData(): PakaianData {
  return pakaianData as PakaianData;
}

export function getMensAttire() {
  return getPakaianData().mensAttire;
}

export function getWomensAttire() {
  return getPakaianData().womensAttire;
}

export function getUlosTypes() {
  return getPakaianData().ulosSignificance.types;
}

export function getUlosTypeByName(name: string) {
  return getUlosTypes().find(ulos => ulos.name === name);
}

export function getRegionalClothingVariations() {
  return getPakaianData().regionalVariations;
}

// Bahasa functions
export function getBahasaData(): BahasaData {
  return bahasaData as BahasaData;
}

export function getAllDialects() {
  return getBahasaData().dialects;
}

export function getDialectById(id: string) {
  return getAllDialects().find(dialect => dialect.id === id);
}

export function getCommonPhrases() {
  return getBahasaData().commonPhrases;
}

export function getUmpasaExamples() {
  return getBahasaData().umpasa.examples;
}

export function getProverbsExamples() {
  return getBahasaData().proverbs.examples;
}

export function getKinshipTerms() {
  return getBahasaData().kinshipTerminology;
}


// Berita (News) functions
export function getAllBerita(): Berita[] {
  return beritaData as Berita[];
}

export function getBeritaBySlug(slug: string): Berita | undefined {
  return getAllBerita().find((berita) => berita.slug === slug);
}

export function getBeritaByKategori(kategori: BeritaKategori): Berita[] {
  return getAllBerita().filter((berita) => berita.kategori === kategori);
}

export function getFeaturedBerita(): Berita[] {
  return getAllBerita().filter((berita) => berita.featured);
}

export function getLatestBerita(count: number = 6): Berita[] {
  return getAllBerita()
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, count);
}

// Rumpun Batak functions
export function getAllRumpun(): RumpunBatakEnhanced[] {
  return rumpunData as RumpunBatakEnhanced[];
}

export function getRumpunBySlug(slug: string): RumpunBatakEnhanced | undefined {
  return getAllRumpun().find((rumpun) => rumpun.slug === slug);
}

// Default coordinates for each rumpun
const defaultCoordinates: Record<string, { latitude: number; longitude: number }> = {
  toba: { latitude: 2.6167, longitude: 98.8500 },
  karo: { latitude: 3.1000, longitude: 98.5000 },
  simalungun: { latitude: 2.9500, longitude: 99.0500 },
  pakpak: { latitude: 2.5500, longitude: 98.3000 },
  angkola: { latitude: 1.5000, longitude: 99.2000 },
  mandailing: { latitude: 0.8500, longitude: 99.5500 }
};

function getDefaultCoordinates(slug: string): { latitude: number; longitude: number } {
  return defaultCoordinates[slug] || { latitude: 2.5, longitude: 98.5 };
}

function normalizeTokohData(tokoh: Tokoh): EnhancedTokoh {
  return {
    nama: tokoh.nama,
    gelar: tokoh.gelar,
    foto: undefined,
    tahunLahir: undefined,
    tahunWafat: undefined,
    bidang: tokoh.gelar || 'Tokoh',
    ringkasan: tokoh.deskripsi,
    biografi: tokoh.deskripsi,
    pencapaian: []
  };
}

function isEnhancedFormat(data: RumpunBatak | RumpunBatakEnhanced): data is RumpunBatakEnhanced {
  return typeof data.wilayah === 'object' && data.wilayah !== null && 'koordinat' in data.wilayah;
}

export function normalizeRumpunData(data: RumpunBatak | RumpunBatakEnhanced): RumpunBatakEnhanced {
  // If already in enhanced format, return as-is
  if (isEnhancedFormat(data)) {
    return data;
  }

  // Convert old format to new format
  const oldData = data as RumpunBatak;
  const coords = getDefaultCoordinates(oldData.slug);

  return {
    id: oldData.id,
    nama: oldData.nama,
    slug: oldData.slug,
    deskripsi: oldData.deskripsi,
    gambar: oldData.gambar,
    wilayah: {
      nama: oldData.wilayah,
      deskripsi: oldData.wilayah,
      koordinat: coords,
      kabupaten: [],
      landmarks: []
    },
    sejarah: {
      ringkasan: oldData.sejarah,
      asalUsul: oldData.sejarah,
      kerajaan: undefined,
      perlawananKolonial: undefined,
      eraModern: undefined,
      timeline: [],
      images: undefined
    },
    budaya: {
      ringkasan: oldData.budaya,
      sistemKekerabatan: { deskripsi: '' },
      musikTarian: { deskripsi: '' },
      pakaian: { deskripsi: '' },
      rumahAdat: { deskripsi: '' },
      upacaraAdat: { deskripsi: '' },
      gallery: undefined
    },
    tokoh: oldData.tokoh.map(normalizeTokohData)
  };
}

export function getRumpunEnhancedBySlug(slug: string): RumpunBatakEnhanced | undefined {
  return getRumpunBySlug(slug);
}

export function getAllRumpunEnhanced(): RumpunBatakEnhanced[] {
  return getAllRumpun();
}
