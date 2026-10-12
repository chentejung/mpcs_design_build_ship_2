"use client";
import { useState } from "react";
import { categories, films, type Category } from "@/app/films";
import { Chip } from "@/components/system/controls";
import { FilmCard } from "@/components/system/film-card";
import { genreCounts } from "@/components/system/genres";
import { CoverBlurb, CoverDress, Ornament, Splash } from "@/components/system/motifs";
import { ScrollRow } from "@/components/system/scroll-row";
import { SaveButton } from "./card";

type Filter = Category | "all";

// /movies: single-select category filter over the full list. The filter is local state, so it resets on reload.
export function Browse() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? films : films.filter((f) => f.category === filter);
  const options = [{ id: "all" as const, label: "All" }, ...categories];
  const counts = genreCounts(films);

  return (
    <>
      <section className="ds-hero grid items-start gap-x-6 gap-y-8 pt-10 pb-6 sm:grid-cols-[minmax(0,1fr)_auto] md:pt-14">
        <div className="ds-hero-text min-w-0">
          <CoverDress />
          <div className="min-w-0">
            <p className="ds-eyebrow ds-label flex items-center gap-2">
              <Ornament /> Now showing · <span lang="ja">上映中</span>
            </p>
            <h1 className="ds-display mt-3">Pick tonight&rsquo;s film.</h1>
            <p className="ds-body ds-muted mt-3 max-w-xl">
              {films.length} films across seven genres. Save the ones you want to watch; your list stays while you browse and clears when you reload.
            </p>
            <CoverBlurb />
          </div>
        </div>
        <Splash filter={filter} counts={counts} onPick={setFilter} />
      </section>

      <ScrollRow role="group" aria-label="Filter by category" className="-mx-[5vw] px-[5vw]">
        {options.map((o) => (
          <Chip
            key={o.id}
            label={o.label}
            count={o.id === "all" ? films.length : counts[o.id]}
            aria-pressed={filter === o.id}
            onClick={() => setFilter(o.id)}
          />
        ))}
      </ScrollRow>
      <p aria-live="polite" className="ds-status ds-meta ds-muted mt-3 mb-6">
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
