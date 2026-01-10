import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'prompts/marga-research');
const FINAL_OUTPUT_PATH = path.resolve(process.cwd(), 'content/data/marga-detail.json');

const BATCH_FILES = [
  'output-repair.json',
  'output-toba.json',
  'output-karo.json',
  'output-simalungun.json',
  'output-pakpak.json',
  'output-mandailing.json',
  'output-angkola.json',
];

async function mergeMargaData() {
  let allMargaData: any[] = [];

  console.log('Reading batch files...');
  for (const filename of BATCH_FILES) {
    const filePath = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(filePath)) {
      console.log(`Processing ${filename}...`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        const jsonData = JSON.parse(fileContent);
        if (Array.isArray(jsonData)) {
          allMargaData = [...allMargaData, ...jsonData];
        } else {
          console.warn(`Warning: ${filename} does not contain an array.`);
        }
      } catch (error) {
        console.error(`Error parsing ${filename}:`, error);
      }
    } else {
      console.error(`Error: File ${filename} not found at ${filePath}`);
    }
  }

  console.log(`Total margas found: ${allMargaData.length}`);

  // Sort by margaId numerically
  allMargaData.sort((a, b) => {
    return parseInt(a.margaId) - parseInt(b.margaId);
  });

  // Ensure unique margaIds (just in case)
  const seenIds = new Set();
  const uniqueMargaData = [];
  for (const item of allMargaData) {
    if (!seenIds.has(item.margaId)) {
      seenIds.add(item.margaId);
      uniqueMargaData.push(item);
    } else {
      console.warn(`Duplicate margaId found: ${item.margaId} (${item.slug}). Skipping duplicate.`);
    }
  }

  console.log(`Total unique margas: ${uniqueMargaData.length}`);

  console.log(`Writing merged data to ${FINAL_OUTPUT_PATH}...`);
  fs.writeFileSync(FINAL_OUTPUT_PATH, JSON.stringify(uniqueMargaData, null, 2));
  console.log('Merge complete!');
}

mergeMargaData().catch(console.error);
