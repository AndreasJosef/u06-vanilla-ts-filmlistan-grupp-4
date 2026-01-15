import { getState, searchMovies, type AppState } from "../../lib/store";
import { loadPopularMovies } from "../../lib/store";
import type { ViewElement } from "../../types/view";

import { createInput } from "../../components/search";

export default function home(state: AppState): ViewElement {
  const home = document.createElement("div");
  const { popularMovies, searchResult } = state;

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
      <!-- Search -->

      ${searchResult?.map((movie) => `${movie.title}`).join("\n")}

      <!-- Popluar -->
      <ul>
          ${popularMovies.map((movie) => `<li><h2>${movie.title}</h2></li>`).join("")} 
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

