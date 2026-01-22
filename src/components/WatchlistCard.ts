
import type { WatchlistCardViewModel } from "../app/watchlist/types";

export function createWatchlistCard(props: WatchlistCardViewModel) {
  const card = document.createElement("div");

  card.innerHTML = `
    <li class="rounded-sm cursor-pointer" data-tmdb-id="${props.id}">
      <img class="rounded" src="${props.posterUrl}" alt="${props.title}">
    </li>
`;

  const button = document.createElement("button");
  button.className = "rounded px-3 py-1 cursor-pointer bg-red-400";
  button.textContent = "Remove";

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    props.onToggle();
  });
}
