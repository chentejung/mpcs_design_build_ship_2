// Landing-page content shared by the overview and detail pages.
import { boards, japaneseRetro } from "./boards";
import { originalsByBoard } from "@/components/artifacts";

export type MoodBoard = {
  id: string;
  title: string;
  selected?: boolean;
  tiles: string[]; // image paths under public/

  palette: string[];
  links: { label: string; href: string }[];
};

// Landing-page cards, derived from the full boards in ./boards.ts.
const selectedBoard = "japanese-retro";

export const moodBoards: MoodBoard[] = boards.map((b) => ({
  id: b.id,
  title: b.title,
  selected: b.id === selectedBoard,
  tiles: b.tiles.map((n) => originalsByBoard[b.id][n - 1].src),
  palette: b.palette.map((p) => p.hex),
  links: [
    { label: "View board", href: `/moodboards/${b.id}/` },
    { label: "Pinterest", href: b.pinterest },
  ],
}));

export type DesignSystem = {
  id: "clay" | "grid" | "soft";
  label: string;
  title: string;
  selected?: boolean;
  fonts: string;
  tokens: string[];
  links: { label: string; href: string }[];
};

export const designSystems: DesignSystem[] = [
  {
    id: "clay",
    label: "SYSTEM A",
    title: "Clay",
    selected: true,
    fonts: "Fraunces / Inter",
    tokens: japaneseRetro.palette.map((color) => color.hex),
    links: [
      { label: "View system", href: "/design-systems/clay/" },
      { label: "Token notes", href: "/design-systems/clay/#tokens" },
    ],
  },
  {
    id: "grid",
    label: "SYSTEM B",
    title: "Grid",
    fonts: "Space Grotesk",
    tokens: ["#111111", "#ffffff", "#ff4b1f", "#d9d9d4", "#1f4bff"],
    links: [
      { label: "View system", href: "/design-systems/grid/" },
      { label: "Token notes", href: "/design-systems/grid/#tokens" },
    ],
  },
  {
    id: "soft",
    label: "SYSTEM C",
    title: "Soft",
    fonts: "DM Sans",
    tokens: ["#6d5dfc", "#b8b0ff", "#ffb38a", "#ffffff", "#2b2840"],
    links: [
      { label: "View system", href: "/design-systems/soft/" },
      { label: "Token notes", href: "/design-systems/soft/#tokens" },
    ],
  },
];

export const finalSite = {
  url: "/movies/",
  heroImage: "/movies-preview.png",
  recipeImage: japaneseRetro.references[1].src,
  links: [
    { label: "Visit the live site", href: "/movies/" },
    { label: "Source code", href: "https://github.com/chentejung/mpcs_design_build_ship_2" },
    { label: "Case study", href: "/case-study/" },
  ],
};
