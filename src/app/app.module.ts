import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MainComponent } from './views/main/main.component';
import { MovieComponent } from './views/movie/movie.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { NotFoundComponent } from './views/not-found/not-found.component';


import {DemoNgZorroAntdModule} from './ng-zorro-antd.module';
import { TitleComponent } from './shared/title/title.component';
import { ItemComponent } from './shared/item/item.component';
import { ImageComponent } from './shared/image/image/image.component';
import { ErrorComponent } from './shared/error/error.component';
import { LoaderComponent } from './shared/loader/loader.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MovieComponent,
    FavoritesComponent,
    NotFoundComponent,
    TitleComponent,
    ItemComponent,
    ImageComponent,
    ErrorComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
