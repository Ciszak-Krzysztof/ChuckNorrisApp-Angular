import { Component, OnDestroy, OnInit } from '@angular/core';
import { Joke } from 'src/app/models/Joke.model';
import { JokeService } from 'src/app/services/joke.service';
import { JokeComponent } from '../joke.component';
import * as FileSaver from 'file-saver';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as JokeActions from '../../../store/joke.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-joke-save',
  templateUrl: './joke-save.component.html',
  styleUrls: ['./joke-save.component.css'],
})
export class JokeSaveComponent implements OnInit, OnDestroy {
  private ngDestroyed$ = new Subject();
  public jokesAmount: number = 0;
  public savedJokes: Joke[] = [];
  private convertedJokes = '';

  // constructor(private jokeService: JokeService, private joke: JokeComponent) {}
  constructor(
    private store: Store<fromApp.AppState>,
    private joke: JokeComponent
  ) {}

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
    this.store.dispatch(
      JokeActions.getManyJokes({
        category: this.joke.selectedCategory,
        firstName: this.joke.firstName,
        lastName: this.joke.lastName,
        jokesAmount: this.jokesAmount,
      })
    );
    this.store
      .select('joke')
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((jokeStore) => {
        console.log(this.savedJokes),
          (this.savedJokes = jokeStore.jokes),
          this.convertJokesToString(),
          console.log(this.savedJokes),
          //issue in here with saveStringToFile as it seems to run multiple times when used via store, with service it worked ok. Issue shows up when using multiple times in a row, first use gives 1 file, second 2 files, third 3 files etc. Request to api is only sent once each time.
          this.saveStringToFile(this.convertedJokes),
          (this.joke.isLoading = false),
          (this.joke.selectedCategory = '');
      });

    // this.jokeService
    //   .getManyJokes(
    //     this.joke.selectedCategory,
    //     this.joke.firstName,
    //     this.joke.lastName,
    //     this.jokesAmount
    //   )
    //   .subscribe(
    //     (jokes: Joke[]) => (
    //       (this.savedJokes = jokes),
    //       this.convertJokesToString(),
    //       this.saveStringToFile(this.convertedJokes),
    //       (this.joke.isLoading = false),
    //       (this.joke.selectedCategory = '')
    //     )
    //   );
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

  ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
