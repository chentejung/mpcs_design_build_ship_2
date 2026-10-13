"use client";
// Pulp's drawing kit after The Mask on the American Comics board (picture 08), an illustrated one-sheet: the grin
// that fills the face from ear to ear (the Comedy pictogram), the city skyline under its palms, swept by premiere
// searchlights, at the foot of the /bijou hero and of THE END, and the billing block at the poster's foot, which
// app/system.css sets the credits as.
import { c, f, ink, useSvgId } from "./press";

// The Comedy pictogram: squeezed-shut eyes over a grin of Newsprint teeth, on Mustard.
export function GrinGlyph() {
  return (
    <g>
      <rect width="24" height="24" fill={c.mustard} />
      <path d="M5.2 7.2C6.4 5.2 8.8 5.2 10 7.2M14 7.2C15.2 5.2 17.6 5.2 18.8 7.2" fill="none" {...ink(1.5)} />
      <path d="M2.6 10C7 11.4 17 11.4 21.4 10C21 16.4 17.2 20.6 12 20.6C6.8 20.6 3 16.4 2.6 10Z" fill={c.newsprint} {...ink(1.4)} />
      <path d="M3.3 13.2C8 15 16 15 20.7 13.2M7 11V18.6M10.2 11.3V20.2M13.8 11.3V20.2M17 11V18.6" fill="none" {...ink(0.9)} />
      <path d="M1.4 9C2 9.2 2.6 9.7 3 10.3M22.6 9C22 9.2 21.4 9.7 21 10.3" fill="none" {...ink(1.2)} />
    </g>
  );
}

// A palm tree's silhouette, its trunk rising from (x, y) to a height `h`, leaning `lean`.
function Palm({ x, y, h, lean = 0.12 }: { x: number; y: number; h: number; lean?: number }) {
  const tx = x + h * lean;
  const ty = y - h;
  const frond = (a: number, l: number) => {
    const r = (a * Math.PI) / 180;
    const ex = tx + Math.cos(r) * l;
    const ey = ty + Math.sin(r) * l;
    const mx = tx + Math.cos(r) * l * 0.5;
    const my = ty + Math.sin(r) * l * 0.5 - l * 0.22;
    return `M${f(tx)} ${f(ty)}Q${f(mx)} ${f(my - l * 0.08)} ${f(ex)} ${f(ey)}Q${f(mx)} ${f(my + l * 0.12)} ${f(tx)} ${f(ty)}Z`;
  };
  return (
    <g fill={c.ink}>
      <path d={`M${f(x - h * 0.02)} ${y}Q${f(x + h * lean * 0.3)} ${f(y - h * 0.5)} ${f(tx - h * 0.012)} ${f(ty)}H${f(tx + h * 0.012)}Q${f(x + h * lean * 0.3 + h * 0.03)} ${f(y - h * 0.5)} ${f(x + h * 0.03)} ${y}Z`} />
      {[-170, -140, -105, -70, -35, -8].map((a) => <path key={a} d={frond(a, h * 0.42)} />)}
    </g>
  );
}

// The skyline along `y` from x0 to x1 against a sunset glow: towers, a few lit windows in Mustard, and palms standing
// in front.
export function Skyline({ x0, x1, y, h, seed = 3, palms = [0.08, 0.92] }: { x0: number; x1: number; y: number; h: number; seed?: number; palms?: number[] }) {
  const id = useSvgId();
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const towers: { x: number; w: number; t: number }[] = [];
  for (let x = x0; x < x1; ) {
    const w = h * (0.14 + rand() * 0.22);
    towers.push({ x, w, t: y - h * (0.25 + Math.pow(rand(), 1.6) * 0.75) });
    x += w * (0.8 + rand() * 0.25);
  }
  const windows: string[] = [];
  for (const t of towers)
    for (let wy = t.t + h * 0.06; wy < y - h * 0.08; wy += h * 0.09)
      for (let wx = t.x + t.w * 0.2; wx < t.x + t.w * 0.8; wx += t.w * 0.3)
        if (rand() < 0.22) windows.push(`M${f(wx)} ${f(wy)}h${f(h * 0.035)}v${f(h * 0.04)}h${f(-h * 0.035)}Z`);
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.red} stopOpacity="0" />
          <stop offset="0.5" stopColor={c.red} stopOpacity="0.9" />
          <stop offset="1" stopColor={c.peach} />
        </linearGradient>
      </defs>
      <rect x={x0} y={y - h * 1.25} width={x1 - x0} height={h * 1.25} fill={`url(#${id})`} />
      <path d={towers.map((t) => `M${f(t.x)} ${y}V${f(t.t)}H${f(t.x + t.w)}V${y}Z`).join("")} fill={c.ink} />
      <path d={windows.join("")} fill={c.mustard} />
      {palms.map((p, i) => <Palm key={p} x={x0 + (x1 - x0) * p} y={y} h={h * 1.15} lean={i % 2 ? -0.14 : 0.12} />)}
    </g>
  );
}

// Premiere searchlights: Newsprint beams fanning up from the skyline's foot.
export function Searchlights({ beams, y, length, spread = 7 }: { beams: [x: number, angle: number][]; y: number; length: number; spread?: number }) {
  return (
    <g fill={c.newsprint} opacity="0.2">
      {beams.map(([x, a]) => {
        const r1 = ((a - spread) * Math.PI) / 180;
        const r2 = ((a + spread) * Math.PI) / 180;
        return <path key={`${x}-${a}`} d={`M${x} ${y}L${f(x + Math.sin(r1) * length)} ${f(y - Math.cos(r1) * length)}L${f(x + Math.sin(r2) * length)} ${f(y - Math.cos(r2) * length)}Z`} />;
      })}
    </g>
  );
}
