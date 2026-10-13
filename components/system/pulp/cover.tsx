"use client";
// The Bijou's cover, set together from Pulp's kit as a newsstand pulp would be: a strap line across the top, the corner
// issue box, THE BIJOU extruded in Mustard on Hero Red, and under it Space Fleet's spiral, Weird Space Tales' ringed
// planet, Captain Aero's rocket looping on its trail, a 25 FILMS! blurb, Into the Unknown's scroll, and The Mask's
// searchlit skyline at the foot. It leads /bijou and this system's page; on phones it widens into a banner lettered
// two-tone like American Psycho's masthead; at the foot of every page the same night closes on THE END.
import { burst } from "@/components/artifacts/print";
import { Rocket, Trail } from "./captain-aero";
import { Scroll } from "./into-the-unknown";
import { c, display, ink, Lettering, Newsprint, poster, Screen, sparkle, useSvgId } from "./press";
import { IssueBox, Spiral } from "./space-fleet";
import { Searchlights, Skyline } from "./the-mask";
import { RingedPlanet } from "./weird-space-tales";

const Stars = ({ at }: { at: [number, number, number][] }) => (
  <g fill={c.newsprint}>{at.map(([x, y, r]) => <path key={`${x}-${y}`} d={sparkle(x, y, r)} />)}</g>
);

// A starburst blurb at (x, y) shouting two lines.
function Blurb({ x, y, r, top, bottom, rotate = 0 }: { x: number; y: number; r: number; top: string; bottom: string; rotate?: number }) {
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`}>
      <polygon points={burst(x, y, r, r * 0.72, 14, 0.12)} fill={c.newsprint} {...ink(2.4)} />
      <text x={x} y={y - r * 0.06} textAnchor="middle" fontSize={r * 0.62} fill={c.red} style={display}>{top}</text>
      <text x={x} y={y + r * 0.42} textAnchor="middle" fontSize={r * 0.36} fill={c.ink} style={poster} letterSpacing={r * 0.02}>{bottom}</text>
    </g>
  );
}

export function PulpCover({ count, wide = false, className = "" }: { count: number; wide?: boolean; className?: string }) {
  const id = useSvgId();
  if (wide)
    return (
      <svg aria-hidden viewBox="0 0 360 156" className={className}>
        <defs>
          <Newsprint id={id} rough={0.8} specks={0.2} />
          <Screen id={`${id}-dots`} color={c.ink} r={1.1} gap={4.5} angle={45} />
          <clipPath id={`${id}-sheet`}><rect width="360" height="156" /></clipPath>
        </defs>
        <g filter={`url(#${id})`} clipPath={`url(#${id}-sheet)`}>
          <rect width="360" height="156" fill={c.ink} />
          <Spiral cx={292} cy={70} r={240} n={16} />
          <rect width="360" height="156" fill={`url(#${id}-dots)`} opacity="0.35" />
          <Stars at={[[200, 18, 4], [168, 64, 2.6], [344, 128, 3], [248, 120, 2.4]]} />
          <RingedPlanet cx={296} cy={62} r={30} tilt={-18} body={c.mustard} />
          <Trail a={[150, 132]} c1={[176, 128]} c2={[180, 108]} b={[206, 106]} w={11} />
          <Rocket x={218} y={100} s={0.4} angle={-22} />
          <Lettering x={16} y={34} size={18} text="THE" />
          <Lettering x={14} y={90} size={58} text="BIJOU" width={176} tone={[c.newsprint, c.red]} side={c.sepia} />
          <rect x="-4" y="114" width="368" height="46" fill={c.mustard} {...ink(3)} />
          <text x="180" y="136" dy="0.36em" textAnchor="middle" fontSize="15" fill={c.ink} style={poster} letterSpacing="1">NOW SHOWING · {count} FILMS · 7 GENRES!</text>
        </g>
        <rect x="1.5" y="1.5" width="357" height="153" fill="none" {...ink(3)} />
      </svg>
    );
  return (
    <svg aria-hidden viewBox="0 0 300 420" className={className}>
      <defs>
        <Newsprint id={id} rough={1} specks={0.2} />
        <Screen id={`${id}-dots`} color={c.ink} r={1.3} gap={5} angle={45} />
        <clipPath id={`${id}-sheet`}><rect width="300" height="420" /></clipPath>
      </defs>
      <g filter={`url(#${id})`} clipPath={`url(#${id}-sheet)`}>
        <rect width="300" height="420" fill={c.ink} />
        <Spiral cx={196} cy={236} r={330} n={18} />
        <rect width="300" height="420" fill={`url(#${id}-dots)`} opacity="0.35" />
        <Searchlights beams={[[46, -24], [62, 10], [240, -14], [258, 24]]} y={420} length={380} />
        <Stars at={[[30, 160, 4.6], [150, 150, 3], [282, 250, 4], [120, 196, 2.4], [24, 262, 2.8], [276, 350, 2.6]]} />
        <circle cx="54" cy="206" r="9" fill={c.mustard} {...ink(2)} />
        <circle cx="266" cy="322" r="6.5" fill={c.red} {...ink(2)} />
        <RingedPlanet cx={198} cy={228} r={44} tilt={-18} body={c.mustard} />
        <Trail a={[-12, 228]} c1={[48, 238]} c2={[10, 330]} b={[74, 302]} w={18} />
        <Rocket x={96} y={292} s={0.66} angle={-26} />
        <Skyline x0={-8} x1={308} y={420} h={58} palms={[0.06, 0.93]} />
        <Scroll x={52} y={378} w={196} h={22} text="NOW SHOWING TONIGHT!" size={13} />
        {/* The strap line, the issue box and the masthead. */}
        <rect x="-4" y="-4" width="308" height="30" fill={c.newsprint} {...ink(2.5)} />
        <text x="150" y="13" dy="0.36em" textAnchor="middle" fontSize="12.5" fill={c.ink} style={poster} letterSpacing="0.6">STRANGE FEATURES OF THE SILVER SCREEN!</text>
        <IssueBox x={10} y={36} w={46} no={count} />
        <Lettering x={68} y={56} size={22} text="THE" />
        <Lettering x={64} y={120} size={72} text="BIJOU" width={222} />
        <Blurb x={250} y={160} r={34} top={String(count)} bottom="FILMS!" rotate={12} />
        <g style={poster} textAnchor="end" fill={c.mustard} stroke={c.ink} strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">
          <text x="290" y="290" fontSize="11" fill={c.newsprint} style={display}>featuring</text>
          <text x="290" y="310" fontSize="19" letterSpacing="0.5">SEVEN GENRES</text>
          <text x="290" y="330" fontSize="19" letterSpacing="0.5">OF THRILLS!</text>
        </g>
      </g>
      <rect x="1.5" y="1.5" width="297" height="417" fill="none" {...ink(3)} />
    </svg>
  );
}

