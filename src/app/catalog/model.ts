import type { AppState } from "../../types";
import type { CatalogItem, CatalogViewModel } from "./types";

// TODO: Move global compoents to shared/ folder for better naming.
// import type { GalleryCardProps } from "../../components/GalleryCard";
//
export interface GalleryItemViewModel {
  id: string;
  title: string;
  posterUrl: string;
  isSaved: boolean;
  payload: CatalogItem;
}

function toGalleryItem(
  movie: CatalogItem,
  watchlistIDs: Set<string>,
): GalleryItemViewModel {
  return {
    id: movie.tmdb_id,
    title: movie.title,
    posterUrl: movie.poster_path,
    isSaved: watchlistIDs.has(movie.tmdb_id),
    payload: movie,
  };
}

export function getCatalogViewModel(state: AppState): CatalogViewModel {
  // and all the ids in watchlist, using Set for better perormance lookup set vs find
  const watchlistIDs = new Set(state.watchlist.map((movie) => movie.tmdb_id));
  const isSearch = state.searchResult.length > 0;

  const rawMovies = isSearch ? state.searchResult : state.popularMovies;

  return {
    view_mode: isSearch ? "Search Results" : "Popular Movies",
    movies: rawMovies.map((m) => toGalleryItem(m, watchlistIDs)),
  };
}
