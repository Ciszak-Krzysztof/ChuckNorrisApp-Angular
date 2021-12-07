import { Joke } from '../models/Joke.model';

export class FavouriteJokesService {
  private favouriteJokes: Joke[] = [];

  getFavouriteJokes(): Joke[] {
    this.favouriteJokes = JSON.parse(
      localStorage.getItem('favouriteJokes') || '[]'
    );
    return this.favouriteJokes;
  }

  favouriteCheck(joke: Joke) {
    return this.favouriteJokes.find((newjoke) => newjoke.id === joke.id);
  }

  toggleFavouriteJoke(joke: Joke): void {
    if (!this.favouriteCheck(joke)) {
      this.addFavouriteJoke(joke);
    } else {
      const index: number = this.favouriteJokes.findIndex(
        (newJoke) => newJoke.id === joke.id
      );
      this.deleteFavouriteJoke(index);
    }
  }

  addFavouriteJoke(joke: Joke): void {
    const favJokes = JSON.parse(localStorage.getItem('favouriteJokes') || '[]');
    const data = [...favJokes, joke];
    localStorage.setItem('favouriteJokes', JSON.stringify(data));
    this.favouriteJokes.push(joke);
  }

  deleteFavouriteJoke(index: number): void {
    const favJokes: Joke[] = JSON.parse(
      localStorage.getItem('favouriteJokes') || '[]'
    );
    favJokes.splice(index, 1);
    localStorage.setItem('favouriteJokes', JSON.stringify(favJokes));
    this.favouriteJokes.splice(index, 1);
  }
}
