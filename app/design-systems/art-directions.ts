import { japaneseRetro, americanComics, chineseRetro, type Board } from "@/app/boards";
import { originalsByBoard, type ExportedOriginal } from "@/components/artifacts";

type ArtDirection = {
  board: Board;
  language: "ja" | "en" | "zh-Hant";
  nativeTitle: string;
  headline: string[];
  kicker: string;
  stamp: string;
  chapterNames: string[];
  typeSample: string;
  hero: ExportedOriginal;
  detail: ExportedOriginal;
  principles: [string, string, string];
  material: string;
};

export const artDirections: Record<"clay" | "grid" | "soft", ArtDirection> = {
  clay: {
    board: japaneseRetro, language: "ja", nativeTitle: "映画の時間", headline: ["A little cinema.", "A grand night."],
    kicker: "THE JAPANESE RETRO PICTURE HOUSE", stamp: "映", typeSample: "映画の時間",
    chapterNames: ["色彩", "書体", "余白", "道具", "反応", "状態"],
    hero: originalsByBoard["japanese-retro"][0], detail: originalsByBoard["japanese-retro"][15],
    principles: ["Woodblock waves & vermilion suns", "Vertical lettering & ink seals", "Perforated tickets & washi paper"],
    material: "The crane’s sweeping line, the kaiju poster’s dramatic lettering, and the cinema ticket’s cut edge become a small, usable print language.",
  },
  grid: {
    board: americanComics, language: "en", nativeTitle: "EXTRA!", headline: ["Every story.", "A superpower."],
    kicker: "THE AMERICAN COMICS PICTURE SHOW", stamp: "POW!", typeSample: "TO BE CONTINUED…",
    chapterNames: ["INKS", "LETTERING", "GUTTERS", "ACTION!", "REACTIONS", "NEXT PANEL"],
    hero: originalsByBoard["american-comics"][4], detail: originalsByBoard["american-comics"][2],
    principles: ["Ink outlines & halftone dots", "Hero lettering & caption boxes", "Panel borders & offset shadows"],
    material: "The illustrated hero, punchy sound effects, and newsprint dots move off the cover and into panel headings, caption labels, and tactile controls.",
  },
  soft: {
    board: chineseRetro, language: "zh-Hant", nativeTitle: "光影故事", headline: ["Stories worth", "keeping."],
    kicker: "THE CHINESE RETRO PICTURE JOURNAL", stamp: "影", typeSample: "光影故事",
    chapterNames: ["色彩", "字體", "留白", "元件", "互動", "狀態"],
    hero: originalsByBoard["chinese-retro"][1], detail: originalsByBoard["chinese-retro"][0],
    principles: ["Calendar illustration & floral borders", "Pine green, rice paper & antique gold", "Moon-window curves & framed labels"],
    material: "The calendar portrait, flowering label borders, and leaping golden carp inspire a quieter journal: curved frames, seal-red details, and warm paper.",
  },
};
