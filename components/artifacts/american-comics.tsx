// Original American-comics artifacts, drawn the way the board's covers were printed:
// heavy black keylines and spot blacks, flat process colors printed slightly out of register,
// Ben-Day dot tints for skin and sky, extruded mastheads, corner boxes, yellowed newsprint.
import { americanComics, colors } from "@/app/boards";
import { Dots, Plate, Print, burst, rand, type Original, type Texture } from "./print";

const c = colors(americanComics);
// Bangers is embedded into the exported SVG files (references/export-originals.tsx).
const bangers = { fontFamily: "Bangers, Impact, sans-serif" };
const tex = (seed: number, extra: Texture = {}): Texture => ({
  grain: 0.5, wear: 0.25, rough: 0.9, age: c.sepia, ageStrength: 0.5, fade: c.newsprint, fadeStrength: 0.12, seed, ...extra,
});
const REG = { dx: 1.8, dy: 1.2 }; // color plates drift against the black keyline

// Masthead lettering with a stacked black extrusion.
function Title({ x, y, text, size, fill, depth = 5, rotate = 0, anchor = "start", stroke = 3 }: {
  x: number; y: number; text: string; size: number; fill: string; depth?: number; rotate?: number; anchor?: "start" | "middle" | "end"; stroke?: number;
}) {
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`} style={bangers} fontSize={size} textAnchor={anchor}>
      {Array.from({ length: depth }, (_, i) => (
        <text key={i} x={x + (depth - i) * 0.9} y={y + (depth - i)} fill={c.ink} stroke={c.ink} strokeWidth={stroke}>{text}</text>
      ))}
      <text x={x} y={y} fill={fill} stroke={c.ink} strokeWidth={stroke} paintOrder="stroke">{text}</text>
    </g>
  );
}

function CornerBox({ x, y, price, issue }: { x: number; y: number; price: string; issue: string }) {
  return (
    <g style={bangers} textAnchor="middle">
      <rect x={x} y={y} width="50" height="70" fill={c.newsprint} stroke={c.ink} strokeWidth="2.5" />
      <text x={x + 25} y={y + 30} fontSize="24" fill={c.ink}>{price}</text>
      <line x1={x + 6} y1={y + 38} x2={x + 44} y2={y + 38} stroke={c.ink} strokeWidth="1.5" />
      <text x={x + 25} y={y + 60} fontSize="18" fill={c.red}>{issue}</text>
    </g>
  );
}

// A comic sheet: newsprint texture, art clipped to the panel, heavy panel border on top.
function Comic({ id, w = 300, h = 420, seed, texture, border = 5, defs, children }: {
  id: string; w?: number; h?: number; seed: number; texture?: Texture; border?: number; defs?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <Print id={id} w={w} h={h} bg={c.newsprint} texture={tex(seed, texture)} defs={<>
      {defs}
      <clipPath id={`${id}-clip`}><rect x="10" y="10" width={w - 20} height={h - 20} /></clipPath>
    </>}>
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
      <rect x="10" y="10" width={w - 20} height={h - 20} fill="none" stroke={c.ink} strokeWidth={border} />
    </Print>
  );
}

function Stars({ n, seed, x0, y0, w, h }: { n: number; seed: number; x0: number; y0: number; w: number; h: number }) {
  const r = rand(seed);
  return <>{Array.from({ length: n }, (_, i) => <circle key={i} cx={x0 + r() * w} cy={y0 + r() * h} r={0.8 + r() * 2.2} fill={i % 4 ? c.newsprint : c.mustard} />)}</>;
}

// ---------------------------------------------------------------------------------------------

export function TearsOfLove() {
  const id = "ac-tears";
  const face = "M120 190 C112 230 116 270 132 300 C146 326 170 336 190 326 C214 314 226 280 228 240 C230 205 214 180 190 172 C160 164 128 172 120 190Z";
  const dress = "M84 410 C92 370 118 352 150 356 H200 C232 352 258 372 266 410Z";
  const neck = "M150 318 L146 360 H202 L196 320Z";
  const lips = "M168 288 Q178 280 190 284 Q196 286 199 290 Q188 300 176 298 Q168 296 168 288Z";
  const drop = "M0 0 C4 7 6 11 0 15 C-6 11 -4 7 0 0Z";
  return (
    <Comic id={id} seed={201} defs={<>
      <Dots id={`${id}-sky`} color={c.cyan} r={2.1} gap={7} bg={c.newsprint} />
      <Dots id={`${id}-skin`} color={c.red} r={1.25} gap={4.4} bg={c.newsprint} />
    </>}>
      <rect x="10" y="10" width="280" height="400" fill={`url(#${id}-sky)`} />
      <path d="M80 410 C60 330 70 230 100 180 C130 130 200 120 240 160 C270 190 272 250 262 300 C256 340 250 380 262 410Z" fill={c.ink} />
      <Plate {...REG}>
        <path d={neck} fill={`url(#${id}-skin)`} />
        <path d={face} fill={`url(#${id}-skin)`} />
        <path d={dress} fill={c.red} />
        <path d={lips} fill={c.red} />
      </Plate>
      <g stroke={c.ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={neck} strokeWidth="3" />
        <path d={face} strokeWidth="3" />
        <path d={dress} strokeWidth="3.5" />
        <path d="M150 360 Q175 376 200 360" strokeWidth="2.5" />
      </g>
      <path d="M108 232 C104 190 126 160 170 156 C204 154 228 170 236 198 C216 186 198 188 186 198 C170 182 140 184 128 210 C120 222 114 234 108 232Z" fill={c.ink} />
      <g fill="none" strokeLinecap="round">
        <path d="M138 168 C158 160 186 160 208 168" stroke={c.cyan} strokeWidth="3" />
        <path d="M128 186 C144 176 166 174 184 180" stroke={c.cyan} strokeWidth="2" />
        <path d="M244 200 C252 240 250 290 240 340" stroke={c.cyan} strokeWidth="3" />
        <path d="M92 250 C90 300 92 350 100 390" stroke={c.cyan} strokeWidth="2.5" />
      </g>
      <g stroke={c.ink} fill="none" strokeLinecap="round">
        <path d="M144 220 Q160 210 178 218" strokeWidth="3" />
        <path d="M146 234 Q160 244 176 234" strokeWidth="3.5" />
        {[[150, 238, 146, 247], [157, 241, 155, 251], [164, 241, 165, 251], [171, 238, 175, 247]].map(([a, b, d, e]) => <line key={a} x1={a} y1={b} x2={d} y2={e} strokeWidth="2" />)}
        <path d="M194 230 Q204 238 214 230" strokeWidth="3" />
        <line x1="200" y1="234" x2="198" y2="242" strokeWidth="1.8" />
        <line x1="208" y1="234" x2="210" y2="242" strokeWidth="1.8" />
        <path d="M188 246 Q192 262 181 266" strokeWidth="2.5" />
        <path d={lips} strokeWidth="2" />
        <path d="M170 290 Q184 292 197 290" strokeWidth="1.5" />
      </g>
      {[[150, 258, 1], [155, 282, 0.8], [206, 254, 0.9]].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d={drop} fill={c.newsprint} stroke={c.ink} strokeWidth="1.6" />
          <path d="M-1 5 C0 8 1 10 -1 12" stroke={c.cyan} strokeWidth="1.5" fill="none" />
        </g>
      ))}
      <ellipse cx="122" cy="68" rx="104" ry="46" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <circle cx="198" cy="128" r="8" fill={c.newsprint} stroke={c.ink} strokeWidth="2.5" />
      <circle cx="210" cy="146" r="5" fill={c.newsprint} stroke={c.ink} strokeWidth="2" />
      <text textAnchor="middle" style={bangers} fontSize="17" fill={c.ink} letterSpacing="0.5">
        <tspan x="122" y="56">OH, CHET... I SHOULD</tspan>
        <tspan x="122" y="76">HAVE TOLD YOU</tspan>
        <tspan x="122" y="96">THE TRUTH!</tspan>
      </text>
      <rect x="18" y="380" width="128" height="24" fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
      <text x="82" y="398" textAnchor="middle" style={bangers} fontSize="15" fill={c.ink}>TEARS OF LOVE #12</text>
    </Comic>
  );
}

