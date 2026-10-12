"use client";
// Shōwa's drawing kit, after the Tadanori Yokoo picture on the Japanese Retro board (picture 22): flat fills inside
// heavy Sumi keylines, rising-sun rays, a sawtooth aura (後光) around whatever is in focus, four-point sparkles,
// ringed planets, scalloped clouds, the eye at the sun's centre, and a pointing hand. Kinari is only ever a fill
// inside Sumi (app/systems.ts). motifs.tsx uses the small sun as the ornament; drawing-kit.tsx shows the rest.
import { useId } from "react";
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { burst } from "@/components/artifacts/print";

const c = colors(showa.board);

const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
};
const useSvgId = () => useId().replace(/:/g, "");

// 旭日: n alternating wedges, `ink` over a disc of `ground`.
export function Rays({ cx, cy, r, n = 20, ink = c.hinomaru, ground, turn = 0 }: {
  cx: number; cy: number; r: number; n?: number; ink?: string; ground?: string; turn?: number;
}) {
  const step = 360 / n;
  return (
    <g>
      {ground && <circle cx={cx} cy={cy} r={r} fill={ground} />}
      {Array.from({ length: n / 2 }, (_, i) => {
        const a = turn + i * step * 2;
        return <path key={i} d={`M${cx} ${cy}L${pt(cx, cy, r, a)}A${r} ${r} 0 0 1 ${pt(cx, cy, r, a + step)}Z`} fill={ink} />;
      })}
    </g>
  );
}

// 後光: a sawtooth aura.
export const Aura = ({ cx, cy, r, teeth = 28, depth = 0.14, fill = c.kinari, k }: {
  cx: number; cy: number; r: number; teeth?: number; depth?: number; fill?: string; k: number;
}) => <polygon points={burst(cx, cy, r, r * (1 - depth), teeth)} fill={fill} stroke={c.sumi} strokeWidth={k} strokeLinejoin="round" />;

// キラキラ: a four-point sparkle with pinched, curved sides.
export function Sparkle({ x, y, r, fill = c.kinari, k }: { x: number; y: number; r: number; fill?: string; k: number }) {
  const q = r * 0.16;
  const d = `M${x} ${y - r}Q${x + q} ${y - q} ${x + r} ${y}Q${x + q} ${y + q} ${x} ${y + r}Q${x - q} ${y + q} ${x - r} ${y}Q${x - q} ${y - q} ${x} ${y - r}Z`;
  return <path d={d} fill={fill} stroke={c.sumi} strokeWidth={k} strokeLinejoin="round" />;
}

// 惑星: a planet whose ring passes behind it and comes round in front.
export function Planet({ cx, cy, r, tilt = -20, body = c.kinari, ring = c.ai, k }: {
  cx: number; cy: number; r: number; tilt?: number; body?: string; ring?: string; k: number;
}) {
  const id = useSvgId();
  const band = (
    <g transform={`rotate(${tilt} ${cx} ${cy})`} fill="none">
      <ellipse cx={cx} cy={cy} rx={r * 1.8} ry={r * 0.48} stroke={c.sumi} strokeWidth={k * 2.8} />
      <ellipse cx={cx} cy={cy} rx={r * 1.8} ry={r * 0.48} stroke={ring} strokeWidth={k * 1.1} />
    </g>
  );
  return (
    <g>
      <clipPath id={id}>
        <rect x={cx - r * 2} y={cy} width={r * 4} height={r} transform={`rotate(${tilt} ${cx} ${cy})`} />
      </clipPath>
      {band}
      <circle cx={cx} cy={cy} r={r} fill={body} stroke={c.sumi} strokeWidth={k} />
      <path d={`M${pt(cx, cy, r * 0.62, -60 + tilt)}A${r * 0.62} ${r * 0.62} 0 0 0 ${pt(cx, cy, r * 0.62, -150 + tilt)}`} fill="none" stroke={c.washi} strokeWidth={k * 0.9} strokeLinecap="round" />
      <g clipPath={`url(#${id})`}>{band}</g>
    </g>
  );
}

