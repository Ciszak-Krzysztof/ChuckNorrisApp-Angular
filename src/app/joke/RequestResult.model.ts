import { Joke } from './joke.model';

export interface RequestResult {
  type: string;
  value: Joke;
}
