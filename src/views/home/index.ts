import type { TMDBMovie } from "../../types/movie";

import { getState, searchMovies, type AppState } from "../../lib/store";
import { loadPopularMovies } from "../../lib/store";

import { createInput } from "../../components/search";


export default function home(state: AppState) {
  const home = document.createElement("div");
  const { popularMovies, searchResult } = state;

  const searchInput = createInput({
        type: 'text',
        name: 'search',
        label: 'search'
      })

  if (!getState().popularMovies.length) {
    loadPopularMovies();
  }

  home.classList.add("popular");

  home.innerHTML = `
    <section>
      <!-- Search -->

      ${searchResult?.map(movie => `${movie.title}`).join('\n')}

      <!-- Popluar -->
      <ul>
          ${popularMovies.map(movie => `<li><h2>${movie.title}</h2></li>`).join('')} 
      </ul>
    </section>
  `;

  home.prepend(searchInput);

  const inputEl = searchInput.querySelector('input') as HTMLInputElement

  inputEl.addEventListener('keypress', e => {

      if (e.key === 'Enter' && inputEl.value !== '') {
        searchMovies(inputEl.value.trim())
      }
  })

  return home;
}