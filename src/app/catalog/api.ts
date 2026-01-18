import { type CatalogItem } from "./types";
import { safeFetchList, safeFetchOne } from "../../core/api-engine";

// Config
const TMBD_ENDPOINTS = {
  base: "https://api.themoviedb.org/3/movie/popular",
  search: "https://api.themoviedb.org/3/search/movie?query=",
};

const AUTH_HEADER = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2E2ZmY2MjhkYzk4MDAyOGNjYjlhZDg4OThkMTZiMyIsIm5iZiI6MTc2Nzg2MDEyNi4yMzQsInN1YiI6IjY5NWY2NzllNzZmMzZkZjIxZTM5MDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AUx93NnmVSoXNa2iNARzmq6xQIeafR7cdX7uIQlAvIU",
};

const options = {
  method: "GET",
  headers: AUTH_HEADER,
};

// Functions to query endpoints
// TODO: Refactor to use safeFetchList()
const getPopularMovies = async () =>
  await requestTMDB<CatalogItem[]>(TMBD_ENDPOINTS.base);

// TODO: Refactor to use safeFetchOne()
const searchMovie = async (searchText: string) => {
  return await requestTMDB<CatalogItem[]>(TMBD_ENDPOINTS.search + searchText);
};

// TODO: Remove once safeFetch is implemented and connected
// Typed request Wrapper
export async function requestTMDB<TResponse>(
  url: string,
  config: RequestInit = options,

  // This function is async, it will return a Promise:
): Promise<TResponse> {
  // Inside, we call the `fetch` function with
  // a URL and config given:
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      return data.results as TResponse;
    });
}

export const TMDB = {
  getPopularMovies,
  searchMovie,
};
