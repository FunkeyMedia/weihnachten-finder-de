import Link from 'next/link';

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header ${light ? 'site-header-light' : ''}`}>
      <Link href="/" className="brand" aria-label="Weihnachten-Finder Startseite">
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>weihnachten-<strong>finder</strong>.de</span>
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/finder">Geschenk finden</Link>
        <Link href="/vergleich">Vergleichen</Link>
        <Link href="/ratgeber">Ratgeber</Link>
        <Link href="/so-funktionierts">Unsere Methode</Link>
      </nav>
      <Link className="nav-cta" href="/finder">Finder starten</Link>
    </header>
  );
}
