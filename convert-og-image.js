import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Input SVG file
const inputFile = join(__dirname, 'public', 'og-image.svg');

// Output JPG file
const outputFile = join(__dirname, 'public', 'og-image.jpg');

// Convert SVG to JPG
sharp(inputFile)
  .resize(1200, 630)
  .jpeg({
    quality: 90,
    chromaSubsampling: '4:4:4'
  })
  .toFile(outputFile)
  .then(() => {
    console.log('✅ OG Image converted successfully!');
  })
  .catch(err => {
    console.error('❌ Error converting OG Image:', err);
  });
