import { Joke } from './joke.model';

export interface JokeResult {
  type: string;
  value: Joke;
}
