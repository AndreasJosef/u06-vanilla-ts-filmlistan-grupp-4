import type { AppState, ViewElement } from "../../types";

export function detailView(state: AppState): ViewElement {
  const detail = document.createElement("div") as ViewElement;
  const { current_detail } = state;

  detail.innerHTML = `

    <h1>Hello</h1>
  `;

  return detail;
}
