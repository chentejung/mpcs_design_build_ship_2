"use client";
// A film's poster in its 2:3 frame. The fallback (title on Surface, over the system's PosterArt) sits behind the
// image, so it shows while the poster loads and stays if the poster fails. `force` pins the loading or error state for
// the UI states section.
import { useEffect, useRef, useState } from "react";
import type { Film } from "@/app/films";
import { PosterArt } from "./motifs";

type PosterState = "loading" | "loaded" | "error";

export function Poster({ film, force }: { film: Film; force?: "loading" | "error" }) {
  const [state, setState] = useState<PosterState>("loading");
  const img = useRef<HTMLImageElement>(null);

  // An image that settled before hydration fired its load/error event too early for React; read it directly.
  useEffect(() => {
    const el = img.current;
    if (el?.complete) setState(el.naturalWidth ? "loaded" : "error");
  }, []);

  const shown = force ?? state;
  return (
    <div className="ds-poster" data-poster={shown}>
      <div aria-hidden className="ds-poster-fallback">
        <PosterArt state={shown} />
        <span className="ds-heading">{film.title}</span>
        <span className="ds-meta">{shown === "error" ? "⚠ Poster didn’t load" : film.year}</span>
      </div>
      {force !== "loading" && (
        <img
          ref={img}
          src={force === "error" ? undefined : film.poster}
          alt={`Poster for ${film.title}`}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
    </div>
  );
}