export function WeirdSpaceTales() {
  const id = "ac-space";
  return (
    <Comic id={id} h={440} seed={211} defs={<>
      <Dots id={`${id}-shade`} color={c.red} r={1.6} gap={5} />
      <Dots id={`${id}-ground`} color={c.red} r={1.8} gap={6} bg={c.mustard} />
      <clipPath id={`${id}-front`}><rect x="140" y="190" width="180" height="40" /></clipPath>
      <clipPath id={`${id}-planet`}><circle cx="226" cy="196" r="46" /></clipPath>
    </>}>
      <rect x="10" y="10" width="280" height="420" fill={c.ink} />
      <Stars n={60} seed={4} x0={14} y0={130} w={272} h={230} />
      <Plate {...REG}>
        <circle cx="60" cy="176" r="17" fill={c.newsprint} />
        <g transform="rotate(-18 226 196)">
          <ellipse cx="226" cy="196" rx="82" ry="17" fill="none" stroke={c.mustard} strokeWidth="7" />
        </g>
        <circle cx="226" cy="196" r="46" fill={c.red} />
        <g clipPath={`url(#${id}-planet)`}>
          {[170, 188, 210].map((y) => <rect key={y} x="170" y={y} width="120" height="8" fill={c.mustard} transform="rotate(-18 226 196)" />)}
          <circle cx="250" cy="214" r="44" fill={`url(#${id}-shade)`} />
        </g>
        <g transform="rotate(-18 226 196)">
          <ellipse cx="226" cy="196" rx="82" ry="17" fill="none" stroke={c.mustard} strokeWidth="7" clipPath={`url(#${id}-front)`} />
        </g>
        <path d="M14 316 C70 260 130 340 196 286" stroke={c.mustard} strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M14 316 C70 260 130 340 196 286" stroke={c.red} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M10 360 L46 330 L70 350 L104 318 L132 352 L170 334 L206 356 L246 326 L290 352 V430 H10Z" fill={`url(#${id}-ground)`} />
      </Plate>
      <g stroke={c.ink} fill="none" strokeWidth="3">
        <circle cx="60" cy="176" r="17" />
        <circle cx="54" cy="172" r="4" strokeWidth="1.5" />
        <circle cx="66" cy="182" r="3" strokeWidth="1.5" />
        <circle cx="226" cy="196" r="46" />
        <path d="M10 360 L46 330 L70 350 L104 318 L132 352 L170 334 L206 356 L246 326 L290 352" strokeWidth="3.5" />
        {[[70, 398, 20, 6], [190, 404, 28, 7], [250, 380, 14, 4]].map(([x, y, rx, ry]) => <ellipse key={x} cx={x} cy={y} rx={rx} ry={ry} fill={c.red} strokeWidth="2.5" />)}
      </g>
      <g transform="translate(176 270) rotate(42)">
        <Plate {...REG}>
          <path d="M0 -72 C18 -52 22 -12 20 40 H-20 C-22 -12 -18 -52 0 -72Z" fill={c.red} />
          <path d="M-20 20 L-42 58 L-20 46Z M20 20 L42 58 L20 46Z" fill={c.cyan} />
          <path d="M-14 42 Q0 96 14 42Z" fill={c.mustard} />
          <path d="M-7 42 Q0 74 7 42Z" fill={c.red} />
          <path d="M8 -50 C14 -30 15 0 13 36 H20 C22 -12 18 -52 0 -72Z" fill={c.ink} opacity="0.85" />
        </Plate>
        <g stroke={c.ink} strokeWidth="3" fill="none" strokeLinejoin="round">
          <path d="M0 -72 C18 -52 22 -12 20 40 H-20 C-22 -12 -18 -52 0 -72Z" />
          <path d="M-20 20 L-42 58 L-20 46Z M20 20 L42 58 L20 46Z" />
        </g>
        {[-32, -8].map((y) => <circle key={y} cx="0" cy={y} r="7" fill={c.cyan} stroke={c.ink} strokeWidth="2.5" />)}
      </g>
      <g transform="translate(232 372)" stroke={c.ink} strokeWidth="2">
        <circle cx="0" cy="-22" r="9" fill={c.cyan} opacity="0.6" />
        <rect x="-6" y="-14" width="12" height="18" rx="3" fill={c.newsprint} />
        <path d="M-4 4 l-3 12 M4 4 l3 12" />
      </g>
      <polygon points={burst(66, 262, 50, 36, 14, 0.25)} fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
      <text textAnchor="middle" style={bangers} fontSize="14" fill={c.red}>
        <tspan x="66" y="256">TERROR FROM</tspan>
        <tspan x="66" y="272">THE RINGS!</tspan>
      </text>
      <rect x="10" y="10" width="280" height="104" fill={c.red} />
      <rect x="10" y="114" width="280" height="16" fill={c.mustard} stroke={c.ink} strokeWidth="2" />
      <text x="150" y="127" textAnchor="middle" style={bangers} fontSize="12" fill={c.ink} letterSpacing="1.5">STRANGE STORIES OF TOMORROW!</text>
      <CornerBox x={18} y={18} price="10¢" issue="No.7" />
      <Title x={78} y={56} text="WEIRD SPACE" size={36} fill={c.mustard} depth={4} />
      <Title x={80} y={104} text="TALES" size={54} fill={c.newsprint} depth={6} rotate={-3} />
    </Comic>
  );
}

