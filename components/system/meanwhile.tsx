// Ben-Day's drawing kit, from "Meanwhile..." (Mood Board 02, picture 07, with the departing man from picture 01): the
// narrator's caption box, the night skyline of rooftops, water towers and lit windows, and the noir street where a man
// in a fedora walks off under a streetlamp in the rain, the Thriller panel. Caption boxes carry the /movies eyebrow,
// the result status, the Saved total and the toast (app/system.css); the skyline closes every Eigakan page under
// "To be continued…".
import { useId } from "react";
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { rand } from "@/components/artifacts/print";
import { DotRamp } from "./pow";

const c = colors(benDay.board);

// A water tower on legs, its foot at (x, y).
export function WaterTower({ x, y, s = 1, fill = c.ink }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} stroke={fill} strokeWidth="1.5">
      <path d="M2 0L5 -14M18 0L15 -14M2 0L18 -10M18 0L2 -10" fill="none" />
      <rect x="1" y="-30" width="18" height="16" />
      <path d="M-1 -30L10 -38L21 -30Z" />
      <path d="M1 -24H19M1 -19H19" stroke={c.sepia} />
    </g>
  );
}

// A row of buildings from x to x + w standing on `ground`, lit windows in Mustard. Deterministic for stable renders.
export function Rooftops({ x = 0, w, ground, min = 20, max = 60, seed = 7, towers = 0.35, fill = c.ink, lit = 0.3, window = [4, 5] }: {
  x?: number; w: number; ground: number; min?: number; max?: number; seed?: number; towers?: number; fill?: string; lit?: number; window?: [number, number];
}) {
  const rnd = rand(seed);
  const blocks: React.ReactNode[] = [];
  const [ww, wh] = window;
  for (let bx = x, i = 0; bx < x + w; i++) {
    const bw = Math.round(min * 0.8 + rnd() * max * 0.7);
    const bh = Math.round(min + rnd() * (max - min));
    const top = ground - bh;
    const lights: React.ReactNode[] = [];
    for (let wy = top + 6; wy < ground - 4; wy += wh * 2)
      for (let wx = bx + 4; wx < bx + bw - ww - 2; wx += ww * 2.2) if (rnd() < lit) lights.push(<rect key={`${wx}-${wy}`} x={wx} y={wy} width={ww} height={wh} />);
    blocks.push(
      <g key={i}>
        <rect x={bx} y={top} width={bw} height={bh} fill={fill} />
        <g fill={c.mustard}>{lights}</g>
        {rnd() < towers && <WaterTower x={bx + bw * 0.3} y={top} s={0.4 + rnd() * 0.25} fill={fill} />}
      </g>,
    );
    bx += bw;
  }
  return <g>{blocks}</g>;
}

// Rooftops across `w` under a Mustard moon: the strip that closes each page.
export function Skyline({ w = 1200, h = 96, seed = 7, className = "", children }: {
  w?: number; h?: number; seed?: number; className?: string; children?: React.ReactNode;
}) {
  return (
    <svg aria-hidden viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMax slice" className={className}>
      <circle cx={w * 0.78} cy={22} r={14} fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
      {children}
      <Rooftops w={w} ground={h} min={26} max={52} seed={seed} lit={0.3} window={[4, 5]} />
    </svg>
  );
}

// A man in a fedora and trench coat walking away, suitcase in hand; his feet at (x, y), about 90 tall at s = 1.
export function Walker({ x, y, s = 1, fill = c.ink, rim = c.mustard }: { x: number; y: number; s?: number; fill?: string; rim?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g fill={fill}>
        <path d="M-9 -86C-8 -96 8 -96 9 -86Z" />
        <ellipse cx="0" cy="-85" rx="13" ry="3.2" />
        <ellipse cx="0" cy="-78" rx="5.5" ry="6.5" />
        <path d="M-15 -70C-11 -74 11 -74 15 -70L21 -16C10 -12 -10 -12 -21 -16Z" />
        <path d="M-12 -16L-10 0H-3L-1 -14ZM2 -14L6 -1H13L11 -16Z" />
        <path d="M-12 1H-1V-2H-12ZM5 0H15V-3H5Z" />
        <rect x="19" y="-30" width="16" height="13" rx="1.5" />
        <path d="M24 -30V-34H30V-30" fill="none" stroke={fill} strokeWidth="1.8" />
        <path d="M14 -66L22 -34" stroke={fill} strokeWidth="6" strokeLinecap="round" />
      </g>
      <g fill="none" stroke={rim} strokeLinecap="round">
        <path d="M-15 -68L-20 -18" strokeWidth="1.6" />
        <path d="M-11 -86C-8 -94 -2 -95 2 -95" strokeWidth="1.3" />
        <path d="M19.5 -29V-18" strokeWidth="1.2" />
      </g>
    </g>
  );
}

