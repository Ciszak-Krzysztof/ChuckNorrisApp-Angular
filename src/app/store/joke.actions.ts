import { createAction, props } from '@ngrx/store';

import { Joke } from '../models/Joke.model';

export const addFavouriteJoke = createAction(
  '[Favourite Jokes] Add Favourite Joke',
  props<{ joke: Joke }>()
);

export const deleteFavouriteJoke = createAction(
  '[Favourite Jokes] Delete Favourite Joke',
  props<{ index: number }>()
);

export const getFavouriteJokes = createAction(
  '[Favourite Jokes] Get Favourite Jokes'
);
