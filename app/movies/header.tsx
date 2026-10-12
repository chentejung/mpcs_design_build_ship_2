"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMovies } from "./movies-context";

export function MoviesHeader() {
  const { savedIds } = useMovies();
  const pathname = usePathname();
  const savedPage = pathname?.includes("/saved");
  return (
    <header className="showa-header">
      <div className="showa-edition">
        <div className="showa-container"><span>THE EIGAKAN FILM PROGRAM</span><span>25 STORIES · 7 CATEGORIES · ONE GOOD EVENING</span></div>
      </div>
      <div className="showa-container showa-header-inner">
        <Link href="/movies/" className="showa-brand" aria-label="Eigakan 映画館 — All films">
          <span className="showa-brand-mark" lang="ja" aria-hidden="true">映画館</span>
          <span><strong>Eigakan<span className="showa-brand-period">.</span></strong><small>A LITTLE FILM HOUSE ON THE WEB</small></span>
        </Link>
        <nav aria-label="Movie navigation" className="showa-header-actions">
          <Link href="/movies/" aria-current={!savedPage ? "page" : undefined} className="showa-nav-link"><span aria-hidden="true">01</span> All films</Link>
          <Link href="/movies/saved/" aria-current={savedPage ? "page" : undefined} aria-label={`Saved (${savedIds.length})`} className="showa-saved-link">
            <span className="showa-ticket-label"><small aria-hidden="true">YOUR SHORTLIST / 保存</small><strong>Saved ({savedIds.length})</strong></span>
            <span className="showa-ticket-stub" aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
