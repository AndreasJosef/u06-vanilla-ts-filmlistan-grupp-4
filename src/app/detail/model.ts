import { type AppState } from "../../types";
import { type DetailViewModel } from "./types";

export function getDetailViewModel(state: AppState): DetailViewModel | null {
  const { focusedMovieId } = state;

  if (!focusedMovieId || !state.movieDetails[focusedMovieId]) {
    return null;
  }

  const watchlistIDs = new Set(state.watchlist.map((movie) => movie.tmdb_id));

  return {
    movie: state.movieDetails[focusedMovieId],
    isSaved: watchlistIDs.has(focusedMovieId),
    isSeen: false,
  };
}
