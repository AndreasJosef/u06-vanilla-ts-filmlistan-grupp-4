import type { ViewElement } from "../view";
import type { AppState } from "../../types";

import { loadWatchlist } from "../../app/watchlist/actions";

export default function watchlist(state: AppState): ViewElement {
  const watchlistEl = document.createElement("div");
  const { watchlist } = state;

  loadWatchlist();

  // TODO: Replace h1>movie.title with an a MovieCard component
  watchlistEl.innerHTML = `
    <section>
      <h2>Watchlist</h2>
      ${watchlist?.map((movie) => `<h1>${movie.title}</h1>`).join("")}
    </section>
  `;

  // Attach cleanup function to properly remove event listener
  (watchlistEl as ViewElement).cleanup = () => {
    // empty for now
  };

  return watchlistEl;
}
