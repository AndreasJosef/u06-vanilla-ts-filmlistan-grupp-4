import type { Movie } from "../../shared/types/movies";

export interface GalleryItemViewModel {
  id: string;
  dbId: string | null;
  title: string;
  posterUrl: string;
  isSaved: boolean;
  payload: Movie;
}

export interface CatalogViewModel {
  view_mode: string;
  movies: GalleryItemViewModel[];
}
