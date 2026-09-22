"use client";
import { useEffect, useRef, useState } from "react";
type Price = {asin:string;amount:number;currency:string;displayAmount:string;updatedAt:string;expiresAt:number};
const cache = new Map<string, Price | null>();
const queue = new Map<string, Array<(price:Price|null)=>void>>();
let running = false;
async function drain() {
  if (running) return; running = true;
  await new Promise(resolve => setTimeout(resolve, 30));
  while(queue.size) {
    const ids = [...queue.keys()].slice(0,10);
    const waiters = ids.map(id => queue.get(id)!); ids.forEach(id => queue.delete(id));
    try {
      const response = await fetch('/api/live-prices?asins='+encodeURIComponent(ids.join(',')),{signal:AbortSignal.timeout(35000)});
      if (!response.ok) throw Error('Prices unavailable');
      const data = await response.json() as {items:Price[]};
      ids.forEach((id,index)=>{const value=data.items.find(item=>item.asin===id&&item.expiresAt>Date.now())||null;cache.set(id,value);waiters[index].forEach(resolve=>resolve(value))});
    } catch {waiters.forEach(list=>list.forEach(resolve=>resolve(null)))}
  }
  running = false;
}
function load(asin:string):Promise<Price|null> {
  const hit=cache.get(asin); if(hit&&hit.expiresAt>Date.now())return Promise.resolve(hit);
  return new Promise(resolve=>{queue.set(asin,[...(queue.get(asin)||[]),resolve]);void drain()});
}
export function LiveAmazonPrice({asin}:{asin:string}) {
  const [price,setPrice]=useState<Price|null>(null);const [loaded,setLoaded]=useState(false);const ref=useRef<HTMLSpanElement>(null);
  useEffect(()=>{let active=true;let timer:ReturnType<typeof setTimeout>;async function refresh(){const next=await load(asin);if(!active)return;setPrice(next);setLoaded(true);timer=setTimeout(()=>{setPrice(null);void refresh()},next?Math.max(1000,next.expiresAt-Date.now()):60000)}const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();void refresh()}},{rootMargin:'400px'});if(ref.current)observer.observe(ref.current);return()=>{active=false;observer.disconnect();clearTimeout(timer)}},[asin]);
  return <span ref={ref} className="live-amazon-price" style={{display:'inline-flex',flexDirection:'column',gap:'0.2em'}}><span>{price?price.displayAmount:loaded?'Preis bei Amazon prüfen':'Amazon-Preis wird geladen …'}</span>{price&&<small style={{fontSize:'0.65em',fontWeight:400}}>Amazon · Stand {new Date(price.updatedAt).toLocaleString('de-DE',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})} · Preis kann sich ändern</small>}</span>;
}
