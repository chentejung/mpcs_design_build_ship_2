"use client";
// Shōwa's drawing kit after Fuji Sunrise on the Japanese Retro board (picture 04): a Hinomaru sun, Fuji in Ai under
// a Washi snowcap, its name in katakana and in heavy Latin capitals (FUJI). The landscape round it is cut as the
// ukiyo-e-style print in references/showa-brushwork.jpg has it, in woodblock inks on old paper (woodblock.tsx): a
// sky wiped down from Kinari, a sun scratched and mottled where the block wore, Fuji wiped from deep Ai at the
// summit to pale at its foot with its snow running down the gullies in long fingers, Kinari cloud bands (霞) with
// Kogecha undersides crossing it, ranges of blue hills, wooded islands, a lake ruled in Ai, a pine (松) reaching in,
// and Sumi rocks and grass closing the foreground. Here the print says エイガ ("movie") on a title slip (短冊) and
// EIGAKAN in its margin, appears on this system's page, shrinks to the brand mark and the All pictogram, and
// widens into the sign-off when Shōwa is used for a final-site page.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { Bokashi, band, line, needles, Paper, rng, scratches, stroke, useSvgId, Woodblock, type Pt } from "./woodblock";

const c = colors(showa.board);
const display = { fontFamily: "var(--ds-display-font)" };
const f = (n: number) => n.toFixed(1);
export const paperInks = { washi: c.washi, kinari: c.kinari, kogecha: c.kogecha };

