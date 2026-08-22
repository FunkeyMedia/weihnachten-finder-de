import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://weihnachten-finder.de';
  return { rules: { userAgent: '*', allow: '/', disallow: ['/ergebnis'] }, sitemap: `${base}/sitemap.xml` };
}
