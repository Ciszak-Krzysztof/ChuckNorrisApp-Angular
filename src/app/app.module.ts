import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { JokeComponent } from './components/joke/joke.component';
import { JokeService } from './services/joke.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FavouriteJokesComponent } from './components/favourite-jokes/favourite-jokes.component';
import { FavouriteJokesService } from './services/favourite-jokes.service';
import { JokeImageComponent } from './components/joke/joke-image/joke-image.component';
import { JokeCategoryComponent } from './components/joke/joke-category/joke-category.component';
import { JokeSaveComponent } from './components/joke/joke-save/joke-save.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    HeaderComponent,
    FavouriteJokesComponent,
    JokeImageComponent,
    JokeCategoryComponent,
    JokeSaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [JokeService, FavouriteJokesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
