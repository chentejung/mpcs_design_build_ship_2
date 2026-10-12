"use client";

import { useMemo, useState } from "react";
import { MovieCard } from "./movie-card";
import { categories, movies, type Category } from "./data";
import { originalsByBoard } from "@/components/artifacts";

export default function MoviesPage() {
  const [active, setActive] = useState<Category | "All">("All");
  const visible = useMemo(() => active === "All" ? movies : movies.filter((movie) => movie.category === active), [active]);
  const crane = originalsByBoard["japanese-retro"][0];
  return <main id="top">
    <section className="showa-hero"><div className="showa-container showa-hero-grid">
      <div className="showa-hero-copy"><p className="showa-eyebrow">映 画 案 内 <span>·</span> THE FILM GUIDE</p><h1>Tonight calls<br />for <em>a film.</em></h1><p>Twenty-five stories from around the world. Find the mood you’re in, then keep a little shortlist for later.</p><a href="#collection" className="showa-hero-cta">Explore the films <span aria-hidden="true">↘</span></a><div className="showa-hero-stats"><span>25 carefully chosen films</span><span>7 ways to wander</span></div></div>
      <div className="showa-hero-art"><div className="showa-art-frame"><img src={crane.src} alt={crane.title} /><span className="showa-art-caption">01 / A NEW STORY BEGINS</span></div><span className="showa-hero-seal" aria-hidden="true">映画<br />館</span></div>
    </div></section>
    <section id="collection" className="showa-container showa-collection"><div className="showa-section-intro"><p className="showa-eyebrow">THE COLLECTION <span>·</span> 作品集</p><h2>Choose your mood.</h2><p>One category at a time. Every film has a place here.</p></div>
      <div className="showa-filter-row" role="group" aria-label="Movie categories">{["All", ...categories].map((category) => <button key={category} type="button" onClick={() => setActive(category as Category | "All")} aria-pressed={active === category} className={`showa-filter ${active === category ? "is-active" : ""}`}>{category === "Science Fiction" ? "Sci-Fi" : category}</button>)}</div>
      <div className="showa-results-heading"><h3>{active === "All" ? "All films" : active}</h3><span>{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "FILM" : "FILMS"}</span></div>
      <section aria-live="polite" className="showa-movie-grid">{visible.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</section>
    </section>
  </main>;
}
