import { type Result, ok, fail } from "../../core/result";
import { type Movie } from "../../shared/types/movies";
import { type MovieDetail } from "../../shared/types/movies";

/**
 * Parses a generic movie result from TMDB (Search or Popular list).
 * Returns the 'CatalogItemBase' shape, which satisfies the CatalogItem union.
 */
export function parseTmdbMovie(input: unknown): Result<Movie> {
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
    tmdbId: String(data.id), // Convert TMDB number to your string type
    title: data.title,
    overview: data.overview || "", // Map 'overview' -> 'description'
    ratingAvg: data.vote_average || 0, // Map 'vote_average' -> 'rating_avg'
    releaseDate: data.release_date || "Unknown",

    // how to create an image urls: https://developer.themoviedb.org/docs/image-basics
    posterUrl: data.poster_path
      ? `https:image.tmdb.org/t/p/w500${data.poster_path}`
      : "https://placehold.co/400x600?text=No+Image",
  });
}

/**
 * Parses a the detail movie result from TMDB.
 * Returns the 'MovieDetail' shape.
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
    tmdbId: String(data.id), // Convert TMDB number to your string type
    title: data.title,
    overview: data.overview || "", // Map 'overview' -> 'description'
    tagline: data.tagline || "",
    ratingAvg: data.vote_average || 0, // Map 'vote_average' -> 'rating_avg'
    releaseDate: data.release_date || "Unknown",
    homepage: data.homepage || "",
    budget: data.budget || 0,
    revenue: data.revenue || 0,

    // how to create an image urls: https://developer.themoviedb.org/docs/image-basics
    posterUrl: data.poster_path
      ? `https:image.tmdb.org/t/p/w500${data.poster_path}`
      : `https://placehold.co/400x600?text=${data.title}`,
  });
}
