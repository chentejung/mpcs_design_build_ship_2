"use client";
// Shōwa's drawing kit after the Koi Pond picture on the Japanese Retro board (picture 02), a riso print: kohaku koi
// circling over a tiled Ai pool with their shadows a plate out of register on the tiles, speckled stones, red momiji
// leaves, and ripple rings where the rain lands. The inks sit flat, without keylines; only the pool's edge is ruled.
// A sun rising over waves heads the vertical signboard (osaka.tsx). motifs.tsx shows the pond as the empty state.
import { useId } from "react";
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { Grain, rand } from "@/components/artifacts/print";

const c = colors(showa.board);
type P = [number, number];
const f = (n: number) => n.toFixed(2);
const path = (pts: P[], close = true) => `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}${close ? "Z" : ""}`;
const useSvgId = () => useId().replace(/:/g, "");

// ----- Koi 鯉 -----

// A koi is drawn along a spine from nose (t = 0) to tail tip (t = 1): the body takes 0–0.8, the tail fin the rest,
// so the whole fish bends with the curve it swims.
type Spine = (t: number) => P;
const BODY = 0.76;

function frame(spine: Spine, t: number) {
  const e = 0.002;
  const [x0, y0] = spine(Math.max(0, t - e));
  const [x1, y1] = spine(Math.min(1, t + e));
  const len = Math.hypot(x1 - x0, y1 - y0) || 1;
  const d: P = [(x1 - x0) / len, (y1 - y0) / len]; // nose → tail
  const p = spine(t);
  // A point u along the swim direction and v to the fish's left.
  return (u: number, v: number): P => [p[0] + d[0] * u - d[1] * v, p[1] + d[1] * u + d[0] * v];
}

// The body's half-width (× W) along it: a round head, widest at 0.28, tapering to the tail.
const girth = (s: number) => (s < 0.28 ? Math.sqrt(1 - ((0.28 - s) / 0.28) ** 2) : 1 - 0.8 * ((s - 0.28) / 0.72) ** 1.5);

// Kohaku patches: [t on the body, offset across it × W, size × W]; each is a cluster of discs, so its edge scallops.
const kohaku: [number, number, number][] = [[0.12, 0.05, 0.62], [0.36, -0.12, 0.8], [0.6, 0.18, 0.56]];

function koiShapes(spine: Spine, W: number) {
  const body: P[] = [];
  const back: P[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = (BODY * i) / 40;
    const w = W * girth(t / BODY);
    const at = frame(spine, t);
    body.push(at(0, w));
    back.unshift(at(0, -w));
  }
  // The tail fin, in (a = 0 at the peduncle → 1 at the tips, v across); mapped onto the spine so it bends too.
  const w0 = W * girth(1);
  const fin = (a: number, v: number) => frame(spine, BODY + (1 - BODY) * a)(0, v);
  const edge = (a: number) => w0 + (1.15 * W - w0) * Math.sin((Math.PI * a) / 2) ** 1.4;
  const notch = (s: number): [number, number] => [1 + 0.06 * Math.sin(Math.PI * s) - 0.34 * s, 1.15 * W * (1 - s) ** 0.9];
  const tail: P[] = [];
  for (let i = 0; i <= 12; i++) tail.push(fin(i / 12, edge(i / 12)));
  for (let i = 1; i <= 10; i++) tail.push(fin(...notch(i / 10)));
  for (let i = 9; i >= 0; i--) { const [a, v] = notch(i / 10); tail.push(fin(a, -v)); }
  for (let i = 11; i >= 0; i--) tail.push(fin(i / 12, -edge(i / 12)));
  const tailRays = [1, 2, 3, 4, 5, 6].flatMap((k) => [1, -1].map((side) => {
    const [a1, v1] = notch(k / 7);
    return path(Array.from({ length: 7 }, (_, i): P => fin(0.1 + (a1 - 0.14) * (i / 6), side * v1 * 0.9 * (i / 6))), false);
  }));
  // Pectoral fins near the head and smaller pelvic fins mid-body, swept back like fans.
  const fan = (t: number, side: 1 | -1, s: number) => {
    const at = frame(spine, t);
    const w = W * girth(t / BODY) * 0.82;
    const pt = (u: number, v: number) => at(u * W * s, side * (w + v * W * s));
    const outline: P[] = [];
    const rim = (q: number): [number, number] => [-0.15 + 1.45 * q, Math.sin(Math.PI * q ** 0.75) * 1.25 + 0.12 * q];
    for (let i = 0; i <= 16; i++) outline.push(pt(...rim(i / 16)));
    outline.push(pt(0.75, 0));
    const rays = [0.2, 0.4, 0.6, 0.8].map((q) => { const [u, v] = rim(q); return path([pt(0.25, 0.05), pt(u, v * 0.9)], false); });
    return { outline: path(outline), rays };
  };
  const fins = [fan(0.19, 1, 1), fan(0.19, -1, 1), fan(0.5, 1, 0.55), fan(0.5, -1, 0.55)];
  const eyes = [1, -1].map((side) => frame(spine, 0.065)(0, side * W * girth(0.08) * 0.62));
  return { body: path([...body, ...back]), tail: path(tail), tailRays, fins, eyes };
}

