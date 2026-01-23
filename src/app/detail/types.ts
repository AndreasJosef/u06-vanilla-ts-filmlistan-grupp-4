export type MovieDetail = {
  id: string;
  title: string;
  tagline: string;
  homepage: string;
  description: string;
  budget: number;
  releaseDate: number;
  revenue: number;
  posterUrl: string;
  ratingTMDB: number;
  ratingUser: number;
  noteUser: string;
};

export interface DetailViewModel {
  movie: MovieDetail;
  isSaved: boolean;
  isSeen: boolean;
}
