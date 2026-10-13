"use client";
// Shōwa's screenprint finish for its drawings, after the four posters its kit comes from (Mood Board 01: Fuji Sunrise
// 04, Shiba & Sake 06, Nouvelle Vague 08, Ramen 18): flat inks whose edges wobble a little where the screen bled, and
// fine specks where the ink missed and the paper shows. app/system.css gives controls the same specks (--ds-wear).
import { useId } from "react";

export const useSvgId = () => useId().replace(/:/g, "");

// Put `filter={`url(#${id})`}` on a group of flat shapes. `rough` is how far edges wander (in viewBox units),
// `specks` how much paper shows through (0 none, 1 a lot); `scale` sizes the speck grain for the drawing's viewBox.
export function Wear({ id, rough = 1.6, specks = 0.5, scale = 1, seed = 3 }: { id: string; rough?: number; specks?: number; scale?: number; seed?: number }) {
  const cut = 0.78 - specks * 0.06; // red-channel level above which the paper shows
  return (
    <filter id={id} x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency={0.035 / scale} numOctaves="2" seed={seed} result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale={rough} xChannelSelector="R" yChannelSelector="G" result="rough" />
      <feTurbulence type="fractalNoise" baseFrequency={0.8 / scale} numOctaves="2" seed={seed + 8} result="grain" />
      <feColorMatrix in="grain" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -26 0 0 0 ${(26 * cut).toFixed(2)}`} result="ink" />
      <feComposite in="rough" in2="ink" operator="in" />
    </filter>
  );
}
