import { type CatalogItemViewModel } from "../types";

interface CardActions {
  onAdd: () => void;
}

export function createGalleryCard(
  item: CatalogItemViewModel,
  actions: CardActions,
) {
  const el = document.createElement("div");

  el.innerHTML = `
          <li class="rounded-sm cursor-pointer" data-tmdb-id="${item.tmdb_id}">
            <img class="rounded" src="${item.poster_path}" alt="${item.title}">
          </li>`;

  // Create add button;
  const button = document.createElement("button");
  button.className = "rounded px-3 py-1 cursor-pointer";

  if (!item.inWatchlist) {
    button.textContent = "Add";
    button.classList.add("bg-cyan-400");
  } else {
    button.textContent = "Saved";
    button.classList.add("bg-green-400");
    button.disabled;
  }

  // run the the actions that were
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    actions.onAdd();
  });

  el.appendChild(button);

  return el;
}
