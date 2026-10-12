import type { Original } from "./print";
import { originals as americanComics } from "./american-comics";
import { originals as chineseRetro } from "./chinese-retro";
import { originals as japaneseRetro } from "./japanese-retro";

// Board id -> its original artifacts.
export const originalsByBoard: Record<string, Original[]> = {
  "japanese-retro": japaneseRetro,
  "american-comics": americanComics,
  "chinese-retro": chineseRetro,
};
