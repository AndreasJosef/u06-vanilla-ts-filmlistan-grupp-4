import { type Result, ok, fail } from "../../core/result";
import type {
  WatchlistItem,
  WatchlistItemSeen,
  WatchlistItemNotSeen,
  WatchlistItemBase,
} from "./types";

export function parseWatchlistItem(input: unknown): Result<WatchlistItem> {
  if (!input || typeof input !== "object") {
    return fail("Invalid Data");
  }

  const data = input as Record<string, unknown>;

  // Check the critical fields
  if (!data.id || !data.title) {
    return fail("Missing ID or Title");
  }

  // construct the Base with strict casting
  const base: WatchlistItemBase = {
    id: String(data.id),
    tmdb_id: String(data.tmdb_id),
    user_id: String(data.user_id || ""),
    title: String(data.title),
    poster_path: String(data.poster_path || ""),
    release_date: String(data.release_date || ""),
    vote_average: Number(data.vote_average) || 0,
    overview: String(data.overview || ""),
    date_added: String(data.date_added || new Date().toISOString()),
  };

  // Route based on Status
  if (data.status === "watched") {
    return parseSeen(base, data);
  }

  if (data.status === "watchlist") {
    return parseNotSeen(base);
  }

  return fail(`Unknown Status: ${data.status}`);
}

// Helpers for parsing Seen/Unseen Variants

function parseSeen(
  base: WatchlistItemBase,
  data: Record<string, unknown>,
): Result<WatchlistItemSeen> {
  // base is already cast in parser
  return ok({
    ...base,
    status: "watched",
    personal_rating: Number(data.personal_rating) || 0,
    review: String(data.review || ""),
    is_favorite: Boolean(data.is_favorite),
    date_watched: String(data.date_watched || new Date().toISOString()),
  });
}

function parseNotSeen(base: WatchlistItemBase): Result<WatchlistItemNotSeen> {
  return ok({
    ...base,
    status: "watchlist",
  });
}
