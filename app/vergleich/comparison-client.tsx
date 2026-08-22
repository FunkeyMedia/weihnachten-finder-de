'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AffiliateButton } from '@/components/affiliate-button';
import { ProductVisual } from '@/components/product-visual';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/format';

const defaults = ['P0001', 'P0031', 'P0091'];

type CompareProduct = Pick<Product, 'product_id' | 'editorial_title' | 'main_category' | 'current_price' | 'selection_score_0_100' | 'star_rating' | 'review_count' | 'target_group' | 'advantages' | 'limitations' | 'checked_at' | 'amazon_affiliate_url'>;

export function ComparisonClient({ catalog }: { catalog: CompareProduct[] }) {
  const [selectedIds, setSelectedIds] = useState(defaults);
  useEffect(() => { const ids = new URLSearchParams(window.location.search).get('ids')?.split(',').map((id) => id.toUpperCase()).filter(Boolean); if (ids && ids.length >= 2) queueMicrotask(() => setSelectedIds(ids.slice(0, 4))); }, []);
  const selected = selectedIds.map((id) => catalog.find((product) => product.product_id === id)).filter(Boolean) as CompareProduct[];
  const addProduct = (id: string) => { if (!selectedIds.includes(id) && selectedIds.length < 4) setSelectedIds([...selectedIds, id]); };
  const remove = (id: string) => { if (selectedIds.length > 2) setSelectedIds(selectedIds.filter((item) => item !== id)); };
  const bestPrice = Math.min(...selected.map((product) => product.current_price));
  const bestScore = Math.max(...selected.map((product) => product.selection_score_0_100));

  return (
    <main>
      <SiteHeader />
      <section className="page-hero compact-hero"><p className="section-kicker">Produktvergleich</p><h1>Wichtige Unterschiede.<br/><em>Ohne Tabellenwüste.</em></h1><p>Vergleiche zwei bis vier Produkte. Fehlende Informationen bleiben sichtbar – wir ergänzen nichts, was die Daten nicht hergeben.</p></section>
      <section className="compare-section">
        <div className="compare-toolbar"><label htmlFor="add-product">Produkt hinzufügen</label><select id="add-product" defaultValue="" onChange={(event) => { addProduct(event.target.value); event.target.value = ''; }} disabled={selectedIds.length >= 4}><option value="" disabled>{selectedIds.length >= 4 ? 'Maximal vier Produkte' : 'Aus 200 Hauptprodukten wählen'}</option>{catalog.filter((product) => !selectedIds.includes(product.product_id)).map((product) => <option key={product.product_id} value={product.product_id}>{product.editorial_title}</option>)}</select><span>{selectedIds.length} / 4 ausgewählt</span></div>
        <div className="comparison-grid" style={{ '--columns': selected.length } as React.CSSProperties}>
          {selected.map((product) => (
            <article className="comparison-product" key={product.product_id}>
              <button className="remove-compare" onClick={() => remove(product.product_id)} disabled={selected.length <= 2} aria-label={`${product.editorial_title} aus Vergleich entfernen`}>×</button>
              <ProductVisual product={product} />
              <p className="card-category">{product.main_category}</p><h2>{product.editorial_title}</h2>
              <div className="comparison-value"><span>Budgetorientierung</span><strong>{formatPrice(product.current_price)}</strong>{product.current_price === bestPrice && <em>niedrigster Preis</em>}</div>
              <div className="comparison-value"><span>Auswahlscore</span><strong>{product.selection_score_0_100} / 100</strong>{product.selection_score_0_100 === bestScore && <em>stärkstes Basissignal</em>}</div>
              <div className="comparison-value"><span>Sichtbare Bewertung</span><strong>{product.star_rating ? `${product.star_rating} / 5` : 'Keine Angabe'}</strong><small>{product.review_count ? `${product.review_count.toLocaleString('de-DE')} Rezensionen` : 'Auf Übersichtsseite nicht eindeutig sichtbar'}</small></div>
              <div className="comparison-value"><span>Geeignet für</span><p>{product.target_group}</p></div>
              <div className="comparison-value"><span>Stärke</span><p>{product.advantages}</p></div>
              <div className="comparison-value"><span>Grenze</span><p>{product.limitations}</p></div>
              <small className="checked-note">Daten geprüft am {new Intl.DateTimeFormat('de-DE').format(new Date(product.checked_at))}</small>
              <AffiliateButton href={product.amazon_affiliate_url} productId={product.product_id} compact />
              <Link className="text-link" href={`/produkte/${product.product_id.toLowerCase()}`}>Details ansehen →</Link>
            </article>
          ))}
        </div>
        <p className="data-note">Preise und Verfügbarkeit sind Momentaufnahmen. Der Auswahlscore ist ein redaktioneller Proxy aus sichtbaren Signalen, kein Testergebnis.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
