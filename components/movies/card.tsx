"use client";
import { categoryLabel, formatRuntime, type Film } from "@/app/films";
import { useSaved } from "./saved";

// One film: poster, title, year · runtime, one-line synopsis, and an action (Save or Remove).
export function MovieCard({ film, action }: { film: Film; action: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[10px] bg-(--ink)/10 shadow-[0_14px_28px_-18px_rgba(0,0,0,0.6)] ring-1 ring-(--ink)/15">
        <img src={film.poster} alt={`Poster for ${film.title}`} className="h-full w-full object-cover" />
        <span className="absolute top-2 left-2 rounded-full bg-(--bg)/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
          {categoryLabel[film.category]}
        </span>
      </div>
      <h2 className="mt-3 font-serif text-lg font-semibold leading-tight">{film.title}</h2>
      <p className="mt-0.5 text-xs tabular-nums opacity-65">{film.year} · {formatRuntime(film.runtime)}</p>
      <p className="mt-1.5 mb-3 text-sm leading-snug opacity-85">{film.synopsis}</p>
      <div className="mt-auto">{action}</div>
    </article>
  );
}

const button = "w-full rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors";

// Toggle: the name stays "Save <title>"; aria-pressed carries the saved state.
export function SaveButton({ film }: { film: Film }) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(film.id);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${film.title}`}
      onClick={() => toggle(film.id)}
      className={`${button} ${saved ? "bg-(--accent) text-white" : "border border-(--accent) hover:bg-(--accent)/10"}`}
    >
      {saved ? "✓ Saved" : "+ Save"}
    </button>
  );
}

export function RemoveButton({ film }: { film: Film }) {
  const { remove } = useSaved();
  return (
    <button type="button" aria-label={`Remove ${film.title}`} onClick={() => remove(film.id)} className={`${button} border border-(--ink)/25 hover:border-(--ink)`}>
      Remove
    </button>
  );
}
