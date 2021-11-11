import { Component, OnInit } from '@angular/core';
import { JokeService } from './joke.service';
import { map } from 'rxjs/operators';
import { Joke } from './joke.model';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css'],
})
export class JokeComponent implements OnInit {
  joke: Joke = {
    id: 1,
    joke: 'abc',
  };

  constructor(private jokeService: JokeService) {}

  ngOnInit(): void {
    this.jokeService.getRandomJoke().subscribe((joke) => {
      console.log(joke);
      this.joke = joke;
    });
  }

  fetchJoke() {
    this.jokeService.getRandomJoke().subscribe((joke) => {
      console.log(joke);
      this.joke = joke;
    });
  }
}