// The closing card above every page's footer: the night over the skyline, the rocket flying off, and THE END.
export function TheEnd({ className = "" }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox="0 0 1200 160" className={className}>
      <defs>
        <Newsprint id={id} rough={1} specks={0.2} />
        <Screen id={`${id}-dots`} color={c.red} r={1.2} gap={6} angle={45} />
      </defs>
      <g filter={`url(#${id})`}>
        <rect width="1200" height="160" fill={c.ink} />
        <rect width="1200" height="160" fill={`url(#${id}-dots)`} opacity="0.4" />
        <Searchlights beams={[[140, -18], [330, 14], [880, -16], [1060, 20]]} y={160} length={220} spread={5} />
        <Stars at={[[80, 30, 4], [420, 22, 3], [520, 120, 2.4], [760, 30, 3.4], [1140, 110, 3], [300, 70, 2.4], [1110, 22, 2.6]]} />
        <RingedPlanet cx={190} cy={62} r={26} tilt={-18} body={c.mustard} />
        <Skyline x0={-10} x1={1210} y={160} h={42} seed={7} palms={[0.03, 0.3, 0.71, 0.97]} />
        <Trail a={[760, 110]} c1={[860, 128]} c2={[930, 90]} b={[978, 70]} w={14} />
        <Rocket x={990} y={64} s={0.5} angle={-18} />
        <Lettering x={600} y={104} size={70} text="THE END" width={360} anchor="middle" />
      </g>
    </svg>
  );
}
