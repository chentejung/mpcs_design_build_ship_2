// Original Chinese-retro artifacts, drawn the way the board's labels were printed:
// chromolithograph trade labels and calendar posters — curled ribbon banners, arched English,
// central medallions with airbrushed subjects, corner roses and seals, right-to-left signage,
// faded inks on foxed paper.
import { chineseRetro, colors } from "@/app/boards";
import { ArcText, Hatch, Print, VText, rand, type Original, type Texture } from "./print";

const c = colors(chineseRetro);
const song = "'Noto Serif TC','Noto Serif SC','Noto Serif CJK TC','Songti TC','PMingLiU',serif";
const hei = "'Noto Sans TC','Noto Sans SC','Noto Sans CJK TC','PingFang TC','Microsoft JhengHei',sans-serif";
const slab = "Rockwell,'Clarendon','Georgia',serif";
const tex = (seed: number, extra: Texture = {}): Texture => ({
  grain: 0.45, wear: 0.3, rough: 0.8, age: c.jujube, ageStrength: 0.38, fade: c.rice, fadeStrength: 0.12, seed, ...extra,
});
// Old shop signage reads right to left.
const rtl = (s: string) => s.split("").reverse().join("");

function Ribbon({ id, cx, y, w, h = 32, arch = 12, fill, tail = c.jujube, text, size = 22, color = c.ink, font = song }: {
  id: string; cx: number; y: number; w: number; h?: number; arch?: number; fill: string; tail?: string; text: string; size?: number; color?: string; font?: string;
}) {
  const x0 = cx - w / 2, x1 = cx + w / 2;
  const band = `M${x0} ${y + arch} Q${cx} ${y - arch} ${x1} ${y + arch} V${y + arch + h} Q${cx} ${y - arch + h} ${x0} ${y + arch + h}Z`;
  const mid = `M${x0} ${y + arch + h / 2} Q${cx} ${y - arch + h / 2} ${x1} ${y + arch + h / 2}`;
  return (
    <g strokeLinejoin="round">
      <path d={`M${x0 + 14} ${y + arch + 8} H${x0 - 26} L${x0 - 14} ${y + arch + 8 + h / 2} L${x0 - 26} ${y + arch + 8 + h} H${x0 + 14}Z`} fill={tail} stroke={c.ink} strokeWidth="1.2" />
      <path d={`M${x1 - 14} ${y + arch + 8} H${x1 + 26} L${x1 + 14} ${y + arch + 8 + h / 2} L${x1 + 26} ${y + arch + 8 + h} H${x1 - 14}Z`} fill={tail} stroke={c.ink} strokeWidth="1.2" />
      <path d={band} fill={fill} stroke={c.ink} strokeWidth="1.5" />
      <path id={`${id}-ribbon`} d={mid} fill="none" />
      <text fontFamily={font} fontWeight="900" fontSize={size} fill={color} textAnchor="middle" dominantBaseline="central" letterSpacing="4">
        <textPath href={`#${id}-ribbon`} startOffset="50%">{text}</textPath>
      </text>
    </g>
  );
}

function Rose({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} d="M0 0 C-13 -4 -17 -22 0 -27 C17 -22 13 -4 0 0Z" fill={fill} stroke={c.vermilion} strokeWidth="0.8" transform={`rotate(${a + 30}) translate(0 -4)`} />
      ))}
      <circle r="13" fill={fill} stroke={c.vermilion} strokeWidth="0.8" />
      <path d="M-9 -1 C-9 -12 9 -12 9 -1 C9 7 -6 7 -5 -1 C-4 -6 4 -6 4 -1" fill="none" stroke={c.vermilion} strokeWidth="1.6" />
      <path d="M-15 -15 q7 -7 15 -7" stroke={c.xuan} strokeWidth="1.6" fill="none" opacity="0.85" />
    </g>
  );
}

function Leaf({ x, y, a, s = 1, fill = c.pine }: { x: number; y: number; a: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d="M0 0 C8 -8 22 -8 32 0 C22 8 8 8 0 0Z" fill={fill} stroke={c.ink} strokeWidth="0.8" />
      <path d="M3 0 H29" stroke={c.willow} strokeWidth="1" />
    </g>
  );
}

// A rose with two leaves, the corner ornament on most labels.
function Spray({ x, y, s = 1, flip = false, fill }: { x: number; y: number; s?: number; flip?: boolean; fill: string }) {
  const d = flip ? -1 : 1;
  return (
    <g>
      <Leaf x={x} y={y} a={flip ? 200 : -20} s={s} />
      <Leaf x={x} y={y} a={flip ? 120 : 60} s={s * 0.9} fill={c.willow} />
      <Rose x={x + d * 4} y={y} s={s * 0.85} fill={fill} />
    </g>
  );
}

function Seal({ x, y, ch, r = 13, fill = c.xuan, ink = c.vermilion }: { x: number; y: number; ch: string; r?: number; fill?: string; ink?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={c.ink} strokeWidth="1.5" />
      <text x={x} y={y + r * 0.38} textAnchor="middle" fontFamily={song} fontWeight="900" fontSize={r * 1.1} fill={ink}>{ch}</text>
    </g>
  );
}

const petal = (id: string) => (
  <radialGradient id={`${id}-petal`} cx="50%" cy="45%" r="60%">
    <stop offset="0%" stopColor={c.xuan} />
    <stop offset="55%" stopColor={c.peach} />
    <stop offset="100%" stopColor={c.vermilion} />
  </radialGradient>
);

// ---------------------------------------------------------------------------------------------

