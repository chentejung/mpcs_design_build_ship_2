"use client";
// Shōwa's woodblock finish (木版) for its drawings, after the four posters its kit comes from (Mood Board 01: Fuji
// Sunrise 04, Shiba & Sake 06, Nouvelle Vague 08, Ramen 18) and the ukiyo-e-style print that sets them together
// (references/showa-brushwork.jpg). Each ink is a block pressed by hand onto old paper: the grain of the wood (木目)
// shows as paler streaks, the ink takes unevenly where the baren rubbed (胡麻摺り, a mottle of paper through the ink),
// the paper shows in fine specks where the block missed, and edges bleed a little into the fibres. Skies, Fuji and
// water are wiped in gradations (ぼかし, bokashi), and the key block (主版) draws Sumi lines over the colours, a hair
// out of register. Every line is a tapered brushstroke, pressed down and lifted off. app/system.css gives controls
// the same grain and specks (--ds-wear).
import { useId } from "react";

export const useSvgId = () => useId().replace(/:/g, "");

const tbl = (vs: number[]) => vs.map((v) => v.toFixed(3)).join(" ");

// Put `filter={`url(#${id})`}` on a group of inks laid over a <Paper>. `rough` is how far edges bleed (in viewBox
// units), `specks` how much paper shows in fine specks, `grain` how strongly the wood grain runs through the ink
// (sideways, or down when `vertical`), `mottle` how unevenly the baren pressed it; `scale` sizes it all for the
// drawing's viewBox (1 for about 300 units across, smaller for icons).
export function Woodblock({ id, rough = 1.4, specks = 0.5, grain = 0.5, mottle = 0.5, vertical = false, scale = 1, seed = 3 }: {
  id: string; rough?: number; specks?: number; grain?: number; mottle?: number; vertical?: boolean; scale?: number; seed?: number;
}) {
  const s = (n: number) => +(n / scale).toFixed(4);
  const cut = 0.79 - specks * 0.07; // noise level above which the paper shows through as a speck
  const [gx, gy] = vertical ? [0.28, 0.011] : [0.011, 0.28];
  const alpha = "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0";
  return (
    <filter id={id} x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency={s(0.035)} numOctaves="2" seed={seed} result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale={rough} xChannelSelector="R" yChannelSelector="G" result="ink" />
      <feTurbulence type="fractalNoise" baseFrequency={s(0.85)} numOctaves="2" seed={seed + 8} result="n1" />
      <feColorMatrix in="n1" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -26 0 0 0 ${(26 * cut).toFixed(2)}`} result="specks" />
      <feTurbulence type="fractalNoise" baseFrequency={`${s(gx)} ${s(gy)}`} numOctaves="3" seed={seed + 3} result="n2" />
      <feColorMatrix in="n2" values={alpha} />
      <feComponentTransfer result="wood"><feFuncA type="table" tableValues={tbl([1, 1, 1, 1, 1, 1 - grain * 0.3, 1 - grain * 0.8, 1 - grain, 1 - grain])} /></feComponentTransfer>
      <feTurbulence type="fractalNoise" baseFrequency={s(0.22)} numOctaves="2" seed={seed + 5} result="n3" />
      <feColorMatrix in="n3" values={alpha} />
      <feComponentTransfer result="mottle"><feFuncA type="table" tableValues={tbl([1, 1, 1, 1, 1 - mottle * 0.15, 1 - mottle * 0.45, 1 - mottle * 0.75, 1 - mottle, 1 - mottle])} /></feComponentTransfer>
      <feComposite in="wood" in2="mottle" operator="arithmetic" k1="1" result="press" />
      <feComposite in="specks" in2="press" operator="arithmetic" k1="1" result="mask" />
      <feComposite in="ink" in2="mask" operator="in" />
    </filter>
  );
}

// The old paper a print is pulled on: Washi stained unevenly with Kinari, darker towards its edges, with fibres and
// flecks of Kogecha in it. Unfiltered inks go on top; `rx` rounds its corners.
export function Paper({ x, y, width, height, rx = 0, washi, kinari, kogecha, seed = 2, scale = 1 }: {
  x: number; y: number; width: number; height: number; rx?: number; washi: string; kinari: string; kogecha: string; seed?: number; scale?: number;
}) {
  const id = useSvgId();
  const s = (n: number) => +(n / scale).toFixed(4);
  const box = { x, y, width, height, rx };
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-age`} cx="50%" cy="45%" r="75%">
          <stop offset="0.5" stopColor={kinari} stopOpacity="0.12" />
          <stop offset="1" stopColor={kinari} stopOpacity="0.6" />
        </radialGradient>
        <filter id={`${id}-stain`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={s(0.02)} numOctaves="3" seed={seed} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" />
          <feComponentTransfer><feFuncA type="table" tableValues="0 0 0.1 0.35 0.55 0.7 0.8 0.85" /></feComponentTransfer>
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}-fibre`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={`${s(0.9)} ${s(0.5)}`} numOctaves="2" seed={seed + 4} />
          <feColorMatrix values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  30 0 0 0 -21.9`} />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect {...box} fill={washi} />
      <rect {...box} fill={`url(#${id}-age)`} />
      <rect {...box} fill={kinari} filter={`url(#${id}-stain)`} opacity="0.45" />
      <rect {...box} fill={kogecha} filter={`url(#${id}-fibre)`} opacity="0.25" />
    </g>
  );
}

