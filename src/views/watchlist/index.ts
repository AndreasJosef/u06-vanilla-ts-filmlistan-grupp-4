import type { ViewElement } from "../../types/view";
import { loadWatchlist, type AppState } from "../../lib/store";

export default function watchlist(state: AppState): ViewElement {
  const watchlistEl = document.createElement("div");
  const { watchlist } = state;

  loadWatchlist("watchlist");

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
