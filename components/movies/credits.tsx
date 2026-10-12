import { films } from "@/app/films";

export function Credits() {
  return (
    <section aria-labelledby="poster-credits" className="mt-20 border-t border-(--ink)/15 pt-10">
      <h2 id="poster-credits" className="font-serif text-2xl">Poster credits</h2>
      <p className="mt-2 max-w-2xl text-sm opacity-75">
        Posters used for a non-commercial class mock-up. Each poster belongs to the copyright holder listed below; images via Wikipedia.
      </p>
      <ol className="mt-5 gap-x-10 text-xs leading-relaxed sm:columns-2 lg:columns-3">
        {films.map((f) => (
          <li key={f.id} className="break-inside-avoid py-0.5">
            <span className="font-semibold">{f.title}</span> ({f.year}) — {f.credit.publicDomain ? `Public domain (${f.credit.holder})` : `© ${f.credit.holder}`} ·{" "}
            <a href={f.credit.source} target="_blank" rel="noopener" aria-label={`Poster source for ${f.title}`} className="underline decoration-(--ink)/30 underline-offset-2 hover:text-(--accent)">
              Source
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