export function Krakoom() {
  const id = "ac-krakoom";
  const r = rand(9);
  const debris = Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 12 + r() * 0.3, d = 100 + r() * 30;
    return { x: 150 + Math.cos(a) * d, y: 150 + Math.sin(a) * d, a: (a * 180) / Math.PI, s: 5 + r() * 6 };
  });
  return (
    <Comic id={id} w={300} h={300} seed={221} defs={<>
      <Dots id={`${id}-bg`} color={c.cyan} r={2} gap={7} bg={c.newsprint} />
      <Dots id={`${id}-smoke`} color={c.ink} r={1.5} gap={5} bg={c.newsprint} />
    </>}>
      <rect x="10" y="10" width="280" height="280" fill={`url(#${id}-bg)`} />
      {debris.map((d, i) => (
        <g key={i}>
          <line x1={d.x - Math.cos((d.a * Math.PI) / 180) * 20} y1={d.y - Math.sin((d.a * Math.PI) / 180) * 20} x2={d.x} y2={d.y} stroke={c.ink} strokeWidth="1.5" />
          <rect x={d.x - d.s / 2} y={d.y - d.s / 2} width={d.s} height={d.s * 0.7} fill={c.ink} transform={`rotate(${d.a * 2} ${d.x} ${d.y})`} />
        </g>
      ))}
      {[[60, 236, 30], [236, 224, 26], [70, 80, 22], [240, 74, 24]].map(([x, y, rr]) => (
        <g key={x} stroke={c.ink} strokeWidth="3" fill={`url(#${id}-smoke)`}>
          <circle cx={x} cy={y} r={rr} /><circle cx={x + rr * 0.7} cy={y - rr * 0.4} r={rr * 0.7} /><circle cx={x - rr * 0.6} cy={y - rr * 0.5} r={rr * 0.6} />
        </g>
      ))}
      <Plate {...REG}>
        <polygon points={burst(150, 150, 132, 82, 13, 0.35)} fill={c.red} />
        <polygon points={burst(150, 150, 104, 66, 13, 0.3)} fill={c.red} />
        <polygon points={burst(150, 150, 78, 50, 11, 0.3)} fill={c.mustard} />
        <circle cx="150" cy="150" r="30" fill={c.newsprint} />
      </Plate>
      <polygon points={burst(150, 150, 132, 82, 13, 0.35)} fill="none" stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
      <polygon points={burst(150, 150, 104, 66, 13, 0.3)} fill="none" stroke={c.ink} strokeWidth="2" strokeLinejoin="round" />
      <Title x={150} y={172} text="KRAKOOM!" size={60} fill={c.mustard} depth={6} rotate={-10} anchor="middle" stroke={3.5} />
    </Comic>
  );
}

