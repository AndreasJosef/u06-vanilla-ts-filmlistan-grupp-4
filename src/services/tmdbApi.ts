import { type TMDBMovie } from "../types/movie";

// API-anrop till TMDB API
const TMBD_ENDPOINTS = {
  base: 'https://api.themoviedb.org/3/movie/popular',
  search:'https://api.themoviedb.org/3/search/movie?query=' 
}

const AUTH_HEADER = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2E2ZmY2MjhkYzk4MDAyOGNjYjlhZDg4OThkMTZiMyIsIm5iZiI6MTc2Nzg2MDEyNi4yMzQsInN1YiI6IjY5NWY2NzllNzZmMzZkZjIxZTM5MDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AUx93NnmVSoXNa2iNARzmq6xQIeafR7cdX7uIQlAvIU'
  }

const options = {
  method: 'GET',
  headers: AUTH_HEADER
};

const getPopularMovies = async () => await requestTMDB<TMDBMovie[]>(TMBD_ENDPOINTS.base);

const searchMovie = async (searchText: string) => {

  return await requestTMDB<TMDBMovie[]>(TMBD_ENDPOINTS.search+searchText);

}


// Generic TMDB request
export async function requestTMDB<TResponse>(
  url: string,
  config: RequestInit = options
   
// This function is async, it will return a Promise:
): Promise<TResponse> {
    
  // Inside, we call the `fetch` function with 
  // a URL and config given:
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.results)
        return data.results as TResponse
    })
}

export const TMDB = {
  getPopularMovies,
  searchMovie
}