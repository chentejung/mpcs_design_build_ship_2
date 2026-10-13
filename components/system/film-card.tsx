// One Film: poster in the system's frame with its Category badge, title, Native Title, year · runtime,
// synopsis (3 lines at most on phones), and an action (Save or Remove). Once Save is pressed, the system's
// stamp lands on the poster (app/system.css shows it with :has).
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
    <article className="ds-card" data-state={state}>
      <div className="ds-frame">
        <Poster film={film} force={poster} />
        <CategoryBadge category={film.category} className="ds-category" />
        <span aria-hidden className="ds-saved-stamp" />
      </div>
      <Heading className="ds-card-title ds-heading">{film.title}</Heading>
      {film.native && <p lang={film.native.lang} className="ds-card-native ds-native">{film.native.title}</p>}
      <p className="ds-card-meta ds-meta">{film.year} · {formatRuntime(film.runtime)}</p>
      <p className="ds-card-synopsis ds-body">{film.synopsis}</p>
      {action && <div className="ds-card-action">{action}</div>}
    </article>
  );
}
