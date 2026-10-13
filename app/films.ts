// The Bijou's film list: the single source for /bijou and /bijou/saved.
// Posters were downloaded once from each film's English Wikipedia article and resized to 300×450;
// the site only loads the local copies. `credit` names the poster's copyright holder (the distributor,
// as Wikipedia attributes it; two are now public domain) and links the Wikipedia file page it came from.
import { slug } from "./boards";

export const categories = [
  { id: "thriller", label: "Thriller" },
  { id: "comedy", label: "Comedy" },
  { id: "animation", label: "Animation" },
  { id: "action", label: "Action" },
  { id: "science-fiction", label: "Sci-Fi" },
  { id: "romance", label: "Romance" },
  { id: "horror", label: "Horror" },
] as const;

export type Category = (typeof categories)[number]["id"];

export type Film = {
  id: string;
  title: string;
  year: number;
  runtime: number; // minutes
  category: Category;
  synopsis: string;
  poster: string; // path under public/
  credit: { holder: string; source: string; publicDomain?: boolean };
  native?: NativeTitle;
};

// A film's title in its original language and script; `lang` lets screen readers and fonts treat it correctly.
export type NativeTitle = { title: string; lang: "ja" | "ko" | "zh-Hant" };

const nativeTitles: Record<string, NativeTitle> = {
  tampopo: { title: "タンポポ", lang: "ja" },
  "spirited-away": { title: "千と千尋の神隠し", lang: "ja" },
  "my-neighbor-totoro": { title: "となりのトトロ", lang: "ja" },
  "seven-samurai": { title: "七人の侍", lang: "ja" },
  ringu: { title: "リング", lang: "ja" },
  parasite: { title: "기생충", lang: "ko" },
  "in-the-mood-for-love": { title: "花樣年華", lang: "zh-Hant" },
  "crouching-tiger-hidden-dragon": { title: "臥虎藏龍", lang: "zh-Hant" },
};

const wiki = (file: string, host = "en.wikipedia.org") => `https://${host}/wiki/File:${file}`;
const commons = (file: string) => wiki(file, "commons.wikimedia.org");

function film(title: string, year: number, runtime: number, category: Category, synopsis: string, holder: string, source: string, publicDomain = false): Film {
  const id = slug(title);
  return { id, title, year, runtime, category, synopsis, poster: `/movies/posters/${id}.jpg`, credit: { holder, source, publicDomain }, native: nativeTitles[id] };
}

