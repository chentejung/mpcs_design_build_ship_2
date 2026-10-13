"use client";
import { useState } from "react";
import { categories, films, type Category } from "@/app/films";
import { Chip } from "@/components/system/controls";
import { FilmCard } from "@/components/system/film-card";
import { Ornament } from "@/components/system/motifs";
import { SaveButton } from "./card";
import { PosterHeroArt } from "@/components/system/showa-print";

type Filter = Category | "all";

// /movies: single-select category filter over the full list. The filter is local state, so it resets on reload.
export function Browse() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? films : films.filter((f) => f.category === filter);
  const options = [{ id: "all" as const, label: "All" }, ...categories];

  return (
    <>
      <section className="showa-browse-hero">
        <div className="min-w-0">
          <p className="ds-label flex items-center gap-2">
            <Ornament /> Now showing · <span lang="ja">上映中</span>
          </p>
          <h1 className="ds-display mt-3">Pick tonight&rsquo;s film.</h1>
          <p lang="ja" className="ds-kicker mt-4">今夜の一本を選ぼう</p>
          <p className="ds-body ds-muted mt-4 max-w-xl">
            {films.length} films across seven genres. Save the ones you want to watch; your list stays while you browse and clears when you reload.
          </p>
        </div>
        <PosterHeroArt landscape />
      </section>

      <div role="group" aria-label="Filter by category" className="ds-chip-row">
        {options.map((o) => (
          <Chip
            key={o.id}
            genre={o.id}
            label={o.label}
            count={o.id === "all" ? films.length : films.filter((f) => f.category === o.id).length}
            aria-pressed={filter === o.id}
            onClick={() => setFilter(o.id)}
          />
        ))}
      </div>
      <p aria-live="polite" className="ds-meta ds-muted mt-3 mb-6">
        Showing {shown.length} of {films.length}
      </p>

      <ul aria-label="Movies" className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((f) => (
          <li key={f.id}>
            <FilmCard film={f} action={<SaveButton film={f} />} />
          </li>
        ))}
      </ul>
    </>
  );
}
