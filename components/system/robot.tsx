// Ben-Day's drawing kit, from "Robot Invasion" (Mood Board 02, picture 15): a riveted giant with a glass-domed head and
// glowing eyes looming over a burning city, searchlights crossing behind it, a saucer overhead and tiny figures
// fleeing below: the Science Fiction panel (components/system/genres.tsx).
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { Hatch } from "@/components/artifacts/print";
import { cloud, Shout } from "./diner";
import { DotRamp } from "./pow";
import { Rooftops } from "./meanwhile";

const c = colors(benDay.board);

const rivets = (pts: [number, number][], r = 1.4) => <g fill={c.ink}>{pts.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />)}</g>;
const row = (x1: number, x2: number, y: number, n: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => [x1 + ((x2 - x1) * i) / (n - 1), y]);

// A flying saucer with a Mustard dome and a row of lights.
export function Saucer({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c.ink} strokeWidth={2 / s}>
      <path d="M-8 -2C-8 -10 8 -10 8 -2Z" fill={c.mustard} />
      <ellipse cx="0" cy="0" rx="20" ry="5" fill={c.newsprint} />
      <g fill={c.red} stroke="none">{[-12, -4, 4, 12].map((dx) => <circle key={dx} cx={dx} cy="0.5" r="1.6" />)}</g>
    </g>
  );
}

// A fleeing figure, arms thrown up, feet at (x, y).
const runner = (x: number, y: number, flip = 1) => (
  <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${flip} 1)`} fill={c.ink} stroke={c.ink} strokeWidth="1.6" strokeLinecap="round">
    <circle cx="0" cy="-13" r="2.2" />
    <path d="M0 -11L1 -5M1 -5L-3 0M1 -5L4 0M0 -10L-4 -14M0 -10L4 -12" fill="none" />
  </g>
);

// The robot itself, centered on x = 100, its head about y 60–130, shaded with its own hatch.
export function Robot() {
  const uid = `robot-${useId().replace(/:/g, "")}`;
  const shade = `url(#${uid}-shade)`;
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <Hatch id={`${uid}-shade`} color={c.sepia} width={1.6} gap={3.4} angle={-35} />
      </defs>
      {/* raised claw arm (viewer's left) */}
      <g stroke={c.ink} strokeWidth="2.4">
        <path d="M44 150L24 92" stroke={c.ink} strokeWidth="18" />
        <path d="M44 150L24 92" stroke={c.newsprint} strokeWidth="13" />
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const x = 44 - 20 * t;
          const y = 150 - 58 * t;
          return <ellipse key={t} cx={x} cy={y} rx="8" ry="3" transform={`rotate(-19 ${x} ${y})`} fill={c.sepia} />;
        })}
        <path d="M20 88C4 80 2 60 14 48L19 53C11 63 13 76 25 82Z" fill={c.newsprint} />
        <path d="M30 86C44 78 46 58 36 48L31 53C37 63 35 76 25 82Z" fill={c.newsprint} />
        <circle cx="25" cy="88" r="7" fill={c.sepia} />
      </g>
      {/* lowered arm (viewer's right) */}
      <g stroke={c.ink} strokeWidth="2.4">
        <path d="M156 158L174 236" stroke={c.ink} strokeWidth="18" />
        <path d="M156 158L174 236" stroke={c.newsprint} strokeWidth="13" />
        {[0.25, 0.5, 0.75].map((t) => {
          const x = 156 + 18 * t;
          const y = 158 + 78 * t;
          return <ellipse key={t} cx={x} cy={y} rx="8" ry="3" transform={`rotate(13 ${x} ${y})`} fill={c.sepia} />;
        })}
      </g>
      {/* torso */}
      <path d="M50 146H150L142 250H58Z" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <path d="M118 146H150L142 250H112Z" fill={shade} />
      <path d="M56 176H146M60 214H142" stroke={c.ink} strokeWidth="1.6" fill="none" />
      {rivets([...row(58, 142, 152, 9), ...row(60, 140, 182, 8), ...row(62, 138, 220, 7)])}
      <circle cx="100" cy="196" r="14" fill={c.sepia} stroke={c.ink} strokeWidth="3" />
      <circle cx="100" cy="196" r="8" fill={c.mustard} stroke={c.ink} strokeWidth="2" />
      <path d="M95 191A6 6 0 0 1 101 189" fill="none" stroke={c.newsprint} strokeWidth="2" />
      {/* shoulders */}
      {[44, 156].map((x) => (
        <g key={x}>
          <circle cx={x} cy="152" r="19" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
          <path d={`M${x + 4} 134A19 19 0 0 1 ${x + 4} 170A26 26 0 0 0 ${x + 4} 134Z`} fill={shade} />
          {rivets([[x - 10, 144], [x, 140], [x + 10, 144], [x - 12, 156], [x + 12, 156]], 1.3)}
        </g>
      ))}
      {/* neck */}
      <rect x="84" y="128" width="32" height="7" fill={c.sepia} stroke={c.ink} strokeWidth="2" />
      <rect x="78" y="135" width="44" height="8" fill={c.newsprint} stroke={c.ink} strokeWidth="2" />
      {/* head */}
      <path d="M68 90H132L127 130H73Z" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <path d="M112 90H132L127 130H110Z" fill={shade} />
      {rivets([...row(72, 128, 95, 8), ...row(76, 124, 125, 7)], 1.2)}
      <rect x="62" y="102" width="8" height="14" rx="2" fill={c.sepia} stroke={c.ink} strokeWidth="2" />
      <rect x="130" y="102" width="8" height="14" rx="2" fill={c.sepia} stroke={c.ink} strokeWidth="2" />
      {/* eyes glow */}
      {[87, 113].map((x) => (
        <g key={x}>
          <circle cx={x} cy="106" r="14" fill={c.mustard} opacity="0.45" />
          <circle cx={x} cy="106" r="8" fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
          <circle cx={x} cy="106" r="4" fill={c.red} />
          <circle cx={x - 2} cy="104" r="1.4" fill={c.newsprint} />
        </g>
      ))}
      <rect x="84" y="116" width="32" height="8" fill={c.ink} />
      <path d="M90 117V123M96 117V123M102 117V123M108 117V123" stroke={c.newsprint} strokeWidth="1.6" />
      {/* glass dome with the works inside */}
      <path d="M72 90C72 56 128 56 128 90Z" fill={c.newsprint} stroke={c.ink} strokeWidth="2.6" opacity="0.92" />
      <g fill="none" stroke={c.sepia} strokeWidth="1.6">
        <circle cx="92" cy="80" r="6" /><circle cx="106" cy="76" r="8" /><circle cx="116" cy="84" r="4" />
        <path d="M86 90V82M100 90V70M110 90V86" />
      </g>
      <path d="M80 82C80 72 88 64 98 62" fill="none" stroke={c.ink} strokeWidth="1.6" opacity="0.5" />
      <path d="M100 56V46" stroke={c.ink} strokeWidth="2.4" />
      <circle cx="100" cy="44" r="4" fill={c.red} stroke={c.ink} strokeWidth="2" />
    </g>
  );
}

