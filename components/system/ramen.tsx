"use client";
// Shōwa's drawing kit after Ramen on the Japanese Retro board (picture 18), a woodblock-rough poster on an Ai ground:
// a bowl seen from above in rings of Hinomaru, Washi and Sumi, noodles, nori, and a halved egg whose red yolk sits in
// its white like a planet in its ring. The egg is the Sci-Fi pictogram (genre-icons.tsx). The bowl is cut as
// references/showa-brushwork.jpg sets it by the Shiba: a Washi bowl keylined in Kogecha, two Hinomaru rings under its
// lip, Ai brushed round its belly in the strokes that turned it on the wheel, and an Ai foot. Full, it holds chashu,
// noodles, scallion, a halved egg and a sheet of nori; empty, it sits by the waiting Shiba (shiba.tsx).
// app/system.css takes the bowl's rim rings for the rule under the header.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { paperInks } from "./fuji";
import { Bokashi, line, Paper, rng, smooth, stroke, useSvgId, Woodblock } from "./woodblock";

const c = colors(showa.board);
const f = (n: number) => n.toFixed(1);

// Sci-Fi: the halved egg as a planet, its Ai ring passing behind and coming round in front.
export const EggGlyph = () => (
  <g fill="none">
    <ellipse cx="12" cy="12" rx="9.4" ry="3" transform="rotate(-20 12 12)" stroke={c.ai} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="5.6" fill={c.washi} stroke={c.sumi} strokeWidth="1" />
    <circle cx="12.3" cy="12.2" r="3.1" fill={c.hinomaru} />
    <circle cx="11.2" cy="11.1" r="0.8" fill={c.washi} />
    <path d="M3.17 15.22A9.4 3 -20 0 0 20.83 8.78" stroke={c.ai} strokeWidth="1.6" strokeLinecap="round" />
  </g>
);

// A bowl in profile, centred on x with its rim at y and `w` across; `full` fills it with ramen.
export function Bowl({ x, y, w, full = false, tilt = 0.22, seed = 4 }: { x: number; y: number; w: number; full?: boolean; tilt?: number; seed?: number }) {
  const id = useSvgId();
  const rand = rng(seed);
  const r = w / 2;
  const h = w * 0.5;
  const ry = r * tilt; // the rim's ellipse, rounder the higher it is seen from
  // A ring round the body `t` of the way down, following the front of the rim.
  const ring = (t: number) => `M${f(x - r * 0.995)} ${f(y + h * t)}Q${f(x)} ${f(y + h * t + ry * 2)} ${f(x + r * 0.995)} ${f(y + h * t)}`;
  const body = `M${f(x - r)} ${f(y)}C${f(x - r)} ${f(y + h * 0.75)} ${f(x - r * 0.55)} ${f(y + h * 0.95)} ${f(x - r * 0.36)} ${f(y + h)}H${f(x + r * 0.36)}C${f(x + r * 0.55)} ${f(y + h * 0.95)} ${f(x + r)} ${f(y + h * 0.75)} ${f(x + r)} ${f(y)}Z`;
  // The wheel's strokes: Ai drags round the belly, thicker and closer towards the foot and on the shaded right.
  let turns = "";
  for (let i = 0; i < 9; i++) {
    const t = 0.38 + i * 0.065;
    const k = 1 - 0.5 * t * t; // the body's half-width share at that depth
    const yy = y + h * t + ry * (1 - t) * 0.6;
    const a = x - r * k * (0.2 + rand() * 0.5);
    turns += line([a, yy + ry * 0.4], [x + r * k * 0.96, yy], h * (0.015 + t * 0.02), 0.5, -0.03);
  }
  const foot = `M${f(x - r * 0.38)} ${f(y + h * 0.97)}H${f(x + r * 0.38)}L${f(x + r * 0.34)} ${f(y + h * 1.08)}H${f(x - r * 0.34)}Z`;
  return (
    <g>
      <defs><Bokashi id={`${id}-in`} color={c.kogecha} from={0.55} to={0.08} /></defs>
      <path d={foot} fill={c.washi} />
      <path d={line([x - r * 0.34, y + h * 1.04], [x + r * 0.34, y + h * 1.04], h * 0.07, 0.5)} fill={c.ai} />
      <path d={body} fill={c.washi} />
      <path d={turns} fill={c.ai} fillOpacity="0.55" />
      <path d={ring(0.13)} fill="none" stroke={c.hinomaru} strokeWidth={h * 0.06} />
      <path d={ring(0.24)} fill="none" stroke={c.hinomaru} strokeWidth={h * 0.035} />
      <path d={line([x - r * 0.36, y + h * 0.96], [x + r * 0.36, y + h * 0.96], h * 0.05, 0.5)} fill={c.ai} />
      <path d={body} fill="none" stroke={c.kogecha} strokeWidth={h * 0.035} strokeLinejoin="round" />
      <ellipse cx={x} cy={y} rx={r} ry={ry} fill={c.washi} stroke={c.kogecha} strokeWidth={h * 0.035} />
      <ellipse cx={x} cy={y + ry * 0.08} rx={r * 0.93} ry={ry * 0.78} fill={c.ai} fillOpacity="0.55" />
      <ellipse cx={x} cy={y + ry * 0.16} rx={r * 0.88} ry={ry * 0.66} fill={full ? c.kinari : c.washi} />
      {full && <ellipse cx={x} cy={y + ry * 0.16} rx={r * 0.88} ry={ry * 0.66} fill={c.kogecha} fillOpacity="0.72" />}
      {!full && <ellipse cx={x} cy={y + ry * 0.16} rx={r * 0.88} ry={ry * 0.66} fill={`url(#${id}-in)`} />}
      {full && <Ramen x={x} y={y + ry * 0.1} r={r * 0.86} ry={ry * 0.62} rand={rand} />}
    </g>
  );
}