export function MeanwhileCity() {
  const id = "ac-meanwhile";
  const r = rand(15);
  const towers = Array.from({ length: 12 }, (_, i) => ({ x: 120 + i * 26 + r() * 6, w: 22 + r() * 12, h: 70 + r() * 110 }));
  return (
    <Comic id={id} w={420} h={260} seed={231} defs={<>
      <Dots id={`${id}-sky`} color={c.cyan} r={1.9} gap={6} bg={c.cyan} />
      <Dots id={`${id}-moon`} color={c.mustard} r={1.5} gap={5} bg={c.newsprint} />
    </>}>
      <rect x="10" y="10" width="400" height="240" fill={`url(#${id}-sky)`} />
      <Plate {...REG}>
        <polygon points="300,250 132,12 214,12" fill={c.mustard} opacity="0.55" />
        <circle cx="344" cy="64" r="38" fill={`url(#${id}-moon)`} />
        <ellipse cx="172" cy="34" rx="46" ry="20" fill={c.mustard} />
      </Plate>
      <circle cx="344" cy="64" r="38" fill="none" stroke={c.ink} strokeWidth="3" />
      <ellipse cx="172" cy="34" rx="46" ry="20" fill="none" stroke={c.ink} strokeWidth="2.5" />
      <path d="M172 18 l5 10 11 1 -8 7 3 11 -11 -6 -11 6 3 -11 -8 -7 11 -1Z" fill={c.ink} />
      {towers.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={250 - t.h} width={t.w} height={t.h} fill={c.ink} />
          {Array.from({ length: Math.floor(t.h / 14) }, (_, j) => (r() > 0.5 ? <rect key={j} x={t.x + 4 + (j % 2) * 8} y={256 - t.h + j * 14} width="4" height="6" fill={c.mustard} /> : null))}
        </g>
      ))}
      <path d="M10 140 H108 V250 H10Z" fill={c.ink} />
      <path d="M4 136 H116 V146 H4Z" fill={c.ink} />
      <path d="M64 80 C90 86 110 78 130 64 C118 88 124 104 134 122 C108 110 94 112 80 116Z" fill={c.ink} />
      <path d="M130 64 C118 88 124 104 134 122" stroke={c.cyan} strokeWidth="2.2" fill="none" />
      <path d="M62 80 H80 L84 106 L78 136 H72 L71 112 H69 L68 136 H62 L58 106Z" fill={c.ink} />
      <path d="M62 82 L50 96 L58 106 L63 100Z M80 82 L92 96 L84 106 L79 100Z" fill={c.ink} />
      <path d="M58 106 L62 84 M84 106 L80 84" stroke={c.cyan} strokeWidth="1.2" />
      <circle cx="71" cy="71" r="8.5" fill={c.ink} />
      <path d="M66 70 h4 M73 70 h4" stroke={c.newsprint} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="18" y="18" width="190" height="44" fill={c.mustard} stroke={c.ink} strokeWidth="3" />
      <text style={bangers} fontSize="16" fill={c.ink} letterSpacing="0.5">
        <tspan x="28" y="37">MEANWHILE, HIGH ABOVE</tspan>
        <tspan x="28" y="55">METRO CITY...</tspan>
      </text>
    </Comic>
  );
}

