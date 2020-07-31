import { Injectable } from '@angular/core';
import {IsFavoriteMovieWithGenres} from '../../assets/types/Movie';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor() { }
  getFavorites(): Array<IsFavoriteMovieWithGenres>  {
    const result = localStorage.getItem('movies');
    const movies: Array<IsFavoriteMovieWithGenres> = result ? JSON.parse(result) : [];
    return movies;
  }
  addToFavorites(movie: IsFavoriteMovieWithGenres): void {
    const movies: Array<IsFavoriteMovieWithGenres> = this.getFavorites();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }
  removeFavorite(id: number): void {
    const movies: Array<IsFavoriteMovieWithGenres> = this.getFavorites();
    const newMovies = movies.filter((movie) => movie.id !== id);
    localStorage.setItem('movies', JSON.stringify(newMovies));
  }
}
