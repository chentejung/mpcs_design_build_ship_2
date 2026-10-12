// Ben-Day's drawing kit, from Roy Lichtenstein's "Sweet Dreams, Baby!" (Mood Board 02, picture 22): the jagged
// impact burst with a red flash at its heart, tapered speed lines, extruded SFX lettering, dot screens that grow
// from light to heavy, and the shout balloon. Drawn in the board's Palette with thick Ink keylines.
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { rand } from "@/components/artifacts/print";

const c = colors(benDay.board);

// A hand-cut burst: spikes of uneven length at slightly uneven angles, like Lichtenstein's.
export function impact(cx: number, cy: number, r: number, n = 13, seed = 3) {
  const rnd = rand(seed);
  return Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2 + (rnd() - 0.5) * 0.16;
    const k = i % 2 ? 0.44 + rnd() * 0.1 : 0.74 + rnd() * 0.26;
    return `${(cx + r * k * Math.cos(a)).toFixed(1)},${(cy + r * k * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// The burst a punch lands in: Newsprint with an Ink keyline, a Hero Red flash inside.
export function Impact({ cx, cy, r, seed = 3, flash = c.red, k = 3 }: { cx: number; cy: number; r: number; seed?: number; flash?: string; k?: number }) {
  return (
    <g strokeLinejoin="round">
      <polygon points={impact(cx, cy, r, 13, seed)} fill={c.newsprint} stroke={c.ink} strokeWidth={k} />
      <polygon points={impact(cx, cy, r * 0.58, 9, seed + 7)} fill={flash} />
    </g>
  );
}

// A spiky ellipse: the balloon a character shouts in.
export function shout(cx: number, cy: number, rx: number, ry: number, n = 22) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const k = i % 2 ? 0.82 : 1 + 0.04 * (((i * 37) % 11) - 5) / 5;
    return `${(cx + rx * k * Math.cos(a)).toFixed(1)},${(cy + ry * k * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// Motion streaks behind a moving thing: wedges, thick where the thing is and thinning to a point behind it.
export function SpeedLines({ x, y, length, n = 5, gap = 7, width = 4, angle = 0, fill = c.ink }: {
  x: number; y: number; length: number; n?: number; gap?: number; width?: number; angle?: number; fill?: string;
}) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`} fill={fill}>
      {Array.from({ length: n }, (_, i) => {
        const yy = y + (i - (n - 1) / 2) * gap;
        const len = length * (0.55 + 0.45 * (((i * 7) % 5) / 4));
        return <path key={i} d={`M${x} ${yy - width / 2} L${x - len} ${yy} L${x} ${yy + width / 2}Z`} />;
      })}
    </g>
  );
}

// Sound-effect lettering: a colored face with an Ink keyline, standing on an Ink extrusion.
export function Sfx({ x, y, size, children, face = c.red, rotate = -8, depth = 4, anchor = "middle" }: {
  x: number; y: number; size: number; children: string; face?: string; rotate?: number; depth?: number; anchor?: "start" | "middle" | "end";
}) {
  const text = { x, y, fontSize: size, textAnchor: anchor, style: { fontFamily: "var(--font-bangers)", letterSpacing: "0.02em" } };
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`} strokeLinejoin="round">
      {Array.from({ length: depth }, (_, i) => (
        <text key={i} {...text} dx={depth - i} dy={depth - i} fill={c.ink} stroke={c.ink} strokeWidth={size * 0.08}>{children}</text>
      ))}
      <text {...text} fill={face} stroke={c.ink} strokeWidth={size * 0.07} paintOrder="stroke">{children}</text>
    </g>
  );
}

// Graded Ben-Day dots: rows offset by half a step, the dots swelling from `from` to `to` across the box.
export function DotRamp({ x, y, w, h, gap = 6, color = c.red, from = 0.3, to = 2.6, vertical = false }: {
  x: number; y: number; w: number; h: number; gap?: number; color?: string; from?: number; to?: number; vertical?: boolean;
}) {
  const dots: React.ReactNode[] = [];
  for (let row = 0; row * gap <= h; row++) {
    for (let col = 0; col * gap <= w; col++) {
      const dx = col * gap + (row % 2 ? gap / 2 : 0);
      if (dx > w) continue;
      const t = vertical ? (row * gap) / h : dx / w;
      dots.push(<circle key={`${row}-${col}`} cx={x + dx} cy={y + row * gap} r={from + (to - from) * t} />);
    }
  }
  return <g fill={color}>{dots}</g>;
}
