// Original Japanese-retro artifacts, drawn the way the board's references are printed:
// Showa screen prints and riso posters — flat inks, stippled shading, solid cast shadows,
// worn ink on cream stock, katakana/mincho titles, vertical copy, English fine print, hanko seals.
import { colors, japaneseRetro } from "@/app/catalog-boards";
import { Dots, Fine, Hatch, Print, Stipple, VText, burst, rand, type Original, type Texture } from "./print";

const c = colors(japaneseRetro);
const gothic = "'Hiragino Sans','Noto Sans JP','Noto Sans CJK JP','Yu Gothic',sans-serif";
const mincho = "'Hiragino Mincho ProN','Noto Serif JP','Noto Serif CJK JP','Yu Mincho',serif";
const latin = "'Helvetica Neue',Arial,sans-serif";
const tex = (seed: number, extra: Texture = {}): Texture => ({ grain: 0.45, wear: 0.35, rough: 1.1, age: c.sumi, ageStrength: 0.35, seed, ...extra });

// Red seal stamp; characters run top-to-bottom, columns right-to-left.
function Hanko({ x, y, s = 30, chars, color = c.hinomaru, paper = c.washi }: { x: number; y: number; s?: number; chars: string; color?: string; paper?: string }) {
  const cols = chars.length > 2 ? 2 : 1;
  const per = Math.ceil(chars.length / cols);
  const fs = (s * 0.78) / per;
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.1} fill={color} />
      <rect x={x + s * 0.07} y={y + s * 0.07} width={s * 0.86} height={s * 0.86} rx={s * 0.06} fill="none" stroke={paper} strokeWidth={s * 0.04} />
      {Array.from({ length: cols }, (_, ci) =>
        chars.slice(ci * per, ci * per + per).split("").map((ch, ri) => (
          <text key={`${ci}${ri}`} x={x + s - (s / cols) * (ci + 0.5)} y={y + s * 0.11 + fs * (ri + 0.86)} textAnchor="middle" fontSize={fs} fontFamily={mincho} fontWeight="900" fill={paper}>{ch}</text>
        )),
      )}
    </g>
  );
}

