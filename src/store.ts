import { type AppState } from "./types";

const initialState: AppState = {
  currentView: "catalog",
  popularMovies: [],
  searchResult: [],
  watchlist: [],
  error: null,
  focusedMovieId: null,
  movieDetails: {},
};

class Store {
  renderCallback: () => void;
  state: AppState;

  constructor() {
    this.renderCallback = () => {};
    this.state = initialState;
  }

  getState(): AppState {
    return { ...this.state };
  }

  setState(patch: Partial<AppState>) {
    this.state = {
      ...this.state,
      ...patch,
    };

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

export const setState = store.setState.bind(store);
export const getState = store.getState.bind(store);
export const setRenderCallback = store.setRenderCallback.bind(store);
