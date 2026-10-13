"use client";
// Shōwa's screenprint finish for its drawings, after the four posters its kit comes from (Mood Board 01: Fuji Sunrise
// 04, Shiba & Sake 06, Nouvelle Vague 08, Ramen 18) and the brushwork of the scene that sets them together
// (references/showa-brushwork.jpg): flat inks whose edges wobble where the screen bled, fine specks where the ink
// missed, dry-brush drags where the paper shows through in streaks, and every line a tapered brushstroke, pressed
// down and lifted off. app/system.css gives controls the same specks and drags (--ds-wear).
import { useId } from "react";

export const useSvgId = () => useId().replace(/:/g, "");

// Put `filter={`url(#${id})`}` on a group of flat shapes. `rough` is how far edges wander (in viewBox units),
// `specks` how much paper shows through (0 none, 1 a lot), `drag` how much of it shows in dry-brush streaks running
// along `angle` (0 across, 90 down); `scale` sizes the grain for the drawing's viewBox.
export function Wear({ id, rough = 1.6, specks = 0.5, drag = 0.35, angle = 0, scale = 1, seed = 3 }: { id: string; rough?: number; specks?: number; drag?: number; angle?: number; scale?: number; seed?: number }) {
  const cut = 0.78 - specks * 0.06; // red-channel level above which the paper shows
  const dry = drag ? 0.76 - drag * 0.06 : 2; // the same, for the drags (none at 0)
  const [fx, fy] = angle === 90 ? [0.45, 0.04] : [0.04, 0.45]; // streaks run along the low frequency
  return (
    <filter id={id} x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency={0.035 / scale} numOctaves="2" seed={seed} result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale={rough} xChannelSelector="R" yChannelSelector="G" result="rough" />
      <feTurbulence type="fractalNoise" baseFrequency={0.8 / scale} numOctaves="2" seed={seed + 8} result="grain" />
      <feColorMatrix in="grain" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -26 0 0 0 ${(26 * cut).toFixed(2)}`} result="ink" />
      <feTurbulence type="fractalNoise" baseFrequency={`${fx / scale} ${fy / scale}`} numOctaves="2" seed={seed + 3} result="streak" />
      <feColorMatrix in="streak" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -20 0 0 0 ${(20 * dry).toFixed(2)}`} result="drag" />
      <feComposite in="ink" in2="drag" operator="in" result="paper" />
      <feComposite in="rough" in2="paper" operator="in" />
    </filter>
  );
}

// A seeded random stream, so a drawing's brushwork comes out the same on every build.
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

export type Pt = [number, number];
const f = (n: number) => n.toFixed(1);

// One brushstroke from a to b, bending towards c, as a filled outline `w` wide at its fullest. The brush presses
// down to full width by `press` (a share of the length) and lifts off to a point at b; `press = 0.5` swells in the
// middle and tapers both ends, as a drag of a nearly dry brush does.
export function stroke(a: Pt, c: Pt, b: Pt, w: number, press = 0.15): string {
  const n = 12;
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    const x = u * u * a[0] + 2 * u * t * c[0] + t * t * b[0];
    const y = u * u * a[1] + 2 * u * t * c[1] + t * t * b[1];
    const dx = 2 * u * (c[0] - a[0]) + 2 * t * (b[0] - c[0]);
    const dy = 2 * u * (c[1] - a[1]) + 2 * t * (b[1] - c[1]);
    const len = Math.hypot(dx, dy) || 1;
    const k = t < press ? 0.4 + (0.6 * t) / press : Math.pow(1 - (t - press) / (1 - press), 0.75);
    const h = (w / 2) * k;
    left.push(`${f(x - (dy / len) * h)} ${f(y + (dx / len) * h)}`);
    right.unshift(`${f(x + (dy / len) * h)} ${f(y - (dx / len) * h)}`);
  }
  return `M${left.join("L")}L${right.join("L")}Z`;
}

// A straight stroke from a to b, bowed sideways by `bow` (a share of its length).
export function line(a: Pt, b: Pt, w: number, press = 0.15, bow = 0): string {
  const c: Pt = [(a[0] + b[0]) / 2 - (b[1] - a[1]) * bow, (a[1] + b[1]) / 2 + (b[0] - a[0]) * bow];
  return stroke(a, c, b, w, press);
}

// A pine's needle cluster (松葉): needles flicked out from a twig at (x, y), fanning from angle `from` to `to`
// (degrees, 0 pointing right, -90 up), each pressed at the twig and lifted off at its tip.
export function needles(x: number, y: number, r: number, rand: () => number, from = -170, to = -10, n = 15): string {
  let d = "";
  for (let i = 0; i < n; i++) {
    const deg = from + ((to - from) * (i + rand() * 0.6)) / n;
    const a = (deg * Math.PI) / 180;
    const len = r * (0.65 + rand() * 0.4);
    const tip: Pt = [x + Math.cos(a) * len, y + Math.sin(a) * len];
    d += line([x + Math.cos(a) * r * 0.06, y + Math.sin(a) * r * 0.06], tip, r * 0.12, 0.08, (rand() - 0.5) * 0.14);
  }
  return d;
}

// A band of mist or cloud (霞) laid in one sideways drag: `len` long and `h` high at its fullest, its ends torn
// where the brush ran dry and its edges ragged.
export function band(x: number, y: number, len: number, h: number, rand: () => number): string {
  const n = 14;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const env = Math.pow(Math.sin(Math.PI * t), 0.35);
    const px = x + len * t + (i === 0 || i === n ? 0 : (rand() - 0.5) * len * 0.03);
    top.push(`${f(px + h * 0.6 * (1 - env))} ${f(y - (h / 2) * env * (0.75 + rand() * 0.5))}`);
    bottom.unshift(`${f(px - h * 0.6 * (1 - env))} ${f(y + (h / 2) * env * (0.7 + rand() * 0.4))}`);
  }
  return `M${top.join("L")}L${bottom.join("L")}Z`;
}
