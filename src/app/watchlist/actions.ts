import { getState, setState } from "../../store";

import { getWatchlist, saveWatchlistItem } from "./api";
import { createDraftFromCatalog } from "./model";
import type { CatalogItem } from "../catalog/types";

// Sets the current View to watchlist which will trigger a rerender
export async function showWatchlist() {
  setState({ currentView: "watchlist" });

  const state = getState();

  if (state.watchlist.length === 0) {
    await loadWatchlist();
  }
}

// Loads users watchlist from the backend
export async function loadWatchlist() {
  const state = getState();

  if (state.watchlist.length) return;

  const response = await getWatchlist();

  if (response.ok) {
    setState({
      watchlist: response.value,
      error: null,
    });
  } else {
    setState({
      error: response.error,
    });
  }
}

// Adds a new movie to the users watchlist
export async function addToWatchlist(item: CatalogItem) {
  const currentList = getState().watchlist;
  const newItem = createDraftFromCatalog(item);

  // optimistic ui
  // update UI immediatley and reverse on error
  setState({
    watchlist: [newItem, ...currentList],
  });

  const response = await saveWatchlistItem(newItem);

  if (!response.ok) {
    setState({
      error: response.error,
      watchlist: currentList,
    });

    // TODO: Make an Error or Toast component and handle display time there then delte his hardcoded timer.
    setTimeout(() => setState({ error: null }), 1000);
  }
}
