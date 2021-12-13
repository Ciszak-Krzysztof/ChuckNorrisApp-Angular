import { Action } from '@ngrx/store';

import { Joke } from '../models/Joke.model';

export const ADD_FAVOURITE_JOKE = 'ADD_FAVOURITE_JOKE';

export class AddFavouriteJoke implements Action {
  readonly type = ADD_FAVOURITE_JOKE;
  constructor(public payload: Joke) {}
}

export type JokeActions = AddFavouriteJoke;