// What sits in the full bowl: a sheet of nori stood at the back, chashu, a nest of noodles, scallion and the egg.
function Ramen({ x, y, r, ry, rand }: { x: number; y: number; r: number; ry: number; rand: () => number }) {
  let noodles = "";
  for (let i = 0; i < 6; i++) {
    const nx = x - r * 0.08 + i * r * 0.05;
    noodles += stroke([nx - r * 0.18, y + ry * 0.1], [nx, y - ry * (0.5 + rand() * 0.4)], [nx + r * 0.2, y + ry * 0.2], ry * 0.12, 0.5);
  }
  let scallion = "";
  for (let i = 0; i < 7; i++) {
    const sx = x + r * (0.05 + rand() * 0.3);
    const sy = y - ry * (0.35 + rand() * 0.35);
    scallion += `M${f(sx - ry * 0.12)} ${f(sy)}a${f(ry * 0.12)} ${f(ry * 0.09)} 0 1 0 ${f(ry * 0.24)} 0a${f(ry * 0.12)} ${f(ry * 0.09)} 0 1 0 ${f(-ry * 0.24)} 0Z`;
  }
  return (
    <g>
      <path d={`M${f(x + r * 0.1)} ${f(y - ry * 0.2)}L${f(x + r * 0.22)} ${f(y - ry * 2.6)}L${f(x + r * 0.82)} ${f(y - ry * 2.1)}L${f(x + r * 0.62)} ${f(y - ry * 0.1)}Z`} fill={c.sumi} />
      {[-0.52, -0.28].map((k) => (
        <g key={k}>
          <ellipse cx={x + r * k} cy={y - ry * 0.05} rx={r * 0.25} ry={ry * 0.64} fill={c.kinari} stroke={c.kogecha} strokeWidth={ry * 0.1} />
          <ellipse cx={x + r * k} cy={y - ry * 0.05} rx={r * 0.25} ry={ry * 0.64} fill={c.hinomaru} fillOpacity="0.22" />
          <ellipse cx={x + r * k + r * 0.02} cy={y - ry * 0.1} rx={r * 0.13} ry={ry * 0.32} fill="none" stroke={c.washi} strokeOpacity="0.8" strokeWidth={ry * 0.09} />
        </g>
      ))}
      <path d={noodles} fill={c.kinari} />
      <path d={scallion} fill="none" stroke={c.ai} strokeWidth={ry * 0.08} />
      <ellipse cx={x + r * 0.5} cy={y + ry * 0.05} rx={r * 0.27} ry={ry * 0.62} fill={c.washi} stroke={c.kogecha} strokeOpacity="0.5" strokeWidth={ry * 0.06} />
      <ellipse cx={x + r * 0.5} cy={y + ry * 0.05} rx={r * 0.16} ry={ry * 0.38} fill={c.kinari} />
      <ellipse cx={x + r * 0.5} cy={y + ry * 0.05} rx={r * 0.16} ry={ry * 0.38} fill={c.hinomaru} fillOpacity="0.6" />
    </g>
  );
}

// The full bowl, for the drawing kit: a small print of it on its own paper.
export function RamenBowl({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 80 80" className={className}>
      <defs><Woodblock id={id} rough={0.6} specks={0.4} grain={0.35} mottle={0.3} /></defs>
      <Paper x={0} y={0} width={80} height={80} rx={6} {...paperInks} />
      <g filter={`url(#${id})`}>
        <path d={smooth([[8, 68], [22, 64], [40, 66], [58, 63], [72, 68], [72, 72], [8, 72]])} fill={c.kogecha} fillOpacity="0.3" />
        <Bowl x={40} y={34} w={62} full tilt={0.32} />
      </g>
    </svg>
  );
}
