import { createReducer, on } from '@ngrx/store';
import { Joke } from '../models/Joke.model';
import * as JokeActions from './joke.actions';

export interface State {
  isLoading: boolean;
  isChuck: boolean;
  isFavourite: boolean;
  favouriteJokes: Joke[];
  joke: Joke;
  selectedCategory: string;
  categories: string[];
  firstName: string;
  lastName: string;
}

const initialState: State = {
  isLoading: false,
  isChuck: true,
  isFavourite: false,
  favouriteJokes: [],
  joke: {
    id: 0,
    joke: '',
  },
  selectedCategory: '',
  categories: [],
  firstName: 'Chuck',
  lastName: 'Norris',
};

export const jokeReducer = createReducer(
  initialState,
  on(JokeActions.addFavouriteJoke, (state, { joke }) => ({
    ...state,
    favouriteJokes: [...state.favouriteJokes, joke],
  })),
  on(JokeActions.deleteFavouriteJoke, (state, { index }) => ({
    ...state,
    favouriteJokes: state.favouriteJokes.filter((joke, jokeIndex) => {
      return jokeIndex !== index;
    }),
  })),
  on(JokeActions.getFavouriteJokes, (state) => ({
    ...state,
    favouriteJokes: JSON.parse(localStorage.getItem('favouriteJokes') || '[]'),
  }))
);
