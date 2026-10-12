"use client";
// The saved list lives only in React state. The provider is mounted in the /movies layout, so it
// survives client-side navigation between /movies and /movies/saved; any full page load starts empty.
// Nothing is written to localStorage, sessionStorage, cookies, or the URL.
import { createContext, useContext, useState } from "react";

type Saved = {
  ids: string[]; // in the order they were saved
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const SavedContext = createContext<Saved | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const remove = (id: string) => setIds((list) => list.filter((x) => x !== id));
  const value: Saved = {
    ids,
    isSaved: (id) => ids.includes(id),
    toggle: (id) => setIds((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
    remove,
  };
  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const saved = useContext(SavedContext);
  if (!saved) throw new Error("useSaved must be used inside <SavedProvider>");
  return saved;
}
