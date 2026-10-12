"use client";
// Eigakan's colophon, the band along the foot of its pages: the name large in Accent over a native tagline, three facts
// on bullets, and the cinema's mark. Shōwa sets it like the foot of the Koi Pond and Color TV posters (Mood Board 01,
// pictures 02 and 25) and stamps it with a ringed 映; other systems show their brand mark.
import { films } from "@/app/films";
import { useSystemId } from "./context";

export function Colophon() {
  const id = useSystemId();
  return (
    <div className="ds-colophon">
      <div>
        <p className="ds-colophon-name">Eigakan</p>
        <p lang="ja" className="ds-colophon-tagline">名作を、いま、ご家庭で。</p>
      </div>
      <ul className="ds-colophon-facts ds-body">
        <li>{films.length} films, one category each</li>
        <li>Save as many as you like while you browse</li>
        <li>Your list clears when you reload</li>
      </ul>
      <div aria-hidden className="ds-colophon-mark">
        {id === "showa" ? <span lang="ja" className="ds-colophon-stamp">映</span> : <span className="ds-brand-mark">映</span>}
        <span className="ds-label ds-muted">Eigakan · MMXXVI</span>
      </div>
    </div>
  );
}
