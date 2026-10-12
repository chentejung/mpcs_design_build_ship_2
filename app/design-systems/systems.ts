import type { CSSProperties } from "react";

export type ColorRole = "background" | "surface" | "text" | "muted" | "border" | "accent";
export type TypeRole = "display" | "heading" | "body" | "label";
export type DesignSystem = {
  id: "clay" | "grid" | "soft";
  label: string;
  title: string;
  selected?: boolean;
  description: string;
  fonts: string;
  headingFont: string;
  bodyFont: string;
  colors: Record<ColorRole, string>;
  highlight: string;
  secondary: string;
  onAccent: string;
  hover: string;
  pressed: string;
  success: string;
  error: string;
  type: Record<TypeRole, { size: number; weight: number; leading: number }>;
  spacing: readonly number[];
  shape: { control: number; card: number; badge: number; border: number; shadow: string; note: string };
  links: { label: string; href: string }[];
};

const spacing = [4, 8, 12, 16, 24, 32] as const;
const links = (id: string) => [
  { label: "View system", href: `/design-systems/${id}/` },
  { label: "Token notes", href: `/design-systems/${id}/#tokens` },
];

export const designSystems: DesignSystem[] = [
  {
    id: "clay", label: "SYSTEM A", title: "Clay", selected: true,
    description: "Woodblock waves, a vermilion sun, and the drama of a vintage cinema poster. A Japanese Retro design system for finding your next great film.",
    fonts: "Fraunces / Inter", headingFont: "var(--font-fraunces), Georgia, serif", bodyFont: "var(--font-inter), sans-serif",
    colors: { background: "#f3eddd", surface: "#fffdf9", text: "#161816", muted: "#655e52", border: "#857a66", accent: "#c4371b" },
    highlight: "#ebcb85", secondary: "#1f4a66", onAccent: "#fffdf9", hover: "#a52d16", pressed: "#802311", success: "#315a44", error: "#a52d16",
    type: { display: { size: 48, weight: 750, leading: 1.05 }, heading: { size: 24, weight: 700, leading: 1.2 }, body: { size: 14, weight: 400, leading: 1.6 }, label: { size: 11, weight: 700, leading: 1.5 } },
    spacing,
    shape: { control: 0, card: 0, badge: 2, border: 1, shadow: "3px 3px 0 #ebcb85", note: "Square ticket edges with perforated rules. Fine ink frames, a 3px gold print offset, and 2px stamp corners preserve the cinema-program feel." },
    links: links("clay"),
  },
  {
    id: "grid", label: "SYSTEM B", title: "Grid",
    description: "Big heroes. Bold ink. One more adventure. An American Comics design system with the energy of a pulp cover and the clarity of a well-drawn panel.",
    fonts: "Bangers / Space Grotesk", headingFont: '"Bangers", Impact, sans-serif', bodyFont: "var(--font-space-grotesk), sans-serif",
    colors: { background: "#f2eddd", surface: "#fffcf2", text: "#0d0c0d", muted: "#62594f", border: "#756555", accent: "#bc2923" },
    highlight: "#f4ec36", secondary: "#105c88", onAccent: "#fffcf2", hover: "#9b211c", pressed: "#721813", success: "#24613d", error: "#b52619",
    type: { display: { size: 48, weight: 400, leading: 1.05 }, heading: { size: 28, weight: 400, leading: 1.2 }, body: { size: 14, weight: 500, leading: 1.6 }, label: { size: 11, weight: 700, leading: 1.5 } },
    spacing,
    shape: { control: 0, card: 0, badge: 0, border: 2, shadow: "3px 3px 0 #0d0c0d", note: "Square comic panels and 2px ink outlines. Offset black shadows give controls a printed depth; captions and speech-bubble badges carry the story." },
    links: links("grid"),
  },
  {
    id: "soft", label: "SYSTEM C", title: "Soft",
    description: "A page from an old picture journal. Calendar portraits, flowering borders, and pine-green ink bring Chinese Retro warmth to a collection of stories worth keeping.",
    fonts: "Fraunces / DM Sans", headingFont: "var(--font-fraunces), Georgia, serif", bodyFont: "var(--font-dm-sans), sans-serif",
    colors: { background: "#f4efe6", surface: "#fffbf0", text: "#2b2836", muted: "#686052", border: "#81745b", accent: "#3b5b4e" },
    highlight: "#c9b13c", secondary: "#993b2b", onAccent: "#fffbf0", hover: "#2c493d", pressed: "#1c342a", success: "#326548", error: "#a93026",
    type: { display: { size: 48, weight: 650, leading: 1.1 }, heading: { size: 24, weight: 650, leading: 1.25 }, body: { size: 14, weight: 400, leading: 1.6 }, label: { size: 11, weight: 700, leading: 1.5 } },
    spacing,
    shape: { control: 24, card: 16, badge: 24, border: 1, shadow: "0 3px 0 #daccb5", note: "24px label-shaped controls and 16px card corners echo moon windows. Inset keyline frames and a warm paper shadow recall printed tea labels." },
    links: links("soft"),
  },
];

export const colorRoles: ColorRole[] = ["background", "surface", "text", "muted", "border", "accent"];

export function themeStyle(system: DesignSystem): CSSProperties {
  return {
    ...Object.fromEntries(Object.entries(system.colors).map(([role, value]) => [`--ds-${role}`, value])),
    ...Object.fromEntries(Object.entries(system.type).flatMap(([role, value]) => [
      [`--ds-${role}-size`, `${value.size / 16}rem`], [`--ds-${role}-weight`, value.weight], [`--ds-${role}-leading`, value.leading],
    ])),
    "--ds-heading-font": system.headingFont, "--ds-body-font": system.bodyFont,
    "--ds-highlight": system.highlight, "--ds-secondary": system.secondary,
    "--ds-on-accent": system.onAccent, "--ds-hover": system.hover, "--ds-pressed": system.pressed,
    "--ds-success": system.success, "--ds-error": system.error,
    "--ds-control-radius": `${system.shape.control}px`, "--ds-card-radius": `${system.shape.card}px`,
    "--ds-badge-radius": `${system.shape.badge}px`, "--ds-border-width": `${system.shape.border}px`, "--ds-shadow": system.shape.shadow,
    ...Object.fromEntries(system.spacing.map((space, i) => [`--ds-space-${i + 1}`, `${space}px`])),
  } as CSSProperties;
}

// Relative luminance of opaque sRGB colors, used for the displayed pair ratios.
export function contrastRatio(first: string, second: string): number {
  const luminance = (hex: string) => {
    const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
      .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const a = luminance(first), b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
