import type { Metadata } from 'next';
import Link from 'next/link';
import { AffiliateButton } from '@/components/affiliate-button';
import { ProductVisual } from '@/components/product-visual';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { checkedDate, formatPrice, getRecommendations, type FinderAnswers } from '@/lib/products';

export const metadata: Metadata = { title: 'Deine Empfehlungen | Weihnachten-Finder', description: 'Drei transparent begründete Geschenkempfehlungen passend zu deinen Antworten.', robots: { index: false, follow: true } };

const labels: Record<string, string> = { partner: 'Partner:in', eltern: 'Eltern & Familie', kind: 'Kind', freunde: 'Freund:in', kollegen: 'Kolleg:in', haustier: 'Tierfreund:in', genuss: 'Genuss', technik: 'Technik', gemuetlich: 'Gemütlichkeit', aktiv: 'Aktiv sein', kreativ: 'Kreativität', deko: 'Weihnachtsstimmung', offen: 'offen', klein: 'bis 20 €', mittel: 'bis 50 €', gross: 'bis 100 €', premium: 'flexibel', praktisch: 'praktisch', emotional: 'persönlich', wow: 'überraschend', gemeinsam: 'gemeinsam' };

export default async function ResultPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const value = (key: string, fallback: string) => typeof query[key] === 'string' ? query[key] as string : fallback;
  const answers: FinderAnswers = { recipient: value('recipient', 'freunde'), interest: value('interest', 'offen'), budget: value('budget', 'mittel'), intention: value('intention', 'offen'), mode: value('mode', 'quick') };
  const matches = getRecommendations(answers);
  const editParams = new URLSearchParams(answers as Record<string, string>).toString();
  const compareIds = matches.map((item) => item.product_id.toLowerCase()).join(',');
  const roles = ['Unsere beste Empfehlung für dich', 'Die preisbewusste Alternative', 'Die besondere Alternative'];

  return (
    <main>
      <SiteHeader />
      <section className="result-hero">
        <p className="section-kicker">Deine persönliche Auswahl</p>
        <h1>Drei Empfehlungen.<br/><em>Eine klare Entscheidung.</em></h1>
        <p>Wir haben 200 Hauptprodukte anhand deiner Antworten neu gewichtet. So entsteht kein „Testsieger“, sondern eine nachvollziehbare Passung.</p>
        <div className="answer-summary"><span>Für: <strong>{labels[answers.recipient]}</strong></span><span>Interesse: <strong>{labels[answers.interest]}</strong></span><span>Budget: <strong>{labels[answers.budget]}</strong></span><span>Wirkung: <strong>{labels[answers.intention]}</strong></span><Link href={`/finder?${editParams}`}>Antworten anpassen</Link></div>
      </section>

      <section className="result-list">
        {matches.map((product, index) => (
          <article className={`result-card ${index === 0 ? 'result-card-best' : ''}`} key={product.product_id}>
            <div className="result-rank"><span>0{index + 1}</span><p>{roles[index]}</p></div>
            <ProductVisual product={product} priority={index === 0} />
            <div className="result-content">
              <div className="match-meter" aria-label={`${product.matchScore} Prozent Match`}><span style={{ '--score': `${product.matchScore * 3.6}deg` } as React.CSSProperties}><b>{product.matchScore}%</b><small>Match</small></span></div>
              <p className="card-category">{product.main_category}</p>
              <h2>{product.editorial_title}</h2>
              <p className="result-why">{product.purchase_argument}</p>
              <div className="reason-list"><strong>Warum es passt</strong>{product.reasons.map((reason) => <p key={reason}><span aria-hidden="true">✓</span>{reason}</p>)}</div>
              <div className="pros-cons"><div><strong>Pluspunkt</strong><p>{product.advantages}</p></div><div><strong>Beachte</strong><p>{product.limitations}</p></div></div>
              <div className="result-actions"><div><small>Preis-Momentaufnahme vom {checkedDate(product)}</small><strong>{formatPrice(product.current_price)}</strong></div><AffiliateButton href={product.amazon_affiliate_url} productId={product.product_id} /><Link className="text-link" href={`/produkte/${product.product_id.toLowerCase()}`}>Alle Details →</Link></div>
            </div>
          </article>
        ))}
        <div className="compare-callout"><div><p className="section-kicker">Noch unsicher?</p><h2>Unterschiede direkt nebeneinander sehen.</h2></div><Link className="button button-secondary" href={`/vergleich?ids=${compareIds}`}>Diese drei vergleichen <span aria-hidden="true">→</span></Link></div>
      </section>
      <section className="method-note"><strong>Was der Match-Score bedeutet</strong><p>Der Score kombiniert Weihnachtsrelevanz, Interessenübereinstimmung, Zielgruppe, Budget und sichtbare Nachfrage-/Bewertungssignale. Er ist kein Produkttest und keine Umsatzangabe.</p><Link href="/so-funktionierts">Berechnung vollständig ansehen →</Link></section>
      <SiteFooter />
    </main>
  );
}
