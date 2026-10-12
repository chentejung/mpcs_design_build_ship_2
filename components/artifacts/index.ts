import { fileName } from "@/app/boards";
import type { Original } from "./print";
import { originals as americanComics } from "./american-comics";
import { originals as chineseRetro } from "./chinese-retro";
import { originals as japaneseRetro } from "./japanese-retro";

export type ExportedOriginal = Original & { src: string };

// Each original is exported to public/ as claude-NN-<title>.svg (references/export-originals.tsx),
// and board pages show that file, so a board's folder holds exactly the pictures it displays.
const exported = (board: string, list: Original[]): ExportedOriginal[] =>
  list.map((o, i) => ({ ...o, src: `/moodboards/${board}/${fileName("claude", i + 1, o.title, "svg")}` }));

// Board id -> its original artifacts.
export const originalsByBoard: Record<string, ExportedOriginal[]> = {
  "japanese-retro": exported("japanese-retro", japaneseRetro),
  "american-comics": exported("american-comics", americanComics),
  "chinese-retro": exported("chinese-retro", chineseRetro),
};
