import type { CatalogItem } from "./app/catalog/types";
import type { WatchlistItem } from "./app/watchlist/types";

// Defining the shape of possible states
export interface AppState {
  currentView: "catalog" | "watchlist" | "detail";
  popularMovies: CatalogItem[];
  searchResult: CatalogItem[];
  watchlist: WatchlistItem[];
  error: string | null;
}
