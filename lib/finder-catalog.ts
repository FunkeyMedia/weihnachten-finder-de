import rawProducts from '@/data/products.json';
import { imageById } from '@/lib/product-visuals';

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

type RawProduct = {
  product_id: string;
  product_type: string;
  editorial_title: string;
  main_category: string;
  short_description: string;
  key_features: string;
  advantages: string;
  current_price: number;
  star_rating: number | null;
  amazon_affiliate_url: string;
  target_group: string;
  recommended_age: string;
};

const catalog = rawProducts as RawProduct[];
const affiliateTag = 'onlinestarkei-21';

function fromCatalog(ids: string[], tags: string[]): FinderProduct[] {
  return ids.flatMap((id) => {
    const item = catalog.find((product) => product.product_id === id && product.product_type === 'Hauptprodukt');
    if (!item) return [];
    return [{
      id: item.product_id,
      title: item.editorial_title,
      category: item.main_category,
      description: item.short_description,
      features: [item.key_features, item.advantages],
      price: item.current_price,
      rating: item.star_rating,
      image: imageById[item.product_id],
      amazonUrl: item.amazon_affiliate_url,
      tags: [...tags, item.target_group.toLowerCase(), item.recommended_age.toLowerCase(), item.current_price <= 20 ? 'klein' : item.current_price <= 50 ? 'mittel' : 'gross'],
    }];
  });
}

const treeStands: FinderProduct[] = [
  { id: 'tree-s', title: 'KRINNER Green Line Comfort Grip S', category: 'Christbaumständer', description: 'Kompakter Einseil-Ständer für kleinere bis mittlere Bäume. Die sinnvolle Wahl für Wohnungen und Bäume bis etwa 2,2 Meter.', features: ['bis ca. 2,2 m Baumhöhe', 'bis 11 cm Stamm, 3,0 l Wassertank'], amazonUrl: `https://www.amazon.de/s?k=KRINNER+Green+Line+Comfort+Grip+S&tag=${affiliateTag}`, tags: ['klein', 'mittel', 'wohnung', 'einfach'] },
  { id: 'tree-m', title: 'KRINNER Green Line Comfort Grip M', category: 'Christbaumständer', description: 'Der ausgewogene Allrounder für typische Wohnzimmerbäume mit Fußpedal, Einseiltechnik und Füllstandsanzeige.', features: ['bis ca. 2,5 m Baumhöhe', 'bis 12 cm Stamm, 3,5 l Wassertank'], amazonUrl: `https://www.amazon.de/s?k=KRINNER+Green+Line+Comfort+Grip+M+94129&tag=${affiliateTag}`, tags: ['mittel', 'gross', 'familie', 'einfach'] },
  { id: 'tree-l', title: 'KRINNER Premium Ultra Grip L', category: 'Christbaumständer', description: 'Robuste Lösung für größere Weihnachtsbäume. Mehr Gewicht und Standfläche bringen zusätzliche Reserven.', features: ['bis ca. 2,7 m Baumhöhe', 'bis 12 cm Stamm, 3,7 l Wassertank'], amazonUrl: `https://www.amazon.de/s?k=KRINNER+Premium+Ultra+Grip+L&tag=${affiliateTag}`, tags: ['gross', 'premium', 'familie', 'stabil'] },
  { id: 'tree-xl', title: 'KRINNER Premium Ultra Grip XL', category: 'Christbaumständer', description: 'Für besonders hohe und schwere Bäume mit größerem Wasserreservoir und breiterem Stand.', features: ['bis ca. 3,0 m Baumhöhe', 'bis 12 cm Stamm, 4,5 l Wassertank'], amazonUrl: `https://www.amazon.de/s?k=KRINNER+Premium+Ultra+Grip+XL&tag=${affiliateTag}`, tags: ['premium', 'sehr-gross', 'stabil'] },
];

export const finderProducts: Record<FinderKind, FinderProduct[]> = {
  geschenk: fromCatalog(['P0001', 'P0084', 'P0126', 'P0155', 'P0171', 'P0199'], ['geschenk']),
  spielzeug: fromCatalog(['P0083', 'P0108', 'P0126', 'P0155', 'P0198', 'P0199'], ['spielzeug']),
  christbaumstaender: treeStands,
  lichterkette: fromCatalog(['P0022', 'P0023', 'P0032', 'P0034', 'P0042', 'P0193'], ['lichterkette']),
};

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
