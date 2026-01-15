import { getWatchlist } from "../services/movieApi";
import { TMDB } from "../services/tmdbApi";
import type { DatabaseMovie, TMDBMovie, MovieStatus } from "../types/movie";

export interface AppState {
  popularMovies: TMDBMovie[];
  searchResult: TMDBMovie[] | null;
  watchlist: DatabaseMovie[];
  watchedMovies: DatabaseMovie[];
}

class Store {
  renderCallback: () => void;
  state: AppState;

  constructor() {
    this.renderCallback = () => {};
    this.state = {
      popularMovies: [],
      searchResult: null,
      watchlist: [],
      watchedMovies: [],
    };
  }

  getState(): AppState {
    return { ...this.state };
  }

  async loadPopularMovies(shouldTriggerRender: boolean = true) {
    if (this.state.popularMovies.length) return;

    try {
      this.state.popularMovies = await TMDB.getPopularMovies();

      if (shouldTriggerRender) {
        this.triggerRender();
      }
    } catch (error) {
      console.error("Failed to load popular movies:", error);
    }
  }

  async searchMovies(searchText: string) {
    this.state.searchResult = await TMDB.searchMovie(searchText);
    this.triggerRender();
  }

  async loadWatchlist(status: MovieStatus) {
    if (this.state.watchlist.length) return;

    const data = await getWatchlist();

    if (status === "watchlist") {
      this.state.watchlist = data;
    } else {
      this.state.watchedMovies = data;
    }

    this.triggerRender();
  }

  // ========== RENDER CALLBACK ==========

  setRenderCallback(renderApp: () => void) {
    this.renderCallback = renderApp;
  }

  triggerRender() {
    if (this.renderCallback) {
      this.renderCallback();
    }
  }
}

const store = new Store();

export const loadWatchlist = store.loadWatchlist.bind(store); // Async
export const searchMovies = store.searchMovies.bind(store); // Async
export const loadPopularMovies = store.loadPopularMovies.bind(store); // Async
export const setRenderCallback = store.setRenderCallback.bind(store);
export const getState = store.getState.bind(store);
