// Eigakan behavior, as a visitor sees it: elements are found by role and accessible name only.
import { expect, test, type Page } from "@playwright/test";

const byCategory: Record<string, string[]> = {
  Thriller: ["Parasite", "Se7en", "Gone Girl", "Rear Window"],
  Comedy: ["The Grand Budapest Hotel", "Groundhog Day", "Some Like It Hot", "Tampopo"],
  Animation: ["Spirited Away", "Toy Story", "Spider-Man: Into the Spider-Verse", "My Neighbor Totoro"],
  Action: ["Mad Max: Fury Road", "Die Hard", "Seven Samurai", "Crouching Tiger, Hidden Dragon"],
  "Sci-Fi": ["Blade Runner", "The Matrix", "Arrival"],
  Romance: ["Before Sunrise", "In the Mood for Love", "La La Land"],
  Horror: ["The Shining", "Get Out", "Ringu"],
};

const movies = (page: Page) => page.getByRole("region", { name: "Film collection" }).getByRole("article");
const savedMovies = (page: Page) => page.getByRole("region", { name: "Saved films", exact: true }).getByRole("article");
const filter = (page: Page, name: string) => page.getByRole("group", { name: "Movie categories" }).getByRole("button", { name, exact: true });
const save = (page: Page, title: string) => page.getByRole("button", { name: new RegExp(`^(?:Save|Unsave) ${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) });
const savedLink = (page: Page, n: number) => page.getByRole("link", { name: `Saved (${n})`, exact: true });

// Wait for the page to finish loading its scripts so clicks reach the hydrated app.
async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
}

test.beforeEach(async ({ page }) => open(page, "/movies/"));

test("opens on all 25 movies with All selected", async ({ page }) => {
  await expect(movies(page)).toHaveCount(25);
  await expect(filter(page, "All")).toHaveAttribute("aria-pressed", "true");
  await expect(savedLink(page, 0)).toBeVisible();
});

test("each category shows only its films, and All restores the full list", async ({ page }) => {
  for (const [label, titles] of Object.entries(byCategory)) {
    await filter(page, label).click();
    await expect(filter(page, label)).toHaveAttribute("aria-pressed", "true");
    await expect(filter(page, "All")).toHaveAttribute("aria-pressed", "false");
    await expect(movies(page).getByRole("heading")).toHaveText(titles);
  }
  await filter(page, "All").click();
  await expect(movies(page)).toHaveCount(25);
});

test("Save toggles the film and updates the header count", async ({ page }) => {
  await save(page, "Parasite").click();
  await expect(save(page, "Parasite")).toHaveAttribute("aria-pressed", "true");
  await expect(savedLink(page, 1)).toBeVisible();

  await save(page, "Arrival").click();
  await expect(savedLink(page, 2)).toBeVisible();

  await save(page, "Parasite").click();
  await expect(save(page, "Parasite")).toHaveAttribute("aria-pressed", "false");
  await expect(savedLink(page, 1)).toBeVisible();
});

test("saved page lists films in save order, and Remove takes one off", async ({ page }) => {
  for (const title of ["Toy Story", "Ringu", "Die Hard"]) await save(page, title).click();
  await savedLink(page, 3).click();
  await expect(page).toHaveURL(/\/movies\/saved\/$/);
  await expect(savedMovies(page).getByRole("heading")).toHaveText(["Toy Story", "Ringu", "Die Hard"]);

  await page.getByRole("button", { name: "Remove Ringu" }).click();
  await expect(savedMovies(page).getByRole("heading")).toHaveText(["Toy Story", "Die Hard"]);
  await expect(savedLink(page, 2)).toBeVisible();

  await page.getByRole("link", { name: "← Back to all films" }).click();
  await expect(save(page, "Ringu")).toHaveAttribute("aria-pressed", "false");
  await expect(save(page, "Toy Story")).toHaveAttribute("aria-pressed", "true");
});

const nativeTitles: Record<string, string> = {
  Tampopo: "タンポポ",
  "Spirited Away": "千と千尋の神隠し",
  "My Neighbor Totoro": "となりのトトロ",
  "Seven Samurai": "七人の侍",
  Ringu: "リング",
  Parasite: "기생충",
  "In the Mood for Love": "花樣年華",
  "Crouching Tiger, Hidden Dragon": "臥虎藏龍",
};

test("cards show each film's Native Title where it has one", async ({ page }) => {
  for (const [title, native] of Object.entries(nativeTitles)) {
    const card = movies(page).filter({ has: page.getByRole("heading", { name: title, exact: true }) });
    await expect(card.getByText(native, { exact: true })).toBeVisible();
  }
});

test("the saved page totals the saved films' running time", async ({ page }) => {
  await save(page, "Parasite").click(); // 2h 12m
  await save(page, "Seven Samurai").click(); // 3h 27m
  await savedLink(page, 2).click();
  await expect(page.getByText("2 films · 5h 39m")).toBeVisible();

  await page.getByRole("button", { name: "Remove Seven Samurai" }).click();
  await expect(page.getByText("1 film · 2h 12m")).toBeVisible();
});

test("the saved list survives clicking back and forth between the pages", async ({ page }) => {
  await save(page, "Arrival").click();
  for (let i = 0; i < 3; i++) {
    await savedLink(page, 1).click();
    await expect(savedMovies(page).getByRole("heading")).toHaveText(["Arrival"]);
    await page.getByRole("link", { name: "Eigakan 映画館 — All films" }).click();
    await expect(save(page, "Arrival")).toHaveAttribute("aria-pressed", "true");
  }
});

test("a reload or a typed URL starts with an empty list", async ({ page }) => {
  await save(page, "Arrival").click();
  await expect(savedLink(page, 1)).toBeVisible();
  await page.reload({ waitUntil: "networkidle" });
  await expect(savedLink(page, 0)).toBeVisible();
  await expect(save(page, "Arrival")).toHaveAttribute("aria-pressed", "false");

  await save(page, "Arrival").click();
  await open(page, "/movies/saved/");
  await expect(page.getByText("Nothing saved yet")).toBeVisible();
  await page.getByRole("link", { name: "Browse the films" }).click();
  await expect(movies(page)).toHaveCount(25);
});

test("poster credits list every film on both pages", async ({ page }) => {
  for (const path of ["/movies/", "/movies/saved/"]) {
    await open(page, path);
    await page.getByText("Poster credits & sources", { exact: false }).click();
    await expect(page.getByText("Posters used for a non-commercial class mock-up.", { exact: false })).toBeVisible();
    const credits = page.getByRole("group").filter({ has: page.getByText("Poster credits & sources", { exact: false }) });
    await expect(credits.getByRole("listitem")).toHaveCount(25);
    await expect(credits.getByRole("link", { name: "Source ↗", exact: true }).first()).toHaveAttribute("href", /^https:\/\/en\.wikipedia\.org\/wiki\//);
  }
});

test("the landing page's Final Site card opens the movie site", async ({ page }) => {
  await open(page, "/");
  await page.getByRole("link", { name: "Visit the live site →" }).click();
  await expect(page).toHaveURL(/\/movies\/$/);
  await expect(movies(page)).toHaveCount(25);
});
