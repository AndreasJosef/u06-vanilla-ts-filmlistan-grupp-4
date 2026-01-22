import { TMDB } from "../catalog/api";
import { getState, setState } from "../../store";

export async function showDetail(id: string) {
  setState({
    currentView: "detail",
    focusedMovieId: id,
    error: null,
  });

  const cachedMovie = getState().movieDetails[id];

  if (cachedMovie) {
    console.log("Using Cached movie ", cachedMovie.title);
    return;
  }

  const result = await TMDB.fetchMovieDetails(id);

  if (!result.ok) {
    setState({ error: result.error });
    return;
  }

  console.log(result.value);

  const currentState = getState();
  setState({
    movieDetails: {
      ...currentState.movieDetails,
      [id]: result.value,
    },
  });
}
