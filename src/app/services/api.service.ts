import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Genre} from '../../assets/types/Genre';
import {Movie, Movies, MovieWithGenres, MovieWithDetails} from '../../assets/types/Movie';
import {map} from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private url = 'http://api.themoviedb.org/3/';
  private apiKey = 'api_key=e7cb0935896346bde33f63f99fb42ead';
  private imageUrl = 'http://image.tmdb.org/t/p/w342';
  private logoUrl = 'http://image.tmdb.org/t/p/w45';
  getMovies(query = '', page = 1): Observable<Movies<MovieWithGenres> > {
    const genresUrl = `${this.url}genre/movie/list?${this.apiKey}`;
    const path = query ? 'search/movie' : 'movie/popular';
    const searchQuery = query ? `&query=${query}` : '';
    const movieUrl = `${this.url}${path}?${this.apiKey}&page=${page}${searchQuery}`;
    return forkJoin([this.http.get<{genres: Genre[] }>(genresUrl),
      this.http.get<Movies<Movie>>(movieUrl)])
      .pipe(map(([genres, movies]) => {
        return this.changeGenreIdsOnGenres(genres, movies);
      }));
  }
  getDetailMovieById(id: number): Observable<MovieWithDetails> {
    const movieUrl = `${this.url}movie/${id}?${this.apiKey}`;
    return this.http.get<MovieWithDetails>(movieUrl)
      .pipe(map(movie => {
        const companies = movie.production_companies
          .map(company => ({...company, logo_path: this.logoUrl + company.logo_path}));
        return {...movie, poster_path: this.imageUrl + movie.poster_path, production_companies: companies};
      }));
  }
  private changeGenreIdsOnGenres(genres: {genres: Genre[]}, movies: Movies<Movie>): Movies<MovieWithGenres>{
    const moviesWithGenres: Array<MovieWithGenres> = movies.results.map((movie) => {
      const newGanres = genres.genres.filter(genre => {
        let result = false;
        movie.genre_ids.forEach(id => {
          if (id === genre.id) { result = true; }
        });
        return result;
      });
      return {...movie, genres: newGanres,
        poster_path: this.imageUrl + movie.poster_path };
    });
    const mov = {...movies, results: moviesWithGenres};
    return mov;
  }
  getRecommendationById(id: number): Observable<Movies<MovieWithGenres>> {
    const genresUrl = `${this.url}genre/movie/list?${this.apiKey}`;
    const movieUrl = `${this.url}movie/${id}/recommendations?${this.apiKey}`;
    return forkJoin([this.http.get<{genres: Genre[] }>(genresUrl),
      this.http.get<Movies<Movie>>(movieUrl)])
      .pipe(map(([genres, movies]) => {
        return this.changeGenreIdsOnGenres(genres, movies);
        }
      ));
  }
}
