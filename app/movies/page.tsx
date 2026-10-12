"use client";

import { useState } from "react";
import { MovieCard } from "./movie-card";
import { categories, movies, type Category } from "./data";
import { originalsByBoard } from "@/components/artifacts";

const japaneseLabels: Record<Category | "All", string> = {
  All: "すべて", Thriller: "スリラー", Comedy: "コメディ", Animation: "アニメ",
  Action: "アクション", "Science Fiction": "SF", Romance: "ロマンス", Horror: "ホラー",
};
const filters: (Category | "All")[] = ["All", ...categories];

export default function MoviesPage() {
  const [active, setActive] = useState<Category | "All">("All");
  const visible = active === "All" ? movies : movies.filter((movie) => movie.category === active);
  const nightScene = originalsByBoard["japanese-retro"][9];

  return (
    <main id="top">
      <section className="showa-container showa-marquee" aria-labelledby="program-title">
        <div className="showa-marquee-copy">
          <p className="showa-eyebrow"><span className="showa-tiny-sun" aria-hidden="true" /> THE EVENING EDITION <span lang="ja">今夜の映画</span></p>
          <h1 id="program-title">A good night.<br />A great <em>film.</em></h1>
          <p className="showa-marquee-intro">Twenty-five films, across decades and borders.<br className="showa-desktop-break" /> Pick a mood. Find a story. Save it for tonight.</p>
          <a href="#collection" className="showa-program-link">Browse the program <span aria-hidden="true">↘</span></a>
        </div>
        <figure className="showa-night-scene">
          <div className="showa-photo-mat"><img src={nightScene.src} alt="Lanterns lighting a narrow Japanese street at night" /></div>
          <span className="showa-vertical-sign" lang="ja" aria-hidden="true">映画のある夜</span>
          <span className="showa-round-stamp" aria-hidden="true"><small>THE COLLECTION</small><strong>25</strong><span>FILMS / 作品</span></span>
          <figcaption><span>LIGHTS DOWN. A WORLD OPENS.</span><span lang="ja">夜の街</span></figcaption>
        </figure>
      </section>

      <section id="collection" className="showa-container showa-collection" aria-labelledby="collection-title">
        <div className="showa-program-heading">
          <div><span className="showa-section-number" aria-hidden="true">壱</span><h2 id="collection-title">The film program</h2></div>
          <p><span lang="ja">お好きな一本を</span> / FIND YOUR FILM</p>
        </div>
        <div className="showa-filter-row" role="group" aria-label="Movie categories">
          {filters.map((category) => {
            const label = category === "Science Fiction" ? "Sci-Fi" : category;
            const count = category === "All" ? movies.length : movies.filter((movie) => movie.category === category).length;
            return <button key={category} type="button" onClick={() => setActive(category)} aria-label={label} aria-pressed={active === category} className={`showa-filter ${active === category ? "is-active" : ""}`}>
              <span lang="ja" aria-hidden="true">{japaneseLabels[category]}</span>
              <strong>{label}<small aria-hidden="true">{String(count).padStart(2, "0")}</small></strong>
            </button>;
          })}
        </div>
        <div className="showa-results-heading">
          <h3>{active === "All" ? "All films" : active}</h3>
          <p role="status" aria-live="polite">{visible.length} films in the program</p>
          <span className="showa-catalog-label" aria-hidden="true">EIGAKAN / VOL. 01</span>
        </div>
        <section aria-label="Film collection" className="showa-movie-grid">
          {visible.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </section>
        <div className="showa-program-end"><span aria-hidden="true">終</span><p>End of the program.<br /><em>The evening is yours.</em></p><a href="#collection">Back to the films ↑</a></div>
      </section>
    </main>
  );
}
