import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

export default function NotFound() { return <main><SiteHeader/><section className="not-found"><span>404</span><p className="section-kicker">Diese Spur endet hier</p><h1>Das Geschenk ist weg.<br/><em>Der Finder kennt den Weg.</em></h1><p>Die aufgerufene Seite wurde nicht gefunden oder ist nicht mehr verfügbar.</p><div><Link className="button button-primary" href="/finder">Finder starten →</Link><Link className="button button-secondary" href="/">Zur Startseite</Link></div></section></main>; }
