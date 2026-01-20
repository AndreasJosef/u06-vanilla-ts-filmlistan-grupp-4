import { setState, getState } from "../../store";
import { TMDB } from "./api";

export async function showCatalog() {
  setState({ currentView: "catalog" });

  await loadPopularMovies();
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
