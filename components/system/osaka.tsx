"use client";
// Shōwa's drawing kit after Osaka Rainy Night on the Japanese Retro board (picture 26): the vertical signboards
// (看板) of Dōtonbori, each a framed board with a cap. The signboard stands beside the hero sun, headed by a sun over
// waves (koi.tsx) and closed by the cinema's ringed stamp.
import { SunOverWaves } from "./koi";
import { Tenneniro } from "./terebi";

// A vertical signboard: `text` set top to bottom in 天然色, `stamp` in a thin Accent ring below it.
export function Signboard({ text, stamp }: { text: string; stamp: string }) {
  return (
    <span aria-hidden lang="ja" className="ds-signboard">
      <SunOverWaves className="ds-signboard-sun" />
      <span className="ds-signboard-text"><Tenneniro text={text} /></span>
      <span className="ds-signboard-stamp">{stamp}</span>
    </span>
  );
}