export const films: Film[] = [
  film("Parasite", 2019, 132, "thriller", "A broke family cons its way into a wealthy household, one fake résumé at a time.", "CJ Entertainment", wiki("Parasite_(2019_film).png")),
  film("Se7en", 1995, 127, "thriller", "Two detectives hunt a killer who stages each murder as one of the seven deadly sins.", "New Line Cinema", wiki("Seven_(movie)_poster.jpg")),
  film("Gone Girl", 2014, 149, "thriller", "When his wife vanishes on their anniversary, a husband becomes the prime suspect.", "20th Century Fox", wiki("Gone_Girl_Poster.jpg")),
  film("Rear Window", 1954, 112, "thriller", "Laid up with a broken leg, a photographer becomes convinced a neighbor committed murder.", "Paramount Pictures", commons("Rear_Window_film_poster.jpg"), true),

  film("The Grand Budapest Hotel", 2014, 100, "comedy", "A legendary concierge and his lobby boy are framed for murder over a priceless painting.", "Fox Searchlight Pictures", wiki("The_Grand_Budapest_Hotel.png")),
  film("Groundhog Day", 1993, 101, "comedy", "A cynical weatherman wakes up to the same small-town day, again and again.", "Columbia Pictures", wiki("Groundhog_Day_(movie_poster).jpg")),
  film("Some Like It Hot", 1959, 121, "comedy", "Two musicians on the run from the mob hide out in an all-women band.", "United Artists", commons("Some_Like_It_Hot_(1959_poster).png"), true),
  film("Tampopo", 1985, 115, "comedy", "A truck driver helps a widow turn her struggling noodle shop into a ramen legend.", "Toho", wiki("Tampopo_-_Poster.jpg")),

  film("Spirited Away", 2001, 124, "animation", "A girl works in a bathhouse for spirits to free her parents from a witch's spell.", "Toho", wiki("Spirited_Away_Japanese_poster.png")),
  film("Toy Story", 1995, 81, "animation", "A cowboy doll feels upstaged when a flashy space-ranger toy moves into his kid's room.", "Buena Vista Pictures (Disney)", wiki("Toy_Story.jpg")),
  film("Spider-Man: Into the Spider-Verse", 2018, 117, "animation", "Brooklyn teen Miles Morales teams up with Spider-People from other dimensions.", "Sony Pictures Releasing", wiki("Spider-Man_Into_the_Spider-Verse_poster.png")),
  film("My Neighbor Totoro", 1988, 86, "animation", "Two sisters in the countryside befriend the gentle forest spirits next door.", "Toho", wiki("My_Neighbor_Totoro_-_Tonari_no_Totoro_(Movie_Poster).jpg")),

  film("Mad Max: Fury Road", 2015, 120, "action", "A rebel warrior and a drifter flee a desert tyrant in a war rig full of escaped captives.", "Warner Bros. Pictures", wiki("Mad_Max_Fury_Road.jpg")),
  film("Die Hard", 1988, 132, "action", "An off-duty cop takes on the gang that seizes a Los Angeles tower on Christmas Eve.", "20th Century Fox", wiki("Die_Hard_(1988_film)_poster.jpg")),
  film("Seven Samurai", 1954, 207, "action", "A village of farmers hires seven masterless samurai to defend it from bandits.", "Toho", wiki("Seven_Samurai_Poster.png")),
  film("Crouching Tiger, Hidden Dragon", 2000, 120, "action", "A stolen sword pulls two warriors and a young noblewoman into a duel of loyalties.", "Columbia TriStar (Sony Pictures)", wiki("Crouching_Tiger,_Hidden_Dragon_(Chinese_poster).png")),

  film("Blade Runner", 1982, 117, "science-fiction", "In a rain-soaked future Los Angeles, a burned-out cop hunts four escaped replicants.", "Warner Bros.", wiki("Blade_Runner_(1982_poster).png")),
  film("The Matrix", 1999, 136, "science-fiction", "A hacker learns reality is a simulation and joins the fight against its machine masters.", "Warner Bros.", wiki("The_Matrix.png")),
  film("Arrival", 2016, 116, "science-fiction", "A linguist races to talk with mysterious visitors before the world goes to war.", "Paramount Pictures", wiki("Arrival,_Movie_Poster.jpg")),

  film("Before Sunrise", 1995, 101, "romance", "Two strangers meet on a train and spend one night walking and talking through Vienna.", "Columbia Pictures", wiki("Before_Sunrise_poster.jpg")),
  film("In the Mood for Love", 2000, 98, "romance", "In 1962 Hong Kong, two neighbors discover their spouses are having an affair.", "Block 2 Pictures", wiki("In_the_Mood_for_Love_movie.jpg")),
  film("La La Land", 2016, 128, "romance", "A jazz pianist and an aspiring actress fall in love while chasing their dreams in LA.", "Lionsgate", wiki("La_La_Land_(film).png")),

  film("The Shining", 1980, 144, "horror", "A writer takes his family to winter in an empty mountain hotel, and it takes hold of him.", "Warner Bros.", wiki("The_Shining_(1980)_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg")),
  film("Get Out", 2017, 104, "horror", "A young Black man's weekend with his white girlfriend's family turns sinister.", "Universal Pictures", wiki("Get_Out_poster.png")),
  film("Ringu", 1998, 95, "horror", "A reporter races to break the curse of a videotape that kills viewers seven days later.", "Toho", wiki("Ringu_(1998)_Japanese_theatrical_poster.jpg")),
];

export const filmById = Object.fromEntries(films.map((f) => [f.id, f])) as Record<string, Film>;
export const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<Category, string>;

export const formatRuntime = (min: number) => `${Math.floor(min / 60)}h ${min % 60}m`;
