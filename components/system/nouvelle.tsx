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
import { paperInks } from "./fuji";
import { line, Paper, rng, scratches, stroke, useSvgId, Woodblock } from "./woodblock";

const c = colors(showa.board);

// Pictograms, each drawn in 24 units inside the Kinari disc genre-icons.tsx gives it.

// Thriller: the portrait's eye wide open, watching: a heavy Sumi liner swept back into a wing, an Ai iris.
export const EyeGlyph = () => (
  <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.4 12.8Q11.4 6 19.6 11.4Q12 19.2 3.4 12.8Z" fill={c.washi} />
    <circle cx="11.8" cy="12.3" r="3.5" fill={c.ai} />
    <circle cx="11.8" cy="12.3" r="1.6" fill={c.sumi} />
    <circle cx="10.6" cy="11.2" r="0.75" fill={c.washi} />
    <path d="M3.4 12.8Q11.4 6 19.6 11.4L21.6 9.2" fill="none" stroke={c.sumi} strokeWidth="2.2" />
    <path d="M5.4 14.2Q12 18 18.6 12.4" fill="none" stroke={c.sumi} strokeWidth="0.9" />
    <path d="M6.4 7.4Q11.6 4.6 17 6.6" fill="none" stroke={c.sumi} strokeWidth="1.2" />
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

// The portrait as the scene pastes it up, for the drawing kit: a red card set askew against a Kogecha board, its red
// nicked and scratched where the block wore, the face in profile with its chin raised, the Sumi bob cut straight at
// the jaw and scratched through with fine Washi strands, a winged eye, a round red cheek, red lips, a collar in Ai,
// and grass in Ai growing over the card's foot.
export function Portrait({ className = "" }: { className?: string }) {
  const id = useSvgId();
  const rand = rng(17);
  // Strands: fine Washi lines combed down the bob, and a few across the fringe.
  let strands = "";
  for (let i = 0; i < 12; i++) {
    const x0 = 26 + i * 3.1 + rand() * 1.6;
    strands += stroke([x0 + 8, 22 + rand() * 6], [x0 - 2, 56], [x0 - 4, 82 + rand() * 18], 0.45 + rand() * 0.45, 0.3);
  }
  for (let i = 0; i < 4; i++) strands += line([66 + i * 4.5, 30 + rand() * 3], [65 + i * 4.5, 45], 0.45, 0.3);
  let grass = "";
  // A tuft fanning out of the card's foot, each blade bending outwards as it rises.
  for (let i = 0; i < 18; i++) {
    const bx = 6 + rand() * 30;
    const a = ((-90 + (rand() - 0.45) * 80) * Math.PI) / 180;
    const len = 16 + rand() * 30;
    const bend = (Math.cos(a) > 0 ? 0.35 : -0.35) * (0.5 + rand());
    const tip: [number, number] = [bx + Math.cos(a) * len, 148 + Math.sin(a) * len];
    const mid: [number, number] = [bx + Math.cos(a - bend) * len * 0.6, 148 + Math.sin(a - bend) * len * 0.6];
    grass += stroke([bx, 148], mid, tip, 1.3 + rand() * 1, 0.05);
  }
  return (
    <svg aria-hidden viewBox="0 0 120 150" className={className}>
      <defs>
        <Woodblock id={id} rough={0.8} specks={0.55} grain={0.4} mottle={0.4} />
        <clipPath id={`${id}-c`}><rect x="14" y="12" width="92" height="126" /></clipPath>
      </defs>
      <Paper x={0} y={0} width={120} height={150} rx={6} {...paperInks} />
      <g filter={`url(#${id})`}>
        <path d="M6 10L12 8L14 146L8 148Z" fill={c.kogecha} />
        <g transform="rotate(-3.5 60 75)">
          <rect x="10" y="8" width="100" height="134" fill={c.washi} />
          <rect x="14" y="12" width="92" height="126" fill={c.hinomaru} />
          <g clipPath={`url(#${id}-c)`}>
            <path d={scratches(60, 75, 66, 70, rng(5), -70, 0.6)} fill={c.washi} fillOpacity="0.75" />
            {/* the collar in Ai, a fold of Washi at the neck */}
            <path d="M8 112C26 104 48 104 64 113L78 140H8Z" fill={c.ai} />
            <path d={line([42, 108], [56, 140], 1.2, 0.2)} fill={c.sumi} fillOpacity="0.6" />
            {/* the face in profile, chin up, and the neck */}
            <path d="M62 44H85C86 48 87 52 88 55C90 59 93 63 96 66.5L91.6 69.4C92.6 70.4 93.2 71.6 92.6 73C94.2 74 94.2 76 92.4 77.6C91.2 81.4 89 84.2 86 86.2C82 89 78.4 91 76.6 94L80.6 103L85 118H59L64 100C61 82 60 62 62 44Z" fill={c.washi} />
            {/* the bob, cut straight at the jaw, its fringe blunt across the brow */}
            <path d="M18 100V50C18 27 34 14 54 14C72 14 86 24 87 40L87 46H64C61 62 60.6 80 64.8 98L63 100Z" fill={c.sumi} />
            <path d={strands} fill={c.washi} fillOpacity="0.8" />
            {/* winged eye, brow, nostril */}
            <path d={stroke([77, 55.6], [82, 53.6], [87.4, 56], 1.8, 0.3)} fill={c.sumi} />
            <path d={line([77.4, 55.4], [72.6, 53.2], 1.1, 0.1)} fill={c.sumi} />
            <path d={stroke([78, 56.4], [82, 58.4], [86, 57], 0.7, 0.4)} fill={c.sumi} />
            <path d={line([77, 50.4], [87, 50.8], 1, 0.2, -0.06)} fill={c.sumi} />
            <path d={line([92.4, 67.2], [90.4, 67.8], 0.8, 0.3)} fill={c.sumi} />
            <circle cx="72" cy="71" r="7.4" fill={c.hinomaru} />
            <path d="M91.4 72.6C93.4 72.8 94.2 74 93.2 75.2C94 76.2 93.2 77.6 91.6 77.6C90 77 90 74 91.4 72.6Z" fill={c.hinomaru} />
          </g>
        </g>
        <path d={grass} fill={c.ai} />
      </g>
    </svg>
  );
}
