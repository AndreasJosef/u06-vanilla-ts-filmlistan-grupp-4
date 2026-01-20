import type { AppState } from "../../types";
import type { CatalogItemViewModel, CatalogViewModel } from "./types";

export function getCurrentCatalog(state: AppState): CatalogViewModel {
  // first need to know the mode
  const isSearchMode = state.searchResult.length > 0;

  // based on that get the active list
  const activeList = isSearchMode ? state.searchResult : state.popularMovies;

  // and all the ids in watchlist, using Set for better perormance lookup set vs find
  const watchlistIDs = new Set(state.watchlist.map((movie) => movie.tmdb_id));

  // now I can assmble the model
  const view_mode = isSearchMode ? "Search Results" : "Popular Movies";

  const movies: CatalogItemViewModel[] = activeList.map((movie) => {
    return {
      ...movie,
      inWatchlist: watchlistIDs.has(movie.tmdb_id),
    };
  });

  return {
    view_mode,
    movies,
  };
}
