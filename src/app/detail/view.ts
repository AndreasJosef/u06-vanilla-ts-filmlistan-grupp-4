import type { AppState, ViewElement } from "../../types";
import { getDetailViewModel } from "./model";

export function detailView(state: AppState): ViewElement {
  const detailViewContainer = document.createElement("div") as ViewElement;
  detailViewContainer.className = "grid grid-cols-3 gap-4 mt-16";
  const data = getDetailViewModel(state);

  if (!data) {
    const loader = document.createElement("p");
    // TODO: Create a loading Spinner component that I could show here and elsewhere
    loader.textContent = "Still loading the movie...";
    detailViewContainer.appendChild(loader);
    return detailViewContainer;
  }

  detailViewContainer.innerHTML = `
    <div><img src="${data.movie.posterUrl}" alt="${data.movie.title} Film Poster"></div>
    <article class="col-span-2">
      <h1 class="text-3xl">${data.movie.title}</h1>
      <p class="text-xl">${data.movie.tagline}</p>
      <a class="text-xl" href="${data.movie.homepage}">Read More</a>
    </article>

  `;

  return detailViewContainer;
}
