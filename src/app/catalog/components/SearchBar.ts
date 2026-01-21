// A component that renders the the search input and then dynamically a button the triggers either search or clear action depending on AppState view_mode
import { createButton } from "../../../components/Button";
import { createInput } from "./search";

interface SearchBarProps {
  isSearchMode: boolean;
  onSearch: (query: string) => void;
  onClear: () => void;
}

export function createSearchBar(props: SearchBarProps) {
  const searchBar = document.createElement("div");
  searchBar.className = "flex items-center gap-2 w-full";

  // Creating the search input component
  const input = createInput({
    type: "text",
    name: "search",
    placeholder: "Search Movies..",
  });

  // Wrapping the search action for easy registration on button
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
      value: "Search",
      onClick: triggerSearchAction,
    });
  } else {
    actionButton = createButton({
      value: "Clear",
      onClick: props.onClear,
    });
  }

  // Assemble the SearchBar
  searchBar.appendChild(input);
  searchBar.appendChild(actionButton);

  searchBar.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") triggerSearchAction();
  });

  return searchBar;
}
