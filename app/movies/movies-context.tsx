"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type MoviesContextValue = {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const MoviesContext = createContext<MoviesContextValue | null>(null);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const value = useMemo(() => ({
    savedIds,
    isSaved: (id: string) => savedIds.includes(id),
    toggle: (id: string) => setSavedIds((ids) => ids.includes(id) ? ids.filter((saved) => saved !== id) : [...ids, id]),
    remove: (id: string) => setSavedIds((ids) => ids.filter((saved) => saved !== id)),
  }), [savedIds]);
  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}

export function useMovies() {
  const value = useContext(MoviesContext);
  if (!value) throw new Error("useMovies must be used inside MoviesProvider");
  return value;
}
