import type { AppState, ViewElement } from "./types";

import { browseView } from "./app/catalog/view";
import { watchlistView } from "./app/watchlist/view";

import headerHTML from "./components/static/header/index.html?raw";
import footerHTML from "./components/static/footer/index.html?raw";

export function createRootView(state: AppState): ViewElement {
  const root = document.createElement("div") as ViewElement;
  root.className = "app";

  // Header and Footer
  const headerContainer = document.createElement("header");
  const footerContainer = document.createElement("footer");

  headerContainer.innerHTML = headerHTML;
  footerContainer.innerHTML = footerHTML;

  // Active Page - switching on state as opposed to url
  let pageContent: ViewElement;

  switch (state.currentView) {
    case "catalog":
      pageContent = browseView(state);
      break;
    case "watchlist":
      pageContent = watchlistView(state);
      break;
    default:
      pageContent = document.createElement("div");
      pageContent.innerText = "404 Not Found";
  }

  // Build the DOM
  root.appendChild(headerContainer);
  root.appendChild(pageContent);
  root.appendChild(footerContainer);

  // Attach cleanup from the current view so we can call it in main
  if (pageContent.cleanup) {
    root.cleanup = pageContent.cleanup;
  }

  return root;
}