// A streetlamp with its pool of light, the post's foot at (x, y).
export function Streetlamp({ x, y, h = 96 }: { x: number; y: number; h?: number }) {
  const top = y - h;
  return (
    <g>
      <path d={`M${x - 5} ${top + 12}H${x + 5}L${x + 40} ${y}H${x - 40}Z`} fill={c.mustard} opacity="0.2" />
      <circle cx={x} cy={top + 6} r="24" fill={c.mustard} opacity="0.2" />
      <circle cx={x} cy={top + 6} r="13" fill={c.mustard} opacity="0.35" />
      <g fill={c.ink} stroke={c.ink} strokeLinejoin="round">
        <rect x={x - 2.5} y={top + 14} width="5" height={h - 14} />
        <path d={`M${x - 7} ${y}H${x + 7}L${x + 4} ${y - 10}H${x - 4}Z`} />
        <path d={`M${x - 8} ${top + 14}H${x + 8}L${x + 5} ${top + 10}H${x - 5}Z`} />
        <path d={`M${x - 7} ${top - 4}H${x + 7}L${x + 9} ${top + 10}H${x - 9}Z`} fill={c.mustard} strokeWidth="2.2" />
        <path d={`M${x - 8} ${top - 4}L${x} ${top - 12}L${x + 8} ${top - 4}Z`} />
        <path d={`M${x} ${top - 12}V${top - 17}`} strokeWidth="2" />
      </g>
    </g>
  );
}

// The Thriller panel: a rainy night street, the skyline beyond, a man walking out of the lamplight.
export function ThrillerArt() {
  const uid = `noir-${useId().replace(/:/g, "")}`;
  const rnd = rand(31);
  const rain = Array.from({ length: 46 }, (_, i) => {
    const rx = rnd() * 220 - 10;
    const ry = rnd() * 250;
    return <path key={i} d={`M${rx.toFixed(1)} ${ry.toFixed(1)}l-3 11`} />;
  });
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-moon`}><circle cx="150" cy="40" r="17" /></clipPath>
      </defs>
      <rect width="200" height="250" fill={c.ink} />
      <DotRamp x={0} y={4} w={200} h={150} gap={5} color={c.sepia} from={0.2} to={2.2} vertical />
      <circle cx="150" cy="40" r="17" fill={c.mustard} stroke={c.sepia} strokeWidth="2" />
      <g clipPath={`url(#${uid}-moon)`} fill={c.sepia} opacity="0.5">
        <circle cx="144" cy="34" r="4" /><circle cx="156" cy="46" r="5" /><circle cx="158" cy="32" r="2.5" />
      </g>
      <path d="M104 50C122 44 140 52 160 46C172 42 186 46 200 44V54C180 56 160 60 140 58C126 57 114 56 104 54Z" fill={c.ink} />
      <g fill={c.sepia}>
        <rect x="84" y="66" width="14" height="100" />
        <path d="M84 66L91 46L98 66Z" />
        <path d="M91 46V36" stroke={c.sepia} strokeWidth="1.6" />
      </g>
      <Rooftops x={30} w={190} ground={166} min={34} max={80} seed={12} towers={0.45} fill={c.sepia} lit={0.32} window={[3, 4]} />
      <path d="M36 166H200V250H36Z" fill={c.sepia} />
      <path d="M36 166L200 186" stroke={c.newsprint} strokeWidth="1.6" opacity="0.5" />
      <path d="M36 172L200 196" stroke={c.ink} strokeWidth="1" opacity="0.4" />
      <g stroke={c.mustard} strokeLinecap="round" opacity="0.75">
        <path d="M58 206V246M63 210V240M53 212V232" strokeWidth="2.2" />
        <path d="M150 196V214M156 198V208M176 200V220" strokeWidth="1.4" />
      </g>
      <rect x="0" y="40" width="36" height="210" fill={c.sepia} />
      <path d="M36 40V250" stroke={c.ink} strokeWidth="2" />
      <g fill={c.mustard} stroke={c.ink} strokeWidth="2">
        <rect x="8" y="96" width="14" height="18" /><rect x="8" y="138" width="14" height="18" />
      </g>
      <path d="M8 105H22M15 96V114M8 147H22M15 138V156" stroke={c.ink} strokeWidth="1.5" />
      <Streetlamp x={58} y={204} h={96} />
      <Walker x={132} y={226} s={1.04} />
      <g opacity="0.45" transform="translate(0 452) scale(1 -1)">
        <Walker x={132} y={226} s={1.04} rim={c.ink} />
      </g>
      <g stroke={c.newsprint} strokeWidth="1" strokeLinecap="round" opacity="0.45">{rain}</g>
    </g>
  );
}
