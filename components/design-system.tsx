import type { ReactNode } from "react";
import { colorRoles, contrastRatio, themeStyle, type DesignSystem, type TypeRole } from "@/app/design-systems/systems";
import { ComponentExamples } from "./design-system-examples";
import { artDirections } from "@/app/design-systems/art-directions";
import "./design-system.css";
import "./design-system-art.css";

export function SystemPreview({ system }: { system: DesignSystem }) {
  const direction = artDirections[system.id];
  return <div className={`ds ds-preview ${system.selected ? "ds-preview-selected" : ""}`} data-system={system.id} style={themeStyle(system)}>
    <div className="ds-preview-art"><img src={direction.hero.src} alt="" width={1060} height={1484} loading="lazy" /><span>{direction.board.title}</span><b lang={direction.language} aria-hidden="true">{direction.stamp}</b></div>
    <div className="ds-preview-type"><span className="ds-display">Aa</span><span className="ds-caption">{system.fonts}</span></div>
    <div className="ds-preview-palette">{colorRoles.map((role) => <span key={role} title={`${role}: ${system.colors[role]}`} style={{ background: system.colors[role] }} />)}</div>
    <div className="ds-inline"><span className="ds-button">Primary</span><span className="ds-button ds-button-secondary">Secondary</span></div>
    <span className="ds-field ds-preview-field">Find your next film…</span>
  </div>;
}

function SpecimenSection({ number, title, id, children, system }: { number: string; title: string; id: string; children: ReactNode; system: DesignSystem }) {
  const direction = artDirections[system.id];
  return <section id={id} className="ds-section" aria-labelledby={`${id}-heading`} tabIndex={-1}>
    <h2 id={`${id}-heading`} className="ds-section-title"><span>{number}</span><span className="ds-section-name">{title}</span><small lang={direction.language} aria-hidden="true">{direction.chapterNames[Number(number) - 1]}</small></h2>
    {children}
  </section>;
}

function Colors({ system }: { system: DesignSystem }) {
  const names = { background: "Background", surface: "Surface", text: "Text", muted: "Muted text", border: "Border", accent: "Accent" };
  const pairs = [
    { label: "Text / background", first: system.colors.text, second: system.colors.background },
    { label: "Muted / background", first: system.colors.muted, second: system.colors.background },
    { label: "Accent / surface", first: system.colors.accent, second: system.colors.surface },
    { label: "Button label / accent", first: system.onAccent, second: system.colors.accent },
    { label: "Border / surface", first: system.colors.border, second: system.colors.surface },
  ];
  return <SpecimenSection number="01" title="Color roles" id="tokens" system={system}>
    <div className="ds-swatches">{colorRoles.map((role) => <div key={role}>
      <div className="ds-swatch" style={{ background: system.colors[role] }} />
      <strong>{names[role]}</strong><code>{system.colors[role]}</code>
    </div>)}</div>
    <dl className="ds-contrast">{pairs.map((pair) => <div key={pair.label}><dt>{pair.label}</dt><dd>{contrastRatio(pair.first, pair.second).toFixed(2)}:1</dd></div>)}</dl>
    <p className="ds-caption">Ratios use the solid color pairs shown. Readable text sits on paper panels; artwork and textures stay in the margins. Accent shades are tuned for contrast.</p>
  </SpecimenSection>;
}

function Typography({ system }: { system: DesignSystem }) {
  const samples: Record<TypeRole, string> = { display: "A night at the movies.", heading: "Find your next film", body: "A small collection. A good story. Something worth staying up for.", label: "TONIGHT’S SHORTLIST" };
  return <SpecimenSection number="02" title="Type roles" id="type" system={system}>
    <p className="ds-caption ds-type-pair">{system.fonts}</p>
    <div className="ds-type-samples">{(Object.keys(samples) as TypeRole[]).map((role) => <div key={role}>
      <p className={`ds-${role}`}>{samples[role]}</p>
      <p className="ds-caption"><strong>{role}</strong> · {system.type[role].size}px / {system.type[role].weight} weight / {system.type[role].leading} line height</p>
    </div>)}</div>
    <div className="ds-native-type" lang={artDirections[system.id].language} aria-hidden="true">{artDirections[system.id].typeSample}</div>
  </SpecimenSection>;
}

