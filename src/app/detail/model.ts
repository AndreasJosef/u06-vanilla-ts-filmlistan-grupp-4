import { type AppState } from "../../types";
import { type DetailViewModel } from "./types";

export function getDetailViewModel(state: AppState): DetailViewModel | null {
  const { focusedMovieId } = state;

  if (!focusedMovieId || !state.movieDetails[focusedMovieId]) {
    return null;
  }

  const watchlistEntry = state.watchlist.find(
    (item) => item.tmdb_id === focusedMovieId,
  );

  return {
    movie: state.movieDetails[focusedMovieId],
    dbId: watchlistEntry ? watchlistEntry.id : null,
    // since watchlist entry might be undefined I first force to be a boolean with! but since I want the original truth value and not invert I invert it again !!
    isSaved: !!watchlistEntry,
    isSeen: false,
  };
}
