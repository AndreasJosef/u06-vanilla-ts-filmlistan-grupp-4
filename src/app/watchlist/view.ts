import type { AppState, ViewElement } from "../../types";

export function watchlistView(state: AppState): ViewElement {
  const watchlistEl = document.createElement("div") as ViewElement;
  const { watchlist } = state;

  // TODO: Replace h1>movie.title with an a MovieCard component
  watchlistEl.innerHTML = `
    <section>
      <h2>Watchlist</h2>
      ${watchlist?.map((movie) => `<h1>${movie.title}</h1>`).join("")}
    </section>
  `;

  // Attach cleanup function to properly remove event listener
  watchlistEl.cleanup = () => {
    // empty for now
  };

  return watchlistEl;
}
