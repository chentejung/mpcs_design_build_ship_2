"use client";
// Shōwa's Category pictograms, one drawn from each of its four posters, each set in a Kinari disc keylined in Sumi:
// All, Fuji at sunrise (fuji.tsx) · Thriller, the watching eye · Comedy, the grin · Horror, the fallen bob ·
// Romance, the cheeks pressed into a heart (nouvelle.tsx) · Animation, the Shiba · Action, crossed chopsticks
// (shiba.tsx) · Sci-Fi, the ramen egg as a planet (ramen.tsx). They head the filter chips and Category badges and are
// decoration only: the label next to them says the Category. Other systems draw none.
import { colors } from "@/app/boards";
import type { Category } from "@/app/films";
import { showa } from "@/app/systems";
import { useSystemId } from "./context";
import { FujiGlyph } from "./fuji";
import { EyeGlyph, HairGlyph, HeartGlyph, LipsGlyph } from "./nouvelle";
import { EggGlyph } from "./ramen";
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

export function GenreIcon({ id, className = "ds-genre-icon" }: { id: Category | "all"; className?: string }) {
  if (useSystemId() !== "showa") return null;
  const Glyph = genreGlyphs[id].glyph;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="11" fill={c.kinari} stroke={c.sumi} strokeWidth="1.4" />
      <Glyph />
    </svg>
  );
}
