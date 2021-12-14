import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { JokeService } from '../../services/joke.service';
import { Joke } from '../../models/Joke.model';
import { FavouriteJokesService } from '../../services/favourite-jokes.service';
import * as fromApp from '../../store/app.reducer';
import * as JokeActions from '../../store/joke.actions';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit {
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
    private favouriteService: FavouriteJokesService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.jokeService.getRandomJoke().subscribe((joke: Joke) => {
      (this.joke = joke),
        (this.isFavourite = !this.favouriteService.favouriteCheck(this.joke)
          ? false
          : true);
      this.isLoading = false;
    });
  }

  public onToggleFavourite(): void {
    console.log(!this.favouriteService.favouriteCheck(this.joke));
    if (!this.favouriteService.favouriteCheck(this.joke)) {
      this.store.dispatch(new JokeActions.AddFavouriteJoke(this.joke));
    } else {
      // const index: number = this.favouriteJokes.findIndex(
      //   (newJoke) => newJoke.id === this.joke.id
      // );
      this.store.dispatch(new JokeActions.DeleteFavouriteJoke(0));
    }
    // this.favouriteService.toggleFavouriteJoke(this.joke);
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
          (this.isFavourite = !this.favouriteService.favouriteCheck(this.joke)
            ? false
            : true);
        this.isLoading = false;
      });
  }
}
