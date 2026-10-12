"use client";

import { useMovies } from "./movies-context";
import type { Movie } from "./data";

export function MovieCard({ movie, savedPage = false }: { movie: Movie; savedPage?: boolean }) {
  const { isSaved, toggle, remove } = useMovies();
  const saved = isSaved(movie.id);
  return <article className="showa-movie-card">
    <div className="showa-poster-wrap"><img src={movie.poster} alt={`${movie.title} poster`} className="showa-poster" /><span className="showa-poster-year">{movie.year}</span></div>
    <div className="showa-card-body">
      <p className="showa-card-kicker">{movie.category} <span>·</span> {movie.runtime} min</p>
      <h2>{movie.title}</h2>
      <p className="showa-card-synopsis">{movie.synopsis}</p>
      <button type="button" onClick={() => savedPage ? remove(movie.id) : toggle(movie.id)} aria-pressed={savedPage ? undefined : saved} aria-label={`${savedPage ? "Remove" : saved ? "Unsave" : "Save"} ${movie.title}`} className={`showa-save-button ${saved && !savedPage ? "is-saved" : ""}`}>
        <span>{savedPage ? "Remove" : saved ? "Saved" : "Save film"}</span><span aria-hidden="true">{savedPage ? "×" : saved ? "✓" : "+"}</span>
      </button>
    </div>
  </article>;
}
