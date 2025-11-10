import { Fakta, Marga } from '@/types';
import faktaData from '@/content/data/fakta.json';
import margaData from '@/content/data/marga.json';

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
