
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const VIDEO_DIR = path.join(PUBLIC_DIR, 'videos');

// Config based on user requirements
const CONFIG = {
  hero: {
    width: 1920,
    height: 1080,
    maxSize: 200 * 1024, // 200KB
    quality: 80,
    fit: 'cover' as const,
  },
  card: {
    width: 800,
    height: 450,
    maxSize: 80 * 1024, // 80KB
    quality: 80,
    fit: 'cover' as const,
  },
  portrait: {
    width: 600,
    height: 800,
    maxSize: 100 * 1024, // 100KB
    quality: 80,
    fit: 'cover' as const,
  },
  avatar: {
    width: 200,
    height: 200,
    maxSize: 30 * 1024, // 30KB
    quality: 80,
    fit: 'cover' as const,
  },
  logo: {
    width: 512, // Resize huge logos
    height: 512,
    maxSize: 50 * 1024, // 50KB
    quality: 85,
    fit: 'inside' as const, // Keep aspect ratio, fit inside box
  }
};

interface FileStats {
  originalSize: number;
  newSize: number;
  path: string;
  category: string;
}

const stats: FileStats[] = [];
let skippedCount = 0;
let errorCount = 0;

function getCategory(filePath: string, metadata: sharp.Metadata): keyof typeof CONFIG | 'skip' {
  const filename = path.basename(filePath).toLowerCase();
  const dir = path.dirname(filePath).toLowerCase();
  const relPath = path.relative(PUBLIC_DIR, filePath).toLowerCase();

  // Exclude videos explicitly (though we filter extensions later)
  if (relPath.startsWith('videos')) return 'skip';

  // Logo
  if (filename === 'logo.png' || filename.includes('icon')) return 'logo';

  // Hero
  if (filename.includes('hero') || relPath.includes('hero')) return 'hero';

  // Avatar/Tokoh
  if (relPath.includes('tokoh')) return 'avatar';

  // Portrait/Ulos (Pakaian)
  // Check if it's explicitly pakaian or has 'ulos' in name
  if (relPath.includes('pakaian') || filename.includes('ulos')) {
    // If it's a "card", prioritize card dimensions
    if (filename.includes('card')) return 'card';
    return 'portrait';
  }

  // Card Thumbnail (Default for content)
  // If it's explicitly named 'card' or in common content dirs
  if (filename.includes('card') || relPath.includes('homepage') || relPath.includes('berita')) {
    return 'card';
  }

  // Fallback based on aspect ratio
  if (metadata.width && metadata.height) {
    const aspect = metadata.width / metadata.height;
    if (aspect > 1.2) return 'card'; // Landscape
    if (aspect < 0.9) return 'portrait'; // Portrait
  }

  return 'card'; // Final fallback
}

async function optimizeFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  try {
    const originalBuffer = await fs.promises.readFile(filePath);
    const originalSize = originalBuffer.length;
    
    // Get metadata
    const image = sharp(originalBuffer);
    const metadata = await image.metadata();
    
    const category = getCategory(filePath, metadata);
    if (category === 'skip') return;

    const config = CONFIG[category];
    
    console.log(`Processing: ${path.relative(process.cwd(), filePath)} [${category}]`);

    let pipeline = image;

    // Resize if dimensions are specified
    if ('width' in config) {
      // Only resize if original is larger than target
      if ((metadata.width || 0) > config.width || (metadata.height || 0) > config.height) {
        pipeline = pipeline.resize(config.width, config.height, {
          fit: config.fit,
          withoutEnlargement: true,
        });
      }
    }

    // Compress
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: config.quality, compressionLevel: 9, palette: true });
    } else {
      // Convert everything else to jpeg or keep original format?
      // User said WebP/JPG. Let's stick to original format for now to avoid breaking links, 
      // but compress strongly.
      if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: config.quality });
      } else {
        pipeline = pipeline.jpeg({ quality: config.quality, mozjpeg: true });
      }
    }

    let newBuffer = await pipeline.toBuffer();

    // If still too big, try reducing quality further
    if (newBuffer.length > config.maxSize) {
        console.log(`  > Still too big (${(newBuffer.length/1024).toFixed(1)}KB > ${(config.maxSize/1024).toFixed(1)}KB), retrying with lower quality...`);
        // Aggressive compression
        if (ext === '.png') {
            pipeline = image.png({ quality: 60, palette: true, dither: 0.5 }); // aggressive PNG
        } else if (ext === '.webp') {
            pipeline = image.webp({ quality: 60 });
        } else {
            pipeline = image.jpeg({ quality: 60, mozjpeg: true });
        }
        
        // If resized, apply resize again (pipeline is immutable-ish in chain, need to reconstruct or chain correctly)
        // Actually pipeline object is mutable in builder pattern? No.
        // Re-create pipeline from scratch for simplicity
        let retryPipeline = sharp(originalBuffer);
        if ('width' in config) {
             retryPipeline = retryPipeline.resize(config.width, config.height, { fit: config.fit, withoutEnlargement: true });
        }
        
        if (ext === '.png') {
             retryPipeline = retryPipeline.png({ quality: 60, palette: true });
        } else if (ext === '.webp') {
             retryPipeline = retryPipeline.webp({ quality: 60 });
        } else {
             retryPipeline = retryPipeline.jpeg({ quality: 60, mozjpeg: true });
        }

        const retryBuffer = await retryPipeline.toBuffer();
        if (retryBuffer.length < newBuffer.length) {
            newBuffer = retryBuffer;
        }
    }

    // Check if we actually improved
    if (newBuffer.length < originalSize) {
      await fs.promises.writeFile(filePath, newBuffer);
      console.log(`  ✓ Saved ${(originalSize/1024).toFixed(1)}KB -> ${(newBuffer.length/1024).toFixed(1)}KB`);
      stats.push({
        path: filePath,
        originalSize,
        newSize: newBuffer.length,
        category
      });
    } else {
      console.log(`  - Skipped (Original was smaller)`);
      skippedCount++;
    }

  } catch (error) {
    console.error(`  x Error:`, error);
    errorCount++;
  }
}

async function walkDir(dir: string) {
  const files = await fs.promises.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'videos') { // Skip videos dir
        await walkDir(filePath);
      }
    } else {
      await optimizeFile(filePath);
    }
  }
}

async function main() {
  console.log('Starting optimization...');
  await walkDir(PUBLIC_DIR);
  
  console.log('\n--------------------------------');
  console.log(`Processed: ${stats.length}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  
  const totalSaved = stats.reduce((acc, curr) => acc + (curr.originalSize - curr.newSize), 0);
  console.log(`Total Space Saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
