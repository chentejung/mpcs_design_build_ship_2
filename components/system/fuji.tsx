"use client";
// Shōwa's drawing kit after Fuji Sunrise on the Japanese Retro board (picture 04), a screenprint in three inks on
// cream: a Hinomaru sun, Fuji in Ai under a Washi snowcap, its name in katakana and in heavy Latin capitals (FUJI).
// The landscape round it is drawn in the brushwork of references/showa-brushwork.jpg: the snow runs down Fuji's
// gullies in dry-brush streaks, bands of Kinari mist (霞) cross the mountain's foot and the sun's, a pine branch
// (松) reaches in over the sun, the lake is dragged in Ai, and Sumi rocks and grass close the foreground. Here the
// poster says エイガ ("movie") in a title slip (短冊) and EIGAKAN below, leads /movies and this system's page, shrinks
// to the brand mark and the All pictogram, and widens into the sign-off at the foot of every Eigakan page.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { band, line, needles, rng, stroke, useSvgId, Wear, type Pt } from "./screenprint";

const c = colors(showa.board);
const display = { fontFamily: "var(--ds-display-font)" };
const f = (n: number) => n.toFixed(1);

// Fuji standing on `base` with its notched summit at (x, top); `w` is the half-width of the base. The snow comes a
// quarter of the way down and runs on in streaks down the gullies, with Ai streaks reaching up into it; `k` scales
// the strokes for small sizes.
function Fuji({ x, top, base, w, k = 1, seed = 7, streaks = 26 }: { x: number; top: number; base: number; w: number; k?: number; seed?: number; streaks?: number }) {
  const h = base - top;
  const rand = rng(seed);
  const P = (dx: number, dy: number): Pt => [x + dx * w, top + dy * h];
  const p = (dx: number, dy: number) => P(dx, dy).map(f).join(" ");
  // The flank's half-width at a depth (0 at the summit, 1 at the base).
  const edge = (dy: number) => 0.14 + 0.86 * Math.pow(Math.max(0, dy - 0.03) / 0.97, 1.45);
  const slope = `M${p(-1, 1)}C${p(-0.62, 0.86)} ${p(-0.34, 0.5)} ${p(-0.14, 0.03)}L${p(-0.06, 0.06)}L${p(0, 0)}L${p(0.07, 0.05)}L${p(0.14, 0.02)}C${p(0.34, 0.5)} ${p(0.62, 0.86)} ${p(1, 1)}Z`;
  // The cap, its lower edge ragged where the brush lifted off.
  const rim: string[] = [];
  for (let i = 0; i <= 16; i++) {
    const u = 1 - (2 * i) / 16;
    const dy = 0.24 + rand() * 0.08 + (i % 2) * 0.06;
    rim.push(p(u * edge(dy) * 0.99, dy));
  }
  const cap = `M${p(-0.14, 0.03)}L${p(-0.06, 0.06)}L${p(0, 0)}L${p(0.07, 0.05)}L${p(0.14, 0.02)}L${rim.join("L")}Z`;
  // Snow streaks down the gullies, each laid from the snowline and lifted off below it.
  let snow = "";
  for (let i = 0; i < streaks; i++) {
    const u = -0.96 + (1.92 * (i + rand())) / streaks;
    const y0 = 0.16 + rand() * 0.08;
    const y1 = y0 + 0.2 + Math.pow(rand(), 1.3) * (0.4 - Math.abs(u) * 0.14);
    snow += line(P(u * edge(y0), y0), P(u * edge(y1) * 0.99, y1), (0.008 + rand() * 0.014) * h * k * 2, 0.06, (rand() - 0.5) * 0.06);
  }
  // Short flecks lower down, where a dry brush skipped over the slope.
  for (let i = 0; i < streaks / 2; i++) {
    const u = rand() * 1.8 - 0.9;
    const y0 = 0.55 + rand() * 0.3;
    snow += line(P(u * edge(y0), y0), P(u * edge(y0 + 0.07), y0 + 0.07), 0.012 * h * k * 2, 0.5);
  }
  // Ai streaks reaching up into the snow from its edge.
  let shade = "";
  for (let i = 0; i < streaks / 2; i++) {
    const u = -0.8 + (1.6 * (i + rand())) / (streaks / 2);
    const y0 = 0.42 + rand() * 0.06;
    const y1 = 0.14 + rand() * 0.1;
    shade += line(P(u * edge(y0), y0), P(u * edge(y1) * 0.85, y1), 0.014 * h * k * 2, 0.04);
  }
  return (
    <g>
      <path d={slope} fill={c.ai} />
      <path d={cap} fill={c.washi} />
      <path d={snow} fill={c.washi} />
      <path d={shade} fill={c.ai} />
      <path d={stroke(P(0.24, 0.42), P(0.5, 0.72), P(0.92, 0.97), 0.05 * h * k)} fill={c.sumi} fillOpacity="0.3" />
    </g>
  );
}

