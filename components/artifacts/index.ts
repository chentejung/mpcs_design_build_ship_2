import { fileName } from "@/app/boards";

export type ExportedOriginal = { title: string; note: string; src: string };

// Board pages show AI-generated originals, saved as generated-NN-<title>.webp; their art briefs
// live in references/moodboard-image-prompts.json. The SVG components in ./<board-id>.tsx are no
// longer shown (references/export-originals.tsx still exports them as claude-NN-<title>.svg).
const generated = (board: string, list: [title: string, note: string][]): ExportedOriginal[] =>
  list.map(([title, note], i) => ({ title, note, src: `/moodboards/${board}/${fileName("generated", i + 1, title, "webp")}` }));

// Board id -> its original artifacts.
export const originalsByBoard: Record<string, ExportedOriginal[]> = {
  "japanese-retro": generated("japanese-retro", [
    ["Sunrise Crane", "日の出"],
    ["Crane Matchbox", "マッチ"],
    ["Shinkansen 1964", "新幹線"],
    ["Cream Soda", "喫茶"],
    ["Tokyo Tower", "東京"],
    ["City Pop LP", "レコード"],
    ["Kissaten Menu", "献立"],
    ["Sento Noren", "銭湯"],
    ["Red Fuji Stamp", "切手"],
    ["Rainy Alley", "ネオン"],
    ["Maneki-neko", "招き猫"],
    ["Ramune Ad", "広告"],
    ["Color TV Ad", "テレビ"],
    ["Midnight Vending", "自販機"],
    ["Hanabi Festival", "花火"],
    ["Kaiju Poster", "怪獣"],
    ["Daruma", "達磨"],
  ]),
  "american-comics": generated("american-comics", [
    ["Tears of Love", "Romance"],
    ["Weird Space Tales", "Sci-fi"],
    ["Krakoom!", "SFX"],
    ["Meanwhile...", "Panel"],
    ["Captain Comet #1", "Hero"],
    ["X-Ray Specs Ad", "Mail order"],
    ["Ring! Ring!", "Pop art"],
    ["Robot Invasion", "Pulp"],
  ]),
  "chinese-retro": generated("chinese-retro", [
    ["Golden Carp Label", "爆竹"],
    ["Calendar Girl", "月份牌"],
    ["Longjing Tea Label", "茶葉"],
    ["Hong Kong Neon", "霓虹"],
    ["Double Happiness Cut", "剪紙"],
    ["Red Envelope", "利是"],
    ["Flying Swallow Bicycle", "單車"],
    ["Thermos & Mug", "國貨"],
    ["Mahjong Table", "麻雀"],
  ]),
};
