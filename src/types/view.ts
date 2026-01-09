import type { AppState } from "../lib/store";

/**
 * Cleanup function that removes event listeners, timers, and other resources
 * when a view is destroyed. This prevents memory leaks in single-page applications.
 * 
 * ## Usage Pattern
 * 
 * Every view function should implement cleanup for any resources it creates:
 * 
 * @example
 * ```typescript
 * export default function myView(): ViewElement {
 *   const element = document.createElement('div');
 *   const button = document.createElement('button');
 *   
 *   const handleClick = () => console.log('clicked');
 *   button.addEventListener('click', handleClick);
 *   
 *   element.appendChild(button);
 *   
 *   // Attach cleanup function to the view element
 *   (element as ViewElement).cleanup = () => {
 *     button.removeEventListener('click', handleClick);
 *     // Also clear timers, intervals, etc.
 *     clearInterval(timerId);
 *     clearTimeout(timeoutId);
 *   };
 *   
 *   return element;
 * }
 * ```
 * 
 * ## What to Clean Up
 * 
 * - Event listeners (`removeEventListener`)
 * - Timers (`clearTimeout`, `clearInterval`) 
 * - WebSockets and network connections
 * - Subscriptions to observables
 * - Any external resources that need manual disposal
 * 
 * ## When Cleanup Runs
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