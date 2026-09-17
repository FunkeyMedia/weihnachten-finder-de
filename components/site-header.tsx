import Link from 'next/link';

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header ${light ? 'site-header-light' : ''}`}>
      <Link href="/" className="brand" aria-label="Weihnachten-Finder Startseite">
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>weihnachten-<strong>finder</strong>.de</span>
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/finden/geschenk">Geschenk</Link>
        <Link href="/finden/spielzeug">Spielzeug</Link>
        <Link href="/finden/christbaumstaender">Christbaumständer</Link>
        <Link href="/finden/lichterkette">Lichterkette</Link>
      </nav>
      <Link className="nav-cta" href="/#finder-auswahl">Finder wählen</Link>
    </header>
  );
}