// Red-crowned crane in flight, facing left, ~235 x 125 at s=1.
function Crane({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const ink = c.sumi;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
      <path d="M-5 0 C-25 -30 -55 -55 -95 -62 C-80 -50 -70 -38 -66 -28 C-80 -30 -92 -26 -100 -20 C-70 -12 -40 -2 -15 8Z" fill={c.washi} stroke={ink} strokeWidth="2" />
      <path d="M-95 -62 C-80 -50 -70 -38 -66 -28 C-80 -30 -92 -26 -100 -20 C-92 -34 -90 -46 -95 -62Z" fill={ink} />
      <path d="M40 6 L112 16 M40 10 L110 24" stroke={ink} strokeWidth="2.5" />
      <path d="M-40 0 C-20 -12 20 -12 48 0 C30 12 -10 14 -40 6Z" fill={c.washi} stroke={ink} strokeWidth="2" />
      <path d="M30 -2 C44 -4 56 0 64 6 C50 9 40 8 30 6Z" fill={ink} />
      <path d="M-38 2 C-58 -2 -78 -10 -96 -12" stroke={ink} strokeWidth="5" fill="none" />
      <circle cx="-98" cy="-12" r="4.5" fill={c.washi} stroke={ink} strokeWidth="1.5" />
      <circle cx="-98" cy="-15.5" r="2.6" fill={c.hinomaru} />
      <path d="M-102 -11 L-122 -6" stroke={c.koke} strokeWidth="2.5" />
      <path d="M0 -4 C10 -40 40 -80 90 -100 C78 -82 74 -66 74 -54 C88 -60 100 -60 112 -56 C85 -36 50 -12 20 4Z" fill={c.washi} stroke={ink} strokeWidth="2" />
      <path d="M90 -100 C78 -82 74 -66 74 -54 C88 -60 100 -60 112 -56 C104 -72 98 -86 90 -100Z" fill={ink} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${18 + i * 13} ${-12 - i * 12} l14 -3`} stroke={ink} strokeWidth="1" />)}
    </g>
  );
}

function Palm({ x, y, h, lean, s = 1, trunk = c.sumi, leaf = c.koke }: { x: number; y: number; h: number; lean: number; s?: number; trunk?: string; leaf?: string }) {
  const tx = x + lean, ty = y - h;
  return (
    <g>
      <path d={`M${x} ${y} Q${x + lean * 0.2} ${y - h * 0.55} ${tx} ${ty}`} stroke={trunk} strokeWidth={7 * s} fill="none" strokeLinecap="round" />
      {[-170, -145, -120, -95, -70, -45, -20, 5, 25].map((a) => (
        <path key={a} d="M0 0 Q26 -16 54 6 Q26 -5 0 0Z" fill={leaf} transform={`translate(${tx} ${ty}) rotate(${a}) scale(${s})`} />
      ))}
    </g>
  );
}

function Frame({ inset = 14, w = 300, h = 420, color = c.sumi }: { inset?: number; w?: number; h?: number; color?: string }) {
  return <rect x={inset} y={inset} width={w - inset * 2} height={h - inset * 2} fill="none" stroke={color} strokeWidth="1.5" />;
}

const clipFrame = (id: string, w = 300, h = 420, inset = 14) => (
  <clipPath id={`${id}-clip`}><rect x={inset} y={inset} width={w - inset * 2} height={h - inset * 2} /></clipPath>
);

// ---------------------------------------------------------------------------------------------

export function SunriseCrane() {
  const id = "jr-sunrise";
  const rows: [number, number][] = [[18, -9], [0, 0], [36, 0], [18, 9], [0, 18], [36, 18], [18, 27]];
  return (
    <Print id={id} bg={c.washi} texture={tex(11)} defs={<>
      <pattern id={`${id}-sea`} width="36" height="18" patternUnits="userSpaceOnUse">
        <rect width="36" height="18" fill={c.ai} />
        {rows.map(([x, y]) => [17, 13.5, 10, 6.5, 3].map((r, i) => <circle key={`${x}${y}${r}`} cx={x} cy={y} r={r} fill={i % 2 ? c.ai : c.washi} />))}
      </pattern>
      <Stipple id={`${id}-st`} density={0.32} seed={4} />
    </>}>
      <rect x="14" y="14" width="272" height="392" fill={c.kinari} />
      <circle cx="150" cy="196" r="98" fill={c.hinomaru} />
      <circle cx="150" cy="196" r="98" fill={c.sumi} opacity="0.5" filter={`url(#${id}-st)`} />
      <rect x="14" y="286" width="272" height="120" fill={`url(#${id}-sea)`} />
      <rect x="14" y="282" width="272" height="7" fill={c.ai} />
      <Crane x={160} y={196} s={0.95} />
      <text x="28" y="68" fontFamily={mincho} fontWeight="900" fontSize="50" fill={c.sumi} letterSpacing="2">日の出</text>
      <Fine x={30} y={84} lines={["SUNRISE OVER THE EASTERN SEA", "東海汽船 · MCMLXVIII"]} size={6.5} fill={c.sumi} font={latin} weight={700} spacing={1.2} />
      <VText x={268} y={30} text="朝の光と共に" size={13} fill={c.sumi} font={mincho} />
      <rect x="234" y="356" width="44" height="42" fill={c.washi} />
      <Hanko x={240} y={361} s={32} chars="旭" />
      <Frame />
    </Print>
  );
}

export function MatchboxLabel() {
  const id = "jr-match";
  return (
    <Print id={id} w={300} h={300} bg={c.kinari} texture={tex(21, { wear: 0.5 })} defs={<>
      <Dots id={`${id}-dots`} color={c.hinomaru} r={1.3} gap={4.2} bg={c.washi} />
      <Stipple id={`${id}-st`} density={0.3} seed={9} />
    </>}>
      <rect x="12" y="12" width="276" height="276" fill="none" stroke={c.sumi} strokeWidth="4" />
      <rect x="22" y="22" width="256" height="256" fill="none" stroke={c.sumi} strokeWidth="1.2" />
      <rect x="22" y="22" width="256" height="32" fill={c.hinomaru} />
      <text x="150" y="44" textAnchor="middle" fontFamily={latin} fontWeight="800" fontSize="14" letterSpacing="5" fill={c.washi}>SAFETY MATCHES</text>
      <circle cx="150" cy="140" r="72" fill={`url(#${id}-dots)`} stroke={c.sumi} strokeWidth="2.5" />
      <circle cx="150" cy="140" r="60" fill={c.hinomaru} stroke={c.sumi} strokeWidth="1.5" />
      <circle cx="150" cy="140" r="60" fill={c.sumi} opacity="0.45" filter={`url(#${id}-st)`} />
      <path d="M96 176 Q120 168 150 178 Q180 168 204 176 L204 186 Q150 176 96 186Z" fill={c.ai} />
      <Crane x={156} y={146} s={0.46} />
      {[["安", 40], ["全", 260]].map(([ch, x]) => (
        <g key={ch}>
          <circle cx={x} cy="76" r="12" fill={c.washi} stroke={c.sumi} strokeWidth="1.5" />
          <text x={x} y="81" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="14" fill={c.sumi}>{ch}</text>
        </g>
      ))}
      <text x="150" y="248" textAnchor="middle" fontFamily={gothic} fontWeight="900" fontSize="38" fill={c.sumi} letterSpacing="2">鶴マッチ</text>
      <text x="150" y="268" textAnchor="middle" fontFamily={mincho} fontSize="10" fill={c.sumi} letterSpacing="3">大阪燐寸製造所 · OSAKA</text>
    </Print>
  );
}

export function ShinkansenPoster() {
  const id = "jr-shinkansen";
  return (
    <Print id={id} bg={c.washi} texture={tex(31)} defs={<>
      {clipFrame(id)}
      <Hatch id={`${id}-paddy`} color={c.kinari} width={1.2} gap={6} angle={0} />
      <Stipple id={`${id}-st`} density={0.28} seed={12} />
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="14" width="272" height="392" fill={c.kinari} />
        <circle cx="226" cy="122" r="40" fill={c.hinomaru} />
        <path d="M14 276 V252 L100 162 Q120 150 140 162 L286 256 V276Z" fill={c.ai} />
        <path d="M14 276 V252 L100 162 Q120 150 140 162 L286 256 V276Z" fill={c.sumi} opacity="0.45" filter={`url(#${id}-st)`} />
        <path d="M100 162 Q120 150 140 162 L158 174 L146 172 L136 186 L124 172 L112 186 L102 174 L85 178Z" fill={c.washi} />
        <rect x="40" y="206" width="70" height="7" rx="3.5" fill={c.washi} />
        <rect x="170" y="218" width="90" height="7" rx="3.5" fill={c.washi} />
        <rect x="14" y="262" width="272" height="40" fill={c.koke} />
        <rect x="14" y="262" width="272" height="40" fill={`url(#${id}-paddy)`} opacity="0.5" />
        {[288, 298, 308, 318].map((y, i) => <line key={y} x1="14" y1={y} x2={50 + i * 8} y2={y} stroke={c.washi} strokeWidth="1.5" />)}
        <path d="M-10 284 H186 C232 284 266 300 286 322 C276 332 250 336 200 336 H-10Z" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
        <rect x="-10" y="292" width="196" height="12" fill={c.ai} />
        {Array.from({ length: 14 }, (_, i) => <rect key={i} x={2 + i * 13} y="292" width="1.6" height="12" fill={c.washi} />)}
        <path d="M196 290 C220 290 238 296 252 306 L214 306Z" fill={c.ai} />
        <path d="M-10 318 H226 C248 318 264 322 278 328 C264 334 240 336 200 336 H-10Z" fill={c.ai} />
        <circle cx="282" cy="323" r="3" fill={c.kinari} />
        <path d="M70 284 l9 -13 l9 13 M150 284 l9 -13 l9 13" stroke={c.sumi} strokeWidth="1.5" fill="none" />
        <rect x="-10" y="336" width="300" height="20" fill={c.sumi} />
        <line x1="14" y1="339" x2="286" y2="339" stroke={c.washi} strokeWidth="1.2" />
        {Array.from({ length: 28 }, (_, i) => <rect key={i} x={16 + i * 10} y="342" width="5" height="3" fill={c.sumi} />)}
        <rect x="14" y="356" width="272" height="50" fill={c.washi} />
      </g>
      <text x="28" y="56" fontFamily={mincho} fontWeight="900" fontSize="27" fill={c.sumi} letterSpacing="1">東海道新幹線</text>
      <Fine x={30} y={72} lines={["TOKAIDO SHINKANSEN — TOKYO ⇄ SHIN-OSAKA — 1964"]} size={6} fill={c.sumi} font={latin} weight={700} spacing={1} />
      <text x="26" y="394" fontFamily={gothic} fontWeight="900" fontSize="28" fill={c.hinomaru}>ひかり号</text>
      <Fine x={150} y={376} lines={["夢の超特急 · 4時間", "TOKYO 6:00 → OSAKA 10:00", "特急料金 ¥2,480"]} size={6.5} fill={c.sumi} font={gothic} weight={700} />
      <Hanko x={244} y={364} s={34} chars="特急" />
      <Frame />
    </Print>
  );
}

export function CreamSoda() {
  const id = "jr-soda";
  const r = rand(4);
  const bubbles = Array.from({ length: 26 }, () => [112 + r() * 76, 200 + r() * 150, 1.5 + r() * 3.5]);
  const glass = "M90 158 L105 360 Q106 372 117 372 H183 Q194 372 195 360 L210 158Z";
  return (
    <Print id={id} bg={c.washi} texture={tex(41)} defs={<>
      {clipFrame(id)}
      <clipPath id={`${id}-glass`}><path d={glass} /></clipPath>
      <pattern id={`${id}-check`} width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill={c.washi} /><rect width="12" height="12" fill={c.hinomaru} /><rect x="12" y="12" width="12" height="12" fill={c.hinomaru} />
      </pattern>
      <Stipple id={`${id}-st`} density={0.3} seed={3} />
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="14" width="272" height="392" fill={c.kinari} />
        <circle cx="150" cy="214" r="114" fill={c.hinomaru} />
        <rect x="14" y="350" width="272" height="56" fill={`url(#${id}-check)`} />
        <ellipse cx="166" cy="372" rx="62" ry="9" fill={c.sumi} opacity="0.5" />
      </g>
      <path d="M118 60 L142 220" stroke={c.washi} strokeWidth="9" />
      <path d="M118 60 L142 220" stroke={c.hinomaru} strokeWidth="9" strokeDasharray="10 10" />
      <path d={glass} fill={c.washi} opacity="0.55" />
      <g clipPath={`url(#${id}-glass)`}>
        <rect x="80" y="176" width="140" height="200" fill={c.koke} />
        <rect x="160" y="176" width="60" height="200" fill={c.ai} opacity="0.35" filter={`url(#${id}-st)`} />
        {bubbles.map(([x, y, rad], i) => <circle key={i} cx={x} cy={y} r={rad} fill="none" stroke={c.washi} strokeWidth="1.2" />)}
        <rect x="112" y="182" width="30" height="26" rx="5" fill={c.washi} opacity="0.55" transform="rotate(-12 127 195)" />
        <rect x="150" y="188" width="32" height="26" rx="5" fill={c.washi} opacity="0.5" transform="rotate(10 166 201)" />
        <rect x="98" y="190" width="7" height="160" rx="3.5" fill={c.washi} opacity="0.75" />
      </g>
      <path d={glass} fill="none" stroke={c.sumi} strokeWidth="2.5" />
      <path d="M86 172 Q88 126 150 118 Q212 126 214 172 Q198 180 184 172 Q168 182 150 174 Q132 182 116 172 Q102 180 86 172Z" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <path d="M170 128 Q204 136 212 168 Q198 176 184 170 Q190 150 170 128Z" fill={c.kinari} opacity="0.8" filter={`url(#${id}-st)`} />
      <path d="M168 96 Q174 78 190 68" stroke={c.sumi} strokeWidth="2" fill="none" />
      <circle cx="166" cy="106" r="12" fill={c.hinomaru} stroke={c.sumi} strokeWidth="2" />
      <circle cx="161" cy="101" r="3" fill={c.washi} />
      <text x="26" y="56" fontFamily={mincho} fontWeight="900" fontSize="24" fill={c.sumi}>喫茶 純</text>
      <Fine x={28} y={72} lines={["CREAM SODA", "KISSATEN JUN · SINCE 1972"]} size={6} fill={c.sumi} font={latin} weight={700} spacing={1.2} />
      <VText x={262} y={36} text="クリームソーダ" size={24} fill={c.sumi} font={gothic} weight={900} />
      <circle cx="56" cy="318" r="24" fill={c.washi} stroke={c.sumi} strokeWidth="1.5" />
      <text x="56" y="322" textAnchor="middle" fontFamily={gothic} fontWeight="900" fontSize="13" fill={c.hinomaru}>350円</text>
      <Frame />
    </Print>
  );
}

export function TokyoTower() {
  const id = "jr-tower";
  const L: [number, number][] = [[146, 70], [142, 120], [134, 170], [124, 215], [110, 265], [92, 315], [72, 368]];
  const R = L.map(([x, y]) => [300 - x, y] as [number, number]);
  const outline = `M${L.map((p) => p.join(" ")).join(" L")} L${[...R].reverse().map((p) => p.join(" ")).join(" L")}Z`;
  const r = rand(17);
  const buildings = Array.from({ length: 13 }, (_, i) => ({ x: 14 + i * 22, w: 18 + r() * 8, h: 30 + r() * 60 }));
  return (
    <Print id={id} bg={c.washi} texture={tex(51)} defs={<>
      {clipFrame(id)}
      <clipPath id={`${id}-tower`}><path d={outline} /></clipPath>
      <Stipple id={`${id}-st`} density={0.35} seed={21} />
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="14" width="272" height="392" fill={c.ai} />
        <circle cx="150" cy="170" r="92" fill={c.washi} />
        <circle cx="150" cy="170" r="92" fill={c.kinari} filter={`url(#${id}-st)`} />
        <line x1="150" y1="22" x2="150" y2="72" stroke={c.hinomaru} strokeWidth="3.5" />
        {[34, 50].map((y) => <rect key={y} x="148" y={y} width="4" height="6" fill={c.washi} />)}
        <path d={outline} fill={c.hinomaru} />
        <g clipPath={`url(#${id}-tower)`}>
          {[96, 146, 192, 240, 290, 340].map((y) => <rect key={y} x="60" y={y} width="180" height="11" fill={c.washi} />)}
          {L.slice(0, -1).map((p, i) => (
            <g key={i} stroke={c.sumi} strokeWidth="0.9" opacity="0.8">
              <line x1={p[0]} y1={p[1]} x2={R[i + 1][0]} y2={R[i + 1][1]} />
              <line x1={R[i][0]} y1={R[i][1]} x2={L[i + 1][0]} y2={L[i + 1][1]} />
            </g>
          ))}
        </g>
        <path d="M112 368 Q150 298 188 368Z" fill={c.ai} />
        <rect x="114" y="208" width="72" height="16" fill={c.washi} stroke={c.sumi} strokeWidth="1.2" />
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={118 + i * 8.6} y="212" width="5" height="8" fill={c.ai} />)}
        <rect x="136" y="114" width="28" height="10" fill={c.washi} stroke={c.sumi} strokeWidth="1" />
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={406 - b.h} width={b.w} height={b.h} fill={c.sumi} />
            {Array.from({ length: Math.floor(b.h / 12) }, (_, j) => (r() > 0.45 ? <rect key={j} x={b.x + 4} y={412 - b.h + j * 12} width="3" height="4" fill={c.kinari} /> : null))}
            {Array.from({ length: Math.floor(b.h / 12) }, (_, j) => (r() > 0.55 ? <rect key={`b${j}`} x={b.x + 11} y={412 - b.h + j * 12} width="3" height="4" fill={c.kinari} /> : null))}
          </g>
        ))}
      </g>
      <VText x={42} y={36} text="東京タワー" size={30} fill={c.washi} font={mincho} weight={900} />
      <Fine x={272} y={34} anchor="end" lines={["TOKYO TOWER", "333 M · 1958", "芝公園 · MINATO"]} size={6.5} fill={c.washi} font={latin} weight={700} spacing={1.2} />
      <Hanko x={244} y={250} s={32} chars="東京" />
      <Frame />
    </Print>
  );
}

