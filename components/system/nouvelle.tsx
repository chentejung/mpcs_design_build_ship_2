"use client";
// Shōwa's drawing kit after Nouvelle Vague on the Japanese Retro board (picture 08), a matchbox-label portrait in
// flat cut shapes: a Hinomaru band down the left edge carrying ヌーベルバーグ top to bottom, a Sumi bob, a winking
// eye with an Ai lid, a round red cheek, red lips, and a sweater in Ai pinstripes. The eye, the lips, the bob and the
// cheek (pressed into a heart) are four Category pictograms (genre-icons.tsx); app/system.css takes the red band for
// panels and the pinstripes for rules and the selected tab.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";

const c = colors(showa.board);

// Pictograms, each drawn in 24 units inside the Kinari disc genre-icons.tsx gives it.

// Thriller: the open eye, watching, its lid drawn heavy and its lashes flicked up.
export const EyeGlyph = () => (
  <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.8 12.4Q12 5.2 20.2 12.4Q12 19 3.8 12.4Z" fill={c.washi} stroke={c.sumi} strokeWidth="1.2" />
    <circle cx="12" cy="12.4" r="3.4" fill={c.ai} />
    <circle cx="12" cy="12.4" r="1.5" fill={c.sumi} />
    <path d="M3.8 12.4Q12 5.2 20.2 12.4" fill="none" stroke={c.sumi} strokeWidth="2.3" />
    <path d="M6.6 9.1L5.5 7.4M9.3 7.6L8.8 5.7M12.2 7.1V5.1" fill="none" stroke={c.sumi} strokeWidth="1.2" />
  </g>
);

// Comedy: red lips in a grin, a Washi gleam on the lower one.
export const LipsGlyph = () => (
  <g>
    <path d="M4.2 11.2C6.8 8.2 9.6 7.8 12 9.4C14.4 7.8 17.2 8.2 19.8 11.2C16.8 17.6 7.2 17.6 4.2 11.2Z" fill={c.hinomaru} />
    <path d="M5.4 11.3C9 13.6 15 13.6 18.6 11.3" fill="none" stroke={c.sumi} strokeWidth="1.3" strokeLinecap="round" />
    <ellipse cx="12" cy="14.7" rx="2.3" ry="0.75" fill={c.washi} />
  </g>
);

// Horror: the Sumi bob fallen over a face, one eye showing through the parting.
export const HairGlyph = () => (
  <g>
    <path d="M5.4 20C4.4 10.4 6.8 3.8 12 3.8C17.2 3.8 19.6 10.4 18.6 20Z" fill={c.sumi} />
    <path d="M11 7.6C10.3 11.6 10.4 16.4 11 20H13.8C13.8 15.4 13.6 11.2 12.6 7.6Z" fill={c.washi} />
    <ellipse cx="12.3" cy="12.6" rx="0.9" ry="1.2" fill={c.hinomaru} />
    <path d="M10.9 18.2Q12.4 17.2 13.8 18.2" fill="none" stroke={c.sumi} strokeWidth="0.9" strokeLinecap="round" />
  </g>
);

// Romance: two round red cheeks pressed into a heart.
export const HeartGlyph = () => (
  <g fill={c.hinomaru}>
    <circle cx="8.9" cy="10.4" r="3.9" />
    <circle cx="15.1" cy="10.4" r="3.9" />
    <path d="M5.2 11.6H18.8L12 19.2Z" />
    <circle cx="8" cy="9.2" r="1" fill={c.washi} />
  </g>
);

// The portrait itself, for the drawing kit: band, bob, wink, cheek, lips and pinstriped sweater.
export function Portrait({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 80 80" className={className}>
      <rect width="80" height="80" rx="6" fill={c.washi} />
      <rect x="6" y="6" width="22" height="68" fill={c.hinomaru} />
      <path d="M22 6H74V14H38V60C38 66 30 66 26 62C22 58 24 50 28 46V14H22Z" fill={c.sumi} />
      <path d="M46 25Q52 20 58 25" fill="none" stroke={c.sumi} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M48 26.2Q52 30 56 26.2Z" fill={c.ai} />
      <circle cx="44" cy="40" r="7" fill={c.hinomaru} />
      <path d="M58 48C61 45.6 64 45.6 66 48C64 51.6 60 51.6 58 48Z" fill={c.hinomaru} />
      <path d="M40 60H74V74H40Z" fill={c.ai} />
      <path d="M44 61V74M48 61V74M52 61V74M56 61V74M60 61V74M64 61V74M68 61V74M72 61V74" stroke={c.washi} strokeWidth="0.9" />
      {[...`ヌーベル`].map((ch, i) => (
        <text key={i} x="17" y={20 + i * 15} textAnchor="middle" fontSize="12" fill={c.washi} style={{ fontFamily: "var(--ds-display-font)" }}>{ch}</text>
      ))}
    </svg>
  );
}
