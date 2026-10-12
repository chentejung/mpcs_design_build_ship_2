// Print-making toolkit shared by the original artifacts.
// <Print> is the sheet: inks are drawn as children, then the sheet adds edge wobble, ink loss,
// fading, aged edges, and paper grain so the result reads as a physical print, not vector art.
import type { ReactNode } from "react";

export type Original = { title: string; note: string; Component: () => React.JSX.Element };

export type Texture = {
  grain?: number; // paper-fibre strength, 0–1
  wear?: number; // ink loss, 0–1
  rough?: number; // edge wobble in px
  age?: string; // color that creeps in from the edges
  ageStrength?: number;
  fade?: string; // wash laid over the inks (sun-faded prints)
  fadeStrength?: number;
  seed?: number;
};

export function Print({ id, w = 300, h = 420, bg, texture = {}, defs, children }: {
  id: string;
  w?: number;
  h?: number;
  bg: string;
  texture?: Texture;
  defs?: ReactNode;
  children: ReactNode;
}) {
  const { grain = 0.4, wear = 0.3, rough = 1, age, ageStrength = 0.4, fade, fadeStrength = 0.08, seed = 1 } = texture;
  // Ink is lost where either noise field peaks: fine specks, plus rarer larger scuffs.
  const speck = 0.9 - wear * 0.15;
  const scuff = 0.88 - wear * 0.15;
  const region = { filterUnits: "userSpaceOnUse", x: 0, y: 0, width: w, height: h } as const;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" role="img">
      <defs>
        <filter id={`${id}-ink`} {...region} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale={rough * 2} xChannelSelector="R" yChannelSelector="G" result="wobbled" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" seed={seed + 7} result="speckNoise" />
          <feColorMatrix in="speckNoise" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -30 0 0 0 ${30 * speck}`} result="keepSpeck" />
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed={seed + 11} result="scuffNoise" />
          <feColorMatrix in="scuffNoise" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -24 0 0 0 ${24 * scuff}`} result="keepScuff" />
          <feComposite in="keepSpeck" in2="keepScuff" operator="in" result="keep" />
          <feComposite in="wobbled" in2="keep" operator="in" />
        </filter>
        <Grain id={`${id}-grain`} {...region} grain={grain} seed={seed + 3} />
        {age && (
          <radialGradient id={`${id}-age`} r="75%">
            <stop offset="55%" stopColor={age} stopOpacity="0" />
            <stop offset="100%" stopColor={age} stopOpacity={ageStrength} />
          </radialGradient>
        )}
        {defs}
      </defs>
      <rect width={w} height={h} fill={bg} />
      <g filter={`url(#${id}-ink)`}>{children}</g>
      {fade && <rect width={w} height={h} fill={fade} opacity={fadeStrength} />}
      {age && <rect width={w} height={h} fill={`url(#${id}-age)`} style={{ mixBlendMode: "multiply" }} />}
      <rect width={w} height={h} filter={`url(#${id}-grain)`} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}

// Paper grain: fractal noise to multiply over a sheet. `frequency` "x y" stretches it into fibres.
export function Grain({ id, grain = 0.4, seed = 1, frequency = "0.85", ...region }: {
  id: string;
  grain?: number;
  seed?: number;
  frequency?: string;
} & React.SVGProps<SVGFilterElement>) {
  return (
    <filter id={id} {...region}>
      <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves="2" seed={seed} />
      <feColorMatrix type="matrix" values={`1.3 0 0 0 0.2  1.3 0 0 0 0.2  1.3 0 0 0 0.2  0 0 0 0 ${grain}`} />
    </filter>
  );
}

// An ink plate printed slightly out of register. `overprint` multiplies it with what's beneath
// (riso on paper); leave it off when color is printed over solid blacks.
export function Plate({ dx = 0, dy = 0, overprint = false, children }: { dx?: number; dy?: number; overprint?: boolean; children: ReactNode }) {
  return <g transform={`translate(${dx} ${dy})`} style={overprint ? { mixBlendMode: "multiply" } : undefined}>{children}</g>;
}

// Halftone / Ben-Day dot screen.
export function Dots({ id, color, r = 1.6, gap = 6, angle = 45, bg }: { id: string; color: string; r?: number; gap?: number; angle?: number; bg?: string }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
      {bg && <rect width={gap} height={gap} fill={bg} />}
      <circle cx={gap / 2} cy={gap / 2} r={r} fill={color} />
    </pattern>
  );
}

// Engraving-style line screen.
export function Hatch({ id, color, width = 1, gap = 5, angle = -45, bg }: { id: string; color: string; width?: number; gap?: number; angle?: number; bg?: string }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
      {bg && <rect width={gap} height={gap} fill={bg} />}
      <rect width={width} height={gap} fill={color} />
    </pattern>
  );
}

// Filter that breaks a filled shape into random stipple specks (screen-print shading).
export function Stipple({ id, density = 0.5, size = 1, seed = 5 }: { id: string; density?: number; size?: number; seed?: number }) {
  const t = 0.62 - density * 0.24;
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={1.3 / size} numOctaves="1" seed={seed} result="n" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  30 0 0 0 ${-30 * t}`} result="m" />
      <feComposite in="SourceGraphic" in2="m" operator="in" />
    </filter>
  );
}

// Small multi-line text block (fine print, menu copy, credits).
export function Fine({ x, y, lines, size = 6, lh = 1.4, fill, font = "sans-serif", weight = 500, anchor = "start", spacing = 0.4 }: {
  x: number; y: number; lines: string[]; size?: number; lh?: number; fill: string; font?: string; weight?: number; anchor?: "start" | "middle" | "end"; spacing?: number;
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} fontFamily={font} fontWeight={weight} textAnchor={anchor} letterSpacing={spacing}>
      {lines.map((l, i) => <tspan key={i} x={x} dy={i ? size * lh : 0}>{l}</tspan>)}
    </text>
  );
}

// Vertical (tategaki) text, top to bottom.
export function VText({ x, y, text, size, fill, font, weight = 700, spacing = 0 }: {
  x: number; y: number; text: string; size: number; fill: string; font: string; weight?: number; spacing?: number;
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} fontFamily={font} fontWeight={weight} letterSpacing={spacing} style={{ writingMode: "vertical-rl" }}>
      {text}
    </text>
  );
}

// Text set along a circular arc; `bottom` arcs read upright along the lower edge.
export function ArcText({ id, cx, cy, r, children, bottom = false, ...text }: {
  id: string; cx: number; cy: number; r: number; children: string; bottom?: boolean;
} & React.SVGProps<SVGTextElement>) {
  const d = bottom
    ? `M${cx - r} ${cy} A${r} ${r} 0 0 0 ${cx + r} ${cy}`
    : `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  return (
    <>
      <path id={id} d={d} fill="none" />
      <text textAnchor="middle" {...text}>
        <textPath href={`#${id}`} startOffset="50%">{children}</textPath>
      </text>
    </>
  );
}

// Star-burst polygon points.
export const burst = (cx: number, cy: number, r1: number, r2: number, n: number, jitter = 0) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = (i % 2 ? r2 : r1) * (1 + (jitter * (((i * 37) % 11) - 5)) / 10);
    const a = (Math.PI * i) / n - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

// Deterministic pseudo-random sequence so server renders are stable.
export function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
