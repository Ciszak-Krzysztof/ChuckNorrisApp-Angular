import { Subject } from 'rxjs';

import { Joke } from '../models/joke.model';

export class FavouriteJokesService {
  public jokesChanged = new Subject<Joke[]>();
  private favouriteJokes: Joke[] = [
    new Joke(999, 'joke'),
    new Joke(998, 'joke1'),
  ];

  getFavouriteJokes(): Joke[] {
    return this.favouriteJokes;
  }

  favouriteCheck(joke: Joke) {
    return this.favouriteJokes.find((newjoke) => newjoke.id === joke.id);
  }

  toggleFavouriteJoke(joke: Joke): void {
    if (!this.favouriteCheck(joke)) {
      this.addFavouriteJoke(joke);
    } else {
      let index: number = this.favouriteJokes.findIndex(
        (newJoke) => newJoke.id === joke.id
      );
      this.deleteFavouriteJoke(index);
    }
  }

  addFavouriteJoke(joke: Joke): void {
    this.favouriteJokes.push(joke);
    this.jokesChanged.next(this.favouriteJokes);
  }

  deleteFavouriteJoke(index: number): void {
    this.favouriteJokes.splice(index, 1);
    this.jokesChanged.next(this.favouriteJokes);
  }
}