// Fuji standing on `base` with its notched summit at (x, top); `w` is the half-width of the base. The snow comes a
// quarter of the way down and runs on in `fingers` long points down the gullies, shaded in Ai on the side away from
// the sun; Sumi key lines carry the gullies on below the snow; `k` scales the strokes for small sizes.
export function Fuji({ x, top, base, w, k = 1, seed = 7, fingers = 13 }: { x: number; top: number; base: number; w: number; k?: number; seed?: number; fingers?: number }) {
  const id = useSvgId();
  const h = base - top;
  const rand = rng(seed);
  const P = (dx: number, dy: number): Pt => [x + dx * w, top + dy * h];
  const p = (dx: number, dy: number) => P(dx, dy).map(f).join(" ");
  // The flank's half-width at a depth (0 at the summit, 1 at the base).
  const edge = (dy: number) => 0.13 + 0.87 * Math.pow(Math.max(0, dy - 0.03) / 0.97, 1.5);
  const slope = `M${p(-1, 1)}C${p(-0.6, 0.86)} ${p(-0.32, 0.5)} ${p(-0.13, 0.03)}L${p(-0.07, 0.022)}L${p(-0.03, 0.006)}L${p(0.02, 0.02)}L${p(0.07, 0.002)}L${p(0.13, 0.02)}C${p(0.32, 0.5)} ${p(0.6, 0.86)} ${p(1, 1)}Z`;
  // The cap's foot: notches high in the gullies, fingers reaching down the ridges between them, each finger's
  // edges a little ragged.
  const rim: string[] = [];
  const tips: [number, number][] = [];
  for (let i = 0; i <= fingers * 2; i++) {
    const u = 1 - i / fingers;
    const tip = i % 2 === 1;
    const dy = tip ? 0.34 + Math.pow(rand(), 1.3) * 0.4 - Math.abs(u) * 0.06 : 0.17 + rand() * 0.1;
    if (i > 0) {
      const [pu, pdy] = rim.length ? (rim[rim.length - 1].split(",").map(Number) as [number, number]) : [u, dy];
      const mu = (pu + u) / 2 + (rand() - 0.5) * 0.02;
      const mdy = (pdy + dy) / 2 + (rand() - 0.5) * 0.03;
      rim.push(`${mu},${mdy}`);
    }
    rim.push(`${u},${dy}`);
    if (tip) tips.push([u, dy]);
  }
  const rimPath = rim.map((s) => { const [u, dy] = s.split(",").map(Number); return p(u * edge(dy), dy); }).join("L");
  const cap = `M${p(-1.2, -0.1)}L${p(1.2, -0.1)}L${p(1.2, 0.24)}L${rimPath}L${p(-1.2, 0.24)}Z`;
  // Ai gullies drawn into the snow from near the summit, heavier on the shaded right.
  let gullies = "";
  for (let i = 0; i < fingers; i++) {
    const u = 1 - (2 * i + 1.6 + rand() * 0.6) / (fingers * 2);
    const dy = 0.24 + rand() * 0.06;
    gullies += line(P(u * edge(0.07) * 0.7, 0.07 + rand() * 0.05), P(u * edge(dy) * 0.98, dy), (0.006 + (u > 0 ? 0.008 : 0.003)) * h * k * 2, 0.1, (rand() - 0.5) * 0.04);
  }
  // Snow carried on below the fingers in dry streaks, and Sumi key lines down the ridges below them.
  let streaks = "";
  let keys = "";
  for (const [u, dy] of tips) {
    const y1 = dy + 0.05 + rand() * 0.14;
    if (rand() < 0.7) streaks += line(P(u * edge(dy - 0.02), dy - 0.02), P(u * edge(y1), y1), 0.009 * h * k * 2, 0.08);
    const k0 = dy + 0.02 + rand() * 0.04;
    const k1 = Math.min(0.97, k0 + 0.08 + rand() * 0.2);
    const uk = u + (rand() - 0.5) * 0.05;
    keys += line(P(uk * edge(k0), k0), P(uk * edge(k1), k1), 0.007 * h * k * 2, 0.1, (rand() - 0.5) * 0.05);
  }
  // Flecks low on the flanks, where the dry brush skipped.
  for (let i = 0; i < fingers; i++) {
    const u = rand() * 1.8 - 0.9;
    const y0 = 0.6 + rand() * 0.3;
    streaks += line(P(u * edge(y0), y0), P(u * edge(y0 + 0.05), y0 + 0.05), 0.008 * h * k * 2, 0.5);
  }
  return (
    <g>
      <defs>
        <Bokashi id={`${id}-ai`} color={c.ai} from={1} mid={[0.45, 0.92]} to={0.5} />
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.5" stopColor={c.sumi} stopOpacity="0" />
          <stop offset="0.62" stopColor={c.sumi} stopOpacity="0.28" />
          <stop offset="1" stopColor={c.sumi} stopOpacity="0.1" />
        </linearGradient>
        <clipPath id={`${id}-m`}><path d={slope} /></clipPath>
      </defs>
      <path d={slope} fill={c.washi} />
      <path d={slope} fill={`url(#${id}-ai)`} />
      <g clipPath={`url(#${id}-m)`}>
        <rect x={x - w} y={top} width={w * 2} height={h} fill={`url(#${id}-shade)`} />
        <path d={keys} fill={c.sumi} fillOpacity="0.45" />
        <path d={cap} fill={c.washi} />
        <path d={streaks} fill={c.washi} />
        <path d={gullies} fill={c.ai} fillOpacity="0.55" />
      </g>
    </g>
  );
}

// A pine branch (松) reaching in from (x, y) towards `dir` (-1 left, 1 right), drawn 120 units long at `s` = 1: a
// Sumi bough with Kogecha bark, drooping twigs, and tiers of needles: each a dark pad under a fan of Ai needles.
export function Pine({ x, y, s = 1, dir = -1, seed = 11 }: { x: number; y: number; s?: number; dir?: -1 | 1; seed?: number }) {
  const rand = rng(seed);
  const tufts: [number, number, number, number, number][] = [
    [120, -16, 22, -200, 20], [104, -36, 17, -190, 10], [92, 0, 20, -195, 25], [74, 24, 19, -200, 30],
    [70, -18, 17, -195, 15], [48, 10, 17, -200, 25], [32, -18, 15, -190, 0], [14, 6, 13, -200, 30], [86, -48, 13, -190, 10],
  ];
  let pads = "";
  let dark = "";
  let blue = "";
  for (const [tx, ty, r, a0, a1] of tufts) {
    pads += `M${f(tx - r * 0.9)} ${f(ty + 1)}Q${f(tx)} ${f(ty - r * 0.4)} ${f(tx + r * 0.9)} ${f(ty + 1)}Q${f(tx)} ${f(ty + r * 0.3)} ${f(tx - r * 0.9)} ${f(ty + 1)}Z`;
    dark += needles(tx, ty + 2.5, r * 0.85, rand, a0 + 10, a1 + 25, 20, 0.1, 0.5);
    blue += needles(tx, ty, r, rand, a0, a1, 34, 0.09, 0.62);
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
      <g fill={c.sumi}>
        <path d={stroke([-6, 6], [56, 10], [120, -12], 9, 0.02)} />
        <path d={stroke([48, 8], [62, 12], [74, 24], 4.5, 0.05)} />
        <path d={stroke([70, 2], [88, -16], [104, -36], 4, 0.05)} />
        <path d={stroke([84, -10], [86, -30], [86, -48], 2.6, 0.05)} />
        <path d={stroke([86, -2], [90, 0], [92, 2], 3, 0.05)} />
        <path d={stroke([20, 6], [28, -6], [32, -18], 3.4, 0.05)} />
      </g>
      <path d={stroke([4, 4], [56, 8], [108, -8], 2.4, 0.1)} fill={c.kogecha} />
      <path d={pads} fill={c.sumi} />
      <path d={dark} fill={c.sumi} />
      <path d={blue} fill={c.ai} />
    </g>
  );
}