export function CaptainComet() {
  const id = "ac-comet";
  return (
    <Comic id={id} h={440} seed={241} defs={<>
      <Dots id={`${id}-sky`} color={c.cyan} r={1.8} gap={6} bg={c.newsprint} />
      <Dots id={`${id}-skin`} color={c.red} r={1.1} gap={4} bg={c.newsprint} />
    </>}>
      <rect x="10" y="10" width="280" height="420" fill={`url(#${id}-sky)`} />
      {Array.from({ length: 22 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 22;
        return <polygon key={i} points={`170,240 ${170 + Math.cos(a) * 320},${240 + Math.sin(a) * 320} ${170 + Math.cos(a + 0.08) * 320},${240 + Math.sin(a + 0.08) * 320}`} fill={c.newsprint} opacity="0.85" />;
      })}
      {[[16, 54, 70], [74, 40, 60], [118, 26, 80], [150, 48, 46], [204, 36, 70], [244, 30, 50]].map(([x, w, h]) => (
        <rect key={x} x={x} y={430 - h} width={w} height={h} fill={c.cyan} stroke={c.ink} strokeWidth="2.5" />
      ))}
      <Plate {...REG}>
        <path d="M10 430 C60 380 100 340 150 300" stroke={c.mustard} strokeWidth="26" fill="none" strokeLinecap="round" />
        <path d="M10 430 C60 380 100 340 150 300" stroke={c.red} strokeWidth="10" fill="none" strokeLinecap="round" />
      </Plate>
      <g transform="translate(172 252) rotate(38) scale(1.25)">
        <Plate {...REG}>
          <path d="M-40 -10 Q-74 80 -54 170 Q0 136 54 170 Q74 80 40 -10Z" fill={c.red} />
          <path d="M-16 58 L-20 150 H-4 L2 60Z M16 58 L20 150 H4 L-2 60Z" fill={c.cyan} />
          <path d="M-20 130 H-4 V152 H-22Z M4 130 H20 L22 152 H4Z" fill={c.red} />
          <path d="M-30 -40 Q-34 20 -20 60 H20 Q34 20 30 -40Z" fill={c.cyan} />
          <rect x="-21" y="50" width="42" height="9" fill={c.mustard} />
          <circle cx="0" cy="-8" r="14" fill={c.mustard} />
          <path d="M18 -40 L34 -44 L48 -114 L32 -118Z" fill={c.cyan} />
          <path d="M-28 -36 L-44 -32 L-50 28 L-36 30Z" fill={c.cyan} />
          <circle cx="40" cy="-124" r="12" fill={c.red} />
          <circle cx="-43" cy="34" r="9" fill={c.red} />
          <circle cx="0" cy="-62" r="20" fill={`url(#${id}-skin)`} />
        </Plate>
        <g stroke={c.ink} strokeWidth="2.6" fill="none" strokeLinejoin="round">
          <path d="M-40 -10 Q-74 80 -54 170 Q0 136 54 170 Q74 80 40 -10Z" />
          <path d="M-16 58 L-20 150 H-4 L2 60Z M16 58 L20 150 H4 L-2 60Z" />
          <path d="M-30 -40 Q-34 20 -20 60 H20 Q34 20 30 -40Z" />
          <path d="M18 -40 L34 -44 L48 -114 L32 -118Z" />
          <path d="M-28 -36 L-44 -32 L-50 28 L-36 30Z" />
          <circle cx="40" cy="-124" r="12" />
          <circle cx="-43" cy="34" r="9" />
          <circle cx="0" cy="-8" r="14" />
          <circle cx="0" cy="-62" r="20" />
        </g>
        <path d="M0 -20 l3.5 7 8 0.8 -6 5.4 1.8 7.8 -7.3 -4.2 -7.3 4.2 1.8 -7.8 -6 -5.4 8 -0.8Z" fill={c.red} stroke={c.ink} strokeWidth="1.2" />
        <path d="M-20 -66 Q0 -76 20 -66 L18 -58 Q0 -64 -18 -58Z" fill={c.ink} />
        <path d="M-20 -70 Q-18 -86 0 -84 Q18 -86 20 -70 Q10 -78 0 -76 Q-10 -78 -20 -70Z" fill={c.ink} />
        <path d="M8 -42 Q16 -18 30 -38 Q24 0 20 60 H30 Q34 20 30 -40Z" fill={c.ink} opacity="0.9" />
      </g>
      <polygon points={burst(232, 352, 46, 34, 14, 0.2)} fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
      <text textAnchor="middle" style={bangers} fontSize="16" fill={c.red}>
        <tspan x="232" y="348">FIRST</tspan>
        <tspan x="232" y="366">ISSUE!</tspan>
      </text>
      <rect x="10" y="10" width="280" height="96" fill={c.cyan} />
      <CornerBox x={18} y={18} price="12¢" issue="No.1" />
      <Title x={82} y={44} text="CAPTAIN" size={28} fill={c.mustard} depth={3} />
      <Title x={80} y={98} text="COMET" size={62} fill={c.red} depth={6} rotate={-4} />
      <rect x="10" y="400" width="280" height="30" fill={c.red} stroke={c.ink} strokeWidth="2.5" />
      <text x="150" y="421" textAnchor="middle" style={bangers} fontSize="17" fill={c.newsprint} letterSpacing="1">THE MAN WHO OUTRAN A STAR!</text>
    </Comic>
  );
}