function Spacing({ system }: { system: DesignSystem }) {
  return <SpecimenSection number="03" title="Spacing & shape" id="spacing" system={system}>
    <div className="ds-spacing-scale">{system.spacing.map((space) => <div key={space}><span style={{ height: space, width: space }} /><code>{space}</code></div>)}</div>
    <p className="ds-caption">Pixels · 4 / 8 for details · 12 / 16 for controls · 24 / 32 for groups</p>
    <div className="ds-shapes">{[["Control", system.shape.control], ["Card", system.shape.card], ["Badge", system.shape.badge]].map(([label, radius]) => <div key={label}><span style={{ borderRadius: radius }} /><p>{label}<br /><code>{radius}px</code></p></div>)}<div><span className="ds-shadow-sample" /><p>Border<br /><code>{system.shape.border}px</code></p></div></div>
    <p className="ds-caption">{system.shape.note}</p>
    <code className="ds-shadow-code">shadow: {system.shape.shadow}</code>
  </SpecimenSection>;
}

function ControlStates({ system }: { system: DesignSystem }) {
  return <SpecimenSection number="05" title="Control states" id="controls" system={system}>
    <p className="ds-caption">Fixed samples for comparison. Try the live controls above with your mouse or keyboard.</p>
    <div className="ds-control-states">{["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"].map((state) => <div key={state}>
      <span className={`ds-button ds-sample-${state.toLowerCase()}`}>{state === "Selected" ? "✓ Saved" : "Save film"}</span><span className="ds-caption">{state}</span>
    </div>)}</div>
    <p className="ds-caption">Focus uses an offset ring. Pressed deepens the fill. Selected adds a check and label; disabled removes interaction.</p>
  </SpecimenSection>;
}

function UIStates({ system }: { system: DesignSystem }) {
  const states = [
    { id: "empty", icon: "○", title: "No films yet", description: "Save a film to start your shortlist.", label: "Empty" },
    { id: "loading", icon: "", title: "Finding films…", description: "Your next story is on its way.", label: "Loading" },
    { id: "error", icon: "!", title: "Couldn’t load films", description: "Try again in a moment.", label: "Error" },
    { id: "success", icon: "✓", title: "Added to your list", description: "A good film, ready for tonight.", label: "Success" },
  ];
  return <SpecimenSection number="06" title="UI states" id="ui-states" system={system}>
    <div className="ds-ui-states">{states.map((state) => <figure key={state.id}>
      <div className={`ds-state-panel ds-state-${state.id}`}><span className={`ds-state-icon ${state.id === "loading" ? "ds-spinner" : ""}`} aria-hidden="true">{state.icon}</span><strong>{state.title}</strong><p>{state.description}</p></div><figcaption className="ds-caption">{state.label}</figcaption>
    </figure>)}</div>
    <p className="ds-caption">Example messages for each state. The component playground uses a local film collection.</p>
  </SpecimenSection>;
}

export function SystemSpecimen({ system }: { system: DesignSystem }) {
  return <div className="ds-specimen">
    <div className="ds-foundations"><Colors system={system} /><Typography system={system} /><Spacing system={system} /></div>
    <div className="ds-examples">
      <SpecimenSection number="04" title="Components" id="components" system={system}>
        <div className="ds-program-banner"><img src={artDirections[system.id].detail.src} alt="" width={1060} height={1484} loading="lazy" /><div><span className="ds-label">THE EVENING PROGRAM</span><p>{system.id === "grid" ? "Your next adventure starts here!" : system.id === "soft" ? "A story for every evening." : "Three films. A whole new world."}</p></div><span className="ds-banner-seal" lang={artDirections[system.id].language} aria-hidden="true">{artDirections[system.id].stamp}</span></div>
        <ComponentExamples />
      </SpecimenSection>
      <ControlStates system={system} /><UIStates system={system} />
    </div>
  </div>;
}
