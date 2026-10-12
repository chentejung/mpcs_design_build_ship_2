// Design Systems: one extracted from each Mood Board (docs/adr/0001-one-design-system-per-mood-board.md).
import { americanComics, chineseRetro, japaneseRetro, type Board } from "./boards";

export type DesignSystem = {
  id: string;
  name: string;
  alt?: string; // native-script name
  board: Board;
};

export const showa: DesignSystem = { id: "showa", name: "Shōwa", alt: "昭和", board: japaneseRetro };
export const benDay: DesignSystem = { id: "ben-day", name: "Ben-Day", board: americanComics };
export const haipai: DesignSystem = { id: "haipai", name: "Haipai", alt: "海派", board: chineseRetro };

export const systems = [showa, benDay, haipai];
