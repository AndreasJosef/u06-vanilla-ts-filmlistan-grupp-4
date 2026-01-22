import { type Result, ok, fail } from "../../core/result";
import { type MovieDetail } from "./types";

/**
 * Parses a generic movie result from TMDB (Search or Popular list).
 * Returns the 'CatalogItemBase' shape, which satisfies the CatalogItem union.
 */
export function parseTMDBDetail(input: unknown): Result<MovieDetail> {
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
    id: String(data.id), // Convert TMDB number to your string type
    title: data.title,
    posterUrl: data.path || "",
    description: data.overview || "", // Map 'overview' -> 'description'
    tagline: data.tagline || "",
    ratingTMDB: data.vote_average || 0, // Map 'vote_average' -> 'rating_avg'
    releaseDate: data.release_date || "Unknown",
    homepage: data.homepage || "",
    budget: data.budget || 0,
    revenue: data.revenue || 0,
    ratingUser: 0,
    noteUser: "",

    // how to create an image urls: https://developer.themoviedb.org/docs/image-basics
    poster_path: data.poster_path
      ? `https:image.tmdb.org/t/p/w500${data.poster_path}`
      : `https://placehold.co/400x600?text=${data.title}`,
  });
}
