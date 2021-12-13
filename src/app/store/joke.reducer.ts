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
  favouriteJokes: [{ id: 123, joke: 'random test joke' }],
  joke: {
    id: 0,
    joke: '',
  },
  selectedCategory: '',
  categories: [],
  firstName: 'Chuck',
  lastName: 'Norris',
};

export function jokeReducer(
  state: State = initialState,
  action: JokeActions.AddFavouriteJoke
): State {
  switch (action.type) {
    case JokeActions.ADD_FAVOURITE_JOKE:
      return {
        ...state,
        favouriteJokes: [...state.favouriteJokes, action.payload],
      };
    default:
      return state;
  }
}
