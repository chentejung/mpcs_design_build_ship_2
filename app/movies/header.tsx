"use client";

import Link from "next/link";
import { useMovies } from "./movies-context";

export function MoviesHeader() {
  const { savedIds } = useMovies();
  return <header className="showa-header">
    <div className="showa-container showa-header-inner">
      <Link href="/movies/" className="showa-brand"><span className="showa-brand-mark" aria-hidden="true">映</span><span><strong>Eigakan</strong><small>映画館 · THE FILM HOUSE</small></span></Link>
      <nav aria-label="Movie navigation" className="showa-header-actions"><Link href="/movies/" className="showa-nav-link">All films</Link><Link href="/movies/saved/" className="showa-saved-link">Saved <span>({savedIds.length})</span><span aria-hidden="true"> ↗</span></Link></nav>
    </div>
  </header>;
}
