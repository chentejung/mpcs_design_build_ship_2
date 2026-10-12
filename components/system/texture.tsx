"use client";
// Each system's background treatment, drawn with the print toolkit the Originals use.
import { useId } from "react";
import { colors } from "@/app/catalog-boards";
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
        {id === "showa" && <Grain id={`${uid}-grain`} grain={0.5} seed={4} />}
        {id === "ben-day" && (
          <>
            <Dots id={`${uid}-red`} color={c.red} r={1.5} gap={9} angle={15} />
            <Dots id={`${uid}-cyan`} color={c.cyan} r={1.3} gap={9} angle={75} />
          </>
        )}
        {id === "haipai" && (
          <>
            <Grain id={`${uid}-fibre`} grain={0.45} seed={9} frequency="0.006 0.22" />
            <Hatch id={`${uid}-hatch`} color={c.gold} width={0.6} gap={7} angle={-35} />
          </>
        )}
      </defs>
      {id === "showa" && <rect width="100%" height="100%" filter={`url(#${uid}-grain)`} style={{ mixBlendMode: "multiply" }} />}
      {id === "ben-day" && (
        <>
          <rect width="100%" height="100%" fill={`url(#${uid}-red)`} opacity="0.14" />
          <rect width="100%" height="100%" fill={`url(#${uid}-cyan)`} opacity="0.12" />
        </>
      )}
      {id === "haipai" && (
        <>
          <rect width="100%" height="100%" filter={`url(#${uid}-fibre)`} style={{ mixBlendMode: "multiply" }} />
          <rect width="100%" height="100%" fill={`url(#${uid}-hatch)`} opacity="0.12" />
        </>
      )}
    </svg>
  );
}
