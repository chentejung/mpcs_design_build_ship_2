// Ben-Day's drawing kit, from "Krakoom!" (Mood Board 02, picture 05): a wall blown apart, masonry blocks flying out of a
// cream-and-yellow blast, red smoke rolling at the corners, and the sound effect slammed across it all: the Action
// panel (components/system/genres.tsx).
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { rand } from "@/components/artifacts/print";
import { cloud } from "./diner";
import { Impact, Sfx } from "./pow";
import { Rays } from "./xray";

const c = colors(benDay.board);

// A masonry block in oblique view: a lit top, a shaded side, mortar lines and a crack on its face.
export function Block({ x, y, w, h = w * 0.62, rotate = 0, k = 2 }: { x: number; y: number; w: number; h?: number; rotate?: number; k?: number }) {
  const ox = w * 0.34;
  const oy = -w * 0.24;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} stroke={c.ink} strokeWidth={k} strokeLinejoin="round">
      <path d={`M0 0L${ox} ${oy}H${w + ox}L${w} 0Z`} fill={c.newsprint} />
      <path d={`M${w} 0L${w + ox} ${oy}V${h + oy}L${w} ${h}Z`} fill={c.sepia} />
      <path d={`M0 0H${w}V${h}H0Z`} fill={c.peach} />
      <path d={`M0 ${h / 2}H${w}M${w * 0.45} 0V${h / 2}M${w * 0.7} ${h / 2}V${h}`} fill="none" strokeWidth={k * 0.6} />
      <path d={`M${w * 0.15} ${h * 0.7}l${w * 0.12} ${-h * 0.15}l${w * 0.08} ${h * 0.2}`} fill="none" strokeWidth={k * 0.6} />
    </g>
  );
}

// A rolling puff of smoke: a red scalloped cloud with a lighter heart.
export function Smoke({ cx, cy, r, seed = 1 }: { cx: number; cy: number; r: number; seed?: number }) {
  const n = 7 + (seed % 3);
  return (
    <g strokeLinejoin="round">
      <path d={cloud(cx, cy, r, r * 0.8, n)} fill={c.red} stroke={c.ink} strokeWidth="2.5" />
      <path d={cloud(cx - r * 0.15, cy - r * 0.15, r * 0.5, r * 0.4, 6)} fill={c.peach} opacity="0.9" />
    </g>
  );
}

// The Action panel.
export function ActionArt() {
  const rnd = rand(17);
  const debris = Array.from({ length: 34 }, (_, i) => {
    const a = rnd() * Math.PI * 2;
    const d = 40 + rnd() * 90;
    const s = 1.5 + rnd() * 3.5;
    const x = 100 + Math.cos(a) * d;
    const y = 128 + Math.sin(a) * d * 0.9;
    return <path key={i} d={`M${x.toFixed(1)} ${y.toFixed(1)}l${s} ${-s * 0.6}l${s * 0.7} ${s}l${-s * 1.2} ${s * 0.5}Z`} />;
  });
  return (
    <g>
      <rect width="200" height="250" fill={c.newsprint} />
      <Rays cx={100} cy={128} r={240} n={30} spread={0.5} color={c.mustard} />
      <Rays cx={100} cy={128} r={240} n={30} spread={0.08} opacity={0.6} />
      <Smoke cx={24} cy={34} r={40} seed={1} />
      <Smoke cx={184} cy={44} r={36} seed={2} />
      <Smoke cx={178} cy={214} r={40} seed={3} />
      <Smoke cx={18} cy={210} r={34} seed={4} />
      <Impact cx={100} cy={128} r={100} seed={8} flash={c.mustard} />
      <polygon points="100,76 112,108 146,100 120,124 150,150 114,144 104,178 92,146 58,156 82,128 52,100 88,108" fill={c.red} opacity="0.85" />
      <g fill={c.ink}>{debris}</g>
      <Block x={16} y={92} w={24} rotate={-24} />
      <Block x={148} y={74} w={28} rotate={18} />
      <Block x={30} y={170} w={20} rotate={34} />
      <Block x={150} y={166} w={22} rotate={-38} />
      <Block x={86} y={22} w={16} rotate={12} />
      <Block x={172} y={124} w={13} rotate={50} />
      <Block x={12} y={140} w={12} rotate={-60} />
      <Sfx x={98} y={146} size={44} rotate={-18} depth={5}>KRAKOOM!</Sfx>
      <g>
        <Block x={-6} y={234} w={30} rotate={-6} />
        <Block x={52} y={238} w={26} rotate={8} />
        <Block x={108} y={236} w={32} rotate={-4} />
        <Block x={168} y={240} w={28} rotate={10} />
      </g>
    </g>
  );
}
