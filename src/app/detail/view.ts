import type { AppState, ViewElement } from "../../types";
import { getDetailViewModel } from "./model";
import { createButton } from "../../shared/components/Button";
import { saveMovieRating, toggleWatchlist } from "../watchlist/actions";

import { createStarRating } from "./components/StarRating";
import { createMovieStats } from "./components/MovieStats";

export function detailView(state: AppState): ViewElement {
  const detailViewContainer = document.createElement("div") as ViewElement;
  detailViewContainer.className = "";
  const data = getDetailViewModel(state);

  const stats = createMovieStats({});

  // Return Loader if content has not arrived yet
  if (!data) {
    const loader = document.createElement("p");
    // TODO: Create a loading Spinner component that I could show here and elsewhere
    loader.textContent = "Still loading the movie...";
    detailViewContainer.appendChild(loader);
    return detailViewContainer;
  }

  // Create Components
  const nav = document.createElement("nav");
  nav.className = "detail-nav flex col-span-full gap-4";

  if (data.isSaved && data.dbId) {
    const ratingButtons = createStarRating({
      initialRating: data.isSeen ? data.userRating : 0,
      onRate: (rating) => saveMovieRating(data.dbId, rating),
      interactive: true,
    });

    nav.append(ratingButtons);
  }

  const toggleButton = createButton({
    value: data.isSaved ? "Remove" : "Add",
    onClick: () => toggleWatchlist(data.movie, data.dbId),
    classes: data.isSaved
      ? "bg-amber-500 hover:bg-amber-600 backdrop-blur"
      : "bg-cyan-500 hover:bg-cyan-600",
  });
  nav.append(toggleButton);

  const backButton = createButton({
    value: "Close",
    onClick: () => history.back(),
    classes: "bg-zinc-500",
  });
  nav.append(backButton);

  // View DOM Template
  detailViewContainer.innerHTML = `
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-3xl inline-block font-semibold my-4 uppercase border-y-4 border-dashed">Movie</h1>
      <!-- <nav class="detail-nav col-span-full"></nav> -->
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
  (detailViewContainer.querySelector("header") as HTMLElement).append(nav);
  /**
  (detailViewContainer.querySelector(".detail-nav") as HTMLElement).append(
    toggleSeenButton,
    toggleButton,
    backButton,
  );**/

  detailViewContainer.cleanup = () => {
    document.removeEventListener("keydown", handleKeypress);
  };

  return detailViewContainer;
}
