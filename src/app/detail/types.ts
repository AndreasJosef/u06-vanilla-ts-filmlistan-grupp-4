import { type MovieDetail } from "../../shared/types/movies";

export interface DetailViewModel {
  movie: MovieDetail;
  dbId: string | null;
  isSaved: boolean;
  isSeen: boolean;
}