export function GoldenCarpLabel() {
  const id = "cr-carp";
  return (
    <Print id={id} w={300} h={400} bg={c.vermilion} texture={tex(301)} defs={<>
      {petal(id)}
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.xuan} /><stop offset="100%" stopColor={c.celadon} />
      </linearGradient>
      <linearGradient id={`${id}-fish`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.imperial} /><stop offset="55%" stopColor={c.gold} /><stop offset="100%" stopColor={c.vermilion} />
      </linearGradient>
      <pattern id={`${id}-scales`} width="8" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 6 Q4 0 8 6" stroke={c.jujube} strokeWidth="0.8" fill="none" />
      </pattern>
      <clipPath id={`${id}-medal`}><circle cx="150" cy="206" r="76" /></clipPath>
      <clipPath id={`${id}-body`}><path d="M-60 10 C-40 -18 0 -30 40 -22 C58 -18 70 -8 72 2 C70 12 58 20 40 22 C0 28 -36 24 -60 10Z" /></clipPath>
    </>}>
      <rect x="8" y="8" width="284" height="384" fill="none" stroke={c.imperial} strokeWidth="4" />
      <rect x="16" y="16" width="268" height="368" fill="none" stroke={c.ink} strokeWidth="1.2" />
      <Seal x={36} y={36} ch="澳" />
      <Seal x={264} y={36} ch="門" />
      <Ribbon id={id} cx={150} y={22} w={170} fill={c.imperial} text={rtl("金鯉牌")} size={24} />
      <ArcText id={`${id}-en`} cx={150} cy={206} r={98} fontFamily={slab} fontWeight="900" fontSize="19" fill={c.xuan} stroke={c.ink} strokeWidth="3" paintOrder="stroke" letterSpacing="2">GOLDEN CARP BRAND</ArcText>
      <circle cx="150" cy="206" r="86" fill={c.imperial} stroke={c.ink} strokeWidth="1.5" />
      <circle cx="150" cy="206" r="80" fill={c.jujube} />
      <circle cx="150" cy="206" r="76" fill={`url(#${id}-sky)`} />
      <g clipPath={`url(#${id}-medal)`}>
        <text x="150" y="152" textAnchor="middle" fontFamily={slab} fontWeight="700" fontSize="8" fill={c.cobalt} letterSpacing="3">TRADE MARK</text>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M60 ${250 + i * 12} q10 -12 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V300 H60Z`} fill={i % 2 ? c.cobalt : c.celadon} stroke={c.xuan} strokeWidth="1.5" />
        ))}
        <g transform="translate(150 206) rotate(-28)">
          <path d="M-60 10 L-94 -16 Q-82 10 -94 36Z" fill={`url(#${id}-fish)`} stroke={c.jujube} strokeWidth="1.5" />
          {[-8, 2, 12, 22].map((y) => <path key={y} d={`M-62 10 L-90 ${y - 6}`} stroke={c.jujube} strokeWidth="0.8" />)}
          <path d="M-20 -24 C-6 -44 18 -42 30 -25Z" fill={c.vermilion} stroke={c.jujube} strokeWidth="1.2" />
          <path d="M-60 10 C-40 -18 0 -30 40 -22 C58 -18 70 -8 72 2 C70 12 58 20 40 22 C0 28 -36 24 -60 10Z" fill={`url(#${id}-fish)`} />
          <rect x="-62" y="-30" width="104" height="60" fill={`url(#${id}-scales)`} clipPath={`url(#${id}-body)`} />
          <path d="M-60 10 C-40 -18 0 -30 40 -22 C58 -18 70 -8 72 2 C70 12 58 20 40 22 C0 28 -36 24 -60 10Z" fill="none" stroke={c.jujube} strokeWidth="1.5" />
          <path d="M42 -18 C34 -6 34 10 42 20" stroke={c.jujube} strokeWidth="1.5" fill="none" />
          <path d="M30 14 C26 30 16 34 8 34 C14 24 18 18 24 12Z" fill={c.vermilion} stroke={c.jujube} strokeWidth="1" />
          <circle cx="56" cy="-5" r="3.5" fill={c.ink} />
          <circle cx="55" cy="-6" r="1" fill={c.xuan} />
          <path d="M70 4 q8 6 15 2 M68 7 q6 9 12 9" stroke={c.jujube} strokeWidth="1.2" fill="none" />
        </g>
        {[[96, 236], [110, 226], [212, 160], [198, 150], [222, 176]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill={c.xuan} stroke={c.cobalt} strokeWidth="0.8" />)}
      </g>
      <VText x={46} y={178} text="商標" size={18} fill={c.xuan} font={song} weight={900} />
      <VText x={254} y={178} text="註冊" size={18} fill={c.xuan} font={song} weight={900} />
      <Spray x={44} y={300} s={1.05} fill={`url(#${id}-petal)`} />
      <Spray x={256} y={300} s={1.05} flip fill={`url(#${id}-petal)`} />
      <rect x="40" y="318" width="220" height="40" fill={c.xuan} stroke={c.ink} strokeWidth="1.5" />
      <text x="150" y="349" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="28" fill={c.vermilion} letterSpacing="10">{rtl("超等爆竹")}</text>
      <text x="150" y="378" textAnchor="middle" fontFamily={slab} fontWeight="800" fontSize="12" fill={c.xuan} letterSpacing="5">MADE IN MACAU</text>
    </Print>
  );
}

