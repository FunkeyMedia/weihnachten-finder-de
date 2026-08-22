'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

type Answers = { recipient?: string; interest?: string; budget?: string; intention?: string; mode: 'quick' | 'guided' };
type Option = { value: string; label: string; note: string; symbol: string };
type Step = { key: keyof Omit<Answers, 'mode'>; eyebrow: string; question: string; help: string; options: Option[] };

const steps: Step[] = [
  { key: 'recipient', eyebrow: 'Für wen suchst du?', question: 'Wer soll sich an Weihnachten freuen?', help: 'Die Personengruppe beeinflusst Interessen, Ansprache und geeignete Produktarten.', options: [
    { value: 'partner', label: 'Partner:in', note: 'persönlich und verbindend', symbol: '♥' }, { value: 'eltern', label: 'Eltern & Familie', note: 'für gemeinsame Momente', symbol: '⌂' }, { value: 'kind', label: 'Kind', note: 'Spiel, Staunen, Kreativität', symbol: '✣' }, { value: 'freunde', label: 'Freund:in', note: 'aufmerksam und passend', symbol: '✦' }, { value: 'kollegen', label: 'Kolleg:in', note: 'unkompliziert und angemessen', symbol: '◇' }, { value: 'haustier', label: 'Tierfreund:in', note: 'für Mensch und Liebling', symbol: '•ᴥ•' },
  ]},
  { key: 'interest', eyebrow: 'Was passt zu der Person?', question: 'Womit verbringt sie am liebsten Zeit?', help: 'Mehrfachauswahl würde das Ergebnis verwässern. Wähle den stärksten Schwerpunkt.', options: [
    { value: 'genuss', label: 'Genießen', note: 'Kochen, Düfte, kleine Rituale', symbol: '◌' }, { value: 'technik', label: 'Technik', note: 'praktische und smarte Helfer', symbol: '⌁' }, { value: 'gemuetlich', label: 'Gemütlichkeit', note: 'Lesen, Wärme, Entspannung', symbol: '≈' }, { value: 'aktiv', label: 'Aktiv sein', note: 'Sport, Reise und Freizeit', symbol: '↗' }, { value: 'kreativ', label: 'Kreativ sein', note: 'Gestalten, spielen, entdecken', symbol: 'Aa' }, { value: 'deko', label: 'Weihnachtsstimmung', note: 'Licht, Dekoration und Advent', symbol: '✺' }, { value: 'offen', label: 'Ich bin nicht sicher', note: 'wir gewichten breiter', symbol: '?' },
  ]},
  { key: 'budget', eyebrow: 'Was darf es kosten?', question: 'Welcher Rahmen fühlt sich richtig an?', help: 'Wir behandeln Preise als Momentaufnahme und zeigen eine Budgetklasse – keine Preisgarantie.', options: [
    { value: 'klein', label: 'Bis 20 €', note: 'kleine Aufmerksamkeit', symbol: '€' }, { value: 'mittel', label: 'Bis 50 €', note: 'vielseitige Geschenkauswahl', symbol: '€€' }, { value: 'gross', label: 'Bis 100 €', note: 'besonderes Hauptgeschenk', symbol: '€€€' }, { value: 'premium', label: 'Budget ist flexibel', note: 'Passung vor Preis', symbol: '∞' },
  ]},
  { key: 'intention', eyebrow: 'Welche Wirkung zählt?', question: 'Was soll das Geschenk ausdrücken?', help: 'Diese letzte Nuance entscheidet zwischen praktischer, emotionaler und besonderer Alternative.', options: [
    { value: 'praktisch', label: '„Das kann ich gut gebrauchen.“', note: 'nützlich im Alltag', symbol: '✓' }, { value: 'emotional', label: '„Du kennst mich wirklich.“', note: 'persönlich und aufmerksam', symbol: '♥' }, { value: 'wow', label: '„Damit habe ich nicht gerechnet.“', note: 'ungewöhnlich und besonders', symbol: '!' }, { value: 'gemeinsam', label: '„Das machen wir zusammen.“', note: 'gemeinsame Zeit', symbol: '∞' }, { value: 'offen', label: 'Ich bin nicht sicher', note: 'ausgewogene Empfehlung', symbol: '?' },
  ]},
];

