import type { AppState, ViewElement } from "../../types";

import { getCurrentCatalog } from "./model";
import { searchMovies } from "../../app/catalog/actions";
import { addToWatchlist } from "../watchlist/actions";

// Components
import { createInput } from "../../app/catalog/components/search";
import { createGalleryCard } from "../../app/catalog/components/GalleryCard";

export function browseView(state: AppState) {
  const { view_mode, movies } = getCurrentCatalog(state);

  const browseViewEl = document.createElement("div") as ViewElement;

  // Creating DOM Elements
  const searchInput = createInput({
    type: "text",
    name: "search",
    label: "search",
  });

  const galleryCards = movies.map((movie) => {
    return createGalleryCard(movie, {
      onAdd: () => addToWatchlist(movie),
    });
  });

  // View DOM Template
  browseViewEl.innerHTML = `
    <section>
      <div class="search-bar"></div>
      <p>${state.error ? state.error : ""}</p>
      <h2 class="text-2xl">${view_mode}</h2>
      <!-- Gallery -->
      <ul class="max-w-full grid grid-cols-3 auto-rows-auto gap-4"></ul>
    </section>
  `;

  // Appending Components
  const galleryEl = browseViewEl.querySelector("ul") as HTMLUListElement;
  const searchContainer = browseViewEl.querySelector(
    ".search-bar",
  ) as HTMLDivElement;

  galleryCards.forEach((item) => galleryEl.appendChild(item));
  searchContainer.appendChild(searchInput);

  // Event Handlers
  const inputEl = searchInput.querySelector("input") as HTMLInputElement;

  // Enter on search box
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputEl.value !== "") {
      searchMovies(inputEl.value.trim());
    }
  };

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

  inputEl.addEventListener("keypress", handleKeyPress);
  galleryEl.addEventListener("click", handleGallerClick);

  // Attach cleanup function to properly remove event listener
  browseViewEl.cleanup = () => {
    inputEl.removeEventListener("keypress", handleKeyPress);
    galleryEl.removeEventListener("click", handleGallerClick);
  };

  return browseViewEl;
}
