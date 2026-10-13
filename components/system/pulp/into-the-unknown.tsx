"use client";
// Pulp's drawing kit after Adventures into the Unknown! on the American Comics board (picture 29): the clawed hand
// reaching up out of the dark, dripping (the Horror pictogram), on the cover's Hero Red, and the curling scroll
// banner the cover pins its blurb on, which carries the /bijou hero's "featuring" line.
import { c, f, ink, poster, Screen, useSvgId } from "./press";

// The Horror pictogram: the claw, Sepia and Peach, its nails Newsprint, rising on Hero Red.
export function ClawGlyph() {
  const id = useSvgId();
  const fingers = ["M10.2 16C9.6 12.4 8.6 9.6 6.6 7", "M12.4 15.4C12.4 11.2 12.6 8.2 13.2 5", "M14.6 16C15.6 12.6 16.8 10.2 18.8 8", "M15.8 18.4C17.6 16.8 19.2 15.6 21.4 15"];
  const nails: [number, number, number][] = [[6.6, 7, -112], [13.2, 5, -86], [18.8, 8, -62], [21.4, 15, -31]]; // each fingertip, and its heading
  return (
    <g>
      <defs><Screen id={id} color={c.ink} r={0.45} gap={2} angle={45} /></defs>
      <rect width="24" height="24" fill={c.red} />
      <rect width="24" height="24" fill={`url(#${id})`} opacity="0.35" />
      <g fill="none" strokeLinecap="round">
        {fingers.map((d) => <path key={d} d={d} stroke={c.ink} strokeWidth="3.6" />)}
        <path d="M9.4 19.4C7.6 18.6 5.6 17.2 3.6 15.4" stroke={c.ink} strokeWidth="3.6" />
      </g>
      <path d="M8.2 25C7.8 20.4 8.6 16.6 12.2 15.6C15.6 15.2 17 18 16.4 25Z" fill={c.sepia} {...ink(1.2)} />
      <g fill="none" strokeLinecap="round">
        {fingers.map((d) => <path key={d} d={d} stroke={c.sepia} strokeWidth="2" />)}
        <path d="M9.4 19.4C7.6 18.6 5.6 17.2 3.6 15.4" stroke={c.sepia} strokeWidth="2" />
        <path d="M11.4 19.8C12.4 19 13.6 18.8 14.6 19.4" stroke={c.peach} strokeWidth="1" />
      </g>
      {nails.map(([x, y, a]) => (
        <path key={`${x}`} d={`M${f(x - 0.4)} ${f(y - 1)}l3.2 1l-3.2 1Z`} transform={`rotate(${a} ${x} ${y})`} fill={c.newsprint} {...ink(0.6)} />
      ))}
      <path d="M9.6 21.6V23.6M14.8 21.2V24" stroke={c.mustard} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

// The scroll banner across (x, y) to (x + w, y), curling at both ends, with its blurb set on it.
export function Scroll({ x, y, w, h, text, size }: { x: number; y: number; w: number; h: number; text: string; size: number }) {
  const curl = h * 0.42;
  return (
    <g>
      <path d={`M${x} ${y + curl}h${curl}v${h}h${-curl}l${curl * 0.5} ${-h / 2}Z`} fill={c.sepia} {...ink(1.8)} />
      <path d={`M${x + w} ${y + curl}h${-curl}v${h}h${curl}l${-curl * 0.5} ${-h / 2}Z`} fill={c.sepia} {...ink(1.8)} />
      <path d={`M${x + curl * 0.7} ${y}H${x + w - curl * 0.7}V${y + h}H${x + curl * 0.7}Z`} fill={c.newsprint} {...ink(1.8)} />
      <text x={x + w / 2} y={y + h / 2} dy="0.36em" textAnchor="middle" fontSize={size} fill={c.ink} style={poster} letterSpacing={size * 0.04}>{text}</text>
    </g>
  );
}
