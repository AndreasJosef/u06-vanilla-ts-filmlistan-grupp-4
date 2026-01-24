import type { AppState, ViewElement } from "../../types";
import { getDetailViewModel } from "./model";
import { createButton } from "../../shared/components/Button";
import { addToWatchlist, removeFromWatchlist } from "../watchlist/actions";

export function detailView(state: AppState): ViewElement {
  const detailViewContainer = document.createElement("div") as ViewElement;
  detailViewContainer.className = "";
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
    value: "Close",
    onClick: () => history.back(),
    classes: "bg-zinc-500",
  });

  const toggleButton = createButton({
    value: data.isSaved ? "Remove" : "Add",
    onClick: () => {
      if (!data.isSaved) {
        addToWatchlist(data.movie);
      } else if (data.dbId) {
        removeFromWatchlist(data.dbId);
      }
    },
  });

  // View DOM Template
  detailViewContainer.innerHTML = `
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl inline-block font-semibold my-4 uppercase border-y-4 border-dashed">Movie</h1>
      <nav class="detail-nav col-span-full"></nav>
    </header>
    <section class="grid grid-cols-3 gap-8">
     <div><img src="${data.movie.posterUrl}" alt="${data.movie.title} Film Poster"></div>
     <article class="col-span-2">
       <h1 class="text-3xl mt-1 mb-2 font-semibold text-zinc-300">${data.movie.title}</h1>
       <p class="text-xl text-zinc-500 mb-4">${data.movie.tagline}</p>
       <p class="text-lg mb-2">${data.movie.overview}</p>
       <a class="text-xl" href="${data.movie.homepage}">Read More</a>
     </article>
    </section>

  `;

  // ESC key support for closing detail view
  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      history.back();
    }
  };

  document.addEventListener("keydown", handleKeypress);

  // Register Components
  (detailViewContainer.querySelector(".detail-nav") as HTMLElement).append(
    toggleButton,
    backButton,
  );

  detailViewContainer.cleanup = () => {
    document.removeEventListener("keydown", handleKeypress);
  };

  return detailViewContainer;
}