// A gradation (ぼかし) of one ink, wiped from `from` to `to` opacity down the shape (or across it when `across`);
// `mid` adds a stop at that share of the way.
export function Bokashi({ id, color, from = 1, to = 0, mid, across = false }: { id: string; color: string; from?: number; to?: number; mid?: [number, number]; across?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={across ? 1 : 0} y2={across ? 0 : 1}>
      <stop offset="0" stopColor={color} stopOpacity={from} />
      {mid && <stop offset={mid[0]} stopColor={color} stopOpacity={mid[1]} />}
      <stop offset="1" stopColor={color} stopOpacity={to} />
    </linearGradient>
  );
}

// A seeded random stream, so a drawing's brushwork comes out the same on every build.
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

export type Pt = [number, number];
const f = (n: number) => n.toFixed(1);

// One brushstroke from a to b, bending towards c, as a filled outline `w` wide at its fullest. The brush presses
// down to full width by `press` (a share of the length) and lifts off to a point at b; `press = 0.5` swells in the
// middle and tapers both ends, as a drag of a nearly dry brush does.
export function stroke(a: Pt, c: Pt, b: Pt, w: number, press = 0.15): string {
  const n = 12;
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    const x = u * u * a[0] + 2 * u * t * c[0] + t * t * b[0];
    const y = u * u * a[1] + 2 * u * t * c[1] + t * t * b[1];
    const dx = 2 * u * (c[0] - a[0]) + 2 * t * (b[0] - c[0]);
    const dy = 2 * u * (c[1] - a[1]) + 2 * t * (b[1] - c[1]);
    const len = Math.hypot(dx, dy) || 1;
    const k = t < press ? 0.4 + (0.6 * t) / press : Math.pow(1 - (t - press) / (1 - press), 0.75);
    const h = (w / 2) * k;
    left.push(`${f(x - (dy / len) * h)} ${f(y + (dx / len) * h)}`);
    right.unshift(`${f(x + (dy / len) * h)} ${f(y - (dx / len) * h)}`);
  }
  return `M${left.join("L")}L${right.join("L")}Z`;
}

// A straight stroke from a to b, bowed sideways by `bow` (a share of its length).
export function line(a: Pt, b: Pt, w: number, press = 0.15, bow = 0): string {
  const c: Pt = [(a[0] + b[0]) / 2 - (b[1] - a[1]) * bow, (a[1] + b[1]) / 2 + (b[0] - a[0]) * bow];
  return stroke(a, c, b, w, press);
}

