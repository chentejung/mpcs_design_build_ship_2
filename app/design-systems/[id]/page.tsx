import type { Metadata } from "next";
import { selectedBoard } from "@/app/data";
import { categories, filmById, formatRuntime, type Film } from "@/app/films";
import {
  colorRoles, contrastChecks, gridColumns, spacingScale, systems, type DesignSystem, type ShapePart, type TypeRole,
} from "@/app/systems";
import { Button, buttonClass, CategoryBadge, Check, Chip, Count, Select, TextInput, type FrozenState } from "@/components/system/controls";
import { Icon, type IconName } from "@/components/system/icons";
import { FilmCard } from "@/components/system/film-card";
import { Brand, HeaderBar, SavedLabel } from "@/components/system/header";
import { EmptyState, HeroMotif, Ornament } from "@/components/system/motifs";
import { Poster } from "@/components/system/poster";
import {
  AppliedMock, ChipsSpecimen, ListRowsSpecimen, SaveSpecimen, TabsSpecimen, ToastSpecimen, ToggleSpecimen,
} from "@/components/system/specimens";
import { SystemTheme } from "@/components/system/theme";
import { DrawingKit } from "@/components/system/yokoo";

export const dynamicParams = false;
export const generateStaticParams = () => systems.map((s) => ({ id: s.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `${systems.find((s) => s.id === id)!.name} — Design System` };
}

const parasite = filmById["parasite"];
const ratio = (r: number) => `${r.toFixed(2)}:1`;

// One page per Design System, themed by it. Sections follow the checklist in issue #5.
export default async function DesignSystemPage({ params }: Props) {
  const { id } = await params;
  const index = systems.findIndex((s) => s.id === id);
  const system = systems[index];
  const selected = system.board.id === selectedBoard;

  return (
    <SystemTheme system={system} fixed className="min-h-screen">
      <nav className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-(--ds-border) px-[6vw] py-4">
        <a href="/#design-systems" className={buttonClass("secondary")}>← Back to overview</a>
        <div className="flex flex-wrap gap-2">
          {systems.map((s, i) => (
            <a key={s.id} href={`/design-systems/${s.id}/`} aria-current={s.id === id ? "page" : undefined} className={buttonClass()}>
              0{i + 1} {s.name}
            </a>
          ))}
        </div>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-8 px-[6vw] pt-16 pb-12">
        <div className="max-w-3xl">
          <p className="ds-label flex flex-wrap items-center gap-2">
            <Ornament /> Design System 0{index + 1} · built on the{" "}
            <a href={`/moodboards/${system.board.id}/`} className="ds-link">{system.board.title} {system.board.altTitle}</a> mood board
            {selected && <span className="ds-badge" style={{ background: "var(--ds-accent)", color: "var(--ds-on-accent)" }}>Selected · ships as Eigakan</span>}
          </p>
          <h1 className="ds-display mt-4 text-[length:min(112px,16cqi)]">
            {system.name} {system.alt && <span lang={system.id === "showa" ? "ja" : "zh-Hans"}>{system.alt}</span>}
          </h1>
          <p className="ds-body mt-5 max-w-xl text-lg">{system.essence}</p>
        </div>
        <HeroMotif count={25} />
      </header>

      <main className="px-[6vw] pb-24">
        <Section n={1} title="Color roles" note="Every color comes from the board's Palette, plus white only for text on Accent or Selected. Ratios are computed from the hex values (WCAG 2).">
          <ColorRoles system={system} />
        </Section>
        <Section n={2} title="Type roles" note="Set in Eigakan's own content.">
          <TypeRoles system={system} />
        </Section>
        <Section n={3} title="Spacing and shape">
          <SpacingAndShape system={system} />
        </Section>
        <Section n={4} title="Texture and motif">
          <TextureAndMotif system={system} />
        </Section>
        <Section n={5} title="Components" note="The same components Eigakan uses. Examples work where that's natural.">
          <Components system={system} />
        </Section>
        <Section n={6} title="Control states" note="No information appears only on hover. Selected differs from rest by more than color.">
          <ControlStates />
        </Section>
        <Section n={7} title="UI states">
          <UiStates />
        </Section>
        <Section n={8} title="Applied" note="/movies at phone width, built from this system's components.">
          <AppliedMock />
        </Section>
      </main>
    </SystemTheme>
  );
}

function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="ds-rule py-14">
      <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="ds-meta ds-muted">0{n}</span>
        <h2 className="ds-heading text-3xl md:text-4xl">{title}</h2>
        {note && <p className="ds-body ds-muted basis-full md:basis-auto">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-3">
      <p className="ds-label ds-muted">{label}</p>
      {children}
    </div>
  );
}

