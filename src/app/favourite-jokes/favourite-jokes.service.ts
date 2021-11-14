import { Subject } from 'rxjs';

import { Joke } from '../joke/joke.model';

export class FavouriteJokesService {
  jokesChanged = new Subject<Joke[]>();
  private favouriteJokes: Joke[] = [
    new Joke(999, 'joke'),
    new Joke(998, 'joke1'),
  ];

  getFavouriteJokes() {
    return this.favouriteJokes.slice();
  }

  addFavouriteJoke(joke: Joke) {
    this.favouriteJokes.push(joke);
    this.jokesChanged.next(this.favouriteJokes.slice());
  }

  deleteFavouriteJoke(index: number) {
    this.favouriteJokes.splice(index, 1);
    this.jokesChanged.next(this.favouriteJokes.slice());
  }
}
