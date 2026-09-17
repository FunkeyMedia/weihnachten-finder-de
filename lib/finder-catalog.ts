import importedProducts from '@/data/finder-products.json';

export type FinderKind = 'geschenk' | 'spielzeug' | 'christbaumstaender' | 'lichterkette';

export type FinderProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  price?: number;
  rating?: number | null;
  image?: string;
  amazonUrl: string;
  tags: string[];
};

export type FinderContent = { nav: string; eyebrow: string; title: string; intro: string; accent: string; questions: { title: string; options: { label: string; value: string }[] }[] };

const labels: Record<FinderKind, string> = { geschenk: 'Geschenke', spielzeug: 'Spielzeug', christbaumstaender: 'Christbaumständer', lichterkette: 'Lichterketten' };
const imported = importedProducts as unknown as Record<FinderKind, Array<FinderProduct & { price: number | null; brand?: string }>>;

export const finderProducts = Object.fromEntries((['geschenk', 'spielzeug', 'christbaumstaender', 'lichterkette'] as FinderKind[]).map((kind) => [kind, imported[kind].map((product) => ({
  ...product,
  category: labels[kind],
  description: product.description || `${product.brand ?? 'Amazon'}: Produktdetails und Verfügbarkeit direkt bei Amazon prüfen.`,
  price: product.price ?? undefined,
  tags: [...product.tags, `${product.title} ${product.description} ${product.features.join(' ')}`.toLowerCase(), product.price == null ? 'premium' : product.price <= 20 ? 'klein' : product.price <= 50 ? 'mittel' : product.price <= 100 ? 'gross' : 'premium'],
}))])) as Record<FinderKind, FinderProduct[]>;

export const finderContent: Record<FinderKind, FinderContent> = {
  geschenk: { nav: 'Geschenk', eyebrow: 'Für Menschen, die dir wichtig sind', title: 'Geschenk-Finder', intro: 'Drei kurze Fragen führen zu passenden Weihnachtsideen statt zu einer endlosen Liste.', accent: 'Das passt wirklich', questions: [
    { title: 'Für wen suchst du?', options: [{ label: 'Partner:in', value: 'paare' }, { label: 'Familie', value: 'familien' }, { label: 'Kind', value: 'kinder' }, { label: 'Freund:in', value: 'erwachsene' }] },
    { title: 'Welche Richtung passt?', options: [{ label: 'Gemeinsame Zeit', value: 'spiel' }, { label: 'Genuss & Ruhe', value: 'advent' }, { label: 'Kreativ & neugierig', value: 'kreativ' }, { label: 'Überrasch mich', value: 'geschenk' }] },
    { title: 'Wie groß ist dein Budget?', options: [{ label: 'Bis 20 €', value: 'klein' }, { label: 'Bis 50 €', value: 'mittel' }, { label: 'Bis 100 €', value: 'gross' }, { label: 'Flexibel', value: 'premium' }] },
  ] },
  spielzeug: { nav: 'Spielzeug', eyebrow: 'Spielspaß mit Augenmaß', title: 'Spielzeug-Finder', intro: 'Finde altersgerechte Ideen zum Bauen, Spielen, Lernen und gemeinsamen Entdecken.', accent: 'Passt zum Spieltyp', questions: [
    { title: 'Für welches Alter?', options: [{ label: '2–5 Jahre', value: '2' }, { label: '6–9 Jahre', value: '7' }, { label: 'Ab 10 Jahren', value: '10' }, { label: 'Teenager & Erwachsene', value: 'erwachsene' }] },
    { title: 'Was macht am meisten Freude?', options: [{ label: 'Bauen & tüfteln', value: 'lego' }, { label: 'Malen & gestalten', value: 'kreativ' }, { label: 'Gemeinsam spielen', value: 'spiel' }, { label: 'Lernen & entdecken', value: 'lern' }] },
    { title: 'Wie groß ist dein Budget?', options: [{ label: 'Bis 20 €', value: 'klein' }, { label: 'Bis 50 €', value: 'mittel' }, { label: 'Bis 100 €', value: 'gross' }, { label: 'Flexibel', value: 'premium' }] },
  ] },
  christbaumstaender: { nav: 'Christbaumständer', eyebrow: 'Der Baum steht. Der Abend auch.', title: 'Christbaumständer-Finder', intro: 'Baumhöhe, Stamm und Komfort entscheiden. Wir bringen dich zur passenden Größenklasse.', accent: 'Passend zu deinem Baum', questions: [
    { title: 'Wie hoch ist dein Baum?', options: [{ label: 'Bis 2,2 m', value: 'klein' }, { label: 'Bis 2,5 m', value: 'mittel' }, { label: 'Bis 2,7 m', value: 'gross' }, { label: 'Bis 3,0 m', value: 'sehr-gross' }] },
    { title: 'Was ist dir besonders wichtig?', options: [{ label: 'Einfach aufstellen', value: 'einfach' }, { label: 'Maximal stabil', value: 'stabil' }, { label: 'Recyceltes Material', value: 'green' }, { label: 'Großer Wassertank', value: 'premium' }] },
    { title: 'Wo steht der Baum?', options: [{ label: 'Wohnung', value: 'wohnung' }, { label: 'Familien-Wohnzimmer', value: 'familie' }, { label: 'Großer Raum', value: 'gross' }, { label: 'Sehr großer Raum', value: 'premium' }] },
  ] },
  lichterkette: { nav: 'Lichterkette', eyebrow: 'Licht für drinnen und draußen', title: 'Lichterketten-Finder', intro: 'Einsatzort, Länge und Lichtwirkung führen dich zur richtigen Weihnachtsbeleuchtung.', accent: 'Leuchtet am richtigen Ort', questions: [
    { title: 'Wo soll sie leuchten?', options: [{ label: 'Am Weihnachtsbaum', value: 'innen' }, { label: 'Fenster & Zimmer', value: 'innen' }, { label: 'Balkon & Terrasse', value: 'außen' }, { label: 'Haus & Garten', value: 'außen' }] },
    { title: 'Welche Lichtwirkung?', options: [{ label: 'Warm und klassisch', value: 'warmweiß' }, { label: 'Fein und dezent', value: 'micro' }, { label: 'Üppig und festlich', value: 'eisregen' }, { label: 'Bunt & steuerbar', value: 'rgb' }] },
    { title: 'Welche Größenordnung?', options: [{ label: 'Kurz, bis 5 m', value: 'klein' }, { label: 'Mittel, bis 20 m', value: 'mittel' }, { label: 'Lang, bis 40 m', value: 'gross' }, { label: 'Sehr lang', value: 'premium' }] },
  ] },
};

export function isFinderKind(value: string): value is FinderKind { return value in finderContent; }
