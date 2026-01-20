import { setState, getState } from "../../store";
import { loadWatchlist } from "../watchlist/actions";
import { TMDB } from "./api";

export async function showCatalog() {
  setState({ currentView: "catalog" });

  // Determine if watchlist should be loaded as well and if so load it in paraell.
  // This needed so that I can compare against it for showing inWatchlist status in the catalog view
  // First check if we need to load the watchlist
  const shouldLoadWatchlist = getState().watchlist.length === 0;

  await Promise.all([
    loadPopularMovies(),
    shouldLoadWatchlist ? loadWatchlist() : Promise.resolve(null),
  ]);
}

// Action that loads popular movies from TMDB
export async function loadPopularMovies() {
  const state = getState();

  if (state.popularMovies.length) return;

  const result = await TMDB.getPopularMovies();

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

// Action to search for movie on TMDB
export async function searchMovies(searchText: string) {
  const response = await TMDB.searchMovie(searchText);

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
