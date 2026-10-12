// Ben-Day's drawing kit, from "Meanwhile..." (Mood Board 02, picture 07): the narrator's caption box and the night
// skyline of rooftops, water towers and lit windows. Caption boxes carry the /movies eyebrow, the result status,
// the Saved total and the toast (app/system.css); the skyline closes every Eigakan page under "To be continued…".
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { rand } from "@/components/artifacts/print";

const c = colors(benDay.board);

// A water tower on legs, its foot at (x, y).
function WaterTower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={c.ink} stroke={c.ink} strokeWidth="1.5">
      <path d="M2 0L5 -14M18 0L15 -14M2 0L18 -10M18 0L2 -10" fill="none" />
      <rect x="1" y="-30" width="18" height="16" />
      <path d="M-1 -30L10 -38L21 -30Z" />
      <path d="M1 -24H19M1 -19H19" stroke={c.sepia} />
    </g>
  );
}

// Rooftops across `w`, deterministic so the server render is stable. Lit windows are Mustard.
export function Skyline({ w = 1200, h = 96, seed = 7, className = "" }: { w?: number; h?: number; seed?: number; className?: string }) {
  const rnd = rand(seed);
  const blocks: React.ReactNode[] = [];
  for (let x = 0, i = 0; x < w; i++) {
    const bw = 38 + Math.round(rnd() * 52);
    const bh = 26 + Math.round(rnd() * (h - 70));
    const top = h - bh;
    const lit: React.ReactNode[] = [];
    for (let wy = top + 8; wy < h - 6; wy += 10)
      for (let wx = x + 6; wx < x + bw - 8; wx += 9) if (rnd() < 0.3) lit.push(<rect key={`${wx}-${wy}`} x={wx} y={wy} width="4" height="5" />);
    blocks.push(
      <g key={i}>
        <rect x={x} y={top} width={bw} height={bh} fill={c.ink} />
        <g fill={c.mustard}>{lit}</g>
        {rnd() < 0.35 && <WaterTower x={x + bw * 0.25 + rnd() * bw * 0.3} y={top} s={0.7 + rnd() * 0.3} />}
        {rnd() < 0.3 && <rect x={x + bw - 12} y={top - 9} width="6" height="9" fill={c.ink} />}
      </g>,
    );
    x += bw + (rnd() < 0.3 ? 4 : 0);
  }
  return (
    <svg aria-hidden viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMax slice" className={className}>
      <circle cx={w * 0.78} cy={22} r={14} fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
      {blocks}
    </svg>
  );
}