// A pine branch (松) reaching in from (x, y) towards `dir` (-1 left, 1 right), drawn 120 units long at `s` = 1:
// a Sumi bough with Kogecha bark, drooping twigs, and clusters of Ai needles.
export function Pine({ x, y, s = 1, dir = -1, seed = 11 }: { x: number; y: number; s?: number; dir?: -1 | 1; seed?: number }) {
  const rand = rng(seed);
  const tufts: [number, number, number, number, number][] = [
    [118, -14, 22, -200, 20], [96, -34, 18, -190, 10], [92, 2, 20, -190, 30], [70, 26, 19, -200, 30],
    [64, -12, 18, -195, 15], [40, 12, 17, -200, 25], [30, -16, 15, -190, 0], [10, 6, 14, -200, 30],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>
      <g fill={c.sumi}>
        <path d={stroke([-6, 6], [56, 10], [120, -12], 9, 0.02)} />
        <path d={stroke([48, 8], [62, 12], [72, 26], 4.5, 0.05)} />
        <path d={stroke([70, 2], [88, -16], [96, -34], 4, 0.05)} />
        <path d={stroke([86, -2], [90, 0], [92, 2], 3, 0.05)} />
        <path d={stroke([20, 6], [26, -6], [30, -16], 3.4, 0.05)} />
      </g>
      <path d={stroke([4, 4], [56, 8], [108, -8], 2.4, 0.1)} fill={c.kogecha} />
      {tufts.map(([tx, ty, r, a0, a1]) => (
        <g key={`${tx} ${ty}`}>
          <path d={needles(tx, ty + 3, r * 0.85, rand, a0 + 20, a1 + 30, 14)} fill={c.sumi} />
          <path d={needles(tx, ty, r, rand, a0, a1, 26)} fill={c.ai} />
        </g>
      ))}
    </g>
  );
}