// The lake between `y0` and `y1`: a wash of Ai deepening towards the shore, ruled with rows of Ai drags, Washi
// glints between them, and the sun's reflection broken into Kinari dashes below `sun` (its x).
export function Lake({ x0, x1, y0, y1, w = 1.6, sun, seed = 5 }: { x0: number; x1: number; y0: number; y1: number; w?: number; sun?: number; seed?: number }) {
  const id = useSvgId();
  const rand = rng(seed);
  let d = "";
  let glint = "";
  const rows = Math.round((y1 - y0) / (w * 2.4));
  for (let r = 0; r < rows; r++) {
    const y = y0 + ((y1 - y0) * (r + 0.5)) / rows;
    for (let x = x0 + rand() * 20; x < x1; ) {
      const len = 12 + rand() * 46;
      d += line([x, y + rand() * w], [Math.min(x + len, x1), y + rand() * w], w * (0.5 + (r / rows) * 0.9), 0.5);
      x += len + 4 + rand() * 18;
    }
    if (rand() < 0.8) {
      const gx = x0 + rand() * (x1 - x0);
      glint += line([gx, y - w * 0.8], [gx + 10 + rand() * 30, y - w * 0.8], w * 0.6, 0.5);
    }
  }
  let sheen = "";
  if (sun !== undefined)
    for (let r = 0; r < rows; r++) {
      const y = y0 + ((y1 - y0) * (r + 0.2)) / rows;
      const half = 6 + rand() * 10 + r * 1.5;
      sheen += line([sun - half + (rand() - 0.5) * 6, y], [sun + half + (rand() - 0.5) * 6, y], w * 0.9, 0.5);
    }
  return (
    <g>
      <defs><Bokashi id={`${id}-l`} color={c.ai} from={0.12} to={0.42} /></defs>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={c.washi} />
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={`url(#${id}-l)`} />
      <path d={d} fill={c.ai} />
      <path d={sheen} fill={c.kinari} />
      <path d={glint} fill={c.washi} />
    </g>
  );
}

// A ridge of distant hills from x0 to x1 standing up to `h` above `y`, in rounded humps.
function ridge(x0: number, x1: number, y: number, h: number, rand: () => number, humps = 4) {
  let d = `M${f(x0)} ${f(y)}`;
  const step = (x1 - x0) / humps;
  for (let i = 0; i < humps; i++) {
    const a = x0 + i * step;
    d += `Q${f(a + step * (0.3 + rand() * 0.4))} ${f(y - h * (0.6 + rand() * 0.8))} ${f(a + step)} ${f(y - h * rand() * 0.4)}`;
  }
  return `${d}L${f(x1)} ${f(y + 1)}L${f(x0)} ${f(y + 1)}Z`;
}

// A range of hills: Ai wiped pale towards its foot, where the mist lies, with a Sumi key line along its crest.
export function Hills({ x0, x1, y, h, humps = 4, seed = 3, depth = 1 }: { x0: number; x1: number; y: number; h: number; humps?: number; seed?: number; depth?: number }) {
  const id = useSvgId();
  const d = ridge(x0, x1, y, h, rng(seed), humps);
  return (
    <g>
      <defs><Bokashi id={`${id}-h`} color={c.ai} from={0.95 * depth} mid={[0.5, 0.7 * depth]} to={0.3 * depth} /></defs>
      <path d={d} fill={`url(#${id}-h)`} />
    </g>
  );
}

