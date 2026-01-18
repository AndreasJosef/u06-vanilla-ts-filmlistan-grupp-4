import { getWatchlist } from "./app/watchlist/api";
import { TMDB } from "./app/catalog/api";

import type { CatalogItem } from "./app/catalog/types";
import type { WatchlistItem } from "./app/watchlist/types";

export interface AppState {
  popularMovies: CatalogItem[];
  searchResult: CatalogItem[] | null;
  watchlist: WatchlistItem[];
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
    };
  }

  getState(): AppState {
    return { ...this.state };
  }

  // Loading external data into the store
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
