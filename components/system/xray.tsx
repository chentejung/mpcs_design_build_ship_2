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
