import type { AppState } from "../../types";
import type { Movie } from "../../shared/types/movies";

import type { WatchlistCardViewModel, WatchlistItemNotSeen } from "./types";

// Turn a Search Result into a Watchlist Item"
export function createDraftFromCatalog(item: Movie): WatchlistItemNotSeen {
  // in the return object I get the autocomplete from the return type above
  return {
    // Link them
    tmdb_id: item.tmdbId,

    // Shared Data
    id: crypto.randomUUID(), // or temporary ID until DB confirms
    user_id: "current-user", // Placeholder or from Auth context
    title: item.title,
    poster_path: item.posterUrl || "",
    release_date: item.releaseDate,
    vote_average: item.ratingAvg,
    overview: item.overview,
    date_added: new Date().toISOString(),

    // New State -> Watched Status
    status: "watchlist",
  };
}

export function getWatchListViewModel(
  state: AppState,
): WatchlistCardViewModel[] {
  return state.watchlist.map((movie) => ({
    id: movie.id,
    tmdb_id: movie.tmdb_id,
    title: movie.title,
    posterUrl: movie.poster_path,
    isSaved: true,
  }));
}
