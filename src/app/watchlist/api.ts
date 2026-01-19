import { type WatchlistItem } from "./types";

import { safeFetchList } from "../../core/api-engine";
import { parseWatchlistItem } from "./parser";

const API_BASE_URL = "http://localhost:3000/api";

const config: RequestInit = {
  headers: {
    "x-user-id": "team-1",
  },
};

export async function getWatchlist() {
  return await safeFetchList<WatchlistItem>(
    `${API_BASE_URL}/movies?status=watchlist`,
    parseWatchlistItem,
    config,
  );
}

// TODO: Implent function that saves movie to DB
export async function saveWatchlistItem(item: WatchlistItem) {
  console.log("Add to Watchlist: ", item.title);
}
