"use client";
// Shōwa's Category pictograms, one drawn from each of its four posters, each set in a Kinari disc ringed by one turn
// of a Sumi brush (thick where it pressed, thin where it lifted) and worn like the rest of the kit:
// All, Fuji at sunrise (fuji.tsx) · Thriller, the watching eye · Comedy, the grin · Horror, the fallen bob ·
// Romance, the cheeks pressed into a heart (nouvelle.tsx) · Animation, the Shiba · Action, crossed chopsticks
// (shiba.tsx) · Sci-Fi, the ramen egg as a planet (ramen.tsx). They head the filter chips and Category badges and are
// decoration only: the label next to them says the Category. Pulp draws its own (pulp/genre.tsx); Haipai draws none.
import { colors } from "@/app/boards";
import type { Category } from "@/app/films";
import { showa } from "@/app/systems";
import { useSystemId } from "./context";
import { FujiGlyph } from "./fuji";
import { PulpGenreIcon } from "./pulp/genre";
import { EyeGlyph, HairGlyph, HeartGlyph, LipsGlyph } from "./nouvelle";
import { EggGlyph } from "./ramen";
import { useSvgId, Wear } from "./screenprint";
import { ChopsticksGlyph, ShibaGlyph } from "./shiba";

const c = colors(showa.board);

export const genreGlyphs: Record<Category | "all", { glyph: () => React.JSX.Element; from: string }> = {
  all: { glyph: FujiGlyph, from: "Fuji at sunrise (Fuji Sunrise)" },
  thriller: { glyph: EyeGlyph, from: "The watching eye (Nouvelle Vague)" },
  comedy: { glyph: LipsGlyph, from: "The red grin (Nouvelle Vague)" },
  animation: { glyph: ShibaGlyph, from: "The Shiba (Shiba & Sake)" },
  action: { glyph: ChopsticksGlyph, from: "Chopsticks crossed like swords (Shiba & Sake)" },
  "science-fiction": { glyph: EggGlyph, from: "The ramen egg as a planet (Ramen)" },
  romance: { glyph: HeartGlyph, from: "Cheeks pressed into a heart (Nouvelle Vague)" },
  horror: { glyph: HairGlyph, from: "The fallen bob (Nouvelle Vague)" },
};

// The ring: two circles a little off-centre from each other, so the band swells and thins as it goes round.
const ring = "M23.4 11.8A11.3 11.3 0 1 1 0.8 11.8A11.3 11.3 0 1 1 23.4 11.8ZM21.9 12.2A10 10 0 1 0 1.9 12.2A10 10 0 1 0 21.9 12.2Z";

export function GenreIcon({ id, className = "ds-genre-icon" }: { id: Category | "all"; className?: string }) {
  const uid = useSvgId();
  const system = useSystemId();
  if (system === "pulp") return <PulpGenreIcon id={id} className={className} />;
  if (system !== "showa") return null;
  const Glyph = genreGlyphs[id].glyph;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <defs><Wear id={uid} rough={0.5} specks={0.35} drag={0.2} /></defs>
      <g filter={`url(#${uid})`}>
        <circle cx="12" cy="12" r="10.6" fill={c.kinari} />
        <Glyph />
        <path d={ring} fill={c.sumi} fillRule="evenodd" />
      </g>
    </svg>
  );
}
