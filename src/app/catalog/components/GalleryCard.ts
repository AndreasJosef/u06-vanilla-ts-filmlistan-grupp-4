import { type CatalogItem } from "../types";

interface CardActions {
  onAdd: () => void;
}

export function createGalleryCard(item: CatalogItem, actions: CardActions) {
  const el = document.createElement("div");

  el.innerHTML = `
          <li class="rounded-sm cursor-pointer" data-tmdb-id="${item.tmdb_id}">
            <img class="rounded" src="${item.poster_path}" alt="${item.title}">
          </li>`;

  // Create add button;
  const button = document.createElement("button");
  button.textContent = "Add";
  button.className = "bg-cyan-400 rounded px-3 py-1 cursor-pointer";

  // run the the actions that were
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    actions.onAdd();
  });

  el.appendChild(button);

  return el;
}
