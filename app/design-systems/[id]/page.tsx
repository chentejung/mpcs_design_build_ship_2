import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designSystems, themeStyle } from "../systems";
import { SystemSpecimen } from "@/components/design-system";
import { SystemPoster, SystemIndex, SystemArtNote } from "@/components/design-system-poster";

export const dynamicParams = false;
export const generateStaticParams = () => designSystems.map((system) => ({ id: system.id }));
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const system = designSystems.find((item) => item.id === id);
  return { title: system ? `${system.title} Design System` : "Design System" };
}

export default async function DesignSystemPage({ params }: Props) {
  const { id } = await params;
  const system = designSystems.find((item) => item.id === id);
  if (!system) notFound();
  return <main className="ds ds-page" data-system={system.id} style={themeStyle(system)}>
    <a className="ds-skip-link" href="#components">Skip to components</a>
    <nav className="ds-topbar" aria-label="Design systems"><a href="/#design-systems" className="ds-back">← Overview</a><div>{designSystems.map((item) => <a key={item.id} href={`/design-systems/${item.id}/`} aria-current={item.id === id ? "page" : undefined}>{item.title}<span className="ds-nav-dot" aria-hidden="true" /></a>)}</div><span className="ds-topbar-note">DESIGN · BUILD · SHIP</span></nav>
    <div className="ds-sheet">
      <SystemPoster system={system} />
      <SystemIndex />
      <SystemSpecimen system={system} />
      <SystemArtNote system={system} />
      <footer className="ds-footer"><p>{system.selected ? "Clay type + Japanese Retro art direction → Eigakan" : `${system.title} / An alternative direction for the same film collection`}</p><a className="ds-link" href="/movies/">Visit the movie picker ↗</a></footer>
    </div>
  </main>;
}
