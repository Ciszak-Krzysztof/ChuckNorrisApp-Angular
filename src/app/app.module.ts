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

import { JokeComponent } from './joke/joke.component';
import { JokeService } from './joke/joke.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FavouriteJokesComponent } from './favourite-jokes/favourite-jokes.component';
import { FavouriteJokesService } from './favourite-jokes/favourite-jokes.service';

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    HeaderComponent,
    FavouriteJokesComponent,
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
  ],
  providers: [JokeService, FavouriteJokesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
