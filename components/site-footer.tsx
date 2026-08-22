import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <div className="brand brand-footer"><span className="brand-mark" aria-hidden="true">✦</span><span>weihnachten-<strong>finder</strong>.de</span></div>
        <p>Ein transparenter Geschenk-Kompass für Entscheidungen mit gutem Gefühl.</p>
      </div>
      <div><strong>Entdecken</strong><Link href="/finder">Produktfinder</Link><Link href="/vergleich">Vergleich</Link><Link href="/ratgeber">Ratgeber</Link></div>
      <div><strong>Vertrauen</strong><Link href="/so-funktionierts">So empfehlen wir</Link><Link href="/affiliate-transparenz">Affiliate-Transparenz</Link><Link href="/ueber-uns">Über uns</Link></div>
      <div><strong>Rechtliches</strong><Link href="/kontakt">Kontakt</Link><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></div>
      <p className="affiliate-footnote">Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Preise und Verfügbarkeit können sich ändern.</p>
    </footer>
  );
}