export function XRaySpecsAd() {
  const id = "ac-xray";
  const copy = ["SCIENTIFIC OPTICAL PRINCIPLE", "REALLY WORKS! Put on the specs", "and see the bones in your hand,", "the yolk inside an egg, and other", "astonishing sights! Amaze your", "friends — be the life of the party!"];
  const bones = [[-24, 4], [-8, 0], [8, 0], [24, 6]];
  return (
    <Comic id={id} seed={251} texture={{ wear: 0.2 }} border={3} defs={<>
      <Dots id={`${id}-tint`} color={c.red} r={1.4} gap={5} bg={c.newsprint} />
    </>}>
      <text x="150" y="52" textAnchor="middle" style={bangers} fontSize="34" fill={c.ink}>AMAZING</text>
      <Title x={150} y={92} text="X-RAY SPECS!" size={42} fill={c.red} depth={3} anchor="middle" />
      <g transform="translate(118 148)">
        <Plate {...REG}>
          {[-38, 38].map((x) => <circle key={x} cx={x} cy="0" r="30" fill={c.mustard} />)}
        </Plate>
        {[-38, 38].map((x) => (
          <g key={x} fill="none" stroke={c.ink}>
            {[30, 23, 16, 9, 3].map((r, i) => <circle key={r} cx={x} cy="0" r={r} strokeWidth={i ? 2 : 5} />)}
          </g>
        ))}
        <path d="M-8 -6 Q0 -14 8 -6" stroke={c.ink} strokeWidth="5" fill="none" />
        <path d="M-68 -6 L-96 -16 M68 -6 L96 -16" stroke={c.ink} strokeWidth="5" />
        {[-1, 1].map((d) => [0, 1, 2].map((i) => (
          <path key={`${d}${i}`} d={`M${d * 30} ${34 + i * 2} l${d * 8} 10 l${-d * 6} 4 l${d * 8} 10`} stroke={c.red} strokeWidth="2.5" fill="none" transform={`rotate(${d * (10 + i * 20)})`} />
        )))}
      </g>
      <g transform="translate(232 214)">
        <path d="M-34 0 Q-38 -60 -26 -66 Q-16 -60 -16 -30 V-74 Q-8 -84 0 -74 V-30 V-78 Q8 -88 16 -78 V-28 V-70 Q24 -78 32 -68 V0 Q34 34 0 44 Q-30 40 -34 0Z" fill={`url(#${id}-tint)`} stroke={c.ink} strokeWidth="2.5" />
        {bones.map(([x, o]) => (
          <g key={x} fill={c.newsprint} stroke={c.ink} strokeWidth="1.5">
            <rect x={x - 3.5} y={-70 + o} width="7" height="20" rx="3.5" />
            <rect x={x - 3.5} y={-46 + o} width="7" height="18" rx="3.5" />
            <rect x={x - 3.5} y={-24 + o * 0.5} width="7" height="22" rx="3.5" />
          </g>
        ))}
        <rect x="-26" y="4" width="52" height="16" rx="6" fill={c.newsprint} stroke={c.ink} strokeWidth="1.5" />
      </g>
      <text fontFamily="'Arial Narrow',Arial,sans-serif" fontWeight="700" fontSize="10.5" fill={c.ink}>
        {copy.map((l, i) => <tspan key={i} x="28" y={252 + i * 13}>{l}</tspan>)}
      </text>
      <polygon points={burst(240, 302, 40, 30, 16, 0.15)} fill={c.red} stroke={c.ink} strokeWidth="2.5" />
      <text textAnchor="middle" style={bangers} fill={c.newsprint}>
        <tspan x="240" y="298" fontSize="14">ONLY</tspan>
        <tspan x="240" y="318" fontSize="22">$1</tspan>
      </text>
      <rect x="22" y="340" width="256" height="60" fill="none" stroke={c.ink} strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="30" y="337" fontSize="12" fill={c.ink}>✂</text>
      <text x="150" y="356" textAnchor="middle" style={bangers} fontSize="13" fill={c.red} letterSpacing="1">RUSH COUPON — NOVELTY HOUSE, DEPT. 7, CHICAGO</text>
      {["NAME", "ADDRESS", "CITY · STATE"].map((l, i) => (
        <g key={l}>
          <text x="32" y={372 + i * 11} fontFamily="Arial,sans-serif" fontWeight="700" fontSize="7" fill={c.ink}>{l}</text>
          <line x1="90" y1={372 + i * 11} x2="268" y2={372 + i * 11} stroke={c.ink} strokeWidth="0.8" />
        </g>
      ))}
    </Comic>
  );
}

