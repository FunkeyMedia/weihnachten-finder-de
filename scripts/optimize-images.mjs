import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const productDir = path.resolve('public/images/products');
for (const file of (await fs.readdir(productDir)).filter((name) => name.endsWith('.png'))) {
  const input = path.join(productDir, file);
  const output = path.join(productDir, file.replace(/\.png$/i, '.webp'));
  await sharp(input).resize(1000, 1000, { fit: 'contain' }).webp({ quality: 84, alphaQuality: 92, effort: 5 }).toFile(output);
  await fs.unlink(input);
}

const heroDir = path.resolve('public/images/heroes');
for (const file of (await fs.readdir(heroDir)).filter((name) => name.endsWith('.png'))) {
  const input = path.join(heroDir, file);
  const output = path.join(heroDir, file.replace(/\.png$/i, '.webp'));
  await sharp(input).resize(1920, 800, { fit: 'cover' }).webp({ quality: 83, effort: 5 }).toFile(output);
  await fs.unlink(input);
}

console.log('Produkt- und Hero-Bilder für das Web optimiert.');
