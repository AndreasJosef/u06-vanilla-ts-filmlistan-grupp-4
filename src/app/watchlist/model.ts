import type { AppState } from "../../types";
import type { CatalogItem } from "../catalog/types";
import { removeFromWatchlist } from "./actions";
import type { WatchlistCardViewModel, WatchlistItemNotSeen } from "./types";

// Turn a Search Result into a Watchlist Item"
export function createDraftFromCatalog(
  item: CatalogItem,
): WatchlistItemNotSeen {
  // in the return object I get the autocomplete from the return type above
  return {
    // Link them
    tmdb_id: item.tmdb_id,

    // Shared Data
    id: crypto.randomUUID(), // or temporary ID until DB confirms
    user_id: "current-user", // Placeholder or from Auth context
    title: item.title,
    poster_path: item.poster_path || "",
    release_date: item.release_date,
    vote_average: item.vote_average,
    overview: item.description,
    date_added: new Date().toISOString(),

    // New State -> Watched Status
    status: "watchlist",
  };
}

export function getWatchListViewModel(state: AppState): WatchlistCardViewModel[] {
  return state.watchlist.map((movie) => ({
    id: movie.id,
    tmdb_id: movie.tmdb_id,
    title: movie.title,
    posterUrl: movie.poster_path,
    isSaved: true,
  }))
}
