import { Fakta, Marga, MediaLibrary, MediaImage, MediaVideo, MediaAudio } from '@/types';
import faktaData from '@/content/data/fakta.json';
import margaData from '@/content/data/marga.json';
import mediaData from '@/content/data/media.json';

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

export function getMargaByRumpun(rumpun: string): Marga[] {
  return getAllMarga().filter((marga) => marga.rumpun === rumpun);
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
