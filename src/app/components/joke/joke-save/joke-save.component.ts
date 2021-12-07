import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/app/models/Joke.model';
import { JokeService } from 'src/app/services/joke.service';
import { JokeComponent } from '../joke.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-joke-save',
  templateUrl: './joke-save.component.html',
  styleUrls: ['./joke-save.component.css'],
})
export class JokeSaveComponent implements OnInit {
  public jokesAmount: number = 0;
  public savedJokes: Joke[] = [];
  private convertedJokes = '';

  constructor(private jokeService: JokeService, private joke: JokeComponent) {}

  ngOnInit(): void {}

  saveJokes() {
    this.joke.isLoading = true;
    if (this.joke.impersonateName.length !== 0) {
      this.joke.isChuck = false;
      this.joke.firstName = this.joke.impersonateName.split(' ')[0];
      this.joke.lastName = this.joke.impersonateName.split(' ')[1] ?? '';
    } else {
      this.joke.isChuck = true;
      this.joke.firstName = 'Chuck';
      this.joke.lastName = 'Norris';
    }
    this.jokeService
      .getManyJokes(
        this.joke.selectedCategory,
        this.joke.firstName,
        this.joke.lastName,
        this.jokesAmount
      )
      .subscribe(
        (jokes: Joke[]) => (
          (this.savedJokes = jokes),
          this.convertJokesToString(),
          this.saveStringToFile(this.convertedJokes),
          (this.joke.isLoading = false),
          (this.joke.selectedCategory = '')
        )
      );
  }

  onAddJokesAmount(): void {
    this.jokesAmount < 100 ? this.jokesAmount++ : this.jokesAmount;
  }

  onReduceJokesAmount(): void {
    this.jokesAmount > 0 ? this.jokesAmount-- : this.jokesAmount;
  }

  convertJokesToString(): void {
    this.convertedJokes = '';
    for (const joke of this.savedJokes) {
      this.convertedJokes += `${joke.joke} \n `;
    }
  }

  saveStringToFile(text: string) {
    if (!text) {
      console.log('There are no jokes to save');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    FileSaver.saveAs(blob, 'jokes.txt');
  }
}
