import { Joke } from './Joke.model';

export interface JokeResult {
  type: string;
  value: Joke;
}
