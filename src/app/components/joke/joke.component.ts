import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { Joke } from '../../models/Joke.model';
import { Subject } from 'rxjs';
import * as JokeActions from '../../store/joke.actions';
import { selectJokes } from 'src/app/store/joke.selectors';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  public favouriteJokes: Joke[] = [];
  public isLoading = false;
  public impersonateName = '';
  public isChuck = true;
  public isFavourite = false;
  public joke: Joke = {
    id: 0,
    joke: '',
  };
  public selectedCategory = '';
  public firstName = 'Chuck';
  public lastName = 'Norris';

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(JokeActions.getRandomJoke());
    this.store$
      .select(selectJokes)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((jokeStore) => {
        (this.favouriteJokes = jokeStore.favouriteJokes),
          (this.joke = jokeStore.joke),
          (this.isLoading = jokeStore.isLoading),
          (this.isFavourite = !this.favouriteCheck(this.joke) ? false : true);
      });
  }

  public onToggleFavourite(): void {
    if (!this.favouriteCheck(this.joke)) {
      this.store$.dispatch(JokeActions.addFavouriteJoke({ joke: this.joke }));
    } else {
      const index: number = this.favouriteJokes.findIndex(
        (newJoke) => newJoke.id === this.joke.id
      );
      this.store$.dispatch(JokeActions.deleteFavouriteJoke({ index: index }));
    }
  }

  public selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  public fetchJoke(): void {
    if (this.impersonateName.length !== 0) {
      this.isChuck = false;
      this.firstName = this.impersonateName.split(' ')[0];
      this.lastName = this.impersonateName.split(' ')[1] ?? '';
    } else {
      this.isChuck = true;
      this.firstName = 'Chuck';
      this.lastName = 'Norris';
    }
    this.store$.dispatch(
      JokeActions.getJoke({
        category: this.selectedCategory,
        firstName: this.firstName,
        lastName: this.lastName,
      })
    );
    this.store$
      .select(selectJokes)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((jokeStore) => {
        this.joke = jokeStore.joke;
        this.isLoading = jokeStore.isLoading;
      });
  }

  public favouriteCheck(joke: Joke): Joke | undefined {
    this.store$
      .select(selectJokes)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((favJokes) => (this.favouriteJokes = favJokes.favouriteJokes));
    return this.favouriteJokes.find((newjoke) => newjoke.id === joke.id);
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
