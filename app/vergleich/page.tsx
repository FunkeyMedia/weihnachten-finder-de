import type { Metadata } from 'next';
import { ComparisonClient } from './comparison-client';
import { mainProducts } from '@/lib/products';

export const metadata: Metadata = { title: 'Produkte vergleichen | Weihnachten-Finder', description: 'Vergleiche zwei bis vier Weihnachtsprodukte anhand der wichtigsten Unterschiede.', alternates: { canonical: '/vergleich' } };
export default function ComparisonPage() {
  const catalog = mainProducts.map(({ product_id, editorial_title, main_category, current_price, selection_score_0_100, star_rating, review_count, target_group, advantages, limitations, checked_at, amazon_affiliate_url }) => ({ product_id, editorial_title, main_category, current_price, selection_score_0_100, star_rating, review_count, target_group, advantages, limitations, checked_at, amazon_affiliate_url }));
  return <ComparisonClient catalog={catalog} />;
}
