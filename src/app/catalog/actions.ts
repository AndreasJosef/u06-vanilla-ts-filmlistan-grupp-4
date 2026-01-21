import { setState, getState } from "../../store";
import { loadWatchlist } from "../watchlist/actions";
import { TMDB } from "./api";

export async function showCatalog() {
  setState({ currentView: "catalog" });

  // First check if we need to load the watchlist
  const shouldLoadWatchlist = getState().watchlist.length === 0;

  // fetch TMDB and watchlist in parallel.
  await Promise.all([
    loadPopularMovies(),
    shouldLoadWatchlist ? loadWatchlist() : Promise.resolve(null),
  ]);
}

// Action that loads popular movies from TMDB
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

// Action that searches on TMDB and adds the result in store
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
