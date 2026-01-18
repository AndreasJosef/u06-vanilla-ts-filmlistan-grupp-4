import {
  type AppState,
  getState,
  searchMovies,
  loadPopularMovies,
} from "../../store";

import type { ViewElement } from "../view";
import { createInput } from "../../app/catalog/components/search";

export default function home(state: AppState): ViewElement {
  const home = document.createElement("div");
  const { popularMovies, searchResult, error } = state;

  const searchInput = createInput({
    type: "text",
    name: "search",
    label: "search",
  });

  if (!getState().popularMovies.length) {
    loadPopularMovies();
  }

  home.classList.add("popular");

  home.innerHTML = `
    <section>
      <h2>Error: ${error}</h2>
      <!-- Search -->
      <h2 class="text-2xl">Search Movie</h2>
      ${searchResult?.map((movie) => `${movie.title}`).join("\n")}

      <!-- Popluar -->
      <ul class="max-w-full grid grid-cols-3 gap-4">
        ${popularMovies
          .map(
            (movie) => `
        <a href="">
          <li class="rounded-sm">
          <h2>${movie.title}</h2>
          <img 
              class="rounded"
            src="${movie.posterUrl}"
            alt="${movie.title}" />

          </li>
        </a>
        `,
          )
          .join("")} 
      </ul>
    </section>
  `;

  home.prepend(searchInput);

  const inputEl = searchInput.querySelector("input") as HTMLInputElement;

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputEl.value !== "") {
      searchMovies(inputEl.value.trim());
    }
  };

  inputEl.addEventListener("keypress", handleKeyPress);

  // Attach cleanup function to properly remove event listener
  (home as ViewElement).cleanup = () => {
    inputEl.removeEventListener("keypress", handleKeyPress);
  };

  return home;
}