export function Koi({ spine, W, seed = 3, shadow = [5, 7] }: { spine: Spine; W: number; seed?: number; shadow?: P }) {
  const id = useSvgId();
  const k = koiShapes(spine, W);
  const r = rand(seed);
  const discs = kohaku.flatMap(([t, v, s]) =>
    Array.from({ length: 5 }, () => {
      const [x, y] = frame(spine, t + (r() - 0.5) * 0.13)(0, (v + (r() - 0.5) * 0.8) * W);
      return { x, y, r: s * W * (0.55 + r() * 0.3) };
    }),
  );
  const silhouette = (fill: string) => (
    <g fill={fill}>
      <path d={k.tail} />
      {k.fins.map((fn, i) => <path key={i} d={fn.outline} />)}
      <path d={k.body} />
    </g>
  );
  return (
    <g>
      <clipPath id={id}><path d={k.body} /></clipPath>
      {/* The shadow is the koi's own plate, printed in Sumi a few units off on the tiles. */}
      <g transform={`translate(${shadow[0]} ${shadow[1]})`} opacity={0.42}>{silhouette(c.sumi)}</g>
      <g fill={c.washi} opacity={0.9}>
        <path d={k.tail} />
        {k.fins.map((fn, i) => <path key={i} d={fn.outline} />)}
      </g>
      <g fill="none" stroke={c.ai} strokeOpacity={0.4} strokeWidth={W * 0.07} strokeLinecap="round">
        {k.tailRays.map((d, i) => <path key={i} d={d} />)}
        {k.fins.flatMap((fn) => fn.rays).map((d, i) => <path key={`f${i}`} d={d} />)}
      </g>
      <path d={k.body} fill={c.washi} />
      <g clipPath={`url(#${id})`} fill={c.hinomaru}>
        {discs.map((d, i) => <circle key={i} cx={f(d.x)} cy={f(d.y)} r={f(d.r)} />)}
      </g>
      {k.eyes.map(([x, y], i) => <circle key={i} cx={f(x)} cy={f(y)} r={f(W * 0.12)} fill={c.sumi} />)}
    </g>
  );
}

// A spine that swims round a centre: from angle `head` back through `sweep` degrees at radius r.
export const orbit = (cx: number, cy: number, r: number, head: number, sweep: number): Spine => (t) => {
  const a = ((head - sweep * t) * Math.PI) / 180;
  const rr = r * (1 + 0.06 * Math.sin(Math.PI * t * 2));
  return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
};
// A straight spine for a single fish, nose at (x, y), swimming at `angle` degrees, `length` long, with a slight S.
export const swim = (x: number, y: number, angle: number, length: number, bend = 0.08): Spine => (t) => {
  const a = (angle * Math.PI) / 180;
  const along = -t * length;
  const across = Math.sin(Math.PI * t * 1.4) * bend * length;
  return [x + along * Math.cos(a) - across * Math.sin(a), y + along * Math.sin(a) + across * Math.cos(a)];
};

// ----- Momiji 紅葉 -----

