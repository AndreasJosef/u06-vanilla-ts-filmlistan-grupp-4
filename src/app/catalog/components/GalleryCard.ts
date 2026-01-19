import { type CatalogItem } from "../types";

export function createGalleryCard(item: CatalogItem) {
  const el = document.createElement("div");

  const template = `
          <li class="rounded-sm cursor-pointer" data-tmdb-id="${item.tmdb_id}">
            <img class="rounded" src="${item.poster_path}" alt="${item.title}">
            <button class="bg-cyan-400 rounded px-3 py-1 cursor-pointer">Add</button>
          </li>`;

  el.innerHTML = template;

  console.log(el);

  return el;
}