// The lake: rows of Ai drags between `y0` and `y1`, closer and thicker towards the shore.
function Lake({ x0, x1, y0, y1, w = 1.6, seed = 5 }: { x0: number; x1: number; y0: number; y1: number; w?: number; seed?: number }) {
  const rand = rng(seed);
  let d = "";
  const rows = Math.round((y1 - y0) / (w * 2.6));
  for (let r = 0; r < rows; r++) {
    const y = y0 + ((y1 - y0) * r) / rows;
    for (let x = x0 + rand() * 20; x < x1; ) {
      const len = 14 + rand() * 46;
      d += line([x, y + rand() * w], [Math.min(x + len, x1), y + rand() * w], w * (0.6 + (r / rows) * 0.8), 0.5);
      x += len + 4 + rand() * 18;
    }
  }
  return <path d={d} fill={c.ai} />;
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

// An island of trees: a Sumi lump whose top is all small crowns.
function isle(x0: number, x1: number, y: number, h: number, rand: () => number) {
  let d = `M${f(x0)} ${f(y)}`;
  for (let x = x0; x < x1; ) {
    const step = 3 + rand() * 5;
    const env = Math.sin((Math.PI * (x - x0)) / (x1 - x0));
    d += `Q${f(x + step / 2)} ${f(y - h * env - 2 - rand() * 3)} ${f(x + step)} ${f(y - h * env * 0.9)}`;
    x += step;
  }
  return `${d}L${f(x1)} ${f(y)}Z`;
}

// Foreground rocks from x0 to x1 rising to `h` above `y`: boulders of every size, a Kogecha row behind a Sumi one,
// their faces laid in sideways strata, with grass blades in Ai from `gx`.
export function Shore({ x0, x1, y, h, bottom, grass = 0, gx, seed = 9 }: { x0: number; x1: number; y: number; h: number; bottom: number; grass?: number; gx?: number; seed?: number }) {
  const rand = rng(seed);
  // One row of boulders: each a slab with a rounded shoulder, leaning a little.
  const row = (lift: number, size: number) => {
    let top = "";
    let strata = "";
    for (let x = x0; x < x1; ) {
      const step = (20 + rand() * 50) * size;
      const y1 = y - lift - h * (0.3 + rand() * 0.7) * size;
      const lean = (rand() - 0.5) * 0.4;
      top += `L${f(x + step * 0.08)} ${f(y1 + h * 0.3)}Q${f(x + step * (0.2 + lean))} ${f(y1)} ${f(x + step * 0.55)} ${f(y1 + 1)}Q${f(x + step * 0.92)} ${f(y1 + 2)} ${f(x + step)} ${f(y - lift - h * rand() * 0.2)}`;
      for (let r = y1 + 3; r < bottom - 1; r += 2.8 + rand() * 3) {
        const sx = x + step * (0.12 + rand() * 0.35);
        strata += line([sx, r], [sx + step * (0.2 + rand() * 0.45), r + rand() * 1.4], 1 + rand() * 1.3, 0.5);
      }
      x += step;
    }
    return { outline: `M${f(x0)} ${f(bottom)}L${f(x0)} ${f(y - lift)}${top}L${f(x1)} ${f(bottom)}Z`, strata };
  };
  const back = row(h * 0.5, 1.3);
  const front = row(0, 0.8);
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
      <path d={back.outline} fill={c.kogecha} />
      <path d={back.strata} fill={c.sumi} fillOpacity="0.6" />
      <path d={front.outline} fill={c.sumi} />
      <path d={front.strata} fill={c.kogecha} />
      <path d={blades} fill={c.ai} />
    </g>
  );
}

// Bands of mist, each [x, y, length, height]; `color` defaults to Kinari.
export const Mist = ({ bands, seed = 4, color = c.kinari }: { bands: [number, number, number, number][]; seed?: number; color?: string }) => {
  const rand = rng(seed);
  return <path d={bands.map(([x, y, l, h]) => band(x, y, l, h, rand)).join("")} fill={color} />;
};

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

// The panel's ground: Washi washed with Kinari, as the old paper of the scene is.
const Ground = (props: React.SVGProps<SVGRectElement>) => (
  <>
    <rect {...props} fill={c.washi} />
    <rect {...props} fill={c.kinari} fillOpacity="0.5" />
  </>
);

