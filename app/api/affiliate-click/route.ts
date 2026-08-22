export async function POST(request: Request) {
  try {
    const event = await request.json() as { productId?: string; path?: string; time?: string };
    console.info('affiliate_click', { productId: event.productId ?? 'unknown', path: event.path ?? '/', time: event.time ?? new Date().toISOString() });
  } catch { /* malformed analytics events are intentionally ignored */ }
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
}
