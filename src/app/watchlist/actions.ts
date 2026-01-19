import { getState, setState } from "../../store";
import { getWatchlist } from "./api";

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
