import { describe, expect, it } from 'vitest';
import { getRecommendations } from '@/lib/products';

describe('gift recommendations', () => {
  it('keeps partner and Genuss recommendations semantically relevant', () => {
    const recommendations = getRecommendations({
      recipient: 'partner',
      interest: 'genuss',
      budget: 'mittel',
      intention: 'offen',
    });

    expect(recommendations).toHaveLength(3);
    expect(recommendations.map((product) => product.product_id)).not.toContain('P0048');
    expect(recommendations.map((product) => product.product_id)).not.toContain('P0077');
    expect(recommendations.map((product) => product.product_id)).not.toContain('P0091');
    expect(recommendations.map((product) => product.product_id)).not.toContain('P0068');
    expect(
      recommendations.every((product) =>
        /genuss|küche|kochen|backen|rezept|nüsse|glühwein|tee|kaffee|schokolade|gewürz|müsli/i.test(
          `${product.main_category} ${product.subcategory} ${product.editorial_title}`,
        ),
      ),
    ).toBe(true);
  });
});
