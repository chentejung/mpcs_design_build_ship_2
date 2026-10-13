"use client";
// Each system's background treatment, drawn with the print toolkit the Originals use. Shōwa's is an old poster's
// paper: Washi grain, yellowing to Kinari toward the edges as Shiba & Sake and Ramen have.
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

  if (id === "showa") return <div aria-hidden="true" className={`showa-paper pointer-events-none ${pos} inset-0 -z-10`} />;

  return (
    <svg aria-hidden className={`pointer-events-none ${pos} inset-0 -z-10 h-full w-full`}>
      <defs>
        {id === "ben-day" && (
          <>
            <Dots id={`${uid}-red`} color={c.red} r={1.5} gap={9} angle={15} />
            <Dots id={`${uid}-sepia`} color={c.sepia} r={1.1} gap={9} angle={75} />
          </>
        )}
        {id === "haipai" && (
          <>
            <Grain id={`${uid}-fibre`} grain={0.45} seed={9} frequency="0.006 0.22" />
            <Hatch id={`${uid}-hatch`} color={c.gold} width={0.6} gap={7} angle={-35} />
          </>
        )}
      </defs>
      {id === "ben-day" && (
        <>
          <rect width="100%" height="100%" fill={`url(#${uid}-red)`} opacity="0.14" />
          <rect width="100%" height="100%" fill={`url(#${uid}-sepia)`} opacity="0.1" />
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
