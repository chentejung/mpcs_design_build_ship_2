"use client";
// Shōwa's drawing kit after Shiba & Sake on the Japanese Retro board (picture 06), a worn red poster: a Shiba over a
// striped bowl, a sake bottle, and a pair of chopsticks laid beside it. The Shiba is cut as the ukiyo-e-style print
// in references/showa-brushwork.jpg has it, sitting up on a rock with its eyes shut and its nose raised: a red-gold
// coat (Kinari overprinted with Hinomaru) combed in short strokes of Kogecha and Kinari, the white urajiro (裏白) of
// its muzzle, cheeks, chest, legs and tail in Washi feathered into the coat, and a fine Kogecha key line round it.
// Its face is the Animation pictogram and the chopsticks, crossed like swords, the Action one (genre-icons.tsx);
// the Shiba waiting by an empty bowl (ramen.tsx) on a rock above Fuji's lake tells the Saved page that nothing is
// saved yet.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { Fuji, Hills, Isle, Lake, Mist, paperInks, Shore, Sun } from "./fuji";
import { Bowl } from "./ramen";
import { Bokashi, comb, line, Paper, rng, smooth, stroke, useSvgId, Woodblock, type Pt } from "./woodblock";

const c = colors(showa.board);

// The coat: Kinari overprinted with a pass of Hinomaru, which prints the Shiba's red-gold.
const Coat = ({ d }: { d: string }) => (
  <>
    <path d={d} fill={c.kinari} />
    <path d={d} fill={c.hinomaru} fillOpacity="0.36" />
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

// The Shiba sitting, facing left with its nose raised, in 130 × 190 units with its paws on y = 186. Each part is a
// polygon the coat is cut to and the fur combed inside.
const part = {
  tail: [[106, 150], [110, 136], [118, 124], [126, 124], [131, 134], [131, 150], [126, 162], [116, 172], [106, 170]],
  tailIn: [[111, 154], [115, 140], [121, 132], [126, 138], [125, 150], [118, 160]],
  body: [[30, 52], [46, 56], [62, 52], [72, 46], [78, 58], [84, 76], [90, 96], [100, 110], [110, 126], [116, 146], [116, 166], [110, 180], [98, 186], [30, 186], [20, 160], [15, 128], [14, 96], [16, 70], [22, 58]],
  haunch: [[64, 124], [76, 113], [92, 113], [104, 122], [112, 138], [115, 158], [111, 176], [101, 186], [64, 186], [60, 166], [60, 142]],
  thigh: [[61, 150], [68, 138], [80, 134], [90, 141], [95, 155], [93, 171], [86, 182], [62, 184], [58, 168]],
  shoulder: [[58, 56], [72, 46], [78, 58], [84, 76], [90, 96], [100, 110], [110, 126], [104, 122], [92, 113], [76, 113], [64, 124], [56, 128], [53, 114], [53, 100], [56, 86], [60, 74], [62, 63]],
  chest: [[16, 50], [28, 57], [44, 60], [58, 56], [62, 63], [60, 74], [56, 86], [53, 100], [53, 114], [56, 128], [58, 150], [58, 186], [16, 186], [17, 160], [18, 136], [16, 116], [11, 98], [9, 80], [11, 64]],
  farLeg: [[37, 128], [55, 126], [57.5, 150], [58, 186], [37.5, 186]],
  head: [[10, 27], [18, 23.5], [30, 20.5], [38, 15], [50, 13], [62, 15], [69, 24], [72, 34], [70, 44], [64, 52], [50, 57], [34, 55], [22, 49], [14, 41], [10, 34]],
  face: [[11, 26.5], [20, 24.6], [29, 23.6], [33, 27.5], [37, 31], [43, 33.5], [50, 37], [57, 42], [62, 48], [60, 54], [52, 58], [40, 59], [28, 55], [19, 48], [13, 41], [10, 34]],
  earFront: [[30, 19], [33, 10], [36, 3], [39, 3.5], [42, 9], [46, 15]],
  earFrontIn: [[33.5, 16], [36, 8], [38.5, 8.5], [42, 15]],
  earBack: [[53, 15], [58, 9], [63, 3], [66, 3.5], [68, 12], [71, 28]],
  earBackIn: [[57, 15], [63, 7.5], [65.5, 8.5], [67, 22]],
} satisfies Record<string, Pt[]>;

function Shiba({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const rand = rng(21);
  const d = Object.fromEntries(Object.entries(part).map(([k, pts]) => [k, smooth(pts)])) as Record<keyof typeof part, string>;
  // The coat combed down the back and round the haunch; the urajiro combed down the chest and legs.
  const down = () => 82;
  const back = (px: number, py: number) => (py < 60 ? 20 + (px - 40) * 0.5 : 70);
  const around = (cx: number, cy: number) => (px: number, py: number) => (Math.atan2(py - cy, px - cx) * 180) / Math.PI + 80;
  const darkFur =
    comb(part.shoulder, 60, 6, 1.1, back, rand) +
    comb(part.haunch, 50, 6, 1.1, around(88, 160), rand) +
    comb(part.head, 26, 4, 0.9, (px, py) => (Math.atan2(py - 28, px - 10) * 180) / Math.PI, rand) +
    comb(part.tail, 18, 5, 1, around(120, 146), rand);
  const lightFur =
    comb(part.shoulder, 34, 5, 1, back, rand) +
    comb(part.haunch, 26, 5, 1, around(88, 160), rand) +
    comb(part.head, 14, 3.5, 0.8, (px, py) => (Math.atan2(py - 28, px - 10) * 180) / Math.PI, rand);
  const creamFur = comb(part.chest, 150, 7, 1, down, rand) + comb(part.face, 30, 4, 0.8, (px, py) => (Math.atan2(py - 30, px - 10) * 180) / Math.PI + 20, rand) + comb(part.thigh, 20, 5, 1, around(78, 160), rand);
  // The urajiro feathered into the coat at its edge: Washi tufts flicked out over the shoulder and the haunch.
  let tufts = "";
  for (let i = 0; i < 16; i++) {
    const py = 62 + i * 5.2;
    const px = 58 - Math.abs(py - 92) * 0.12 + rand() * 2;
    tufts += line([px - 3, py], [px + 3 + rand() * 4, py + 3 + rand() * 2], 1.5, 0.15);
  }
  for (let i = 0; i < 10; i++) {
    const a = (200 + i * 14) * (Math.PI / 180);
    const [px, py] = [80 + Math.cos(a) * 16, 156 + Math.sin(a) * 18];
    tufts += line([px + 2, py + 2], [px - 2 - rand() * 3, py - 2 - rand() * 2], 1.4, 0.15);
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinecap="round" strokeLinejoin="round">
      <Coat d={d.tail} />
      <path d={d.tailIn} fill={c.washi} />
      <Coat d={d.body} />
      <Coat d={d.haunch} />
      <path d={d.thigh} fill={c.washi} />
      <path d={d.chest} fill={c.washi} />
      <path d={d.farLeg} fill={c.kinari} fillOpacity="0.4" />
      <Coat d={d.earFront} />
      <Coat d={d.earBack} />
      <path d={d.earFrontIn} fill={c.washi} />
      <path d={d.earBackIn} fill={c.washi} />
      <Coat d={d.head} />
      <path d={d.face} fill={c.washi} />
      <path d={darkFur} fill={c.kogecha} fillOpacity="0.6" />
      <path d={lightFur} fill={c.kinari} />
      <path d={creamFur} fill={c.kinari} fillOpacity="0.75" />
      <path d={tufts} fill={c.washi} />
      {/* the inner ears furred in Kogecha */}
      <path d={line([37, 9], [39.5, 15], 1, 0.2) + line([63.5, 9], [66, 20], 1, 0.2)} fill={c.kogecha} fillOpacity="0.7" />
      {/* the far hind paw and the two front paws, toes picked out in Kogecha */}
      <ellipse cx="77" cy="183" rx="11" ry="4.5" fill={c.washi} />
      <ellipse cx="26" cy="181" rx="10.5" ry="5" fill={c.washi} />
      <ellipse cx="47" cy="182.5" rx="10.5" ry="5" fill={c.washi} />
      <g fill="none" stroke={c.kogecha} strokeWidth="0.9">
        <path d="M22 186Q22.5 182 24 180M28 186Q28.5 182 30 180M43 187Q43.5 183 45 181M49 187Q49.5 183 51 181M73 187Q73.5 184 75 182M79 187Q79.5 184 81 182" />
        {/* key line: the silhouette, the legs' edges and the haunch, a little broken as a worn block prints it */}
        <path d={smooth([[16, 52], [11, 64], [9, 80], [11, 98], [16, 116], [18, 136], [17, 160], [17, 177]], false)} />
        <path d={smooth([[36.5, 126], [37, 150], [37.5, 177]], false)} />
        <path d={smooth([[57, 132], [58, 156], [58.5, 178]], false)} />
        <path d={smooth([[66, 122], [80, 113], [96, 115], [108, 128], [114, 146], [115, 166], [111, 178]], false)} />
        <path d={smooth([[72, 46], [78, 60], [84, 78], [90, 96], [100, 110]], false)} />
        <path d={smooth([[110, 136], [118, 124], [127, 124], [131, 136], [131, 150], [125, 163], [115, 171]], false)} />
      </g>
      <path d={smooth(part.head.slice(0, 9), false)} fill="none" stroke={c.kogecha} strokeWidth="0.9" />
      <path d={smooth(part.earFront, false) + smooth(part.earBack, false)} fill="none" stroke={c.kogecha} strokeWidth="0.9" />
      {/* the face: pale eyebrow, eye shut in a smile, nose raised, a contented mouth */}
      <ellipse cx="39" cy="24.5" rx="2.4" ry="1.5" fill={c.washi} transform="rotate(-12 39 24.5)" />
      <path d={stroke([32.5, 28.6], [38, 31.4], [44, 29.4], 1.7, 0.3)} fill={c.sumi} />
      <ellipse cx="11.6" cy="28.4" rx="4" ry="3.1" fill={c.sumi} transform="rotate(-22 11.6 28.4)" />
      <ellipse cx="10.4" cy="27.2" rx="1.1" ry="0.6" fill={c.washi} fillOpacity="0.7" transform="rotate(-22 10.4 27.2)" />
      <path d={stroke([12.5, 33], [20, 39.5], [31, 40.2], 1.6, 0.2)} fill={c.sumi} />
    </g>
  );
}

// The Shiba waiting on a rock above Fuji's lake, eyes shut, beside an empty bowl and its chopsticks: a small print on
// its own sheet.
export function WaitingShiba({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 300 200" className={className}>
      <defs>
        <Woodblock id={id} rough={1.1} specks={0.45} grain={0.4} mottle={0.45} />
        <Woodblock id={`${id}-f`} rough={0.6} specks={0.35} grain={0.25} mottle={0.3} seed={7} />
        <clipPath id={`${id}-p`}><rect x="8" y="8" width="284" height="184" rx="2" /></clipPath>
        <Bokashi id={`${id}-s`} color={c.kinari} from={0.85} mid={[0.6, 0.3]} to={0.1} />
      </defs>
      <Paper x={0} y={0} width={300} height={200} rx={4} {...paperInks} />
      <g clipPath={`url(#${id}-p)`}>
        <g filter={`url(#${id})`}>
          <rect x="8" y="8" width="284" height="140" fill={`url(#${id}-s)`} />
          <Sun cx={84} cy={70} r={40} />
          <Mist bands={[[20, 96, 80, 5], [44, 104, 50, 3]]} color={c.hinomaru} under={null} seed={2} />
          <Fuji x={104} top={78} base={144} w={110} k={0.7} fingers={11} />
          <Mist bands={[[-4, 122, 110, 7], [110, 116, 120, 7], [60, 132, 120, 5]]} />
          <Hills x0={150} x1={292} y={144} h={12} humps={3} seed={5} depth={0.7} />
          <Isle x0={20} x1={70} y={144} h={6} />
          <Lake x0={8} x1={292} y0={144} y1={172} w={1.4} sun={84} />
          <Shore x0={0} x1={300} y={182} h={14} bottom={192} grass={10} gx={12} seed={10} />
        </g>
        <g filter={`url(#${id}-f)`}>
          <Bowl x={140} y={152} w={50} />
          <path d={line([104, 150], [166, 155], 2, 0.05) + line([106, 146], [168, 151], 2, 0.05)} fill={c.hinomaru} />
          <path d={line([104, 150], [119, 151.2], 2.4, 0.05) + line([106, 146], [121, 147.2], 2.4, 0.05)} fill={c.sumi} />
          <Shiba x={180} y={29} s={0.8} />
        </g>
      </g>
    </svg>
  );
}
