import { designSystems, finalSite, moodBoards, type DesignSystemCard as DesignSystemCardData, type MoodBoard } from "./data";
import { filmById } from "./films";
import { resolveColors, systems } from "./systems";
import { Button, Chip } from "@/components/system/controls";
import { FilmCard } from "@/components/system/film-card";
import { SystemTheme } from "@/components/system/theme";
import { ButtonLink, Card, CardFooter, SectionHead } from "@/components/ui";

const sections = [
  { id: "moodboards", label: "Mood Boards" },
  { id: "design-systems", label: "Design Systems" },
  { id: "final", label: "Final Site" },
];

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/85 px-[6vw] py-4 backdrop-blur">
        <a href="#top" className="font-serif text-lg font-semibold">DBS / Week 2</a>
        <ul className="hidden gap-7 text-sm text-muted md:flex">
          {sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} className="hover:text-ink">{s.label}</a></li>
          ))}
        </ul>
      </nav>

      <header id="top" className="max-w-5xl px-[6vw] pt-28 pb-20">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Design · Build · Ship — Process Showcase</div>
        <h1 className="mt-4 mb-9 font-serif text-5xl leading-[1.05] md:text-7xl">
          Your movie shelf.
        </h1>
        <div className="flex flex-wrap gap-3">
          {sections.map((s, i) => (
            <ButtonLink key={s.id} href={`#${s.id}`} variant="secondary">
              <span className="mr-1.5 font-semibold text-accent">0{i + 1}</span>{s.label}
            </ButtonLink>
          ))}
        </div>
      </header>

      <section className="border-t border-line px-[6vw] py-24">
        <SectionHead id="moodboards" eyebrow="01 — Explore" title="Mood Boards" />
        <div className="grid gap-7 md:grid-cols-3">
          {moodBoards.map((board, i) => <MoodBoardCard key={board.id} board={board} index={i} />)}
        </div>
      </section>

      <section className="border-t border-line px-[6vw] py-24">
        <SectionHead id="design-systems" eyebrow="02 — Define" title="Design Systems" />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {designSystems.map((ds) => <DesignSystemCard key={ds.id} ds={ds} />)}
        </div>
      </section>

      <section className="border-t border-line px-[6vw] py-24">
        <SectionHead id="final" eyebrow="03 — Ship" title="The Final Site" />
        <FinalSite />
      </section>

      <footer className="flex flex-wrap justify-between gap-3 border-t border-line px-[6vw] py-10 text-sm text-muted">
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
      {/* Scales with the card's width at its desktop proportions, so phones crop the pictures no more than desktop does. */}
      <div className="grid aspect-[390/318] grid-cols-[1.2fr_1fr] grid-rows-2 gap-1.5 p-1.5">
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

// Each card previews its system in its own components: the same Parasite card, the type, the colors, the shapes.
function DesignSystemCard({ ds }: { ds: DesignSystemCardData }) {
  const system = systems.find((s) => s.id === ds.id)!;
  const roles = resolveColors(system);
  const parasite = filmById["parasite"];
  return (
    <Card selected={ds.selected}>
      <SystemTheme system={system} className={`border-b border-line p-5 ${ds.selected ? "pt-13" : ""}`}>
        {/* The film card beside the type and swatches; below 360px the buttons and essence run under both, as
            the second column is too narrow for a chip. */}
        <div inert className="grid grid-cols-[124px_minmax(0,1fr)] grid-rows-[auto_auto_auto_auto_1fr] gap-x-5 gap-y-4 max-[359px]:grid-rows-[auto_1fr_auto_auto]">
          <div className="row-span-5 max-[359px]:row-span-2">
            <FilmCard film={parasite} headingLevel={4} action={<Button block icon="save">Save</Button>} />
          </div>
          <div>
            <p className="ds-display text-6xl">Aa</p>
            <p className="ds-fine ds-muted mt-1">{system.type.Display.font.family} / {system.type.Body.font.family}</p>
          </div>
          <div className="flex self-start">
            {[roles.background, roles.surface, roles.text, roles.accent, roles.selected].map((hex, i) => (
              <span key={i} className="h-7 flex-1 border border-black/15" style={{ background: hex }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5 max-[359px]:col-span-2">
            <Button variant="primary">Save</Button>
            <Chip genre="thriller" label="Thriller" aria-pressed />
          </div>
          <p className="ds-fine ds-muted max-[359px]:col-span-2">{system.essence}</p>
        </div>
      </SystemTheme>
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
  const { live } = finalSite;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div className="overflow-hidden rounded-2xl border border-line bg-[#faf3ea] shadow-[0_30px_60px_-30px_rgba(42,36,32,0.45)]">
        <div className="flex items-center gap-2 bg-[#ebe1d4] px-4 py-3">
          {[0, 1, 2].map((i) => <i key={i} className="h-3 w-3 rounded-full bg-[#d1c2b1]" />)}
          <span className="ml-3 flex-1 rounded-md bg-[#faf3ea] px-3 py-1 text-xs text-muted">{finalSite.url}</span>
        </div>
        <a href={live.href}>
          <img src={finalSite.preview} alt="Eigakan 映画館: the movie picker at /movies" className="block w-full" />
        </a>
      </div>

      <div className="grid gap-4">
        <RecipeRow label="Mood Board" title={board.title} thumb={<img src={finalSite.recipeImage} alt="" className="h-full w-full object-cover" />} />
        <div className="text-center text-2xl leading-none text-accent">+</div>
        <RecipeRow label={ds.label} title={ds.title} thumb={<span className="text-2xl" style={{ fontFamily: `var(${ds.displayFont})` }}>Aa</span>} />
        <ButtonLink href={live.href} className="mt-2 py-3.5 text-base">{live.label} →</ButtonLink>
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