export function CalendarGirl() {
  const id = "cr-calendar";
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const face = "M118 132 C118 104 136 96 152 96 C172 96 188 108 188 134 C188 166 172 190 152 192 C132 190 118 164 118 132Z";
  return (
    <Print id={id} w={300} h={420} bg={c.rice} texture={tex(311, { wear: 0.25 })} defs={<>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.celadon} /><stop offset="100%" stopColor={c.xuan} />
      </linearGradient>
      <radialGradient id={`${id}-skin`} cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor={c.xuan} /><stop offset="70%" stopColor={c.rice} /><stop offset="100%" stopColor={c.peach} />
      </radialGradient>
      <radialGradient id={`${id}-blush`}><stop offset="0%" stopColor={c.peach} stopOpacity="0.8" /><stop offset="100%" stopColor={c.peach} stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-silk`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c.cobalt} /><stop offset="100%" stopColor={c.ink} />
      </linearGradient>
      <pattern id={`${id}-print`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="2.2" fill={c.peach} /><circle cx="12" cy="12" r="1.6" fill={c.xuan} opacity="0.8" />
      </pattern>
      <clipPath id={`${id}-window`}><path d="M42 318 V178 A108 108 0 0 1 258 178 V318Z" /></clipPath>
      {petal(id)}
    </>}>
      <rect x="10" y="10" width="280" height="400" fill="none" stroke={c.jujube} strokeWidth="6" />
      <rect x="18" y="18" width="264" height="384" fill="none" stroke={c.gold} strokeWidth="1.5" />
      <rect x="24" y="24" width="252" height="40" fill={c.vermilion} stroke={c.ink} strokeWidth="1.2" />
      <text x="150" y="51" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="24" fill={c.imperial} letterSpacing="6">{rtl("大中華香煙")}</text>
      <path d="M42 318 V178 A108 108 0 0 1 258 178 V318Z" fill={`url(#${id}-sky)`} stroke={c.gold} strokeWidth="3" />
      <g clipPath={`url(#${id}-window)`}>
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${46 + i * 9} 70 Q${60 + i * 10} 160 ${52 + i * 12} ${200 + i * 14}`} stroke={c.willow} strokeWidth="1.6" fill="none" opacity="0.85" />)}
        {Array.from({ length: 22 }, (_, i) => <ellipse key={i} cx={52 + ((i * 13) % 64)} cy={110 + ((i * 29) % 120)} rx="1.6" ry="4" fill={c.willow} transform={`rotate(20 ${52 + ((i * 13) % 64)} ${110 + ((i * 29) % 120)})`} />)}
        <path d="M104 140 C100 100 130 82 156 84 C190 86 208 112 204 146 C214 170 210 196 196 210 C200 186 194 170 186 162 L120 162 C110 172 106 188 110 208 C96 194 92 168 104 140Z" fill={c.ink} />
        <path d="M140 186 L138 210 H166 L164 186Z" fill={`url(#${id}-skin)`} />
        <path d="M70 330 C72 270 98 226 132 212 Q152 224 172 212 C206 226 230 270 232 330Z" fill={`url(#${id}-silk)`} />
        <path d="M70 330 C72 270 98 226 132 212 Q152 224 172 212 C206 226 230 270 232 330Z" fill={`url(#${id}-print)`} opacity="0.75" />
        <path d="M132 202 Q152 212 172 202 L176 216 Q152 226 128 216Z" fill={c.cobalt} stroke={c.xuan} strokeWidth="1.5" />
        <path d="M164 218 Q186 234 196 254" stroke={c.xuan} strokeWidth="1.8" fill="none" />
        {[[172, 224], [182, 234], [190, 244]].map(([x, y]) => <path key={x} d={`M${x - 4} ${y} h8 M${x} ${y - 3} v6`} stroke={c.imperial} strokeWidth="1.5" />)}
        <path d={face} fill={`url(#${id}-skin)`} stroke={c.peach} strokeWidth="1" />
        <circle cx="134" cy="160" r="10" fill={`url(#${id}-blush)`} />
        <circle cx="172" cy="160" r="10" fill={`url(#${id}-blush)`} />
        <path d="M116 132 C112 104 132 86 156 86 C182 86 196 104 192 130 C186 112 174 104 160 106 C150 116 132 116 122 112 C118 118 117 126 116 132Z" fill={c.ink} />
        <path d="M128 98 C140 92 160 92 172 98 M124 108 C134 104 144 104 150 108" stroke={c.celadon} strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M128 132 Q136 127 144 131 M160 131 Q168 127 176 132" stroke={c.ink} strokeWidth="1.4" fill="none" />
        <path d="M130 141 Q137 135 144 141 Q137 144 130 141Z M160 141 Q167 135 174 141 Q167 144 160 141Z" fill={c.ink} />
        <path d="M153 146 Q150 157 155 160" stroke={c.peach} strokeWidth="1.5" fill="none" />
        <path d="M143 171 Q152 165 161 171 Q152 178 143 171Z" fill={c.vermilion} />
        <circle cx="119" cy="170" r="3" fill={c.xuan} stroke={c.gold} strokeWidth="1" />
        <circle cx="212" cy="252" r="38" fill={c.xuan} stroke={c.gold} strokeWidth="3" />
        <path d="M188 268 Q204 250 212 232 M204 252 Q214 244 226 246" stroke={c.ink} strokeWidth="1.4" fill="none" />
        {[[212, 232], [226, 246], [196 , 258], [218, 260]].map(([x, y]) => <Rose key={x} x={x} y={y} s={0.22} fill={`url(#${id}-petal)`} />)}
        <rect x="210" y="290" width="4" height="40" fill={c.jujube} />
        <path d="M198 300 q8 -12 18 -6 q-2 10 -14 12Z" fill={`url(#${id}-skin)`} stroke={c.peach} strokeWidth="0.8" />
      </g>
      <rect x="42" y="326" width="216" height="70" fill={c.xuan} stroke={c.jujube} strokeWidth="1.5" />
      <text x="150" y="340" textAnchor="middle" fontFamily={song} fontWeight="700" fontSize="9" fill={c.vermilion} letterSpacing="2">民國二十五年 · 一九三六 · 三月</text>
      {["日", "一", "二", "三", "四", "五", "六"].map((d, i) => (
        <text key={d} x={60 + i * 30} y="352" textAnchor="middle" fontFamily={song} fontSize="7" fontWeight="700" fill={i === 0 ? c.vermilion : c.ink}>{d}</text>
      ))}
      {days.map((d, i) => (
        <text key={d} x={60 + (i % 7) * 30} y={363 + Math.floor(i / 7) * 9} textAnchor="middle" fontFamily={slab} fontSize="7" fill={i % 7 === 0 ? c.vermilion : c.ink}>{d}</text>
      ))}
    </Print>
  );
}

export function LongjingTeaLabel() {
  const id = "cr-tea";
  const oct = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return `${(150 + Math.cos(a) * 96).toFixed(1)},${(198 + Math.sin(a) * 96).toFixed(1)}`;
  }).join(" ");
  return (
    <Print id={id} w={300} h={400} bg={c.cobalt} texture={tex(321)} defs={<>
      <pattern id={`${id}-fret`} width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill={c.cobalt} />
        <path d="M2 14 V2 H14 V14 H6 V6 H10 V10" fill="none" stroke={c.gold} strokeWidth="1.8" />
      </pattern>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.xuan} /><stop offset="100%" stopColor={c.peach} />
      </linearGradient>
      <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.celadon} /><stop offset="100%" stopColor={c.xuan} />
      </linearGradient>
      <clipPath id={`${id}-oct`}><polygon points={oct} /></clipPath>
    </>}>
      <rect x="10" y="10" width="280" height="380" fill={`url(#${id}-fret)`} />
      <rect x="26" y="26" width="248" height="348" fill={c.cobalt} stroke={c.gold} strokeWidth="2" />
      <Seal x={46} y={46} ch="茶" r={12} fill={c.gold} ink={c.cobalt} />
      <Seal x={254} y={46} ch="香" r={12} fill={c.gold} ink={c.cobalt} />
      <Ribbon id={id} cx={150} y={30} w={150} fill={c.imperial} text={rtl("西湖龍井")} size={22} color={c.vermilion} />
      <polygon points={oct} fill={c.xuan} stroke={c.gold} strokeWidth="6" />
      <g clipPath={`url(#${id}-oct)`}>
        <rect x="40" y="96" width="220" height="210" fill={`url(#${id}-sky)`} />
        <circle cx="112" cy="150" r="14" fill={c.vermilion} />
        <path d="M54 206 Q86 150 118 182 Q150 128 190 174 Q222 146 250 196 V236 H54Z" fill={`url(#${id}-far)`} />
        <path d="M54 220 Q80 190 106 210 Q132 182 162 212 Q198 186 250 220 V246 H54Z" fill={c.pine} />
        <g fill={c.jujube}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={190 - (12 - i * 2)} y={188 - i * 11} width={(12 - i * 2) * 2} height="8" />
              <path d={`M${190 - (16 - i * 2)} ${188 - i * 11} H${190 + (16 - i * 2)} L${190 + (12 - i * 2)} ${184 - i * 11} H${190 - (12 - i * 2)}Z`} fill={c.ink} />
            </g>
          ))}
          <line x1="190" y1="140" x2="190" y2="132" stroke={c.ink} strokeWidth="1.5" />
        </g>
        <rect x="40" y="236" width="220" height="40" fill={c.celadon} />
        {[244, 252, 260, 268].map((y, i) => <path key={y} d={`M${60 + i * 10} ${y} h${30 + i * 6} M${150 + i * 6} ${y} h${40 - i * 4}`} stroke={c.xuan} strokeWidth="1.2" />)}
        <path d="M118 256 h28 l-4 6 h-20Z" fill={c.ink} />
        <path d="M134 256 v-12 M128 246 l10 -4" stroke={c.ink} strokeWidth="1.5" />
        {[0, 1, 2].map((row) => Array.from({ length: 8 }, (_, i) => (
          <ellipse key={`${row}-${i}`} cx={52 + i * 28 + (row % 2) * 14} cy={284 + row * 12} rx="16" ry="8" fill={row % 2 ? c.willow : c.pine} stroke={c.ink} strokeWidth="0.6" />
        )))}
        <path d="M62 96 Q70 150 64 230 M74 96 Q86 160 80 222 M86 96 Q96 140 94 200" stroke={c.willow} strokeWidth="1.6" fill="none" />
      </g>
      <text x="150" y="330" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="26" fill={c.imperial} letterSpacing="8">{rtl("特級龍井")}</text>
      <text x="150" y="350" textAnchor="middle" fontFamily={slab} fontWeight="800" fontSize="10.5" fill={c.xuan} letterSpacing="2.5">SUPERIOR DRAGON WELL TEA</text>
      <text x="150" y="364" textAnchor="middle" fontFamily={slab} fontWeight="700" fontSize="8" fill={c.gold} letterSpacing="3">HANGCHOW · CHINA · 1948</text>
    </Print>
  );
}

