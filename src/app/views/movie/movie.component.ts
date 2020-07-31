import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FavoritesService} from '../../services/favorites.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {IsFavoriteMovieWithDetails, IsFavoriteMovieWithGenres, Movies, MovieWithDetails, MovieWithGenres} from 'src/assets/types/Movie';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private http: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private favoritesService: FavoritesService) { }
  movieDetail: IsFavoriteMovieWithDetails;
  recommendations: Movies<IsFavoriteMovieWithGenres> = {
    page: 1,
    total_results: 1,
    total_pages: 1,
    results: [],
  };
  isFetching = false;
  error: string;
  addToFavoritesHandler(): void {
    this.favoritesService.addToFavorites(this.movieDetail);
    this.movieDetail.isFavorite = true;
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.route.params.pipe(
      switchMap(params => {
        return forkJoin([this.fetchMovie(params.id),
          this.fetchRecommendations(params.id)]);
      }),
    ).subscribe(([movie, recommendations]) => {
        this.isFetching = false;
        this.movieDetail = movie;
        this.recommendations = recommendations;
      },
      (error) => {
        this.isFetching = false;
        this.error = error?.message;
      });
  }
  fetchMovie(id: number): Observable<IsFavoriteMovieWithDetails> {
    return this.http.getDetailMovieById(id)
      .pipe(map((movie): IsFavoriteMovieWithDetails => {
        const favorites = this.favoritesService.getFavorites();
        const isFav = !!favorites.filter((fav) => fav.id === movie.id).length;
        return {...movie, isFavorite: isFav};
      }));
  }

  fetchRecommendations(id: number): Observable<Movies<IsFavoriteMovieWithGenres>> {
    return this.http.getRecommendationById(id)
      .pipe(map((item): Movies<IsFavoriteMovieWithGenres> => {
        const favorites = this.favoritesService.getFavorites();
        const results = item.results.map((movie) => {
          const isFav = !!favorites.filter((fav) => fav.id === movie.id).length;
          return {...movie, isFavorite: isFav};
        });
        return {...item, results};
      }));
  }
}
