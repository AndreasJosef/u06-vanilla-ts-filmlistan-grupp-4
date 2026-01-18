import { getWatchlist } from "./app/watchlist/api";
import { TMDB } from "./app/catalog/api";

import type { CatalogItem } from "./app/catalog/types";
import type { WatchlistItem } from "./app/watchlist/types";

export interface AppState {
  popularMovies: CatalogItem[];
  searchResult: CatalogItem[] | null;
  watchlist: WatchlistItem[];
  error: string | null;
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

    const data = await getWatchlist();

    this.state.watchlist = data;
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
