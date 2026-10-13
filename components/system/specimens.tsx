"use client";
// Interactive examples for the Design System pages. They hold their own state; nothing here touches the Final Site's
// saved list.
import { useState } from "react";
import { categories, filmById, films, formatRuntime, type Film } from "@/app/films";
import { Button, Chip, Toast, Toggle } from "./controls";
import { FilmCard } from "./film-card";
import { Brand, HeaderBar, SavedLabel } from "./header";
import { Poster } from "./poster";

const countIn = (id: string) => (id === "all" ? films.length : films.filter((f) => f.category === id).length);

export function SaveSpecimen({ film, initial = false }: { film: Film; initial?: boolean }) {
  const [saved, setSaved] = useState(initial);
  return (
    <Button block icon={saved ? "saved" : "save"} aria-pressed={saved} aria-label={`Save ${film.title}`} onClick={() => setSaved(!saved)}>
      {saved ? "Saved" : "Save"}
    </Button>
  );
}

export function ChipsSpecimen({ limit }: { limit?: number }) {
  const [active, setActive] = useState("all");
  const options = [{ id: "all" as const, label: "All" }, ...categories].slice(0, limit);
  return (
    <div role="group" aria-label="Filter by category (example)" className="ds-chip-row">
      {options.map((o) => <Chip key={o.id} genre={o.id} label={o.label} count={countIn(o.id)} aria-pressed={active === o.id} onClick={() => setActive(o.id)} />)}
    </div>
  );
}

export function ToggleSpecimen() {
  const [on, setOn] = useState(true);
  return <Toggle label="Show synopses" checked={on} onToggle={() => setOn(!on)} />;
}

export function TabsSpecimen() {
  const tabs = ["All movies", "Saved (3)"];
  const [active, setActive] = useState(0);
  return (
    <div role="tablist" aria-label="The Bijou pages (example)" className="ds-tabs">
      {tabs.map((t, i) => (
        <button key={t} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} className="ds-tab">
          {t}
        </button>
      ))}
    </div>
  );
}

export function ToastSpecimen() {
  const [undone, setUndone] = useState(false);
  return (
    <Toast action={<button type="button" className="ds-link ds-label" onClick={() => setUndone(!undone)}>{undone ? "Redo" : "Undo"}</button>}>
      {undone ? "Removed " : "Saved "}<em>Parasite</em>
    </Toast>
  );
}

// Saved films as compact rows, with their running total.
export function ListRowsSpecimen() {
  const [ids, setIds] = useState(["toy-story", "ringu", "die-hard"]);
  const total = ids.reduce((sum, id) => sum + filmById[id].runtime, 0);
  return (
    <div>
      <p className="ds-meta mb-1 font-bold">{ids.length} {ids.length === 1 ? "film" : "films"} · {formatRuntime(total)}</p>
      <ul aria-label="Saved movies (example)">
        {ids.map((id) => {
          const f = filmById[id];
          return (
            <li key={id} className="ds-row">
              <div className="w-11"><Poster film={f} /></div>
              <div className="min-w-0">
                <p className="ds-heading text-base break-words">{f.title}</p>
                <p className="ds-meta ds-muted">{f.year} · {formatRuntime(f.runtime)}</p>
              </div>
              <Button variant="secondary" icon="remove" aria-label={`Remove ${f.title}`} onClick={() => setIds(ids.filter((x) => x !== id))}>Remove</Button>
            </li>
          );
        })}
      </ul>
      {ids.length === 0 && (
        <Button className="mt-3" onClick={() => setIds(["toy-story", "ringu", "die-hard"])}>Put them back</Button>
      )}
    </div>
  );
}

// /bijou at phone width, built from the same components.
export function AppliedMock() {
  const [saved, setSaved] = useState<string[]>([]);
  const shown = ["parasite", "spirited-away", "seven-samurai", "in-the-mood-for-love"].map((id) => filmById[id]);
  const toggle = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <div className="ds-phone mx-auto h-[820px] w-[390px] max-w-full overflow-y-auto rounded-[28px] border-[6px] border-(--ds-text) bg-(--ds-bg) shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
      <HeaderBar
        padding="px-4"
        brand={<span className="flex items-center gap-2.5"><Brand /></span>}
        action={<span className="ds-btn ds-btn--secondary"><SavedLabel count={saved.length} /></span>}
      />
      <div className="px-4 pb-10">
        <p className="ds-label pt-6">Now showing · Tonight only</p>
        <p className="ds-display mt-2">Pick tonight&rsquo;s film.</p>
        <div className="-mx-4 mt-5 px-4"><ChipsSpecimen /></div>
        <p className="ds-meta ds-muted mt-2 mb-5">Showing 25 of 25</p>
        <ul aria-label="Movies (example)" className="grid grid-cols-2 gap-x-3 gap-y-8">
          {shown.map((f) => (
            <li key={f.id}>
              <FilmCard
                film={f}
                headingLevel={4}
                action={
                  <Button block icon={saved.includes(f.id) ? "saved" : "save"} aria-pressed={saved.includes(f.id)} aria-label={`Save ${f.title}`} onClick={() => toggle(f.id)}>
                    {saved.includes(f.id) ? "Saved" : "Save"}
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
