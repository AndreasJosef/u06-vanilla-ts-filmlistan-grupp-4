import {
  type AppState,
  getState,
  searchMovies,
  loadPopularMovies,
} from "../../store";

import type { ViewElement } from "../view";

import { createInput } from "../../app/catalog/components/search";
import { createGalleryCard } from "../../app/catalog/components/GalleryCard";

export function browseView(state: AppState): ViewElement {
  const { popularMovies, searchResult, error } = state;
  const browseViewEl = document.createElement("div");

  // Determine if we are in search mode and populate list accordingly
  const searchMode = searchResult.length > 0;
  const movieList = searchMode ? searchResult : popularMovies;
  const sectionTitle = searchMode ? "Search Results" : "Popular Movies";

  if (!getState().popularMovies.length && !searchMode) {
    loadPopularMovies();
  }

  // Creating DOM Elements
  const searchInput = createInput({
    type: "text",
    name: "search",
    label: "search",
  });

  const galleryCards = movieList.map(createGalleryCard);

  // View DOM Template
  browseViewEl.innerHTML = `
    <section>
      <div class="search-bar"></div>
      <h2 class="text-2xl">${sectionTitle}</h2>
      <!-- Popluar -->
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
  (browseViewEl as ViewElement).cleanup = () => {
    inputEl.removeEventListener("keypress", handleKeyPress);
    galleryEl.removeEventListener("click", handleGallerClick);
  };

  return browseViewEl;
}
