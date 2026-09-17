import fs from 'node:fs/promises';

const kinds = ['geschenk', 'spielzeug', 'christbaumstaender', 'lichterkette'];
const endpoint = 'https://boxershorts-finder.de/api/christmas-products';
const output = {};

for (const kind of kinds) {
  const unique = new Map();
  for (let batch = 0; batch < 80 && unique.size < 200; batch += 1) {
    let response;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      response = await fetch(`${endpoint}?kind=${kind}&batch=${batch}`, { headers: { Accept: 'application/json' } });
      if (response.ok) break;
      await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
    }
    if (!response?.ok) continue;
    const data = await response.json();
    for (const product of data.products || []) {
      const identity = product.parentAsin || product.asin;
      if (product.asin && product.title && product.image && !unique.has(identity)) unique.set(identity, product);
      if (unique.size >= 200) break;
    }
    process.stdout.write(`${kind}: ${unique.size}/200\n`);
  }
  output[kind] = [...unique.values()].slice(0, 200);
}

await fs.writeFile(new URL('../data/finder-products.json', import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(Object.fromEntries(kinds.map((kind) => [kind, output[kind].length]))));
