"use client";
import { useState } from "react";
import { categories, films, type Category } from "@/app/films";
import { MovieCard, SaveButton } from "./card";

type Filter = Category | "all";

// /movies: single-select category filter over the full list. The filter is local state, so it resets on reload.
export function Browse() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? films : films.filter((f) => f.category === filter);
  const options = [{ id: "all" as const, label: "All" }, ...categories];

  return (
    <>
      <section className="pt-10 pb-6 md:pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--accent)">Now showing · 上映中</p>
        <h1 className="mt-2 font-serif text-4xl leading-[1.05] md:text-6xl">Pick tonight&rsquo;s film.</h1>
        <p className="mt-3 max-w-xl text-sm opacity-75 md:text-base">
          {films.length} films across seven genres. Save the ones you want to watch; your list stays while you browse and clears when you reload.
        </p>
      </section>

      <div role="group" aria-label="Filter by category" className="-mx-[5vw] flex gap-2 overflow-x-auto px-[5vw] [scrollbar-width:none] md:flex-wrap">
        {options.map((o) => {
          const active = filter === o.id;
          const count = o.id === "all" ? films.length : films.filter((f) => f.category === o.id).length;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active ? "border-(--second) bg-(--second) text-white" : "border-(--ink)/20 hover:border-(--ink)"
              }`}
            >
              {o.label}
              <span aria-hidden className="ml-1.5 tabular-nums opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 mb-6 text-xs opacity-65">
        Showing {shown.length} of {films.length}
      </p>

      <ul aria-label="Movies" className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((f) => (
          <li key={f.id}>
            <MovieCard film={f} action={<SaveButton film={f} />} />
          </li>
        ))}
      </ul>
    </>
  );
}