export function HongKongNeon() {
  const id = "cr-neon";
  const r = rand(91);
  const windows = Array.from({ length: 70 }, () => [14 + r() * 272, 14 + r() * 280, r()]);
  const neon = (col: string, w = 2.2) => ({ fill: "none", stroke: col, strokeWidth: w });
  return (
    <Print id={id} w={300} h={420} bg={c.ink} texture={tex(331, { age: undefined, fade: undefined, grain: 0.5 })} defs={<>
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="3 7" /></filter>
      <clipPath id={`${id}-clip`}><rect x="12" y="12" width="276" height="396" /></clipPath>
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        {windows.map(([x, y, k], i) => <rect key={i} x={x} y={y} width="9" height="12" fill={k > 0.7 ? c.gold : c.jujube} opacity={k > 0.7 ? 0.5 : 0.35} />)}
        {[[24, 180], [250, 120], [200, 250]].map(([x, y]) => <rect key={x} x={x} y={y} width="24" height="16" fill={c.rice} opacity="0.25" />)}
        <g filter={`url(#${id}-glow)`}>
          <rect x="24" y="34" width="56" height="236" rx="6" {...neon(c.vermilion, 3)} />
          {["金", "鳳", "酒", "家"].map((ch, i) => (
            <text key={ch} x="52" y={88 + i * 54} textAnchor="middle" fontFamily={hei} fontWeight="900" fontSize="46" {...neon(c.imperial, 1.8)}>{ch}</text>
          ))}
          <path d="M150 74 C130 50 104 52 96 70 C110 66 118 74 120 86 C130 80 140 84 150 96 C160 84 170 80 180 86 C182 74 190 66 204 70 C196 52 170 50 150 74Z" {...neon(c.vermilion, 2.5)} transform="translate(56 6)" />
          <circle cx="206" cy="112" r="24" {...neon(c.imperial, 2.5)} />
          <text x="206" y="126" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="36" {...neon(c.imperial, 1.6)}>押</text>
          <rect x="236" y="160" width="40" height="124" rx="5" {...neon(c.celadon, 2.6)} />
          <text x="256" y="172" fontFamily={hei} fontWeight="900" fontSize="40" {...neon(c.celadon, 1.6)} style={{ writingMode: "vertical-rl" }}>麻雀</text>
          <rect x="98" y="182" width="118" height="40" rx="5" {...neon(c.peach, 2.4)} />
          <text x="157" y="212" textAnchor="middle" fontFamily={hei} fontWeight="900" fontSize="26" {...neon(c.peach, 1.5)} letterSpacing="4">茶餐廳</text>
        </g>
        <rect x="12" y="378" width="276" height="30" fill={c.ink} />
        <g filter={`url(#${id}-blur)`} opacity="0.55">
          <rect x="40" y="380" width="24" height="28" fill={c.imperial} />
          <rect x="140" y="384" width="34" height="24" fill={c.peach} />
          <rect x="248" y="380" width="20" height="28" fill={c.celadon} />
        </g>
        <g stroke={c.ink} strokeWidth="1.5">
          <rect x="34" y="298" width="168" height="80" rx="8" fill={c.pine} />
          <rect x="34" y="334" width="168" height="10" fill={c.xuan} />
          {Array.from({ length: 7 }, (_, i) => <rect key={i} x={42 + i * 22} y="304" width="16" height="24" fill={c.gold} opacity="0.85" />)}
          {Array.from({ length: 7 }, (_, i) => <rect key={`l${i}`} x={42 + i * 22} y="348" width="16" height="22" fill={c.gold} opacity="0.7" />)}
          <line x1="118" y1="298" x2="118" y2="276" />
          <line x1="104" y1="276" x2="132" y2="276" />
          <circle cx="62" cy="380" r="7" fill={c.ink} />
          <circle cx="174" cy="380" r="7" fill={c.ink} />
        </g>
        <text x="118" y="342.5" textAnchor="middle" fontFamily={hei} fontWeight="900" fontSize="7" fill={c.pine}>電車 · HONG KONG TRAMWAYS</text>
        <g stroke={c.ink} strokeWidth="1.2">
          <path d="M210 364 h70 v-12 l-10 -14 h-40 l-12 14 h-8Z" fill={c.vermilion} />
          <path d="M222 352 l10 -12 h36 l8 12Z" fill={c.rice} />
          <circle cx="226" cy="368" r="6" fill={c.ink} />
          <circle cx="268" cy="368" r="6" fill={c.ink} />
          <rect x="244" y="332" width="12" height="5" fill={c.imperial} />
        </g>
      </g>
      <rect x="12" y="12" width="276" height="396" fill="none" stroke={c.gold} strokeWidth="1.5" />
    </Print>
  );
}

export function DoubleHappinessCut() {
  const id = "cr-xi";
  const ring = (n: number, r: number) => Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n;
    return { x: 150 + Math.cos(a) * r, y: 150 + Math.sin(a) * r, deg: (a * 180) / Math.PI };
  });
  return (
    <Print id={id} w={300} h={300} bg={c.xuan} texture={tex(341, { wear: 0.15, rough: 0.5, fadeStrength: 0.06 })}>
      <polygon points="150,14 286,150 150,286 14,150" fill={c.imperial} stroke={c.gold} strokeWidth="2" />
      <polygon points="150,30 270,150 150,270 30,150" fill="none" stroke={c.gold} strokeWidth="1" />
      {ring(28, 112).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="10" fill={c.vermilion} />)}
      <circle cx="150" cy="150" r="112" fill={c.vermilion} />
      {ring(28, 114).map((p, i) => <circle key={`h${i}`} cx={p.x} cy={p.y} r="2.6" fill={c.imperial} />)}
      {ring(16, 94).map((p, i) => (
        <path key={`t${i}`} d="M0 -9 C5 -3 5 3 0 9 C-5 3 -5 -3 0 -9Z" fill={c.imperial} transform={`translate(${p.x} ${p.y}) rotate(${p.deg + 90})`} />
      ))}
      {ring(16, 94).map((p, i) => {
        const q = ring(16, 94)[(i + 1) % 16];
        const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
        return <circle key={`d${i}`} cx={mx} cy={my} r="2.4" fill={c.imperial} />;
      })}
      <circle cx="150" cy="150" r="78" fill="none" stroke={c.imperial} strokeWidth="3" />
      <circle cx="150" cy="150" r="72" fill="none" stroke={c.imperial} strokeWidth="1.2" strokeDasharray="4 4" />
      <text x="150" y="190" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="112" fill={c.imperial}>囍</text>
      {[[-1, -1], [1, 1]].map(([dx, dy]) => (
        <g key={dx} transform={`translate(${150 + dx * 106} ${150 + dy * 106}) rotate(${dx > 0 ? 180 : 0})`}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-8" rx="5" ry="8" fill={c.vermilion} transform={`rotate(${a})`} />)}
          <circle r="3.5" fill={c.imperial} />
        </g>
      ))}
    </Print>
  );
}

