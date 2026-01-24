import type { Movie } from "./shared/types/movies";
import type { WatchlistItem } from "./app/watchlist/types";
import type { MovieDetail } from "./shared/types/movies";

// Defining the shape of possible states
export interface AppState {
  currentView: "catalog" | "watchlist" | "detail";
  popularMovies: Movie[];
  searchResult: Movie[];
  watchlist: WatchlistItem[];
  error: string | null;
  movieDetails: Record<string, MovieDetail>;
  focusedMovieId: string | null;
}

// Cleanup function that removes event listeners, timers, and other resources when a view is destroyed.
export type ViewCleanup = () => void;

// Extended HTMLElement interface for view components that includes cleanup functionality.
export interface ViewElement extends HTMLElement {
  cleanup?: ViewCleanup;
}

// View component function that returns either a string (for static content) or a ViewElement with optional cleanup for dynamic content.
export type ViewComponent = (state?: AppState) => ViewElement | string;
