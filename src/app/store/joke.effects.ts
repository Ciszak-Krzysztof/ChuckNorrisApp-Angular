import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, pipe } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Joke } from '../models/Joke.model';

import { JokeService } from '../services/joke.service';
import * as JokeActions from '../store/joke.actions';

@Injectable()
export class JokeEffects {
  getRandomJoke = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.getRandomJoke),
      mergeMap(() =>
        this.jokeService.getRandomJoke().pipe(
          map((joke) => JokeActions.getRandomJokeSuccess({ joke })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getJoke = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.getJoke),
      mergeMap((action) =>
        this.jokeService
          .getJoke(action.category, action.firstName, action.lastName)
          .pipe(
            map((joke) => JokeActions.getJokeSuccess({ joke })),
            catchError(() => EMPTY)
          )
      )
    )
  );

  getManyJokes = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.getManyJokes),
      mergeMap((action) =>
        this.jokeService
          .getManyJokes(
            action.category,
            action.firstName,
            action.lastName,
            action.jokesAmount
          )
          .pipe(
            map((jokes) => JokeActions.getManyJokesSuccess({ jokes })),
            catchError(() => EMPTY)
          )
      )
    )
  );

  getCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.getCategories),
      mergeMap(() =>
        this.jokeService.getCategories().pipe(
          map((categories) => JokeActions.getCategoriesSuccess({ categories })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addFavouriteJoke = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JokeActions.addFavouriteJoke),
        tap((action) => {
          const favJokes = JSON.parse(
            localStorage.getItem('favouriteJokes') || '[]'
          );
          const data = [...favJokes, action.joke];
          localStorage.setItem('favouriteJokes', JSON.stringify(data));
        })
      ),
    { dispatch: false }
  );

  deleteFavouriteJoke = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JokeActions.deleteFavouriteJoke),
        tap((action) => {
          const favJokes: Joke[] = JSON.parse(
            localStorage.getItem('favouriteJokes') || '[]'
          );
          favJokes.splice(action.index, 1);
          localStorage.setItem('favouriteJokes', JSON.stringify(favJokes));
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private jokeService: JokeService) {}
}
