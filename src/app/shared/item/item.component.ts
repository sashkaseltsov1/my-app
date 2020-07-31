import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IsFavoriteMovieWithGenres, MovieWithGenres} from '../../../assets/types/Movie';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  constructor(private favoritesService: FavoritesService) { }
  @Input() item: IsFavoriteMovieWithGenres;
  @Output() onRemovedFromFavorites = new EventEmitter<number>();
  @Input() isAddBtn = true;
  addToFavoritesHandler(): void {
    this.favoritesService.addToFavorites(this.item);
    this.item.isFavorite = true;
  }
  removeFromFavoritesHandler(): void {
    this.onRemovedFromFavorites.emit(this.item.id);
  }
}
