// Browser behavior checks against the static export, using Firefox's W3C WebDriver.
// Requires Firefox and .local/bin/geckodriver (or GECKODRIVER=/path/to/geckodriver).
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = "http://127.0.0.1:8013";
const driverUrl = "http://127.0.0.1:4446";
const server = spawn("python3", ["-m", "http.server", "8013", "--bind", "127.0.0.1", "--directory", path.join(root, "out")], { stdio: "ignore" });
const driver = spawn(process.env.GECKODRIVER || path.join(root, ".local/bin/geckodriver"), ["--port", "4446"], { stdio: "ignore" });
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

const js = (script, args = []) => command("POST", "/execute/sync", { script, args });
const open = (route) => command("POST", "/url", { url: base + route });
const cssClick = (selector) => click("css selector", selector);
const text = (selector) => js("return document.querySelector(arguments[0])?.textContent", [selector]);
async function keys(selector, value) {
  const id = await find("css selector", selector);
  await command("POST", `/element/${id}/value`, { text: value });
}
async function checkFits(label) {
  assert.equal(await js("return document.documentElement.scrollWidth <= window.innerWidth"), true, label);
}
async function theme(selector) {
  return js(`const el = document.querySelector(arguments[0]); const style = getComputedStyle(el);
    return {font: style.fontFamily, background: style.backgroundColor,
      radius: getComputedStyle(el.querySelector('.ds-button')).borderRadius,
      accent: style.getPropertyValue('--ds-accent').trim()};`, [selector]);
}
const themes = {};
try {
  await until(async () => (await fetch(driverUrl + "/status")).ok && (await fetch(base)).ok, "test services");
  const created = await command("POST", "/session", { capabilities: { alwaysMatch: { browserName: "firefox", "moz:firefoxOptions": { args: ["-headless"] } } } }, false);
  session = created.sessionId;
  for (const system of ["clay", "grid", "soft"]) {
    await command("POST", "/window/rect", { width: 1440, height: 1000 });
    await open(`/design-systems/${system}/`);
    await find("css selector", '.ds-film-card');
    assert.equal((await elements("css selector", ".ds-section")).length, 6);
    themes[system] = await theme(".ds-page");
    await checkFits(`${system} desktop overflow`);
    const board = {clay:'japanese-retro',grid:'american-comics',soft:'chinese-retro'}[system];
    assert.equal(await js("return document.querySelector('.ds-poster-art img').getAttribute('src').includes(arguments[0])", [board]), true);
    await until(async () => await js("const img=document.querySelector('.ds-poster-art img');return img.complete && img.naturalWidth>0"), 'poster artwork loaded');
    assert.equal((await elements('css selector', '.ds-section-index a')).length, 6);
    await cssClick('.ds-section-index a[href="#components"]');
    await until(async () => await js("return Math.abs(document.querySelector('#components').getBoundingClientRect().top - parseFloat(getComputedStyle(document.querySelector('#components')).scrollMarginTop)) < 3"), 'section anchor lands below sticky index');
    // Verify rendered foreground pair contrast, independently of the page's calculator.
    const pairs = await js(`const s=getComputedStyle(document.querySelector('.ds-page'));
      const color=n=>s.getPropertyValue('--ds-'+n).trim();
      return [
        ...['background','surface'].flatMap(bg=>['text','muted','accent','secondary'].map(fg=>[color(fg),color(bg),fg+'/'+bg])),
        ...['accent','hover','pressed','secondary','success','error'].map(bg=>[color('on-accent'),color(bg),'button label/'+bg])
      ];`);
    const lum = hex => {
      const rgb = [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
      return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
    };
    for (const [fg,bg,label] of pairs) {
      const a=lum(fg), b=lum(bg);
      assert.ok((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)>=4.5, `${system} ${label}`);
    }
    // Real pointer hover must change the live control; fixed samples show the same state.
    const control = await find('css selector', '.ds-toolbar .ds-button');
    await js("arguments[0].scrollIntoView({behavior:'instant',block:'center'})", [{[elementKey]:control}]);
    const rest = await js("return getComputedStyle(document.querySelector('.ds-toolbar .ds-button')).backgroundColor");
    await command('POST','/actions',{actions:[{type:'pointer',id:'mouse',parameters:{pointerType:'mouse'},actions:[{type:'pointerMove',duration:0,origin:{[elementKey]:control},x:0,y:0}]}]});
    await until(async () => await js("return getComputedStyle(document.querySelector('.ds-toolbar .ds-button')).backgroundColor === getComputedStyle(document.querySelector('.ds-sample-hover')).backgroundColor"), 'hover matches specimen');
    assert.notEqual(await js("return getComputedStyle(document.querySelector('.ds-toolbar .ds-button')).backgroundColor"), rest);
    await command('DELETE','/actions');
    await cssClick('[role="tab"]#ds-tab-saved');
    await until(async () => (await text('#ds-film-panel')).includes('No saved films yet'), 'initial saved empty state');
    assert.equal(await js("return document.querySelector('.ds-toolbar button').disabled"), true);
    await keys('#ds-tab-saved', '\uE012'); // ArrowLeft selects Browse and moves focus.
    await until(async () => await js("return document.activeElement.id === 'ds-tab-browse' && document.activeElement.getAttribute('aria-selected') === 'true'"), 'keyboard tabs');
    await keys('input[type="search"]', 'Parasite');
    await until(async () => (await text('.ds-film-card h3')) === 'Parasite', 'search');
    await cssClick('.ds-save-ticket');
    assert.match(await text('#ds-tab-saved'), /1/);
    await cssClick('#ds-tab-saved');
    assert.equal(await text('.ds-film-card h3'), 'Parasite');
    await cssClick('.ds-save-ticket');
    await until(async () => (await text('#ds-film-panel')).includes('No saved films yet'), 'unsave removes result');
    await cssClick('.ds-toolbar .ds-button-secondary');
    await cssClick('input[type="checkbox"]');
    assert.match(await text('#ds-film-panel'), /The Grand Budapest Hotel/);
    assert.equal(await js("return document.querySelector('.ds-browse-heading > .ds-caption').textContent"), '1 film');
    await cssClick('input[type="checkbox"]');
    await cssClick('[role="switch"]');
    assert.equal((await elements('css selector', '#ds-film-panel .ds-synopsis')).length, 0);
    await cssClick('input[value="list"]');
    assert.equal((await elements('css selector', '.ds-film-card')).length, 0);
    assert.equal((await elements('css selector', '.ds-film-row')).length, 3);
    await cssClick('.ds-chips button:last-child');
    assert.equal((await elements('css selector', '.ds-film-row')).length, 1);
    assert.match(await text('.ds-film-row'), /Spirited Away/);
    await cssClick('.ds-toolbar .ds-button-secondary');
    await keys('select', '\uE015\uE007'); // ArrowDown + Enter: newest first.
    await until(async () => (await text('.ds-film-row .ds-row-title')) === 'Parasite', 'sort newest');
    await cssClick('.ds-film-row .ds-row-title');
    await until(async () => await js("return document.querySelector('dialog').open && document.querySelector('dialog').contains(document.activeElement)"), 'modal focus');
    assert.equal(await text('#ds-dialog-title'), 'Parasite');
    // Tab from the last modal control returns to Close.
    await cssClick('.ds-dialog .ds-button');
    await keys('.ds-dialog .ds-button', '\uE004');
    assert.equal(await js("return document.activeElement.getAttribute('aria-label')"), 'Close film details');
    await keys('.ds-dialog .ds-icon-button', '\uE00C'); // Escape.
    await until(async () => await js("return !document.querySelector('dialog').open && document.activeElement.matches('.ds-row-title')"), 'modal closes and restores focus');
    await keys('input[type="search"]', 'no-such-film');
    await until(async () => (await text('#ds-film-panel')).includes('No matching films'), 'search empty state');
    assert.equal(await js("return document.querySelector('.ds-toolbar button').disabled"), true);
    await cssClick('.ds-toolbar .ds-button-secondary');
    for (const width of [390, 320]) {
      await command("POST", "/window/rect", { width, height: 844 });
      await checkFits(`${system} ${width}px overflow`);
      await cssClick('.ds-detail-teaser button');
      assert.equal(await js("const r=document.querySelector('dialog').getBoundingClientRect();return r.left>=0 && r.right<=innerWidth"), true);
      await cssClick('[aria-label="Close film details"]');
    }
    await command("POST", "/refresh", {});
    await until(async () => (await text('#ds-tab-saved')) === 'Saved (0)', 'reload clears demo');
    console.log(`PASS: ${system} sections, contrast, filters, save/unsave, keyboard tabs, modal focus, mobile widths, reload`);
  }
  assert.notEqual(themes.clay.font, themes.grid.font);
  assert.notEqual(themes.grid.font, themes.soft.font);
  assert.equal(themes.clay.radius, '0px');
  assert.equal(themes.grid.radius, '0px');
  assert.equal(themes.soft.radius, '24px');
  await open('/');
  for (const system of ["clay", "grid", "soft"]) {
    assert.deepEqual(await theme(`.ds-preview[data-system="${system}"]`), themes[system], `${system} landing preview consistency`);
  }
  console.log('PASS: distinct themes and matching landing previews');
} finally {
  if (session) await command("DELETE", "").catch(() => {});
  driver.kill();
  server.kill();
}
