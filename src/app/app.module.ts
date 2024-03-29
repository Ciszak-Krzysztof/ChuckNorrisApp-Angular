import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';
import { JokeComponent } from './components/joke/joke.component';
import { JokeService } from './services/joke.service';
import { NotificationService } from './services/notification.service';
import { HeaderComponent } from './components/header/header.component';
import { FavouriteJokesComponent } from './components/favourite-jokes/favourite-jokes.component';
import { JokeImageComponent } from './components/joke/joke-image/joke-image.component';
import { JokeCategoryComponent } from './components/joke/joke-category/joke-category.component';
import { JokeSaveComponent } from './components/joke/joke-save/joke-save.component';
import { JokeEffects } from './store/joke.effects';
import { environment } from 'src/environments/environment';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { RatingModalComponent } from './components/ratingModal/ratingModal.component';
import { SettingsComponent } from './components/settings/settings.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
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
    SnackbarComponent,
    RatingModalComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([JokeEffects]),
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [JokeService, NotificationService, SnackbarComponent, MatDialog],
  bootstrap: [AppComponent],
})
export class AppModule {}
