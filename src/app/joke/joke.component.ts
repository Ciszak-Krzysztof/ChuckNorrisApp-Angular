import { Component, OnInit } from '@angular/core';

import { JokeService } from '../../services/joke.service';
import { Joke } from '../../models/joke.model';
import { FavouriteJokesService } from '../../services/favourite-jokes.service';

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
  // public categories: String[] = [];
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

    // this.jokeService.getCategories().subscribe((categories: String[]) => {
    //   this.categories = categories;
    // });
  }

  public onAddFavourite(): void {
    this.favouriteService.addFavouriteJoke(this.joke);
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

  public selectCategory(category: string) {
    this.selectedCategory = category;
  }

  // public onValueChanged(selected: any): void {
  //   this.selectedCategory = selected;
  // }
}
