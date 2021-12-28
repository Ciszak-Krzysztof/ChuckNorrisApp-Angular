import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { JokeService } from '../../services/joke.service';
import { Joke } from '../../models/Joke.model';
import * as fromApp from '../../store/app.reducer';
import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit {
  public favouriteJokes: Joke[] = [];
  public isLoading: boolean = false;
  public impersonateName: string = '';
  public isChuck: boolean = true;
  public isFavourite: boolean = false;
  public joke: Joke = {
    id: 0,
    joke: '',
  };
  public selectedCategory: string = '';
  public firstName: string = 'Chuck';
  public lastName: string = 'Norris';

  constructor(
    private jokeService: JokeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('joke')
      .subscribe((favJokes) => (this.favouriteJokes = favJokes.favouriteJokes));
    this.isLoading = true;
    this.jokeService.getRandomJoke().subscribe((joke: Joke) => {
      (this.joke = joke),
        (this.isFavourite = !this.favouriteCheck(this.joke) ? false : true);
      this.isLoading = false;
    });
  }

  public onToggleFavourite(): void {
    if (!this.favouriteCheck(this.joke)) {
      const favJokes = JSON.parse(
        localStorage.getItem('favouriteJokes') || '[]'
      );
      const data = [...favJokes, this.joke];
      localStorage.setItem('favouriteJokes', JSON.stringify(data));
      this.store.dispatch(JokeActions.addFavouriteJoke({ joke: this.joke }));
    } else {
      const index: number = this.favouriteJokes.findIndex(
        (newJoke) => newJoke.id === this.joke.id
      );
      const favJokes: Joke[] = JSON.parse(
        localStorage.getItem('favouriteJokes') || '[]'
      );
      favJokes.splice(index, 1);
      localStorage.setItem('favouriteJokes', JSON.stringify(favJokes));
      this.store.dispatch(JokeActions.deleteFavouriteJoke({ index: index }));
    }
    this.isFavourite = !this.isFavourite;
  }
  public selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public fetchJoke(): void {
    this.isLoading = true;
    if (this.impersonateName.length !== 0) {
      this.isChuck = false;
      this.firstName = this.impersonateName.split(' ')[0];
      this.lastName = this.impersonateName.split(' ')[1] ?? '';
    } else {
      this.isChuck = true;
      this.firstName = 'Chuck';
      this.lastName = 'Norris';
    }
    this.jokeService
      .getJoke(this.selectedCategory, this.firstName, this.lastName)
      .subscribe((joke: Joke) => {
        (this.joke = joke),
          (this.isFavourite = !this.favouriteCheck(this.joke) ? false : true);
        this.isLoading = false;
      });
  }

  public favouriteCheck(joke: Joke) {
    let favouriteJokes: Joke[] = [];
    this.store
      .select('joke')
      .subscribe((favJokes) => (favouriteJokes = favJokes.favouriteJokes));
    return favouriteJokes.find((newjoke) => newjoke.id === joke.id);
  }
}
