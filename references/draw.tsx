// Preview drawings without a full build: render components' exports into out/_draw.html, themed by a Design System,
// with the built site's CSS and font classes. Exports named *Art (the genre panels, which draw a bare <g>) are set in a
// 200 × 250 panel. Needs a build in out/ (run serve.sh once), then screenshot the page:
//   npx tsx references/draw.tsx components/system/robot.tsx SciFiArt,Robot [width] [system-id]
//   bash references/screenshot.sh /_draw.html .screenshots/draw.png 1400 600
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { systems } from "@/app/systems";
import { SystemTheme } from "@/components/system/theme";

const [mod, names, width = "240", systemId = "ben-day"] = process.argv.slice(2);
if (!mod || !names) throw new Error("usage: npx tsx references/draw.tsx <module> <Export1,Export2> [width] [system-id]");
const root = path.resolve(__dirname, "..");
const exported = require(path.resolve(root, mod));
const built = fs.readFileSync(path.join(root, "out/movies/index.html"), "utf8");
const htmlTag = built.match(/<html[^>]*>/)![0];
const links = (built.match(/<link rel="stylesheet"[^>]*>/g) ?? []).join("");
const system = systems.find((s) => s.id === systemId)!;

const cells = names.split(",").map((name) => {
  const Component = exported[name];
  if (!Component) throw new Error(`${mod} has no export "${name}"`);
  return (
    <figure key={name} style={{ width: +width, margin: 0 }}>
      <figcaption style={{ font: "12px monospace" }}>{name}</figcaption>
      {name.endsWith("Art") ? (
        <svg viewBox="0 0 200 250" style={{ display: "block", width: "100%" }}>
          <Component />
          <rect x="2" y="2" width="196" height="246" fill="none" stroke="var(--ds-text)" strokeWidth="4" />
        </svg>
      ) : (
        <Component />
      )}
    </figure>
  );
});

// Render inside the system's theme so components that read its context (and --ds-* variables) work.
const body = renderToStaticMarkup(
  <SystemTheme system={system} className="min-h-screen p-4">
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "start" }}>{cells}</div>
  </SystemTheme>,
);
fs.writeFileSync(path.join(root, "out/_draw.html"), `<!DOCTYPE html>${htmlTag}<head><meta charset="utf-8">${links}</head><body>${body}</body></html>`);
console.log("==> Wrote out/_draw.html: bash references/screenshot.sh /_draw.html .screenshots/draw.png 1400 600");
