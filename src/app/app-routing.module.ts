import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {MovieComponent} from './views/movie/movie.component';
import {FavoritesComponent} from './views/favorites/favorites.component';
import {NotFoundComponent} from './views/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'movie/:id', component: MovieComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
