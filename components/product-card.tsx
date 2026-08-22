import Link from 'next/link';
import { ProductVisual } from '@/components/product-visual';
import { formatPrice, type ScoredProduct } from '@/lib/products';

export function ProductCard({ product, label }: { product: ScoredProduct; label: string }) {
  return (
    <article className="product-card">
      <div className="product-card-topline"><span>{label}</span><strong>{product.matchScore}% Match</strong></div>
      <ProductVisual product={product} />
      <div className="product-card-body">
        <p className="card-category">{product.main_category}</p>
        <h3>{product.editorial_title}</h3>
        <p>{product.reasons[0] ?? product.purchase_argument}</p>
        <div className="card-price"><span>Budgetorientierung</span><strong>{formatPrice(product.current_price)}</strong></div>
        <Link className="text-link" href={`/produkte/${product.product_id.toLowerCase()}`}>Warum es passt <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
