"use client";
import type { Film } from "@/app/films";
import { CheckIcon } from "@/components/system/icons";
import { Button } from "@/components/system/controls";
import { useSaved } from "./saved";

// Toggle: the name stays "Save <title>"; aria-pressed carries the saved state.
export function SaveButton({ film }: { film: Film }) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(film.id);
  return (
    <Button block aria-pressed={saved} aria-label={`Save ${film.title}`} onClick={() => toggle(film.id)}>
      {saved ? <><CheckIcon /> Saved</> : "+ Save"}
    </Button>
  );
}

export function RemoveButton({ film }: { film: Film }) {
  const { remove } = useSaved();
  return (
    <Button block variant="secondary" aria-label={`Remove ${film.title}`} onClick={() => remove(film.id)}>
      Remove
    </Button>
  );
}
