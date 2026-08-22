import Image from 'next/image';
import type { Product } from '@/lib/products';
import { categoryVisuals, imageById } from '@/lib/product-visuals';

export function ProductVisual({ product, priority = false }: { product: Pick<Product, 'product_id' | 'main_category' | 'editorial_title'>; priority?: boolean }) {
  const image = imageById[product.product_id];
  const visual = categoryVisuals[product.main_category] ?? { symbol: '✦', tone: 'pine' };
  return (
    <div className={`product-visual tone-${visual.tone}`}>
      {image ? (
        <Image src={image} alt={`Redaktionelle KI-Illustration: ${product.editorial_title}`} fill priority={priority} sizes="(max-width: 700px) 88vw, 400px" />
      ) : (
        <div className="category-art" role="img" aria-label={`Illustratives Kategoriesymbol für ${product.main_category}`}>
          <span>{visual.symbol}</span><small>{product.main_category}</small>
        </div>
      )}
      {image && <span className="ai-label">KI-Illustration</span>}
    </div>
  );
}
