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
    this.favouriteJokes = this.store.select('joke');
  }

  onDeleteJoke(index: number): void {
    this.store.dispatch(new JokeActions.DeleteFavouriteJoke(index));
  }
}
