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

  // Check strict invariants (Essential data)
  if (!data.id || !data.title) {
    return fail("Invalid TMDB data: Missing ID or Title");
  }

  // Map external keys to internal Types
  return ok({
    tmdb_id: String(data.id), // Convert TMDB number to your string type
    title: data.title,
    description: data.overview || "", // Map 'overview' -> 'description'
    vote_average: data.vote_average || 0, // Map 'vote_average' -> 'rating_avg'
    release_date: data.release_date || "Unknown",

    // how to create an image urls: https://developer.themoviedb.org/docs/image-basics
    poster_path: data.poster_path
      ? `https:image.tmdb.org/t/p/w500${data.poster_path}`
      : "https://placehold.co/400x600?text=No+Image",
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
