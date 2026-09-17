import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { finderContent, type FinderKind } from '@/lib/finder-catalog';

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/heroes/familie-baum.webp" alt="Eine Familie schmückt gemeinsam einen leuchtenden Weihnachtsbaum" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Vier Finder für ein entspanntes Fest</p>
          <h1 id="hero-title">Weihnachten.<br/><em>Einfach gefunden.</em></h1>
          <p className="hero-copy">Geschenke, Spielzeug, Christbaumständer und Lichterketten: Wähle deinen Finder und erhalte drei nachvollziehbare Amazon-Empfehlungen.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#finder-auswahl">Finder auswählen <span aria-hidden="true">→</span></a>
            <a className="button button-quiet" href="#so-gehts">So funktioniert es</a>
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

      <section className="section finder-selection" id="finder-auswahl">
        <div className="section-kicker">Was möchtest du finden?</div>
        <div className="split-heading"><h2>Vier Wege.<br/><em>Drei klare Treffer.</em></h2><p>Jeder Finder stellt nur die Fragen, die für seine Produktwelt zählen. Danach erhältst du eine kleine, verständlich begründete Auswahl.</p></div>
        <div className="finder-menu-grid">{(Object.keys(finderContent) as FinderKind[]).map((kind, index) => <Link href={`/finden/${kind}`} className={`finder-menu-card finder-menu-${kind}`} key={kind}><span>0{index + 1}</span><div><p>{finderContent[kind].eyebrow}</p><h3>{finderContent[kind].title}</h3><small>{finderContent[kind].intro}</small></div><b aria-hidden="true">→</b></Link>)}</div>
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