export function CityPopRecord() {
  const id = "jr-citypop";
  const ripples = Array.from({ length: 11 }, (_, i) => 192 + i * 8.5);
  return (
    <Print id={id} w={300} h={300} bg={c.washi} texture={tex(61, { wear: 0.25 })} defs={<>
      {clipFrame(id, 300, 300)}
      <clipPath id={`${id}-sky`}><rect x="52" y="14" width="234" height="148" /></clipPath>
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        {[[14, 60, c.ai], [74, 34, c.hinomaru], [108, 28, c.hinomaru], [136, 26, c.kinari]].map(([y, hh, col]) => (
          <rect key={y as number} x="52" y={y as number} width="234" height={hh as number} fill={col as string} />
        ))}
        <g clipPath={`url(#${id}-sky)`}>
          <circle cx="170" cy="162" r="52" fill={c.washi} />
          {[[132, 3], [142, 4], [151, 5]].map(([y, hh]) => <rect key={y} x="110" y={y} width="120" height={hh} fill={c.kinari} />)}
        </g>
        <rect x="200" y="98" width="86" height="102" fill={c.washi} />
        <rect x="258" y="98" width="28" height="102" fill={c.ai} opacity="0.6" />
        {[112, 136, 160].map((y) => <rect key={y} x="208" y={y} width="44" height="12" fill={c.koke} />)}
        <rect x="52" y="162" width="234" height="18" fill={c.washi} />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={52 + i * 20} y1="174" x2={52 + i * 20} y2="180" stroke={c.kinari} strokeWidth="1" />)}
        <rect x="52" y="180" width="234" height="106" fill={c.ai} />
        {ripples.map((y, i) => (
          <path key={y} d={`M${52 + (i % 2) * 14} ${y} q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0`} stroke={c.washi} strokeWidth="1.4" fill="none" opacity={0.9 - i * 0.07} />
        ))}
        <Palm x={96} y={232} h={168} lean={26} s={1.5} trunk={c.sumi} leaf={c.sumi} />
        <Palm x={138} y={226} h={118} lean={-16} s={1.15} trunk={c.sumi} leaf={c.sumi} />
        <rect x="14" y="14" width="38" height="272" fill={c.hinomaru} />
      </g>
      <VText x={33} y={28} text="シティポップ名盤" size={15} fill={c.washi} font={gothic} weight={900} />
      <VText x={33} y={210} text="税込二八〇〇円" size={7.5} fill={c.washi} font={gothic} />
      <text x="64" y="42" fontFamily={latin} fontWeight="800" fontSize="20" fill={c.washi} letterSpacing="1.5">MIDNIGHT POOL</text>
      <text x="65" y="58" fontFamily={gothic} fontWeight="700" fontSize="10" fill={c.hinomaru} letterSpacing="2">真夜中のプール</text>
      <text x="278" y="278" textAnchor="end" fontFamily={latin} fontWeight="700" fontSize="8" fill={c.washi} letterSpacing="3">YUKI HAYASE · 1983</text>
      <Frame w={300} h={300} />
    </Print>
  );
}

