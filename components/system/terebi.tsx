"use client";
// Shōwa's drawing kit after the Color TV Ad on the Japanese Retro board (picture 25), a 1960s magazine ad: a headline
// in 天然色 ("natural color"), each character in its own ink, and the set itself, a wood cabinet with a bulging screen,
// chrome trim, knobs and a speaker grille. app/system.css draws the rest from it: loading posters warm up as a test
// card with a rolling bar, failed ones show static (砂嵐), radios are the set's knobs (つまみ), and the colophon lists
// its facts with colored bullets.
import { useId } from "react";
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";

const c = colors(showa.board);

// 天然色: the first three characters of a word take Hinomaru, Ai and Kogecha (app/system.css); any after stay Sumi,
// as テレビ does after 天然色 in the ad. Other systems leave the inks alone.
export function Tenneniro({ text }: { text: string }) {
  return <>{[...text].map((ch, i) => <span key={i} className="ds-ink" data-ink={i < 3 ? i + 1 : undefined}>{ch}</span>)}</>;
}

// The screen's picture, a color-field of overlapping discs and a wedge, the way the ad's set shows Tokyo in color.
function ColorField({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const at = (px: number, py: number) => [x + px * w, y + py * h] as const;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={c.kinari} />
      <circle cx={at(0.78, 0.74)[0]} cy={at(0.78, 0.74)[1]} r={w * 0.42} fill={c.ai} />
      <path d={`M${at(0.5, 0.5).join(" ")}L${at(1.1, -0.1).join(" ")}L${at(1.1, 0.42).join(" ")}Z`} fill={c.washi} />
      <circle cx={at(0.26, 0.3)[0]} cy={at(0.26, 0.3)[1]} r={w * 0.34} fill={c.hinomaru} />
      <circle cx={at(0.2, 0.92)[0]} cy={at(0.2, 0.92)[1]} r={w * 0.3} fill={c.kogecha} />
      <circle cx={at(0.52, 0.56)[0]} cy={at(0.52, 0.56)[1]} r={w * 0.15} fill={c.kinari} />
    </g>
  );
}

// The console set: drawn in a 100 × 92 box with Sumi keylines like the rest of the kit.
const screen = "M17 20Q16 16 21 15.5Q40 14 59 15.5Q64 16 63 20Q65 40 63 58Q64 62 59 62.5Q40 64 21 62.5Q16 62 17 58Q15 40 17 20Z"; // bulging CRT

export function TvSet({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const k = 2.4;
  const line = { stroke: c.sumi, strokeWidth: k, strokeLinejoin: "round", strokeLinecap: "round" } as const;
  return (
    <svg aria-hidden viewBox="0 0 100 92" className={className}>
      <defs>
        <clipPath id={id}><path d={screen} /></clipPath>
      </defs>
      <path d="M18 72L13 88M82 72L87 88" {...line} strokeWidth={k * 1.6} />
      <path d="M18 72L13 88M82 72L87 88" stroke={c.kogecha} strokeWidth={k * 0.6} strokeLinecap="round" />
      <rect x="5" y="8" width="90" height="66" rx="4" fill={c.kogecha} {...line} />
      <path d="M8 26h8M8 48h8M70 18h22M70 66h22M30 70h30" stroke={c.sumi} strokeOpacity="0.35" strokeWidth="1" />
      <rect x="11" y="12" width="58" height="56" rx="5" fill={c.kinari} {...line} />
      <g clipPath={`url(#${id})`}>
        <ColorField x={15} y={14} w={50} h={50} />
        <path d={Array.from({ length: 16 }, (_, i) => `M15 ${16 + i * 3}h50`).join("")} stroke={c.sumi} strokeOpacity="0.18" strokeWidth="1" />
      </g>
      <path d={screen} fill="none" {...line} />
      <path d="M22 20Q34 18.5 44 19" fill="none" stroke={c.washi} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {[[82, 22, 6.5, -40], [82, 38, 4.6, 30]].map(([cx, cy, r, a]) => (
        <g key={cy} transform={`rotate(${a} ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={r} fill={c.kinari} {...line} />
          <path d={`M${cx} ${cy}V${cy - r + 1.5}`} {...line} />
        </g>
      ))}
      <rect x="74" y="47" width="16" height="17" rx="1.5" fill={c.sumi} />
      <path d={Array.from({ length: 5 }, (_, i) => `M76 ${50 + i * 3}h12`).join("")} stroke={c.kogecha} strokeWidth="1.4" />
    </svg>
  );
}