// An island of trees: a Sumi lump whose top is all small crowns, the nearer crowns picked out in Ai.
export function Isle({ x0, x1, y, h, seed = 6 }: { x0: number; x1: number; y: number; h: number; seed?: number }) {
  const rand = rng(seed);
  let d = `M${f(x0)} ${f(y)}`;
  let crowns = "";
  for (let x = x0; x < x1; ) {
    const step = 2.5 + rand() * 4;
    const env = Math.sin((Math.PI * (x - x0)) / (x1 - x0));
    const top = y - h * env - 1.5 - rand() * 2.5;
    d += `Q${f(x + step / 2)} ${f(top - 1.5)} ${f(x + step)} ${f(y - h * env * 0.9)}`;
    if (rand() < 0.45 && env > 0.3) crowns += line([x + step * 0.2, top + 1.2], [x + step * 0.9, top + 1.6], Math.min(2.2, h * 0.25), 0.5);
    x += step;
  }
  return (
    <g>
      <path d={`${d}L${f(x1)} ${f(y)}Z`} fill={c.sumi} />
      <path d={crowns} fill={c.ai} />
      <path d={line([x0 + 2, y + 0.6], [x1 - 2, y + 0.6], 1.4, 0.5)} fill={c.kogecha} />
    </g>
  );
}

// Foreground rocks from x0 to x1 rising to `h` above `y`: boulders of every size, a Sumi row behind a Kogecha one,
// each lit along its shoulder and shadowed and cracked in Sumi on its far side, as the scene's rocks are cut, with
// grass blades in Ai from `gx`.
export function Shore({ x0, x1, y, h, bottom, grass = 0, gx, seed = 9 }: { x0: number; x1: number; y: number; h: number; bottom: number; grass?: number; gx?: number; seed?: number }) {
  const rand = rng(seed);
  // One row of boulders: each a slab with a rounded shoulder, leaning a little.
  const row = (lift: number, size: number) => {
    let outline = "";
    let light = "";
    let shade = "";
    for (let x = x0; x < x1; ) {
      const step = (18 + rand() * 46) * size;
      const y1 = y - lift - h * (0.35 + rand() * 0.65) * size;
      const b = bottom + 1;
      const tall = b - y1;
      const pk = x + step * (0.35 + rand() * 0.25);
      const xr = x + step * 1.02;
      outline += `M${f(x)} ${f(b)}L${f(x + step * 0.04)} ${f(y1 + tall * 0.4)}Q${f(x + step * 0.1)} ${f(y1)} ${f(pk)} ${f(y1)}Q${f(xr)} ${f(y1 + 0.5)} ${f(xr)} ${f(y1 + tall * 0.55)}L${f(xr + step * 0.02)} ${f(b)}Z`;
      light += stroke([x + step * 0.06, y1 + tall * 0.34], [x + step * 0.1, y1 + 0.4], [pk + step * 0.12, y1 + 0.5], Math.min(2.4, tall * 0.18), 0.3);
      shade += `M${f(pk + step * 0.22)} ${f(y1 + 0.8)}Q${f(xr)} ${f(y1 + 0.8)} ${f(xr)} ${f(y1 + tall * 0.55)}L${f(xr + step * 0.02)} ${f(b)}L${f(pk + step * 0.1)} ${f(b)}Q${f(pk + step * 0.3)} ${f(y1 + tall * 0.45)} ${f(pk + step * 0.22)} ${f(y1 + 0.8)}Z`;
      for (let i = 0; i < 2; i++) {
        const cx = x + step * (0.18 + rand() * 0.4);
        shade += line([cx, y1 + tall * (0.25 + rand() * 0.25)], [cx + step * (0.04 + rand() * 0.12), b], 0.6 + rand() * 1, 0.15);
      }
      x += step;
    }
    return { outline, light, shade };
  };
  const back = row(h * 0.45, 1.3);
  const front = row(0, 0.85);
  let blades = "";
  const g0 = gx ?? x0;
  for (let i = 0; i < grass; i++) {
    const bx = g0 + rand() * 46;
    const len = h * (1 + rand() * 1.8);
    const lean = (rand() - 0.35) * len * 0.9;
    blades += stroke([bx, bottom], [bx + lean * 0.1, bottom - len * 0.7], [bx + lean, bottom - len], 1.6 + rand() * 1.4, 0.04);
  }
  return (
    <g>
      <path d={back.outline} fill={c.sumi} />
      <path d={back.light} fill={c.kogecha} />
      <path d={front.outline} fill={c.kogecha} />
      <path d={front.light} fill={c.kinari} />
      <path d={front.shade} fill={c.sumi} />
      <path d={blades} fill={c.ai} />
    </g>
  );
}