// The /movies hero: tall beside the heading, wide (with Nouvelle Vague's red band carrying 上映中) above it on phones.
export function FujiPoster({ wide = false, className = "" }: { wide?: boolean; className?: string }) {
  const id = useSvgId();
  if (wide)
    return (
      <svg aria-hidden viewBox="0 0 360 150" className={className}>
        <defs>
          <Wear id={id} rough={1.4} specks={0.6} />
          <Wear id={`${id}-t`} rough={1} drag={0} />
          <clipPath id={`${id}-p`}><rect x="56" y="6" width="298" height="138" /></clipPath>
        </defs>
        <g filter={`url(#${id})`}>
          <Ground x="6" y="6" width="348" height="138" />
          <g clipPath={`url(#${id}-p)`}>
            <circle cx="196" cy="62" r="46" fill={c.hinomaru} />
            <Mist bands={[[118, 92, 70, 5], [128, 100, 46, 3], [240, 40, 90, 6]]} color={c.hinomaru} seed={2} />
            <Fuji x={230} top={58} base={122} w={160} k={0.8} streaks={22} />
            <Mist bands={[[150, 100, 110, 7], [250, 94, 80, 6], [70, 108, 90, 5], [200, 110, 120, 5]]} />
            <path d={ridge(56, 200, 124, 8, rng(3), 3)} fill={c.ai} />
            <path d={isle(150, 210, 124, 6, rng(6))} fill={c.sumi} />
            <rect x="56" y="124" width="298" height="20" fill={c.washi} />
            <Lake x0={56} x1={354} y0={126} y1={140} w={1.3} />
            <Shore x0={278} x1={360} y={140} h={12} bottom={144} grass={6} gx={300} />
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
        <Wear id={id} rough={1.8} specks={0.6} />
        <Wear id={`${id}-t`} rough={1.4} drag={0} />
        <clipPath id={`${id}-p`}><rect x="14" y="14" width="272" height="300" /></clipPath>
      </defs>
      <g filter={`url(#${id})`}>
        <Ground x="14" y="14" width="272" height="300" />
        <g clipPath={`url(#${id}-p)`}>
          <circle cx="124" cy="120" r="82" fill={c.hinomaru} />
          <Mist bands={[[0, 182, 110, 8], [30, 194, 70, 4], [200, 128, 96, 6]]} color={c.hinomaru} seed={2} />
          <Fuji x={172} top={142} base={262} w={190} />
          <Mist bands={[[-10, 236, 150, 11], [170, 230, 150, 10], [90, 248, 130, 7]]} />
          <path d={ridge(14, 286, 262, 14, rng(3), 4)} fill={c.ai} />
          <path d={isle(30, 120, 262, 9, rng(6))} fill={c.sumi} />
          <path d={isle(196, 236, 262, 5, rng(8))} fill={c.sumi} />
          <rect x="14" y="262" width="272" height="52" fill={c.washi} />
          <Mist bands={[[20, 280, 120, 6], [150, 292, 140, 7]]} />
          <Lake x0={14} x1={286} y0={264} y1={300} w={1.8} />
          <Shore x0={10} x1={290} y={308} h={11} bottom={314} grass={16} gx={14} />
          <Pine x={296} y={60} />
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

// Fuji and its sun in 24 units, for the All pictogram and the section ornament: a streaked snowcap and a band of
// mist across its foot.
export const FujiGlyph = () => (
  <g>
    <circle cx="12" cy="9.6" r="5.4" fill={c.hinomaru} />
    <path d="M3.6 18.6C6 17.4 8 14.6 9.6 11.4H14.4C16 14.6 18 17.4 20.4 18.6Z" fill={c.ai} />
    <path d="M9.6 11.4H14.4L15.5 13.6L14.8 13.2L14.6 15.2L13.7 13.6L12.9 15.8L12.2 13.8L11.3 15.6L10.6 13.6L9.8 14.9L9.4 13.4L8.5 13.9Z" fill={c.washi} />
    <path d={band(5, 17.4, 9, 1.6, rng(3))} fill={c.kinari} />
  </g>
);

export const SunOrnament = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden viewBox="2 2 20 20" className={className}><FujiGlyph /></svg>
);

// The brand mark: the poster in 40 units, a Kinari panel in its Washi margin.
export function FujiMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <rect width="40" height="40" rx="6" fill={c.washi} />
      <rect x="3.5" y="3.5" width="33" height="33" rx="2.5" fill={c.kinari} />
      <circle cx="20" cy="17" r="9.5" fill={c.hinomaru} />
      <Fuji x={20} top={20} base={36.5} w={17} k={0.6} streaks={10} />
      <path d={band(6, 32.5, 20, 2.4, rng(5))} fill={c.kinari} />
    </svg>
  );
}

// The sign-off: the sun going down behind Fuji across a lake, under bands of mist, between two pines on rocky
// shores; shown whole at every width.
export function SignOff({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 1200 130" preserveAspectRatio="xMidYMax meet" className={className}>
      <defs><Wear id={id} rough={2.4} specks={0.6} scale={1.6} /></defs>
      <g filter={`url(#${id})`}>
        <circle cx="600" cy="80" r="54" fill={c.hinomaru} />
        <Mist bands={[[470, 64, 120, 6], [640, 52, 140, 7], [500, 78, 70, 4]]} color={c.hinomaru} seed={2} />
        <Fuji x={600} top={74} base={124} w={200} k={0.8} streaks={30} />
        <Mist bands={[[380, 104, 200, 7], [600, 96, 220, 8], [300, 114, 160, 5], [700, 112, 200, 5]]} />
        <path d={ridge(200, 470, 124, 16, rng(3), 4)} fill={c.ai} />
        <path d={ridge(740, 1010, 124, 14, rng(4), 4)} fill={c.ai} />
        <path d={isle(420, 520, 124, 8, rng(6))} fill={c.sumi} />
        <path d={isle(700, 760, 124, 5, rng(8))} fill={c.sumi} />
        <rect x="0" y="124" width="1200" height="6" fill={c.washi} />
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
