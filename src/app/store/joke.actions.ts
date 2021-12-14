import { Action } from '@ngrx/store';

import { Joke } from '../models/Joke.model';

export const ADD_FAVOURITE_JOKE = 'ADD_FAVOURITE_JOKE';
export const DELETE_FAVOURITE_JOKE = 'DELETE_FAVOURITE_JOKE';

export class AddFavouriteJoke implements Action {
  readonly type = ADD_FAVOURITE_JOKE;
  constructor(public payload: Joke) {}
}

export class DeleteFavouriteJoke implements Action {
  readonly type = DELETE_FAVOURITE_JOKE;
  constructor(public payload: number) {}
}

export type JokeActions = AddFavouriteJoke | DeleteFavouriteJoke;
