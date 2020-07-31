import { Component, OnInit } from '@angular/core';
import {MovieWithGenres} from '../../../assets/types/Movie';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }
  favorites: Array<MovieWithGenres> = [];
  onRemovedFromFavoritesEventHandler(id: number): void{
    this.favoritesService.removeFavorite(id);
    this.favorites = this.favoritesService.getFavorites();
  }
  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

}
