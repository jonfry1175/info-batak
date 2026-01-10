import fs from 'fs';
import path from 'path';

// Types (simplified for validation script)
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface MargaDetail {
  margaId: string;
  slug: string;
  sejarah: string;
  asalUsul: string;
  tarombo: {
    description: string;
    ancestors: any[];
    subMargas: any[];
  };
  wilayah: {
    nama: string;
    deskripsi: string;
    latitude: number;
    longitude: number;
    provinsi: string;
    kabupaten: string;
  };
  tradisi: string[];
  tokoh: any[];
  relatedMargas: string[];
  updatedAt: string;
}

const REQUIRED_FIELDS = [
  'margaId',
  'slug',
  'sejarah',
  'asalUsul',
  'tarombo',
  'wilayah',
  'tradisi',
  'tokoh',
  'relatedMargas',
  'updatedAt',
];

const MIN_ANCESTORS = 2;
const MIN_SUBMARGAS = 2;
const MIN_TRADISI = 2;
const MIN_TOKOH = 1;

async function validateMargaFile(filePath: string): Promise<void> {
  const absolutePath = path.resolve(filePath);
  console.log(`Validating file: ${absolutePath}`);

  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  let data: MargaDetail[];

  try {
    data = JSON.parse(content);
  } catch (e) {
    console.error('Invalid JSON format');
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error('Root must be an array');
    process.exit(1);
  }

  // Load reference marga data for slug validation
  const margaJsonPath = path.resolve(__dirname, '../content/data/marga.json');
  const margaJsonContent = fs.readFileSync(margaJsonPath, 'utf8');
  const margaRef = JSON.parse(margaJsonContent);
  const validSlugs = new Set(margaRef.map((m: any) => m.slug));

  let totalErrors = 0;

  data.forEach((item, index) => {
    const errors: string[] = [];
    const prefix = `Item ${index} (${item.slug || 'unknown'})`;

    // 1. Schema Validation
    REQUIRED_FIELDS.forEach((field) => {
      if (!(field in item)) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    if (item.tarombo) {
      if (!item.tarombo.description) errors.push('Missing tarombo.description');
      if (!Array.isArray(item.tarombo.ancestors)) errors.push('tarombo.ancestors must be array');
      if (!Array.isArray(item.tarombo.subMargas)) errors.push('tarombo.subMargas must be array');
    }

    if (item.wilayah) {
      ['nama', 'deskripsi', 'latitude', 'longitude', 'provinsi', 'kabupaten'].forEach((f) => {
        if (!(f in item.wilayah)) errors.push(`Missing wilayah.${f}`);
      });
    }

    // 2. Minimum Content Requirements
    if (item.tarombo && Array.isArray(item.tarombo.ancestors)) {
      if (item.tarombo.ancestors.length < MIN_ANCESTORS) {
        errors.push(
          `tarombo.ancestors has ${item.tarombo.ancestors.length} items, min ${MIN_ANCESTORS}`
        );
      }
    }

    if (item.tarombo && Array.isArray(item.tarombo.subMargas)) {
      if (item.tarombo.subMargas.length < MIN_SUBMARGAS) {
        // Some margas might genuinely not have sub-margas, but per requirements we expect 2
        errors.push(
          `tarombo.subMargas has ${item.tarombo.subMargas.length} items, min ${MIN_SUBMARGAS}`
        );
      }
    }

    if (Array.isArray(item.tradisi)) {
      if (item.tradisi.length < MIN_TRADISI) {
        errors.push(`tradisi has ${item.tradisi.length} items, min ${MIN_TRADISI}`);
      }
    }

    if (Array.isArray(item.tokoh)) {
      if (item.tokoh.length < MIN_TOKOH) {
        errors.push(`tokoh has ${item.tokoh.length} items, min ${MIN_TOKOH}`);
      }
    }

    // 3. Data Integrity
    if (item.relatedMargas && Array.isArray(item.relatedMargas)) {
      item.relatedMargas.forEach((slug) => {
        if (!validSlugs.has(slug)) {
          console.warn(`${prefix}: Warning - related marga slug '${slug}' not found in marga.json`);
        }
      });
    }

    if (errors.length > 0) {
      console.error(`${prefix} Errors:`);
      errors.forEach((e) => console.error(`  - ${e}`));
      totalErrors += errors.length;
    } else {
      console.log(`${prefix}: OK`);
    }
  });

  if (totalErrors > 0) {
    console.error(`\nValidation failed with ${totalErrors} errors.`);
    process.exit(1);
  } else {
    console.log('\nValidation successful!');
  }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: tsx scripts/validate-marga-data.ts <path-to-file>');
  process.exit(1);
}

validateMargaFile(args[0]);
