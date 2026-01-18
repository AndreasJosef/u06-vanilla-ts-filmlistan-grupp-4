// src/services/movieApi.ts
import { type MovieFromDB } from "./types";

const API_BASE_URL = "http://localhost:3000/api";

export async function getWatchlist(): Promise<MovieFromDB[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/movies?status=watchlist`);

    if (!response.ok) {
      throw new Error("Failed to fetch watchlist");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error; // låt anropande kod hantera felet (t.ex. visa felmeddelande i UI:t)
  }
}
