// Ben-Day's drawing kit, from the X-Ray Specs mail-order ad (Mood Board 02, picture 11): fine rays radiating from
// the product, the hypnotic spiral lens, the "ONLY $1" price burst and the little surprise strokes (emanata) that
// fly off an amazed face. The ad's coupon cut line and scissors are the Remove button and its icon.
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { burst } from "@/components/artifacts/print";
import { Sfx } from "./pow";

const c = colors(benDay.board);

// Thin wedges fanning out from a point, as behind the ad's spectacles.
export function Rays({ cx, cy, r, n = 28, color = c.red, spread = 0.35, opacity = 1 }: {
  cx: number; cy: number; r: number; n?: number; color?: string; spread?: number; opacity?: number;
}) {
  const at = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  const step = (2 * Math.PI) / n;
  return (
    <g fill={color} opacity={opacity}>
      {Array.from({ length: n }, (_, i) => <path key={i} d={`M${cx} ${cy}L${at(i * step)}L${at(i * step + step * spread)}Z`} />)}
    </g>
  );
}

// An Archimedean spiral from the center out to r.
export function spiral(cx: number, cy: number, r: number, turns = 4, phase = 0) {
  const steps = Math.round(turns * 40);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const a = t * turns * 2 * Math.PI + phase;
    return `${i ? "L" : "M"}${(cx + r * t * Math.cos(a)).toFixed(2)} ${(cy + r * t * Math.sin(a)).toFixed(2)}`;
  }).join("");
}

// The X-ray lens: an Ink and a Hero Red spiral wound into each other on Mustard, in a red rim.
export function SpiralLens({ cx = 50, cy = 50, r = 44, turns = 4, k = 3 }: { cx?: number; cy?: number; r?: number; turns?: number; k?: number }) {
  const band = r / turns / 2.6;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + k * 1.6} fill={c.red} stroke={c.ink} strokeWidth={k} />
      <circle cx={cx} cy={cy} r={r} fill={c.mustard} stroke={c.ink} strokeWidth={k * 0.6} />
      <path d={spiral(cx, cy, r, turns)} fill="none" stroke={c.ink} strokeWidth={band} strokeLinecap="round" />
      <path d={spiral(cx, cy, r, turns, Math.PI)} fill="none" stroke={c.red} strokeWidth={band} strokeLinecap="round" />
    </g>
  );
}

export function Spiral({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <SpiralLens />
    </svg>
  );
}

// "ONLY $1": a Mustard burst with an Ink keyline and stacked price lettering.
export function PriceBurst({ cx, cy, r, top = "ONLY", price = "$1" }: { cx: number; cy: number; r: number; top?: string; price?: string }) {
  return (
    <g>
      <polygon points={burst(cx, cy, r, r * 0.8, 18, 0.1)} fill={c.mustard} stroke={c.ink} strokeWidth={r * 0.06} strokeLinejoin="round" />
      <Sfx x={cx} y={cy - r * 0.2} size={r * 0.3} face={c.ink} depth={0} rotate={-10}>{top}</Sfx>
      <Sfx x={cx + r * 0.04} y={cy + r * 0.46} size={r * 0.66} rotate={-10} depth={3}>{price}</Sfx>
    </g>
  );
}

// Surprise strokes: short dashes flying off a point at the given angles (degrees, 0 = right).
export function Emanata({ cx, cy, r, len = 8, angles = [-150, -120, -90, -60, -30], k = 2.5, color = c.ink }: {
  cx: number; cy: number; r: number; len?: number; angles?: number[]; k?: number; color?: string;
}) {
  const p = (deg: number, d: number) => [cx + d * Math.cos((deg * Math.PI) / 180), cy + d * Math.sin((deg * Math.PI) / 180)].map((v) => v.toFixed(1)).join(" ");
  return (
    <g stroke={color} strokeWidth={k} strokeLinecap="round">
      {angles.map((a) => <path key={a} d={`M${p(a, r)}L${p(a, r + len)}`} />)}
    </g>
  );
}

// A four-point twinkle and a lightning bolt, the ad's decorations on the specs' frame.
const twinkle = (x: number, y: number, r: number) => `M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z`;
const bolt = (x: number, y: number, s: number) => `M${x} ${y}l${4 * s} 0l${-3 * s} ${6 * s}l${4 * s} 0l${-8 * s} ${10 * s}l${2 * s} ${-7 * s}l${-4 * s} 0Z`;

// The X-ray specs: a red cardboard frame with spiral lenses, its black arms folding back into depth.
export function Specs({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M18 104L30 52L46 46L36 100Z" fill={c.ink} stroke={c.ink} strokeWidth="3" />
      <path d="M182 104L172 52L156 46L164 100Z" fill={c.ink} stroke={c.ink} strokeWidth="3" />
      <path d="M30 52L46 46L44 54L32 58Z" fill={c.sepia} />
      <path
        d="M14 96H186C192 96 195 102 193 108L187 154C185 162 179 166 171 166H116C110 166 106 160 101 150H99C94 160 90 166 84 166H29C21 166 15 162 13 154L7 108C5 102 8 96 14 96Z"
        fill={c.red} stroke={c.ink} strokeWidth="4"
      />
      <path d="M16 100H184" stroke={c.newsprint} strokeWidth="2" opacity="0.5" />
      <g fill={c.mustard} stroke={c.ink} strokeWidth="1.2">
        <path d={twinkle(100, 112, 7)} />
        <path d={twinkle(19, 116, 5)} />
        <path d={twinkle(181, 116, 5)} />
        <path d={bolt(94, 128, 1)} />
        <path d={twinkle(176, 156, 4)} />
        <path d={twinkle(24, 156, 4)} />
      </g>
      <SpiralLens cx={58} cy={130} r={27} turns={3.5} k={3} />
      <SpiralLens cx={142} cy={130} r={27} turns={3.5} k={3} />
    </g>
  );
}

// The Comedy panel: the specs hanging in a burst of rays, laughter flying, "ONLY $1".
export function ComedyArt() {
  return (
    <g>
      <rect width="200" height="250" fill={c.newsprint} />
      <Rays cx={100} cy={128} r={240} n={44} spread={0.3} opacity={0.55} />
      <circle cx="100" cy="128" r="58" fill={c.mustard} opacity="0.55" />
      <Specs x={4} y={-6} s={0.96} />
      <Emanata cx={100} cy={124} r={80} len={10} angles={[-104, -90, -76]} k={2.5} />
      <Sfx x={58} y={46} size={38} rotate={-14} face={c.red}>HA!</Sfx>
      <Sfx x={146} y={40} size={32} rotate={10} face={c.mustard}>HA!</Sfx>
      <path d="M0 206H200V250H0Z" fill={c.red} stroke={c.ink} strokeWidth="4" />
      <path d="M0 212H200" stroke={c.mustard} strokeWidth="2" />
      <Sfx x={82} y={240} size={28} rotate={-4} face={c.mustard} depth={2}>AMAZING!</Sfx>
      <PriceBurst cx={168} cy={196} r={28} />
    </g>
  );
}