export function RedEnvelope() {
  const id = "cr-hongbao";
  const koi = "M0 -40 C14 -36 20 -16 14 4 C10 18 4 28 0 40 C-4 28 -10 18 -14 4 C-20 -16 -14 -36 0 -40Z";
  return (
    <Print id={id} w={240} h={380} bg={c.peach} texture={tex(351, { wear: 0.2 })} defs={<>
      <linearGradient id={`${id}-foil`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c.gold} /><stop offset="45%" stopColor={c.imperial} /><stop offset="55%" stopColor={c.xuan} /><stop offset="70%" stopColor={c.imperial} /><stop offset="100%" stopColor={c.gold} />
      </linearGradient>
      <Hatch id={`${id}-linen`} color={c.jujube} width={0.6} gap={3} angle={45} />
      <pattern id={`${id}-waves`} width="24" height="12" patternUnits="userSpaceOnUse">
        {[10, 7, 4].map((r) => <path key={r} d={`M${12 - r} 12 A${r} ${r} 0 0 1 ${12 + r} 12`} fill="none" stroke={c.imperial} strokeWidth="1" />)}
        {[10, 7, 4].map((r) => <path key={`b${r}`} d={`M${-r} 6 A${r} ${r} 0 0 1 ${r} 6 M${24 - r} 6 A${r} ${r} 0 0 1 ${24 + r} 6`} fill="none" stroke={c.imperial} strokeWidth="1" />)}
      </pattern>
    </>}>
      <ellipse cx="124" cy="366" rx="96" ry="8" fill={c.jujube} opacity="0.35" />
      <rect x="26" y="18" width="188" height="344" rx="6" fill={c.vermilion} stroke={c.jujube} strokeWidth="2" />
      <rect x="26" y="18" width="188" height="344" rx="6" fill={`url(#${id}-linen)`} opacity="0.25" />
      <path d="M26 26 Q120 132 214 26 V18 H26Z" fill={c.jujube} />
      <path d="M26 26 Q120 132 214 26" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="2.5" />
      <circle cx="120" cy="96" r="26" fill={`url(#${id}-foil)`} stroke={c.jujube} strokeWidth="1.5" />
      <text x="120" y="108" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="32" fill={c.vermilion}>福</text>
      <circle cx="120" cy="206" r="58" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="2" />
      {[[-30, 0], [150, 180]].map(([rot, k]) => (
        <g key={k} transform={`translate(120 206) rotate(${rot}) translate(-24 0)`}>
          <path d="M0 40 L-12 58 Q0 51 12 58Z" fill={`url(#${id}-foil)`} />
          <path d={koi} fill={`url(#${id}-foil)`} />
          <path d="M-8 -14 q8 6 16 0 M-9 -2 q9 6 18 0 M-8 10 q8 6 16 0" stroke={c.vermilion} strokeWidth="1.2" fill="none" />
          <circle cx="-5" cy="-30" r="2" fill={c.vermilion} />
          <circle cx="5" cy="-30" r="2" fill={c.vermilion} />
          <path d="M-14 -4 L-24 6 L-12 6Z M14 -4 L24 6 L12 6Z" fill={`url(#${id}-foil)`} />
        </g>
      ))}
      {[[60, 150], [182, 160], [64, 262], [178, 256]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="9" fill={`url(#${id}-foil)`} />
          <rect x={x - 3} y={y - 3} width="6" height="6" fill={c.vermilion} />
        </g>
      ))}
      <text x="120" y="296" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="23" fill={`url(#${id}-foil)`} letterSpacing="3">恭喜發財</text>
      <rect x="30" y="310" width="180" height="48" fill={`url(#${id}-waves)`} />
      {[[44, 40], [196, 40]].map(([x, y]) => (
        <path key={x} d={`M${x - 10} ${y} q0 -10 10 -10 q10 0 10 10 q0 6 -6 6 q-5 0 -5 -5`} stroke={`url(#${id}-foil)`} strokeWidth="2" fill="none" />
      ))}
    </Print>
  );
}

