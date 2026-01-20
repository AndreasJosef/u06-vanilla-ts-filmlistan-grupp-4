import type { CatalogItem } from "../catalog/types";

import { getState, setState } from "../../store";

import { getWatchlist, saveWatchlistItem } from "./api";
import { createDraftFromCatalog } from "./model";

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

  setState({
    watchlist: [newItem, ...currentList],
  });

  const response = await saveWatchlistItem(newItem);

  if (!response.ok) {
    setState({
      error: response.error,
    });

    const watchlistFromState = getState().watchlist;
    const rollback = watchlistFromState.filter(
      (i) => i.tmdb_id !== newItem.tmdb_id,
    );

    setState({
      watchlist: rollback,
    });

    // TODO: Make a Error or Toast component and handle display time there then delte his hardcoded timer.
    setTimeout(() => setState({ error: null }), 1000);
  }
}
