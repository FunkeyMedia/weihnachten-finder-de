import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AffiliateButton } from '@/components/affiliate-button';
import { ProductVisual } from '@/components/product-visual';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { checkedDate, formatPrice, mainProducts, productById, products } from '@/lib/products';

export function generateStaticParams() { return products.map((product) => ({ id: product.product_id.toLowerCase() })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  if (!product) return {};
  return {
    title: `${product.editorial_title} | Weihnachten-Finder`,
    description: product.meta_description,
    alternates: { canonical: `/produkte/${product.product_id.toLowerCase()}` },
    openGraph: { title: product.editorial_title, description: product.meta_description, type: 'article', images: [] },
    twitter: { card: 'summary', title: product.editorial_title, description: product.meta_description, images: [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();
  const related = mainProducts.filter((item) => item.main_category === product.main_category && item.product_id !== product.product_id).slice(0, 3);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Product', name: product.editorial_title, category: product.main_category, description: product.short_description, sku: product.asin };

  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="product-detail">
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/">Start</Link><span>›</span><Link href="/finder">Finder</Link><span>›</span><span>{product.main_category}</span></nav>
        <div className="product-detail-grid">
          <div className="product-detail-visual"><ProductVisual product={product} priority /><p>{product.approval_status === 'Pilot freigegeben' ? 'Markenfreie redaktionelle KI-Illustration – keine Originalabbildung.' : `Kategoriesymbol, da für dieses Produkt keine freigegebene redaktionelle Illustration vorliegt.`}</p></div>
          <div className="product-detail-copy">
            <p className="section-kicker">{product.main_category}</p><h1>{product.editorial_title}</h1>
            <p className="detail-lead">{product.short_description}</p>
            <div className="signal-row"><span><small>Auswahlscore</small><strong>{product.selection_score_0_100} / 100</strong></span><span><small>Sichtbare Bewertung</small><strong>{product.star_rating ? `${product.star_rating} / 5` : 'keine Angabe'}</strong></span><span><small>Budgetklasse</small><strong>{product.gift_budget}</strong></span></div>
            <div className="detail-reason"><strong>Warum wir es aufgenommen haben</strong><p>{product.purchase_argument}</p></div>
            <div className="detail-pros"><div><span aria-hidden="true">+</span><p><strong>Spricht dafür</strong>{product.advantages}</p></div><div><span aria-hidden="true">!</span><p><strong>Vor dem Kauf prüfen</strong>{product.limitations}</p></div></div>
            <div className="purchase-panel"><div><small>Preis-Momentaufnahme vom {checkedDate(product)}</small><strong>{formatPrice(product.current_price)}</strong><span>Aktuellen Preis und Verfügbarkeit bei Amazon prüfen.</span></div><AffiliateButton href={product.amazon_affiliate_url} productId={product.product_id} /></div>
            <p className="affiliate-inline">Affiliate-Link: Bei einem qualifizierten Kauf erhalten wir möglicherweise eine Provision. Für dich ändert sich der Preis dadurch nicht.</p>
          </div>
        </div>
      </section>
      <section className="detail-facts"><h2>Für deine Entscheidung</h2><div><article><strong>Anlass</strong><p>{product.gift_occasion}</p></article><article><strong>Zielgruppe</strong><p>{product.target_group}</p></article><article><strong>Alter</strong><p>{product.recommended_age}</p></article><article><strong>Datenstand</strong><p>{checkedDate(product)}</p></article></div></section>
      <section className="related-section"><div className="section-heading"><div><p className="section-kicker">Ähnliche Ideen</p><h2>Weitere Produkte aus <em>{product.main_category}</em></h2></div><Link href="/finder" className="text-link">Neu berechnen →</Link></div><div className="related-grid">{related.map((item) => <Link href={`/produkte/${item.product_id.toLowerCase()}`} key={item.product_id}><ProductVisual product={item}/><p>{item.editorial_title}</p><strong>{formatPrice(item.current_price)}</strong></Link>)}</div></section>
      <SiteFooter />
    </main>
  );
}
