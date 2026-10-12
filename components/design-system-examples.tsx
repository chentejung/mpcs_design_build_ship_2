"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { movies } from "@/app/movies/data";

// The same local examples make the three visual systems directly comparable.
const films = [movies[0], movies[4], movies[8]];
const genres = ["All", "Thriller", "Comedy", "Animation"] as const;

export function ComponentExamples() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("title");
  const [genre, setGenre] = useState<string>("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [tab, setTab] = useState("browse");
  const [shortOnly, setShortOnly] = useState(false);
  const [view, setView] = useState("cards");
  const [details, setDetails] = useState(true);
  const [message, setMessage] = useState("");
  const [activeFilm, setActiveFilm] = useState(films[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const filtered = films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase()) && (genre === "All" || film.category === genre) && (!shortOnly || film.runtime < 120) && (tab === "browse" || saved.includes(film.id)))
    .sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : b.year - a.year);
  const featured = filtered[0];
  function toggleSave(id: string) {
    const wasSaved = saved.includes(id);
    setSaved((current) => wasSaved ? current.filter((item) => item !== id) : [...current, id]);
    setMessage(wasSaved ? "Film removed from your shortlist." : "Film added to your shortlist.");
  }
  function openFilm(film: typeof films[number], button: HTMLButtonElement) {
    setActiveFilm(film);
    opener.current = button;
    dialog.current?.showModal();
  }
  function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "browse" : event.key === "End" ? "saved" : tab === "browse" ? "saved" : "browse";
    setTab(next);
    document.getElementById(`ds-tab-${next}`)?.focus();
  }
  function keepDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return <>
    <p className="ds-caption ds-component-intro">A working film shortlist. Search, filter, save, and open a film to try this system.</p>
    <div className="ds-toolbar">
      <button type="button" className="ds-button" disabled={!featured} onClick={() => featured && toggleSave(featured.id)}>{featured && saved.includes(featured.id) ? "Unsave first film" : "Save first film"}</button>
      <button type="button" className="ds-button ds-button-secondary" onClick={() => { setQuery(""); setGenre("All"); setSort("title"); setShortOnly(false); setTab("browse"); setMessage("Filters reset."); }}>Reset filters</button>
      <a className="ds-link" href="/movies/">See all films ↗</a>
    </div>
    <div className="ds-fields">
      <label className="ds-field-label">Search films<input type="search" className="ds-field" placeholder="Try Parasite…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <label className="ds-field-label">Sort by<select className="ds-field" value={sort} onChange={(event) => setSort(event.target.value)}><option value="title">Title A–Z</option><option value="year">Newest first</option></select></label>
    </div>
    <div className="ds-options">
      <label className="ds-choice"><input type="checkbox" checked={shortOnly} onChange={(event) => setShortOnly(event.target.checked)} />Under 2 hours</label>
      <fieldset className="ds-radio-group"><legend className="ds-sr-only">Film presentation</legend>{["cards", "list"].map((value) => <label className="ds-choice" key={value}><input type="radio" name="presentation" value={value} checked={view === value} onChange={() => setView(value)} />{value === "cards" ? "Cards" : "List"}</label>)}</fieldset>
      <button type="button" className="ds-switch-label" role="switch" aria-checked={details} onClick={() => setDetails(!details)}><span className="ds-switch" aria-hidden="true"><span /></span>Synopses</button>
    </div>
    <div className="ds-browse-heading"><div className="ds-tabs" role="tablist" aria-label="Film collection">{["browse", "saved"].map((value) => <button key={value} type="button" role="tab" id={`ds-tab-${value}`} aria-selected={tab === value} aria-controls="ds-film-panel" tabIndex={tab === value ? 0 : -1} onKeyDown={moveTab} onClick={() => setTab(value)}>{value === "browse" ? "Browse" : `Saved (${saved.length})`}</button>)}</div><span className="ds-caption">{filtered.length} {filtered.length === 1 ? "film" : "films"}</span></div>
    <div className="ds-chips" role="group" aria-label="Genre">{genres.map((value) => <button type="button" key={value} className="ds-chip" aria-pressed={genre === value} onClick={() => setGenre(value)}>{value}</button>)}</div>
    <div id="ds-film-panel" role="tabpanel" aria-labelledby={`ds-tab-${tab}`} tabIndex={0}>
      {filtered.length === 0 ? <div className="ds-empty-result"><strong>{tab === "saved" && saved.length === 0 ? "No saved films yet" : "No matching films"}</strong><p>Try another filter or browse the collection.</p><button type="button" className="ds-link" onClick={() => { setQuery(""); setGenre("All"); setShortOnly(false); setTab("browse"); }}>Browse all three films →</button></div> : <div className={`ds-film-results ds-view-${view}`}>
        {view === "cards" && <article className="ds-film-card">
          <img src={featured.poster} alt={`${featured.title} poster`} width={300} height={450} />
          <div className="ds-film-copy"><span className="ds-badge">{featured.category}</span><h3>{featured.title}</h3><p className="ds-caption">{featured.year} · {featured.runtime} min</p>{details && <p className="ds-synopsis">{featured.synopsis}</p>}<button type="button" className="ds-link" onClick={(event) => openFilm(featured, event.currentTarget)}>Film details →</button></div>
          <button type="button" className="ds-save-ticket" aria-pressed={saved.includes(featured.id)} onClick={() => toggleSave(featured.id)}><span>{saved.includes(featured.id) ? "✓ Saved for tonight" : "Save for tonight"}</span><span aria-hidden="true">{saved.includes(featured.id) ? "−" : "+"}</span></button>
        </article>}
        <div className="ds-film-list">{(view === "cards" ? filtered.slice(1) : filtered).map((film) => <div className="ds-film-row" key={film.id}>
          <div><button type="button" className="ds-row-title" onClick={(event) => openFilm(film, event.currentTarget)}>{film.title}</button><p className="ds-caption">{film.year} · {film.runtime} min</p>{details && <p className="ds-synopsis">{film.synopsis}</p>}</div>
          <button type="button" className="ds-icon-button" aria-label={`${saved.includes(film.id) ? "Unsave" : "Save"} ${film.title}`} aria-pressed={saved.includes(film.id)} onClick={() => toggleSave(film.id)}>{saved.includes(film.id) ? "✓" : "+"}</button>
        </div>)}<div className="ds-detail-teaser"><span className="ds-label">Detail panel</span><p>A closer look at the story.</p><button type="button" className="ds-button ds-button-secondary" onClick={(event) => openFilm(featured, event.currentTarget)}>Open film details</button></div></div>
      </div>}
    </div>
    <p className="ds-feedback" role="status">{message || "Your demo shortlist lasts until you leave or reload this page."}</p>
    <dialog className="ds-dialog" ref={dialog} aria-labelledby="ds-dialog-title" onKeyDown={keepDialogFocus} onClose={() => opener.current?.focus()}>
      <div className="ds-dialog-heading"><span className="ds-label">Film details</span><button type="button" className="ds-icon-button" aria-label="Close film details" onClick={() => dialog.current?.close()}>×</button></div>
      <h2 id="ds-dialog-title" className="ds-heading">{activeFilm.title}</h2><p className="ds-caption">{activeFilm.year} · {activeFilm.runtime} min · {activeFilm.category}</p><p className="ds-dialog-synopsis">{activeFilm.synopsis}</p><p className="ds-caption">Poster credit: {activeFilm.creditHolder}</p>
      <button type="button" className="ds-button" aria-pressed={saved.includes(activeFilm.id)} onClick={() => toggleSave(activeFilm.id)}>{saved.includes(activeFilm.id) ? "✓ Saved — remove" : "Save for tonight"}</button>
      <p className="ds-caption">Press Escape or use × to close.</p>
    </dialog>
  </>;
}
