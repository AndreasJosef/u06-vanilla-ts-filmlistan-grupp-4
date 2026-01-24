// A component that renders the the search input and then dynamically a button the triggers either search or clear action depending on AppState view_mode
import { createButton } from "../../../shared/components/Button";
import { createInput } from "./search";

export interface SearchBarProps {
  isSearchMode: boolean;
  onSearch: (query: string) => void;
  onClear: () => void;
}

export function createSearchBar(props: SearchBarProps) {
  const searchBar = document.createElement("div");
  searchBar.className = "flex items-center gap-2 w-full";

  // Create the search input component
  const input = createInput({
    type: "text",
    name: "search",
    placeholder: "Search Movies..",
  });

  // Wrap the search action for easy reuse
  const triggerSearchAction = () => {
    const value = input.value.trim();

    if (value) {
      props.onSearch(value);
      input.value = "";
    }
  };

  // Create action button based on searchMode
  let actionButton: HTMLButtonElement;
  if (props.isSearchMode) {
    actionButton = createButton({
      value: "Clear",
      onClick: props.onClear,
    });
  } else {
    actionButton = createButton({
      value: "Search",
      onClick: triggerSearchAction,
    });
  }

  // Assemble the SearchBar
  searchBar.appendChild(input);
  searchBar.appendChild(actionButton);

  // Attach listener for enter key
  searchBar.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") triggerSearchAction();
  });

  return searchBar;
}
