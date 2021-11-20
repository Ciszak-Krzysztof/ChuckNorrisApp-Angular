import { Joke } from './Joke.model';

export interface SaveResult {
  type: string;
  value: Joke[];
}