export function KissatenMenu() {
  const id = "jr-menu";
  const items = [["ブレンド珈琲", "350"], ["クリームソーダ", "450"], ["ナポリタン", "680"], ["プリン・ア・ラ・モード", "520"], ["ホットケーキ", "480"]];
  return (
    <Print id={id} bg={c.kinari} texture={tex(71)} defs={<>
      <clipPath id={`${id}-cup`}><path d="M74 96 H146 Q144 134 110 136 Q76 134 74 96Z" /></clipPath>
      <Stipple id={`${id}-st`} density={0.32} seed={6} />
    </>}>
      <rect x="14" y="14" width="272" height="392" fill="none" stroke={c.sumi} strokeWidth="3" />
      <rect x="21" y="21" width="258" height="378" fill="none" stroke={c.sumi} strokeWidth="1" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${100 + i * 10} 86 q-6 -10 0 -20 t0 -20`} stroke={c.sumi} strokeWidth="1.6" fill="none" opacity="0.7" />)}
      <ellipse cx="112" cy="138" rx="50" ry="10" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <path d="M146 104 Q166 104 161 119 Q156 130 140 127" stroke={c.sumi} strokeWidth="4" fill="none" />
      <path d="M74 96 H146 Q144 134 110 136 Q76 134 74 96Z" fill={c.washi} />
      <g clipPath={`url(#${id}-cup)`}>
        <rect x="70" y="108" width="80" height="6" fill={c.ai} />
        <rect x="120" y="96" width="30" height="42" fill={c.sumi} opacity="0.45" filter={`url(#${id}-st)`} />
      </g>
      <path d="M74 96 H146 Q144 134 110 136 Q76 134 74 96Z" fill="none" stroke={c.sumi} strokeWidth="2" />
      <ellipse cx="110" cy="96" rx="36" ry="7" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <ellipse cx="110" cy="97" rx="30" ry="4.5" fill={c.sumi} />
      <ellipse cx="206" cy="140" rx="42" ry="8" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <path d="M178 137 L187 100 Q206 94 225 100 L234 137Z" fill={c.kinari} stroke={c.sumi} strokeWidth="2" />
      <path d="M210 100 L216 137 H234 L225 100Z" fill={c.hinomaru} opacity="0.5" filter={`url(#${id}-st)`} />
      <path d="M187 100 Q206 94 225 100 L223 110 Q215 105 211 112 Q205 105 199 113 Q193 105 188 110Z" fill={c.sumi} />
      <path d="M194 98 Q196 84 206 84 Q218 84 218 98Z" fill={c.washi} stroke={c.sumi} strokeWidth="1.5" />
      <circle cx="206" cy="80" r="6" fill={c.hinomaru} stroke={c.sumi} strokeWidth="1.5" />
      <text x="150" y="192" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="34" fill={c.sumi}>喫茶 純</text>
      <text x="150" y="212" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill={c.hinomaru}>Kissaten Jun — since 1972</text>
      <line x1="56" y1="226" x2="244" y2="226" stroke={c.sumi} />
      {items.map(([n, p], i) => (
        <g key={n} fontFamily={gothic} fontSize="13" fill={c.sumi}>
          <text x="44" y={256 + i * 28}>{n}</text>
          <text x="256" y={256 + i * 28} textAnchor="end">{p}円</text>
          <line x1="44" y1={263 + i * 28} x2="256" y2={263 + i * 28} stroke={c.sumi} strokeDasharray="1.5 3.5" />
        </g>
      ))}
      <Fine x={44} y={392} lines={["営業 8:00 — 22:00 · 定休日 水曜"]} size={7} fill={c.sumi} font={gothic} weight={700} />
      <Hanko x={238} y={370} s={26} chars="純" />
    </Print>
  );
}

export function SentoNoren() {
  const id = "jr-sento";
  return (
    <Print id={id} bg={c.kinari} texture={tex(81)} defs={<>
      <Hatch id={`${id}-planks`} color={c.sumi} width={0.8} gap={11} angle={0} />
      <Stipple id={`${id}-st`} density={0.22} seed={14} />
    </>}>
      <rect x="14" y="96" width="272" height="294" fill={c.sumi} />
      <rect x="14" y="96" width="272" height="294" fill={`url(#${id}-planks)`} opacity="0.35" transform="rotate(90 150 243)" />
      <path d="M8 98 Q82 98 112 62 Q150 24 188 62 Q218 98 292 98 V110 H8Z" fill={c.sumi} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${24 + i * 4} ${101 - i * 4} Q${86 + i * 2} ${101 - i * 4} ${114 + i * 1} ${66 - i * 3}`} stroke={c.washi} strokeWidth="0.8" fill="none" opacity="0.5" />)}
      <rect x="98" y="116" width="104" height="30" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <text x="150" y="139" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="21" fill={c.sumi} letterSpacing="6">松の湯</text>
      <rect x="40" y="158" width="220" height="232" fill={c.sumi} />
      {[0, 1, 2].map((i) => <path key={i} d={`M${90 + i * 60} 384 q-12 -18 0 -36 t0 -36`} stroke={c.washi} strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />)}
      <rect x="34" y="152" width="232" height="7" rx="3" fill={c.kinari} stroke={c.sumi} strokeWidth="1" />
      {[[44, c.ai], [152, c.hinomaru]].map(([x, col]) => (
        <g key={x as number}>
          <rect x={x as number} y="159" width="50" height="150" fill={col as string} />
          <rect x={(x as number) + 54} y="159" width="50" height="150" fill={col as string} />
          <rect x={(x as number) + 34} y="159" width="36" height="150" fill={c.sumi} opacity="0.35" filter={`url(#${id}-st)`} />
          <text x={(x as number) + 52} y="262" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="86" fill={c.washi}>ゆ</text>
        </g>
      ))}
      <g transform="translate(262 112)">
        <line x1="0" y1="0" x2="0" y2="10" stroke={c.sumi} strokeWidth="2" />
        <rect x="-9" y="10" width="18" height="5" fill={c.sumi} />
        <ellipse cx="0" cy="32" rx="12" ry="17" fill={c.hinomaru} />
        <rect x="-9" y="48" width="18" height="5" fill={c.sumi} />
        <text x="0" y="37" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="13" fill={c.washi}>湯</text>
      </g>
      <rect x="14" y="390" width="272" height="16" fill={c.washi} />
      <Fine x={150} y={401} anchor="middle" lines={["大人 四十円 · 小人 十五円 · OPEN 15:00 — 24:00"]} size={7} fill={c.sumi} font={gothic} weight={700} />
    </Print>
  );
}

