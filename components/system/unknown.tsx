// Ben-Day's drawing kit, from "Adventures into the Unknown!" (Mood Board 02, picture 29): a gnarled, dripping monster
// hand reaching out of a ragged sleeve, the reaper's scythe across the top, rings throbbing out of a red ground, and a
// scream: the Horror panel (components/system/genres.tsx).
import { colors } from "@/app/boards";
import { benDay } from "@/app/systems";
import { rand } from "@/components/artifacts/print";
import { Shout } from "./diner";

const c = colors(benDay.board);

type Pt = [number, number];
const line = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");

// Each finger is a polyline from the palm to its tip; the claw continues past the tip.
const fingers: Pt[][] = [
  [[86, 196], [106, 188], [124, 176]],
  [[92, 170], [110, 146], [126, 128]],
  [[82, 160], [94, 130], [104, 106]],
  [[70, 158], [74, 126], [78, 102]],
  [[58, 166], [52, 140], [50, 120]],
];
const palm = "M36 208C32 188 42 166 58 156C74 148 90 150 98 162C104 174 98 192 84 202C70 210 50 214 36 208Z";

function claw([x1, y1]: Pt, [x2, y2]: Pt) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = 13;
  const w = 4.2;
  const tip: Pt = [x2 + Math.cos(a) * len, y2 + Math.sin(a) * len];
  const l: Pt = [x2 + Math.cos(a + Math.PI / 2) * w, y2 + Math.sin(a + Math.PI / 2) * w];
  const r: Pt = [x2 - Math.cos(a + Math.PI / 2) * w, y2 - Math.sin(a + Math.PI / 2) * w];
  const bend: Pt = [tip[0] + Math.cos(a + Math.PI / 2) * 4, tip[1] + Math.sin(a + Math.PI / 2) * 4];
  return `M${l[0].toFixed(1)} ${l[1].toFixed(1)}Q${bend[0].toFixed(1)} ${bend[1].toFixed(1)} ${tip[0].toFixed(1)} ${tip[1].toFixed(1)}L${r[0].toFixed(1)} ${r[1].toFixed(1)}Z`;
}

const drip = (x: number, y: number, len: number, w = 4) => `M${x - w / 2} ${y}V${y + len}A${w / 2} ${w / 2} 0 0 0 ${x + w / 2} ${y + len}V${y}Z`;

// The monster's hand, Mustard flesh mottled Sepia, outlined in Ink with knuckle creases and drips.
export function MonsterHand() {
  const rnd = rand(23);
  const spots = fingers.flatMap((f) => f.slice(0, 2).map(([x, y]) => [x + (rnd() - 0.5) * 6, y + (rnd() - 0.5) * 6] as Pt));
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <g fill="none" stroke={c.ink} strokeWidth="16">{fingers.map((f) => <path key={f[0][0]} d={line(f)} />)}</g>
      <path d={palm} fill={c.ink} stroke={c.ink} strokeWidth="6" />
      <g fill={c.ink}>{fingers.map((f) => <path key={f[0][0]} d={claw(f[1], f[2])} stroke={c.ink} strokeWidth="1" />)}</g>
      <g fill="none" stroke={c.mustard} strokeWidth="10">{fingers.map((f) => <path key={f[0][0]} d={line(f)} />)}</g>
      <path d={palm} fill={c.mustard} />
      <g fill={c.sepia} opacity="0.7">
        {spots.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={2.6 + (i % 3)} ry={1.8 + (i % 2)} />)}
        <ellipse cx="62" cy="186" rx="9" ry="5" /><ellipse cx="82" cy="174" rx="5" ry="3.4" /><ellipse cx="50" cy="200" rx="5" ry="3" />
      </g>
      <g fill="none" stroke={c.ink} strokeWidth="1.8">
        {fingers.map((f) => {
          const [x, y] = f[1];
          return <path key={x} d={`M${x - 4} ${y + 2}q4 -3 8 0M${x - 3.5} ${y + 5}q3.5 -2.5 7 0`} />;
        })}
        <path d="M56 176C64 172 72 174 78 180M48 194C56 196 66 194 72 188" />
      </g>
      <g fill={c.sepia} stroke={c.ink} strokeWidth="1.4">
        <path d={drip(46, 208, 18)} /><path d={drip(66, 206, 26, 4.6)} /><path d={drip(84, 198, 14, 3.6)} />
        <path d={drip(112, 150, 10, 3)} /><path d={drip(72, 128, 9, 3)} />
      </g>
    </g>
  );
}

// The Horror panel.
export function HorrorArt() {
  return (
    <g>
      <rect width="200" height="250" fill={c.red} />
      <g fill="none" stroke={c.sepia} strokeWidth="7" opacity="0.4">
        {Array.from({ length: 14 }, (_, i) => <circle key={i} cx="150" cy="110" r={14 + i * 20} />)}
      </g>
      <path d="M0 250V60C30 80 40 120 36 160" fill="none" stroke={c.ink} strokeWidth="2" opacity="0.4" />
      {/* the reaper's scythe */}
      <rect x="184" y="6" width="9" height="250" fill={c.sepia} stroke={c.ink} strokeWidth="2.4" />
      <path d="M6 76C50 22 130 6 188 22C130 22 66 40 16 90Z" fill={c.newsprint} stroke={c.ink} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M30 70C70 38 120 24 170 22" fill="none" stroke={c.sepia} strokeWidth="1.6" opacity="0.6" />
      <g fill={c.sepia} stroke={c.ink} strokeWidth="1.2">
        <path d={drip(40, 64, 14, 3.4)} /><path d={drip(62, 50, 22, 4)} /><path d={drip(90, 38, 12, 3)} /><path d={drip(118, 30, 18, 3.6)} />
      </g>
      {/* ragged sleeve */}
      <path d="M0 250V206L12 196L18 210L28 192L38 206L50 198L58 214L66 206L74 250Z" fill={c.sepia} stroke={c.ink} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M14 222L24 250M40 216L46 250M58 224L60 250" stroke={c.ink} strokeWidth="1.6" opacity="0.6" />
      <MonsterHand />
      <Shout cx={146} cy={202} rx={46} ry={28} lines={["EEEEK!"]} size={24} />
    </g>
  );
}
