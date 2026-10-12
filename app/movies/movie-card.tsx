"use client";

import { useMovies } from "./movies-context";
import { movies, type Movie } from "./data";

export function MovieCard({ movie, savedPage = false }: { movie: Movie; savedPage?: boolean }) {
  const { isSaved, toggle, remove } = useMovies();
  const saved = isSaved(movie.id);
  const number = String(movies.findIndex((item) => item.id === movie.id) + 1).padStart(2, "0");

  return (
    <article className={`showa-movie-card ${saved ? "has-saved-film" : ""}`} aria-labelledby={`film-${movie.id}`}>
      <div className="showa-card-register"><span>NO. {number}</span><span>{movie.category === "Science Fiction" ? "Sci-Fi" : movie.category}</span></div>
      <div className="showa-poster-wrap">
        <img src={movie.poster} alt={`${movie.title} poster`} className="showa-poster" width={300} height={450} />
        {saved && <span className="showa-saved-stamp" aria-hidden="true">SAVED <span>✓</span></span>}
      </div>
      <div className="showa-card-body">
        <p className="showa-card-kicker"><span>{movie.year}</span><i aria-hidden="true" />{movie.runtime} min</p>
        <h2 id={`film-${movie.id}`}>{movie.title}</h2>
        <p className="showa-card-synopsis">{movie.synopsis}</p>
      </div>
      <button type="button" onClick={() => savedPage ? remove(movie.id) : toggle(movie.id)} aria-pressed={savedPage ? undefined : saved} aria-label={`${savedPage ? "Remove" : saved ? "Unsave" : "Save"} ${movie.title}`} className={`showa-save-button ${saved && !savedPage ? "is-saved" : ""}`}>
        <span>{savedPage ? "Remove film" : saved ? "Saved for tonight" : "Save for tonight"}</span>
        <span className="showa-button-stub" aria-hidden="true">{savedPage ? "×" : saved ? "✓" : "+"}</span>
      </button>
    </article>
  );
}
