import type { AppState, ViewElement } from "../../types";

import { browseView } from "../catalog/view";
import { watchlistView } from "../watchlist/view";
import { detailView } from "../detail/view";

import headerHTML from "../../shared/components/static/header/index.html?raw";
import footerHTML from "../../shared/components/static/footer/index.html?raw";
import { getRootViewModel } from "./model";

export function createRootView(state: AppState): ViewElement {
  const root = document.createElement("div") as ViewElement;
  const { layout } = getRootViewModel(state);

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
    case "detail":
      pageContent = detailView(state);
      break;
    default:
      pageContent = document.createElement("div");
      pageContent.innerText = "404 Not Found";
  }

  if (layout === "standard") {
    root.appendChild(headerContainer);
    root.appendChild(pageContent);
    root.appendChild(footerContainer);
  }

  if (layout === "focused") {
    root.appendChild(pageContent);
  }

  // Build the DOM

  // Attach cleanup from the current view so we can call it in main
  if (pageContent.cleanup) {
    root.cleanup = pageContent.cleanup;
  }

  return root;
}
