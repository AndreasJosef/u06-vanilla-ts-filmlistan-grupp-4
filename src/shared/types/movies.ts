/**
 * MODULE: Shared Entities / Movie
 * @description
 * The Data Definition of a "Movie" in Filmkollen.
 *
 * This type represents a movie as it exists
 * in our domain, regardless of whether it is being viewed in the
 * Catalog, the Watchlist, or the Detail view.
 */

export interface Movie {
  tmdbId: string;
  title: string;
  overview: string;
  ratingAvg: number;
  releaseDate: string;
  posterUrl: string;
}

export interface MovieDetail extends Movie {
  tagline: string;
  homepage: string;
  budget: number;
  revenue: number;
}
