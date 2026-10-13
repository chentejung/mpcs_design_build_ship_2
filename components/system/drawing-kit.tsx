"use client";
// Shōwa's drawing kit on its Design System page, grouped by the Mood Board 01 picture each element comes from, then
// the woodblock finish and landscape pieces they are all cut in, after the ukiyo-e-style print that sets the four
// posters together (references/showa-brushwork.jpg); other systems have none. Elements app/system.css draws (the
// radios, the pinstripes, the red band, the brushed kicker) are shown as the live pieces.
import { colors } from "@/app/boards";
import { categories } from "@/app/films";
import { showa } from "@/app/systems";
import { useSystemId } from "./context";
import { FujiMark, FujiPoster, Hills, Isle, Lake, Mist, paperInks, Pine, Shore, SignOff, Sun } from "./fuji";
import { GenreIcon, genreGlyphs } from "./genre-icons";
import { Portrait } from "./nouvelle";
import { Lantern } from "./osaka";
import { RamenBowl } from "./ramen";
import { WaitingShiba } from "./shiba";
import { Bokashi, Paper, useSvgId, Woodblock } from "./woodblock";

const c = colors(showa.board);
const box = (children: React.ReactNode, className = "h-20 w-20") => <div aria-hidden inert className={`grid place-items-center ${className}`}>{children}</div>;
// Wide drawings keep their own proportions inside the row's height.
const wideArt = (children: React.ReactNode, className = "h-40") => <div aria-hidden inert className={`flex items-end ${className}`}>{children}</div>;
const glyph = (id: keyof typeof genreGlyphs) => box(<GenreIcon id={id} className="h-16 w-16" />);
const radio = (checked: boolean) => (
  <span className="ds-check min-h-0"><input type="radio" checked={checked} readOnly tabIndex={-1} /><span className="ds-box" /></span>
);
const label = (id: keyof typeof genreGlyphs) => (id === "all" ? "All" : categories.find((c) => c.id === id)!.label);
const pictogram = (id: keyof typeof genreGlyphs, jp: string): Element => ({ name: `${label(id)} pictogram`, jp, note: genreGlyphs[id].from, art: glyph(id) });

