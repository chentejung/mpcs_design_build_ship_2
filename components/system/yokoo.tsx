"use client";
// Shōwa's drawing kit, after the Tadanori Yokoo picture on the Japanese Retro board (picture 22): flat fills inside
// heavy Sumi keylines, rising-sun rays, a sawtooth aura (後光) around whatever is in focus, four-point sparkles,
// ringed planets, scalloped clouds, the eye at the sun's centre, and a pointing hand. Kinari is only ever a fill
// inside Sumi (app/systems.ts). motifs.tsx composes these into the hero, the ornament and the empty state.
import { useId } from "react";
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { burst } from "@/components/artifacts/print";
import { useSystemId } from "./context";

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

// The rising sun, drawn the Yokoo way: alternating rays in a keylined disc, the sawtooth aura, the red sun, and at
// its centre the cinema's eye or a glyph. Drawn in a 200-unit box around (cx, cy), scaled by r / 100.
export function SunMark({ cx = 100, cy = 100, r = 100, eye = false, glyph, rays = true, k = 3 }: {
  cx?: number; cy?: number; r?: number; eye?: boolean; glyph?: string; rays?: boolean; k?: number;
}) {
  const s = r / 100;
  const ks = k / s;
  return (
    <g transform={`translate(${cx - 100 * s} ${cy - 100 * s}) scale(${s})`}>
      {rays && (
        <>
          <Rays cx={100} cy={100} r={96} n={24} ground={c.washi} />
          <circle cx={100} cy={100} r={96} fill="none" stroke={c.sumi} strokeWidth={ks} />
        </>
      )}
      <Aura cx={100} cy={100} r={rays ? 66 : 96} teeth={rays ? 30 : 26} depth={rays ? 0.15 : 0.18} k={ks} />
      <circle cx={100} cy={100} r={rays ? 50 : 70} fill={c.hinomaru} stroke={c.sumi} strokeWidth={ks} />
      {eye && <Eye cx={100} cy={100} w={66} k={ks} />}
      {glyph && (
        <text x={100} y={100} dy="0.36em" textAnchor="middle" fontSize={rays ? 52 : 74} fill="#fff" style={{ fontFamily: "var(--ds-display-font)" }}>
          {glyph}
        </text>
      )}
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

// The hero: the sun with the eye at its centre, a planet and a cloud drifting over its rim, and sparkles.
export function HeroSun({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 240" className={className}>
      <SunMark cx={120} cy={112} r={100} eye />
      <Planet cx={38} cy={196} r={15} k={3} />
      <Cloud x={170} y={204} k={3} />
      <Sparkle x={216} y={24} r={16} k={2.5} />
      <Sparkle x={22} y={30} r={10} fill={c.washi} k={2.5} />
      <Sparkle x={230} y={128} r={8} fill={c.hinomaru} k={2} />
    </svg>
  );
}

// The empty state: the sun holds 空 ("empty"), with a planet, a cloud and sparkles around it.
export function EmptySun({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 172" className={className}>
      <SunMark cx={100} cy={84} r={80} glyph="空" />
      <Planet cx={30} cy={146} r={11} k={2.5} />
      <Cloud x={138} y={152} s={0.85} k={2.5} />
      <Sparkle x={20} y={26} r={12} k={2.5} />
      <Sparkle x={184} y={44} r={8} fill={c.hinomaru} k={2} />
    </svg>
  );
}

// The kit on Shōwa's Design System page, one drawing per element; other systems have none.
const tile = (children: React.ReactNode, viewBox = "0 0 80 80") => <svg aria-hidden viewBox={viewBox} className="h-20 w-20">{children}</svg>;
const strip = Array.from({ length: 6 }, (_, i) => <rect key={i} x={4 + i * 13} y={36} width={7} height={8} rx={1} fill={c.washi} />);
const flag = (x: number, y: number) => (
  <g key={`${x}${y}`}>
    <rect x={x} y={y} width={16} height={16} fill={c.washi} stroke={c.sumi} strokeWidth={2.5} />
    <circle cx={x + 8} cy={y + 8} r={4} fill={c.hinomaru} />
  </g>
);

const kit: { name: string; jp: string; note: string; art: React.ReactNode }[] = [
  { name: "Rays", jp: "旭日", note: "Alternating wedges radiate from the focus: the sun, a selected tag's hole, a ticket stub.",
    art: tile(<><Rays cx={40} cy={40} r={37} n={16} ground={c.washi} /><circle cx={40} cy={40} r={37} fill="none" stroke={c.sumi} strokeWidth={2.5} /></>) },
  { name: "Aura", jp: "後光", note: "A sawtooth halo rings the sun, the brand, the Saved count and a hovered poster.",
    art: tile(<><Aura cx={40} cy={40} r={36} teeth={22} depth={0.2} k={2.5} /><circle cx={40} cy={40} r={20} fill={c.hinomaru} stroke={c.sumi} strokeWidth={2.5} /></>) },
  { name: "Sparkle", jp: "キラキラ", note: "Four-point stars fill the gaps; a switched-on toggle turns into one.",
    art: tile(<><Sparkle x={34} y={42} r={26} k={2.5} /><Sparkle x={64} y={18} r={11} fill={c.hinomaru} k={2} /></>) },
  { name: "Planet", jp: "惑星", note: "A ringed planet: Category badges orbit the poster corner.",
    art: tile(<Planet cx={40} cy={40} r={19} k={2.5} />) },
  { name: "Cloud", jp: "雲", note: "Scalloped puffs drift over the sun's rim.", art: tile(<Cloud x={16} y={42} s={0.95} k={2.5} />) },
  { name: "Eye", jp: "目", note: "The cinema's eye looks out from the hero sun.", art: tile(<Eye cx={40} cy={40} w={66} k={2.5} />) },
  { name: "Hand", jp: "指差し", note: "Points the way out of an empty list.", art: tile(<Hand x={6} y={24} s={1.08} k={2.5} />) },
  { name: "Film strip", jp: "フィルム", note: "Sprocket bands close the header, divide sections and frame the toast.",
    art: tile(<><rect x={0} y={30} width={80} height={20} fill={c.sumi} />{strip}</>) },
  { name: "Flag corners", jp: "日の丸", note: "Poster borders: a double Sumi rule with flag blocks at its corners.",
    art: tile(<><rect x={10} y={10} width={60} height={60} fill="none" stroke={c.sumi} strokeWidth={5} /><rect x={10} y={10} width={60} height={60} fill="none" stroke={c.washi} strokeWidth={1.6} />{[flag(2, 2), flag(62, 2), flag(2, 62), flag(62, 62)]}</>) },
];

export function DrawingKit() {
  if (useSystemId() !== "showa") return null;
  return (
    <div className="grid gap-5">
      <p className="ds-label ds-muted">Drawing kit · after Tadanori Yokoo, Mood Board 01 picture 22</p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      <li className="grid content-start gap-2">
        <span aria-hidden lang="ja" className="ds-display grid h-20 place-items-center justify-self-start text-[64px] leading-none">映</span>
        <p className="ds-label">Block type <span lang="ja" className="ds-native text-[12px]">立体文字</span></p>
        <p className="ds-fine ds-muted">Display type stands on a Hinomaru extrusion, closed by a Sumi edge.</p>
      </li>
      {kit.map((k) => (
        <li key={k.name} className="grid content-start gap-2">
          {k.art}
          <p className="ds-label">{k.name} <span lang="ja" className="ds-native text-[12px]">{k.jp}</span></p>
          <p className="ds-fine ds-muted">{k.note}</p>
        </li>
      ))}
      </ul>
    </div>
  );
}
