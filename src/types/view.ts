import type { AppState } from "../lib/store";

/**
 * Cleanup function that removes event listeners, timers, and other resources
 * when a view is destroyed. This prevents memory leaks in single-page applications.
 *
 * Cleanup is automatically called before a new view renders, ensuring
 * no resource accumulation during navigation.
 */
export type ViewCleanup = () => void;

/**
 * Extended HTMLElement interface for view components that includes cleanup functionality.
 * Views should attach cleanup functions to properly manage memory.
 */
export interface ViewElement extends HTMLElement {
  /** Optional cleanup function called when view is destroyed */
  cleanup?: ViewCleanup;
}

/**
 * View component function that returns either a string (for static content)
 * or a ViewElement with optional cleanup for dynamic content.
 */
export type ViewComponent = (state?: AppState) => ViewElement | string;

