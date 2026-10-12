// Browser behavior checks against the static export, using Firefox's W3C WebDriver.
// Requires Firefox and .local/bin/geckodriver (or GECKODRIVER=/path/to/geckodriver).
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = "http://127.0.0.1:8012";
const driverUrl = "http://127.0.0.1:4445";
const server = spawn("python3", ["-m", "http.server", "8012", "--bind", "127.0.0.1", "--directory", path.join(root, "out")], { stdio: "ignore" });
const driver = spawn(process.env.GECKODRIVER || path.join(root, ".local/bin/geckodriver"), ["--port", "4445"], { stdio: "ignore" });
let startupError;
for (const process of [server, driver]) process.on("error", (error) => { startupError = error; });
let session;
const elementKey = "element-6066-11e4-a52e-4f735466cecf";

async function until(check, description) {
  const deadline = Date.now() + 12000;
  let lastError;
  while (Date.now() < deadline) {
    if (startupError) throw startupError;
    try { if (await check()) return; } catch (error) { lastError = error; }
    await delay(100);
  }
  throw new Error(`Timed out: ${description}`, { cause: lastError });
}

async function command(method, route, body, useSession = true) {
  const response = await fetch(`${driverUrl}${useSession ? `/session/${session}` : ""}${route}`, {
    method, headers: { "Content-Type": "application/json" },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.value?.message || JSON.stringify(result));
  return result.value;
}

const elements = (using, value) => command("POST", "/elements", { using, value });
async function find(using, value) {
  let found;
  await until(async () => { found = (await elements(using, value))[0]; return found; }, value);
  return found[elementKey];
}
async function click(using, value) {
  const id = await find(using, value);
  // Position the control immediately before the native WebDriver click; the site's
  // smooth anchor scrolling otherwise races Firefox's interactability check.
  await command("POST", "/execute/sync", { script: "arguments[0].scrollIntoView({behavior: 'instant', block: 'center'})", args: [{ [elementKey]: id }] });
  await command("POST", `/element/${id}/click`, {});
}
const button = (name) => `button[aria-label=${JSON.stringify(name)}]`;
const savedLink = (count) => `a[aria-label="Saved (${count})"]`;
const open = (route) => command("POST", "/url", { url: base + route });
async function titles() {
  return Promise.all((await elements("tag name", "article")).map((item) => command("GET", `/element/${item[elementKey]}/computedlabel`)));
}
async function expectTitles(expected) {
  await until(async () => JSON.stringify(await titles()) === JSON.stringify(expected), `film titles: ${expected.join(", ")}`);
}
async function checkCredits() {
  await click("xpath", "//summary[contains(normalize-space(.), 'Poster credits')]");
  assert.equal((await elements("link text", "Source ↗")).length, 25);
}

try {
  await until(async () => (await fetch(driverUrl + "/status")).ok && (await fetch(base)).ok, "test services");
  const created = await command("POST", "/session", { capabilities: { alwaysMatch: { browserName: "firefox", "moz:firefoxOptions": { args: ["-headless"] } } } }, false);
  session = created.sessionId;
  await command("POST", "/window/rect", { width: 1400, height: 1000 });
  await open("/movies/");
  await until(async () => (await titles()).length === 25, "all 25 films");
  const allButton = await find("css selector", button("All"));
  assert.equal(await command("GET", `/element/${allButton}/attribute/aria-pressed`), "true");
  const expected = {
    Thriller: ["Parasite", "Se7en", "Gone Girl", "Rear Window"],
    Comedy: ["The Grand Budapest Hotel", "Groundhog Day", "Some Like It Hot", "Tampopo"],
    Animation: ["Spirited Away", "Toy Story", "Spider-Man: Into the Spider-Verse", "My Neighbor Totoro"],
    Action: ["Mad Max: Fury Road", "Die Hard", "Seven Samurai", "Crouching Tiger, Hidden Dragon"],
    "Sci-Fi": ["Blade Runner", "The Matrix", "Arrival"],
    Romance: ["Before Sunrise", "In the Mood for Love", "La La Land"],
    Horror: ["The Shining", "Get Out", "Ringu"],
  };
  for (const [category, names] of Object.entries(expected)) {
    await click("css selector", button(category));
    await expectTitles(names);
  }
  await click("css selector", button("All"));
  await until(async () => (await titles()).length === 25, "All restores 25 films");
  console.log("PASS: all seven category filters and All");

  await click("css selector", button("Save Parasite"));
  await find("css selector", savedLink(1));
  const savedButton = await find("css selector", button("Unsave Parasite"));
  assert.equal(await command("GET", `/element/${savedButton}/attribute/aria-pressed`), "true");
  await click("css selector", button("Unsave Parasite"));
  await find("css selector", savedLink(0));
  await click("css selector", button("Save Se7en"));
  await click("css selector", button("Save Parasite"));
  await click("css selector", savedLink(2));
  await expectTitles(["Se7en", "Parasite"]);
  await checkCredits();
  await click("css selector", button("Remove Se7en"));
  await expectTitles(["Parasite"]);
  await find("css selector", savedLink(1));
  for (let roundTrip = 0; roundTrip < 3; roundTrip++) {
    await click("partial link text", "All films");
    await find("css selector", button("Save Se7en"));
    await click("css selector", savedLink(1));
    await expectTitles(["Parasite"]);
  }
  console.log("PASS: save, unsave, save order, remove, and client-side navigation");

  await command("POST", "/refresh", {});
  await find("xpath", "//h2[normalize-space(.)='Nothing saved yet']");
  await find("css selector", savedLink(0));
  await click("partial link text", "Browse the films");
  await click("css selector", button("Save Parasite"));
  await open("/movies/saved/");
  await find("xpath", "//h2[normalize-space(.)='Nothing saved yet']");
  await find("css selector", savedLink(0));
  console.log("PASS: reload and direct navigation clear the shortlist");

  await open("/movies/");
  await checkCredits();
  await command("POST", "/window/rect", { width: 390, height: 844 });
  const fits = await command("POST", "/execute/sync", { script: "return document.documentElement.scrollWidth <= window.innerWidth", args: [] });
  assert.equal(fits, true, "phone layout must not overflow horizontally");
  await click("css selector", button("Horror"));
  await expectTitles(expected.Horror);
  console.log("PASS: credits on both pages and filtering at phone width");

  await open("/");
  await click("partial link text", "Visit the live site");
  await until(async () => (await command("GET", "/url")).endsWith("/movies/"), "landing-page link");
  console.log("PASS: landing page opens the live site");
} finally {
  if (session) await command("DELETE", "").catch(() => {});
  driver.kill();
  server.kill();
}
