import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryFinder } from '@/components/category-finder';
import { finderContent, finderProducts, isFinderKind, type FinderKind } from '@/lib/finder-catalog';

export function generateStaticParams() { return Object.keys(finderContent).map((kind) => ({ kind })); }

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  if (!isFinderKind(kind)) return {};
  const item = finderContent[kind];
  return { title: `${item.title} | Weihnachten-Finder`, description: item.intro, alternates: { canonical: `/finden/${kind}` } };
}

export default async function FinderPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isFinderKind(kind)) notFound();
  const finderNav = (Object.keys(finderContent) as FinderKind[]).map((item) => ({ kind: item, label: finderContent[item].nav }));
  return <CategoryFinder kind={kind} content={finderContent[kind]} products={finderProducts[kind]} finderNav={finderNav} />;
}
