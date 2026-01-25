import { type Movie } from "../../shared/types/movies";

import { getState, setState } from "../../store";
import { toast } from "../../core/toast/toast";

import {
  deleteWatchlistItem,
  getWatchlist,
  saveWatchlistItem,
  updateWatchlistItemStatus,
} from "./api";

import { createDraftFromCatalog } from "./model";
import type { WatchlistItem } from "./types";

// Sets the current View to watchlist which will trigger a rerender
export async function showWatchlist() {
  setState({ currentView: "watchlist" });

  const state = getState();

  if (state.watchlist.length === 0) {
    await loadWatchlist();
  }
}

// Loads users watchlist from the backend
export async function loadWatchlist() {
  const state = getState();

  if (state.watchlist.length) return;

  const response = await getWatchlist();

  if (response.ok) {
    setState({
      watchlist: response.value,
      error: null,
    });
  } else {
    setState({
      error: response.error,
    });
  }
}

// An Action the toggles the the given item from or to the watchlist
export async function toggleWatchlist(item: Movie, dbId: string | null) {
  if (dbId) {
    removeFromWatchlist(dbId);
  } else {
    addToWatchlist(item);
  }
}

// Adds a new movie to the users watchlist
export async function addToWatchlist(item: Movie) {
  const currentList = getState().watchlist;
  const newItem = createDraftFromCatalog(item);

  // optimistic ui
  // update UI immediatley and reverse on error
  setState({
    watchlist: [newItem, ...currentList],
  });

  const response = await saveWatchlistItem(newItem);

  if (response.ok) {
    const currentList = getState().watchlist;
    const updatedList = currentList.map((movie) =>
      movie.tmdb_id === response.value?.tmdb_id ? response.value : movie,
    );
    setState({
      watchlist: updatedList,
    });
  }

  if (!response.ok) {
    setState({
      watchlist: currentList,
    });

    toast.error("Could not add movie to watchlist");
    return;
  }

  toast.success("Added to watchlist");
}

// Delets a movie from the users watchlist
export async function removeFromWatchlist(movieId: string) {
  const currentList = getState().watchlist;
  const deletedItem = currentList.find((movie) => movie.id === movieId);

  const updatedList = currentList.filter((movie) => movie.id !== movieId);
  setState({ watchlist: updatedList });

  try {
    await deleteWatchlistItem(movieId);
  } catch (error) {
    setState({
      watchlist: currentList,
      error: error instanceof Error ? error.message : "Failed to remove movie",
    });
    toast.error("Failed to remove movie");
  }

  toast.success(
    `Deleted Movie: ${deletedItem ? deletedItem.title : "Deleted Movie"}`,
  );
}

/**
 * Toggles the watched status of a movie in the users watchlist
 * @param dbId  - The database id of the movie to updated
 * @param status - The current isSeen status of the movie
 **/
export async function toggleSeenStatus(
  dbId: string | null,
  currentStatus: "watchlist" | "watched",
) {
  if (!dbId) return;
  const newStatus = currentStatus === "watchlist" ? "watched" : "watchlist";
  const currentWatchlist = getState().watchlist;

  // Update the UI immediately
  // mapping over the current watchlist to create a copy then patch the item that matches given db with the new status
  const updatedWatchlist = currentWatchlist.map((movie) => {
    if (movie.id !== dbId) return movie;

    if (newStatus === "watched") {
      return {
        ...movie,
        date_watched: new Date().toISOString(),
        personal_rating: 1,
        status: "watched",
        is_favorite: false,
        review: "",
      } as WatchlistItem;
    }

    return {
      ...movie,
      status: "watchlist",
    } as WatchlistItem;
  });

  setState({
    watchlist: updatedWatchlist,
  });

  const updatedMovie = updatedWatchlist.find((m) => m.id === dbId);
  if (!updatedMovie) return;

  // then result to server via api
  const response = await updateWatchlistItemStatus(dbId, updatedMovie);

  // if it fails revert ui
  if (response.ok) {
    console.log(response.value);
  }
}

export async function saveMovieRating(id: string | null, rating: number) {
  if (!id) return;
  const previousWatchlist = getState().watchlist;

  setState({
    watchlist: previousWatchlist.map((movie) => {
      if (movie.id !== id) return movie;

      if (movie.status === "watched") {
        return {
          ...movie,
          personal_rating: rating,
        };
      }

      return {
        ...movie,
        status: "watched",
        personal_rating: rating,

        // apply defaults here because movie was not added to watched
        date_watched: new Date().toISOString(),
        is_favorite: false,
        review: "",
      };
    }),
  });

  const updatedMovie = getState().watchlist.find((m) => m.id === id);
  if (!updatedMovie) return;

  const result = await updateWatchlistItemStatus(id, updatedMovie);

  if (result.ok) {
    console.log(result.value);
    return;
  }

  setState({ error: result.error });
}
