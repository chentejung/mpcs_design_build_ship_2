"use client";

import { useId } from "react";

// Four small printing blocks. Irregular filled contours carry the silhouette;
// tapered cuts and offset secondary strokes suggest carved and brushed ink.
export type PrintSubject = "fuji" | "shiba" | "portrait" | "ramen";

export function PrintArt({ subject = "fuji", className = "" }: { subject?: PrintSubject; className?: string }) {
  const id = `print-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 240 200" className={`showa-print-art ${className}`}>
      <defs>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".055" numOctaves="3" seed="8" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="ink" />
          <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="4" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feComponentTransfer><feFuncA type="discrete" tableValues="0 0 0 .1 .35 .7 1 1" /></feComponentTransfer>
          <feComposite in="ink" operator="out" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        {subject === "fuji" && <>
          <path fill="var(--ds-accent)" d="M189 81c1 38-28 66-65 67-35 1-66-27-67-63S84 17 121 17c38-1 67 26 68 64Z" />
          <path fill="var(--ds-selected)" d="m7 173 36-19 31-33 38-59 12 3 10-4 40 58 22 27 37 23 1 18-227-1Z" />
          <path fill="var(--ds-bg)" d="m75 124 13-25 5-5 19-32 7 2 5 1 10-4 17 24 4 3 19 31-13-8-7-4 7 16-11-10-6-11-10-10 5 19 8 16-13-15-7-16 2 32-8-17-4-14-9 14-14 28 4-19 8-15-17 20-11 11 8-16 6-9Z" />
          <g fill="var(--ds-bg)" opacity=".65">
            <path d="m110 117-37 49 25-22Zm25 3 26 49-17-40Zm-16 10-12 47 8-9Zm37 7 26 34-18-15Z" />
          </g>
          <g fill="none" stroke="var(--ds-bg)" strokeWidth="1.3" opacity=".45">
            <path d="m22 174 49-17m-30 22 38-12m66 15 33-1m-115-2 24-3m94-16 18 10" />
          </g>
        </>}
        {subject === "shiba" && <>
          <path fill="var(--ds-selected)" d="M17 147c47-10 142-12 207 6l-9 29H25Z" />
          <path fill="var(--ds-swatch-kinari)" stroke="var(--ds-text)" strokeWidth="1.6" d="M46 129 43 43q0-8 6-5l38 24q30-9 65 0l35-23q7-3 6 5l-3 69 4 17-6-3 2 13-7-3q-14 41-63 39-50 0-69-34l-6 2 3-12Z" />
          <path fill="var(--ds-swatch-kogecha)" d="m53 52 23 17-21 18Zm128 0-24 18 20 16Z" />
          <path fill="var(--ds-bg)" d="m52 114 15 5 17 13 17-12 19-6 20 7 17 10 25-18-5 32q-14 30-57 31-43 0-58-29Z" />
          <g fill="none" stroke="var(--ds-text)" strokeLinecap="round">
            <path strokeWidth="2.6" d="M69 103q10 8 22 0m59 0q10 8 22-1m-53 34v8m0-1q-9 9-17 0m17 0q10 8 19-1" />
            <path strokeWidth=".8" opacity=".6" d="m57 97 2 8m-7 3 4 9m3-3 4 9m-6 5 4 8m9-5 3 10m100-42-3 10m11-1-4 11m-1 3-3 9m-5-5-3 9m-63-65-4 8m13-9-3 11m13-10v11m10-7 3 9m-39 4-5 6m64-7 5 7" />
          </g>
          <path fill="var(--ds-text)" d="M108 126q10-6 22 0l-4 9q-7 7-13-1Z" />
          <path fill="var(--ds-accent)" d="m74 164 11-8q35 15 70-1l10 9-13 16-62-1Z" />
          <path fill="var(--ds-bg)" d="m101 182 3-21 17 12 14-13 6 24Z" />
        </>}
        {subject === "portrait" && <>
          <path fill="var(--ds-accent)" d="m18 12 197 3 3 178-199-1Z" />
          <path fill="var(--ds-text)" d="M160 25Q63 3 55 65l-2 61q-1 11-16 17 40 17 86 8l43-46Z" />
          <path fill="var(--ds-bg)" d="M111 46q43-23 80 1l-2 48 14 22-15 7q3 30-39 39l-5 22-42-11 25-25q-19-22-17-55Z" />
          <path fill="var(--ds-text)" d="m105 42 14 23 13-16 64 10-5-26Z" />
          <path fill="var(--ds-selected)" d="m128 80 29 2-3 14-14-1Z" />
          <path fill="var(--ds-text)" d="M123 83q16-18 38 1-23-7-38-1Zm5-14 21-4 6 5-23 1Z" />
          <path fill="var(--ds-accent)" d="M139 117c-1 14-24 18-30 2-6-18 20-25 28-11Zm29 16 10-6 8 2 6-1-3 9-12 7-9-4-6-7Z" />
          <path fill="var(--ds-bg)" d="m170 134 14-1-6 4Z" />
          <path fill="var(--ds-selected)" d="m121 159 24 13 33-10-4 17-27 10-45-12Zm-17 15-57 18h168l-38-14-30 11Z" />
          <g stroke="var(--ds-bg)" strokeWidth="1.3"><path d="m73 186v6m9-10v10m9-13v13m99-9v9m9-6v6" /></g>
        </>}
        {subject === "ramen" && <>
          <path fill="var(--ds-text)" d="M28 111q7 78 92 81 89-1 94-78Z" />
          <ellipse cx="120" cy="104" rx="99" ry="77" fill="var(--ds-accent)" stroke="var(--ds-text)" strokeWidth="3" />
          <ellipse cx="119" cy="102" rx="86" ry="64" fill="var(--ds-swatch-kinari)" stroke="var(--ds-bg)" strokeWidth="5" />
          <g fill="none" stroke="var(--ds-swatch-kogecha)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M43 95c4-36 81-44 110-28s34 59 7 70-104 0-107-23 47-42 91-29 35 41 8 45-97-16-85-32 94-2 102 11-35 24-76 1-15-42 23-43 86 20 75 47-61 39-103 25-56-44-31-65" />
            <path d="M70 61c28-20 107 8 119 36m-89 57c-28-2-48-11-57-30m128 10 18-16M51 93q14-17 32-17" />
          </g>
          <path fill="var(--ds-selected)" stroke="var(--ds-text)" strokeWidth="2" d="m143 44 48 15-12 57-49-20Z" />
          <g stroke="var(--ds-swatch-kinari)" opacity=".5"><path d="m150 51-8 40m17-38-9 38m18-35-9 40m17-39-8 37" /></g>
          <path fill="var(--ds-bg)" stroke="var(--ds-swatch-kogecha)" strokeWidth="2" d="M132 111c28 36-28 65-58 34-25-27 32-65 58-34Z" />
          <path fill="var(--ds-accent)" d="M118 116c29 22-7 47-25 25-16-20 9-37 25-25Z" />
          <path fill="none" stroke="var(--ds-bg)" strokeWidth="2" d="M28 117c32 69 146 80 183-3" />
        </>}
      </g>
    </svg>
  );
}

export function ShibaEmblem({ className = "" }: { className?: string }) {
  return <img src="/showa/shiba-emblem.webp" alt="" aria-hidden="true" width="384" height="384" className={`showa-shiba-emblem ${className}`} decoding="async" />;
}

export function PrintAssetKit() {
  return <section className="showa-asset-kit" aria-labelledby="showa-asset-title">
    <div><p className="ds-label">From poster to screen</p><h3 id="showa-asset-title" className="ds-heading mt-3 text-2xl">Small mark. Wide horizon.</h3><p className="ds-body ds-muted mt-3">The same carved lines, vermilion ink and paper grain, made for two different scales.</p></div>
    <div className="showa-asset-grid">
      <figure className="showa-asset-card">
        <div className="showa-emblem-stage"><ShibaEmblem /></div>
        <figcaption><p className="ds-label">01 · Shiba emblem <span lang="ja">柴犬</span></p><p className="ds-body ds-muted">A quiet companion for empty states and small moments.</p><a href="/showa/shiba-emblem.png" download className="ds-link">Download icon · PNG</a></figcaption>
      </figure>
      <figure className="showa-asset-card">
        <img className="showa-landscape-preview" src="/showa/fuji-landscape.webp" alt="A vermilion sun above indigo Mount Fuji, a still lake and carved pine branches on worn cream paper." width="1200" height="800" loading="lazy" />
        <figcaption><p className="ds-label">02 · Fuji at dusk <span lang="ja">富士山</span></p><p className="ds-body ds-muted">A landscape print for welcoming headers and editorial panels.</p><a href="/showa/fuji-landscape.png" download className="ds-link">Download graphic · PNG</a></figcaption>
      </figure>
    </div>
    <div className="showa-emblem-sizes" aria-label="Emblem size examples">
      {[32, 48, 64].map(size => <figure key={size}><ShibaEmblem className={`showa-emblem-${size}`} /><figcaption className="ds-meta ds-muted">{size} px</figcaption></figure>)}
      <p className="ds-body ds-muted">A clear silhouette at a glance. Carved detail up close.</p>
    </div>
  </section>;
}

export function PosterHeroArt({ className = "", landscape = false }: { className?: string; landscape?: boolean }) {
  return <figure className={`showa-hero-art ${className}`}>
    <img src={landscape ? "/showa/fuji-landscape.webp" : "/showa/poster-scene.png"} alt={landscape ? "An ukiyo-e-inspired print of Mount Fuji beneath a vermilion sun, with lake mist and pine branches." : "An original worn-ink poster: Mount Fuji and a red sun, a Shiba with ramen, and a cropped cinema portrait."} width="1536" height="1024" fetchPriority="high" />
    <figcaption><span lang="ja">日々に、映画を。</span><span>A little cinema, every day.</span></figcaption>
  </figure>;
}

export const printReferences = [
  { n: "04", title: "Fuji Sunrise", file: "02-fuji-sunrise", subject: "fuji", note: "A single red disc. A blue silhouette. Snow carved out in broken, tapered strokes." },
  { n: "06", title: "Shiba & Sake", file: "03-shiba-sake", subject: "shiba", note: "Soft brush shading, uneven fur contours, paper labels and small red maker’s seals." },
  { n: "08", title: "Nouvelle Vague", file: "04-nouvelle-vague", subject: "portrait", note: "Cropped silhouettes, generous empty space and a single expressive red accent." },
  { n: "18", title: "Ramen", file: "09-ramen", subject: "ramen", note: "Flowing ink lines, imperfect bowl rings and warm straw against deep blue-green." },
] as const;

export function PrintReferences() {
  return <section className="showa-references" aria-labelledby="showa-reference-title">
    <div className="showa-reference-heading"><p className="ds-label">The visual language</p><h2 id="showa-reference-title" className="ds-heading">Four posters. One print language.</h2><p className="ds-body ds-muted">Bold from a distance. Rich in the small details.</p></div>
    <div className="showa-reference-grid">{printReferences.map(r => <figure key={r.n}>
      <img src={`/moodboards/japanese-retro/pinterest-${r.file}.jpg`} alt={`${r.title} reference poster`} width="640" height="900" loading="lazy" />
      <figcaption><p className="ds-label"><span>{r.n}</span> {r.title}</p><p className="ds-body ds-muted">{r.note}</p></figcaption>
    </figure>)}</div>
  </section>;
}
