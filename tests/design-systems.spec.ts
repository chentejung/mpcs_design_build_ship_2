// Design System pages, as a visitor reaches them from the landing page.
import { expect, test } from "@playwright/test";

const sections = ["Color roles", "Type roles", "Spacing and shape", "Texture and motif", "Components", "Control states", "UI states", "Applied"];
const systems = [
  { name: "Shōwa", path: "/design-systems/showa/" },
  { name: "Ben-Day", path: "/design-systems/ben-day/" },
  { name: "Haipai", path: "/design-systems/haipai/" },
];

test("each retained component-study link opens a page with all eight sections", async ({ page }) => {
  for (const s of systems) {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("navigation", { name: "Component studies" }).getByRole("link", { name: s.name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${s.path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText(s.name);
    for (const name of sections) await expect(page.getByRole("heading", { level: 2, name, exact: true })).toBeVisible();
  }
});
