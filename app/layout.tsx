import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['500', '600', '700'], display: 'swap' });
const sans = Manrope({ variable: '--font-sans', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://weihnachten-finder.de'),
  title: { default: 'Weihnachten-Finder – Geschenke, die wirklich passen', template: '%s' },
  description: 'Finde mit wenigen Fragen passende Weihnachtsgeschenke und verstehe, warum sie zu deinen Wünschen passen.',
  applicationName: 'Weihnachten-Finder',
  alternates: { canonical: '/' },
  openGraph: { title: 'Weniger suchen. Schöner schenken.', description: 'Der transparente Geschenk-Kompass für Weihnachten.', url: '/', siteName: 'Weihnachten-Finder', locale: 'de_DE', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Familie schmückt gemeinsam einen Weihnachtsbaum' }] },
  twitter: { card: 'summary_large_image', title: 'Weniger suchen. Schöner schenken.', description: 'Der transparente Geschenk-Kompass für Weihnachten.', images: ['/og.png'] },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
