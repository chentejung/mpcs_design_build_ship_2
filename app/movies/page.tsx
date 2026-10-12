import type { Metadata } from "next";
import { Browse } from "@/components/movies/browse";

export const metadata: Metadata = { title: "Now Showing" };

export default function MoviesPage() {
  return <Browse />;
}
