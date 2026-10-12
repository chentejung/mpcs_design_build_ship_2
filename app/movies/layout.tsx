import type { ReactNode } from "react";
import { MoviesHeader } from "./header";
import { MoviesProvider } from "./movies-context";
import { movies } from "./data";
import { colors, japaneseRetro } from "@/app/boards";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./movies.css";

export const metadata: Metadata = {
  title: "Eigakan 映画館 — Find your next film",
  description: "Explore 25 hand-picked films, browse by category, and keep a temporary shortlist.",
};

export default function MoviesLayout({ children }: { children: ReactNode }) {
  const palette = colors(japaneseRetro);
  const theme = {
    "--showa-red": palette.hinomaru,
    "--showa-ink": palette.sumi,
    "--showa-paper": palette.washi,
    "--showa-gold": palette.kinari,
    "--showa-indigo": palette.ai,
    "--showa-teal": palette.seiji,
  } as CSSProperties;

  return <MoviesProvider>
    <div className="showa-site" style={theme}>
      <MoviesHeader />
      {children}
      <footer className="showa-footer">
        <div className="showa-container">
          <div className="showa-footer-top"><div><p className="showa-footer-brand">Eigakan <span>映画館</span></p><p className="showa-eyebrow">A pocket cinema for a wandering evening</p></div><p className="showa-footer-note">Posters used for a non-commercial class mock-up. Rights belong to the credited copyright holders. Images are hosted with this site.</p></div>
          <details className="showa-credits"><summary>Poster credits &amp; sources <span>({movies.length})</span></summary><ul>{movies.map((movie) => <li key={movie.id}><strong>{movie.title}</strong> · {movie.creditHolder} · <a href={movie.source} target="_blank" rel="noreferrer">Source ↗</a></li>)}</ul></details>
          <div className="showa-footer-bottom"><span>Japanese Retro × Clay</span><span>25 films / 7 moods</span><span>Saved choices clear on reload</span></div>
        </div>
      </footer>
    </div>
  </MoviesProvider>;
}
