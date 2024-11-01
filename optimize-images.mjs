// optimize-images.mjs
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import { glob } from 'glob';
import { promises as fs } from 'fs';
import path from 'path';

// Configuration
const MIN_SIZE_KB = 10; // Only optimize images larger than 10KB

const optimizeImages = async () => {
  try {
    // Find all images in src directory and its subdirectories
    const imagePaths = await glob('src/**/*.{jpg,jpeg,png,gif,svg}');
    
    let totalSaved = 0;
    let totalProcessed = 0;
    let totalSkipped = 0;

    for (const imagePath of imagePaths) {
      // Read image file as a buffer
      const originalBuffer = await fs.readFile(imagePath);
      const originalSize = originalBuffer.length / 1024; // Convert to KB

      // Skip if file is smaller than minimum size
      if (originalSize < MIN_SIZE_KB) {
        console.log(`Skipping: ${path.basename(imagePath)} (${originalSize.toFixed(2)} KB - below ${MIN_SIZE_KB}KB threshold)\n`);
        totalSkipped++;
        continue;
      }

      console.log(`Optimizing: ${imagePath}`);

      // Optimize the image
      const optimizedBuffer = await imagemin.buffer(originalBuffer, {
        plugins: [
          imageminMozjpeg({ quality: 75 }),
          imageminPngquant({
            quality: [0.6, 0.8],
            speed: 4,
          }),
          imageminGifsicle({
            optimizationLevel: 3,
          }),
          imageminSvgo({
            plugins: [
              { removeViewBox: false },
              { cleanupIDs: false },
            ],
          }),
        ],
      });

      // Get optimized size
      const optimizedSize = optimizedBuffer.length / 1024; // Convert to KB
      
      // Only save if the optimization actually reduced the file size
      if (optimizedSize < originalSize) {
        // Calculate savings percentage
        const savingsPercentage = ((originalSize - optimizedSize) / originalSize) * 100;
        const savedKB = originalSize - optimizedSize;
        
        // Replace the original file with the optimized version
        await fs.writeFile(imagePath, optimizedBuffer);
        
        console.log(`✓ ${path.basename(imagePath)}`);
        console.log(`  Original size: ${originalSize.toFixed(2)} KB`);
        console.log(`  Optimized size: ${optimizedSize.toFixed(2)} KB`);
        console.log(`  Saved: ${savingsPercentage.toFixed(2)}% (${savedKB.toFixed(2)} KB)\n`);
        
        totalSaved += savedKB;
        totalProcessed++;
      } else {
        console.log(`⚠ ${path.basename(imagePath)} - No optimization possible (already optimized)\n`);
        totalSkipped++;
      }
    }

    // Print summary
    console.log('Optimization complete!');
    console.log(`Processed: ${totalProcessed} images`);
    console.log(`Skipped: ${totalSkipped} images`);
    console.log(`Total space saved: ${totalSaved.toFixed(2)} KB`);

  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
};

optimizeImages();
