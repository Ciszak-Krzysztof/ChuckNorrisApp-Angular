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

export function jokeReducer(
  state: State = initialState,
  action: JokeActions.JokeActions
): State {
  switch (action.type) {
    case JokeActions.ADD_FAVOURITE_JOKE:
      return {
        ...state,
        favouriteJokes: [...state.favouriteJokes, action.payload],
      };
    case JokeActions.DELETE_FAVOURITE_JOKE:
      return {
        ...state,
        favouriteJokes: state.favouriteJokes.filter((joke, jokeIndex) => {
          return jokeIndex !== action.payload;
        }),
      };
    case JokeActions.GET_FAVOURITE_JOKES:
      return {
        ...state,
        favouriteJokes: JSON.parse(
          localStorage.getItem('favouriteJokes') || '[]'
        ),
      };
    default:
      return state;
  }
}
