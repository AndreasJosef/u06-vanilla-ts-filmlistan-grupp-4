// RootView Model.
// Input AppState
// Output RootViewModel with the current layout based on the current view
import { type AppState } from "../../types";

type LayoutType = "focused" | "standard";

export interface RootViewModel {
  layout: LayoutType;
}

export function getRootViewModel(state: AppState): RootViewModel {
  switch (state.currentView) {
    case "detail":
      return { layout: "focused" };
    default:
      return { layout: "standard" };
  }
}
