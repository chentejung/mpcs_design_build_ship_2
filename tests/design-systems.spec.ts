// Design System pages, as a visitor reaches them from the landing page.
import { expect, test } from "@playwright/test";

const sections = ["Color roles", "Type roles", "Spacing and shape", "Texture and motif", "Components", "Control states", "UI states", "Applied"];
const systems = [
  { name: "Shōwa", path: "/design-systems/showa/" },
  { name: "Pulp", path: "/design-systems/pulp/" },
  { name: "Haipai", path: "/design-systems/haipai/" },
];

test("each View system link on the landing page opens a page with all eight sections", async ({ page }) => {
  for (const s of systems) {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("article").filter({ hasText: s.name }).getByRole("link", { name: "View system" }).click();
    await expect(page).toHaveURL(new RegExp(`${s.path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText(s.name);
    for (const name of sections) await expect(page.getByRole("heading", { level: 2, name, exact: true })).toBeVisible();
  }
});
