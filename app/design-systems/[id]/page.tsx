import type { Metadata } from "next";
import { systems } from "@/app/systems";

export const dynamicParams = false;
export const generateStaticParams = () => systems.map((s) => ({ id: s.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `${systems.find((s) => s.id === id)!.name} — Design System` };
}

const sections = ["Color roles", "Type roles", "Spacing and shape", "Texture and motif", "Components", "Control states", "UI states", "Applied"];

export default async function DesignSystemPage({ params }: Props) {
  const { id } = await params;
  const system = systems.find((s) => s.id === id)!;

  return (
    <main className="px-[6vw] py-16">
      <h1 className="font-serif text-6xl">
        {system.name} {system.alt}
      </h1>
      {sections.map((title) => (
        <section key={title} className="border-t border-line py-10">
          <h2 className="font-serif text-3xl">{title}</h2>
        </section>
      ))}
    </main>
  );
}