// Cloud bands, each [x, y, length, height]: Kinari (or `color`) with a Kogecha underside, as the scene's are cut.
export function Mist({ bands, seed = 4, color = c.kinari, under = c.kogecha }: { bands: [number, number, number, number][]; seed?: number; color?: string; under?: string | null }) {
  const rand = rng(seed);
  const shapes = bands.map(([x, y, l, h]) => band(x, y, l, h, rand)).join("");
  const lines = under ? bands.map(([x, y, l, h]) => line([x + l * 0.1, y + h * 0.36], [x + l * (0.75 + rand() * 0.2), y + h * 0.42], Math.max(0.8, h * 0.22), 0.4, (rand() - 0.5) * 0.02)).join("") : "";
  return (
    <g>
      <path d={shapes} fill={color} />
      {under && <path d={lines} fill={under} fillOpacity="0.4" />}
    </g>
  );
}

// The sun: a Hinomaru disc, nicked with Washi scratches and specks where the block wore.
export function Sun({ cx, cy, r, seed = 13 }: { cx: number; cy: number; r: number; seed?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={c.hinomaru} />
      <path d={scratches(cx, cy, r * 0.92, Math.round(r * 0.9), rng(seed), -10, r * 0.012)} fill={c.washi} fillOpacity="0.85" />
    </g>
  );
}

// A small red seal (落款) with 映 knocked out in Washi.
const Hanko = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx={s * 0.08} fill={c.hinomaru} />
    <rect x={x + s * 0.1} y={y + s * 0.1} width={s * 0.8} height={s * 0.8} fill="none" stroke={c.washi} strokeWidth={s * 0.05} />
    <text x={x + s / 2} y={y + s / 2} dy="0.36em" textAnchor="middle" fontSize={s * 0.6} fill={c.washi} style={display}>映</text>
  </g>
);

// The title slip (短冊) pasted on a print's corner: エイガ down a Washi strip keylined in Sumi.
const Slip = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g>
    <rect x={x} y={y} width={s} height={s * 3.5} fill={c.washi} stroke={c.sumi} strokeWidth={s * 0.06} />
    {[...`エイガ`].map((ch, i) => (
      <text key={ch} x={x + s / 2} y={y + s * (0.62 + i * 1.08)} dy="0.36em" textAnchor="middle" fontSize={s * 0.72} fill={c.sumi} style={display}>{ch}</text>
    ))}
  </g>
);

// The sky over a picture: Kinari wiped down from its top edge, fading out above the horizon.
const Sky = ({ id, x, y, width, height }: { id: string; x: number; y: number; width: number; height: number }) => (
  <>
    <defs><Bokashi id={id} color={c.kinari} from={0.85} mid={[0.55, 0.35]} to={0.1} /></defs>
    <rect x={x} y={y} width={width} height={height} fill={`url(#${id})`} />
  </>
);

