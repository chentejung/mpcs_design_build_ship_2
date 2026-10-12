import { artDirections } from "@/app/design-systems/art-directions";
import type { DesignSystem } from "@/app/design-systems/systems";

export function SystemPoster({ system }: { system: DesignSystem }) {
  const direction = artDirections[system.id];
  return <header className="ds-poster">
    <div className="ds-poster-masthead"><span>{direction.kicker}</span><span>VOL. 0{system.id === "clay" ? 1 : system.id === "grid" ? 2 : 3} / DESIGN SYSTEM</span></div>
    <div className="ds-poster-body">
      <div className="ds-poster-copy">
        <p className="ds-label ds-system-name">{system.title} <span>— {direction.board.title}</span></p>
        <h1 className="ds-poster-headline">{direction.headline.map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="ds-poster-description">{system.description}</p>
        <div className="ds-poster-actions"><a className="ds-button" href="#components">Explore the components ↓</a><a className="ds-link" href={`/moodboards/${direction.board.id}/`}>View the mood board ↗</a></div>
        <div className="ds-poster-imprint"><span className="ds-poster-seal" lang={direction.language} aria-hidden="true">{direction.stamp}</span><p>Illustration meets interaction.<br /><strong>Six chapters. One visual language.</strong></p></div>
      </div>
      <figure className="ds-poster-art">
        <img src={direction.hero.src} alt={direction.hero.title} width={1060} height={1484} fetchPriority="high" />
        <span className="ds-poster-sign" lang={direction.language} aria-hidden="true">{direction.nativeTitle}</span>
        <figcaption><span>{direction.hero.title}</span><span>{direction.board.title} collection</span></figcaption>
      </figure>
    </div>
    <div className="ds-poster-principles">{direction.principles.map((principle, i) => <span key={principle}><b>0{i + 1}</b>{principle}</span>)}</div>
  </header>;
}

export function SystemIndex() {
  return <nav className="ds-section-index" aria-label="On this page">
    {[["tokens", "Color"], ["type", "Type"], ["spacing", "Shape"], ["components", "Components"], ["controls", "Controls"], ["ui-states", "UI states"]].map(([id, label], i) => <a key={id} href={`#${id}`}><span>0{i + 1}</span>{label}</a>)}
  </nav>;
}

export function SystemArtNote({ system }: { system: DesignSystem }) {
  const direction = artDirections[system.id];
  return <div className="ds-art-note">
    <img src={direction.detail.src} alt={direction.detail.title} width={1060} height={1484} loading="lazy" />
    <div><p className="ds-label">From the board to the page</p><p>{direction.material}</p><a className="ds-link" href={`/moodboards/${direction.board.id}/`}>Explore all 30 references & originals ↗</a></div>
  </div>;
}
