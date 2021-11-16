import { Component, OnInit } from '@angular/core';

import { JokeService } from '../services/joke.service';
import { Joke } from '../models/joke.model';
import { FavouriteJokesService } from '../services/favourite-jokes.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit {
  public impersonateName: string = '';
  public isChuck: boolean = true;
  public joke: Joke = {
    id: 0,
    joke: '',
  };
  public selectedCategory: string = '';
  private firstName: string = 'Chuck';
  private lastName: string = 'Norris';

  constructor(
    private jokeService: JokeService,
    private favouriteService: FavouriteJokesService
  ) {}

  ngOnInit(): void {
    this.jokeService.getRandomJoke().subscribe((joke: Joke) => {
      this.joke = joke;
    });
  }

  public onAddFavourite(): void {
    this.favouriteService.addFavouriteJoke(this.joke);
  }

  public selectCategory(category: string) {
    this.selectedCategory = category;
  }

  public fetchJoke(): void {
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
      .subscribe((joke: Joke) => (this.joke = joke));
  }
}
