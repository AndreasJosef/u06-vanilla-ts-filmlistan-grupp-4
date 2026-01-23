import "./global.css";

import type { ViewCleanup, ViewElement } from "./types.ts";

import { setRenderCallback, getState } from "./store";
import { createRootView } from "./app/root/view.ts";

import { showCatalog } from "./app/catalog/actions.ts";
import { showWatchlist } from "./app/watchlist/actions.ts";
import { showDetail } from "./app/detail/actions.ts";

// Track current view cleanup function
let currentViewCleanup: ViewCleanup | null = null;

// Get the app root element
const app = document.querySelector("#app")!;

// Mapping url -> to actions
const handleRoute = () => {
  const path = window.location.pathname;

  const detailPattern = /^\/detail\/(\d+)$/;
  const detailMatch = path.match(detailPattern);

  if (detailMatch) {
    const id = detailMatch[1];
    showDetail(id);
    return;
  }

  if (path === "/") {
    showCatalog();
    return;
  }

  if (path === "/watchlist") {
    showWatchlist();
    return;
  } else {
    // TODO: Make a not found view plus action to show
    console.log("Not found!");
    return;
  }
};

// Funktionen som renderar sidan on every state change
const renderApp = () => {
  const state = getState();

  // Cleanup after previous view before rendering new one
  if (currentViewCleanup) {
    currentViewCleanup();
    currentViewCleanup = null;
  }

  // Simply wipe the whole page
  app.innerHTML = "";

  // UI = f(State);
  const rootView: ViewElement = createRootView(state);
  app.appendChild(rootView);

  // Store cleanup for calling on next re-render function if available
  if (rootView.cleanup) {
    currentViewCleanup = rootView.cleanup;
  }
};

// App rerenders on every state change
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
