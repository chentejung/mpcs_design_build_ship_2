"use client";
// Each system's background treatment, drawn with the print toolkit the Originals use. Shōwa's is an old poster's
// paper: Washi grain, yellowing to Kinari toward the edges as Shiba & Sake and Ramen have. Pulp's is a cheap
// magazine's: Newsprint fibres, toned to Peach at the edges, freckled with Sepia foxing, under a coarse Sepia
// halftone that thickens toward the corners.
import { useId } from "react";
import { colors } from "@/app/boards";
import { systems } from "@/app/systems";
import { Dots, Grain, Hatch } from "@/components/artifacts/print";
import { useSystemId } from "./context";

export function Texture({ fixed = false }: { fixed?: boolean }) {
  const id = useSystemId();
  const c = colors(systems.find((s) => s.id === id)!.board);
  const uid = useId().replace(/:/g, "");
  const pos = fixed ? "fixed" : "absolute";

  return (
    <svg aria-hidden className={`pointer-events-none ${pos} inset-0 -z-10 h-full w-full`}>
      <defs>
        {id === "showa" && (
          <>
            <Grain id={`${uid}-grain`} grain={0.5} seed={4} />
            <radialGradient id={`${uid}-age`} cx="50%" cy="40%" r="75%">
              <stop offset="55%" stopColor={c.kinari} stopOpacity="0" />
              <stop offset="100%" stopColor={c.kinari} stopOpacity="0.55" />
            </radialGradient>
          </>
        )}
        {id === "pulp" && (
          <>
            <Grain id={`${uid}-fibre`} grain={0.34} seed={6} frequency="0.06 0.7" />
            <filter id={`${uid}-fox`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed={11} />
              <feColorMatrix values="0 0 0 0 0.36  0 0 0 0 0.29  0 0 0 0 0.24  9 0 0 0 -6.1" />
            </filter>
            <radialGradient id={`${uid}-tone`} cx="50%" cy="45%" r="75%">
              <stop offset="50%" stopColor={c.peach} stopOpacity="0" />
              <stop offset="100%" stopColor={c.peach} stopOpacity="0.6" />
            </radialGradient>
            <radialGradient id={`${uid}-fade`} cx="50%" cy="45%" r="72%">
              <stop offset="58%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#fff" stopOpacity="1" />
            </radialGradient>
            <mask id={`${uid}-edge`}><rect width="100%" height="100%" fill={`url(#${uid}-fade)`} /></mask>
            <Dots id={`${uid}-screen`} color={c.sepia} r={1.7} gap={7} angle={45} />
          </>
        )}
        {id === "haipai" && (
          <>
            <Grain id={`${uid}-fibre`} grain={0.45} seed={9} frequency="0.006 0.22" />
            <Hatch id={`${uid}-hatch`} color={c.gold} width={0.6} gap={7} angle={-35} />
          </>
        )}
      </defs>
      {id === "showa" && (
        <>
          <rect width="100%" height="100%" fill={`url(#${uid}-age)`} />
          <rect width="100%" height="100%" filter={`url(#${uid}-grain)`} style={{ mixBlendMode: "multiply" }} />
        </>
      )}
      {id === "pulp" && (
        <>
          <rect width="100%" height="100%" fill={`url(#${uid}-tone)`} />
          <rect width="100%" height="100%" filter={`url(#${uid}-fox)`} opacity="0.1" />
          <rect width="100%" height="100%" fill={`url(#${uid}-screen)`} mask={`url(#${uid}-edge)`} opacity="0.24" />
          <rect width="100%" height="100%" filter={`url(#${uid}-fibre)`} style={{ mixBlendMode: "multiply" }} />
        </>
      )}
      {id === "haipai" && (
        <>
          <rect width="100%" height="100%" fill={`url(#${uid}-hatch)`} opacity="0.12" />
        </>
      )}
    </svg>
  );
}
