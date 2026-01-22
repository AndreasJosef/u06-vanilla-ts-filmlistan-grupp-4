export interface GalleryCardProps {
  id: string;
  title: string;
  posterUrl: string;
  isSaved: boolean;
  onToggle: () => void;
}

export function createGalleryCard(props: GalleryCardProps) {
  const card = document.createElement("div");

  card.innerHTML = `
          <li class="rounded-sm cursor-pointer" data-tmdb-id="${props.id}">
            <img class="rounded" src="${props.posterUrl}" alt="${props.title}">
          </li>`;

  // Create add button;
  const button = document.createElement("button");
  button.className = "rounded px-3 py-1 cursor-pointer";

  if (!props.isSaved) {
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
    props.onToggle();
  });

  card.appendChild(button);

  return card;
}
