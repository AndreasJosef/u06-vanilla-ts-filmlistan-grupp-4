export interface GalleryCardProps {
  id: string;
  title: string;
  posterUrl: string;
  isSaved: boolean;
  showRemoveButton?: boolean;
  onToggle: () => void;
}

export function createGalleryCard(props: GalleryCardProps) {
  const card = document.createElement("div");

  card.innerHTML = `
          <li class="rounded-sm cursor-pointer" data-tmdb-id="${props.id}">
            <a href='/detail/${props.id}'>
              <img class="rounded" src="${props.posterUrl}" alt="${props.title}">
            </a>
          </li>`;

  // Create add button;
  const button = document.createElement("button");
  button.className = "rounded px-3 py-1 cursor-pointer";

  if (props.showRemoveButton) {
    button.textContent = "Delete";
    button.classList.add("bg-red-400");
  } else {
    if (!props.isSaved) {
      button.textContent = "Add";
      button.classList.add("bg-cyan-400");
    } else {
      button.textContent = "Saved";
      button.classList.add("bg-green-400");
      button.disabled = true;
    }
  }


  // run the the actions that were
  button.addEventListener("click", (e) => {
    e.preventDefault()
    props.onToggle();
  });

  card.appendChild(button);

  return card;
}
