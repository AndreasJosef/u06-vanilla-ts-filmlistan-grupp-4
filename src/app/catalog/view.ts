import type { AppState, ViewElement } from "../../types";

import { getCatalogViewModel } from "./model";
import { clearResult, searchMovies } from "../../app/catalog/actions";
import { addToWatchlist, removeFromWatchlist } from "../watchlist/actions";

// Components
import { createSearchBar } from "./components/SearchBar";
import { createGalleryCard } from "../../components/GalleryCard";

export function browseView(state: AppState) {
  const { view_mode, movies } = getCatalogViewModel(state);

  // Create the views DOM Element
  const browseViewEl = document.createElement("div") as ViewElement;

  // Create the components
  const searchBar = createSearchBar({
    isSearchMode: view_mode === "Search Results",
    onSearch: (query) => searchMovies(query),
    onClear: clearResult,
  });

  const galleryCards = movies.map((movie) => {
    return createGalleryCard({
      ...movie,
      onToggle: () => {
        if (!movie.isSaved) {
          addToWatchlist(movie.payload);
        } else if (movie.dbId) {
          console.log("remove from watchlist", movie.dbId);
          removeFromWatchlist(movie.dbId);
        }
      },
    });
  });

  // Template
  browseViewEl.innerHTML = `
    <section>
      <div class="search-container"></div>
      <p>${state.error ? state.error : ""}</p>
      <h2 class="text-2xl">${view_mode}</h2>
      <!-- Gallery -->
      <ul class="max-w-full grid grid-cols-3 auto-rows-auto gap-4"></ul>
    </section>
  `;

  // Appending Components
  const galleryEl = browseViewEl.querySelector("ul") as HTMLUListElement;
  const searchContainer = browseViewEl.querySelector(
    ".search-container",
  ) as HTMLElement;

  searchContainer.appendChild(searchBar);
  galleryCards.forEach((item) => galleryEl.appendChild(item));

  // handle click on list items
  const handleGallerClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "IMG") {
      const card = target.closest("[data-tmdb-id]") as HTMLElement;

      if (card) {
        console.log(card.dataset.tmdbId);
      }
    }
  };

  galleryEl.addEventListener("click", handleGallerClick);

  // Attach cleanup function to properly remove event listener
  browseViewEl.cleanup = () => {
    galleryEl.removeEventListener("click", handleGallerClick);
  };

  return browseViewEl;
}
