import type { Metadata } from 'next';
import { FinderClient } from './finder-client';

export const metadata: Metadata = {
  title: 'Geschenk-Finder | Weihnachten-Finder',
  description: 'Beantworte wenige einfache Fragen und erhalte drei transparent begründete Weihnachtsgeschenk-Empfehlungen.',
  alternates: { canonical: '/finder' },
};

export default function FinderPage() { return <FinderClient />; }
