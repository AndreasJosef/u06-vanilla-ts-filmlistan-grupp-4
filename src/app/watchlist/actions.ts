import { getState, setState } from "../../store";
import { getWatchlist } from "./api";

export async function showWatchlist() {
  setState({ currentView: "watchlist" });

  const state = getState();

  if (state.watchlist.length === 0) {
    await loadWatchlist();
  }
}

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

export async function addToWatchlist(id: number) {
  console.log("Add to wachlist TMDB ID: ", id);
  // TODO: Implement function that adds create watchlist item with the help off createDraft model function and also persists to db via api
}
