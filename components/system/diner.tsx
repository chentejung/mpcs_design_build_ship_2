// Ben-Day's drawing kit, from the "Dish from the Diner!" cover (Mood Board 02, picture 21): the thought balloon with
// its trail of bubbles, the "GASP!" burst, and the cover's "10 CENTS" corner box, which became Eigakan's brand mark
// (app/system.css).
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { shout, Sfx } from "./pow";

const c = colors(benDay.board);

// A scalloped cloud: `n` bumps around an ellipse, each an arc bulging outward.
export function cloud(cx: number, cy: number, rx: number, ry: number, n = 11) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n - Math.PI / 2 + 0.2 * Math.sin(i * 2.3);
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
  return pts.map(([x, y], i) => {
    const [nx, ny] = pts[(i + 1) % n];
    const bump = Math.hypot(nx - x, ny - y) * (0.56 + 0.06 * Math.cos(i * 1.7));
    return `${i ? "" : `M${x.toFixed(1)} ${y.toFixed(1)}`}A${bump.toFixed(1)} ${bump.toFixed(1)} 0 0 1 ${nx.toFixed(1)} ${ny.toFixed(1)}`;
  }).join("") + "Z";
}

// A thought balloon over (cx, cy), trailing bubbles toward (tx, ty).
export function ThoughtBalloon({ cx, cy, rx, ry, tx, ty, fill = c.newsprint, k = 3 }: {
  cx: number; cy: number; rx: number; ry: number; tx: number; ty: number; fill?: string; k?: number;
}) {
  const bubbles = [0.3, 0.55, 0.78].map((t, i) => {
    const sx = cx + (tx - cx) * (0.55 + t * 0.45);
    const sy = cy + ry * 0.9 + (ty - cy - ry * 0.9) * t;
    return <circle key={i} cx={sx} cy={sy} r={(1 - t) * ry * 0.22 + 2} />;
  });
  return (
    <g fill={fill} stroke={c.ink} strokeWidth={k}>
      {bubbles}
      <path d={cloud(cx, cy, rx, ry)} strokeLinejoin="round" />
    </g>
  );
}

// GASP!: a shout balloon with the word in Ink.
export function Gasp({ cx, cy, r, word = "GASP!", fill = c.newsprint }: { cx: number; cy: number; r: number; word?: string; fill?: string }) {
  return (
    <g>
      <polygon points={shout(cx, cy, r, r * 0.68, 16)} fill={fill} stroke={c.ink} strokeWidth={r * 0.06} strokeLinejoin="round" />
      <Sfx x={cx} y={cy + r * 0.16} size={r * 0.5} face={c.ink} depth={0} rotate={-6}>{word}</Sfx>
    </g>
  );
}

// Balloon lettering: centered lines of Bangers in Ink.
export function Lettering({ cx, cy, lines, size = 12, fill = c.ink }: { cx: number; cy: number; lines: string[]; size?: number; fill?: string }) {
  const lh = size * 1.08;
  const y0 = cy - ((lines.length - 1) * lh) / 2 + size * 0.36;
  return (
    <g textAnchor="middle" fontSize={size} fill={fill} style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" }}>
      {lines.map((l, i) => <text key={i} x={cx} y={y0 + i * lh}>{l}</text>)}
    </g>
  );
}

// A shout balloon with its lines lettered inside.
export function Shout({ cx, cy, rx, ry, lines, size = 12, fill = c.newsprint, k = 2.4 }: {
  cx: number; cy: number; rx: number; ry: number; lines: string[]; size?: number; fill?: string; k?: number;
}) {
  return (
    <g>
      <polygon points={shout(cx, cy, rx, ry, 18)} fill={fill} stroke={c.ink} strokeWidth={k} strokeLinejoin="round" />
      <Lettering cx={cx} cy={cy} lines={lines} size={size} />
    </g>
  );
}
