import { Action } from '@ngrx/store';

import { Joke } from '../models/Joke.model';

export const ADD_FAVOURITE_JOKE = 'ADD_FAVOURITE_JOKE';
export const DELETE_FAVOURITE_JOKE = 'DELETE_FAVOURITE_JOKE';
export const GET_FAVOURITE_JOKES = 'GET_FAVOURITE_JOKES';

export class AddFavouriteJoke implements Action {
  readonly type = ADD_FAVOURITE_JOKE;
  constructor(public payload: Joke) {}
}

export class DeleteFavouriteJoke implements Action {
  readonly type = DELETE_FAVOURITE_JOKE;
  constructor(public payload: number) {}
}

export class GetFavouriteJokes implements Action {
  readonly type = GET_FAVOURITE_JOKES;
}

export type JokeActions =
  | AddFavouriteJoke
  | DeleteFavouriteJoke
  | GetFavouriteJokes;
