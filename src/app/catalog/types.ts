type CatalogItemBase = {
  tmdb_id: string;
  title: string;
  description: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
};

export type CatalogItemDetail = CatalogItemBase & {
  // TODO refine definition: User different Endpoints like credits, and detail to populate the detail modal with this
  actors: string; // Credits -> known_for.. acting
  summary: string; // Some fields from details, tagline and recommendations
};

export type CatalogItem = CatalogItemBase | CatalogItemDetail;
