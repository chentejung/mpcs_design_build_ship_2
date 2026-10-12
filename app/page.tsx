import { designSystems, finalSite, moodBoards, type DesignSystem, type MoodBoard } from "./data";
import { ButtonLink, Card, CardFooter, SectionHead } from "@/components/ui";
import { SystemPreview } from "@/components/design-system";

const sections = [
  { id: "moodboards", label: "Mood Boards" },
  { id: "design-systems", label: "Design Systems" },
  { id: "final", label: "Final Site" },
];

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-ink bg-bg/95 px-[6vw] py-4 backdrop-blur">
        <a href="#top" className="font-serif text-lg font-semibold"><span className="mr-2 text-accent">映</span> DBS / Week 2</a>
        <ul className="hidden gap-7 text-sm text-muted md:flex">
          {sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} className="hover:text-ink">{s.label}</a></li>
          ))}
        </ul>
      </nav>

      <header id="top" className="max-w-5xl px-[6vw] pt-28 pb-20">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Design · Build · Ship — Process Showcase</div>
        <h1 className="mt-4 mb-9 font-serif text-5xl leading-[1.05] md:text-7xl">
          From <em className="text-accent">mood</em> to system<br />to shipped site.
        </h1>
        <div className="flex flex-wrap gap-3">
          {sections.map((s, i) => (
            <ButtonLink key={s.id} href={`#${s.id}`} variant="secondary">
              <span className="mr-1.5 font-semibold text-accent">0{i + 1}</span>{s.label}
            </ButtonLink>
          ))}
        </div>
      </header>

      <section className="border-t-2 border-ink px-[6vw] py-24">
        <SectionHead id="moodboards" eyebrow="01 — Explore" title="Mood Boards" />
        <div className="grid gap-7 md:grid-cols-3">
          {moodBoards.map((board, i) => <MoodBoardCard key={board.id} board={board} index={i} />)}
        </div>
      </section>

      <section className="border-t-2 border-ink px-[6vw] py-24">
        <SectionHead id="design-systems" eyebrow="02 — Define" title="Design Systems" />
        <div className="grid gap-7 md:grid-cols-3">
          {designSystems.map((ds) => <DesignSystemCard key={ds.id} ds={ds} />)}
        </div>
      </section>

      <section className="border-t-2 border-ink px-[6vw] py-24">
        <SectionHead id="final" eyebrow="03 — Ship" title="The Final Site" />
        <FinalSite />
      </section>

      <footer className="flex flex-wrap justify-between gap-3 border-t-2 border-ink bg-[#ebcb85] px-[6vw] py-10 text-sm text-ink">
        <span>MPCS Design · Build · Ship — Week 2</span>
        <span className="flex gap-5">
          {sections.map((s) => <a key={s.id} href={`#${s.id}`} className="hover:text-ink">{s.label}</a>)}
        </span>
      </footer>
    </>
  );
}

function MoodBoardCard({ board, index }: { board: MoodBoard; index: number }) {
  return (
    <Card selected={board.selected}>
      <div className="grid grid-cols-[1.2fr_1fr] grid-rows-[150px_150px] gap-1.5 p-1.5">
        {board.tiles.map((src, i) => (
          <div key={src} className={`overflow-hidden rounded-lg ${i === 0 ? "row-span-2" : ""}`}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mx-1.5 flex h-8 overflow-hidden rounded-md">
        {board.palette.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}
      </div>
      <CardFooter label={`MOOD BOARD 0${index + 1}`} title={board.title}>
        {board.links.map((l, i) => (
          <ButtonLink key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"}>{l.label}</ButtonLink>
        ))}
      </CardFooter>
    </Card>
  );
}

function DesignSystemCard({ ds }: { ds: DesignSystem }) {
  return (
    <Card selected={ds.selected}>
      <SystemPreview system={ds} />
      <CardFooter label={ds.label} title={ds.title}>
        {ds.links.map((l, i) => (
          <ButtonLink key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"}>{l.label}</ButtonLink>
        ))}
      </CardFooter>
    </Card>
  );
}

function FinalSite() {
  const board = moodBoards.find((b) => b.selected)!;
  const ds = designSystems.find((d) => d.selected)!;
  const [live, ...rest] = finalSite.links;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div className="overflow-hidden border-2 border-ink bg-[#f3eddd] shadow-[9px_9px_0_#1f4a66]">
        <div className="flex items-center gap-2 border-b-2 border-ink bg-[#ebcb85] px-4 py-3">
          {[0, 1, 2].map((i) => <i key={i} className="h-3 w-3 rounded-full border border-ink bg-[#c7381c]" />)}
          <span className="ml-3 flex-1 border border-ink bg-[#f3eddd] px-3 py-1 text-xs text-ink">{finalSite.url}</span>
        </div>
        <img src={finalSite.heroImage} alt="Screenshot of the Eigakan movie picker showing its Japanese Retro design and film cards" className="block aspect-[1.5] w-full object-cover object-top" />
      </div>

      <div className="grid gap-4">
        <RecipeRow label="Mood Board" title={board.title} thumb={<img src={finalSite.recipeImage} alt="" className="h-full w-full object-cover" />} />
        <div className="text-center text-2xl leading-none text-accent">+</div>
        <RecipeRow label={ds.label} title={ds.title} thumb={<span className="font-serif text-2xl">Aa</span>} />
        <ButtonLink href={live.href} className="mt-2 py-3.5 text-base">{live.label} →</ButtonLink>
        <div className="flex justify-center gap-2">
          {rest.map((l) => <ButtonLink key={l.href} href={l.href} variant="secondary">{l.label}</ButtonLink>)}
        </div>
      </div>
    </div>
  );
}

function RecipeRow({ label, title, thumb }: { label: string; title: string; thumb: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-4">
      <div className="grid h-13 w-13 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-line bg-[#faf3ea]">{thumb}</div>
      <div>
        <small className="block text-xs uppercase tracking-widest text-muted">{label}</small>
        <strong className="font-serif text-lg font-semibold">{title}</strong>
      </div>
    </div>
  );
}
