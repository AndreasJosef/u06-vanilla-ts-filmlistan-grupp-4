/**
 * @module MovieStats
 * @description
 * A static row of additional facts about the parent film
 *
 * Features:
 *  - shows relaease date, average rating, revenue, budget
 *  - TODO mobile first responsive
 **/

/**
 * Configuration for the MovieStats
 * @property ratingAvg - Average rating returned form TMDB
 * @property releaseDate - Date string with release data
 * @property revenue - The movies revenue returned from TMDB
 * @property revenue - The movies budget returned from TMDB
 *
 **/
export interface MovieStatsProps {
  ratingAvg: number;
  releaseDate: string;
  revenue: number;
  budget: number;
}

/**
 * Factory function for the MovieStats component
 *
 * @property MovieStatsProps
 * @returns - An `article` element containing the movie stat elements.
 */
export function createMovieStats(props: MovieStatsProps): HTMLElement {
  const movieStatsContainer = document.createElement("article");

  console.log(props);

  return movieStatsContainer;
}
