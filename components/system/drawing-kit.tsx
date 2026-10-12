"use client";
// Shōwa's drawing kit on its Design System page, grouped by the Mood Board 01 picture each element comes from; other
// systems have none. Elements app/system.css draws (the knob) are shown as the live pieces.
import { colors } from "@/app/boards";
import { showa } from "@/app/systems";
import { useSystemId } from "./context";
import { SunOverWaves } from "./koi";
import { Signboard } from "./osaka";
import { Tenneniro } from "./terebi";
import { Aura, Cloud, Eye, Hand, Planet, Rays, Sparkle } from "./yokoo";

const c = colors(showa.board);

const tile = (children: React.ReactNode, viewBox = "0 0 80 80") => <svg aria-hidden viewBox={viewBox} className="h-20 w-20">{children}</svg>;
const box = (children: React.ReactNode) => <div aria-hidden inert className="grid h-20 w-20 place-items-center">{children}</div>;
const strip = Array.from({ length: 6 }, (_, i) => <rect key={i} x={4 + i * 13} y={36} width={7} height={8} rx={1} fill={c.washi} />);
const flag = (x: number, y: number) => (
  <g key={`${x}${y}`}>
    <rect x={x} y={y} width={16} height={16} fill={c.washi} stroke={c.sumi} strokeWidth={2.5} />
    <circle cx={x + 8} cy={y + 8} r={4} fill={c.hinomaru} />
  </g>
);
const knob = (checked: boolean) => (
  <span className="ds-check min-h-0"><input type="radio" checked={checked} readOnly tabIndex={-1} /><span className="ds-box" /></span>
);

type Element = { name: string; jp: string; note: string; art: React.ReactNode };
const groups: { picture: string; elements: Element[] }[] = [
  {
    picture: "Koi Pond · picture 02",
    elements: [
      { name: "Sun over waves", jp: "日の出", note: "The sun rising out of the sea over 青海波 waves heads the signboard.", art: <SunOverWaves className="h-20 w-20" /> },
    ],
  },
  {
    picture: "Tadanori Yokoo · picture 22",
    elements: [
      { name: "Block type", jp: "立体文字", note: "Display type stands on a Hinomaru extrusion, closed by a Sumi edge.",
        art: <span aria-hidden lang="ja" className="ds-display grid h-20 place-items-center justify-self-start text-[64px] leading-none">映</span> },
      { name: "Rays", jp: "旭日", note: "Alternating wedges radiate from a sun, as in Yokoo's poster.",
        art: tile(<><Rays cx={40} cy={40} r={37} n={16} ground={c.washi} /><circle cx={40} cy={40} r={37} fill="none" stroke={c.sumi} strokeWidth={2.5} /></>) },
      { name: "Aura", jp: "後光", note: "A sawtooth halo rings the small sun before Now showing.",
        art: tile(<><Aura cx={40} cy={40} r={36} teeth={22} depth={0.2} k={2.5} /><circle cx={40} cy={40} r={20} fill={c.hinomaru} stroke={c.sumi} strokeWidth={2.5} /></>) },
      { name: "Sparkle", jp: "キラキラ", note: "Four-point stars fill the gaps; a switched-on toggle turns into one.",
        art: tile(<><Sparkle x={34} y={42} r={26} k={2.5} /><Sparkle x={64} y={18} r={11} fill={c.hinomaru} k={2} /></>) },
      { name: "Planet", jp: "惑星", note: "A ringed planet, its band passing behind and coming round in front.", art: tile(<Planet cx={40} cy={40} r={19} k={2.5} />) },
      { name: "Cloud", jp: "雲", note: "Scalloped puffs with one curl inside.", art: tile(<Cloud x={16} y={42} s={0.95} k={2.5} />) },
      { name: "Eye", jp: "目", note: "An almond eye with a heavy lid and an Ai iris.", art: tile(<Eye cx={40} cy={40} w={66} k={2.5} />) },
      { name: "Hand", jp: "指差し", note: "Points down the select, instead of an arrow.", art: tile(<Hand x={6} y={24} s={1.08} k={2.5} />) },
      { name: "Film strip", jp: "フィルム", note: "Sprocket bands divide this page's sections and frame the toast.",
        art: tile(<><rect x={0} y={30} width={80} height={20} fill={c.sumi} />{strip}</>) },
      { name: "Flag corners", jp: "日の丸", note: "Panels: a double Sumi rule with flag blocks at its corners.",
        art: tile(<><rect x={10} y={10} width={60} height={60} fill="none" stroke={c.sumi} strokeWidth={5} /><rect x={10} y={10} width={60} height={60} fill="none" stroke={c.washi} strokeWidth={1.6} />{[flag(2, 2), flag(62, 2), flag(2, 62), flag(62, 62)]}</>) },
    ],
  },
  {
    picture: "Color TV Ad · picture 25",
    elements: [
      { name: "Natural color", jp: "天然色", note: "A native word prints its first three characters in Hinomaru, Ai and Kogecha: the signboard, this page's title.",
        art: <span aria-hidden lang="ja" className="ds-heading flex h-20 items-center text-[30px] leading-none"><span><Tenneniro text="映画館" /></span></span> },
      { name: "Knob", jp: "つまみ", note: "Radios turn their pointer to 12 o'clock and light their face Ai when chosen.",
        art: box(<span className="flex items-center gap-3">{knob(false)}{knob(true)}</span>) },
    ],
  },
  {
    picture: "Osaka Rainy Night · picture 26",
    elements: [
      { name: "Signboard", jp: "看板", note: "A capped board, its word set top to bottom in 天然色, the cinema's stamp below.",
        art: box(<div className="[zoom:0.36]"><Signboard text="上映中" stamp="映" /></div>) },
    ],
  },
];

export function DrawingKit() {
  if (useSystemId() !== "showa") return null;
  return (
    <div className="grid gap-12">
      {groups.map((g) => (
        <div key={g.picture} className="grid gap-5">
          <p className="ds-label ds-muted">Drawing kit · after {g.picture}, Mood Board 01</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {g.elements.map((k) => (
              <li key={k.name} className="grid content-start gap-2">
                {k.art}
                <p className="ds-label">{k.name} <span lang="ja" className="ds-native text-[12px]">{k.jp}</span></p>
                <p className="ds-fine ds-muted">{k.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
