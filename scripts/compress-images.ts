
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const QUALITY = 80;

// Stats
let totalOriginalSize = 0;
let totalNewSize = 0;
let processedCount = 0;
let skippedCount = 0;
let errorCount = 0;

async function processFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  try {
    const originalBuffer = await fs.promises.readFile(filePath);
    const originalSize = originalBuffer.length;
    
    let pipeline = sharp(originalBuffer);
    
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true });
    }

    const newBuffer = await pipeline.toBuffer();
    const newSize = newBuffer.length;

    // Only save if smaller
    if (newSize < originalSize) {
      await fs.promises.writeFile(filePath, newBuffer);
      console.log(`✓ Optimized: ${path.relative(process.cwd(), filePath)} (${formatSize(originalSize)} -> ${formatSize(newSize)}, -${Math.round((1 - newSize / originalSize) * 100)}%)`);
      totalOriginalSize += originalSize;
      totalNewSize += newSize;
      processedCount++;
    } else {
      console.log(`- Skipped (no improvement): ${path.relative(process.cwd(), filePath)}`);
      skippedCount++;
    }
  } catch (error) {
    console.error(`x Error processing ${filePath}:`, error);
    errorCount++;
  }
}

async function walkDir(dir: string) {
  const files = await fs.promises.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);
    
    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else {
      await processFile(filePath);
    }
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  console.log(`Starting image compression in ${PUBLIC_DIR}...`);
  console.log(`Target Quality: ${QUALITY}%`);
  console.log('----------------------------------------');
  
  await walkDir(PUBLIC_DIR);
  
  console.log('----------------------------------------');
  console.log('Summary:');
  console.log(`Processed: ${processedCount} images`);
  console.log(`Skipped: ${skippedCount} images`);
  console.log(`Errors: ${errorCount}`);
  
  if (processedCount > 0) {
    const savedBytes = totalOriginalSize - totalNewSize;
    const savedPercent = (savedBytes / totalOriginalSize) * 100;
    console.log(`Total Original Size: ${formatSize(totalOriginalSize)}`);
    console.log(`Total New Size: ${formatSize(totalNewSize)}`);
    console.log(`Total Saved: ${formatSize(savedBytes)} (${savedPercent.toFixed(1)}%)`);
  }
}

main().catch(console.error);
