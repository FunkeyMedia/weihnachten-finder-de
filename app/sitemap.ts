import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://weihnachten-finder.de';
  const pages = ['', '/finder', '/vergleich', '/ratgeber', '/so-funktionierts', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz', '/affiliate-transparenz'];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date('2026-08-22'), changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : path === '/finder' ? .9 : .6 })),
    ...products.map((product) => ({ url: `${base}/produkte/${product.product_id.toLowerCase()}`, lastModified: new Date(product.checked_at), changeFrequency: 'weekly' as const, priority: .7 })),
  ];
}
