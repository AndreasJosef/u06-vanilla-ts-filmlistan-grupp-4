import type { AppState } from "../../types";
import type { CatalogItem } from "./types";
import type { CatalogViewModel } from "./view";

export interface GalleryItemViewModel {
  id: string;
  dbId: string | null;
  title: string;
  posterUrl: string;
  isSaved: boolean;
  payload: CatalogItem;
}

/** function toGalleryItem(
  movie: CatalogItem,
  watchlistIDs: Set<string>,
): GalleryItemViewModel {
  return {
    id: movie.tmdb_id,
    dbId: null,
    title: movie.title,
    posterUrl: movie.poster_path,
    isSaved: watchlistIDs.has(movie.tmdb_id),
    payload: movie,
  };
} **/

export function getCatalogViewModel(state: AppState): CatalogViewModel {
  // and all the ids in watchlist, using Set for better perormance lookup set vs find
  // const watchlistIDs = new Set(state.watchlist.map((movie) => movie.tmdb_id));
  const watchlistIDMap = new Map<string, string>();

  // Create a map where the server ids points to the tmdb id
  state.watchlist.forEach((item) => {
    const key = String(item.tmdb_id);
    const value = item.id;
    watchlistIDMap.set(key, value);
  });

  const isSearch = state.searchResult.length > 0;
  const rawMovies = isSearch ? state.searchResult : state.popularMovies;

  const movies = rawMovies.map((movie) => {
    const lookupKey = String(movie.tmdb_id);
    const savedDbId = watchlistIDMap.get(lookupKey);

    console.log("Looking for:", lookupKey);
    console.log("Map has:", watchlistIDMap.keys());
    console.log("Result:", savedDbId !== null);

    return {
      id: movie.tmdb_id,
      dbId: savedDbId || null,
      title: movie.title,
      posterUrl: movie.poster_path,
      isSaved: savedDbId !== null && savedDbId !== undefined,
      payload: movie,
    };
  });

  return {
    view_mode: isSearch ? "Search Results" : "Popular Movies",
    movies,
  };
}