export function RedFujiStamp() {
  const id = "jr-stamp";
  const perfX = Array.from({ length: 17 }, (_, i) => 14 + i * 14.5);
  const perfY = Array.from({ length: 21 }, (_, i) => 14 + i * 14.6);
  return (
    <Print id={id} w={260} h={320} bg={c.kinari} texture={tex(91, { wear: 0.25 })} defs={<>
      <clipPath id={`${id}-img`}><rect x="26" y="26" width="208" height="244" /></clipPath>
      <Stipple id={`${id}-st`} density={0.4} seed={33} />
      <Dots id={`${id}-forest`} color={c.sumi} r={1.1} gap={4} bg={c.koke} />
    </>}>
      <rect x="14" y="14" width="232" height="292" fill={c.washi} />
      {perfX.map((x) => <g key={x}><circle cx={x} cy="14" r="5" fill={c.kinari} /><circle cx={x} cy="306" r="5" fill={c.kinari} /></g>)}
      {perfY.map((y) => <g key={y}><circle cx="14" cy={y} r="5" fill={c.kinari} /><circle cx="246" cy={y} r="5" fill={c.kinari} /></g>)}
      <g clipPath={`url(#${id}-img)`}>
        <rect x="26" y="26" width="208" height="244" fill={c.ai} />
        {[[40, 70, 74], [96, 86, 90], [150, 58, 66], [60, 102, 50]].map(([x, y, w]) => <rect key={x} x={x} y={y} width={w} height="7" rx="3.5" fill={c.washi} />)}
        <path d="M26 270 V236 L110 112 Q130 100 150 112 L234 226 V270Z" fill={c.hinomaru} />
        <path d="M130 106 Q150 108 234 226 V270 H160Z" fill={c.sumi} opacity="0.5" filter={`url(#${id}-st)`} />
        {[[118, 112, 104, 150], [126, 108, 120, 156], [136, 108, 140, 152], [144, 110, 156, 146]].map(([x1, y1, x2, y2]) => (
          <path key={x1} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={c.washi} strokeWidth="3" strokeLinecap="round" />
        ))}
        <path d="M26 270 V246 Q80 232 130 248 Q182 232 234 242 V270Z" fill={`url(#${id}-forest)`} />
      </g>
      <text x="36" y="50" fontFamily={gothic} fontWeight="900" fontSize="17" fill={c.washi}>日本郵便</text>
      <text x="37" y="62" fontFamily={latin} fontWeight="700" fontSize="7" fill={c.washi} letterSpacing="3">NIPPON</text>
      <text x="226" y="262" textAnchor="end" fontFamily={latin} fontWeight="900" fontSize="34" fill={c.washi}>80</text>
      <text x="130" y="292" textAnchor="middle" fontFamily={mincho} fontSize="10" fill={c.sumi} letterSpacing="4">赤富士 · 富嶽三十六景</text>
      <g transform="rotate(-14 196 96)" opacity="0.75" stroke={c.sumi} fill="none">
        <circle cx="196" cy="96" r="30" strokeWidth="1.6" />
        <circle cx="196" cy="96" r="22" strokeWidth="0.8" />
        <text x="196" y="94" textAnchor="middle" fontFamily={gothic} fontSize="8" fontWeight="700" fill={c.sumi} stroke="none">東京中央</text>
        <text x="196" y="105" textAnchor="middle" fontFamily={latin} fontSize="7" fill={c.sumi} stroke="none">39.8.12</text>
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M88 ${84 + i * 8} q9 -5 18 0 t18 0 t18 0 t18 0`} strokeWidth="1.2" />)}
      </g>
    </Print>
  );
}

export function RainyAlley() {
  const id = "jr-alley";
  const r = rand(29);
  const rain = Array.from({ length: 70 }, () => [14 + r() * 272, 14 + r() * 360, 10 + r() * 14]);
  return (
    <Print id={id} bg={c.sumi} texture={tex(101, { age: undefined, grain: 0.5 })} defs={<>
      {clipFrame(id)}
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="3 6" /></filter>
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <polygon points="14,14 116,150 116,326 14,406" fill={c.ai} />
        <polygon points="286,14 184,150 184,326 286,406" fill={c.ai} opacity="0.75" />
        <rect x="116" y="150" width="68" height="176" fill={c.sumi} />
        <polygon points="14,406 116,326 184,326 286,406" fill={c.sumi} opacity="0.6" />
        <g filter={`url(#${id}-blur)`} opacity="0.55">
          <rect x="44" y="300" width="22" height="100" fill={c.kinari} />
          <rect x="236" y="310" width="22" height="90" fill={c.koke} />
          <rect x="140" y="330" width="16" height="60" fill={c.hinomaru} />
        </g>
        <g filter={`url(#${id}-glow)`}>
          <rect x="38" y="56" width="34" height="170" rx="4" fill="none" stroke={c.hinomaru} strokeWidth="2.5" />
          <text x="55" y="66" fontFamily={gothic} fontWeight="900" fontSize="26" fill="none" stroke={c.kinari} strokeWidth="1.6" style={{ writingMode: "vertical-rl" }}>スナック</text>
          <rect x="228" y="80" width="34" height="150" rx="4" fill="none" stroke={c.koke} strokeWidth="2.5" />
          <text x="245" y="92" fontFamily={mincho} fontWeight="900" fontSize="28" fill="none" stroke={c.koke} strokeWidth="1.6" style={{ writingMode: "vertical-rl" }}>居酒屋</text>
          <text x="150" y="190" textAnchor="middle" fontFamily={latin} fontWeight="800" fontSize="16" fill="none" stroke={c.hinomaru} strokeWidth="1.4" letterSpacing="2">BAR</text>
          {[0, 1, 2].map((i) => <ellipse key={i} cx={126 + i * 10} cy={220 + i * 4} rx="4" ry="5.5" fill={c.hinomaru} />)}
        </g>
        {rain.map(([x, y, l], i) => <line key={i} x1={x} y1={y} x2={x - 3} y2={y + l} stroke={c.washi} strokeWidth="0.8" opacity="0.35" />)}
        <path d="M150 298 l-4 52 l-6 30 M150 298 l4 52 l4 30" stroke={c.sumi} strokeWidth="5" strokeLinecap="round" />
        <path d="M144 300 Q150 292 156 300 L158 338 H142Z" fill={c.sumi} />
        <line x1="150" y1="270" x2="150" y2="306" stroke={c.washi} strokeWidth="1" />
        <path d="M118 290 Q150 254 182 290 Q172 284 166 290 Q158 284 150 290 Q142 284 134 290 Q128 284 118 290Z" fill={c.hinomaru} />
        <path d="M118 400 Q150 436 182 400" fill={c.hinomaru} opacity="0.25" />
      </g>
      <Fine x={272} y={392} anchor="end" lines={["新宿 ゴールデン街", "SHINJUKU GOLDEN-GAI · 雨"]} size={6.5} fill={c.washi} font={gothic} weight={700} />
      <Hanko x={24} y={370} s={26} chars="夜" />
      <Frame color={c.washi} />
    </Print>
  );
}

export function ManekiNeko() {
  const id = "jr-neko";
  return (
    <Print id={id} bg={c.washi} texture={tex(111)} defs={<>
      {clipFrame(id)}
      <clipPath id={`${id}-head`}><circle cx="150" cy="172" r="64" /></clipPath>
      <clipPath id={`${id}-body`}><ellipse cx="150" cy="300" rx="82" ry="78" /></clipPath>
      <Stipple id={`${id}-st`} density={0.3} seed={8} />
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="14" width="272" height="392" fill={c.kinari} />
        <circle cx="150" cy="206" r="124" fill={c.hinomaru} />
        <circle cx="150" cy="206" r="124" fill={c.sumi} opacity="0.4" filter={`url(#${id}-st)`} />
        <rect x="46" y="360" width="208" height="38" rx="8" fill={c.ai} />
        {[56, 244].map((x) => <circle key={x} cx={x} cy="398" r="6" fill={c.kinari} />)}
      </g>
      <ellipse cx="150" cy="300" rx="82" ry="78" fill={c.washi} />
      <g clipPath={`url(#${id}-body)`}>
        <path d="M180 240 Q240 260 236 340 L200 360 Q190 300 180 240Z" fill={c.hinomaru} />
        <rect x="170" y="220" width="70" height="160" fill={c.sumi} opacity="0.4" filter={`url(#${id}-st)`} />
      </g>
      <ellipse cx="150" cy="300" rx="82" ry="78" fill="none" stroke={c.sumi} strokeWidth="2.5" />
      <path d="M186 236 Q214 206 210 156 Q208 122 228 118 Q248 118 248 142 Q248 172 228 204 Q214 234 208 254Z" fill={c.washi} stroke={c.sumi} strokeWidth="2.5" />
      {[[224, 126], [236, 128], [244, 138]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.2" fill={c.hinomaru} />)}
      <path d="M96 146 L100 86 L140 114Z M204 146 L200 86 L160 114Z" fill={c.washi} stroke={c.sumi} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M104 132 L106 100 L128 116Z M196 132 L194 100 L172 116Z" fill={c.hinomaru} />
      <circle cx="150" cy="172" r="64" fill={c.washi} />
      <g clipPath={`url(#${id}-head)`}>
        <path d="M84 100 Q130 96 136 140 Q110 150 84 140Z" fill={c.hinomaru} />
        <path d="M170 100 Q214 104 218 150 Q192 140 176 128Z" fill={c.sumi} />
        <rect x="170" y="108" width="60" height="130" fill={c.sumi} opacity="0.35" filter={`url(#${id}-st)`} />
      </g>
      <circle cx="150" cy="172" r="64" fill="none" stroke={c.sumi} strokeWidth="2.5" />
      {[126, 174].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="168" rx="11" ry="12" fill={c.kinari} stroke={c.sumi} strokeWidth="2" />
          <ellipse cx={x} cy="168" rx="3" ry="9" fill={c.sumi} />
        </g>
      ))}
      <path d="M144 186 H156 L150 193Z" fill={c.hinomaru} stroke={c.sumi} strokeWidth="1" />
      <path d="M150 193 Q144 202 135 197 M150 193 Q156 202 165 197" stroke={c.sumi} strokeWidth="2" fill="none" />
      {[[-1, 0], [-1, 8], [1, 0], [1, 8]].map(([d, o]) => <line key={`${d}${o}`} x1={150 + d * 24} y1={188 + o} x2={150 + d * 62} y2={180 + o * 1.8} stroke={c.sumi} strokeWidth="1.2" />)}
      {[118, 182].map((x) => <circle key={x} cx={x} cy="194" r="7" fill={c.hinomaru} opacity="0.7" />)}
      <path d="M98 226 Q150 250 202 226 L204 238 Q150 264 96 238Z" fill={c.hinomaru} stroke={c.sumi} strokeWidth="1.5" />
      <circle cx="150" cy="254" r="13" fill={c.kinari} stroke={c.sumi} strokeWidth="2" />
      <path d="M144 256 H156 M150 256 V266" stroke={c.sumi} strokeWidth="2" />
      <ellipse cx="124" cy="306" rx="28" ry="42" fill={c.kinari} stroke={c.sumi} strokeWidth="2" />
      <ellipse cx="124" cy="306" rx="20" ry="33" fill="none" stroke={c.sumi} strokeWidth="1" />
      <VText x={124} y={280} text="千万両" size={14} fill={c.sumi} font={mincho} weight={900} />
      <path d="M100 326 Q112 344 138 342" stroke={c.sumi} strokeWidth="2" fill={c.washi} />
      <text x="26" y="60" fontFamily={mincho} fontWeight="900" fontSize="32" fill={c.sumi}>招き猫</text>
      <Fine x={28} y={76} lines={["MANEKI-NEKO · BECKONING CAT", "開運 · 商売繁盛"]} size={6} fill={c.sumi} font={latin} weight={700} spacing={1} />
      <VText x={268} y={34} text="福を招く" size={16} fill={c.sumi} font={mincho} weight={900} />
      <Hanko x={20} y={326} s={28} chars="福" />
      <Frame />
    </Print>
  );
}

export function RamuneAd() {
  const id = "jr-ramune";
  const r = rand(55);
  const caustics = Array.from({ length: 40 }, () => [14 + r() * 272, 14 + r() * 170, 6 + r() * 16, r() * 180]);
  const bottle = "M100 350 V222 C100 200 118 194 120 180 C121 172 113 164 113 152 C113 142 120 138 121 132 V126 H119 V118 H141 V126 H139 V132 C140 138 147 142 147 152 C147 164 139 172 140 180 C142 194 160 200 160 222 V350 C160 358 154 362 146 362 H114 C106 362 100 358 100 350Z";
  return (
    <Print id={id} bg={c.washi} texture={tex(121, { wear: 0.3 })} defs={<>
      {clipFrame(id)}
      <clipPath id={`${id}-water`}><polygon points="14,14 286,14 286,92 14,196" /></clipPath>
      <clipPath id={`${id}-bottle`}><path d={bottle} /></clipPath>
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <g clipPath={`url(#${id}-water)`}>
          <rect x="14" y="14" width="272" height="190" fill={c.ai} />
          {caustics.map(([x, y, l, a], i) => <path key={i} d={`M0 0 q${l / 2} -4 ${l} 0`} stroke={c.washi} strokeWidth="2" fill="none" transform={`translate(${x} ${y}) rotate(${a - 90})`} />)}
        </g>
        <polygon points="14,196 286,92 286,98 14,202" fill={c.koke} />
        <rect x="14" y="360" width="272" height="46" fill={c.kinari} />
      </g>
      {[[64, 360, 34, 8], [212, 352, 26, 7], [172, 372, 16, 4]].map(([x, y, rx, ry]) => <ellipse key={x} cx={x} cy={y} rx={rx} ry={ry} fill={c.koke} opacity="0.5" stroke={c.ai} strokeWidth="1.2" />)}
      <g transform="rotate(-10 130 240)">
        <path d={bottle} fill={c.koke} opacity="0.9" />
        <g clipPath={`url(#${id}-bottle)`}>
          <rect x="96" y="214" width="70" height="150" fill={c.ai} opacity="0.3" />
          <rect x="104" y="208" width="6" height="140" rx="3" fill={c.washi} opacity="0.8" />
          <rect x="96" y="254" width="70" height="46" fill={c.washi} />
          <rect x="96" y="254" width="70" height="10" fill={c.hinomaru} />
          <text x="130" y="262" textAnchor="middle" fontFamily={latin} fontWeight="800" fontSize="6.5" fill={c.washi} letterSpacing="2">SINCE 1953</text>
          <text x="130" y="285" textAnchor="middle" fontFamily={gothic} fontWeight="900" fontSize="17" fill={c.ai}>ラムネ</text>
          <text x="130" y="296" textAnchor="middle" fontFamily={gothic} fontSize="6" fill={c.sumi}>清涼飲料水 200ml</text>
        </g>
        <path d={bottle} fill="none" stroke={c.ai} strokeWidth="2" />
        <circle cx="130" cy="152" r="8.5" fill={c.washi} stroke={c.ai} strokeWidth="1.2" />
        <circle cx="127" cy="149" r="2.5" fill={c.koke} />
        <rect x="118" y="111" width="24" height="9" rx="2" fill={c.hinomaru} />
      </g>
      {Array.from({ length: 14 }, (_, i) => {
        const x = 86 + ((i * 47) % 110), y = 120 + ((i * 71) % 220);
        return <path key={i} d={`M${x} ${y} c2 3 3 5 0 7 c-3 -2 -2 -4 0 -7Z`} fill={c.washi} stroke={c.ai} strokeWidth="0.8" />;
      })}
      <VText x={256} y={116} text="夏の味方" size={28} fill={c.ai} font={mincho} weight={900} />
      <VText x={222} y={124} text="ひんやり爽快、ビー玉入り。" size={11} fill={c.hinomaru} font={gothic} weight={700} />
      <Fine x={28} y={222} lines={["ぬけるような夏空に", "シュワッとはじける", "ビー玉の音。", "冷やしてどうぞ。"]} size={7} fill={c.ai} font={gothic} weight={700} lh={1.5} />
      <text x="150" y="374" textAnchor="middle" fontFamily={latin} fontWeight="800" fontSize="7" fill={c.sumi} letterSpacing="3">SODA POP · ビー玉入り</text>
      <text x="150" y="398" textAnchor="middle" fontFamily={latin} fontWeight="900" fontSize="30" fill={c.sumi} letterSpacing="9">RAMUNE</text>
      <Frame />
    </Print>
  );
}

export function ColorTvAd() {
  const id = "jr-tv";
  const bars = [c.washi, c.kinari, c.koke, c.ai, c.hinomaru, c.kinari, c.sumi];
  return (
    <Print id={id} bg={c.washi} texture={tex(131)} defs={<>
      <clipPath id={`${id}-screen`}><rect x="68" y="158" width="128" height="124" rx="20" /></clipPath>
      <Hatch id={`${id}-scan`} color={c.sumi} width={1} gap={3} angle={0} />
      <Hatch id={`${id}-grille`} color={c.sumi} width={1.4} gap={4} angle={0} />
      <Stipple id={`${id}-st`} density={0.3} seed={18} />
    </>}>
      <rect x="14" y="14" width="272" height="392" fill={c.kinari} />
      <polygon points={burst(58, 116, 38, 28, 16)} fill={c.hinomaru} />
      <text x="58" y="121" textAnchor="middle" fontFamily={gothic} fontWeight="900" fontSize="14" fill={c.washi} transform="rotate(-12 58 116)">新発売!</text>
      <text x="270" y="70" textAnchor="end" fontFamily={gothic} fontWeight="900" fontSize="30" fill={c.sumi}>カラーテレビ</text>
      <Fine x={270} y={88} anchor="end" lines={["COLOR TELEVISION · 19型 · 1966"]} size={6.5} fill={c.sumi} font={latin} weight={700} spacing={1} />
      <line x1="150" y1="140" x2="108" y2="96" stroke={c.sumi} strokeWidth="2" />
      <line x1="150" y1="140" x2="198" y2="90" stroke={c.sumi} strokeWidth="2" />
      <circle cx="108" cy="96" r="3" fill={c.sumi} />
      <circle cx="198" cy="90" r="3" fill={c.sumi} />
      <path d="M134 142 Q150 126 166 142Z" fill={c.sumi} />
      <ellipse cx="150" cy="356" rx="110" ry="10" fill={c.sumi} opacity="0.25" />
      <path d="M84 300 L70 352 M216 300 L230 352" stroke={c.sumi} strokeWidth="7" strokeLinecap="round" />
      <rect x="54" y="142" width="192" height="160" rx="14" fill={c.sumi} stroke={c.sumi} strokeWidth="2.5" />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M58 ${150 + i * 32} q46 -6 92 0 t92 0`} stroke={c.kinari} strokeWidth="0.8" fill="none" opacity="0.35" />)}
      <rect x="64" y="154" width="136" height="132" rx="22" fill={c.sumi} />
      <g clipPath={`url(#${id}-screen)`}>
        {bars.map((col, i) => <rect key={i} x={68 + i * 18.3} y="158" width="18.4" height="92" fill={col} />)}
        <rect x="68" y="250" width="128" height="32" fill={c.ai} />
        <rect x="68" y="158" width="128" height="124" fill={`url(#${id}-scan)`} opacity="0.25" />
        <path d="M74 166 Q110 160 128 168 Q96 172 80 196Z" fill={c.washi} opacity="0.3" />
      </g>
      {[182, 218].map((y) => (
        <g key={y}>
          <circle cx="222" cy={y} r="11" fill={c.kinari} stroke={c.sumi} strokeWidth="1.5" />
          <line x1="222" y1={y} x2="222" y2={y - 9} stroke={c.sumi} strokeWidth="2" />
        </g>
      ))}
      <rect x="208" y="240" width="28" height="44" fill={`url(#${id}-grille)`} />
      <rect x="160" y="142" width="86" height="160" rx="14" fill={c.sumi} opacity="0.35" filter={`url(#${id}-st)`} />
      <text x="150" y="384" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="17" fill={c.sumi}>家族そろって、色あざやか。</text>
      <Fine x={150} y={398} anchor="middle" lines={["東京電機株式会社 · TOKYO DENKI CO."]} size={6.5} fill={c.sumi} font={latin} weight={700} spacing={1} />
      <Hanko x={240} y={316} s={30} chars="新型" />
      <Frame />
    </Print>
  );
}

export function VendingMachine() {
  const id = "jr-jihanki";
  const cans = [c.koke, c.kinari, c.hinomaru, c.ai, c.hinomaru, c.koke];
  return (
    <Print id={id} bg={c.sumi} texture={tex(141, { age: undefined, grain: 0.5 })} defs={<>
      <radialGradient id={`${id}-spill`} r="60%">
        <stop offset="0%" stopColor={c.washi} stopOpacity="0.5" />
        <stop offset="100%" stopColor={c.washi} stopOpacity="0" />
      </radialGradient>
      <Hatch id={`${id}-wall`} color={c.sumi} width={1} gap={8} angle={0} />
    </>}>
      <rect x="14" y="14" width="272" height="330" fill={c.ai} />
      <rect x="14" y="14" width="272" height="330" fill={`url(#${id}-wall)`} opacity="0.5" />
      <rect x="14" y="344" width="272" height="62" fill={c.sumi} />
      <ellipse cx="150" cy="200" rx="150" ry="170" fill={`url(#${id}-spill)`} />
      <ellipse cx="150" cy="362" rx="110" ry="22" fill={`url(#${id}-spill)`} />
      <rect x="80" y="70" width="140" height="274" rx="6" fill={c.hinomaru} stroke={c.sumi} strokeWidth="2" />
      <rect x="92" y="84" width="116" height="150" fill={c.washi} />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x="92" y={84 + row * 50} width="116" height="9" fill={row === 2 ? c.hinomaru : c.ai} />
          <text x="150" y={91 + row * 50} textAnchor="middle" fontFamily={gothic} fontWeight="900" fontSize="6.5" fill={c.washi}>{row === 2 ? "あったか〜い" : "つめた〜い"}</text>
          {cans.map((col, i) => (
            <g key={i}>
              <rect x={96 + i * 18.6} y={96 + row * 50} width="14" height="26" rx="2" fill={cans[(i + row * 2) % 6]} stroke={c.sumi} strokeWidth="0.8" />
              <rect x={96 + i * 18.6} y={104 + row * 50} width="14" height="5" fill={c.washi} opacity="0.7" />
              <rect x={97 + i * 18.6} y={124 + row * 50} width="12" height="5" fill={c.sumi} />
              <text x={103 + i * 18.6} y={128 + row * 50} textAnchor="middle" fontFamily={latin} fontSize="3.6" fill={c.washi}>100</text>
              <circle cx={103 + i * 18.6} cy={132 + row * 50} r="1.8" fill={c.kinari} />
            </g>
          ))}
        </g>
      ))}
      <text x="150" y="262" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700" fontSize="22" fill={c.washi}>Drink!</text>
      <rect x="190" y="246" width="14" height="22" rx="2" fill={c.sumi} />
      <rect x="194" y="250" width="6" height="1.5" fill={c.kinari} />
      <rect x="100" y="290" width="100" height="36" rx="3" fill={c.sumi} />
      <rect x="104" y="294" width="92" height="10" fill={c.sumi} />
      <path d="M232 344 q-4 -26 6 -34 l2 -14 l6 8 l6 -8 l2 14 q10 8 6 34Z" fill={c.sumi} />
      <circle cx="243" cy="306" r="1.6" fill={c.kinari} />
      <circle cx="251" cy="306" r="1.6" fill={c.kinari} />
      <path d="M254 340 q16 4 14 -16" stroke={c.sumi} strokeWidth="3" fill="none" />
      {[[70, 60], [228, 52], [62, 120], [240, 104]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="1.3" fill={c.washi} />)}
      <VText x={266} y={30} text="真夜中の自販機" size={14} fill={c.washi} font={mincho} weight={900} />
      <Fine x={26} y={388} lines={["JIDŌ HANBAIKI · 24H", "冷たい · 温かい"]} size={6.5} fill={c.washi} font={gothic} weight={700} />
      <Hanko x={24} y={22} s={26} chars="夜" />
      <Frame color={c.washi} />
    </Print>
  );
}

function Firework({ cx, cy, r, color, n = 18 }: { cx: number; cy: number; r: number; color: string; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (Math.PI * 2 * i) / n;
        const x1 = cx + Math.cos(a) * r * 0.25, y1 = cy + Math.sin(a) * r * 0.25;
        const x2 = cx + Math.cos(a) * r, y2 = cy + Math.sin(a) * r;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.4" strokeLinecap="round" />
            <circle cx={cx + Math.cos(a) * r * 1.12} cy={cy + Math.sin(a) * r * 1.12} r="1.8" fill={color} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.12} fill={color} />
    </g>
  );
}

