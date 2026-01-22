export type WatchlistItemBase = {
  id: string;
  tmdb_id: string;
  user_id: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  date_added: string;
};

export type WatchlistItemNotSeen = WatchlistItemBase & {
  status: "watchlist";
};

export type WatchlistItemSeen = WatchlistItemBase & {
  status: "watched";

  personal_rating: number;
  date_watched: string;
  is_favorite: boolean;
  review: string;
};

export type WatchlistItem = WatchlistItemSeen | WatchlistItemNotSeen;

export type WatchlistCardViewModel = {
  id: string;
  tmdb_id: string;
  title: string;
  posterUrl: string;
  isSaved: boolean;
}
