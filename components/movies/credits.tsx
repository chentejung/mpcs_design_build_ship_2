import { films } from "@/app/films";

export function Credits() {
  return (
    <section aria-labelledby="poster-credits" className="ds-credits mt-20 border-t-2 border-(--ds-border) pt-10">
      <h2 id="poster-credits" className="ds-heading text-2xl">Poster credits</h2>
      <p className="ds-body ds-muted mt-2 max-w-2xl">
        Posters used for a non-commercial class mock-up. Each poster belongs to the copyright holder listed below; images via Wikipedia.
      </p>
      <ol className="ds-credits-list ds-fine mt-5">
        {films.map((f) => (
          <li key={f.id} className="break-inside-avoid py-0.5">
            <span className="font-bold">{f.title}</span> ({f.year}) — {f.credit.publicDomain ? `Public domain (${f.credit.holder})` : `© ${f.credit.holder}`} ·{" "}
            <a href={f.credit.source} target="_blank" rel="noopener" aria-label={`Poster source for ${f.title}`} className="ds-link">
              Source
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