// A seven-lobed maple leaf, tip up, serrated, on a short stem; `size` is the tip's distance from the centre.
const lobes: [number, number][] = [[0, 1], [42, 0.86], [-42, 0.86], [84, 0.66], [-84, 0.66], [124, 0.38], [-124, 0.38]];
function leafPath(size: number) {
  const pts: P[] = [];
  for (let deg = -150; deg <= 150; deg += 1.5) {
    const [a, len] = lobes.reduce((best, l) => (Math.abs(deg - l[0]) < Math.abs(deg - best[0]) ? l : best));
    const x = Math.min(1, Math.abs(deg - a) / 21);
    const tooth = x < 0.86 ? 0.05 * Math.abs(((deg * 0.55) % 2) - 1) : 0;
    const r = size * (0.34 + (len - 0.34) * (1 - x) ** 0.7) * (1 - tooth);
    const rad = ((deg - 90) * Math.PI) / 180;
    pts.push([r * Math.cos(rad), r * Math.sin(rad)]);
  }
  pts.push([0, size * 0.1]);
  return path(pts);
}

export function Momiji({ x, y, size, rotate = 0, fill = c.hinomaru }: { x: number; y: number; size: number; rotate?: number; fill?: string }) {
  const veins = lobes.map(([a, len]) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return `M0 0L${f(size * len * 0.82 * Math.cos(rad))} ${f(size * len * 0.82 * Math.sin(rad))}`;
  }).join("");
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d={`M0 ${f(size * 0.05)}Q${f(size * 0.06)} ${f(size * 0.4)} ${f(-size * 0.04)} ${f(size * 0.62)}`} fill="none" stroke={fill} strokeWidth={size * 0.07} strokeLinecap="round" />
      <path d={leafPath(size)} fill={fill} />
      <path d={veins} fill="none" stroke={c.sumi} strokeOpacity={0.3} strokeWidth={size * 0.04} strokeLinecap="round" />
    </g>
  );
}

// ----- Stones, ripples, pool tiles -----

// A river stone in Washi, speckled with Ai the way riso ink catches on paper, shaded on its lower right.
export function Stone({ cx, cy, rx, ry, rotate = 0, seed = 7 }: { cx: number; cy: number; rx: number; ry: number; rotate?: number; seed?: number }) {
  const id = useSvgId();
  const r = rand(seed);
  const outline: P[] = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const wob = 1 + 0.06 * Math.sin(a * 3 + seed) + 0.03 * Math.cos(a * 5);
    return [rx * wob * Math.cos(a), ry * wob * Math.sin(a)];
  });
  const specks = Array.from({ length: Math.round(rx * ry * 0.5) }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const x = rx * d * Math.cos(a);
    const y = ry * d * Math.sin(a);
    const shade = (x / rx + y / ry) / 2; // more ink toward the lower right
    return { x, y, s: 0.35 + r() * 0.75, o: Math.min(0.9, Math.max(0.12, 0.25 + shade * 0.7 + (r() - 0.5) * 0.3)) };
  });
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      <clipPath id={id}><path d={path(outline)} /></clipPath>
      <path d={path(outline)} fill={c.washi} />
      <g clipPath={`url(#${id})`}>
        <ellipse cx={rx * 0.5} cy={ry * 0.6} rx={rx * 0.85} ry={ry * 0.7} fill={c.ai} opacity={0.16} />
        {specks.map((s, i) => <circle key={i} cx={f(s.x)} cy={f(s.y)} r={f(s.s)} fill={c.ai} opacity={f(s.o)} />)}
      </g>
    </g>
  );
}

// 波紋: rings spreading from where a drop landed, fading as they go.
export const Ripple = ({ cx, cy, r, rings = 3, color = c.washi, k = 1.2 }: { cx: number; cy: number; r: number; rings?: number; color?: string; k?: number }) => (
  <g fill="none" stroke={color} strokeWidth={k}>
    {Array.from({ length: rings }, (_, i) => (
      <ellipse key={i} cx={cx} cy={cy} rx={(r * (i + 1)) / rings} ry={(r * 0.82 * (i + 1)) / rings} strokeOpacity={0.85 - (0.6 * i) / rings} />
    ))}
  </g>
);