export function FinderClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({ mode: 'quick' });
  const [stepIndex, setStepIndex] = useState(0);
  const activeSteps = answers.mode === 'quick' ? steps.slice(0, 3) : steps;
  const step = activeSteps[stepIndex];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const saved = window.localStorage.getItem('wf-finder');
    const initial = saved ? JSON.parse(saved) as Answers : { mode: 'quick' as const };
    for (const key of ['recipient', 'interest', 'budget', 'intention'] as const) if (params.get(key)) initial[key] = params.get(key)!;
    queueMicrotask(() => setAnswers(initial));
  }, []);

  useEffect(() => { window.localStorage.setItem('wf-finder', JSON.stringify(answers)); }, [answers]);

  const preview = useMemo(() => {
    const selected = Object.values(answers).filter(Boolean).length - 1;
    return selected >= 2 ? `${answers.interest === 'offen' ? 'breit gefächerte' : 'klar eingegrenzte'} Vorschläge sind bereits möglich` : 'Mit jeder Antwort wird die Auswahl klarer';
  }, [answers]);

  const choose = (value: string) => {
    const next = { ...answers, [step.key]: value };
    if (step.key === 'recipient' && value === 'haustier') next.interest = 'haustier';
    setAnswers(next);
    if (stepIndex < activeSteps.length - 1) setTimeout(() => setStepIndex((current) => current + 1), 120);
    else finish(next);
  };

  const finish = (current = answers) => {
    const params = new URLSearchParams({ recipient: current.recipient ?? 'freunde', interest: current.interest ?? 'offen', budget: current.budget ?? 'mittel', intention: current.intention ?? 'offen', mode: current.mode });
    router.push(`/ergebnis?${params.toString()}`);
  };

  return (
    <main className="finder-shell">
      <SiteHeader light />
      <div className="finder-progress" aria-label={`Schritt ${stepIndex + 1} von ${activeSteps.length}`}><span style={{ width: `${((stepIndex + 1) / activeSteps.length) * 100}%` }} /></div>
      <section className="finder-stage">
        <div className="finder-topline">
          <button className="back-button" onClick={() => stepIndex > 0 ? setStepIndex(stepIndex - 1) : router.push('/')} aria-label="Zurück">← <span>Zurück</span></button>
          <div className="mode-switch" aria-label="Finder-Modus"><button className={answers.mode === 'quick' ? 'active' : ''} onClick={() => { setAnswers({ ...answers, mode: 'quick' }); setStepIndex(Math.min(stepIndex, 2)); }}>Schnell</button><button className={answers.mode === 'guided' ? 'active' : ''} onClick={() => setAnswers({ ...answers, mode: 'guided' })}>Ausführlich</button></div>
          <span className="step-count">{String(stepIndex + 1).padStart(2, '0')} / {String(activeSteps.length).padStart(2, '0')}</span>
        </div>
        <div className="finder-question">
          <p className="section-kicker">{step.eyebrow}</p>
          <h1>{step.question}</h1>
          <p>{step.help}</p>
        </div>
        <div className="answer-grid" role="radiogroup" aria-label={step.question}>
          {step.options.filter((option) => !(step.key === 'interest' && answers.recipient === 'haustier' && option.value !== 'haustier')).map((option) => (
            <button key={option.value} role="radio" aria-checked={answers[step.key] === option.value} className={answers[step.key] === option.value ? 'selected' : ''} onClick={() => choose(option.value)}>
              <span className="answer-symbol" aria-hidden="true">{option.symbol}</span><span><strong>{option.label}</strong><small>{option.note}</small></span><i aria-hidden="true">→</i>
            </button>
          ))}
          {step.key === 'interest' && answers.recipient === 'haustier' && <button role="radio" aria-checked={answers.interest === 'haustier'} onClick={() => choose('haustier')}><span className="answer-symbol" aria-hidden="true">•ᴥ•</span><span><strong>Für den tierischen Liebling</strong><small>Geschenke für Haustiere und ihre Menschen</small></span><i aria-hidden="true">→</i></button>}
        </div>
        <div className="finder-preview"><span aria-hidden="true">✦</span><p><strong>Live-Vorschau</strong>{preview}</p>{stepIndex >= 1 && <button onClick={() => finish()}>Ergebnis jetzt ansehen →</button>}</div>
        <p className="finder-privacy">Deine Antworten bleiben auf diesem Gerät. Keine Anmeldung, kein Profil.</p>
      </section>
      <Link className="finder-method-link" href="/so-funktionierts">Wie funktioniert der Match-Score?</Link>
    </main>
  );
}
