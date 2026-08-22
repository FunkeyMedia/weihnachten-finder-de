# weihnachten-finder.de

Ein transparenter, regelbasierter Geschenk- und Produktempfehlungsfinder für Weihnachtsartikel im deutschen Markt.

## Was die Website kann

- Geführter Produktfinder mit Schnellmodus und ausführlichem Modus
- Automatische Zwischenspeicherung ohne Nutzerkonto
- Nachvollziehbarer Match-Score aus Interessen, Zielgruppe, Budget und Produktsignalen
- Drei differenzierte Empfehlungen: Gesamttreffer, preisbewusste und besondere Alternative
- Vergleich von zwei bis vier Produkten
- 250 Produktdetailseiten mit Amazon-Affiliate-Links
- Ratgeber, Methodik, Vertrauen, Kontakt, Impressum, Datenschutz und Affiliate-Transparenz
- Sitemap, robots.txt, kanonische URLs, Open-Graph- und Twitter-Metadaten
- Responsives und tastaturbedienbares Design mit Unterstützung für reduzierte Bewegung

## Technologie

- Next.js 16 mit App Router
- React 19 und TypeScript
- Tailwind CSS 4 plus projektspezifisches CSS-Designsystem
- Vinext/Vite-Ausgabe für ChatGPT Sites
- Native Next.js-Ausgabe für Vercel
- Keine Datenbank und kein Nutzerkonto; der Finder-Zwischenstand bleibt lokal im Browser

## Lokale Einrichtung

Voraussetzungen: Node.js 22.13 oder neuer und pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Die lokale Seite läuft standardmäßig unter `http://localhost:3000`.

## Builds

```bash
# ChatGPT Sites / Cloudflare-kompatible Ausgabe
pnpm build

# Native Next.js-Ausgabe für Vercel
pnpm build:next
```

## Projektstruktur

- `app/` – Routen, Metadaten, Sitemap, robots.txt und Affiliate-Event-Endpunkt
- `components/` – Header, Footer, Produktdarstellung, Karten und Affiliate-Schaltfläche
- `data/products.json` – strukturierter Produktkatalog mit 200 Haupt- und 50 Zubehörprodukten
- `lib/products.ts` – Produkttypen, Formatierung und regelbasierte Rankinglogik
- `public/images/` – freigegebene redaktionelle KI-Illustrationen und Hero-Motive

## Finder- und Rankinglogik

Der redaktionelle Auswahlscore bildet die Basis. Anschließend werden folgende Signale additiv gewichtet:

1. Interessenübereinstimmung: bis zu 25 Punkte
2. Zielgruppenpassung: bis zu 15 Punkte
3. Budgeteinhaltung: bis zu 17 Punkte; deutliche Überschreitungen werden abgewertet
4. gewünschte Wirkung: bis zu 8 Punkte
5. sichtbare Bewertungs- und Rezensionssignale: bis zu 8 Punkte

Das Ergebnis wird auf 36 bis 98 Prozent begrenzt. Der Score ist ein transparenter redaktioneller Proxy, kein Produkttest, kein Umsatzwert und keine Gefallensgarantie.

## Produkte ergänzen oder aktualisieren

1. Einen Datensatz nach dem vorhandenen Schema in `data/products.json` ergänzen.
2. Eine eindeutige `product_id` und ASIN vergeben.
3. Den Amazon-Link im Format `https://www.amazon.de/dp/ASIN?tag=onlinestarkei-21` eintragen.
4. Nur verifizierbare Daten verwenden; Preise, Bewertungen und Prüfzeitpunkt aktualisieren.
5. Eine freigegebene Illustration in `public/images/products/` ablegen und den Freigabestatus setzen. Andernfalls zeigt die Seite bewusst ein Kategoriesymbol.
6. Beide Builds und die wichtigsten Nutzerwege erneut testen.

## Amazon-Affiliate-ID

Die Partner-ID lautet `onlinestarkei-21` und befindet sich in den Feldern `amazon_affiliate_url` in `data/products.json`. Änderungen sollten automatisiert für alle Datensätze vorgenommen und anschließend stichprobenartig geprüft werden.

Affiliate-Klicks werden minimal über `app/api/affiliate-click/route.ts` als Produkt-ID, Seitenpfad und Zeitpunkt protokolliert. Es werden dabei keine Finder-Antworten, Namen oder E-Mail-Adressen übertragen.

## Umgebungsvariable

- `NEXT_PUBLIC_SITE_URL` – kanonischer Produktionsursprung für Sitemap und Metadaten

## Rechtliche Betreibermaßnahmen

Vor produktivem Betrieb müssen Impressum und Datenschutz durch den Betreiber vervollständigt und rechtlich geprüft werden. Insbesondere fehlen noch eine ladungsfähige Betreiberanschrift sowie die abschließende Anpassung an Domain, Hostinganbieter und tatsächliche Betriebsprozesse. Die enthaltenen Texte sind keine individuelle Rechtsberatung.

## Deployment

### Vercel

Das Repository in Vercel importieren, `NEXT_PUBLIC_SITE_URL` auf die Produktionsdomain setzen und den automatisch erkannten Next.js-Build verwenden. Das Skript `vercel-build` führt `next build` aus.

### ChatGPT Sites

`pnpm build` erzeugt die Cloudflare-kompatible Sites-Ausgabe. Hosting-Konfigurationen liegen ausschließlich in `.openai/hosting.json`.

## Daten- und Bildhinweise

- Produktdatenstand: 22.08.2026
- Preise, Bewertungen und Verfügbarkeiten sind Momentaufnahmen
- KI-Bilder sind als redaktionelle Illustrationen gekennzeichnet und keine exakten Originalabbildungen
- Amazon-Originalbilder dürfen nur mit gesicherter Nutzungsgrundlage verwendet werden