export function RingRing() {
  const id = "ac-ring";
  const handset = "M64 140 Q70 112 96 116 L204 116 Q230 112 236 140 Q238 152 224 152 Q214 150 212 140 H88 Q86 150 76 152 Q62 152 64 140Z";
  const base = "M70 214 Q76 162 110 152 H190 Q224 162 230 214 Q232 230 216 232 H84 Q68 230 70 214Z";
  const coil = Array.from({ length: 14 }, (_, i) => `q4 -7 8 0`).join(" ");
  return (
    <Comic id={id} w={300} h={300} seed={261} defs={<>
      <Dots id={`${id}-bg`} color={c.red} r={2.2} gap={7} bg={c.mustard} />
      <Dots id={`${id}-shade`} color={c.ink} r={1.2} gap={4} />
      <clipPath id={`${id}-base`}><path d={base} /></clipPath>
    </>}>
      <rect x="10" y="10" width="280" height="280" fill={`url(#${id}-bg)`} />
      <polygon points={burst(96, 64, 70, 48, 14, 0.35)} fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      <text textAnchor="middle" style={bangers} fill={c.red} fontSize="30" transform="rotate(-8 96 64)">
        <tspan x="96" y="60">RING!</tspan>
        <tspan x="98" y="88" fontSize="22">RING!</tspan>
      </text>
      <path d={`M226 214 c18 10 26 30 10 46 ${coil}`} stroke={c.ink} strokeWidth="2" fill="none" />
      <Plate {...REG}>
        <path d={base} fill={c.red} />
        <g transform="rotate(-8 150 134) translate(0 -14)"><path d={handset} fill={c.red} /></g>
      </Plate>
      <g clipPath={`url(#${id}-base)`}><rect x="176" y="150" width="60" height="90" fill={`url(#${id}-shade)`} /></g>
      <path d={base} fill="none" stroke={c.ink} strokeWidth="3.5" />
      <circle cx="150" cy="198" r="34" fill={c.newsprint} stroke={c.ink} strokeWidth="3" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (-Math.PI / 2) + (i * Math.PI * 1.6) / 9;
        return <circle key={i} cx={150 + Math.cos(a) * 23} cy={198 + Math.sin(a) * 23} r="5" fill={c.mustard} stroke={c.ink} strokeWidth="1.8" />;
      })}
      <circle cx="150" cy="198" r="10" fill={c.red} stroke={c.ink} strokeWidth="2" />
      <g transform="rotate(-8 150 134) translate(0 -14)">
        <path d={handset} fill="none" stroke={c.ink} strokeWidth="3.5" />
        <path d="M110 122 H190" stroke={c.newsprint} strokeWidth="3" strokeLinecap="round" />
      </g>
      {[[52, 112, -1], [248, 96, 1]].map(([x, y, d]) => [0, 1, 2].map((i) => (
        <path key={`${x}${i}`} d={`M${x + d * i * 8} ${y - 14 - i * 4} q${d * 8} ${14 + i * 4} 0 ${28 + i * 8}`} stroke={c.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )))}
    </Comic>
  );
}

