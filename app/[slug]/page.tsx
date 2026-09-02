import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type ContentPage = { kicker: string; title: string; intro: string; sections: { title: string; body: string }[]; action?: string; image?: string };

const pages: Record<string, ContentPage> = {
  ratgeber: { kicker: 'Kaufberatung', title: 'Ein gutes Geschenk beginnt nicht beim Produkt.', intro: 'Es beginnt bei der Person. Dieser kurze Leitfaden hilft dir, Wünsche zu erkennen, ohne direkt nach einer Einkaufsliste zu fragen.', image: '/images/heroes/backen.webp', action: 'Mit dem Finder anwenden', sections: [
    { title: '1. An Alltag statt Alter denken', body: 'Alter und Geschlecht sagen wenig über ein passendes Geschenk. Aussagekräftiger ist, wie jemand freie Zeit verbringt, welche kleinen Probleme immer wieder auftauchen und welche Rituale Freude machen.' },
    { title: '2. Die gewünschte Wirkung klären', body: 'Soll das Geschenk praktisch helfen, emotionale Nähe zeigen, überraschen oder gemeinsame Zeit schaffen? Diese Wirkung ist im Finder ein eigenes Kriterium und kann zwei scheinbar ähnliche Produkte klar voneinander trennen.' },
    { title: '3. Budget als Rahmen verstehen', body: 'Ein Preisrahmen schafft Orientierung. Er sagt nichts über die Bedeutung des Geschenks aus. Deshalb zeigen wir neben dem besten Gesamttreffer immer eine preisbewusste und eine besondere Alternative.' },
    { title: '4. Grenzen ehrlich prüfen', body: 'Kompatibilität, Größe, Material, Altersempfehlung und Lieferbarkeit gehören vor dem Kauf kontrolliert. Unsere Empfehlungen erklären deshalb nicht nur Vorteile, sondern auch mögliche Einschränkungen.' },
  ]},
  'so-funktionierts': { kicker: 'Unsere Methode', title: 'Nachvollziehbar empfehlen statt behaupten.', intro: 'Unser Match-Score ist eine regelbasierte Entscheidungshilfe. Er ist kein Produkttest, kein Umsatzranking und keine Garantie, dass ein Geschenk gefallen wird.', sections: [
    { title: 'Welche Daten wir verwenden', body: 'Der Katalog enthält 200 Hauptprodukte und 50 Zubehörideen mit eindeutiger ASIN. Grundlage sind sichtbare Amazon.de-Bestseller- und Suchsignale, Produktkategorie, Zielgruppe, Preisrahmen, Bewertung und Rezensionszahl – jeweils als Momentaufnahme.' },
    { title: 'Wie der Match-Score entsteht', body: 'Weihnachtsrelevanz und der redaktionelle Auswahlscore bilden die Basis. Interessenübereinstimmung, Zielgruppe und Budget erhalten die stärksten zusätzlichen Gewichte. Die gewünschte Wirkung und starke sichtbare Bewertungssignale verfeinern das Ergebnis.' },
    { title: 'Was wir bewusst nicht tun', body: 'Wir erfinden keine Umsätze, Tests, Preise, Rabatte, Verfügbarkeiten oder Nutzerstimmen. Ein hoher Score bedeutet gute Regelpassung zu deinen Antworten – nicht objektive Überlegenheit für alle Menschen.' },
    { title: 'Warum Affiliate-Links das Ergebnis nicht kaufen', body: 'Unsere Finanzierung ändert die Berechnung nicht. Die Partner-ID wird erst an den gekennzeichneten Amazon-Link angehängt. Ein möglicher Provisionsanspruch entsteht nur bei einem qualifizierten Kauf.' },
  ]},
  'ueber-uns': { kicker: 'Über Weihnachten-Finder', title: 'Mehr Freude an der Entscheidung.', intro: 'weihnachten-finder.de ist ein unabhängiges Empfehlungsprojekt mit dem Ziel, Weihnachtseinkäufe verständlicher, ruhiger und ehrlicher zu machen.', sections: [
    { title: 'Unser Anspruch', body: 'Wir verbinden klare Sprache, regelbasierte Empfehlungen und transparente Grenzen. Der Finder soll Orientierung geben, ohne Druck, künstliche Verknappung oder erfundene Autorität.' },
    { title: 'Unsere Datenarbeit', body: 'Produktdaten werden strukturiert erfasst, kategorisiert und mit redaktionellen Entscheidungskriterien ergänzt. Preise und Verfügbarkeiten bleiben dynamisch und werden deshalb als Momentaufnahme behandelt.' },
    { title: 'Unsere Finanzierung', body: 'Gekennzeichnete Links führen zu Amazon. Bei qualifizierten Käufen können wir eine Provision erhalten. Für Nutzerinnen und Nutzer entstehen dadurch keine zusätzlichen Kosten.' },
  ]},
  kontakt: { kicker: 'Kontakt', title: 'Fragen, Hinweise oder eine Korrektur?', intro: 'Transparenz funktioniert nur, wenn Rückmeldungen ankommen. Schreib uns bei fehlerhaften Produktdaten, Fragen zur Methode oder technischen Problemen.', action: 'E-Mail schreiben', sections: [
    { title: 'So erreichst du uns', body: 'E-Mail: pascal@funkeymedia.de. Bitte nenne bei Produktkorrekturen die Produkt-ID oder ASIN sowie die Seite, auf der dir der Fehler aufgefallen ist.' },
    { title: 'Bearbeitungszeit', body: 'Wir priorisieren Hinweise zu falschen Links, nicht mehr verfügbaren Produkten und unklaren Affiliate-Kennzeichnungen.' },
  ]},
  impressum: { kicker: 'Rechtliches', title: 'Impressum', intro: 'Anbieterkennzeichnung und redaktionelle Verantwortung für weihnachten-finder.de.', sections: [
    { title: 'Angaben gemäß § 5 DDG', body: 'Pascal Weyers · Birkenwaldstr. 46 · 63179 Obertshausen · Deutschland' },
    { title: 'Kontakt', body: 'E-Mail: pascal@funkeymedia.de' },
    { title: 'Umsatzsteuer-Identifikationsnummer', body: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE299749508' },
  ]},
  datenschutz: { kicker: 'Rechtliches', title: 'Datenschutzerklärung', intro: 'Welche Daten beim Besuch, im Finder und beim Öffnen gekennzeichneter Partnerlinks verarbeitet werden. Stand: 2. September 2026.', sections: [
    { title: 'Verantwortlicher', body: 'Pascal Weyers · Birkenwaldstr. 46 · 63179 Obertshausen · E-Mail: pascal@funkeymedia.de' },
    { title: 'Hosting und Server-Protokolle', body: 'Diese Website wird über Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, bereitgestellt. Beim Aufruf verarbeitet Vercel technisch erforderliche Verbindungsdaten, insbesondere IP-Adresse, Zeitpunkt, angeforderte Adresse, Referrer, Browser- und Geräteinformationen sowie Statuscodes. Zweck ist die sichere und stabile Auslieferung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Soweit Vercel in unserem Auftrag verarbeitet, gilt ein Auftragsverarbeitungsvertrag. Übermittlungen in die USA werden insbesondere auf das EU-US Data Privacy Framework und ergänzend auf Standardvertragsklauseln gestützt.' },
    { title: 'Finder-Zwischenstand', body: 'Antworten des Produktfinders werden ausschließlich im lokalen Speicher des verwendeten Browsers gespeichert. Sie dienen dazu, den Zwischenstand auf diesem Gerät wiederherzustellen, und werden nicht als Nutzerprofil an unseren Server übertragen.' },
    { title: 'Affiliate-Klickereignisse und Amazon', body: 'Beim Klick auf einen gekennzeichneten Amazon-Link wird ein minimales Ereignis mit Produkt-ID, Seitenpfad und Zeitpunkt serverseitig protokolliert. Es enthält bewusst keinen Namen, keine E-Mail und keine Finder-Antworten. Anschließend verlässt du unsere Website; Amazon verarbeitet Daten nach eigener Verantwortung und kann den Partner-Tag onlinestarkei-21 zuordnen.' },
    { title: 'Speicherdauer und deine Rechte', body: 'Lokale Finder-Daten bleiben bestehen, bis du sie über die Browser-Einstellungen löschst. Technische Serverprotokolle werden nur so lange gespeichert, wie dies für Sicherheit und Fehleranalyse erforderlich ist. Nach Maßgabe der gesetzlichen Voraussetzungen bestehen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Zudem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde, insbesondere beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit.' },
  ]},
  'affiliate-transparenz': { kicker: 'Finanzierung', title: 'Affiliate-Transparenz ohne Kleingedrucktes.', intro: 'Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Wenn du über einen gekennzeichneten Link kaufst, können wir eine Provision erhalten. Für dich verändert sich der Preis dadurch nicht.', sections: [
    { title: 'Wo Affiliate-Links erkennbar sind', body: 'Amazon-Buttons tragen eine klare Kennzeichnung und öffnen sicher in einem neuen Tab. Wir verwenden keine versteckten Weiterleitungen und keine irreführenden Schaltflächen.' },
    { title: 'Was die Provision nicht beeinflusst', body: 'Die Finder-Logik bewertet Regelpassung, Budget, Zielgruppe und sichtbare Produktsignale. Die Höhe einer möglichen Provision ist kein Faktor im Match-Score.' },
    { title: 'Aktualität', body: 'Preise, Bewertungen und Verfügbarkeiten können sich ändern. Deshalb zeigen wir einen Prüfzeitpunkt und verweisen für den aktuellen Stand auf die Amazon-Produktseite.' },
  ]},
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const page = pages[slug]; return page ? { title: `${page.title} | Weihnachten-Finder`, description: page.intro, alternates: { canonical: `/${slug}` } } : {}; }

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = pages[slug]; if (!page) notFound();
  const actionHref = slug === 'kontakt' ? 'mailto:pascal@funkeymedia.de?subject=Weihnachten-Finder' : '/finder';
  return <main><SiteHeader/><section className={`editorial-hero ${page.image ? 'with-image' : ''}`}>{page.image && <><Image src={page.image} alt="Gemeinsames weihnachtliches Erlebnis" fill priority sizes="100vw"/><div className="editorial-shade"/></>}<div><p className="section-kicker">{page.kicker}</p><h1>{page.title}</h1><p>{page.intro}</p>{page.action && <Link className="button button-primary" href={actionHref}>{page.action} <span aria-hidden="true">→</span></Link>}</div></section><section className="article-sections">{page.sections.map((section, index) => <article key={section.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}</section>{!['impressum','datenschutz'].includes(slug) && <section className="article-cta"><p className="section-kicker">Bereit für eine klare Auswahl?</p><h2>In weniger als einer Minute zu drei passenden Ideen.</h2><Link className="button button-secondary" href="/finder">Finder starten →</Link></section>}<SiteFooter/></main>;
}
