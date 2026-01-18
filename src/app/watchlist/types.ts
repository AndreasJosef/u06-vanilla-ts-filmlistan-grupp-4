export type MovieStatus = "watchlist" | "watched";

type WatchlistItemBase = {
  id: number;
  tmdb_id: number;
  title: string;
  posterUrl: string;
  date_added: string;
  release_date: string;
  rating_avg: number;

  is_favorite?: boolean;
  overview?: string | null;
};

export type WatchlistItemSeen = WatchlistItemBase & {
  status: "watched";
  personal_rating: number;
  date_watched: string | null;
  review?: string;
};

export type WatchlistItemNotSeen = WatchlistItemBase & {
  status: "unwatched";
  addWatchlist: boolean;
};

export type WatchlistItem = WatchlistItemSeen | WatchlistItemNotSeen;
