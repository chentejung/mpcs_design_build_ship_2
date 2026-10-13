"use client";
// Pulp's Category pictograms: each a tiny pop-art panel cut from one picture on the American Comics board, keylined in
// Ink and printed on the same worn paper as the rest of the kit. They head the filter chips and Category badges and are
// decoration only: the label next to them says the Category.
import type { Category } from "@/app/films";
import { BalloonGlyph } from "./look";
import { BlastGlyph } from "./krakoom";
import { ClawGlyph } from "./into-the-unknown";
import { FistGlyph } from "./pow";
import { c, Newsprint, useSvgId } from "./press";
import { LipsGlyph, TelephoneGlyph } from "./ring-ring";
import { GrinGlyph } from "./the-mask";
import { SaucerGlyph } from "./weird-space-tales";

export const pulpGlyphs: Record<Category | "all", { glyph: () => React.JSX.Element; from: string }> = {
  all: { glyph: BlastGlyph, from: "The blast at the heart of the sound effect (Krakoom!)" },
  thriller: { glyph: TelephoneGlyph, from: "The telephone ringing on the desk (Ring! Ring!)" },
  comedy: { glyph: GrinGlyph, from: "The grin from ear to ear (The Mask)" },
  animation: { glyph: BalloonGlyph, from: "The speech balloon, shouting (Look!)" },
  action: { glyph: FistGlyph, from: "The fist landing in its burst (Pow!)" },
  "science-fiction": { glyph: SaucerGlyph, from: "The flying saucer and its beam (Weird Space Tales)" },
  romance: { glyph: LipsGlyph, from: "The red lips (Ring! Ring!)" },
  horror: { glyph: ClawGlyph, from: "The claw reaching up, dripping (Into the Unknown)" },
};

export function PulpGenreIcon({ id, className }: { id: Category | "all"; className: string }) {
  const uid = useSvgId();
  const Glyph = pulpGlyphs[id].glyph;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <defs>
        <Newsprint id={uid} rough={0.3} specks={0.2} scale={0.35} />
        <clipPath id={`${uid}-c`}><rect width="24" height="24" /></clipPath>
      </defs>
      <g filter={`url(#${uid})`} clipPath={`url(#${uid}-c)`}><Glyph /></g>
      <rect x="1" y="1" width="22" height="22" fill="none" stroke={c.ink} strokeWidth="2" />
    </svg>
  );
}