// A pine's needle cluster (松葉): needles flicked out from a twig at (x, y), fanning from angle `from` to `to`
// (degrees, 0 pointing right, -90 up), each pressed at the twig and lifted off at its tip.
// `flat` squashes the fan into a tier, as the scene's pine carries its needles.
export function needles(x: number, y: number, r: number, rand: () => number, from = -170, to = -10, n = 15, w = 0.12, flat = 1): string {
  let d = "";
  for (let i = 0; i < n; i++) {
    const deg = from + ((to - from) * (i + rand() * 0.6)) / n;
    const a = (deg * Math.PI) / 180;
    const len = r * (0.65 + rand() * 0.4);
    const tip: Pt = [x + Math.cos(a) * len, y + Math.sin(a) * len * flat];
    d += line([x + Math.cos(a) * r * 0.06, y + Math.sin(a) * r * 0.06 * flat], tip, r * w, 0.08, (rand() - 0.5) * 0.14);
  }
  return d;
}

// A band of mist or cloud (霞) laid in one sideways drag: `len` long and `h` high at its fullest, its ends torn
// where the brush ran dry and its edges ragged.
export function band(x: number, y: number, len: number, h: number, rand: () => number): string {
  const n = 14;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const env = Math.pow(Math.sin(Math.PI * t), 0.35);
    const px = x + len * t + (i === 0 || i === n ? 0 : (rand() - 0.5) * len * 0.03);
    top.push(`${f(px + h * 0.6 * (1 - env))} ${f(y - (h / 2) * env * (0.75 + rand() * 0.5))}`);
    bottom.unshift(`${f(px - h * 0.6 * (1 - env))} ${f(y + (h / 2) * env * (0.7 + rand() * 0.4))}`);
  }
  return `M${top.join("L")}L${bottom.join("L")}Z`;
}

// Fine scratches across a block where its surface was nicked (the scene's sun and the bob are full of them):
// `n` short hairlines inside the circle at (x, y) of radius r, mostly running at `angle` degrees.
export function scratches(x: number, y: number, r: number, n: number, rand: () => number, angle = -12, w = 0.6): string {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const d0 = Math.sqrt(rand()) * r;
    const px = x + Math.cos(a) * d0;
    const py = y + Math.sin(a) * d0;
    const t = ((angle + (rand() - 0.5) * 40) * Math.PI) / 180;
    const len = r * (0.04 + rand() * 0.14);
    d += line([px, py], [px + Math.cos(t) * len, py + Math.sin(t) * len], w * (0.5 + rand()), 0.4, (rand() - 0.5) * 0.2);
  }
  return d;
}

// A smooth closed (or open) path through `pts`, as a brush would draw it: a Catmull-Rom curve.
export function smooth(pts: Pt[], closed = true): string {
  const n = pts.length;
  const at = (i: number) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

// Whether (x, y) lies inside the polygon `pts`.
export function inside(pts: Pt[], x: number, y: number): boolean {
  let hit = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Fur, or any combed texture: `n` short strokes about `len` long and `w` wide, set at random inside `region`,
// each laid at the angle (degrees) `angle` gives for where it starts.
export function comb(region: Pt[], n: number, len: number, w: number, angle: (x: number, y: number) => number, rand: () => number): string {
  const xs = region.map((p) => p[0]);
  const ys = region.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  let d = "";
  for (let i = 0, tries = 0; i < n && tries < n * 20; tries++) {
    const x = x0 + rand() * (x1 - x0);
    const y = y0 + rand() * (y1 - y0);
    if (!inside(region, x, y)) continue;
    const a = ((angle(x, y) + (rand() - 0.5) * 24) * Math.PI) / 180;
    const l = len * (0.6 + rand() * 0.8);
    d += line([x, y], [x + Math.cos(a) * l, y + Math.sin(a) * l], w * (0.7 + rand() * 0.6), 0.2, (rand() - 0.5) * 0.3);
    i++;
  }
  return d;
}
