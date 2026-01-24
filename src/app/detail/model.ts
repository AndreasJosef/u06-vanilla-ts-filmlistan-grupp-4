import { type AppState } from "../../types";
import { type DetailViewModel } from "./types";

export function getDetailViewModel(state: AppState): DetailViewModel | null {
  const { focusedMovieId } = state;

  if (!focusedMovieId || !state.movieDetails[focusedMovieId]) {
    return null;
  }

  const watchlistIDs = new Set(state.watchlist.map((movie) => movie.tmdb_id));
  const isSaved = watchlistIDs.has(focusedMovieId);

  let dbId: string | null = null;

  const savedMovie = state.watchlist.find(
    (item) => item.tmdb_id === focusedMovieId,
  );

  if (savedMovie) {
    dbId = savedMovie.id;
  }

  return {
    movie: state.movieDetails[focusedMovieId],
    dbId,
    isSaved,
    isSeen: false,
  };
}
