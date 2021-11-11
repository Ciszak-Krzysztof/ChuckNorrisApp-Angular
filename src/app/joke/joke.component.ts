import { Component, OnInit } from '@angular/core';

import { JokeService } from './joke.service';
import { Joke } from './joke.model';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit {
  impersonateName: string = '';
  isChuck: boolean = true;

  joke: Joke = {
    id: 0,
    joke: '',
  };
  selectedCategory: string = '';
  firstName: string = 'Chuck';
  lastName: string = 'Norris';
  categories: String[] = [];

  constructor(private jokeService: JokeService) {}

  ngOnInit(): void {
    this.jokeService.getRandomJoke().subscribe((joke) => {
      this.joke = joke;
    });

    this.jokeService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  fetchJoke() {
    if (this.impersonateName.length !== 0) {
      this.isChuck = false;
      this.firstName = this.impersonateName.split(' ')[0];
      if (this.impersonateName.split(' ')[1]) {
        this.lastName = this.impersonateName.split(' ')[1];
      } else {
        this.lastName = '';
      }
    } else {
      this.isChuck = true;
      this.firstName = 'Chuck';
      this.lastName = 'Norris';
    }

    this.jokeService
      .getJoke(this.selectedCategory, this.firstName, this.lastName)
      .subscribe((joke) => (this.joke = joke));
  }

  public onValueChanged(selected: any): void {
    this.selectedCategory = selected;
  }
}
