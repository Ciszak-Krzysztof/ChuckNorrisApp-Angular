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

export const getRandomJoke = createAction('[Jokes] Get Random Joke');

export const getRandomJokeSuccess = createAction(
  '[Jokes] Get Random Joke Success',
  props<{ joke: Joke }>()
);

export const getCategories = createAction('[Jokes] Get Categories');

export const getCategoriesSuccess = createAction(
  '[Jokes] Get Categories Success',
  props<{ categories: string[] }>()
);

export const getJoke = createAction(
  '[Jokes] Get Joke',
  props<{ category: string; firstName: string; lastName: string }>()
);

export const getJokeSuccess = createAction(
  '[Jokes] Get Joke Success',
  props<{ joke: Joke }>()
);

export const getManyJokes = createAction(
  '[Jokes] Get Many Jokes',
  props<{
    category: string;
    firstName: string;
    lastName: string;
    jokesAmount: number;
  }>()
);

export const getManyJokesSuccess = createAction(
  '[Jokes] Get Many Jokes Success',
  props<{ jokes: Joke[] }>()
);

export const setRating = createAction(
  '[Settings] Set rating',
  props<{ rating: number }>()
);
