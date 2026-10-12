"use client";

import Link from "next/link";
import { MovieCard } from "../movie-card";
import { movieById } from "../data";
import { useMovies } from "../movies-context";

export default function SavedMoviesPage() {
  const { savedIds } = useMovies();
  const saved = savedIds.map((id) => movieById.get(id)).filter((movie) => movie !== undefined);

  return (
    <main className="showa-container showa-saved-page">
      <Link href="/movies/" className="showa-back-link">← Back to all films</Link>
      <header className="showa-saved-heading">
        <div><p className="showa-eyebrow">YOUR PERSONAL PROGRAM <span lang="ja">保存した映画</span></p><h1>Saved for<br /><em>a good night.</em></h1><p>Your picks, in the order you found them. This list clears when you reload.</p></div>
        <div className="showa-saved-tally" aria-hidden="true"><span>THE SHORTLIST</span><strong>{String(saved.length).padStart(2, "0")}</strong><small>FILMS / 作品</small></div>
      </header>

      {saved.length === 0 ? (
        <section className="showa-empty" aria-labelledby="empty-title">
          <div className="showa-empty-ticket" aria-hidden="true"><span lang="ja">映画館</span><strong>YOUR NEXT<br />MOVIE NIGHT</strong><small>ADMIT ONE GOOD STORY</small></div>
          <div><p className="showa-eyebrow">A BLANK TICKET. A WORLD OF POSSIBILITIES.</p><h2 id="empty-title">Nothing saved yet</h2><p>Find a film that catches your eye and save it here.<br />Your evening’s program starts with one good story.</p><Link href="/movies/" className="showa-hero-cta">Browse the films <span aria-hidden="true">↗</span></Link></div>
        </section>
      ) : (
        <>
          <div className="showa-results-heading"><h2>Saved films</h2><p role="status" aria-live="polite">{saved.length} {saved.length === 1 ? "film" : "films"} in your shortlist</p><span className="showa-catalog-label" aria-hidden="true">YOUR EVENING / あなたの夜</span></div>
          <section aria-label="Saved films" className="showa-movie-grid">{saved.map((movie) => <MovieCard key={movie.id} movie={movie} savedPage />)}</section>
        </>
      )}
    </main>
  );
}
