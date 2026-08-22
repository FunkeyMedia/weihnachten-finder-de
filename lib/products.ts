import rawProducts from '@/data/products.json';

export type Product = {
  product_id: string;
  product_type: 'Hauptprodukt' | 'Zubehör';
  related_main_product_id: string;
  asin: string;
  amazon_title: string;
  editorial_title: string;
  brand_manufacturer: string;
  main_category: string;
  subcategory: string;
  gift_occasion: string;
  target_group: string;
  recommended_age: string;
  current_price: number;
  currency: string;
  star_rating: number | null;
  review_count: number | null;
  selection_score_0_100: number;
  key_features: string;
  advantages: string;
  limitations: string;
  purchase_argument: string;
  short_description: string;
  seo_title: string;
  meta_description: string;
  gift_budget: string;
  amazon_affiliate_url: string;
  checked_at: string;
  image_filename: string;
  approval_status: string;
};

export type FinderAnswers = {
  recipient: string;
  interest: string;
  budget: string;
  intention: string;
  mode?: string;
};

export type ScoredProduct = Product & {
  matchScore: number;
  reasons: string[];
};

export const products = rawProducts as Product[];
export const mainProducts = products.filter((product) => product.product_type === 'Hauptprodukt');

const interestTerms: Record<string, string[]> = {
  genuss: ['Küche', 'Beauty', 'Adventskalender'],
  technik: ['Elektronik', 'Beleuchtung', 'Smart Home'],
  gemuetlich: ['Wohnambiente', 'Mode', 'Beauty', 'Bücher'],
  aktiv: ['Sport', 'Freizeit', 'Spielzeug'],
  kreativ: ['kreative', 'Bücher', 'Spielzeug', 'Geschenkverpackung'],
  familie: ['Familien', 'Spielzeug', 'Adventskalender'],
  haustier: ['Haustier'],
  deko: ['Weihnachtsdekoration', 'Baumschmuck', 'Beleuchtung'],
};

const recipientTerms: Record<string, string[]> = {
  partner: ['Erwachsene', 'Paare'],
  eltern: ['Erwachsene', 'Familien'],
  kind: ['Kinder', 'Familien'],
  freunde: ['Erwachsene', 'Paare'],
  kollegen: ['Erwachsene'],
  haustier: ['Haustier'],
};

export function budgetCeiling(value: string) {
  return ({ klein: 20, mittel: 50, gross: 100, premium: 1000 } as Record<string, number>)[value] ?? 1000;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export function scoreProduct(product: Product, answers: FinderAnswers): ScoredProduct {
  const haystack = `${product.main_category} ${product.subcategory} ${product.target_group}`.toLowerCase();
  const reasons: string[] = [];
  // Keep enough headroom for the answers to matter. The editorial selection
  // score is a quality baseline, not the final recommendation by itself.
  let score = product.selection_score_0_100 * 0.28;
  const maxBudget = budgetCeiling(answers.budget);

  const interests = interestTerms[answers.interest] ?? [];
  if (!interests.length || interests.some((term) => haystack.includes(term.toLowerCase()))) {
    score += 25;
    reasons.push('passt zum gewünschten Interessenbereich');
  }

  const recipients = recipientTerms[answers.recipient] ?? [];
  if (!recipients.length || recipients.some((term) => haystack.includes(term.toLowerCase()))) {
    score += 12;
    reasons.push('ist für die ausgewählte Personengruppe plausibel');
  }

  if (product.current_price <= maxBudget) {
    score += 16;
    reasons.push('liegt innerhalb des gewählten Budgets');
  } else {
    score -= Math.min(28, ((product.current_price - maxBudget) / Math.max(maxBudget, 1)) * 22);
  }

  if (answers.intention === 'praktisch' && /Elektronik|Küche|Haushalt|Sport|Zubehör/.test(product.main_category)) score += 7;
  if (answers.intention === 'emotional' && /Advent|Beauty|Mode|Bücher|Spielzeug/.test(product.main_category)) score += 7;
  if (answers.intention === 'wow' && product.current_price >= 45) score += 7;
  if (answers.intention === 'gemeinsam' && /Familien|Spielzeug|Küche|Advent/.test(haystack)) score += 7;

  if (product.star_rating && product.star_rating >= 4.5) {
    score += 4;
    reasons.push('zeigt ein starkes sichtbares Bewertungssignal');
  }
  if (product.review_count && product.review_count >= 500) score += 2;

  return { ...product, matchScore: Math.max(32, Math.min(97, Math.round(score))), reasons: reasons.slice(0, 3) };
}

export function getRecommendations(answers: FinderAnswers) {
  const ranked = mainProducts.map((product) => scoreProduct(product, answers)).sort((a, b) => b.matchScore - a.matchScore);
  const best = ranked[0];
  const budget = ranked.find((item) => item.product_id !== best.product_id && item.current_price < best.current_price) ?? ranked[1];
  const special = ranked.find((item) => item.product_id !== best.product_id && item.product_id !== budget.product_id && item.main_category !== best.main_category) ?? ranked[2];
  return [best, budget, special];
}

export function productById(id: string) {
  return products.find((product) => product.product_id.toLowerCase() === id.toLowerCase());
}

export function checkedDate(product: Product) {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(product.checked_at));
}
