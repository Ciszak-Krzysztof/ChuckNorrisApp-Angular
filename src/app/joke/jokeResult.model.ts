import { Joke } from './joke.model';

export interface jokeResult {
  type: string;
  value: Joke;
}
