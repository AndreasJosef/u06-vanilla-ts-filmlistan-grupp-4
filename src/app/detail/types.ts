import { type MovieDetail } from "../../shared/types/movies";

export interface DetailViewModel {
  movie: MovieDetail;
  isSaved: boolean;
  isSeen: boolean;
}