// The Shōwa hero: a print on its own sheet, tall beside the heading, wide (with Nouvelle Vague's red band carrying
// 上映中) above it on phones.
export function FujiPoster({ wide = false, className = "" }: { wide?: boolean; className?: string }) {
  const id = useSvgId();
  if (wide)
    return (
      <svg aria-hidden viewBox="0 0 360 150" className={className}>
        <defs>
          <Woodblock id={id} rough={1.2} specks={0.5} grain={0.45} mottle={0.5} />
          <Woodblock id={`${id}-t`} rough={0.9} specks={0.35} grain={0.25} mottle={0.3} seed={5} />
          <clipPath id={`${id}-p`}><rect x="56" y="6" width="298" height="138" /></clipPath>
        </defs>
        <Paper x={0} y={0} width={360} height={150} {...paperInks} />
        <g filter={`url(#${id})`}>
          <g clipPath={`url(#${id}-p)`}>
            <Sky id={`${id}-s`} x={56} y={6} width={298} height={118} />
            <Mist bands={[[250, 50, 100, 6], [290, 62, 70, 4]]} under={null} />
            <Sun cx={190} cy={62} r={46} />
            <Mist bands={[[100, 90, 86, 5], [118, 98, 50, 3]]} color={c.hinomaru} under={null} seed={2} />
            <Fuji x={232} top={56} base={124} w={168} k={0.8} fingers={11} />
            <Mist bands={[[150, 102, 110, 7], [254, 96, 90, 6], [64, 110, 92, 5], [196, 112, 120, 5]]} />
            <Hills x0={56} x1={214} y={124} h={10} humps={3} depth={0.8} />
            <Isle x0={150} x1={208} y={124} h={6} />
            <Lake x0={56} x1={354} y0={124} y1={144} w={1.2} sun={190} />
            <Shore x0={280} x1={360} y={140} h={12} bottom={144} grass={6} gx={300} />
            <Pine x={358} y={20} s={0.62} />
          </g>
          <rect x="6" y="6" width="50" height="138" fill={c.hinomaru} />
        </g>
        <g filter={`url(#${id}-t)`}>
          {[...`上映中`].map((ch, i) => (
            <text key={ch} x="31" y={44 + i * 38} textAnchor="middle" fontSize="30" fill={c.washi} style={display}>{ch}</text>
          ))}
          <Slip x={66} y={14} s={18} />
          <Hanko x={324} y={112} s={22} />
        </g>
      </svg>
    );
  return (
    <svg aria-hidden viewBox="0 0 300 420" className={className}>
      <defs>
        <Woodblock id={id} rough={1.6} specks={0.5} grain={0.45} mottle={0.5} />
        <Woodblock id={`${id}-t`} rough={1.2} specks={0.4} grain={0.3} mottle={0.35} seed={5} />
        <clipPath id={`${id}-p`}><rect x="14" y="14" width="272" height="300" /></clipPath>
      </defs>
      <Paper x={0} y={0} width={300} height={420} {...paperInks} />
      <g filter={`url(#${id})`}>
        <g clipPath={`url(#${id}-p)`}>
          <Sky id={`${id}-s`} x={14} y={14} width={272} height={250} />
          <Mist bands={[[196, 120, 100, 7], [224, 134, 70, 4]]} under={null} />
          <Sun cx={120} cy={116} r={80} />
          <Mist bands={[[0, 176, 104, 7], [18, 188, 70, 4], [60, 166, 60, 3]]} color={c.hinomaru} under={null} seed={2} />
          <Mist bands={[[-6, 196, 120, 9], [10, 208, 70, 5]]} />
          <Fuji x={176} top={136} base={262} w={196} fingers={15} />
          <Mist bands={[[-10, 232, 150, 10], [176, 222, 140, 10], [90, 244, 130, 7], [214, 240, 90, 5]]} />
          <Hills x0={14} x1={190} y={262} h={16} humps={3} seed={4} depth={0.55} />
          <Hills x0={150} x1={290} y={262} h={10} humps={3} seed={8} depth={0.75} />
          <Isle x0={26} x1={124} y={262} h={10} />
          <Isle x0={196} x1={238} y={262} h={6} seed={8} />
          <Lake x0={14} x1={286} y0={262} y1={300} w={1.7} sun={120} />
          <Shore x0={10} x1={290} y={306} h={18} bottom={314} grass={16} gx={14} />
          <Pine x={296} y={58} />
        </g>
      </g>
      <g filter={`url(#${id}-t)`}>
        <Slip x={26} y={26} s={26} />
        <Hanko x={248} y={276} s={26} />
        <text x="150" y="390" textAnchor="middle" fontSize="54" textLength="272" lengthAdjust="spacingAndGlyphs" fill={c.ai} style={display}>EIGAKAN</text>
      </g>
    </svg>
  );
}

