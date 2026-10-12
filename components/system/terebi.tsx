// Shōwa's drawing kit after the Color TV Ad on the Japanese Retro board (picture 25), a 1960s magazine ad: a headline
// in 天然色 ("natural color"), each character in its own ink. app/system.css draws radios as the set's knobs (つまみ).

// 天然色: the first three characters of a word take Hinomaru, Ai and Kogecha (app/system.css); any after stay Sumi,
// as テレビ does after 天然色 in the ad. Other systems leave the inks alone.
export function Tenneniro({ text }: { text: string }) {
  return <>{[...text].map((ch, i) => <span key={i} className="ds-ink" data-ink={i < 3 ? i + 1 : undefined}>{ch}</span>)}</>;
}
