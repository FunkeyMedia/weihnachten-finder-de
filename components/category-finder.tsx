'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { FinderContent, FinderKind, FinderProduct } from '@/lib/finder-catalog';
import { formatPrice } from '@/lib/products';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function CategoryFinder({ kind, content, products, finderNav }: { kind: FinderKind; content: FinderContent; products: FinderProduct[]; finderNav: { kind: FinderKind; label: string }[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const results = useMemo(() => products.map((product) => ({ product, score: answers.reduce((sum, answer) => sum + (product.tags.some((tag) => tag.includes(answer) || answer.includes(tag)) || `${product.title} ${product.description} ${product.features.join(' ')}`.toLowerCase().includes(answer) ? 18 : 3), 55) })).sort((a, b) => b.score - a.score).slice(0, 3), [answers, products]);

  const choose = (value: string) => {
    const next = [...answers.slice(0, step), value];
    setAnswers(next);
    if (step === content.questions.length - 1) setDone(true); else setStep(step + 1);
  };

  return <main className="category-finder-page">
    <SiteHeader light />
    <section className="finder-category-hero">
      <p className="section-kicker">{content.eyebrow}</p>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      <p className="catalog-count"><strong>{products.length}</strong> aktuelle Amazon-Artikel im Finder</p>
      <div className="category-switcher" aria-label="Finder auswählen">{finderNav.map((item) => <Link className={item.kind === kind ? 'active' : ''} href={`/finden/${item.kind}`} key={item.kind}>{item.label}</Link>)}</div>
    </section>

    {!done ? <section className="category-question">
      <div className="category-progress"><span style={{ width: `${((step + 1) / content.questions.length) * 100}%` }} /></div>
      <p className="question-count">Frage {step + 1} von {content.questions.length}</p>
      <h2>{content.questions[step].title}</h2>
      <div className="category-options">{content.questions[step].options.map((option) => <button key={option.value} onClick={() => choose(option.value)}><span>{option.label}</span><i>→</i></button>)}</div>
      {step > 0 && <button className="question-back" onClick={() => setStep(step - 1)}>← Eine Frage zurück</button>}
    </section> : <section className="finder-results">
      <div className="results-heading"><div><p className="section-kicker">{content.accent}</p><h2>Deine drei Empfehlungen</h2><p>Aus {products.length} Amazon-Artikeln passend zu deinen Antworten ausgewählt.</p></div><button onClick={() => { setDone(false); setStep(0); setAnswers([]); }}>Neu starten</button></div>
      <div className="finder-result-grid">{results.map(({ product, score }, index) => <article className="finder-product" key={product.id}>
        <div className="finder-product-rank"><span>0{index + 1}</span><strong>{Math.min(score, 96)}% Match</strong></div>
        <div className="finder-product-media">{product.image ? <Image src={product.image} alt="" fill sizes="(max-width: 800px) 90vw, 33vw" /> : <span aria-hidden="true">⌁</span>}</div>
        <div className="finder-product-copy"><p>{product.category}</p><h3>{product.title}</h3><span>{product.description}</span><ul>{product.features.slice(0, 2).map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="finder-buy-row"><div>{product.price ? <><small>Preis bei Katalogprüfung</small><strong>{formatPrice(product.price)}</strong></> : <><small>Aktuellen Preis</small><strong>bei Amazon prüfen</strong></>}</div><a href={product.amazonUrl} target="_blank" rel="nofollow sponsored noopener">Bei Amazon ansehen <span>↗</span></a></div></div>
      </article>)}</div>
      <p className="amazon-note">Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Preise und Verfügbarkeit können sich ändern. Bitte prüfe die Angaben direkt bei Amazon.</p>
    </section>}
    <SiteFooter />
  </main>;
}
