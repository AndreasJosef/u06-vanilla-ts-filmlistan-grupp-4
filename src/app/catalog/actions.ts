import { setState, getState } from "../../store";
import { loadWatchlist } from "../watchlist/actions";
import { TMDB } from "./api";

// Make catalog the active view, load movies and watchlist
export async function showCatalog() {
  setState({ currentView: "catalog" });

  const shouldLoadWatchlist = getState().watchlist.length === 0;

  // fetch TMDB and watchlist in parallel.
  await Promise.all([
    loadPopularMovies(),
    shouldLoadWatchlist ? loadWatchlist() : Promise.resolve(null),
  ]);
}

// Fetch popular movies (only if not in store already) for TMDB and store in AppState
export async function loadPopularMovies() {
  const state = getState();

  if (state.popularMovies.length) return;

  const result = await TMDB.fetchPopularMovies();

  if (result.ok) {
    setState({
      popularMovies: result.value,
      error: null,
    });
  } else {
    console.log("Error loading movies", result.error);
    setState({
      popularMovies: [],
      error: result.error,
    });
  }
}

// Search TMDB and save to AppState
export async function searchMovies(searchText: string) {
  const response = await TMDB.fetchMovies(searchText);

  if (response.ok) {
    setState({
      searchResult: response.value,
      error: null,
    });
  } else {
    setState({
      error: response.error,
    });
  }
}
