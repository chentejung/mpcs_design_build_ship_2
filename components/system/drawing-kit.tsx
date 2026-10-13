"use client";
// Shōwa's drawing kit on its Design System page, grouped by the Mood Board 01 picture each element comes from, then
// the brushwork they are all drawn in (references/showa-brushwork.jpg). Pulp shows its own (pulp/kit.tsx); Haipai has none. Elements
// app/system.css draws (the radios, the pinstripes, the red band, the brushed kicker) are shown as the live pieces.
import { colors } from "@/app/boards";
import { categories } from "@/app/films";
import { showa } from "@/app/systems";
import { useSystemId } from "./context";
import { FujiMark, FujiPoster, Mist, Pine, Shore, SignOff } from "./fuji";
import { GenreIcon, genreGlyphs } from "./genre-icons";
import { Portrait } from "./nouvelle";
import { PulpKit } from "./pulp/kit";
import { Lantern } from "./osaka";
import { RamenBowl } from "./ramen";
import { useSvgId, Wear } from "./screenprint";
import { WaitingShiba } from "./shiba";

const box = (children: React.ReactNode, className = "h-20 w-20") => <div aria-hidden inert className={`grid place-items-center ${className}`}>{children}</div>;
// Wide drawings keep their own proportions inside the row's height.
const wideArt = (children: React.ReactNode) => <div aria-hidden inert className="flex h-40 items-end">{children}</div>;
const glyph = (id: keyof typeof genreGlyphs) => box(<GenreIcon id={id} className="h-16 w-16" />);
const radio = (checked: boolean) => (
  <span className="ds-check min-h-0"><input type="radio" checked={checked} readOnly tabIndex={-1} /><span className="ds-box" /></span>
);
const label = (id: keyof typeof genreGlyphs) => (id === "all" ? "All" : categories.find((c) => c.id === id)!.label);
const pictogram = (id: keyof typeof genreGlyphs, jp: string): Element => ({ name: `${label(id)} pictogram`, jp, note: genreGlyphs[id].from, art: glyph(id) });

// A piece of the landscape on its own, worn like the drawings it belongs to.
function Sample({ viewBox, children }: { viewBox: string; children: React.ReactNode }) {
  const id = useSvgId();
  return (
    <svg aria-hidden viewBox={viewBox} className="h-full max-w-full">
      <defs><Wear id={id} rough={1.4} specks={0.6} /></defs>
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
}

type Element = { name: string; jp: string; note: string; art: React.ReactNode; wide?: boolean };
const groups: { picture: string; label?: string; elements: Element[] }[] = [
  {
    picture: "Fuji Sunrise · picture 04",
    elements: [
      { name: "Poster", jp: "ポスター", note: "A red sun behind Fuji's streaked snow, mist, a lake, rocks and a pine on old paper, エイガ on a title slip and EIGAKAN below: the /movies hero.",
        art: box(<FujiPoster className="h-full" />, "h-40 w-28 justify-self-start") },
      { name: "Banner", jp: "横長", note: "The poster widened into a landscape for phones, with Nouvelle Vague's red band carrying 上映中.", art: wideArt(<FujiPoster wide className="h-full max-w-full" />), wide: true },
      { name: "Brand mark", jp: "マーク", note: "The poster in 40px, before Eigakan 映画館.", art: box(<FujiMark className="h-16 w-16" />) },
      pictogram("all", "全部"),
      { name: "Sign-off", jp: "夕日", note: "The sun setting behind Fuji across a lake between two pines, at the foot of every Eigakan page, over a pinstripe band.",
        art: <div aria-hidden className="ds-sign-off !mt-0 !h-auto aspect-[1200/130] w-full"><SignOff className="block h-full w-full" /></div>, wide: true },
    ],
  },
  {
    picture: "Shiba & Sake · picture 06",
    elements: [
      { name: "Waiting Shiba", jp: "待つ", note: "Sitting up on a rock, eyes shut, by an empty bowl: the Saved page before anything is saved.",
        art: wideArt(<WaitingShiba className="h-full max-w-full" />), wide: true },
      pictogram("animation", "柴犬"),
      pictogram("action", "箸"),
    ],
  },
  {
    picture: "Nouvelle Vague · picture 08",
    elements: [
      { name: "Portrait", jp: "肖像", note: "The portrait the pictograms are cut from, on a red card set askew: the bob's strands, shut eye, cheek, lips, Ai collar.", art: box(<Portrait className="h-20 w-20" />) },
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
      { name: "Bowl", jp: "丼", note: "Rim rings of Washi and Hinomaru round the broth: the header's foot takes them; seen from the side, empty, it sits by the Shiba.", art: box(<RamenBowl className="h-20 w-20" />) },
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
    picture: "Brushwork",
    label: "Drawing kit · brushwork, after the scene that sets the four posters together",
    elements: [
      { name: "Pine", jp: "松", note: "A Sumi bough with clusters of Ai needles, each flicked out and lifted off: it reaches over the hero's sun and frames the sign-off.",
        art: wideArt(<Sample viewBox="-10 -46 150 84"><Pine x={-6} y={0} dir={1} /></Sample>), wide: true },
      { name: "Mist", jp: "霞", note: "Bands of Kinari, or Hinomaru across the sun, laid in one sideways drag with torn ends.",
        art: wideArt(<Sample viewBox="0 0 160 60"><Mist bands={[[4, 16, 120, 9], [40, 32, 110, 7], [10, 48, 80, 5]]} /><Mist bands={[[70, 12, 70, 5]]} color={colors(showa.board).hinomaru} /></Sample>), wide: true },
      { name: "Shore", jp: "岩", note: "Rounded Sumi rocks laid in Kogecha strata, with grass in Ai: the foreground of every scene.",
        art: wideArt(<Sample viewBox="0 0 160 50"><Shore x0={0} x1={160} y={40} h={20} bottom={50} grass={14} gx={10} /></Sample>), wide: true },
      { name: "Brushed kicker", jp: "筆", note: "The headline's gloss on one red stroke of the brush, its ends torn, dragged dry in places.",
        art: box(<span lang="ja" className="ds-kicker ds-label">上映中</span>, "h-20 w-full justify-items-start") },
    ],
  },
];

export function DrawingKit() {
  const system = useSystemId();
  if (system === "pulp") return <PulpKit />;
  if (system !== "showa") return null;
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