function Swallow({ x, y, s = 1, a = 0 }: { x: number; y: number; s?: number; a?: number }) {
  return (
    <path
      d="M0 0 C-8 -6 -20 -7 -30 -2 C-18 -2 -10 2 -6 6 L-16 20 L-2 9 L3 20 L5 7 C10 2 20 -3 32 -2 C20 -7 8 -6 0 0Z"
      fill={c.ink} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
    />
  );
}

export function FlyingSwallowBicycle() {
  const id = "cr-bike";
  const rear = [88, 310], front = [214, 310], crank = [146, 310];
  const spokes = (cx: number, cy: number) => Array.from({ length: 18 }, (_, i) => {
    const a = (Math.PI * i) / 9;
    return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * 46} y2={cy + Math.sin(a) * 46} stroke={c.ink} strokeWidth="0.6" />;
  });
  const frame = `M${rear[0]} ${rear[1]} L${crank[0]} ${crank[1]} L128 232 Z M128 236 L200 230 L${crank[0]} ${crank[1]} M200 228 L${front[0]} ${front[1]}`;
  return (
    <Print id={id} w={300} h={420} bg={c.imperial} texture={tex(361)} defs={<>
      <clipPath id={`${id}-clip`}><rect x="14" y="14" width="272" height="392" /></clipPath>
    </>}>
      <g clipPath={`url(#${id}-clip)`}>
        {Array.from({ length: 24 }, (_, i) => {
          const a1 = (Math.PI * 2 * i) / 24, a2 = a1 + Math.PI / 24;
          return <polygon key={i} points={`150,300 ${150 + Math.cos(a1) * 400},${300 + Math.sin(a1) * 400} ${150 + Math.cos(a2) * 400},${300 + Math.sin(a2) * 400}`} fill={c.vermilion} opacity="0.85" />;
        })}
        <circle cx="150" cy="300" r="70" fill={c.imperial} opacity="0.6" />
      </g>
      <rect x="14" y="14" width="272" height="66" fill={c.vermilion} stroke={c.ink} strokeWidth="1.5" />
      <text x="150" y="52" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="27" fill={c.imperial} letterSpacing="4">{rtl("飛燕牌自行車")}</text>
      <text x="150" y="70" textAnchor="middle" fontFamily={slab} fontWeight="800" fontSize="10" fill={c.xuan} letterSpacing="3">FLYING SWALLOW BICYCLES</text>
      {[[22, "名牌產品"], [256, "輕快耐用"]].map(([x, t]) => (
        <g key={x as number}>
          <rect x={x as number} y="94" width="24" height="112" fill={c.xuan} stroke={c.ink} strokeWidth="1.2" />
          <VText x={(x as number) + 12} y={102} text={t as string} size={18} fill={c.vermilion} font={song} weight={900} />
        </g>
      ))}
      <Swallow x={96} y={150} s={1.1} a={-8} />
      <Swallow x={160} y={118} s={0.8} a={6} />
      <Swallow x={214} y={168} s={0.65} a={-14} />
      {[rear, front].map(([cx, cy]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="50" fill="none" stroke={c.ink} strokeWidth="6" />
          <circle cx={cx} cy={cy} r="45" fill="none" stroke={c.xuan} strokeWidth="1.5" />
          {spokes(cx, cy)}
          <circle cx={cx} cy={cy} r="4" fill={c.gold} stroke={c.ink} strokeWidth="1" />
          <path d={`M${cx - 52} ${cy - 6} A54 54 0 0 1 ${cx + 40} ${cy - 36}`} fill="none" stroke={c.ink} strokeWidth="3" />
        </g>
      ))}
      <path d={frame} fill="none" stroke={c.ink} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
      <path d={frame} fill="none" stroke={c.gold} strokeWidth="1" strokeLinejoin="round" />
      <path d={`M${rear[0]} ${rear[1]} L76 262 H130`} fill="none" stroke={c.ink} strokeWidth="2.5" />
      <circle cx={crank[0]} cy={crank[1]} r="12" fill="none" stroke={c.gold} strokeWidth="3" />
      <circle cx={crank[0]} cy={crank[1]} r="12" fill="none" stroke={c.ink} strokeWidth="1" strokeDasharray="2 2" />
      <line x1={crank[0]} y1={crank[1]} x2={crank[0] + 10} y2={crank[1] + 18} stroke={c.ink} strokeWidth="3" />
      <rect x={crank[0] + 4} y={crank[1] + 18} width="14" height="4" fill={c.ink} />
      <path d={`M${rear[0]} ${rear[1] - 4} L${crank[0]} ${crank[1] - 12} M${rear[0]} ${rear[1] + 4} L${crank[0]} ${crank[1] + 12}`} stroke={c.ink} strokeWidth="1" />
      <line x1="128" y1="232" x2="124" y2="222" stroke={c.ink} strokeWidth="3" />
      <path d="M106 218 Q126 212 142 220 Q130 226 108 224Z" fill={c.jujube} stroke={c.ink} strokeWidth="1.5" />
      <path d="M200 230 L196 214 Q190 206 176 210 M196 214 Q204 206 216 212" fill="none" stroke={c.ink} strokeWidth="3" strokeLinecap="round" />
      <circle cx="210" cy="232" r="5" fill={c.xuan} stroke={c.ink} strokeWidth="1.5" />
      <rect x="14" y="368" width="272" height="38" fill={c.cobalt} />
      <text x="150" y="390" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="16" fill={c.xuan} letterSpacing="4">{rtl("上海自行車廠出品")}</text>
      <text x="150" y="401" textAnchor="middle" fontFamily={slab} fontWeight="700" fontSize="7" fill={c.imperial} letterSpacing="3">SHANGHAI BICYCLE WORKS · 1958</text>
      <rect x="14" y="14" width="272" height="392" fill="none" stroke={c.ink} strokeWidth="2" />
    </Print>
  );
}

