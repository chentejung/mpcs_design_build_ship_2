"use client";
// Pulp's drawing kit after Space Fleet on the American Comics board (picture 26): the hypnotic spiral of Hero Red
// rings sinking into an Ink night behind the crew, the corner issue box (No. and price, ruled double), and the
// masthead extruded in Mustard on Hero Red (press.tsx's Lettering). The spiral grounds the /bijou hero and banner.
import { c, display, f, poster } from "./press";

// Bands of Hero Red on Ink sinking toward (cx, cy), each ring a little off the last so the bands swell on one side,
// as a tunnel does; `r` is the outermost ring, `n` how many, `band` the share of each step that is red.
export function Spiral({ cx, cy, r, n = 12, band = 0.42, drift = [-0.9, -0.5] }: { cx: number; cy: number; r: number; n?: number; band?: number; drift?: [number, number] }) {
  const radius = (i: number) => r * Math.pow(1 - i / n, 1.25);
  const rings = Array.from({ length: n }, (_, i) => {
    const x = f(cx + drift[0] * i * (r / 60));
    const y = f(cy + drift[1] * i * (r / 60));
    return { x, y, outer: radius(i), inner: radius(i) - band * (radius(i) - radius(i + 1)) };
  });
  return (
    <g>
      {rings.map((g, i) => (
        <g key={i}>
          <circle cx={g.x} cy={g.y} r={f(g.outer)} fill={c.red} />
          <circle cx={g.x} cy={g.y} r={f(g.inner)} fill={c.ink} />
        </g>
      ))}
    </g>
  );
}

// The corner issue box at (x, y), `w` wide: No. and the number on Hero Red over the price on Newsprint, ruled double
// in Ink, as the covers box theirs above the masthead.
export function IssueBox({ x, y, w, no, price = "10¢" }: { x: number; y: number; w: number; no: number | string; price?: string }) {
  const h = w * 1.2;
  const split = y + h * 0.58;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={c.newsprint} stroke={c.ink} strokeWidth={w * 0.06} />
      <rect x={x + w * 0.09} y={y + w * 0.09} width={w * 0.82} height={split - y - w * 0.09} fill={c.red} stroke={c.ink} strokeWidth={w * 0.025} />
      <text x={x + w * 0.16} y={y + h * 0.24} fontSize={w * 0.2} fill={c.newsprint} style={poster}>No.</text>
      <text x={x + w / 2} y={y + h * 0.52} fontSize={w * 0.4} textAnchor="middle" fill={c.newsprint} style={display}>{no}</text>
      <text x={x + w / 2} y={y + h * 0.9} fontSize={w * 0.34} textAnchor="middle" fill={c.ink} style={poster}>{price}</text>
      <rect x={x + w * 0.09} y={split + w * 0.06} width={w * 0.82} height={y + h - split - w * 0.15} fill="none" stroke={c.ink} strokeWidth={w * 0.025} />
    </g>
  );
}
