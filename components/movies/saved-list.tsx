"use client";
import Link from "next/link";
import { filmById, formatRuntime } from "@/app/films";
import { ButtonIcon, buttonClass } from "@/components/system/controls";
import { FilmCard } from "@/components/system/film-card";
import { EmptyState } from "@/components/system/motifs";
import { RemoveButton } from "./card";
import { useSaved } from "./saved";

// /movies/saved: saved films in the order they were saved, with their total running time.
export function SavedList() {
  const { ids } = useSaved();
  const total = ids.reduce((sum, id) => sum + filmById[id].runtime, 0);

  return (
    <>
      <section className="pt-8 pb-8 md:pt-12">
        <Link href="/movies/" className={buttonClass("secondary")}><ButtonIcon name="back" />All movies</Link>
        <h1 className="ds-display mt-4">Saved films</h1>
        {ids.length > 0 && (
          <p className="ds-body mt-3">
            <span className="ds-meta text-base font-bold">{ids.length} {ids.length === 1 ? "film" : "films"} · {formatRuntime(total)}</span>, in the
            order you saved them.
          </p>
        )}
      </section>

      {ids.length === 0 ? (
        <EmptyState action={<Link href="/movies/" className={buttonClass("primary")}>Browse all movies →</Link>} />
      ) : (
        <ul aria-label="Saved movies" className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ids.map((id) => (
            <li key={id}>
              <FilmCard film={filmById[id]} action={<RemoveButton film={filmById[id]} />} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
