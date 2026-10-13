// Phone layouts: nothing scrolls sideways and nothing runs into anything else, from the smallest phones up.
import { expect, test, type Locator, type Page } from "@playwright/test";

const pages = [
  "/", "/bijou/", "/bijou/saved/",
  "/design-systems/showa/", "/design-systems/pulp/", "/design-systems/haipai/",
  "/moodboards/japanese-retro/", "/moodboards/american-comics/", "/moodboards/chinese-retro/",
];
const widths = [320, 360, 390];

// Viewport sizes are set per test, so run them once, on the phone project.
test.beforeEach(({}, info) => test.skip(info.project.name !== "phone", "phone layouts"));

const box = async (l: Locator) => (await l.boundingBox())!;
const apart = (a: { x: number; y: number; width: number; height: number }, b: typeof a) =>
  a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y;

async function open(page: Page, path: string, width: number) {
  await page.setViewportSize({ width, height: 800 });
  await page.goto(path, { waitUntil: "networkidle" });
}

for (const width of widths) {
  test(`no page scrolls sideways at ${width}px`, async ({ page }) => {
    for (const path of pages) {
      await open(page, path, width);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, `${path} is ${scrollWidth}px wide`).toBeLessThanOrEqual(width);
    }
  });

  test(`the header's brand and Saved link stay apart at ${width}px`, async ({ page }) => {
    await open(page, "/bijou/", width);
    const brand = await box(page.getByRole("link", { name: "The Bijou" }));
    const saved = await box(page.getByRole("link", { name: "Saved (0)" }));
    expect(apart(brand, saved)).toBe(true);
    expect(saved.x + saved.width).toBeLessThanOrEqual(width);
  });

  test(`film cards keep title, synopsis and Save apart at ${width}px`, async ({ page }) => {
    await open(page, "/bijou/", width);
    for (const card of (await page.getByRole("list", { name: "Movies" }).getByRole("listitem").all()).slice(0, 6)) {
      const title = await box(card.getByRole("heading"));
      const synopsis = await box(card.locator(".ds-card-synopsis"));
      const save = await box(card.getByRole("button"));
      expect(title.y + title.height).toBeLessThanOrEqual(synopsis.y);
      expect(synopsis.y + synopsis.height).toBeLessThanOrEqual(save.y);
    }
  });
}

test("filter chips all wrap into view on a phone and every one can be reached", async ({ page }) => {
  await open(page, "/bijou/", 320);
  const chips = page.getByRole("group", { name: "Filter by category" }).getByRole("button");
  for (const chip of await chips.all()) {
    const b = await box(chip);
    expect(b.x).toBeGreaterThanOrEqual(0);
    expect(b.x + b.width).toBeLessThanOrEqual(320);
  }
  const horror = page.getByRole("group", { name: "Filter by category" }).getByRole("button", { name: "Horror", exact: true });
  await horror.click();
  await expect(horror).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("list", { name: "Movies" }).getByRole("listitem")).toHaveCount(3);
});

test("the Bijou's screening lines appear only above phone width", async ({ page }) => {
  const eyebrow = page.getByText("Now showing · Tonight only");
  const banner = page.getByText("25 features! 7 genres! One night only!");

  await open(page, "/bijou/", 390);
  await expect(eyebrow).toBeHidden();
  await expect(banner).toBeHidden();

  await open(page, "/bijou/", 640);
  await expect(eyebrow).toBeVisible();
  await expect(banner).toBeVisible();
});