// ----- 01 Color roles -----

// Roles that carry text show it: "Aa" in the color that sits on them.
const onSample: Record<string, React.CSSProperties> = {
  Surface: { color: "var(--ds-on-surface)" },
  Accent: { color: "var(--ds-on-accent)" },
  "On-Accent": { background: "var(--ds-accent)", color: "var(--ds-on-accent)" },
  Selected: { color: "var(--ds-on-selected)" },
};

function ColorRoles({ system }: { system: DesignSystem }) {
  const rows = colorRoles(system);
  const checks = contrastChecks(system);
  return (
    <div className="grid gap-10">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {rows.map((r) => (
          <li key={r.role} className="overflow-hidden rounded-(--ds-radius-panel) border-2 border-(--ds-border) bg-(--ds-bg)">
            <div className="grid h-24 place-items-center border-b-2 border-(--ds-border)" style={{ background: r.hex }}>
              {onSample[r.role] && <span className="ds-heading px-2 text-2xl" style={onSample[r.role]}>Aa</span>}
            </div>
            <div className="grid gap-1 p-3">
              <p className="ds-label">{r.role}</p>
              <p className="ds-meta uppercase">{r.hex}</p>
              <p className="ds-fine ds-muted">{r.from}</p>
              {r.on && <p className="ds-meta"><strong>{ratio(r.on.ratio)}</strong> <span className="ds-muted">{r.on.label}</span></p>}
            </div>
          </li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Spec label="Contrast check · the build fails below target">
          <table className="ds-meta w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-(--ds-border)"><th className="py-2 font-bold">Pairing</th><th className="font-bold">Ratio</th><th className="font-bold">Target</th><th /></tr>
            </thead>
            <tbody>
              {checks.map((c) => (
                <tr key={c.pair} className="border-b border-(--ds-border)">
                  <td className="py-1.5 pr-3">{c.pair}</td><td className="pr-3">{ratio(c.ratio)}</td><td className="pr-3">{c.min}:1</td><td>✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Spec>
        <div className="grid content-start gap-6">
          <Spec label="Accent as text">
            <p className="ds-body">Accent text is for large type only (24px, or 19px bold): <span className="ds-display text-[28px] text-(--ds-accent)">上映中</span></p>
          </Spec>
          <Spec label="Error">
            <p className="ds-body"><span aria-hidden>⚠</span> Couldn&rsquo;t load posters. Error never uses a hue: every Accent here is red.</p>
          </Spec>
          {system.colors.restricted && (
            <Spec label="Kept out of text roles">
              <p className="ds-body ds-muted">{system.colors.restricted}</p>
            </Spec>
          )}
        </div>
      </div>
    </div>
  );
}

// ----- 02 Type roles -----

const typeSamples: Record<TypeRole, React.ReactNode> = {
  Display: <p className="ds-display">Pick tonight&rsquo;s film. <span className="whitespace-nowrap">25 films</span></p>,
  Heading: (
    <div>
      <p className="ds-heading w-[168px] outline-2 outline-offset-4 outline-(--ds-border) outline-dashed">Spider-Man: Into the Spider-Verse</p>
      <p className="ds-fine ds-muted mt-3">A 168px phone card: the title wraps to 2 lines and is never cut off.</p>
    </div>
  ),
  Body: <p className="ds-body max-w-md">{filmById["parasite"].synopsis}</p>,
  Label: <p className="ds-label">Now showing · Thriller · + Save</p>,
  Meta: (
    <div className="ds-meta">
      {["parasite", "toy-story", "seven-samurai"].map((id) => <p key={id}>{filmById[id].year} · {formatRuntime(filmById[id].runtime)}</p>)}
    </div>
  ),
  Native: (
    <div className="ds-native grid gap-1">
      <p lang="ja">映画館 · 上映中 · 空</p>
      <p><span lang="ja">七人の侍</span> · <span lang="ko">기생충</span> · <span lang="zh-Hant">花樣年華</span></p>
    </div>
  ),
  "Fine print": <p className="ds-fine">© CJ Entertainment · <span className="ds-link">Source</span> · Posters used for a non-commercial class mock-up.</p>,
};

function TypeRoles({ system }: { system: DesignSystem }) {
  return (
    <ul className="grid">
      {(Object.keys(typeSamples) as TypeRole[]).map((role) => {
        const t = system.type[role];
        return (
          <li key={role} className="grid gap-4 border-b border-(--ds-border) py-6 md:grid-cols-[220px_1fr] md:items-baseline">
            <div className="grid gap-1">
              <p className="ds-label">{role}</p>
              <p className="ds-fine ds-muted">
                {t.font.family} · {t.size}px / {t.weight}
                {t.tracking ? ` · tracking ${t.tracking}em` : ""}
                {t.upper ? " · uppercase" : ""}
                {role === "Meta" ? " · tabular figures" : ""}
              </p>
            </div>
            {typeSamples[role]}
          </li>
        );
      })}
    </ul>
  );
}

// ----- 03 Spacing and shape -----

const shapeParts: { part: ShapePart; label: string }[] = [
  { part: "control", label: "Control" },
  { part: "card", label: "Card" },
  { part: "poster", label: "Poster" },
  { part: "badge", label: "Badge" },
  { part: "panel", label: "Panel" },
];

function SpacingAndShape({ system }: { system: DesignSystem }) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div className="md:col-span-2">
        <Spec label="Control shapes">
          <p className="ds-body max-w-3xl">{system.shape.controls}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-5 pt-2">
            <Button variant="primary" icon="save">Save</Button>
            <Button icon="saved" aria-pressed>Saved</Button>
            <Button variant="secondary" icon="remove">Remove</Button>
            <Chip label="Thriller" count={4} aria-pressed={false} />
            <Chip label="Comedy" count={4} aria-pressed />
            <Count n={3} />
          </div>
        </Spec>
      </div>
      <Spec label="Spacing scale">
        <div className="flex items-end gap-3">
          {spacingScale.map((px) => (
            <div key={px} className="grid justify-items-center gap-2">
              <span className="block w-6 bg-(--ds-accent)" style={{ height: px }} />
              <span className="ds-meta">{px}</span>
            </div>
          ))}
        </div>
      </Spec>
      <Spec label="Grid">
        <div className="grid gap-3">
          {gridColumns.map((g) => (
            <div key={g.label} className="grid grid-cols-[84px_1fr] items-center gap-3">
              <span className="ds-meta">{g.label}</span>
              <span className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${g.columns}, 1fr)` }}>
                {Array.from({ length: g.columns }, (_, i) => <span key={i} className="h-7 border-2 border-(--ds-text) bg-(--ds-surface)" />)}
              </span>
            </div>
          ))}
        </div>
      </Spec>
      <Spec label="Poster frame · locked at 2:3">
        <div className="w-36"><div className="ds-frame"><Poster film={filmById["seven-samurai"]} /></div></div>
      </Spec>
      <Spec label="Control height · at least 44px on touch">
        <div className="flex items-center gap-3">
          <Button variant="primary" icon="save">Save</Button>
          <span className="ds-meta flex h-11 items-center border-y-2 border-(--ds-text) px-2">44px</span>
        </div>
      </Spec>
      <Spec label="Corners">
        <div className="flex flex-wrap gap-4">
          {shapeParts.map(({ part, label }) => (
            <div key={part} className="grid justify-items-center gap-2">
              <span className="block h-14 w-14 border-2 border-(--ds-text) bg-(--ds-surface)" style={{ borderRadius: `var(--ds-radius-${part})` }} />
              <span className="ds-meta">{label} {Math.min(system.shape.radius[part], 99)}{system.shape.radius[part] >= 999 ? "+ (round)" : "px"}</span>
            </div>
          ))}
        </div>
      </Spec>
      <Spec label="Borders and elevation">
        <div className="grid gap-4">
          <p className="ds-meta flex items-center gap-3"><span className="block w-24 bg-(--ds-text)" style={{ height: system.shape.border.control }} /> Control {system.shape.border.control}px</p>
          <p className="ds-meta flex items-center gap-3"><span className="block w-24 bg-(--ds-text)" style={{ height: system.shape.border.card }} /> Card {system.shape.border.card}px</p>
          <p className="ds-body">{system.shape.shadow}</p>
          <div className="ds-panel max-w-xs"><p className="ds-heading">Panel</p><p className="ds-body ds-muted">Surface with its own text colors.</p></div>
        </div>
      </Spec>
    </div>
  );
}

// ----- 04 Texture and motif -----

function TextureAndMotif({ system }: { system: DesignSystem }) {
  return (
    <div className="grid gap-14">
      <div className="grid gap-12 md:grid-cols-3">
        <Spec label={`Texture · ${system.texture.name}`}>
          <div className="relative isolate h-44 overflow-hidden rounded-(--ds-radius-panel) border-2 border-(--ds-border)">
            <SystemTheme system={system} className="absolute inset-0"><span /></SystemTheme>
          </div>
          <p className="ds-body ds-muted">{system.texture.note}</p>
        </Spec>
        <Spec label={`Motif · ${system.motif.name}`}>
          <div className="flex h-44 items-center gap-6">
            <HeroMotif count={25} />
            <span className="ds-brand-mark">映</span>
            <Ornament />
          </div>
          <p className="ds-body ds-muted">{system.motif.note}</p>
        </Spec>
        <Spec label="Interaction feel · try it">
          <div className="flex h-44 flex-wrap items-center gap-4">
            <Button variant="primary" icon="save">Save</Button>
            <Chip label="Thriller" count={4} />
          </div>
          <p className="ds-body ds-muted">Hover: {system.feel.hover} Press: {system.feel.press}</p>
        </Spec>
      </div>
      <DrawingKit />
    </div>
  );
}

// ----- 05 Components -----

function Cell({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid content-start gap-4 border-2 border-(--ds-border) p-5 ${wide ? "md:col-span-2" : ""}`} style={{ borderRadius: "var(--ds-radius-panel)" }}>
      <p className="ds-label ds-muted">{label}</p>
      {children}
    </div>
  );
}

function Components({ system }: { system: DesignSystem }) {
  const spirited = filmById["spirited-away"];
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <Cell label="Buttons · primary and secondary">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" icon="save">Save</Button>
          <Button variant="secondary" icon="remove">Remove</Button>
        </div>
      </Cell>
      <Cell label="Icons · drawn in this system's style">
        <ul className="grid gap-3">
          {(Object.keys(system.icons) as IconName[]).map((name) => (
            <li key={name} className="grid grid-cols-[44px_1fr] items-center gap-3">
              <span className="grid h-11 w-11 place-items-center border-2 border-(--ds-border) text-[26px]" style={{ borderRadius: "var(--ds-radius-control)" }}><Icon name={name} /></span>
              <span className="ds-body"><span className="ds-label">{name}</span> · {system.icons[name]}</span>
            </li>
          ))}
        </ul>
      </Cell>
      <Cell label="Links">
        <p className="ds-body flex gap-6"><a href="#applied" className="ds-link">← All movies</a><a href="#applied" className="ds-link">Source ↗</a></p>
      </Cell>
      <Cell label="Text input">
        <TextInput type="search" placeholder="Search 25 films" aria-label="Search films (example)" />
      </Cell>
      <Cell label="Select">
        <Select aria-label="Sort (example)" defaultValue="newest">
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="shortest">Sort: Shortest</option>
          <option value="title">Sort: Title</option>
        </Select>
      </Cell>
      <Cell label="Checkbox and radios">
        <div className="grid gap-1">
          <Check label="Under 2 hours" defaultChecked />
          <div role="radiogroup" aria-label="Sort by (example)" className="flex flex-wrap gap-x-5">
            {["Year", "Runtime", "Title"].map((l, i) => <Check key={l} type="radio" name="sort-by" label={l} defaultChecked={i === 0} />)}
          </div>
        </div>
      </Cell>
      <Cell label="Toggle and tabs">
        <ToggleSpecimen />
        <TabsSpecimen />
      </Cell>
      <Cell label="Filter chips" wide>
        <ChipsSpecimen />
      </Cell>
      <Cell label="Badges and count">
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((c) => <CategoryBadge key={c.id} category={c.id} />)}
          <Count n={3} />
        </div>
      </Cell>
      <Cell label="Film card">
        <div className="w-48"><FilmCard film={parasite} headingLevel={3} action={<SaveSpecimen film={parasite} />} /></div>
      </Cell>
      <Cell label="Poster frame">
        <div className="w-32">
          <div className="ds-frame">
            <Poster film={filmById["my-neighbor-totoro"]} />
            <CategoryBadge category="animation" className="ds-category" />
          </div>
        </div>
      </Cell>
      <Cell label="List rows · Saved total" wide>
        <ListRowsSpecimen />
      </Cell>
      <Cell label="Detail panel" wide>
        <DetailPanel film={spirited} />
      </Cell>
      <Cell label="Site header" wide>
        <div className="relative overflow-hidden rounded-(--ds-radius-panel)">
          <HeaderBar padding="px-4" brand={<span className="flex items-center gap-2.5"><Brand /></span>} action={<span className="ds-btn ds-btn--secondary"><SavedLabel count={3} /></span>} />
        </div>
      </Cell>
      <Cell label="Result status · chip-row scroll hint">
        <p className="ds-meta ds-muted">Showing 4 of 25</p>
        <div className="ds-phone max-w-[260px]"><ChipsSpecimen limit={5} /></div>
      </Cell>
      <Cell label="Toast">
        <ToastSpecimen />
      </Cell>
      <Cell label="Credits block">
        <ol className="ds-fine">
          {["parasite", "rear-window", "spirited-away"].map((id) => {
            const f = filmById[id];
            return <li key={id}><strong>{f.title}</strong> ({f.year}) — {f.credit.publicDomain ? `Public domain (${f.credit.holder})` : `© ${f.credit.holder}`} · <span className="ds-link">Source</span></li>;
          })}
        </ol>
        <p className="ds-fine ds-muted">Posters used for a non-commercial class mock-up.</p>
      </Cell>
      <Cell label="Empty state">
        <EmptyState action={<span className={buttonClass("primary")}>Browse all movies →</span>} />
      </Cell>
    </div>
  );
}

function DetailPanel({ film }: { film: Film }) {
  return (
    <div className="ds-panel grid gap-5 sm:grid-cols-[150px_1fr]">
      <div className="ds-frame"><Poster film={film} /></div>
      <div className="grid content-start gap-2">
        <CategoryBadge category={film.category} className="justify-self-start" />
        <p className="ds-heading text-2xl">{film.title}</p>
        {film.native && <p lang={film.native.lang} className="ds-native">{film.native.title}</p>}
        <p className="ds-meta ds-muted">{film.year} · {formatRuntime(film.runtime)}</p>
        <p className="ds-body">{film.synopsis}</p>
        <p className="ds-fine ds-muted">© {film.credit.holder}</p>
        <div className="mt-2 w-40"><SaveSpecimen film={film} /></div>
      </div>
    </div>
  );
}

// ----- 06 Control states -----

type StateCell = { label: string; node: React.ReactNode };

function stateRows(): { control: string; states: StateCell[] }[] {
  const save = (state?: FrozenState, extra: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) => (
    <Button block state={state} aria-pressed={false} icon={extra["aria-pressed"] ? "saved" : "save"} {...extra}>{extra["aria-pressed"] ? "Saved" : "Save"}</Button>
  );
  const chip = (state?: FrozenState, extra: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) => <Chip label="Thriller" count={4} state={state} aria-pressed={false} {...extra} />;
  const remove = (state?: FrozenState, extra: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) => <Button block variant="secondary" icon="remove" state={state} {...extra}>Remove</Button>;
  const link = (state?: FrozenState, current = false) => (
    <span data-state={state} aria-current={current ? "page" : undefined} className={buttonClass("secondary")}><SavedLabel count={2} /></span>
  );
  const input = (state?: FrozenState, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => <TextInput state={state} placeholder="Search 25 films" aria-label="Search (example)" {...extra} />;
  const card = (state?: FrozenState) => (
    <div className="w-32"><FilmCard film={filmById["arrival"]} headingLevel={4} state={state === "hover" ? "hover" : undefined} action={save(state === "focus" ? "focus" : undefined)} /></div>
  );
  return [
    { control: "Save toggle", states: [
      { label: "Rest", node: save() }, { label: "Hover", node: save("hover") }, { label: "Focus", node: save("focus") },
      { label: "Pressed", node: save("pressed") }, { label: "Selected", node: save(undefined, { "aria-pressed": true }) }, { label: "Disabled", node: save(undefined, { disabled: true }) },
    ] },
    { control: "Filter chip", states: [
      { label: "Rest", node: chip() }, { label: "Hover", node: chip("hover") }, { label: "Focus", node: chip("focus") },
      { label: "Pressed", node: chip("pressed") }, { label: "Selected", node: chip(undefined, { "aria-pressed": true }) }, { label: "Disabled", node: chip(undefined, { disabled: true }) },
    ] },
    { control: "Remove", states: [
      { label: "Rest", node: remove() }, { label: "Hover", node: remove("hover") }, { label: "Focus", node: remove("focus") },
      { label: "Pressed", node: remove("pressed") }, { label: "Disabled", node: remove(undefined, { disabled: true }) },
    ] },
    { control: "Header link", states: [
      { label: "Rest", node: link() }, { label: "Hover", node: link("hover") }, { label: "Focus", node: link("focus") }, { label: "Current page", node: link(undefined, true) },
    ] },
    { control: "Input", states: [
      { label: "Rest", node: input() }, { label: "Focus", node: input("focus") }, { label: "Filled", node: input(undefined, { defaultValue: "Totoro" }) },
      { label: "Disabled", node: input(undefined, { disabled: true }) },
    ] },
    { control: "Card", states: [
      { label: "Rest", node: card() }, { label: "Hover · poster lifts", node: card("hover") }, { label: "Focus", node: card("focus") },
    ] },
  ];
}

function ControlStates() {
  return (
    <div inert className="grid gap-8">
      {stateRows().map((row) => (
        <div key={row.control} className="grid gap-4 md:grid-cols-[140px_1fr]">
          <p className="ds-label pt-2">{row.control}</p>
          <ul className="grid grid-cols-2 items-start gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {row.states.map((s) => (
              <li key={s.label} className="grid justify-items-start gap-2">
                {s.node}
                <span className="ds-fine ds-muted">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ----- 07 UI states -----

function UiStates() {
  const tile = (label: string, note: string, node: React.ReactNode) => (
    <div className="grid content-start gap-3">
      <p className="ds-label">{label}</p>
      {node}
      <p className="ds-fine ds-muted">{note}</p>
    </div>
  );
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {tile("Empty", "The Saved page before anything is saved.", <EmptyState action={<span className={buttonClass("primary")}>Browse all movies →</span>} />)}
      {tile("Loading", "The poster frame before its image arrives.", <div className="w-40"><FilmCard film={filmById["arrival"]} headingLevel={3} poster="loading" /></div>)}
      {tile("Error", "A poster that fails to load shows its title set in type.", <div className="w-40"><FilmCard film={filmById["blade-runner"]} headingLevel={3} poster="error" /></div>)}
      {tile("Success", "The saved state, the count going up, and the toast.", (
        <div className="grid gap-4">
          <div className="w-40"><FilmCard film={parasite} headingLevel={3} action={<SaveSpecimen film={parasite} initial />} /></div>
          <span className={`${buttonClass("secondary")} justify-self-start`}><SavedLabel count={1} /></span>
          <ToastSpecimen />
        </div>
      ))}
    </div>
  );
}
