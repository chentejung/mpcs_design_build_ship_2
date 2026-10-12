"use client";
import Link from "next/link";
import { filmById } from "@/app/films";
import { MovieCard, RemoveButton } from "./card";
import { useSaved } from "./saved";

// /movies/saved: saved films in the order they were saved.
export function SavedList() {
  const { ids } = useSaved();

  return (
    <>
      <section className="pt-8 pb-8 md:pt-12">
        <Link href="/movies/" className="text-sm opacity-70 hover:opacity-100">← All movies</Link>
        <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">Saved films</h1>
        {ids.length > 0 && (
          <p className="mt-3 text-sm opacity-75">
            {ids.length} {ids.length === 1 ? "film" : "films"}, in the order you saved them.
          </p>
        )}
      </section>

      {ids.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-(--ink)/25 px-6 py-16 text-center">
          <span aria-hidden className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-(--accent) font-serif text-2xl text-white">空</span>
          <p className="mt-4 font-serif text-2xl">Nothing saved yet</p>
          <p className="mt-1 text-sm opacity-70">Tap Save on any film and it shows up here.</p>
          <Link href="/movies/" className="mt-6 inline-flex rounded-[10px] bg-(--ink) px-4 py-2.5 text-sm font-medium text-(--bg) hover:bg-(--accent) hover:text-white">
            Browse all movies →
          </Link>
        </div>
      ) : (
        <ul aria-label="Saved movies" className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ids.map((id) => (
            <li key={id}>
              <MovieCard film={filmById[id]} action={<RemoveButton film={filmById[id]} />} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
