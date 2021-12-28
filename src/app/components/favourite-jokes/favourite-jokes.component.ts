import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Joke } from '../../models/Joke.model';

import * as fromApp from '../../store/app.reducer';
import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit {
  public isLoading: boolean = false;
  public declare favouriteJokes: Observable<{ favouriteJokes: Joke[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(JokeActions.getFavouriteJokes());
    this.favouriteJokes = this.store.select('joke');
  }

  onDeleteJoke(index: number): void {
    const favJokes: Joke[] = JSON.parse(
      localStorage.getItem('favouriteJokes') || '[]'
    );
    favJokes.splice(index, 1);
    localStorage.setItem('favouriteJokes', JSON.stringify(favJokes));
    this.store.dispatch(JokeActions.deleteFavouriteJoke({ index: index }));
  }
}
