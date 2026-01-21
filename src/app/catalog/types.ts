// Domain Model
export type CatalogItem = {
  tmdb_id: string;
  title: string;
  description: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
};

// View Models
export type CatalogItemViewModel = CatalogItem & {
  inWatchlist: boolean;
};

export interface CatalogViewModel {
  view_mode: string;
  movies: CatalogItemViewModel[];
}
