"use client";
// Shōwa's drawing kit after Nouvelle Vague on the Japanese Retro board (picture 08), a matchbox-label portrait in
// flat cut shapes: a Hinomaru band down the left edge carrying ヌーベルバーグ top to bottom, a Sumi bob, a winking
// eye with an Ai lid, a round red cheek, red lips, and a sweater in Ai pinstripes. The eye, the lips, the bob and the
// cheek (pressed into a heart) are four Category pictograms (genre-icons.tsx); app/system.css takes the red band for
// panels and the pinstripes for rules and the selected tab. The portrait itself is drawn as the scene in
// references/showa-brushwork.jpg pastes it up: a red card set slightly askew, the face in profile, the bob's ink
// scratched through with fine Washi strands, and grass in Ai growing over the card's foot.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { line, rng, stroke, useSvgId, Wear } from "./screenprint";

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

// The portrait itself, for the drawing kit: the askew red card, bob, shut eye, cheek, lips and Ai collar.
export function Portrait({ className = "" }: { className?: string }) {
  const id = useSvgId();
  const rand = rng(17);
  // Strands: fine Washi lines scratched down the bob, and a few across the fringe.
  let strands = "";
  for (let i = 0; i < 7; i++) {
    const x0 = 19 + i * 2.8 + rand() * 1.5;
    strands += stroke([x0 + 6, 11 + rand() * 3], [x0 - 1, 28], [x0 - 2.5, 40 + rand() * 14], 0.5 + rand() * 0.45, 0.3);
  }
  for (let i = 0; i < 2; i++) strands += line([44 + i * 5, 16 + i], [43 + i * 5, 25], 0.5, 0.3);
  let grass = "";
  for (let i = 0; i < 9; i++) {
    const bx = 6 + rand() * 22;
    const len = 9 + rand() * 13;
    const lean = (rand() - 0.3) * 10;
    grass += stroke([bx, 80], [bx + lean * 0.1, 80 - len * 0.7], [bx + lean, 80 - len], 1.4 + rand() * 0.6, 0.05);
  }
  return (
    <svg aria-hidden viewBox="0 0 80 80" className={className}>
      <defs><Wear id={id} rough={0.6} specks={0.5} drag={0.12} /></defs>
      <rect width="80" height="80" rx="6" fill={c.washi} />
      <g filter={`url(#${id})`}>
        <g transform="rotate(-5 40 40)">
          <rect x="9" y="7" width="62" height="68" fill={c.washi} stroke={c.sumi} strokeWidth="0.8" />
          <rect x="12" y="10" width="56" height="62" fill={c.hinomaru} />
          {/* the bob, cut straight at the jaw */}
          <path d="M14 55V24C14 12 24 8 35 8C47 8 55 13 56 23V26H40C38 33 37 41 38 48L36 55Z" fill={c.sumi} />
          <path d={strands} fill={c.washi} fillOpacity="0.8" />
          {/* the face in profile, chin up */}
          <path d="M40 26H56C57 29.5 59.5 33.5 65 37L61.6 39.6C62.4 41.2 62.8 42.8 61.8 44.2C62.8 45.2 62.6 46.8 61.2 47.6C60 52 55 55.5 48 55L46.5 63H37.5V52C36.6 43 37.6 33 40 26Z" fill={c.washi} />
          <path d={stroke([47.5, 32.4], [52.5, 29.6], [58, 31.6], 1.7, 0.3)} fill={c.sumi} />
          <path d={line([57.4, 31.4], [60, 29.6], 0.8, 0.1)} fill={c.sumi} />
          <ellipse cx="53.4" cy="32.6" rx="1.7" ry="1" fill={c.sumi} />
          <path d={line([47, 27.8], [55, 27.4], 0.9, 0.2, -0.08)} fill={c.sumi} />
          <circle cx="46" cy="41" r="5.4" fill={c.hinomaru} />
          <path d="M60.6 44.3C61.8 44.6 62 45.5 61 46.1C61.6 46.7 61.1 47.7 59.8 47.6C58.6 47 58.8 45 60.6 44.3Z" fill={c.hinomaru} />
          {/* the collar in Ai, a fold of Washi at the neck */}
          <path d="M12 60C22 56 34 56 44 60L56 72H12Z" fill={c.ai} />
          <path d="M40 59.5L47 60L53 70Z" fill={c.washi} />
        </g>
        <path d={grass} fill={c.ai} />
      </g>
    </svg>
  );
}