export function ThermosAndMug() {
  const id = "cr-thermos";
  return (
    <Print id={id} w={300} h={400} bg={c.celadon} texture={tex(371)} defs={<>
      {petal(id)}
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={c.jujube} /><stop offset="30%" stopColor={c.vermilion} /><stop offset="45%" stopColor={c.peach} /><stop offset="60%" stopColor={c.vermilion} /><stop offset="100%" stopColor={c.jujube} />
      </linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={c.gold} /><stop offset="45%" stopColor={c.imperial} /><stop offset="100%" stopColor={c.gold} />
      </linearGradient>
      <linearGradient id={`${id}-enamel`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={c.rice} /><stop offset="40%" stopColor={c.xuan} /><stop offset="100%" stopColor={c.rice} />
      </linearGradient>
      <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c.xuan} stopOpacity="0.55" /><stop offset="100%" stopColor={c.xuan} stopOpacity="0" />
      </linearGradient>
      <Hatch id={`${id}-wood`} color={c.ink} width={0.8} gap={7} angle={0} />
    </>}>
      <rect x="0" y="0" width="300" height="300" fill={`url(#${id}-light)`} />
      <rect x="0" y="300" width="300" height="100" fill={c.jujube} />
      <rect x="0" y="300" width="300" height="100" fill={`url(#${id}-wood)`} opacity="0.35" />
      <ellipse cx="160" cy="330" rx="130" ry="26" fill={c.xuan} />
      {Array.from({ length: 30 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 30;
        return <circle key={i} cx={160 + Math.cos(a) * 130} cy={330 + Math.sin(a) * 26} r="6" fill={c.xuan} />;
      })}
      <ellipse cx="160" cy="330" rx="112" ry="20" fill="none" stroke={c.rice} strokeWidth="1.2" strokeDasharray="3 3" />
      <rect x="92" y="122" width="86" height="208" rx="10" fill={`url(#${id}-body)`} stroke={c.ink} strokeWidth="1.5" />
      <rect x="92" y="300" width="86" height="30" rx="6" fill={`url(#${id}-metal)`} stroke={c.ink} strokeWidth="1.2" />
      <path d="M104 122 Q135 96 166 122Z" fill={`url(#${id}-metal)`} stroke={c.ink} strokeWidth="1.2" />
      <rect x="114" y="82" width="42" height="26" rx="5" fill={`url(#${id}-metal)`} stroke={c.ink} strokeWidth="1.2" />
      {[88, 94, 100].map((y) => <line key={y} x1="116" y1={y} x2="154" y2={y} stroke={c.gold} strokeWidth="1" />)}
      <path d="M178 150 Q200 150 200 180 V240 Q200 262 178 262" fill="none" stroke={c.ink} strokeWidth="5" />
      <path d="M178 150 Q200 150 200 180 V240 Q200 262 178 262" fill="none" stroke={c.gold} strokeWidth="2.5" />
      <Leaf x={120} y={206} a={-150} s={1.1} />
      <Leaf x={150} y={214} a={-30} s={1} fill={c.willow} />
      <Rose x={134} y={200} s={0.95} fill={`url(#${id}-petal)`} />
      <Rose x={112} y={244} s={0.55} fill={`url(#${id}-petal)`} />
      <Rose x={160} y={252} s={0.5} fill={`url(#${id}-petal)`} />
      <text x="135" y="290" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="13" fill={c.imperial} letterSpacing="2">熱水瓶</text>
      <path d="M212 252 Q236 252 236 274 Q236 296 212 296" fill="none" stroke={c.xuan} strokeWidth="7" />
      <path d="M212 252 Q236 252 236 274 Q236 296 212 296" fill="none" stroke={c.ink} strokeWidth="1" />
      <rect x="164" y="236" width="52" height="96" rx="5" fill={`url(#${id}-enamel)`} stroke={c.ink} strokeWidth="1.2" />
      <rect x="162" y="232" width="56" height="8" rx="4" fill={c.cobalt} />
      <rect x="164" y="324" width="52" height="8" rx="3" fill={c.cobalt} />
      <text x="190" y="290" textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="30" fill={c.vermilion}>囍</text>
      <text x="190" y="314" textAnchor="middle" fontFamily={song} fontWeight="700" fontSize="9" fill={c.cobalt} letterSpacing="2">上海</text>
      {[[170, 236], [206, 238], [214, 330]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="1.8" fill={c.ink} />)}
      {[0, 1, 2].map((i) => <path key={i} d={`M${180 + i * 10} 226 q-6 -10 0 -20 t0 -20`} stroke={c.xuan} strokeWidth="2" fill="none" opacity="0.7" />)}
      <Ribbon id={id} cx={150} y={22} w={170} fill={c.xuan} tail={c.vermilion} text={rtl("國貨精品")} size={22} color={c.vermilion} />
      <text x="150" y="388" textAnchor="middle" fontFamily={slab} fontWeight="800" fontSize="9" fill={c.xuan} letterSpacing="3" opacity="0.9">NATIONAL PRODUCTS · SHANGHAI</text>
    </Print>
  );
}

