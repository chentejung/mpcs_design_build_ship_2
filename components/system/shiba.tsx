"use client";
// Shōwa's drawing kit after Shiba & Sake on the Japanese Retro board (picture 06), a worn red poster: a Shiba over a
// striped bowl, a sake bottle, and a pair of chopsticks laid beside it. The Shiba is drawn as the scene in
// references/showa-brushwork.jpg has it, sitting up on a rock with its eyes shut and its nose raised, its coat
// brushed in short Kogecha strokes over Kinari overprinted with a little Hinomaru, the white urajiro (裏白) of its
// muzzle and chest feathered in Washi. Its face is the Animation pictogram and the chopsticks, crossed like
// swords, the Action one (genre-icons.tsx); the Shiba waiting by an empty bowl (ramen.tsx) tells the Saved page that
// nothing is saved yet.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { Mist, Shore } from "./fuji";
import { Bowl } from "./ramen";
import { line, rng, useSvgId, Wear, type Pt } from "./screenprint";

const c = colors(showa.board);

// The coat: Kinari overprinted with a thin pass of Hinomaru, which prints the Shiba's red-gold.
const Coat = ({ d }: { d: string }) => (
  <>
    <path d={d} fill={c.kinari} />
    <path d={d} fill={c.hinomaru} fillOpacity="0.28" />
  </>
);

// Animation: the Shiba's face, eyes shut, ears up: its red-gold coat, the white urajiro over its muzzle and
// cheeks, and the two pale eyebrow dots (麻呂眉).
export const ShibaGlyph = () => (
  <g strokeLinejoin="round" strokeLinecap="round">
    <Coat d="M5.6 10.4L6.6 4.6L10.6 8ZM18.4 10.4L17.4 4.6L13.4 8Z" />
    <path d="M7.2 8.6L7.5 6.4L9.2 7.8ZM16.8 8.6L16.5 6.4L14.8 7.8Z" fill={c.washi} />
    <Coat d="M4.6 13.3C4.6 9.6 8 7.3 12 7.3C16 7.3 19.4 9.6 19.4 13.3C19.4 16.6 16 19.3 12 19.3C8 19.3 4.6 16.6 4.6 13.3Z" />
    <path d="M5.4 14.2L6.6 13.6L7.4 13.9C8.6 12.6 10.4 12.5 12 13.4C13.6 12.5 15.4 12.6 16.6 13.9L17.4 13.6L18.6 14.2C17.6 17.6 15 19.2 12 19.2C9 19.2 6.4 17.6 5.4 14.2Z" fill={c.washi} />
    <path d="M4.6 13.3C4.6 9.6 8 7.3 12 7.3C16 7.3 19.4 9.6 19.4 13.3C19.4 16.6 16 19.3 12 19.3C8 19.3 4.6 16.6 4.6 13.3Z" fill="none" stroke={c.sumi} strokeWidth="1" />
    <path d="M5.6 10.4L6.6 4.6L10.6 8M18.4 10.4L17.4 4.6L13.4 8" fill="none" stroke={c.sumi} strokeWidth="1" />
    <circle cx="9.3" cy="10" r="0.9" fill={c.washi} />
    <circle cx="14.7" cy="10" r="0.9" fill={c.washi} />
    <path d="M8.2 12Q9.4 13 10.6 12M13.4 12Q14.6 13 15.8 12" fill="none" stroke={c.sumi} strokeWidth="1" />
    <ellipse cx="12" cy="14.7" rx="1.4" ry="1" fill={c.sumi} />
    <path d="M12 15.7V16.5M10.7 17Q12 17.9 13.3 17" fill="none" stroke={c.sumi} strokeWidth="0.9" />
  </g>
);

// Action: the chopsticks crossed like two swords, red lacquer with Sumi grips.
export const ChopsticksGlyph = () => (
  <g strokeLinecap="round">
    <path d="M6 5L18.4 19.4M18 5L5.6 19.4" stroke={c.hinomaru} strokeWidth="2.1" />
    <path d="M6 5L8.3 7.7M18 5L15.7 7.7" stroke={c.sumi} strokeWidth="2.7" />
  </g>
);

