import { films, type NativeTitle } from "@/app/films";

export const categories = ["Thriller", "Comedy", "Animation", "Action", "Science Fiction", "Romance", "Horror"] as const;
export type Category = (typeof categories)[number];

export type Movie = {
  id: string;
  title: string;
  year: number;
  runtime: number;
  category: Category;
  synopsis: string;
  poster: string;
  creditHolder: string;
  source: string;
  native?: NativeTitle;
};

const wikipedia = (slug: string) => `https://en.wikipedia.org/wiki/${slug}`;

const movieEntries: Movie[] = [
  { id: "parasite", title: "Parasite", year: 2019, runtime: 132, category: "Thriller", synopsis: "A cash-strapped family finds an elegant way into a wealthy household.", poster: "/movies/posters/parasite.jpg", creditHolder: "CJ Entertainment", source: wikipedia("Parasite_(2019_film)") },
  { id: "se7en", title: "Se7en", year: 1995, runtime: 127, category: "Thriller", synopsis: "Two detectives track a killer who stages murders around the seven deadly sins.", poster: "/movies/posters/se7en.jpg", creditHolder: "New Line Cinema", source: wikipedia("Se7en") },
  { id: "gone-girl", title: "Gone Girl", year: 2014, runtime: 149, category: "Thriller", synopsis: "A disappearance turns a marriage into a national spectacle and a maze of clues.", poster: "/movies/posters/gone-girl.jpg", creditHolder: "20th Century Fox", source: wikipedia("Gone_Girl_(film)") },
  { id: "rear-window", title: "Rear Window", year: 1954, runtime: 112, category: "Thriller", synopsis: "A photographer confined to his apartment becomes convinced he witnessed a murder.", poster: "/movies/posters/rear-window.jpg", creditHolder: "Paramount Pictures", source: wikipedia("Rear_Window") },
  { id: "grand-budapest", title: "The Grand Budapest Hotel", year: 2014, runtime: 100, category: "Comedy", synopsis: "A lobby boy and his mentor race through a fanciful Europe with a priceless painting.", poster: "/movies/posters/grand-budapest.jpg", creditHolder: "Fox Searchlight Pictures", source: wikipedia("The_Grand_Budapest_Hotel") },
  { id: "groundhog-day", title: "Groundhog Day", year: 1993, runtime: 101, category: "Comedy", synopsis: "A cynical weatherman is forced to relive the same small-town day until he changes.", poster: "/movies/posters/groundhog-day.jpg", creditHolder: "Columbia Pictures", source: wikipedia("Groundhog_Day_(film)") },
  { id: "some-like-it-hot", title: "Some Like It Hot", year: 1959, runtime: 121, category: "Comedy", synopsis: "Two musicians disguise themselves in an all-female band to escape the mob.", poster: "/movies/posters/some-like-it-hot.jpg", creditHolder: "United Artists", source: wikipedia("Some_Like_It_Hot") },
  { id: "tampopo", title: "Tampopo", year: 1985, runtime: 114, category: "Comedy", synopsis: "A ramen shop owner learns the craft of the perfect bowl from a mysterious drifter.", poster: "/movies/posters/tampopo.jpg", creditHolder: "Itami Productions", source: wikipedia("Tampopo") },
  { id: "spirited-away", title: "Spirited Away", year: 2001, runtime: 125, category: "Animation", synopsis: "A young girl enters a spirit world and must find courage to free her parents.", poster: "/movies/posters/spirited-away.jpg", creditHolder: "Studio Ghibli", source: wikipedia("Spirited_Away") },
  { id: "toy-story", title: "Toy Story", year: 1995, runtime: 81, category: "Animation", synopsis: "A cowboy doll and a space ranger discover that friendship matters more than being first.", poster: "/movies/posters/toy-story.jpg", creditHolder: "Pixar Animation Studios", source: wikipedia("Toy_Story") },
  { id: "spider-verse", title: "Spider-Man: Into the Spider-Verse", year: 2018, runtime: 117, category: "Animation", synopsis: "Miles Morales meets a whole web of Spider-People and grows into his own hero.", poster: "/movies/posters/spider-verse.jpg", creditHolder: "Sony Pictures Animation", source: wikipedia("Spider-Man:_Into_the_Spider-Verse") },
  { id: "totoro", title: "My Neighbor Totoro", year: 1988, runtime: 86, category: "Animation", synopsis: "Two sisters discover a gentle forest spirit while their mother recovers in hospital.", poster: "/movies/posters/totoro.jpg", creditHolder: "Studio Ghibli", source: wikipedia("My_Neighbor_Totoro") },
  { id: "fury-road", title: "Mad Max: Fury Road", year: 2015, runtime: 120, category: "Action", synopsis: "A fugitive convoy tears across the wasteland while a war rig driver leads the escape.", poster: "/movies/posters/fury-road.jpg", creditHolder: "Warner Bros. Pictures", source: wikipedia("Mad_Max:_Fury_Road") },
  { id: "die-hard", title: "Die Hard", year: 1988, runtime: 132, category: "Action", synopsis: "A New York cop battles terrorists from inside a Los Angeles tower on Christmas Eve.", poster: "/movies/posters/die-hard.jpg", creditHolder: "20th Century Fox", source: wikipedia("Die_Hard") },
  { id: "seven-samurai", title: "Seven Samurai", year: 1954, runtime: 207, category: "Action", synopsis: "A village hires seven masterless samurai to defend it from a bandit raid.", poster: "/movies/posters/seven-samurai.jpg", creditHolder: "Toho", source: wikipedia("Seven_Samurai") },
  { id: "crouching-tiger", title: "Crouching Tiger, Hidden Dragon", year: 2000, runtime: 120, category: "Action", synopsis: "Two legendary warriors chase a stolen sword through a world of impossible grace.", poster: "/movies/posters/crouching-tiger.jpg", creditHolder: "Sony Pictures Classics", source: wikipedia("Crouching_Tiger,_Hidden_Dragon") },
  { id: "blade-runner", title: "Blade Runner", year: 1982, runtime: 117, category: "Science Fiction", synopsis: "A weary detective hunts synthetic humans in a rain-soaked future Los Angeles.", poster: "/movies/posters/blade-runner.jpg", creditHolder: "Warner Bros. Pictures", source: wikipedia("Blade_Runner") },
  { id: "the-matrix", title: "The Matrix", year: 1999, runtime: 136, category: "Science Fiction", synopsis: "A programmer discovers reality is a system and joins the fight to wake humanity.", poster: "/movies/posters/the-matrix.jpg", creditHolder: "Warner Bros. Pictures", source: wikipedia("The_Matrix") },
  { id: "arrival", title: "Arrival", year: 2016, runtime: 116, category: "Science Fiction", synopsis: "A linguist tries to communicate with visitors before fear turns first contact into war.", poster: "/movies/posters/arrival.jpg", creditHolder: "Paramount Pictures", source: wikipedia("Arrival_(film)") },
  { id: "before-sunrise", title: "Before Sunrise", year: 1995, runtime: 101, category: "Romance", synopsis: "Two strangers leave a train in Vienna and spend one unforgettable night walking and talking.", poster: "/movies/posters/before-sunrise.jpg", creditHolder: "Columbia Pictures", source: wikipedia("Before_Sunrise") },
  { id: "in-the-mood-for-love", title: "In the Mood for Love", year: 2000, runtime: 98, category: "Romance", synopsis: "Two neighbors form a tender bond while trying not to repeat their spouses' betrayal.", poster: "/movies/posters/in-the-mood-for-love.jpg", creditHolder: "Jet Tone Films", source: wikipedia("In_the_Mood_for_Love") },
  { id: "la-la-land", title: "La La Land", year: 2016, runtime: 128, category: "Romance", synopsis: "A musician and an actor fall in love while chasing their separate Los Angeles dreams.", poster: "/movies/posters/la-la-land.jpg", creditHolder: "Lionsgate", source: wikipedia("La_La_Land") },
  { id: "the-shining", title: "The Shining", year: 1980, runtime: 146, category: "Horror", synopsis: "A winter caretaker brings his family to an isolated hotel where the past refuses to stay buried.", poster: "/movies/posters/the-shining.jpg", creditHolder: "Warner Bros. Pictures", source: wikipedia("The_Shining_(film)") },
  { id: "get-out", title: "Get Out", year: 2017, runtime: 104, category: "Horror", synopsis: "A weekend visit with his girlfriend's family becomes a terrifying trap.", poster: "/movies/posters/get-out.jpg", creditHolder: "Universal Pictures", source: wikipedia("Get_Out") },
  { id: "ringu", title: "Ringu", year: 1998, runtime: 96, category: "Horror", synopsis: "A reporter investigates a cursed videotape before its seven-day deadline arrives.", poster: "/movies/posters/ringu.jpg", creditHolder: "Toho", source: wikipedia("Ring_(film)") },
];

// Match by title because the reviewed iteration uses shorter identifiers for some films.
const nativeByTitle = new Map(films.map((film) => [film.title, film.native]));
export const movies: Movie[] = movieEntries.map((movie) => ({ ...movie, native: nativeByTitle.get(movie.title) }));

export const movieById = new Map(movies.map((movie) => [movie.id, movie]));