// Tiles of the pool floor: Ai with Washi grout, a few tiles a shade lighter where the light catches the water.
export function PoolTiles({ id, size = 12 }: { id: string; size?: number }) {
  return (
    <pattern id={id} width={size * 3} height={size * 3} patternUnits="userSpaceOnUse">
      <rect width={size * 3} height={size * 3} fill={c.ai} />
      <rect x={size} y={0} width={size} height={size} fill={c.washi} opacity={0.07} />
      <rect x={size * 2} y={size * 2} width={size} height={size} fill={c.washi} opacity={0.05} />
      <path d={`M0 0.5H${size * 3}M0 ${size + 0.5}H${size * 3}M0 ${size * 2 + 0.5}H${size * 3}M0.5 0V${size * 3}M${size + 0.5} 0V${size * 3}M${size * 2 + 0.5} 0V${size * 3}`} stroke={c.washi} strokeOpacity={0.3} strokeWidth={1} />
    </pattern>
  );
}

// ----- Sun over waves 日の出 -----

// The red sun rising out of the sea, its lower half cut by Washi bands, over two rows of waves (青海波).
export function SunOverWaves({ className = "" }: { className?: string }) {
  const id = useSvgId();
  const wave = (y: number) => Array.from({ length: 5 }, (_, i) => `M${4 + i * 8} ${y}a4 4 0 0 1 8 0`).join("");
  return (
    <svg aria-hidden viewBox="0 0 48 44" className={className}>
      <clipPath id={id}><rect x="0" y="0" width="48" height="26" /></clipPath>
      <g clipPath={`url(#${id})`}>
        <circle cx="24" cy="20" r="15" fill={c.hinomaru} />
        <g fill={c.washi}>
          <rect x="6" y="21" width="36" height="1.6" />
          <rect x="6" y="24.2" width="36" height="1.9" />
        </g>
      </g>
      <g fill="none" stroke={c.ai} strokeWidth="2.4" strokeLinecap="round">
        <path d={wave(33)} />
        <path d={wave(40)} transform="translate(-4 0)" />
      </g>
    </svg>
  );
}

// ----- The pond: the empty state -----

// A square of tiled pool seen from above: two koi circling an empty middle where a drop has just landed, rain
// rings across the water, stones at two corners and momiji drifting in.
export function KoiPond({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 200 172" className={className}>
      <defs>
        <PoolTiles id={`${id}-tiles`} size={13} />
        <clipPath id={`${id}-pool`}><rect x="12" y="10" width="176" height="152" rx="3" /></clipPath>
        <Grain id={`${id}-grain`} grain={0.32} seed={11} />
      </defs>
      <g clipPath={`url(#${id}-pool)`}>
        <rect x="12" y="10" width="176" height="152" fill={`url(#${id}-tiles)`} />
        <path d="M30 40q6 -4 12 0t12 0M140 132q6 -4 12 0t12 0M120 30q5 -3 10 0" fill="none" stroke={c.washi} strokeOpacity={0.55} strokeWidth="1.3" strokeLinecap="round" />
        <Ripple cx={100} cy={86} r={18} rings={3} />
        <Ripple cx={54} cy={128} r={8} rings={2} k={1} />
        <Ripple cx={156} cy={52} r={7} rings={2} k={1} />
        <Koi spine={orbit(100, 86, 46, -28, 122)} W={11} seed={3} />
        <Koi spine={orbit(100, 86, 43, 152, 118)} W={10.4} seed={8} />
        <Momiji x={152} y={140} size={9} rotate={28} />
        <Stone cx={178} cy={18} rx={26} ry={19} rotate={-20} seed={4} />
        <Stone cx={20} cy={160} rx={24} ry={17} rotate={15} seed={9} />
        <rect x="12" y="10" width="176" height="152" filter={`url(#${id}-grain)`} style={{ mixBlendMode: "multiply" }} />
      </g>
      <rect x="12" y="10" width="176" height="152" rx="3" fill="none" stroke={c.sumi} strokeWidth="3" />
      <Momiji x={16} y={18} size={15} rotate={-20} />
      <Momiji x={33} y={10} size={10} rotate={30} />
      <Momiji x={186} y={150} size={13} rotate={160} />
    </svg>
  );
}