export function HanabiFestival() {
  const id = "jr-hanabi";
  const lanterns = [0.08, 0.24, 0.4, 0.56, 0.72, 0.88];
  const sag = (t: number) => 54 + 4 * 34 * t * (1 - t);
  return (
    <Print id={id} bg={c.washi} texture={tex(151, { age: undefined })} defs={<>
      {clipFrame(id)}
      <Hatch id={`${id}-river`} color={c.sumi} width={1.5} gap={5} angle={0} />
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="14" width="272" height="392" fill={c.ai} />
        <Firework cx={100} cy={170} r={62} color={c.kinari} n={22} />
        <Firework cx={214} cy={130} r={46} color={c.hinomaru} n={18} />
        <Firework cx={196} cy={230} r={30} color={c.washi} n={14} />
        <Firework cx={70} cy={262} r={22} color={c.hinomaru} n={12} />
        <rect x="14" y="320" width="272" height="86" fill={c.sumi} />
        <rect x="14" y="320" width="272" height="86" fill={`url(#${id}-river)`} opacity="0.6" />
        {[[100, c.kinari], [214, c.hinomaru], [196, c.washi], [70, c.hinomaru]].map(([x, col]) =>
          [0, 1, 2, 3, 4].map((i) => <rect key={`${x}${i}`} x={(x as number) - 8 + ((i * 7) % 13)} y={340 + i * 12} width={14 - i * 2} height="2" fill={col as string} opacity="0.75" />),
        )}
        <path d="M14 318 Q150 280 286 318 V328 Q150 292 14 328Z" fill={c.sumi} />
        {Array.from({ length: 13 }, (_, i) => {
          const x = 24 + i * 21;
          const y = 318 - 19 * (1 - ((x - 150) / 136) ** 2);
          return <line key={i} x1={x} y1={y} x2={x} y2={y - 9} stroke={c.sumi} strokeWidth="2" />;
        })}
        <path d={`M14 54 Q150 ${54 + 68} 286 54`} stroke={c.sumi} strokeWidth="1.5" fill="none" />
        {lanterns.map((t) => {
          const x = 14 + t * 272, y = sag(t);
          return (
            <g key={t}>
              <line x1={x} y1={y} x2={x} y2={y + 6} stroke={c.sumi} strokeWidth="1.2" />
              <rect x={x - 7} y={y + 6} width="14" height="4" fill={c.sumi} />
              <ellipse cx={x} cy={y + 26} rx="13" ry="17" fill={c.hinomaru} />
              {[-8, 0, 8].map((dy) => <ellipse key={dy} cx={x} cy={y + 26 + dy} rx={13 * Math.sqrt(1 - (dy / 17) ** 2)} ry="1.6" fill="none" stroke={c.sumi} strokeWidth="0.6" opacity="0.6" />)}
              <rect x={x - 7} y={y + 42} width="14" height="4" fill={c.sumi} />
              <text x={x} y={y + 31} textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="12" fill={c.washi}>祭</text>
            </g>
          );
        })}
      </g>
      <VText x={262} y={170} text="花火大会" size={28} fill={c.washi} font={mincho} weight={900} />
      <Fine x={26} y={386} lines={["SUMIDA RIVER FIREWORKS", "隅田川 · 1965.7.24 · 午後七時"]} size={6.5} fill={c.washi} font={gothic} weight={700} />
      <Hanko x={246} y={364} s={28} chars="祭" />
      <Frame color={c.washi} />
    </Print>
  );
}

export function KaijuPoster() {
  const id = "jr-kaiju";
  const r = rand(77);
  const city = Array.from({ length: 16 }, (_, i) => ({ x: 10 + i * 18 + r() * 4, w: 14 + r() * 10, h: 34 + r() * 56, tilt: r() > 0.8 ? (r() - 0.5) * 30 : 0 }));
  const spikes: [number, number][] = [[124, 262], [124, 238], [128, 214], [136, 192], [148, 172], [162, 154], [177, 141]];
  const body = "M188 132 C196 118 214 112 230 118 L246 126 L240 135 L226 138 L244 148 C232 158 216 160 206 156 C206 176 212 196 222 208 L240 212 L232 222 L222 220 C226 250 230 290 226 330 L240 362 H176 C170 340 160 320 150 310 C120 330 80 350 36 382 C60 340 100 300 118 280 C110 240 120 190 150 160 C164 146 176 138 188 132Z";
  return (
    <Print id={id} bg={c.washi} texture={tex(161, { wear: 0.4 })} defs={<>
      {clipFrame(id)}
      <radialGradient id={`${id}-glow`} cx="62%" cy="38%" r="60%">
        <stop offset="0%" stopColor={c.kinari} />
        <stop offset="55%" stopColor={c.hinomaru} />
        <stop offset="100%" stopColor={c.hinomaru} />
      </radialGradient>
      <clipPath id={`${id}-body`}><path d={body} /></clipPath>
      <Dots id={`${id}-hide`} color={c.koke} r={1.2} gap={5} />
      <Stipple id={`${id}-st`} density={0.35} seed={27} />
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="14" width="272" height="392" fill={`url(#${id}-glow)`} />
        <rect x="14" y="14" width="272" height="392" fill={c.sumi} opacity="0.35" filter={`url(#${id}-st)`} />
        <path d="M244 138 L292 64 L292 122Z" fill={c.koke} />
        <path d="M244 138 L292 84 L292 102Z" fill={c.washi} />
        {spikes.map(([x, y], i) => (
          <path key={i} d={`M${x - 6} ${y + 6} L${x - 22} ${y - 8} L${x - 6} ${y - 4} L${x - 14} ${y - 22} L${x + 6} ${y - 6}Z`} fill={c.washi} stroke={c.koke} strokeWidth="1.5" />
        ))}
        <path d={body} fill={c.sumi} />
        <rect x="14" y="14" width="272" height="392" fill={`url(#${id}-hide)`} clipPath={`url(#${id}-body)`} />
        <path d="M230 138 l3 6 l3 -6 M236 139 l3 6 l3 -6" fill={c.washi} />
        <circle cx="222" cy="126" r="3" fill={c.kinari} />
        {[[60, 300], [210, 330], [120, 352]].map(([x, y]) => (
          <g key={x} fill={c.sumi} opacity="0.85">
            <circle cx={x} cy={y} r="18" /><circle cx={x + 16} cy={y - 8} r="14" /><circle cx={x - 14} cy={y - 6} r="12" />
          </g>
        ))}
        {city.map((b, i) => (
          <g key={i} transform={`rotate(${b.tilt} ${b.x + b.w / 2} 406)`}>
            <rect x={b.x} y={406 - b.h} width={b.w} height={b.h + 10} fill={c.sumi} />
            {Array.from({ length: Math.floor(b.h / 10) }, (_, j) => (r() > 0.5 ? <rect key={j} x={b.x + 3 + (j % 2) * 6} y={410 - b.h + j * 10} width="3" height="3.5" fill={c.washi} /> : null))}
          </g>
        ))}
        {[[54, 96], [80, 112], [40, 124]].map(([x, y]) => <path key={x} d={`M${x} ${y} l14 -4 l-4 4 l4 4Z`} fill={c.sumi} />)}
      </g>
      <text x="26" y="70" fontFamily={gothic} fontWeight="900" fontSize="46" fill={c.kinari} stroke={c.sumi} strokeWidth="5" paintOrder="stroke">怪獣</text>
      <text x="26" y="116" fontFamily={gothic} fontWeight="900" fontSize="40" fill={c.washi} stroke={c.sumi} strokeWidth="5" paintOrder="stroke">大決戦</text>
      <Fine x={28} y={134} lines={["KAIJU WAR · 総天然色"]} size={7} fill={c.sumi} font={latin} weight={800} spacing={1.5} />
      <rect x="14" y="372" width="272" height="34" fill={c.sumi} />
      <Fine x={26} y={386} lines={["東都映画 · TŌTO EIGA 1962", "監督 山田一郎 · 特技監督 佐藤次郎"]} size={6.5} fill={c.washi} font={gothic} weight={700} />
      <Hanko x={248} y={376} s={26} chars="東都" />
      <Frame />
    </Print>
  );
}

export function DarumaPrint() {
  const id = "jr-daruma";
  const shape = "M150 70 C228 70 262 150 258 240 C254 330 214 380 150 380 C86 380 46 330 42 240 C38 150 72 70 150 70Z";
  return (
    <Print id={id} bg={c.washi} texture={tex(171)} defs={<>
      <clipPath id={`${id}-body`}><path d={shape} /></clipPath>
      <Stipple id={`${id}-st`} density={0.34} seed={2} />
    </>}>
      <rect x="14" y="14" width="272" height="392" fill={c.kinari} />
      <ellipse cx="156" cy="384" rx="104" ry="12" fill={c.sumi} opacity="0.5" />
      <path d={shape} fill={c.hinomaru} />
      <g clipPath={`url(#${id}-body)`}>
        <rect x="176" y="60" width="100" height="330" fill={c.sumi} opacity="0.45" filter={`url(#${id}-st)`} />
        <path d="M70 140 Q80 100 120 84" stroke={c.washi} strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" />
      </g>
      <path d={shape} fill="none" stroke={c.sumi} strokeWidth="2.5" />
      <path d="M150 110 C200 110 222 150 220 196 C218 240 188 262 150 262 C112 262 82 240 80 196 C78 150 100 110 150 110Z" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <path d="M90 162 C96 138 124 132 142 150 C126 146 110 152 100 166Z M210 162 C204 138 176 132 158 150 C174 146 190 152 200 166Z" fill={c.sumi} />
      <circle cx="124" cy="182" r="16" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <circle cx="124" cy="182" r="10" fill={c.sumi} />
      <circle cx="176" cy="182" r="16" fill={c.washi} stroke={c.sumi} strokeWidth="2" />
      <path d="M150 204 C134 196 112 200 102 214 C120 208 134 212 150 220 C166 212 180 208 198 214 C188 200 166 196 150 204Z" fill={c.sumi} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} stroke={c.sumi} strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d={`M${96 + i * 5} ${222 + i * 6} q6 10 18 14`} />
          <path d={`M${204 - i * 5} ${222 + i * 6} q-6 10 -18 14`} />
        </g>
      ))}
      <path d="M142 238 Q150 242 158 238" stroke={c.sumi} strokeWidth="2" fill="none" />
      <text x="150" y="330" textAnchor="middle" fontFamily={mincho} fontWeight="900" fontSize="46" fill={c.kinari} stroke={c.sumi} strokeWidth="1.5" letterSpacing="4">必勝</text>
      {[[-1, 76], [1, 224]].map(([d, x]) => (
        <path key={x} d={`M${x} 300 q${d * 10} -14 ${d * 22} -4 q${d * 8} 6 ${d * 2} 12 q${-d * 6} 4 ${-d * 8} -2`} stroke={c.kinari} strokeWidth="3" fill="none" strokeLinecap="round" />
      ))}
      <VText x={268} y={30} text="七転び八起き" size={15} fill={c.sumi} font={mincho} weight={900} />
      <Fine x={26} y={398} lines={["DARUMA · FALL SEVEN TIMES, STAND UP EIGHT"]} size={6} fill={c.sumi} font={latin} weight={700} spacing={1} />
      <Hanko x={22} y={22} s={34} chars="達磨" />
      <rect x="14" y="14" width="272" height="392" fill="none" stroke={c.sumi} strokeWidth="1.5" />
    </Print>
  );
}

