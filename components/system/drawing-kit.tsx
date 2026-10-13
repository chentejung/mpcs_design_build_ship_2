"use client";
// Shōwa's drawing kit on its Design System page, grouped by the Mood Board 01 picture each element comes from; other
// systems have none. Elements app/system.css draws (the radios, the pinstripes, the red band) are shown as the
// live pieces.
import { categories } from "@/app/films";
import { useSystemId } from "./context";
import { FujiMark, FujiPoster, SignOff } from "./fuji";
import { GenreIcon, genreGlyphs } from "./genre-icons";
import { Portrait } from "./nouvelle";
import { Lantern } from "./osaka";
import { RamenBowl } from "./ramen";
import { SleepingShiba } from "./shiba";

const box = (children: React.ReactNode, className = "h-20 w-20") => <div aria-hidden inert className={`grid place-items-center ${className}`}>{children}</div>;
// Wide drawings keep their own proportions inside the row's height.
const wideArt = (children: React.ReactNode) => <div aria-hidden inert className="flex h-40 items-end">{children}</div>;
const glyph = (id: keyof typeof genreGlyphs) => box(<GenreIcon id={id} className="h-16 w-16" />);
const radio = (checked: boolean) => (
  <span className="ds-check min-h-0"><input type="radio" checked={checked} readOnly tabIndex={-1} /><span className="ds-box" /></span>
);
const label = (id: keyof typeof genreGlyphs) => (id === "all" ? "All" : categories.find((c) => c.id === id)!.label);
const pictogram = (id: keyof typeof genreGlyphs, jp: string): Element => ({ name: `${label(id)} pictogram`, jp, note: genreGlyphs[id].from, art: glyph(id) });

type Element = { name: string; jp: string; note: string; art: React.ReactNode; wide?: boolean };
const groups: { picture: string; elements: Element[] }[] = [
  {
    picture: "Fuji Sunrise · picture 04",
    elements: [
      { name: "Poster", jp: "ポスター", note: "A red sun behind Ai Fuji on a Kinari panel, its name in katakana above and Latin below: the /movies hero.",
        art: box(<FujiPoster className="h-full" />, "h-40 w-28 justify-self-start") },
      { name: "Banner", jp: "横長", note: "The poster widened for phones, with Nouvelle Vague's red band carrying 上映中.", art: wideArt(<FujiPoster wide className="h-full max-w-full" />), wide: true },
      { name: "Brand mark", jp: "マーク", note: "The poster in 40px, before Eigakan 映画館.", art: box(<FujiMark className="h-16 w-16" />) },
      pictogram("all", "全部"),
      { name: "Sign-off", jp: "夕日", note: "The sun setting behind Fuji at the foot of every Eigakan page, over a pinstripe band.",
        art: <div aria-hidden className="ds-sign-off !mt-0 !h-20 w-full"><SignOff className="block h-full w-full" /></div>, wide: true },
    ],
  },
  {
    picture: "Shiba & Sake · picture 06",
    elements: [
      { name: "Dozing Shiba", jp: "居眠り", note: "Asleep against the sun by an empty bowl: the Saved page before anything is saved.",
        art: wideArt(<SleepingShiba className="h-full max-w-full" />), wide: true },
      pictogram("animation", "柴犬"),
      pictogram("action", "箸"),
    ],
  },
  {
    picture: "Nouvelle Vague · picture 08",
    elements: [
      { name: "Portrait", jp: "肖像", note: "The matchbox portrait the pictograms are cut from: band, bob, wink, cheek, lips, pinstripes.", art: box(<Portrait className="h-20 w-20" />) },
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
      { name: "Bowl", jp: "丼", note: "Rim rings of Washi and Hinomaru round the broth: the header's foot takes them; empty, the bowl sits by the Shiba.", art: box(<RamenBowl className="h-20 w-20" />) },
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
