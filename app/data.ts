// Landing-page content. Design-system links and the final site's source/case-study links are placeholders.
import { boards, japaneseRetro } from "./boards";

export type MoodBoard = {
  id: string;
  title: string;
  selected?: boolean;
  tiles: string[]; // image paths under public/

  palette: string[];
  links: { label: string; href: string }[];
};

// Landing-page cards, derived from the full boards in ./boards.ts.
export const selectedBoard = "japanese-retro";

export const moodBoards: MoodBoard[] = boards.map((b) => ({
  id: b.id,
  title: b.title,
  selected: b.id === selectedBoard,
  tiles: b.tiles.map((n) => b.references[n - 1].src),
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
    tokens: ["#c2562f", "#7a2e1f", "#8a8a2e", "#e9dcc0", "#2f8a7e"],
    links: [
      { label: "View system", href: "/design-systems/clay/" },
      { label: "Figma", href: "https://www.figma.com/file/clay-design-system" },
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
      { label: "Figma", href: "https://www.figma.com/file/grid-design-system" },
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
      { label: "Figma", href: "https://www.figma.com/file/soft-design-system" },
    ],
  },
];

// The final site is Eigakan at /movies; `preview` is a screenshot of it.
export const finalSite = {
  url: "/movies",
  preview: "/movies/preview.jpg",
  recipeImage: japaneseRetro.references[1].src,
  links: [
    { label: "Visit the live site", href: "/movies/" },
    { label: "Source code", href: "https://github.com/designbuildship/showa-studio" },
    { label: "Case study", href: "/case-study/" },
  ],
};