// The Shiba sitting, facing left, drawn in 100 × 120 units with its paws on y = 120.
const body = "M44 40C30 50 24 72 26 96L26 120H88C100 116 102 96 94 80C86 62 72 46 60 40Z";
const head = "M6 21C8 15 16 12 24 11C30 4 44 2 54 8C64 14 66 28 60 38C54 46 42 50 32 46C22 42 12 34 8 26Z";
const ears = "M28 10L33 -10L45 4ZM46 5L60 -8L63 15Z";
const tail = "M88 84C106 82 110 58 98 52C88 46 80 56 88 62C92 65 97 62 96 58";
// The urajiro: muzzle, cheek and throat, down the chest to the forelegs, its edge feathered.
const urajiro =
  "M7 24C14 33 24 37 34 38L38 41L36 44L42 44L41 48L47 48L46 52L51 54C49 68 47 86 47 104L48 120H27L28 100C26 80 30 60 37 50C25 46 14 38 7 24Z";

function Shiba({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const rand = rng(21);
  // Fur: short strokes combed down the back and round the haunch, and Washi tufts at the urajiro's edge.
  let fur = "";
  const comb = (pts: Pt[], len: number, lean: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const t = (i + rand()) / n;
      const k = Math.min(pts.length - 2, Math.floor(t * (pts.length - 1)));
      const u = t * (pts.length - 1) - k;
      const px = pts[k][0] + (pts[k + 1][0] - pts[k][0]) * u + (rand() - 0.5) * 4;
      const py = pts[k][1] + (pts[k + 1][1] - pts[k][1]) * u + (rand() - 0.5) * 4;
      fur += line([px, py], [px + lean + (rand() - 0.5) * 3, py + len * (0.7 + rand() * 0.6)], 1.1 + rand() * 0.6, 0.12);
    }
  };
  comb([[58, 40], [72, 52], [86, 68], [94, 86]], 7, 4, 30);
  comb([[70, 84], [80, 92], [86, 104], [84, 114]], 6, -3, 16);
  comb([[24, 12], [40, 5], [54, 9], [62, 26]], 4, 2, 14);
  let tufts = "";
  for (let i = 0; i < 18; i++) {
    const py = 54 + i * 3.4;
    const px = 47 - (py - 54) * 0.02 + rand() * 2;
    tufts += line([px - 2, py], [px + 3 + rand() * 3, py + 2 + rand() * 2], 1.3, 0.1);
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={tail} stroke={c.kinari} strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d={tail} stroke={c.hinomaru} strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M88 78C100 76 103 62 97 57" stroke={c.washi} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <Coat d={body} />
      <path d="M88 120C99 115 102 102 97 90C93 104 84 110 72 112Z" fill={c.kogecha} fillOpacity="0.55" />
      <Coat d={ears} />
      <path d="M33 6L35 -3L41 4ZM50 6L58 -1L60 12Z" fill={c.washi} />
      <Coat d={head} />
      <path d={urajiro} fill={c.washi} />
      <path d={fur} fill={c.kogecha} fillOpacity="0.75" />
      <path d={tufts} fill={c.washi} />
      {/* forelegs and paws, the toes picked out in Sumi */}
      <path d="M37.5 100V120" stroke={c.kogecha} strokeOpacity="0.6" strokeWidth="1.4" />
      <path d="M28 120Q30.5 116 33 120M38 120Q40.5 116 43 120" stroke={c.sumi} strokeWidth="1" fill="none" />
      {/* face: shut eye, pale eyebrow, nose raised, a contented mouth */}
      <circle cx="30" cy="12.5" r="1.9" fill={c.washi} />
      <path d={line([22, 19], [34, 17], 2.4, 0.3, -0.14)} fill={c.sumi} />
      <ellipse cx="7.4" cy="21" rx="3.6" ry="2.8" fill={c.sumi} transform="rotate(-25 7.4 21)" />
      <path d={line([10, 27], [23, 32], 1.7, 0.2, 0.12)} fill={c.sumi} />
    </g>
  );
}

// The Shiba waiting on a rock in front of the sun, eyes shut, beside an empty bowl and its chopsticks.
export function WaitingShiba({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 260 150" className={className}>
      <defs><Wear id={id} rough={1.2} specks={0.5} drag={0.25} /></defs>
      <g filter={`url(#${id})`}>
        <circle cx="164" cy="62" r="56" fill={c.hinomaru} />
        <Mist bands={[[96, 96, 100, 8], [70, 108, 64, 5]]} />
        <Shore x0={0} x1={260} y={142} h={10} bottom={150} grass={9} gx={8} />
        <Shiba x={146} y={24} s={0.94} />
        <Bowl x={86} y={112} w={56} />
        <path d="M58 104L118 116M60 100L120 112" stroke={c.kogecha} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