export function RobotInvasion() {
  const id = "ac-robot";
  const r = rand(33);
  return (
    <Comic id={id} h={440} seed={271} defs={<>
      <Dots id={`${id}-sky`} color={c.red} r={2} gap={6.5} bg={c.red} />
      <Dots id={`${id}-metal`} color={c.cyan} r={1.5} gap={5} bg={c.cyan} />
    </>}>
      <rect x="10" y="10" width="280" height="420" fill={`url(#${id}-sky)`} />
      <Plate {...REG}>
        <polygon points="142,166 30,400 86,400" fill={c.mustard} />
        <polygon points="178,166 120,400 176,400" fill={c.mustard} />
      </Plate>
      <path d="M104 222 Q70 240 66 292" stroke={c.ink} strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M104 222 Q70 240 66 292" stroke={c.cyan} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M216 222 Q252 200 262 158" stroke={c.ink} strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M216 222 Q252 200 262 158" stroke={c.cyan} strokeWidth="18" fill="none" strokeLinecap="round" />
      {[[66, 296, 1], [262, 152, -1]].map(([x, y, d]) => (
        <g key={x} stroke={c.ink} strokeWidth="3" fill={c.mustard}>
          <path d={`M${x - 10} ${y} q-10 ${d * 18} 2 ${d * 30} l6 ${-d * 8} q-8 ${-d * 10} 0 ${-d * 22}Z`} />
          <path d={`M${x + 10} ${y} q10 ${d * 18} -2 ${d * 30} l-6 ${-d * 8} q8 ${-d * 10} 0 ${-d * 22}Z`} />
        </g>
      ))}
      <Plate {...REG}>
        <rect x="120" y="318" width="30" height="64" fill={`url(#${id}-metal)`} />
        <rect x="170" y="318" width="30" height="64" fill={`url(#${id}-metal)`} />
        <rect x="104" y="206" width="112" height="116" rx="10" fill={`url(#${id}-metal)`} />
        <rect x="120" y="140" width="80" height="58" rx="8" fill={`url(#${id}-metal)`} />
        <rect x="150" y="196" width="20" height="12" fill={c.sepia} />
      </Plate>
      <g stroke={c.ink} strokeWidth="3" fill="none">
        <rect x="120" y="318" width="30" height="64" />
        <rect x="170" y="318" width="30" height="64" />
        <rect x="104" y="206" width="112" height="116" rx="10" />
        <rect x="120" y="140" width="80" height="58" rx="8" />
      </g>
      <path d="M192 206 H206 Q216 206 216 216 V312 Q216 322 206 322 H192Z" fill={c.ink} />
      <path d="M186 140 H192 Q200 140 200 148 V190 Q200 198 192 198 H186Z" fill={c.ink} />
      <line x1="160" y1="140" x2="160" y2="116" stroke={c.ink} strokeWidth="3" />
      <circle cx="160" cy="112" r="6" fill={c.red} stroke={c.ink} strokeWidth="2.5" />
      {[142, 178].map((x) => (
        <g key={x}>
          <circle cx={x} cy="164" r="11" fill={c.mustard} stroke={c.ink} strokeWidth="3" />
          <circle cx={x} cy="164" r="4.5" fill={c.red} />
        </g>
      ))}
      <rect x="136" y="180" width="48" height="12" fill={c.ink} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={140 + i * 9} y="182" width="3" height="8" fill={c.newsprint} />)}
      <rect x="126" y="222" width="62" height="48" fill={c.newsprint} stroke={c.ink} strokeWidth="2.5" />
      {[[140, 238, c.red], [160, 238, c.mustard], [178, 238, c.red]].map(([x, y, col]) => <circle key={x as number} cx={x as number} cy={y as number} r="5" fill={col as string} stroke={c.ink} strokeWidth="1.5" />)}
      <circle cx="150" cy="258" r="8" fill="none" stroke={c.ink} strokeWidth="2" />
      <line x1="150" y1="258" x2="156" y2="252" stroke={c.ink} strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => ({ x: 10 + i * 32 + r() * 6, w: 26 + r() * 8, h: 30 + r() * 40 })).map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={430 - b.h} width={b.w} height={b.h} fill={c.cyan} stroke={c.ink} strokeWidth="2.5" />
          {[0, 1].map((j) => <rect key={j} x={b.x + 5 + j * 10} y={436 - b.h} width="5" height="7" fill={c.mustard} stroke={c.ink} strokeWidth="1" />)}
        </g>
      ))}
      {[[46, 382], [62, 386], [244, 386]].map(([x, y]) => (
        <g key={x} stroke={c.ink} strokeWidth="2.2" fill="none" strokeLinecap="round">
          <circle cx={x} cy={y - 14} r="3.5" fill={c.ink} />
          <path d={`M${x} ${y - 10} l-2 10 M${x - 2} ${y} l-5 8 M${x - 2} ${y} l5 8 M${x - 1} ${y - 7} l-7 -3 M${x - 1} ${y - 7} l7 -6`} />
          <path d={`M${x + 8} ${y - 12} h6 M${x + 8} ${y - 6} h8`} strokeWidth="1.2" />
        </g>
      ))}
      <rect x="10" y="10" width="280" height="98" fill={c.ink} />
      <CornerBox x={18} y={22} price="10¢" issue="No.3" />
      <Title x={80} y={64} text="ROBOT" size={54} fill={c.mustard} depth={5} />
      <Title x={84} y={100} text="INVASION!" size={34} fill={c.red} depth={3} />
      <rect x="160" y="396" width="122" height="26" fill={c.mustard} stroke={c.ink} strokeWidth="2.5" />
      <text x="221" y="414" textAnchor="middle" style={bangers} fontSize="13" fill={c.ink}>THEY CAME FROM PLANET X!</text>
    </Comic>
  );
}

export const originals: Original[] = [
  { title: "Tears of Love", note: "Romance", Component: TearsOfLove },
  { title: "Weird Space Tales", note: "Sci-fi", Component: WeirdSpaceTales },
  { title: "Krakoom!", note: "SFX", Component: Krakoom },
  { title: "Meanwhile...", note: "Panel", Component: MeanwhileCity },
  { title: "Captain Comet #1", note: "Hero", Component: CaptainComet },
  { title: "X-Ray Specs Ad", note: "Mail order", Component: XRaySpecsAd },
  { title: "Ring! Ring!", note: "Pop art", Component: RingRing },
  { title: "Robot Invasion", note: "Pulp", Component: RobotInvasion },
];
