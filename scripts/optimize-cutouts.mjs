import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve(process.argv[2] ?? 'public/images/products');
const entries = await fs.readdir(sourceDir);
const files = entries.filter((file) => /_cutout(?:-v\d+)?\.png$/i.test(file));

for (const file of files) {
  const input = path.join(sourceDir, file);
  const output = path.join(sourceDir, file.replace(/\.png$/i, '.webp'));
  await sharp(input)
    .resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100, smartSubsample: true })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  if (!metadata.hasAlpha) throw new Error(`Alpha channel missing in ${output}`);
  console.log(`${file} -> ${path.basename(output)} (${metadata.width}x${metadata.height}, alpha)`);
}
