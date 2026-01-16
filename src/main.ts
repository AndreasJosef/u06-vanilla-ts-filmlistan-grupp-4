import "./style.css";
import { type AppState, setRenderCallback, getState } from "./lib/store.ts";
import type { ViewCleanup, ViewComponent } from "./types/view.ts";

// Statiska sidor
// måste refererera till den specifika .html filen med "?raw" för att kunna läsas in
import headerHTML from "./views/static/header/index.html?raw";
import footerHTML from "./views/static/footer/index.html?raw";

// Dynamiska sidor
import homeView from "./views/home/index.ts";
import watchlistView from "./views/watchlist/index.ts";

// Track current view cleanup function
let currentViewCleanup: ViewCleanup | null = null;

const currentPage = (state: AppState): ReturnType<ViewComponent> => {
  const path = window.location.pathname;
  switch (path) {
    case "/":
      return homeView(state);
    case "/watchlist":
      return watchlistView(state);
    default:
      return "404";
  }
};

const app = document.querySelector("#app")!;

// Funktionen som renderar sidan
const renderApp = () => {
  // Cleanup previous view before rendering new one
  if (currentViewCleanup) {
    currentViewCleanup();
    currentViewCleanup = null;
  }

  const page = currentPage(getState());

  if (typeof page === "string") {
    app.innerHTML = `
          ${headerHTML} 
          ${page} 
          ${footerHTML}`;
  } else {
    app.innerHTML = `${headerHTML} ${footerHTML}`;
    app.insertBefore(page, app.querySelector("footer")!);

    // Store cleanup function if available
    if (page && typeof page === "object" && "cleanup" in page && page.cleanup) {
      currentViewCleanup = page.cleanup;
    }
  }
};

// Initialisera appen
renderApp();

// Rerender-logic
// Om sidan ändras, rerenderas appen
window.addEventListener("popstate", () => {
  renderApp();
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
    renderApp();
  }
});

// Set render callback
setRenderCallback(renderApp);
