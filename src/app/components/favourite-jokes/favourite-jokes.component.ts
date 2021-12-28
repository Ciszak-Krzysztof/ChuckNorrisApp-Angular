import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Joke } from '../../models/Joke.model';

import * as fromApp from '../../store/app.reducer';
import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  public isLoading: boolean = false;
  public declare favouriteJokes: Joke[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(JokeActions.getFavouriteJokes());
    this.store
      .select('joke')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((joke) => (this.favouriteJokes = joke.favouriteJokes));
  }

  onDeleteJoke(index: number): void {
    const favJokes: Joke[] = JSON.parse(
      localStorage.getItem('favouriteJokes') || '[]'
    );
    favJokes.splice(index, 1);
    localStorage.setItem('favouriteJokes', JSON.stringify(favJokes));
    this.store.dispatch(JokeActions.deleteFavouriteJoke({ index: index }));
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