export const originals: Original[] = [
  { title: "Sunrise Crane", note: "日の出", Component: SunriseCrane },
  { title: "Crane Matchbox", note: "マッチ", Component: MatchboxLabel },
  { title: "Shinkansen 1964", note: "新幹線", Component: ShinkansenPoster },
  { title: "Cream Soda", note: "喫茶", Component: CreamSoda },
  { title: "Tokyo Tower", note: "東京", Component: TokyoTower },
  { title: "City Pop LP", note: "レコード", Component: CityPopRecord },
  { title: "Kissaten Menu", note: "献立", Component: KissatenMenu },
  { title: "Sento Noren", note: "銭湯", Component: SentoNoren },
  { title: "Red Fuji Stamp", note: "切手", Component: RedFujiStamp },
  { title: "Rainy Alley", note: "ネオン", Component: RainyAlley },
  { title: "Maneki-neko", note: "招き猫", Component: ManekiNeko },
  { title: "Ramune Ad", note: "広告", Component: RamuneAd },
  { title: "Color TV Ad", note: "テレビ", Component: ColorTvAd },
  { title: "Midnight Vending", note: "自販機", Component: VendingMachine },
  { title: "Hanabi Festival", note: "花火", Component: HanabiFestival },
  { title: "Kaiju Poster", note: "怪獣", Component: KaijuPoster },
  { title: "Daruma", note: "達磨", Component: DarumaPrint },
];
