'use client';

export function AffiliateButton({ href, productId, compact = false }: { href: string; productId: string; compact?: boolean }) {
  const track = () => {
    const payload = JSON.stringify({ productId, path: window.location.pathname, time: new Date().toISOString() });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/affiliate-click', new Blob([payload], { type: 'application/json' }));
  };
  return <a className={`button button-primary affiliate-button ${compact ? 'button-compact' : ''}`} href={href} target="_blank" rel="sponsored nofollow noopener" onClick={track}>Bei Amazon ansehen <span aria-hidden="true">↗</span><span className="sr-only">Affiliate-Link, öffnet in neuem Tab</span></a>;
}
