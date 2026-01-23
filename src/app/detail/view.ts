import type { AppState, ViewElement } from "../../types";
import { getDetailViewModel } from "./model";
import { createButton } from "../../components/Button";

export function detailView(state: AppState): ViewElement {
  const detailViewContainer = document.createElement("div") as ViewElement;
  detailViewContainer.className = "grid grid-cols-3 gap-8 mt-16";
  const data = getDetailViewModel(state);

  // Return Loader if content has not arrived yet
  if (!data) {
    const loader = document.createElement("p");
    // TODO: Create a loading Spinner component that I could show here and elsewhere
    loader.textContent = "Still loading the movie...";
    detailViewContainer.appendChild(loader);
    return detailViewContainer;
  }

  // Create Components
  const backButton = createButton({
    value: "Back",
    onClick: () => history.back(),
    classes: "bg-zinc-400",
  });

  // View DOM Template
  detailViewContainer.innerHTML = `
    <nav class="detail-nav col-span-full"></nav>
    <div><img src="${data.movie.posterUrl}" alt="${data.movie.title} Film Poster"></div>
    <article class="col-span-2">
      <h1 class="text-3xl mt-1 mb-2 font-semibold text-zinc-300">${data.movie.title}</h1>
      <p class="text-xl text-zinc-500 mb-4">${data.movie.tagline}</p>
      <p class="text-lg mb-2">${data.movie.description}</p>
      <a class="text-xl" href="${data.movie.homepage}">Read More</a>
    </article>

  `;

  // Register Components
  (detailViewContainer.querySelector(".detail-nav") as HTMLElement).prepend(
    backButton,
  );

  return detailViewContainer;
}
