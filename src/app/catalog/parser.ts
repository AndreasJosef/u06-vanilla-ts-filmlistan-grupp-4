// import { type CatalogItem } from "./types";

import { type Result, ok, fail } from "../../core/result";
import { type CatalogItem } from "./types";

/**
 * Parses a generic movie result from TMDB (Search or Popular list).
 * Returns the 'CatalogItemBase' shape, which satisfies the CatalogItem union.
 */
export function parseTmdbMovie(input: unknown): Result<CatalogItem> {
  if (!input || typeof input !== "object") {
    return fail("Invalid TMDB data: Not an object");
  }

  const data = input as Record<string, any>;

  // 1. Check strict invariants (Essential data)
  if (!data.id || !data.title) {
    return fail("Invalid TMDB data: Missing ID or Title");
  }

  // 2. Map external keys to your internal Types
  // Note: We provide fallbacks (|| '') so the UI never crashes on missing optional data
  return ok({
    tmdb_id: String(data.id), // Convert TMDB number to your string type
    title: data.title,
    description: data.overview || "", // Map 'overview' -> 'description'
    rating_avg: data.vote_average || 0, // Map 'vote_average' -> 'rating_avg'
    release_date: data.release_date || "Unknown",

    // Note: Your type definition didn't include 'poster_path' or 'posterUrl'.
    // If you add it later, map it here:
    // posterUrl: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
  });
}

/**
 * Optional: Parser for the Detail View (if you fetch /movie/{id})
 * This assumes you are fetching extra data to populate 'actors' etc.
 */
/*
export function parseTmdbDetail(input: unknown): Result<CatalogItemDetail> {
  // ... similar logic, but mapping 'credits' to 'actors'
}
*/
