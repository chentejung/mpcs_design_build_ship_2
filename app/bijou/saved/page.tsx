import type { Metadata } from "next";
import { SavedList } from "@/components/movies/saved-list";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return <SavedList />;
}
