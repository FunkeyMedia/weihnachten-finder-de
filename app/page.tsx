import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getRecommendations } from '@/lib/products';

export default function Home() {
  const sample = getRecommendations({ recipient: 'partner', interest: 'gemuetlich', budget: 'mittel', intention: 'emotional' });
  return (
    <main>
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/heroes/familie-baum.webp" alt="Eine Familie schmückt gemeinsam einen leuchtenden Weihnachtsbaum" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Geschenk-Kompass für Weihnachten</p>
          <h1 id="hero-title">Weniger suchen.<br/><em>Schöner schenken.</em></h1>
          <p className="hero-copy">Ein paar ehrliche Fragen. Drei nachvollziehbare Empfehlungen. Und endlich das gute Gefühl, das Richtige gefunden zu haben.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/finder">Geschenk-Finder starten <span aria-hidden="true">→</span></Link>
            <a className="button button-quiet" href="#so-gehts">So funktioniert’s</a>
          </div>
          <p className="hero-note"><span aria-hidden="true">✓</span> Kostenlos · ohne Anmeldung · in unter 1 Minute</p>
        </div>
        <aside className="trust-card" aria-label="Transparenzhinweis">
          <span className="trust-icon" aria-hidden="true">◎</span>
          <p><strong>Keine gekauften Bestenlisten.</strong><br/>Empfehlungen nach deinen Antworten – transparent erklärt.</p>
        </aside>
      </section>

      <section className="promise-strip" id="so-gehts" aria-label="So funktioniert der Finder">
        <p><strong>01</strong><span><b>Wünsche verstehen</b><small>Nur Fragen, die wirklich etwas ändern.</small></span></p>
        <p><strong>02</strong><span><b>Produkte abgleichen</b><small>Regelbasiert statt Bauchgefühl.</small></span></p>
        <p><strong>03</strong><span><b>Entscheidung erklären</b><small>Vorteile, Grenzen und Alternativen.</small></span></p>
      </section>

      <section className="section intro-section">
        <div className="section-kicker">Ein Finder, der zuhört</div>
        <div className="split-heading"><h2>Nicht mehr Auswahl.<br/><em>Mehr Klarheit.</em></h2><p>Aus 250 kuratierten Geschenk- und Weihnachtsideen filtern wir die Vorschläge, die zu Person, Interessen und Budget passen. Ohne vermeintliche Tests, ohne künstlichen Zeitdruck.</p></div>
        <div className="feature-grid">
          <article><span>01</span><h3>Eine Frage nach der anderen</h3><p>Große Antwortflächen, verständliche Sprache und jederzeit zurück – ohne Datenverlust.</p></article>
          <article><span>02</span><h3>Ein Score, den du verstehst</h3><p>Interessen, Zielgruppe, Budget und sichtbare Produktsignale ergeben deinen Match-Score.</p></article>
          <article><span>03</span><h3>Drei echte Optionen</h3><p>Gesamttreffer, preisbewusste Wahl und Spezialalternative statt endloser Trefferlisten.</p></article>
        </div>
      </section>

      <section className="section recommendation-preview">
        <div className="section-heading"><div><p className="section-kicker">So kann dein Ergebnis aussehen</p><h2>Drei Wege zum <em>richtigen Geschenk.</em></h2></div><Link className="text-link" href="/finder">Meine Empfehlungen berechnen <span aria-hidden="true">→</span></Link></div>
        <div className="product-grid">
          <ProductCard product={sample[0]} label="Bester Gesamttreffer" />
          <ProductCard product={sample[1]} label="Preisbewusste Alternative" />
          <ProductCard product={sample[2]} label="Besondere Alternative" />
        </div>
        <p className="data-note">Beispiel auf Basis des Katalog-Datenstands 22.08.2026. Preise und Verfügbarkeit bitte bei Amazon prüfen.</p>
      </section>

      <section className="story-section">
        <Image src="/images/heroes/paar-markt.webp" alt="Ein Paar genießt gemeinsam einen verschneiten Weihnachtsmarkt" fill sizes="100vw" />
        <div className="story-overlay" />
        <div className="story-copy"><p className="section-kicker">Schenken ist persönlich</p><blockquote>„Nicht das teuerste Geschenk bleibt. Sondern das, bei dem man merkt: Jemand hat zugehört.“</blockquote><Link className="button button-primary" href="/finder">Jetzt passend auswählen <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="section trust-section">
        <div><p className="section-kicker">Transparent von Anfang an</p><h2>Vertrauen ist kein Siegel.<br/><em>Es ist eine Erklärung.</em></h2></div>
        <div className="trust-list">
          <p><strong>250</strong><span>kuratierten Produktdatensätze mit eindeutiger ASIN</span></p>
          <p><strong>25/25</strong><span>systematisch geprüfte Affiliate-Links in der Stichprobe</span></p>
          <p><strong>0</strong><span>erfundene Tests, Nutzerstimmen oder Echtzeitversprechen</span></p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
