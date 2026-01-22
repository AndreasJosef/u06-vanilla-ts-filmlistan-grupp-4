import type { GalleryItemViewModel } from "./model";

// Domain Model
export type CatalogItem = {
  tmdb_id: string;
  title: string;
  description: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
};

// TODO: Should add the detail type here as an extension of item base and then make this whole thing global so I can use it in both parsers wich I should also make global!

// View Models
export type CatalogItemViewModel = CatalogItem & {
  inWatchlist: boolean;
};

export interface CatalogViewModel {
  view_mode: string;
  movies: GalleryItemViewModel[];
}
