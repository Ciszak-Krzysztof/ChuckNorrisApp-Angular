import { Component, OnDestroy, OnInit } from '@angular/core';
import { Joke } from 'src/app/models/Joke.model';
import { JokeComponent } from '../joke.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as JokeActions from '../../../store/joke.actions';
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
  }

  onAddJokesAmount(): void {
    this.jokesAmount < 100 ? this.jokesAmount++ : this.jokesAmount;
  }

  onReduceJokesAmount(): void {
    this.jokesAmount > 0 ? this.jokesAmount-- : this.jokesAmount;
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
