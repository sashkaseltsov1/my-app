import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {IsFavoriteMovieWithGenres, Movies, MovieWithGenres} from '../../../assets/types/Movie';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private http: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private favoritesService: FavoritesService){}
  popularMovies: Movies<IsFavoriteMovieWithGenres> = {
    page: 1,
    total_results: 1,
    total_pages: 1,
    results: [],
  };
  search = '';
  error: string;
  isFetching = false;
  isInit = true;
  math = Math;
  ngOnInit(): void {
    this.fetchData();
  }
  async pageHandler(page: number): Promise<void> {
    if (!this.isInit){
      const params = this.search ? {
        query: this.search
      } : {};
      await this.router.navigate(['.'], {queryParams: { ...params, page} });
      this.fetchData();
    }
  }
  fetchData(): void{
    this.route.queryParams.subscribe(params => {
      this.popularMovies.page = params.page ? params.page : 1;
      this.search = params.query ? params.query : '';
      this.isFetching = true;
      this.http.getMovies(this.search, this.popularMovies.page)
        .pipe(map((item): Movies<IsFavoriteMovieWithGenres> => {
          const favorites = this.favoritesService.getFavorites();
          const results = item.results.map((movie) => {
            const isFav = !!favorites.filter((fav) => fav.id === movie.id).length;
            return {...movie, isFavorite: isFav};
          });
          return {...item, results};
        }))
        .subscribe(
        (item) => {
          this.popularMovies = item;
          this.isFetching = false;
          window.scroll(0, 0);
          if (this.isInit) { this.isInit = false; }
        },
        (error) => {
          this.error = error?.message;
          this.isFetching = false;
          if (this.isInit) { this.isInit = false; }
        });
    });
  }
  async searchHandler(): Promise<void> {
    const params = this.search ? {
      query: this.search
    } : {};
    await this.router.navigate(['.'], {queryParams: params });
    this.fetchData();
  }
}
