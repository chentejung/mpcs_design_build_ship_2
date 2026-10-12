"use client";

import Link from "next/link";
import { MovieCard } from "../movie-card";
import { movieById } from "../data";
import { useMovies } from "../movies-context";

export default function SavedMoviesPage() {
  const { savedIds } = useMovies();
  const saved = savedIds.map((id) => movieById.get(id)).filter((movie) => movie !== undefined);
  return <main className="showa-container showa-saved-page"><Link href="/movies/" className="showa-back-link">← Back to all films</Link><div className="showa-section-intro"><p className="showa-eyebrow">YOUR SHORTLIST <span>·</span> 保存した映画</p><h1>Saved films.</h1><p>A few possibilities for tonight, kept in the order you found them.</p></div>{saved.length === 0 ? <div className="showa-empty"><span className="showa-empty-mark" aria-hidden="true">映</span><h2>Nothing saved yet</h2><p>Browse the collection and save whatever catches your eye.</p><Link href="/movies/" className="showa-hero-cta">Browse films <span aria-hidden="true">↗</span></Link></div> : <><div className="showa-results-heading"><h3>Your picks</h3><span>{String(saved.length).padStart(2, "0")} {saved.length === 1 ? "FILM" : "FILMS"}</span></div><section className="showa-movie-grid">{saved.map((movie) => <MovieCard key={movie.id} movie={movie} savedPage />)}</section></>}</main>;
}
