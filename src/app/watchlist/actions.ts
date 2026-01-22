import { getState, setState } from "../../store";
import { toast } from "../../core/toast/toast";


import { deleteWatchlistItem, getWatchlist, saveWatchlistItem } from "./api";
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
      watchlist: currentList,
    });

    toast.error("Could not add movie to watchlist");
    return;
  }
}

export async function removeFromWatchlist(movieId: string) {
  const currentList = getState().watchlist;

  const updatedList = currentList.filter(movie => movie.id !== movieId);
  setState({ watchlist: updatedList });

  try {
    await deleteWatchlistItem(movieId);
  } catch (error) {
    setState({
      watchlist: currentList,
      error: error instanceof Error ? error.message : "Failed to remove movie"
    });
    setTimeout(() => setState({ error: null }), 1000)
  }
}

// success feedback
toast.success("Added to watchlist");
    
  }

