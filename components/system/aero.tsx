// Ben-Day's drawing kit, from the Captain Aero Comics cover (Mood Board 02, picture 25): a ringed planet, a finned
// rocket riding a looping Mustard exhaust trail, a field of colored star dots, and the cover's price box. They
// compose into the cover splash beside the /movies headline. The cover's extruded masthead is the Display type
// (app/system.css).
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { rand } from "@/components/artifacts/print";
import { Impact, Sfx } from "./pow";
import { Rays } from "./xray";

const c = colors(benDay.board);

// A ringed planet: the back of the ring, the globe with its craters, then the front of the ring over it.
export function Planet({ cx, cy, r, body = c.mustard, ring = c.red, tilt = -18, k = 2.5 }: {
  cx: number; cy: number; r: number; body?: string; ring?: string; tilt?: number; k?: number;
}) {
  const rx = r * 1.8;
  const ry = r * 0.42;
  const w = r * 0.22;
  const arc = (front: boolean) => `M${cx + (front ? rx : -rx)} ${cy}A${rx} ${ry} 0 0 1 ${cx + (front ? -rx : rx)} ${cy}`;
  const band = (front: boolean) => (
    <g fill="none" strokeLinecap="round">
      <path d={arc(front)} stroke={c.ink} strokeWidth={w + k * 2} />
      <path d={arc(front)} stroke={ring} strokeWidth={w} />
    </g>
  );
  return (
    <g transform={`rotate(${tilt} ${cx} ${cy})`}>
      {band(false)}
      <circle cx={cx} cy={cy} r={r} fill={body} stroke={c.ink} strokeWidth={k} />
      <g fill={c.sepia} opacity="0.55">
        <ellipse cx={cx - r * 0.35} cy={cy - r * 0.4} rx={r * 0.2} ry={r * 0.13} />
        <ellipse cx={cx + r * 0.3} cy={cy - r * 0.55} rx={r * 0.11} ry={r * 0.08} />
        <ellipse cx={cx + r * 0.45} cy={cy + r * 0.05} rx={r * 0.14} ry={r * 0.1} />
      </g>
      <path d={`M${cx - r * 0.72} ${cy + r * 0.05}A${r * 0.75} ${r * 0.75} 0 0 0 ${cx - r * 0.1} ${cy + r * 0.72}`} fill="none" stroke={c.newsprint} strokeWidth={k * 0.9} strokeLinecap="round" />
      {band(true)}
    </g>
  );
}

// A finned rocket pointing right, centered on (x, y), with portholes and a two-tone flame.
export function Rocket({ x, y, s = 1, rotate = 0, k = 2.5 }: { x: number; y: number; s?: number; rotate?: number; k?: number }) {
  const sw = k / s;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} stroke={c.ink} strokeWidth={sw} strokeLinejoin="round">
      <path d="M-30 -5Q-48 0-30 5Z" fill={c.mustard} />
      <path d="M-30 -3Q-40 0-30 3Z" fill={c.red} stroke="none" />
      <path d="M-20 -8L-34 -21L-10 -9ZM-20 8L-34 21L-10 9Z" fill={c.red} />
      <path d="M-30 -8Q6 -14 34 0Q6 14-30 8Z" fill={c.red} />
      <path d="M14 -9.5Q26 -6 34 0Q26 6 14 9.5Q17 0 14 -9.5Z" fill={c.newsprint} />
      {[-16, -4, 8].map((px) => <circle key={px} cx={px} cy={-1} r={3.2} fill={c.newsprint} strokeWidth={sw * 0.8} />)}
    </g>
  );
}

// The exhaust trail a rocket loops along: a Mustard ribbon edged in Ink.
export function Swoosh({ d, w = 9, k = 2.5 }: { d: string; w?: number; k?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={c.ink} strokeWidth={w + k * 2} />
      <path d={d} stroke={c.mustard} strokeWidth={w} />
      <path d={d} stroke={c.newsprint} strokeWidth={w * 0.22} strokeDasharray="14 10" opacity="0.8" />
    </g>
  );
}

// Space as the cover prints it: scattered dots of red, mustard and paper.
export function Stars({ x, y, w, h, n = 22, seed = 11, k = 1.5 }: { x: number; y: number; w: number; h: number; n?: number; seed?: number; k?: number }) {
  const rnd = rand(seed);
  const inks = [c.red, c.mustard, c.newsprint, c.red, c.mustard];
  return (
    <g stroke={c.ink} strokeWidth={k}>
      {Array.from({ length: n }, (_, i) => <circle key={i} cx={x + rnd() * w} cy={y + rnd() * h} r={1.5 + rnd() * 3} fill={inks[i % inks.length]} />)}
    </g>
  );
}

// The cover's corner box: price over issue number.
export function PriceBox({ x, y, w = 44, h = 46, price = "10¢", issue = "No. 25" }: { x: number; y: number; w?: number; h?: number; price?: string; issue?: string }) {
  const font = { fontFamily: "var(--font-bangers)" };
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <rect x={x} y={y + h * 0.66} width={w} height={h * 0.34} fill={c.ink} />
      <text x={x + w / 2} y={y + h * 0.56} textAnchor="middle" fontSize={h * 0.5} fill={c.red} style={font}>{price}</text>
      <text x={x + w / 2} y={y + h * 0.92} textAnchor="middle" fontSize={h * 0.24} fill={c.mustard} style={font}>{issue}</text>
    </g>
  );
}

// The /movies splash: a cover panel where a rocket loops past a ringed planet into a burst that counts the films.
export function CoverSplash({ count, className = "" }: { count: number; className?: string }) {
  const clip = `splash-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 260 260" className={className}>
      <defs>
        <clipPath id={clip}><rect x="6" y="6" width="248" height="248" /></clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="260" height="260" fill={c.newsprint} />
        <Rays cx={120} cy={150} r={260} n={40} spread={0.14} opacity={0.75} />
        <Stars x={10} y={10} w={240} h={120} n={18} />
        <Planet cx={200} cy={62} r={24} />
        <Swoosh d="M-10 236C40 150 120 250 170 190S240 96 300 112" />
        <Rocket x={206} y={142} s={0.95} rotate={-38} />
      </g>
      <Impact cx={112} cy={160} r={92} seed={5} />
      <Sfx x={112} y={166} size={58} face={c.mustard} rotate={-9}>{String(count)}</Sfx>
      <Sfx x={116} y={204} size={30} face={c.newsprint} rotate={-9} depth={3}>FILMS!</Sfx>
      <rect x="6" y="6" width="248" height="248" fill="none" stroke={c.ink} strokeWidth="6" />
      <PriceBox x={14} y={14} />
    </svg>
  );
}
