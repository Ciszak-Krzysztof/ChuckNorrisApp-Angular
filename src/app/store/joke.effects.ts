import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FileSaver from 'file-saver';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { Joke } from '../models/Joke.model';

import { JokeService } from '../services/joke.service';
import * as JokeActions from '../store/joke.actions';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class JokeEffects {
  getRandomJoke = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.getRandomJoke),
      mergeMap(() =>
        this.jokeService.getRandomJoke().pipe(
          map((joke) => JokeActions.getRandomJokeSuccess({ joke })),
          catchError(() => {
            this.notifications.showNotification(
              'Something went wrong',
              'Ok',
              'error'
            );
            return EMPTY;
          })
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
            catchError(() => {
              this.notifications.showNotification(
                'Something went wrong',
                'Ok',
                'error'
              );
              return EMPTY;
            })
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
            catchError(() => {
              this.notifications.showNotification(
                'Something went wrong',
                'Ok',
                'error'
              );
              return EMPTY;
            })
          )
      )
    )
  );

  saveJokes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JokeActions.getManyJokesSuccess),
        tap((action) => {
          let convertedJokes = '';
          for (const joke of action.jokes) {
            convertedJokes += `${joke.joke} \n `;
          }
          if (!convertedJokes) {
            console.log('There are no jokes to save');
            return;
          }
          const blob = new Blob([convertedJokes], { type: 'text/plain' });
          FileSaver.saveAs(blob, 'jokes.txt');
        })
      ),
    { dispatch: false }
  );

  getCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.getCategories),
      mergeMap(() =>
        this.jokeService.getCategories().pipe(
          map((categories) => JokeActions.getCategoriesSuccess({ categories })),
          catchError(() => {
            this.notifications.showNotification(
              'Something went wrong',
              'Ok',
              'error'
            );
            return EMPTY;
          })
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
          this.notifications.showNotification(
            'Added Favourite Joke',
            'Ok',
            'success'
          );
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

  constructor(
    private actions$: Actions,
    private jokeService: JokeService,
    private notifications: NotificationService
  ) {}
}
