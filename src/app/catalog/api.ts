import { type CatalogItem } from "./types";
import { safeFetchList } from "../../core/api-engine";
import { parseTmdbMovie } from "./parser";

// Config
const TMBD_ENDPOINTS = {
  base: "https://api.themoviedb.org/3/movie/popular",
  search: "https://api.themoviedb.org/3/search/movie?query=",
};

// TODO: Move token into an .env file
const AUTH_HEADER = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2E2ZmY2MjhkYzk4MDAyOGNjYjlhZDg4OThkMTZiMyIsIm5iZiI6MTc2Nzg2MDEyNi4yMzQsInN1YiI6IjY5NWY2NzllNzZmMzZkZjIxZTM5MDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AUx93NnmVSoXNa2iNARzmq6xQIeafR7cdX7uIQlAvIU",
};

const config: RequestInit = {
  method: "GET",
  headers: AUTH_HEADER,
};

// Loads the popular movies list from TMDB
const getPopularMovies = async () =>
  await safeFetchList<CatalogItem>(TMBD_ENDPOINTS.base, parseTmdbMovie, config);

// Search for a movie on TMDB
const searchMovie = async (searchText: string) =>
  await safeFetchList<CatalogItem>(
    TMBD_ENDPOINTS.search + searchText,
    parseTmdbMovie,
    config,
  );

// Return all query functions on single Interface
export const TMDB = {
  getPopularMovies,
  searchMovie,
};
