import "./global.css";

import type { ViewCleanup, ViewElement } from "./types.ts";

import { setRenderCallback, getState } from "./store";
import { createRootView } from "./view.ts";

import { showCatalog } from "./app/catalog/actions.ts";
import { showWatchlist } from "./app/watchlist/actions.ts";

// Track current view cleanup function
let currentViewCleanup: ViewCleanup | null = null;

// Get the app root element
const app = document.querySelector("#app")!;

// Mapping url -> to actions
const handleRoute = () => {
  const path = window.location.pathname;
  switch (path) {
    case "/":
      showCatalog();
      break;
    case "/watchlist":
      showWatchlist();
      break;
    default:
      console.log("not found");
      return;
  }
};

// Funktionen som renderar sidan on every state change
const renderApp = () => {
  const state = getState();

  // Cleanup previous view before rendering new one
  if (currentViewCleanup) {
    currentViewCleanup();
    currentViewCleanup = null;
  }

  app.innerHTML = "";

  const rootView: ViewElement = createRootView(state);
  app.appendChild(rootView);

  // Store cleanup function if available
  if (rootView.cleanup) {
    currentViewCleanup = rootView.cleanup;
  }
};

// Subscribe renderApp to state changes
setRenderCallback(renderApp);

// Rerender-logic
// Subscribe store to route changes
window.addEventListener("popstate", () => {
  handleRoute();
});

// Intercepta länkar och hantera navigation
// Detta förhindrar att sidan laddas om och bevarar state
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest("a");

  if (link && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    const path = new URL(link.href).pathname;
    window.history.pushState({}, "", path);
    handleRoute();
  }
});

// boot
handleRoute();
