// One Film: poster in the system's frame with its Category badge, title, Native Title, year · runtime,
// synopsis (3 lines at most on phones), and an action (Save or Remove).
import { formatRuntime, type Film } from "@/app/films";
import { CategoryBadge, type FrozenState } from "./controls";
import { Poster } from "./poster";

export function FilmCard({ film, action, headingLevel = 2, state, poster }: {
  film: Film;
  action?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
  state?: FrozenState;
  poster?: "loading" | "error";
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className="catalog-card" data-state={state}>
      <div className="catalog-frame">
        <Poster film={film} force={poster} />
        <CategoryBadge category={film.category} className="catalog-category" />
      </div>
      <Heading className="catalog-card-title catalog-heading">{film.title}</Heading>
      {film.native && <p lang={film.native.lang} className="catalog-card-native catalog-native">{film.native.title}</p>}
      <p className="catalog-card-meta catalog-meta">{film.year} · {formatRuntime(film.runtime)}</p>
      <p className="catalog-card-synopsis catalog-body max-sm:line-clamp-3">{film.synopsis}</p>
      {action && <div className="catalog-card-action">{action}</div>}
    </article>
  );
}