function Tile({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y - 9} width="54" height="14" rx="6" fill={c.celadon} stroke={c.ink} strokeWidth="1" />
      <rect x={x} y={y} width="54" height="76" rx="7" fill={c.xuan} stroke={c.ink} strokeWidth="1.2" />
      <rect x={x + 4} y={y + 4} width="46" height="68" rx="5" fill="none" stroke={c.rice} strokeWidth="1.5" />
      {children}
    </g>
  );
}

export function MahjongTable() {
  const id = "cr-mahjong";
  const top = 76;
  return (
    <Print id={id} w={360} h={260} bg={c.pine} texture={tex(381, { age: c.ink, ageStrength: 0.45 })} defs={<>
      <Hatch id={`${id}-felt`} color={c.ink} width={0.6} gap={3} angle={30} />
    </>}>
      <rect width="360" height="260" fill={`url(#${id}-felt)`} opacity="0.25" />
      <text x="24" y="40" fontFamily={song} fontWeight="900" fontSize="18" fill={c.imperial} letterSpacing="6">{rtl("雀館")}</text>
      <text x="24" y="54" fontFamily={slab} fontWeight="700" fontSize="8" fill={c.xuan} letterSpacing="3" opacity="0.85">MAHJONG CLUB · KOWLOON</text>
      <ellipse cx="180" cy="160" rx="160" ry="8" fill={c.ink} opacity="0.35" />
      <Tile x={22} y={top}><text x="49" y={top + 52} textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="40" fill={c.vermilion}>中</text></Tile>
      <Tile x={86} y={top}><text x="113" y={top + 52} textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="38" fill={c.pine}>發</text></Tile>
      <Tile x={150} y={top}>
        {[18, 13, 8, 3].map((r, i) => <circle key={r} cx="177" cy={top + 38} r={r} fill={[c.cobalt, c.xuan, c.vermilion, c.pine][i]} stroke={c.ink} strokeWidth="0.6" />)}
      </Tile>
      <Tile x={214} y={top}>
        {[228, 241, 254].map((x, i) => (
          <g key={x}>
            <rect x={x - 3} y={top + 12 + (i === 1 ? 6 : 0)} width="6" height="50" rx="3" fill={c.pine} />
            {[0, 1, 2].map((k) => <rect key={k} x={x - 4} y={top + 22 + k * 14 + (i === 1 ? 6 : 0)} width="8" height="2.5" fill={c.vermilion} />)}
          </g>
        ))}
      </Tile>
      <Tile x={278} y={top}>
        <text x="305" y={top + 32} textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="22" fill={c.ink}>八</text>
        <text x="305" y={top + 62} textAnchor="middle" fontFamily={song} fontWeight="900" fontSize="26" fill={c.vermilion}>萬</text>
      </Tile>
      {[[70, 206], [112, 214]].map(([x, y], k) => (
        <g key={x} transform={`rotate(${k ? 14 : -10} ${x} ${y})`}>
          <rect x={x - 16} y={y - 16} width="32" height="32" rx="6" fill={c.xuan} stroke={c.ink} strokeWidth="1.2" />
          {(k ? [[-8, -8], [8, 8], [0, 0]] : [[-8, -8], [8, -8], [-8, 8], [8, 8]]).map(([dx, dy], i) => (
            <circle key={i} cx={x + dx} cy={y + dy} r="3" fill={k ? c.ink : c.vermilion} />
          ))}
        </g>
      ))}
      <g>
        <ellipse cx="290" cy="222" rx="34" ry="9" fill={c.xuan} stroke={c.ink} strokeWidth="1" />
        <path d="M262 196 Q266 230 290 232 Q314 230 318 196Z" fill={c.xuan} stroke={c.ink} strokeWidth="1.2" />
        <ellipse cx="290" cy="196" rx="28" ry="6" fill={c.gold} stroke={c.ink} strokeWidth="1" />
        <path d="M264 204 Q290 212 316 204" stroke={c.cobalt} strokeWidth="3" fill="none" />
        {[272, 284, 296, 308].map((x) => <circle key={x} cx={x} cy="216" r="1.8" fill={c.cobalt} />)}
      </g>
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx="196" cy={226 - i * 5} rx="18" ry="5" fill={i % 2 ? c.vermilion : c.imperial} stroke={c.ink} strokeWidth="0.8" />)}
    </Print>
  );
}

export const originals: Original[] = [
  { title: "Golden Carp Label", note: "爆竹", Component: GoldenCarpLabel },
  { title: "Calendar Girl", note: "月份牌", Component: CalendarGirl },
  { title: "Longjing Tea Label", note: "茶葉", Component: LongjingTeaLabel },
  { title: "Hong Kong Neon", note: "霓虹", Component: HongKongNeon },
  { title: "Double Happiness Cut", note: "剪紙", Component: DoubleHappinessCut },
  { title: "Red Envelope", note: "利是", Component: RedEnvelope },
  { title: "Flying Swallow Bicycle", note: "單車", Component: FlyingSwallowBicycle },
  { title: "Thermos & Mug", note: "國貨", Component: ThermosAndMug },
  { title: "Mahjong Table", note: "麻雀", Component: MahjongTable },
];
