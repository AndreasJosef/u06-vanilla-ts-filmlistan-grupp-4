import { getWatchlist } from "./app/watchlist/api";
import { TMDB } from "./app/catalog/api";

import type { CatalogItem } from "./app/catalog/types";
import type { WatchlistItem } from "./app/watchlist/types";

export interface AppState {
  popularMovies: CatalogItem[];
  searchResult: CatalogItem[];
  watchlist: WatchlistItem[];
  error: string | null;
}

// TODO: Refactor Store be a generic state store
// It currently knows to much and imports a bunch of functions that work on the state.
// Instead the the calss should simply make getter and setter available and then rerender on every
// state change. Features can then call these directly via actions.
class Store {
  renderCallback: () => void;
  state: AppState;

  constructor() {
    this.renderCallback = () => {};
    this.state = {
      popularMovies: [],
      searchResult: [],
      watchlist: [],
      error: null,
    };
  }

  getState(): AppState {
    return { ...this.state };
  }

  // Loading external data into the store
  async loadPopularMovies() {
    if (this.state.popularMovies.length) return;

    const moviesResult = await TMDB.getPopularMovies();

    if (moviesResult.ok) {
      this.state.popularMovies = moviesResult.value;
      this.state.error = null;
    } else {
      console.log("Error loading movies", moviesResult.error);
      this.state.popularMovies = [];
      this.state.error = moviesResult.error;
    }

    this.triggerRender();
  }

  async searchMovies(searchText: string) {
    const response = await TMDB.searchMovie(searchText);

    if (response.ok) {
      this.state.searchResult = response.value;
    } else {
      this.state.error = response.error;
    }
    this.triggerRender();
  }

  async loadWatchlist() {
    if (this.state.watchlist.length) return;

    const response = await getWatchlist();

    if (response.ok) {
      this.state.watchlist = response.value;
    } else {
      this.state.error = response.error;
      console.log("Error loading Watchlist");
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
