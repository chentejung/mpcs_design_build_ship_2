// Ben-Day's drawing kit, from "Super Orange Juice" (Mood Board 02, picture 30): a 1930s rubber-hose cartoon, here a
// striped popcorn bucket with pie-cut eyes, a wide-open grin, hose limbs, white gloves and big shoes, dancing in a
// shower of kernels: the Animation panel (components/system/genres.tsx).
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { Dots } from "@/components/artifacts/print";
import { cloud } from "./diner";
import { Sfx } from "./pow";
import { Emanata } from "./xray";

const c = colors(benDay.board);

// A four-fingered cartoon glove with a rolled cuff, its wrist at (0, 0) pointing down.
export function Glove({ x, y, rotate = 0, s = 1 }: { x: number; y: number; rotate?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} fill={c.newsprint} stroke={c.ink} strokeWidth={2.2 / s} strokeLinejoin="round" strokeLinecap="round">
      <path d="M-10 -10C-17 -12-19-18-14-21C-11-22-9-18-8-15" />
      <path d="M-9-2C-13-8-13-14-10-18C-12-24-6-28-3-23C-3-29 4-30 5-23C7-28 13-26 11-19C15-16 14-8 10-2Z" />
      <path d="M-4-12V-6M0-13V-6M4-12V-6" fill="none" strokeWidth={1.3 / s} />
      <path d="M-11-3Q0 2 11-3L12 4Q0 9-12 4Z" />
    </g>
  );
}

// A puff of popcorn with a dab of butter.
const kernel = (x: number, y: number, r: number) => (
  <g key={`${x}-${y}`}>
    <path d={cloud(x, y, r, r * 0.85, 5)} fill={c.newsprint} stroke={c.ink} strokeWidth="2" strokeLinejoin="round" />
    <circle cx={x + r * 0.25} cy={y + r * 0.2} r={r * 0.32} fill={c.mustard} />
  </g>
);

// The mascot, centered on x = 100.
export function PopcornPal() {
  const stripes = Array.from({ length: 6 }, (_, i) => {
    const t0 = 60 + (i * 80) / 6, t1 = 60 + ((i + 1) * 80) / 6;
    const b0 = 72 + (i * 56) / 6, b1 = 72 + ((i + 1) * 56) / 6;
    return <path key={i} d={`M${t0} 118L${t1} 118L${b1} 208L${b0} 208Z`} fill={i % 2 ? c.newsprint : c.red} />;
  });
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* hose limbs behind the body */}
      <g fill="none" stroke={c.ink} strokeWidth="7">
        <path d="M66 146C42 140 30 116 36 94" />
        <path d="M134 146C158 150 170 132 166 114" />
        <path d="M88 204C86 222 78 230 70 236" />
        <path d="M112 204C120 220 134 222 142 212" />
      </g>
      <Glove x={36} y={92} rotate={-8} />
      <Glove x={166} y={112} rotate={20} />
      <ellipse cx="62" cy="240" rx="16" ry="7.5" fill={c.ink} />
      <ellipse cx="56" cy="237" rx="5" ry="2" fill={c.newsprint} />
      <ellipse cx="150" cy="208" rx="15" ry="7" fill={c.ink} transform="rotate(-28 150 208)" />
      <ellipse cx="146" cy="203" rx="4.6" ry="1.8" fill={c.newsprint} transform="rotate(-28 146 203)" />
      {/* popcorn heaped over the rim */}
      {[kernel(70, 110, 13), kernel(92, 100, 15), kernel(116, 102, 14), kernel(134, 112, 11), kernel(104, 84, 12), kernel(80, 90, 10)]}
      {/* the striped bucket */}
      <g>{stripes}</g>
      <path d="M60 118H140L128 208H72Z" fill="none" stroke={c.ink} strokeWidth="3.5" />
      <ellipse cx="100" cy="118" rx="41" ry="7" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      {/* the face, on the bucket's round label */}
      <circle cx="100" cy="160" r="30" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      {[89, 111].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="150" rx="8.5" ry="12.5" fill={c.newsprint} stroke={c.ink} strokeWidth="2.4" />
          <ellipse cx={x + 2} cy="153" rx="4.6" ry="7.6" fill={c.ink} />
          <path d={`M${x + 2.2} ${147}l2.6 -1.4l0.8 3.4Z`} fill={c.newsprint} />
          <path d={`M${x - 7} 134Q${x} 128 ${x + 7} 134`} fill="none" stroke={c.ink} strokeWidth="2.4" />
        </g>
      ))}
      <path d="M80 166C86 192 114 192 120 166C108 172 92 172 80 166Z" fill={c.ink} />
      <path d="M90 178C96 186 106 186 110 178C104 174 96 174 90 178Z" fill={c.red} />
      <path d="M82 167C92 171 108 171 118 167" fill="none" stroke={c.newsprint} strokeWidth="3" />
    </g>
  );
}

// The Animation panel.
export function AnimationArt() {
  const uid = `juice-${useId().replace(/:/g, "")}`;
  return (
    <g>
      <defs>
        <Dots id={`${uid}-dots`} color={c.red} r={1.3} gap={6} angle={30} bg={c.peach} />
      </defs>
      <rect width="200" height="250" fill={`url(#${uid}-dots)`} />
      <circle cx="100" cy="150" r="86" fill={c.mustard} stroke={c.ink} strokeWidth="3" />
      <Emanata cx={36} cy={92} r={18} len={8} angles={[-160, -130, -100]} k={2.4} />
      <Emanata cx={166} cy={112} r={18} len={8} angles={[-70, -40, -10]} k={2.4} />
      <Emanata cx={62} cy={240} r={20} len={8} angles={[-170, -150]} k={2.4} />
      <PopcornPal />
      {[kernel(32, 150, 7), kernel(174, 160, 8), kernel(156, 74, 7), kernel(48, 60, 6)]}
      <Sfx x={52} y={42} size={32} rotate={-10} face={c.mustard}>SUPER</Sfx>
      <Sfx x={150} y={40} size={30} rotate={8} face={c.red}>WHEE!</Sfx>
    </g>
  );
}
