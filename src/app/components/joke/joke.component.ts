import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Joke } from '../../models/Joke.model';
import * as fromApp from '../../store/app.reducer';
import * as JokeActions from '../../store/joke.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  public favouriteJokes: Joke[] = [];
  public isLoading: boolean = false;
  public impersonateName: string = '';
  public isChuck: boolean = true;
  public isFavourite: boolean = false;
  public joke: Joke = {
    id: 0,
    joke: '',
  };
  public selectedCategory: string = '';
  public firstName: string = 'Chuck';
  public lastName: string = 'Norris';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.store.dispatch(JokeActions.getRandomJoke());
    this.store
      .select('joke')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((jokeStore) => {
        (this.favouriteJokes = jokeStore.favouriteJokes),
          (this.joke = jokeStore.joke),
          (this.isFavourite = !this.favouriteCheck(this.joke) ? false : true);
        this.isLoading = false;
      });
  }

  public onToggleFavourite(): void {
    if (!this.favouriteCheck(this.joke)) {
      this.store.dispatch(JokeActions.addFavouriteJoke({ joke: this.joke }));
    } else {
      const index: number = this.favouriteJokes.findIndex(
        (newJoke) => newJoke.id === this.joke.id
      );
      this.store.dispatch(JokeActions.deleteFavouriteJoke({ index: index }));
    }
  }

  public selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public fetchJoke(): void {
    this.isLoading = true;
    if (this.impersonateName.length !== 0) {
      this.isChuck = false;
      this.firstName = this.impersonateName.split(' ')[0];
      this.lastName = this.impersonateName.split(' ')[1] ?? '';
    } else {
      this.isChuck = true;
      this.firstName = 'Chuck';
      this.lastName = 'Norris';
    }
    this.store.dispatch(
      JokeActions.getJoke({
        category: this.selectedCategory,
        firstName: this.firstName,
        lastName: this.lastName,
      })
    );
    this.store
      .select('joke')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((jokeStore) => {
        this.joke = jokeStore.joke;
        this.isLoading = false;
      });
  }

  public favouriteCheck(joke: Joke) {
    this.store
      .select('joke')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((favJokes) => (this.favouriteJokes = favJokes.favouriteJokes));
    return this.favouriteJokes.find((newjoke) => newjoke.id === joke.id);
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
