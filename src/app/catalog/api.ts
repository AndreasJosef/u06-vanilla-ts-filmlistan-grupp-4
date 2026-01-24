import { type Movie } from "../../shared/types/movies";
import { type MovieDetail } from "../../shared/types/movies";
import { fetchSafeItem, fetchSafeList } from "../../core/api-engine";
import { parseTMDBDetail, parseTmdbMovie } from "./parser";

// Config
const TMBD_ENDPOINTS = {
  base: "https://api.themoviedb.org/3/movie/popular",
  search: "https://api.themoviedb.org/3/search/movie?query=",
  detail: "https://api.themoviedb.org/3/movie/",
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
const fetchPopularMovies = async () =>
  await fetchSafeList<Movie>(TMBD_ENDPOINTS.base, parseTmdbMovie, config);

// Search for a movie on TMDB
const fetchMovies = async (searchText: string) =>
  await fetchSafeList<Movie>(
    TMBD_ENDPOINTS.search + searchText,
    parseTmdbMovie,
    config,
  );

// Fetch Movie Details from TMDB
const fetchMovieDetails = async (id: string) => {
  console.log("Fetching Movie: ", id);
  return await fetchSafeItem<MovieDetail>(
    TMBD_ENDPOINTS.detail + id,
    parseTMDBDetail,
    config,
  );
};

// Return all query functions on single Interface
export const TMDB = {
  fetchPopularMovies,
  fetchMovies,
  fetchMovieDetails,
};
