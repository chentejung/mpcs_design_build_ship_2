import { systemStyle, type DesignSystem } from "@/app/systems";
import { SystemIdProvider } from "./context";
import { Texture } from "./texture";

// Wraps content in one Design System: its colors, fonts and shapes as --ds-* variables, plus its texture.
// systemStyle() fails the build if the system misses a contrast target. `fixed` pins the texture to the
// viewport for full pages; embedded previews keep it inside their box.
export function SystemTheme({ system, fixed = false, className = "", children }: {
  system: DesignSystem;
  fixed?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-system={system.id} style={systemStyle(system)} className={`catalog ${className}`}>
      <SystemIdProvider id={system.id}>
        <Texture fixed={fixed} />
        {children}
      </SystemIdProvider>
    </div>
  );
}
