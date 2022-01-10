import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JokeState } from './joke.reducer';

export const selectJokes = createFeatureSelector<JokeState>('joke');

export const selectFavouriteJokes = createSelector(
  selectJokes,
  (state: JokeState) => state.favouriteJokes
);

export const selectCategories = createSelector(
  selectJokes,
  (state: JokeState) => state.categories
);

export const selectRating = createSelector(
  selectJokes,
  (state: JokeState) => state.rating
);
