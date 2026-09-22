import { createPriceService } from "@/lib/live-price-server.mjs";
import { products } from "@/lib/products";
import imported from "@/data/finder-products.json";
const allowed = [...products.map(p=>p.asin), ...Object.values(imported).flat().map(p=>p.asin)];
const getPrices=createPriceService({allowed});
export const dynamic="force-dynamic";
export const maxDuration=60;
export async function GET(request:Request){const ids=(new URL(request.url).searchParams.get("asins")||"").split(",").filter(Boolean);try{return Response.json(await getPrices(ids),{headers:{"Cache-Control":"public, max-age=60, s-maxage=300"}})}catch(error){return Response.json({items:[],error:"Amazon-Preise vorübergehend nicht verfügbar."},{status:error instanceof Error&&error.message.includes("selection")?400:503,headers:{"Cache-Control":"no-store"}})}}
