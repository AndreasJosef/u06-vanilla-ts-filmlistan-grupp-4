/**
 * @module CatalogModel
 * @description
 * The brain of the movie browsing and search experience.
 * Transforms raw movie lists into GalleryCard props and handles
 * the logic for the "Search vs Popular" state.
 *
 * @architectural-role Model
 * @input  {AppState}
 * @output {CatalogViewModel}
 */

import type { AppState } from "../../types";
import type { CatalogViewModel } from "./types";

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
    const lookupKey = String(movie.tmdbId);
    const savedDbId = watchlistIDMap.get(lookupKey);

    return {
      id: movie.tmdbId,
      dbId: savedDbId || null,
      title: movie.title,
      posterUrl: movie.posterUrl,
      isSaved: savedDbId !== null && savedDbId !== undefined,
      payload: movie,
    };
  });

  return {
    view_mode: isSearch ? "Search Results" : "Popular Movies",
    movies,
  };
}
