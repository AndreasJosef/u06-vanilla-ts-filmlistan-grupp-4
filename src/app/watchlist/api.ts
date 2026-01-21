import { type WatchlistItem } from "./types";

import { fetchSafeList, safePost as postSafe } from "../../core/api-engine";
import { parseWatchlistItem } from "./parser";

const API_BASE_URL = "http://localhost:3000/api";

const config: RequestInit = {
  headers: {
    "x-user-id": "team-1",
  },
};

// Get all saved movies from backend
export async function getWatchlist() {
  return await fetchSafeList<WatchlistItem>(
    `${API_BASE_URL}/movies`,
    parseWatchlistItem,
    config,
  );
}

// Save a new item to db
export async function saveWatchlistItem(item: WatchlistItem) {
  return await postSafe<WatchlistItem>(`${API_BASE_URL}/movies`, item, config);
}