// Fuji and its sun in 24 units, for the All pictogram and the section ornament: snow fingers on Ai wiped pale towards
// its foot, a band of cloud across it.
export function FujiGlyph() {
  const id = useSvgId();
  return (
    <g>
      <defs><Bokashi id={id} color={c.ai} from={1} to={0.6} /></defs>
      <circle cx="12" cy="9.4" r="5.6" fill={c.hinomaru} />
      <path d="M2.8 19C6 17.6 8.2 14.4 9.7 11.2H14.3C15.8 14.4 18 17.6 21.2 19Z" fill={c.washi} />
      <path d="M2.8 19C6 17.6 8.2 14.4 9.7 11.2H14.3C15.8 14.4 18 17.6 21.2 19Z" fill={`url(#${id})`} />
      <path d="M9.7 11.2H14.3L15.3 13.1L14.6 12.8L14.9 15.4L13.8 13.4L13.3 16.2L12.4 13.6L11.5 15.9L10.9 13.4L9.9 15.1L9.9 13.2L8.7 13.8Z" fill={c.washi} />
      <path d={band(3.5, 17.6, 11, 1.8, rng(3))} fill={c.kinari} />
    </g>
  );
}

export const SunOrnament = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden viewBox="2 2 20 20" className={className}><FujiGlyph /></svg>
);

// The brand mark: the print in 40 units, on its own paper.
export function FujiMark({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <defs>
        <Woodblock id={id} rough={0.5} specks={0.3} grain={0.35} mottle={0.25} />
        <clipPath id={`${id}-p`}><rect x="3.5" y="3.5" width="33" height="33" rx="2.5" /></clipPath>
      </defs>
      <rect width="40" height="40" rx="6" fill={c.washi} />
      <g filter={`url(#${id})`}>
        <g clipPath={`url(#${id}-p)`}>
          <rect x="3.5" y="3.5" width="33" height="33" fill={c.kinari} />
          <circle cx="20" cy="16.5" r="9.5" fill={c.hinomaru} />
          <Fuji x={20} top={19} base={37} w={18} k={0.6} fingers={7} />
          <path d={band(5, 31.5, 22, 2.6, rng(5))} fill={c.kinari} />
        </g>
      </g>
    </svg>
  );
}

// The sign-off: the sun going down behind Fuji across a lake, under bands of cloud, between two pines on rocky
// shores; shown whole at every width.
export function SignOff({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 1200 130" preserveAspectRatio="xMidYMax meet" className={className}>
      <defs><Woodblock id={id} rough={2} specks={0.5} grain={0.45} mottle={0.5} scale={1.4} /></defs>
      <g filter={`url(#${id})`}>
        <Sun cx={600} cy={80} r={54} />
        <Mist bands={[[470, 64, 120, 6], [640, 52, 140, 7], [500, 78, 70, 4]]} color={c.hinomaru} under={null} seed={2} />
        <Fuji x={600} top={62} base={124} w={230} k={0.8} fingers={13} />
        <Mist bands={[[380, 104, 200, 7], [600, 96, 220, 8], [300, 114, 160, 5], [700, 112, 200, 5]]} />
        <Hills x0={200} x1={470} y={124} h={16} seed={3} depth={0.75} />
        <Hills x0={740} x1={1010} y={124} h={14} seed={4} depth={0.75} />
        <Isle x0={420} x1={520} y={124} h={8} />
        <Isle x0={700} x1={760} y={124} h={5} seed={8} />
        <Lake x0={180} x1={1020} y0={124} y1={130} w={1.4} />
        <Shore x0={-10} x1={250} y={126} h={13} bottom={130} grass={12} gx={150} />
        <Shore x0={950} x1={1210} y={126} h={12} bottom={130} grass={12} gx={1000} seed={13} />
        <path d={stroke([96, 130], [104, 102], [116, 74], 13, 0.02)} fill={c.sumi} />
        <path d={stroke([1104, 130], [1096, 102], [1086, 76], 14, 0.02)} fill={c.sumi} />
        <Pine x={120} y={68} s={1.1} dir={1} seed={12} />
        <Pine x={1080} y={70} s={1.2} />
      </g>
    </svg>
  );
}