// 雲: a scalloped cloud. Each puff is stroked twice its keyline in Sumi, then filled over, so only the outline of
// their union shows; one curl sits inside.
const puffs: [number, number, number][] = [[0, 2, 12], [15, -8, 14], [33, -6, 12], [47, 3, 10], [34, 9, 11], [15, 10, 11]];
export function Cloud({ x, y, s = 1, fill = c.washi, k }: { x: number; y: number; s?: number; fill?: string; k: number }) {
  const w = k / s;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {puffs.map(([px, py, r], i) => <circle key={`o${i}`} cx={px} cy={py} r={r} fill={c.sumi} stroke={c.sumi} strokeWidth={w * 2} />)}
      {puffs.map(([px, py, r], i) => <circle key={`f${i}`} cx={px} cy={py} r={r} fill={fill} />)}
      <path d="M18 2A5 5 0 1 0 13 7A2.6 2.6 0 0 0 15.6 4.4" fill="none" stroke={c.sumi} strokeWidth={w} strokeLinecap="round" />
    </g>
  );
}

// 目: an almond eye with a heavy upper lid and an Ai iris.
export function Eye({ cx, cy, w, k, iris = c.ai }: { cx: number; cy: number; w: number; k: number; iris?: string }) {
  const id = useSvgId();
  const h = w * 0.52;
  const lid = `M${cx - w / 2} ${cy}Q${cx} ${cy - h} ${cx + w / 2} ${cy}`;
  const d = `${lid}Q${cx} ${cy + h} ${cx - w / 2} ${cy}Z`;
  const ir = h * 0.4;
  return (
    <g>
      <clipPath id={id}><path d={d} /></clipPath>
      <path d={d} fill={c.washi} />
      <g clipPath={`url(#${id})`}>
        <circle cx={cx} cy={cy} r={ir} fill={iris} stroke={c.sumi} strokeWidth={k * 0.8} />
        <circle cx={cx} cy={cy} r={ir * 0.46} fill={c.sumi} />
        <circle cx={cx + ir * 0.38} cy={cy - ir * 0.38} r={ir * 0.2} fill={c.washi} />
      </g>
      <path d={d} fill="none" stroke={c.sumi} strokeWidth={k} strokeLinejoin="round" />
      <path d={lid} fill="none" stroke={c.sumi} strokeWidth={k * 1.9} strokeLinecap="round" />
    </g>
  );
}

// 指差し: a pointing hand in a Hinomaru cuff, pointing right; place it with x, y, s and rotate.
export function Hand({ x, y, s = 1, rotate = 0, k }: { x: number; y: number; s?: number; rotate?: number; k: number }) {
  const line = { stroke: c.sumi, strokeWidth: k / s, strokeLinejoin: "round", strokeLinecap: "round" } as const;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      <rect x="0" y="3" width="11" height="25" rx="2" fill={c.hinomaru} {...line} />
      <path d="M5.5 3v25" {...line} strokeDasharray="2.5 3" fill="none" />
      <path d="M11 8c4-2 9-2 13 0l3 2h33a4.5 4.5 0 0 1 0 9H33v2a4 4 0 0 1 0 8h-2v1a3.5 3.5 0 0 1-3 4H17c-4 0-6-3-6-6Z" fill={c.washi} {...line} />
      <path d="M33 21h-7M31 29h-6M26 10c-2 3-6 4-10 3" fill="none" {...line} />
    </g>
  );
}

// A pocket version of the sun for 20px ornaments: aura and disc, keylines kept thick enough to print.
export function SmallSun({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <polygon points={burst(12, 12, 11.4, 8.6, 14)} fill={c.kinari} stroke={c.sumi} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="5.6" fill={c.hinomaru} stroke={c.sumi} strokeWidth="1.5" />
    </svg>
  );
}
