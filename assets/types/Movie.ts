import {Genre} from './Genre';
import {Company} from './Company';
import {Country} from './Country';


export interface Movies<T extends Movie|MovieWithGenres|IsFavoriteMovieWithGenres> {
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<T>;
}



export interface Movie {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: Array<number>;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}
export interface MovieWithGenres extends Omit<Movie, 'genre_ids'>{
  genres: Array<Genre>;
}
export interface IsFavoriteMovieWithGenres extends MovieWithGenres{
  isFavorite: boolean;
}

export interface MovieWithDetails extends MovieWithGenres{
  production_companies: Array<Company>;
  production_countries: Array<Country>;
  tagline: string;
  imdb_id: string;
  runtime: number;
  budget: number;
}
export interface IsFavoriteMovieWithDetails extends MovieWithDetails, IsFavoriteMovieWithGenres{
}
