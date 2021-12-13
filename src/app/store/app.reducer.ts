import * as fromJokeReducer from './joke.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  joke: fromJokeReducer.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  joke: fromJokeReducer.jokeReducer,
};
