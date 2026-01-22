import type { AppState, ViewElement } from "../../types";
import { createGalleryCard } from "../../components/GalleryCard";
import { getWatchListViewModel } from "./model";
import { removeFromWatchlist } from "./actions";

export function watchlistView(state: AppState): ViewElement {
  const watchlistEl = document.createElement("div") as ViewElement;

  const watchlistMovies = getWatchListViewModel(state);

  watchlistEl.innerHTML = `
    <section>
      <h2>Watchlist</h2>
      <ul class="max-w-full grid grid-cols-3 auto-rows-auto gap-4"></ul>
    </section>
`;

  const galleryCards = watchlistMovies.map((movie) => {
    return createGalleryCard({
      id: movie.tmdb_id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      isSaved: movie.isSaved,
      onToggle: () => {
        removeFromWatchlist(movie.id);
      },
    });
  });

  const galleryEl = watchlistEl.querySelector("ul") as HTMLUListElement;
  galleryCards.forEach((item) => galleryEl.appendChild(item));

  return watchlistEl;
}