// A piece of the landscape on its own, printed on a scrap of old paper like the drawings it belongs to.
function Sample({ viewBox, children, paper = true }: { viewBox: string; children: React.ReactNode; paper?: boolean }) {
  const id = useSvgId();
  const [x, y, width, height] = viewBox.split(" ").map(Number);
  return (
    <svg aria-hidden viewBox={viewBox} className="h-full max-w-full">
      <defs><Woodblock id={id} rough={1.2} specks={0.5} grain={0.45} mottle={0.45} /></defs>
      {paper && <Paper x={x} y={y} width={width} height={height} rx={3} {...paperInks} />}
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
}

// The finish on its own: a block of Ai, wiped (bokashi) from full strength to nothing.
function BokashiSample() {
  const id = useSvgId();
  return (
    <Sample viewBox="0 0 160 60">
      <defs><Bokashi id={id} color={c.ai} from={1} to={0} across /></defs>
      <rect x="8" y="8" width="144" height="44" fill={`url(#${id})`} />
    </Sample>
  );
}

type Element = { name: string; jp: string; note: string; art: React.ReactNode; wide?: boolean };
const groups: { picture: string; label?: string; elements: Element[] }[] = [
  {
    picture: "Fuji Sunrise · picture 04",
    elements: [
      { name: "Poster", jp: "ポスター", note: "A sun behind Fuji on its own sheet: snow running down the gullies, cloud bands, blue hills, wooded islands, a lake, rocks and a pine, エイガ on a title slip and EIGAKAN in the margin: the /movies hero.",
        art: box(<FujiPoster className="h-full" />, "h-48 w-36 justify-self-start") },
      { name: "Banner", jp: "横長", note: "The poster widened into a landscape for phones, with Nouvelle Vague's red band carrying 上映中.", art: wideArt(<FujiPoster wide className="h-full max-w-full" />), wide: true },
      { name: "Brand mark", jp: "マーク", note: "The print in 40px, before Eigakan 映画館.", art: box(<FujiMark className="h-16 w-16" />) },
      pictogram("all", "全部"),
      { name: "Sign-off", jp: "夕日", note: "The sun setting behind Fuji across a lake between two pines, at the foot of every Eigakan page, over a pinstripe band.",
        art: <div aria-hidden className="ds-sign-off !mt-0 !h-auto aspect-[1200/130] w-full"><SignOff className="block h-full w-full" /></div>, wide: true },
    ],
  },
  {
    picture: "Shiba & Sake · picture 06",
    elements: [
      { name: "Waiting Shiba", jp: "待つ", note: "Sitting up on a rock above Fuji's lake, eyes shut and nose raised, by an empty bowl and its chopsticks: the Saved page before anything is saved.",
        art: wideArt(<WaitingShiba className="h-full max-w-full" />, "h-48"), wide: true },
      pictogram("animation", "柴犬"),
      pictogram("action", "箸"),
    ],
  },
  {
    picture: "Nouvelle Vague · picture 08",
    elements: [
      { name: "Portrait", jp: "肖像", note: "The portrait the pictograms are cut from, on a red card set askew: the bob's strands, winged eye, cheek, lips, Ai collar, grass over its foot.",
        art: box(<Portrait className="h-full" />, "h-48 w-40 justify-self-start") },
      pictogram("thriller", "目"),
      pictogram("comedy", "唇"),
      pictogram("romance", "頬"),
      pictogram("horror", "黒髪"),
      { name: "Red band", jp: "帯", note: "Runs down the left edge of every panel, as ヌーベルバーグ's does.",
        art: box(<div className="ds-panel h-16 w-16 !p-0" />) },
      { name: "Pinstripes", jp: "縞", note: "The sweater's Washi lines on Ai: section rules, the selected tab, a switched-on toggle.",
        art: box(<span className="block h-10 w-20 rounded-[3px]" style={{ background: "var(--ds-pinstripe)" }} />) },
    ],
  },
  {
    picture: "Ramen · picture 18",
    elements: [
      { name: "Bowl", jp: "丼", note: "Two Hinomaru rings under the lip and Ai turned round the belly; full of chashu, noodles, scallion, egg and nori here, empty by the Shiba. The header's foot takes its rings.",
        art: box(<RamenBowl className="h-24 w-24" />, "h-24 w-24") },
      pictogram("science-fiction", "卵"),
      { name: "Sunrise radio", jp: "日の出", note: "A radio's Ai sea, and the red sun that rises out of it when chosen.", art: box(<span className="flex items-center gap-3">{radio(false)}{radio(true)}</span>) },
    ],
  },
  {
    picture: "Osaka Rainy Night · picture 26",
    elements: [
      { name: "Lantern", jp: "提灯", note: "The Saved count hangs as a paper lantern and sways when the count changes.", art: <Lantern className="h-20 w-20" /> },
    ],
  },
  {
    picture: "Woodblock",
    label: "Drawing kit · woodblock finish and landscape, after the print that sets the four posters together",
    elements: [
      { name: "Paper", jp: "和紙", note: "Washi stained unevenly with Kinari and darker towards its edges, with Kogecha fibres in it: every print is pulled on it.",
        art: wideArt(<Sample viewBox="0 0 160 60"><g /></Sample>), wide: true },
      { name: "Bokashi", jp: "ぼかし", note: "An ink wiped from full strength to nothing, with the wood's grain streaking it and the baren's mottle in it: skies, Fuji, hills and water.",
        art: wideArt(<BokashiSample />), wide: true },
      { name: "Sun", jp: "日輪", note: "Flat Hinomaru, nicked with Washi scratches where the block wore.",
        art: box(<Sample viewBox="0 0 80 80"><Sun cx={40} cy={40} r={30} /></Sample>) },
      { name: "Pine", jp: "松", note: "A Sumi bough with tiers of needles: each a dark pad under a flat fan of Ai needles flicked out and lifted off.",
        art: wideArt(<Sample viewBox="-10 -66 150 104"><Pine x={-6} y={0} dir={1} /></Sample>), wide: true },
      { name: "Cloud bands", jp: "霞", note: "Kinari laid in one sideways drag with torn ends and a Kogecha underside; Hinomaru where they cross the sun.",
        art: wideArt(<Sample viewBox="0 0 160 60"><Mist bands={[[8, 20, 116, 9], [40, 36, 110, 7], [14, 50, 80, 5]]} /><Mist bands={[[80, 12, 66, 5]]} color={c.hinomaru} under={null} /></Sample>), wide: true },
      { name: "Hills and isles", jp: "山並", note: "Ranges of Ai wiped pale at their foot where the mist lies, and Sumi islands crowned with trees.",
        art: wideArt(<Sample viewBox="0 0 160 60"><Hills x0={0} x1={160} y={52} h={22} seed={4} depth={0.6} /><Hills x0={50} x1={160} y={52} h={12} humps={3} seed={8} /><Isle x0={14} x1={80} y={52} h={9} /></Sample>), wide: true },
      { name: "Lake", jp: "湖", note: "A wash of Ai deepening to the shore, ruled in drags with Washi glints and the sun broken into Kinari dashes.",
        art: wideArt(<Sample viewBox="0 0 160 60"><Lake x0={0} x1={160} y0={4} y1={56} w={1.8} sun={80} /></Sample>), wide: true },
      { name: "Rocks", jp: "岩", note: "Boulders in Kogecha before a Sumi row, lit along the shoulder, shadowed and cracked in Sumi, with grass in Ai: the foreground of every scene.",
        art: wideArt(<Sample viewBox="0 0 160 50"><Shore x0={0} x1={160} y={40} h={20} bottom={50} grass={14} gx={10} /></Sample>), wide: true },
      { name: "Brushed kicker", jp: "筆", note: "The headline's gloss on one red stroke of the brush, its ends torn, the wood's grain in it.",
        art: box(<span lang="ja" className="ds-kicker ds-label">上映中</span>, "h-20 w-full justify-items-start") },
    ],
  },
];

export function DrawingKit() {
  if (useSystemId() !== "showa") return null;
  return (
    <div className="grid gap-12">
      {groups.map((g) => (
        <div key={g.picture} className="grid gap-5">
          <p className="ds-label ds-muted">{g.label ?? `Drawing kit · after ${g.picture}, Mood Board 01`}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {g.elements.map((k) => (
              <li key={k.name} className={`grid min-w-0 content-start gap-2 ${k.wide ? "col-span-2" : ""}`}>
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
