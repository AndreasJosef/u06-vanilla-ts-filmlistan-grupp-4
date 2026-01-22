import { setState } from "../../store";

export function showDetail(id: string) {
  setState({
    currentView: "detail",
  });

  console.log(id);
}
