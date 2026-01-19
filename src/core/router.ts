// Instruct browser to update url
export function navigateTo(path: string) {
  // add it to browser history
  window.history.pushState({}, "", path);

  // crete and trigger the acutal navigation
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
}

// Helper function that returns current path
export function getCurrentPath() {
  return window.location.pathname;
}
