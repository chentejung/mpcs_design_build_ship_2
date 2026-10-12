import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui";
import { designSystems } from "@/app/data";

export const dynamicParams = false;
export const generateStaticParams = () => designSystems.map((system) => ({ id: system.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const system = designSystems.find((item) => item.id === id);
  return { title: system ? `${system.title} Design System` : "Design System" };
}

const descriptions = {
  clay: "Washi paper, indigo fields, vermilion stamps, and Fraunces/Inter type shape the selected movie picker.",
  grid: "A disciplined poster system built from hard edges, high contrast, and deliberate typographic tension.",
  soft: "A lighter digital interpretation with rounded controls, quiet gradients, and friendly product energy.",
} as const;

export default async function DesignSystemPage({ params }: Props) {
  const { id } = await params;
  const system = designSystems.find((item) => item.id === id);
  if (!system) notFound();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <nav className="flex items-center justify-between border-b border-line px-[6vw] py-4">
        <ButtonLink href="/#design-systems" variant="secondary">← Overview</ButtonLink>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{system.label}</span>
      </nav>
      <header className="grid gap-10 px-[6vw] py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Design system / 0{designSystems.indexOf(system) + 1}</p>
          <h1 className="mt-4 font-serif text-6xl md:text-8xl">{system.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{descriptions[system.id]}</p>
        </div>
        <div className="border border-ink bg-surface p-6 shadow-[5px_5px_0_#ebcb85]">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Type pairing</p>
          <p className="mt-3 font-serif text-3xl">{system.fonts}</p>
          <div className="mt-6 flex gap-1">{system.tokens.map((color) => <span key={color} className="h-12 flex-1 border border-black/10" style={{ background: color }} />)}</div>
        </div>
      </header>
      <section id="tokens" className="border-t border-line px-[6vw] py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-line bg-surface p-7"><p className="text-xs uppercase tracking-widest text-muted">Headline</p><p className="mt-4 font-serif text-5xl">Aa</p><p className="mt-3 text-sm text-muted">A strong editorial title, paired with legible Inter details.</p></div>
          <div className="border border-line bg-surface p-7"><p className="text-xs uppercase tracking-widest text-muted">Controls</p><div className="mt-5 flex flex-wrap gap-2"><span className="border border-ink bg-accent px-4 py-2 text-sm font-semibold text-white">Save film +</span><span className="border border-ink bg-[#ebcb85] px-4 py-2 text-sm font-semibold">Saved (2) ↗</span></div><p className="mt-5 text-sm text-muted">Square buttons echo printed tickets and stamps.</p></div>
          <div className="border border-line bg-surface p-7"><p className="text-xs uppercase tracking-widest text-muted">Surface</p><div className="mt-5 border border-ink bg-[#1f4a66] px-4 py-3 text-sm text-[#f3eddd]">Indigo on washi / 藍と和紙</div><p className="mt-5 text-sm text-muted">Paper and indigo frame the posters without recoloring them.</p></div>
        </div>
      </section>
      <footer className="flex flex-wrap justify-between gap-3 border-t border-line px-[6vw] py-10"><span className="text-sm text-muted">Built from the mood-board study</span><ButtonLink href="/movies/">See final site →</ButtonLink></footer>
    </main>
  );
}