// The Science Fiction panel.
export function SciFiArt() {
  return (
    <g>
      <rect width="200" height="250" fill={c.red} />
      <DotRamp x={0} y={0} w={200} h={160} gap={6} color={c.ink} from={2.4} to={0.3} vertical />
      <path d="M12 250L60 0H86L22 250Z" fill={c.newsprint} opacity="0.3" />
      <path d="M190 250L132 0H158L200 220Z" fill={c.newsprint} opacity="0.3" />
      <Saucer x={160} y={30} s={0.9} />
      <path d="M152 36L140 70H166L162 36Z" fill={c.mustard} opacity="0.3" />
      <Robot />
      <g>
        <path d={cloud(40, 222, 34, 16, 7)} fill={c.mustard} opacity="0.9" />
        <path d={cloud(164, 218, 34, 16, 7)} fill={c.mustard} opacity="0.9" />
      </g>
      <Rooftops x={-4} w={210} ground={250} min={18} max={42} seed={5} towers={0.3} lit={0.4} window={[3, 3]} />
      <g>{[runner(30, 249), runner(46, 248, -1), runner(126, 249), runner(140, 248, -1), runner(170, 249)]}</g>
      <Shout cx={50} cy={34} rx={44} ry={26} lines={["GIANTS OF", "STEEL!"]} size={13} />
    </g>
  );
}
