"use client";
// Which Design System wraps a component, for the few pieces whose markup (not just style) differs per system:
// motifs and the empty state. Everything else is styled by app/system.css from the wrapper's --ds-* variables.
import { createContext, useContext } from "react";

const SystemIdContext = createContext<string | null>(null);

export function SystemIdProvider({ id, children }: { id: string; children: React.ReactNode }) {
  return <SystemIdContext.Provider value={id}>{children}</SystemIdContext.Provider>;
}

export function useSystemId() {
  const id = useContext(SystemIdContext);
  if (!id) throw new Error("useSystemId must be used inside <SystemTheme>");
  return id;
}
