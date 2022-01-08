import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { selectFavouriteJokes } from 'src/app/store/joke.selectors';
import { Joke } from '../../models/Joke.model';
import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css'],
})
export class FavouriteJokesComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  public isLoading = false;
  public declare favouriteJokes: Joke[];

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(JokeActions.getFavouriteJokes());
    this.store$
      .select(selectFavouriteJokes)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((jokes) => (this.favouriteJokes = jokes));
  }

  onDeleteJoke(index: number): void {
    this.store$.dispatch(JokeActions.deleteFavouriteJoke({ index: index }));
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
